const baseParse = _ => {
    let d = [];
    let true_url = getVar("tyrantgenesis.ednovas.url", MY_URL)
    const page = MY_URL.match(/page\/(.*?)\.html/)[1]
    true_url = true_url.replace('.html', '/page/' + page + '.html')
    const html = fetch(true_url)
    const empty = "hiker://empty"

    const categories = pdfa(html, '.box&&.library-box');

    let init_cate = []

    for (let i = 0; i < 10; i++) {
        init_cate.push("0")
    }

    // 取缓存
    const fold = getVar("tyrantgenesis.ednovas.fold", "0")
    const cate_temp_json = getVar("tyrantgenesis.ednovas.category", JSON.stringify(init_cate))
    const cate_temp = JSON.parse(cate_temp_json)


    if (parseInt(page) === 1) {
        d.push({
            title: fold === '1' ? '““””<b><span style="color: #FF0000">∨</span></b>' : '““””<b><span style="color: #1aad19">∧</span></b>',
            url: $(empty).lazyRule((fold) => {
                putVar("tyrantgenesis.ednovas.fold", fold === '1' ? '0' : '1');
                refreshPage(false);
                return "hiker://empty"
            }, fold),
            col_type: 'scroll_button',
        })


        categories.forEach((category, index) => {
            let sub_categories = pdfa(category, '.library-box&&a');
            if (index === 0) {
                sub_categories.forEach((item, key) => {
                    let title = pdfh(item, 'a&&Text')
                    d.push({
                        title: key.toString() === cate_temp[index] ? "““" + title + "””" : title,
                        url: $(parseDom(item, 'a&&href')).lazyRule((params) => {
                            let new_cate = []
                            params.cate_temp.forEach((cate, index) => {
                                new_cate.push(index === 0 ? params.key.toString() : "0")
                            })
                            putVar("tyrantgenesis.ednovas.category", JSON.stringify(new_cate))
                            putVar("tyrantgenesis.ednovas.url", input)
                            refreshPage(true)
                            return "hiker://empty"
                        }, {
                            cate_temp: cate_temp,
                            key: key,
                            page: page,
                        }),
                        col_type: 'scroll_button',
                    })
                })
                d.push({
                    col_type: "blank_block"
                });
            } else if (fold === '1') {
                sub_categories.forEach((item, key) => {
                    let title = pdfh(item, 'a&&Text')
                    d.push({
                        title: key.toString() === cate_temp[index] ? "““" + title + "””" : title,
                        url: $(parseDom(item, 'a&&href')).lazyRule((params) => {
                            params.cate_temp[params.index] = params.key.toString()

                            putVar("tyrantgenesis.ednovas.category", JSON.stringify(params.cate_temp))
                            putVar("tyrantgenesis.ednovas.url", input)
                            refreshPage(true)
                            return "hiker://empty"
                        }, {
                            cate_temp: cate_temp,
                            index: index,
                            key: key,
                            page: page,
                        }),
                        col_type: 'scroll_button',
                    })
                })
                d.push({
                    col_type: "blank_block"
                });
            }
        })
    }

    const video_list = pdfa(html, '.module-items&&.module-item')
    video_list.forEach(video => {
        d.push({
            title: pdfh(video, '.module-item-title&&Text'),
            desc: pdfh(video, '.module-item-caption&&Text'),
            pic_url: pdfh(video, 'img&&data-src') + "@Referer=https://ednovas.video/",
            url: parseDom(video, 'a&&href') + '#immersiveTheme#',
            col_type: 'movie_3_marquee',
        })
    })

    setResult(d);
}

const secParse = _ => {
    let d = [];
    const empty = "hiker://empty"
    const html = getResCode()

    let current_tab = getVar("tyrantgenesis.ednovas.select_tab", '0')
    const video_info = pdfh(html, '#main&&Html')

    d.push(
        {
            title: pdfh(video_info, 'h1&&Text'),
            desc: pdfh(video_info, '.sqjj_a&&Text'),
            pic_url: pdfh(video_info, '.video-cover&&img&&data-src') + "@Referer=https://ednovas.video/",
            url: MY_URL,
            col_type: 'movie_1_vertical_pic_blur'
        },
        {
            col_type: 'blank_block'
        }
    )

    const tabs = pdfa(html, '.module-player-tab&&.module-tab-content&&.module-tab-item')
    const lists = pdfa(html, '.module&&.module-list')

    d.push({
        title: '选择线路',
        url: empty,
        col_type: 'scroll_button',
    })
    tabs.forEach((item, index) => {
        let title = pdfh(item, 'span&&Text')
        d.push({
            title: index.toString() === current_tab ? "““" + title + "””" : title,
            url: $(empty).lazyRule((params) => {
                putVar("tyrantgenesis.ednovas.select_tab", params.index.toString())
                refreshPage(true)
                return "hiker://empty"
            }, {
                index: index,
            }),
            col_type: 'scroll_button',
        })
    })

    d.push({
        col_type: 'blank_block'
    })

    const list = pdfa(lists[parseInt(current_tab)], '.scroll-content&&a')
    list.forEach(item => {
        d.push({
            title: pdfh(item, 'a&&Text'),
            url: $(parseDom(item, 'a&&href')).lazyRule(() => {
                eval(fetch(input).match(/var player_aaaa=(.*?)}/)[0])
                const pre_url = player_aaaa.url
                const host = pre_url.split('/')[2]
                const info = fetch(pre_url)
                let match = info.match(/'(.*?)m3u8'/)
                if (!match) match = info.match(/:"(.*?)m3u8"/)
                if (match) {
                    return "https://" + host + match[1] + 'm3u8'
                } else {
                    return pre_url
                }
            }),
            // col_type: 'text_5',
            col_type: 'flex_button',
        })
    })

    setResult(d);
}

const searchParse = _ => {
    let d = [];
    const html = getResCode()

    const list = pdfa(html, '.module-items&&.module-item')
    list.forEach(item => {
        d.push({
            title: pdfh(item, 'a&&Text'),
            desc: pdfh(item, '.video-info-aux&&Text'),
            pic_url: pdfh(item, 'img&&data-src') + "@Referer=https://ednovas.video/",
            url: parseDom(item, 'a&&href') + '#immersiveTheme#',
        })
    })

    setResult(d);
}
