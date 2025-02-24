const baseParse = _ => {
    let d = [];
    const url = MY_URL
    const header = {'Accept': 'application/vnd.twitchtv.v5+json', 'Client-ID': '7i8imjlwj0oqyiu3rutgfayf17op3w'}
    const data_json = fetch(url, {headers: header})
    const list = JSON.parse(data_json).top
    list.forEach(item => {
        d.push({
            title: item.game.name,
            desc: item.viewers + '人观看',
            pic_url: item.game.box.medium,
            url: "https://api.twitch.tv/kraken/streams/?game=" + encodeURIComponent(item.game.name) + "&offset=fypage@-1@*24@&limit=24",
        })
    })

    setResult(d);
}

const secParse = _ => {
    let d = [];
    const header = {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': '7i8imjlwj0oqyiu3rutgfayf17op3w',
        'User-Agent': PC_UA
    }
    const data_json = fetch(MY_URL, {headers: header})

    const list = JSON.parse(data_json).streams
    list.forEach(item => {
        let channel = item.channel
        d.push({
            title: channel.status,
            desc: channel.display_name,
            pic_url: item.preview.medium,
            url: $(channel.url).lazyRule(_ => {
                eval(fetch('hiker://files/TyrantG/LIVE/twitch.js'))
                const header = {'User-Agent': PC_UA}
                const html = fetch(input, {headers: header})
                const client_id = html.match(/"Client-ID":"(.*?)"/)[1]
                const rid = input.split('/').pop()

                const data = {
                    "operationName": "PlaybackAccessToken",
                    "extensions": {
                        "persistedQuery": {
                            "version": 1,
                            "sha256Hash": "0828119ded1c13477966434e15800ff57ddacf13ba1911c129dc2200705b0712"
                        }
                    },
                    "variables": {
                        "isLive": true,
                        "login": rid,
                        "isVod": true,
                        "vodID": "",
                        "playerType": "site"
                    }
                }

                const headers = {
                    'Client-ID': client_id,
                    'Content-Type': 'application/json',
                    'Referer': 'https://www.twitch.tv/',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.214 Safari/537.36'
                }

                const data_json = fetch('https://gql.twitch.tv/gql', {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                const value = JSON.parse(data_json).data.streamPlaybackAccessToken.value
                const signature = JSON.parse(data_json).data.streamPlaybackAccessToken.signature

                const stream_url = 'https://usher.ttvnw.net/api/channel/hls/' + rid + '.m3u8' +
                    '?client_id=' + client_id +
                    '&token=' + encodeURIComponent(value) +
                    '&sig=' + signature +
                    '&allow_source=true'/* +
                    '&allow_audio_only=true'*/

                const playlist = fetch(stream_url)

                const lines = playlist.split('\n');

                if (lines.length < 5) {
                    return "toast://当前主播没有在直播"
                } else {
                    /* d.push({
                        title: "如果显示“commercial break in progress”请等15秒",
                        col_type: 'text_center_1'
                    }); */
                    let urls = [];
                    let names = [];
                    for (let i = 4; i < lines.length; i += 3) {
                        // urls.push(m3u8Parse(lines[i], i));
                        urls.push(lines[i]);
                        names.push(lines[i - 2].split('NAME="')[1].split('"')[0]);
                        // d.push({
                        //     title: lines[i - 2].split('NAME="')[1].split('"')[0],
                        //     // resolution: (lines[i - 1].indexOf('RESOLUTION') != -1 ? lines[i - 1].split('RESOLUTION=')[1].split(',')[0] : null),
                        //     url: lines[i],
                        //     col_type: 'text_2'
                        // });
                    }
                    return JSON.stringify({urls: urls, names: names})
                }

            }),
            col_type: 'movie_2'
        })
    })

    setResult(d);
}


const m3u8Parse = (url, id) => {
    const oriM3U8Content = fetch(url).split('\n')
    const newM3U8Content = []
    const position = []
    oriM3U8Content.forEach((item, index) => {
        if (item.indexOf('#EXTINF:2.002,Amazon') != -1) {
            position.push(index + 1)
        }
        if (position.indexOf(index) == -1) {
            newM3U8Content.push(item)
        }
    })

    writeFile("hiker://files/cache/TyrantG/twitch_temp_" + id + ".m3u8", newM3U8Content.join('\n'))
    return "file:///storage/emulated/0/Android/data/com.example.hikerview/files/Documents/cache/TyrantG/twitch_temp_" + id + ".m3u8"
}