const baseParse = _ => {
    let d = [];
    const html = getResCode()
    const list = JSON.parse(html).cells

    list.forEach(item => {
        if (item.type === 0) {
            let stream = item.stream
            if (stream.rtmpUrls && stream.rtmpUrls.length > 0) {
                d.push({
                    title: stream.caption,
                    pic_url: "https://cdn.17app.co/THUMBNAIL_" + stream.thumbnail,
                    url: stream.rtmpUrls[0].url
                        .replace("wansu-global-pull-rtmp-latency.17app.co", "wansu-china-pull-rtmp-latency-17.tigafocus.com")
                        .replace("wansu-global-pull-rtmp.17app.co", "wansu-china-pull-rtmp-17.tigafocus.com"),
                    desc: stream.userInfo.displayName,
                })
            }
        }
    })

    setResult(d);
}

const searchParse = _ => {
    let d = [];
    const html = getResCode()
    const list = JSON.parse(html)

    list.forEach(item => {
        if (item.user.roomID) {
            d.push({
                title: item.user.picture,
                pic_url: "https://cdn.17app.co/THUMBNAIL_" + item.user.picture,
                url: $("https://api-dsa.17app.co/api/v1/lives/" + item.user.roomID).lazyRule(() => {
                    const html = fetch(input)
                    const item = JSON.parse(html)

                    if (item.rtmpUrls && item.rtmpUrls.length > 0) {
                        return item.rtmpUrls[0].url
                            .replace("wansu-global-pull-rtmp-latency.17app.co", "wansu-china-pull-rtmp-latency-17.tigafocus.com")
                            .replace("wansu-global-pull-rtmp.17app.co", "wansu-china-pull-rtmp-17.tigafocus.com")
                    } else
                        return '房间号未找到'
                }),
                desc: item.user.name,
            })
        }
    })

    setResult(d);
}