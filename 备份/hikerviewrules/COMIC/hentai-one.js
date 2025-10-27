const one = {
    empty: 'hiker://empty',
    d: [],
    data: {
        subTab: getMyVar('HentaiOne.subTab', '0'),
    },
    baseParse: () => {
        const [url, page] = MY_URL.split('##')
        one.list(pdfa(fetch(url + '/?page=' + page), '.gallery-list&&a'))
        setResult(one.d)
    },
    searchParse: () => {
        one.list(pdfa(getResCode(), '#list&&a'))
        setResult(one.d)
    },
    list: (list) => {
        list.forEach(item => {
            let title = pdfh(item, '.gallery-item-ttl&&Text')
            let url = pd(item, 'a&&href')
            let pic_url = pdfh(item, 'img&&src')
            one.d.push({
                title: title,
                url: $(url + '#immersiveTheme#').rule((title, url, pic_url) => {
                    const one = $.require('hiker://page/one')
                    one.detail(title, url, pic_url)
                    setResult(one.d)
                }, title, url, pic_url),
                pic_url: pic_url,
                col_type: 'movie_3',
            })
        })
    },
    detail: (title, url, pic_url) => {
        setPageTitle(title)
        const html = getResCode()
        one.d.push({
            title: title,
            url: url,
            pic_url: pic_url,
            col_type: 'movie_1_vertical_pic_blur',
        })
        one.d.push({
            col_type: 'line_blank'
        })

        const tags = pdfa(html, '.detail-infos&&.detail-tags,4&&a')

        tags.forEach(tag => {
            let title = pdfh(tag, 'a&&Text')
            let url = pd(tag, 'a&&href')
            one.d.push({
                title: pdfh(tag, 'a&&Text'),
                url: $(url + '?page=fypage').rule((title) => {
                    const one = $.require('hiker://page/one')
                    one.tag(title)
                    setResult(one.d)
                }, title),
                col_type: 'flex_button',
            })
        })

        one.d.push({
            col_type: 'line_blank'
        })

        const desc_url = pd(html, '.detail-link-row&&a&&href')

        one.d.push({
            title: '浏览',
            url: one.getPics(desc_url),
            col_type: 'text_center_1',
        })
        one.d.push({
            col_type: 'line_blank'
        })

        one.d.push({
            title: '相似内容',
            url: one.empty,
            col_type: 'text_1',
        })

        one.list(pdfa(html, '.gallery-list&&a'))
    },
    tag: (title) => {
        setPageTitle(title)
        try {
            one.list(pdfa(getResCode(), '.gallery-list&&a'))
        } catch (e) {
        }
    },
    getPics: (url) => {
        const img_list = []
        const html = fetch(url)
        const match = html.match(/\\"src\\":\\"(.*?)\\"/g)
        match.forEach(img => {
            img_list.push(img.replace(/\\"src\\":\\"(.*?)\\"/, "$1"))
        })
        return 'pics://' + img_list.join('&&')
    },
}

$.exports = one
