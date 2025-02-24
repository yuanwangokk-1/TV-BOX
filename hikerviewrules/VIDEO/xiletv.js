const baseParse = _ => {
    let d = [];
    const BASE_URL = 'http://www.xiletv.com'
    const current_page = MY_URL.split('##')[1]
    let current_url = getVar('tg.xl.true_url')

    let init_cate = []

    for (let i = 0; i < 5; i++) {
        init_cate.push("0")
    }

    const fold = getVar("tg.xl.fold", "0")
    const cate_temp_json = getVar("tg.xl.category", JSON.stringify(init_cate))
    let cate_temp = JSON.parse(cate_temp_json)

    if (!current_url) {
        const ori_html = fetch(MY_URL, {headers: {"User-Agent": PC_UA}})
        let top_temp = pdfa(ori_html, '.nav&&ul&&li')
        const true_url = parseDom(top_temp[1], 'a&&href')
        putVar('tg.xl.true_url', true_url)
        current_url = true_url
    }

    current_url = current_url.replace(/\d\.html/, current_page + '.html')

    const html = fetch(current_url, {headers: {"User-Agent": PC_UA}})
    let top_cate = pdfa(html, '.nav&&ul&&li')
    top_cate.shift()
    top_cate.pop()

    const categories = pdfa(html, '.list-box&&dl');

    if (parseInt(current_page) === 1) {
        d.push({
            title: fold === '1' ? '““””<b><span style="color: #FF0000">∨</span></b>' : '““””<b><span style="color: #1aad19">∧</span></b>',
            url: $("hiker://empty").lazyRule((fold) => {
                putVar("tg.xl.fold", fold === '1' ? '0' : '1');
                refreshPage(false);
                return "hiker://empty"
            }, fold),
            col_type: 'scroll_button',
        })

        top_cate.forEach((item, index) => {
            let title = pdfh(item, 'a&&Text')
            let url = parseDom(item, 'a&&href')
            d.push({
                title: cate_temp[0] === index.toString() ? '““””<b><span style="color: #FF0000">' + title + '</span></b>' : title,
                url: $(url).lazyRule(params => {
                    let new_cate = []
                    params.cate_temp.forEach(item => new_cate.push('0'))
                    new_cate[0] = params.index.toString()
                    putVar("tg.xl.true_url", input);
                    putVar("tg.xl.category", JSON.stringify(new_cate));
                    refreshPage(false);
                    return "hiker://empty"
                }, {
                    cate_temp: cate_temp,
                    index: index
                }),
                col_type: 'scroll_button',
            })
        })
        d.push({
            col_type: "blank_block"
        })

        if (fold === '1') {
            categories.forEach((category, index) => {
                let sub_categories = pdfa(category, 'dl&&dd');
                sub_categories.forEach((item, key) => {
                    let title = pdfh(item, 'a&&Text')
                    let url = parseDom(item, 'a&&href')
                    d.push({
                        title: key.toString() === cate_temp[index + 1] ? '““””<b><span style="color: #FF0000">' + title + '</span></b>' : title,
                        url: $(url).lazyRule((params) => {
                            params.cate_temp[params.index + 1] = params.key.toString()
                            putVar("tg.xl.category", JSON.stringify(params.cate_temp))
                            putVar("tg.xl.true_url", input)
                            refreshPage(true)
                            return "hiker://empty"
                        }, {
                            cate_temp: cate_temp,
                            index: index,
                            key: key,
                        }),
                        col_type: 'scroll_button',
                    })
                })
                d.push({
                    col_type: "blank_block"
                })
            })
        }

    }

    const list = pdfa(html, '.content-list&&li')
    list.forEach(item => {
        d.push({
            title: pdfh(item, 'h3&&a&&Text'),
            desc: pdfh(item, '.bottom&&Text'),
            pic_url: pdfh(item, 'img&&src') + "@Referer=",
            url: parseDom(item, 'h3&&a&&href') + '#immersiveTheme#',
            col_type: 'movie_3_marquee',
        })
    })

    setResult(d);
}

const secParse = _ => {
    let d = [];
    const html = getResCode()

    const video_info = pdfh(html, '.main-left&&Html')

    d.push(
        {
            title: pdfh(video_info, 'h1&&Text'),
            desc: pdfh(video_info, '.movie-introduce&&Text'),
            pic_url: pdfh(video_info, 'img&&src') + "@Referer=http://www.xiletv.com/",
            url: MY_URL,
            col_type: 'movie_1_vertical_pic_blur'
        },
        {
            col_type: 'line'
        }
    )

    const sBox_list = pdfa(html, '.main-left-1&&.sBox')
    sBox_list.forEach(sb => {
        d.push({
            title: pdfh(sb, 'h2&&Text') || '默认线路',
            url: "hiker://empty",
            col_type: 'text_1',
        })
        let list = pdfa(sb, '.player&&li')
        list.forEach(item => {
            d.push({
                title: pdfh(item, 'a&&Text'),
                url: $(parseDom(item, 'a&&href')).lazyRule(() => {
                    return pdfh(fetch(input), 'iframe&&src').split("?url=")[1]
                }),
                // col_type: 'text_5',
                col_type: 'flex_button',
            })
        })
    })

    setResult(d);
}