const baseParse = _ => {
    let d = [];
    const [empty, page] = MY_URL.split('##')

    const className = getMyVar('JavTree.tyrantgenesis.className', 'last')
    let url = getMyVar('JavTree.tyrantgenesis.url', 'https://javtree.com/last.html')
    url = url.replace('.html', '-' + page + '.html')

    if (parseInt(page) === 1) {
        d.push(
            {
                title: className === 'last' ? '““””<b><span style="color: #1cb96f">最新更新</span></b>' : '最新更新',
                url: $(empty).lazyRule(() => {
                    putMyVar('JavTree.tyrantgenesis.className', 'last')
                    putMyVar('JavTree.tyrantgenesis.url', 'https://javtree.com/last.html')
                    refreshPage(true)
                    return "hiker://empty"
                }),
                col_type: 'scroll_button',
            },
            {
                title: className === 'category' ? '““””<b><span style="color: #1cb96f">主題選片</span></b>' : '主題選片',
                url: $(empty).lazyRule(() => {
                    putMyVar('JavTree.tyrantgenesis.className', 'category')
                    putMyVar('JavTree.tyrantgenesis.url', 'https://javtree.com/last.html')
                    refreshPage(false)
                    return "hiker://empty"
                }),
                col_type: 'scroll_button',
            },
            {
                col_type: "blank_block"
            },
        )

        if (className === 'category') {
            const tags_html = fetch('https://javtree.com/tags.html')
            const tags = pdfa(tags_html, '.gm-main&&.gm-genre')
            tags.forEach(tag => {
                let list = pdfa(tag, '.list&&li')
                d.push({
                    title: pdfh(tag, '.title&&Text') + ':',
                    url: empty,
                    col_type: 'scroll_button',
                })
                list.forEach(item => {
                    let url = 'https://javtree.com' + pdfh(item, 'a&&href')
                    d.push({
                        title: pdfh(item, 'a&&Text').replace('#', ''),
                        url: $(url).lazyRule(() => {
                            putMyVar('JavTree.tyrantgenesis.className', 'category')
                            putMyVar('JavTree.tyrantgenesis.url', input)
                            refreshPage(true)
                            return "hiker://empty"
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

    const html = fetch(url)
    const list = pdfa(html, '.gm-list&&.item')

    list.forEach(item => {
        let pic_url = pdfh(item, 'img&&data-src')
        let url = 'https://javtree.com' + pdfh(item, '.title&&href')
        d.push({
            title: pdfh(item, '.info&&.title&&Text'),
            desc: pdfh(item, '.volume&&Text'),
            pic_url: pic_url.startsWith('http') ? pic_url : 'https:' + pic_url,
            url: $(url).lazyRule(() => {
                const html = fetch(input)
                const video_source_json = html.match(/var post = (.*?);/)[1]
                const video_source = JSON.parse(video_source_json).vods

                return JSON.stringify({
                    urls: video_source.map(item => item.source),
                    names: video_source.map(item => item.name)
                })
            }),
            col_type: 'movie_2',
        })
    })

    setResult(d);
}
