const baseParse = _ => {
    let d = [];
    const cate = MY_URL.split('####')[1]

    const temp1 = _ => {
        let list = parseDomForArray(getResCode(), '#archive-content&&.item')
        list.forEach(item => {
            d.push({
                title: parseDomForHtml(item, 'h3&&Text'),
                pic_url: parseDomForHtml(item, 'img&&src'),
                url: parseDomForHtml(item, 'a&&href') + '#immersiveTheme#',
                desc: parseDomForHtml(item, '.rating&&Text'),
            })
        })
    }

    const temp2 = _ => {
        let list = parseDomForArray(getResCode(), '.items&&.item')
        list.forEach(item => {
            d.push({
                title: parseDomForHtml(item, 'h3&&Text'),
                pic_url: parseDomForHtml(item, 'img&&src'),
                url: parseDomForHtml(item, 'a&&href') + '#immersiveTheme#',
                desc: parseDomForHtml(item, '.rating&&Text'),
            })
        })
    }

    switch (cate) {
        case 'movies':
            temp1()
            break
        default:
            temp2()
    }

    setResult(d);
}

const secParse = _ => {
    let d = [];
    let header = parseDomForHtml(getResCode(), '.sheader&&Html')

    d.push({
        title: parseDomForHtml(header, 'h1&&Text'),
        pic_url: parseDomForHtml(header, 'img&&src'),
        url: MY_URL,
        desc: parseDomForHtml(getResCode(), '.wp-content&&p&&Text'),
    })
    d.push({
        col_type: 'line'
    })

    let list = parseDomForArray(getResCode(), '#episodes&&.se-c')

    d.push({
        title: '选集',
        url: "hiker://empty",
        col_type: 'text_1',
    })
    if (list.length > 0) {
        list.forEach(item => {
            d.push({
                title: parseDomForHtml(item, '.title&&Text'),
                url: "hiker://empty",
                col_type: 'text_1',
            })
            let current_list = parseDomForArray(item, 'ul&&li')
            if (current_list.length > 0) {
                current_list.reverse().forEach(data => {
                    d.push({
                        title: parseDomForHtml(data, 'a&&Text').replace(' ', ''),
                        url: $(parseDomForHtml(data, 'a&&href')).lazyRule(_ => {
                            let video = parseDomForArray(request(input), '#playeroptionsul&&li')[0]
                            let fetch = request("https://www.4kvm.com/wp-json/dooplayer/v1/post/" + parseDomForHtml(video, 'li&&data-post') + "?type=movie&source=1")
                            return "http://4kjx.dev.tyrantg.com/index.m3u8?url=" + encodeURIComponent(JSON.parse(fetch).embed_url) + '#isVideo=true#'
                        }),
                        col_type: 'text_4',
                    })
                })
            } else {
                let html = request(parseDomForHtml(item, 'a&&href'))
                let sel_list_json = html.match(/videourls:\[(.*?)],/)[1]
                let sel_list = JSON.parse(sel_list_json)
                sel_list.forEach(data => {
                    d.push({
                        title: "第" + data.name + "集",
                        url: "http://4kjx.dev.tyrantg.com/index.m3u8?url=" + encodeURIComponent(data.url) + '#isVideo=true#',
                        col_type: 'text_4',
                    })
                })
            }
        })
    } else {
        let video = parseDomForArray(getResCode(), '#playeroptionsul&&li')
        video.forEach(item => {
            d.push({
                title: parseDomForHtml(item, '.title&&Text'),
                url: $("https://www.4kvm.com/wp-json/dooplayer/v1/post/" + parseDomForHtml(item, 'li&&data-post') + "?type=movie&source=1").lazyRule(_ => {
                    let fetch = request(input)
                    return "http://4kjx.dev.tyrantg.com/index.m3u8?url=" + encodeURIComponent(JSON.parse(fetch).embed_url) + '#isVideo=true#'
                }),
                col_type: 'text_2',
            })
        })

    }

    setResult(d);
}
