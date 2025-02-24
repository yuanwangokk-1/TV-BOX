const baseParse = _ => {
    let d = [];
    const page = MY_URL.match(/\?page=(.*?)&/)[1]
    const cookie = fetchCookie(MY_URL, {withHeaders: true})

    // 设置 Cookie
    putVar("tyrantgenesis.artstation.cookie", cookie[0]);
    const channels_json = getResCode().match(/window.preloadedChannels = (.*?);<\/script>/)[1]
    const channels = JSON.parse(channels_json).data

    // 选择
    const channel_sel = getVar("tyrantgenesis.artstation.channel", channels[0].id.toString());

    if (parseInt(page) === 1) {
        channels.forEach(item => {
            d.push({
                title: item.id.toString() === channel_sel ? "““" + item.name + "””" : item.name,
                url: $("#noLoading#").lazyRule((item) => {
                    putVar("tyrantgenesis.artstation.channel", item.id.toString());
                    refreshPage(false);
                    return "hiker://empty"
                }, item),
                col_type: 'scroll_button'
            });
        })
    }

    const url = "https://www.artstation.com/api/v2/community/channels/projects.json?page=" + page + "&per_page=30&sorting=trending&dimension=3d&channel_id=" + channel_sel
    const list_json = fetch(url)
    const list = JSON.parse(list_json).data

    list.forEach(item => {
        d.push({
            // title: item.title,
            url: item.url,
            pic_url: item.smaller_square_cover_url,
            // desc: item.user.username,
            col_type: 'pic_3'
        });
    })

    setResult(d);
}


const secParse = _ => {
    let d = [];
    const html = fetch(MY_URL, {headers: {"User-Agent": PC_UA, "Cookie": getVar("tyrantgenesis.artstation.cookie")}})
    const images_json = html.match(/assets(.*?),\\"collections/)[1].replace('\\":', '').replace(/\\\\\\/g, '标志NMSL标志').replace(/\\/g, '').replace(/标志NMSL标志/g, '\\')
    const images = JSON.parse(images_json)

    images.forEach(item => {
        if (item.has_image) {
            d.push({
                pic_url: item.image_url,
                url: item.image_url,
                col_type: 'pic_1_full'
            })
        }
    })

    setResult(d);
}