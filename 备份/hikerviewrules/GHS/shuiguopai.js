let d = [];
const [url, page] = MY_URL.split('##')
const list_json = fetch(url, {
    headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://sgpai.cc/',
        'User-Agent': MOBILE_UA
    }, method: 'POST', body: JSON.stringify({
        "hm": "008-api",
        "length": 12,
        "type": 1,
        "page": page,
    })
});

const list = JSON.parse(list_json).data.list

if (url.includes('homePage')) {
    list.forEach(item => {
        d.push({
            title: item.title,
            desc: item.subtitle,
            pic_url: item.img_url,
            url: $("https://sgpai.cc/play-details/1/" + item.library_id + "/").lazyRule(_ => {
                const html = fetch(input)
                return (html.match(/url:"(.*?)index.m3u8"/)[1]).replace(/\\u002F/g, '/') + "index.m3u8"
            }),
            col_type: 'movie_2'
        })
    })
} else {
    list.forEach(item => {
        d.push({
            title: item.anchors_name,
            desc: item.library_count + '部作品',
            pic_url: item.anchors_img,
            url: $("hiker://empty##fypage").rule(item => {
                let d = [];
                const params = {
                    "anchors_id": item.anchors_id,
                    "hm": "008-api",
                    "length": 12,
                    "page": MY_URL.split('##')[1],
                }
                const headers = {
                    'Content-Type': 'application/json',
                    'Referer': 'https://sgpai.cc/',
                    'User-Agent': MOBILE_UA
                }
                const data_json = fetch("https://api.cbbee0.com/v1_2/anchorsDetail", {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify(params)
                })
                const list = JSON.parse(data_json).data.list
                list.forEach(res => {
                    d.push({
                        title: res.title,
                        desc: res.subtitle,
                        pic_url: res.img_url,
                        url: $("https://sgpai.cc/play-details/1/" + res.library_id + "/").lazyRule(_ => {
                            const html = fetch(input)
                            return (html.match(/url:"(.*?)index.m3u8"/)[1]).replace(/\\u002F/g, '/') + "index.m3u8"
                        }),
                        col_type: 'movie_2'
                    })
                })
                setResult(d);
            }, item),
            col_type: 'icon_round_4'
        })
    })
}

setResult(d);
