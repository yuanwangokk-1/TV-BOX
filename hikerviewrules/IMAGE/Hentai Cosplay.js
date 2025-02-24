const empty = 'hiker://empty'

const baseParse = () => {
    const d = []
    const type_arr = MY_URL.match(/com\/(.*?)\/page/)

    if (type_arr && type_arr.length === 2) {
        const type = type_arr[1]
        switch (type) {
            case 'ranking':
            case 'recently':
                archiveParse(d)
                break
            case 'search-video':
            case 'ranking-video':
                videoParse(d)
                break
            case 'ranking-tag':
            case 'ranking-keyword':
            case 'tag':
                tagParse(d)
                break
            case 'ranking-images':
                imageParse(d)
                break
        }
    }

    setResult(d)
}

const archiveParse = (d) => {
    const list = pdfa(getResCode(), '#image-list&&.image-list-item')
    list.forEach(item => {
        let url = 'https://hentai-cosplays.com/story/' + pdfh(item, 'a&&href').match(/image\/(.*?)\//)[1] + '/'
        d.push({
            title: pdfh(item, '.image-list-item-title&&Text'),
            desc: pdfh(item, '.image-list-item-regist-date&&Text'),
            url: $(empty).lazyRule((url) => {
                require('hiker://page/az')
                return descParse(url)
            }, url),
            pic_url: pdfh(item, '.image-list-item-image&&img&&src'),
            col_type: 'movie_3_marquee',
        })
    })
}

const videoParse = (d) => {
    const list = pdfa(getResCode(), '#image-list&&.image-list-item')
    list.forEach(item => {
        d.push({
            title: pdfh(item, '.image-list-item-title&&Text'),
            desc: pdfh(item, '.image-list-item-regist-date&&Text'),
            url: $(pd(item, 'a&&href')).lazyRule(() => {
                require('hiker://page/az')
                return descVideoParse(input)
            }),
            pic_url: pdfh(item, '.image-list-item-image&&img&&src'),
            col_type: 'movie_3_marquee',
        })
    })
}

const tagParse = (d) => {
    const list = pdfa(getResCode(), '#tags&&li')
    list.forEach(item => {
        d.push({
            title: pdfh(item, 'a&&Text'),
            url: $(pd(item, 'a&&href') + 'page/fypage/').rule(() => {
                require('hiker://page/az')
                let d = []
                archiveParse(d)
                setResult(d)
            }),
            col_type: 'text_3',
        })
    })
}

const imageParse = (d) => {
    const list = pdfa(getResCode(), '#wrapper&&#container&&.item')
    list.forEach(item => {
        let url = 'https://hentai-cosplays.com/story/' + pdfh(item, 'a&&href').match(/image\/(.*?)\/attachment/)[1] + '/'
        d.push({
            title: pdfh(item, 'img&&alt'),
            url: $(empty).lazyRule((url) => {
                require('hiker://page/az')
                return descParse(url)
            }, url),
            pic_url: pdfh(item, 'img&&data-original'),
            col_type: 'movie_3_marquee',
        })
    })
}

const descParse = (url) => {
    const html = request(url)
    const list = pdfa(html, 'amp-story&&amp-story-page')
    const images = []

    list.forEach(item => {
        images.push(pdfh(item, 'amp-img&&src'))
    })

    return 'pics://' + images.join('&&')
}

const descVideoParse = (url) => {
    const html = request(url)
    const match = html.match(/"contentUrl": "(.*?)",/)

    return match[1]
}

const searchParse = () => {
    const d = []
    archiveParse(d)
    setResult(d)
}
