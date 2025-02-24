const baseParse = _ => {
    let d = []
    let [url, page] = MY_URL.split('##')
    const class_url = getMyVar('400.tyrantgenesis.class_url')
    if (class_url !== MY_RULE.class_url) {
        clearMyVar('400.tyrantgenesis.url')
        putMyVar('400.tyrantgenesis.class_url', MY_RULE.class_url)
    }

    url = getMyVar('400.tyrantgenesis.url', url)
    url = url.replace('.html', '-' + page + '.html')
    const html = fetch(url)

    if (parseInt(page) === 1) {
        const category = pdfa(html, '.gm-meta&&a')
        category.forEach(cate => {
            let className = pdfh(cate, 'a&&class')
            let title = pdfh(cate, 'a&&Text')
            d.push({
                title: className === 'on' ? '““””<b><span style="color: #1cb96f">' + title + "</span></b>" : title,
                url: $(pd(cate, 'a&&href')).lazyRule(() => {
                    putMyVar('400.tyrantgenesis.url', input)
                    refreshPage(true)
                    return "hiker://empty"
                }),
                col_type: 'scroll_button',
            })
        })

        d.push({
            col_type: "blank_block"
        })
    }

    const list = pdfa(html, '.gm-list&&.item')

    list.forEach(item => {
        let pic_url = pdfh(item, 'img&&data-src')
        d.push({
            title: pdfh(item, '.info&&.title&&Text'),
            desc: pdfh(item, '.tag2&&Text'),
            pic_url: pic_url.startsWith('http') ? pic_url : 'https:' + pic_url,
            url: pd(item, '.title&&href') + '#immersiveTheme#',
            col_type: 'movie_3_marquee',
        })
    })

    setResult(d);
}

const secParse = _ => {
    let d = [];
    const html = getResCode()
    const video_info = pdfh(html, '.gm-vod&&Html')
    const video_content = pdfa(video_info, '.more&&.info')

    d.push(
        {
            title: video_content.filter((item, index) => index < 3).map(item => pdfh(item, '.info&&Text')).join('\n'),
            desc: pdfh(video_content[video_content.length - 1], '.info&&Text'),
            url: MY_URL,
            pic_url: pd(video_info, 'img&&src'),
            col_type: 'movie_1_vertical_pic_blur',
        },
        {
            col_type: 'line_blank'
        },
    )

    const video_source_json = html.match(/var post = (.*?);/)[1]
    const video_source = JSON.parse(video_source_json).vods
    video_source.forEach(source => {
        let list = source.source
        d.push({
            title: source.name,
            url: list[0][1],
            pic_url: 'https://lanmeiguojiang.com/tubiao/movie/6.svg',
            col_type: 'avatar',
        })
        list.forEach(item => {
            d.push({
                title: item[0],
                url: item[1],
                col_type: 'text_3',
            })
        })
        d.push({
            col_type: 'line'
        })
    })

    setResult(d);
}
