const histar = {
    empty: 'hiker://empty',
    url: 'https://www.histar.tv/',
    d: [],
    categoryColor: '#1cb96f',
    params: {
        category: getMyVar('Histar.tg.category', 'movie'),
        type: getMyVar('Histar.tg.type', 'movie'),
        nextCate: getMyVar('Histar.tg.nextCate', 'all/all/all'),
    },
    data: {
        type: [
            {title: '电影', key: 'movie', type: 'movie', homepage: 'https://www.histar.tv/movie/'},
            {title: '电视剧', key: 'drama', type: 'movie', homepage: 'https://www.histar.tv/drama/'},
            {title: '综艺', key: 'variety', type: 'movie', homepage: 'https://www.histar.tv/variety/'},
            {title: '纪录片', key: 'documentary', type: 'movie', homepage: 'https://www.histar.tv/documentary/'},
            {title: '动漫', key: 'animation', type: 'movie', homepage: 'https://www.histar.tv/animation/'},
            {title: '电视直播', key: 'live', type: 'live', homepage: 'https://www.histar.tv/live'},
        ],
    },
    baseParse: () => {
        const page = MY_URL.split('##')[1]

        if (page === '1') {
            histar.data.type.forEach((item) => {
                histar.d.push({
                    title: histar.params.category === item.key ? '‘‘’’<strong><font color="' + histar.categoryColor + '">' + item.title + '</font></strong>' : item.title,
                    url: $(histar.empty).lazyRule((item) => {
                        putMyVar("Histar.tg.category", item.key)
                        putMyVar("Histar.tg.type", item.type)
                        putMyVar("Histar.tg.nextCate", 'all/all/all')
                        refreshPage(true)
                        return "hiker://empty"
                    }, item),
                    col_type: 'scroll_button',
                })
            })

            histar.d.push({
                col_type: 'blank_block',
            })
        }

        if (histar.params.type === 'movie') {
            histar.movieTypeCateParse(page)
        } else if (histar.params.type === 'live') {
            histar.liveTypeCateParse(page)
        }

        setResult(histar.d)
    },
    movieTypeCateParse: (page) => {
        const classname = '._tag__filterItem__vBNf8'
        const typeItem = histar.data.type.find((item) => item.key === histar.params.category)
        if (typeItem) {
            const url = typeItem.homepage + histar.params.nextCate
            const html = fetch(url)

            if (page === '1') {
                const list = pdfa(html, 'body&&' + classname)

                list.forEach((item, index) => {
                    const nextList = pdfa(item, classname + '&&a')
                    nextList.forEach((nextItem) => {
                        const title = pdfh(nextItem, 'a&&Text')
                        const href = pdfh(nextItem, 'a&&href')
                        const cate = href.replace('/' + typeItem.key + '/', '')

                        histar.d.push({
                            title: histar.params.nextCate === cate ? '‘‘’’<strong><font color="' + histar.categoryColor + '">' + title + '</font></strong>' : title,
                            url: $(histar.empty).lazyRule((cate) => {
                                putMyVar("Histar.tg.nextCate", cate)
                                refreshPage(true)
                                return "hiker://empty"
                            }, cate),
                            col_type: 'scroll_button',
                        })
                    })

                    histar.d.push({
                        col_type: 'blank_block',
                    })
                })
            }

            try {
                const script = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/)[1]
                const siteJson = JSON.parse(script)
                const nextCateArray = histar.params.nextCate.split('/')
                const filterCondition = siteJson.props.pageProps.filterCondition
                const labelItem = nextCateArray[1] === 'all' ? '' : filterCondition.label.find((label) => label[1] === nextCateArray[1])
                const countryItem = nextCateArray[2] === 'all' ? '' : filterCondition.country.find((label) => label === nextCateArray[2])

                const params = {
                    page: Number(page),
                    pageSize: 18,
                    chName: typeItem.title,
                }

                if (labelItem) params.label = labelItem[0]
                if (countryItem) params.country = countryItem

                const resJson = fetch('https://aws.ulivetv.net/v3/web/api/filter', {
                    body: params,
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'appid': '6fd0866dffd24341c680ed4a5417bdca',
                        'user-agent': PC_UA,
                        'origin': histar.url,
                        'referer': histar.url,
                    }
                })

                const movieList = JSON.parse(resJson).data.list

                movieList.forEach((item) => {
                    histar.d.push({
                        title: item.name,
                        img: item.img,
                        url: $(histar.url + 'vod/detail/' + item.id + '#immersiveTheme#').rule(() => {
                            const histar = $.require('hiker://page/histar')
                            histar.movieDetailParse()
                            setResult(histar.d)
                        }),
                        col_type: 'movie_3_marquee',
                    })
                })

            } catch (e) {
                log('数据格式错误')
            }
        }
    },
    liveTypeCateParse: () => {

    },
    movieDetailParse: () => {
        const html = getResCode()
        const section = pdfa(html, 'body&&section')[0]

        histar.d.push({
            title: pdfa(section, 'section&&.textEllipsis').map(item => pdfh(item, '.textEllipsis&&Text')).join('\n'),
            desc: pdfh(section, '.detail_desc__NWoOa&&Text'),
            url: MY_URL,
            pic_url: pdfh(section, 'img&&src'),
            col_type: 'movie_1_vertical_pic_blur',
        })

        histar.d.push({
            col_type: 'big_blank_block'
        })

        const list = pdfa(html, '.detail_selections__gpJG5&&a')

        if (list.length > 0) {
            histar.d.push({
                title: '选集',
                url: "hiker://empty",
                col_type: 'text_center_1',
            })
            list.forEach((item) => {
                histar.d.push({
                    title: pdfh(item, 'a&&Text'),
                    url: $(pd(item, 'a&&href')).lazyRule(() => {
                        const histar = $.require('hiker://page/histar')
                        return histar.videoParse(input)
                    }),
                    col_type: 'text_3',
                })
            })
        } else {
            histar.d.push({
                title: '播放',
                url: $(pd(html, '.detail_play__qgcEQ&&href')).lazyRule(() => {
                    const histar = $.require('hiker://page/histar')
                    return histar.videoParse(input)
                }),
                col_type: 'text_center_1',
            })
        }
    },
    videoParse: (url) => {
        const html = fetch(url)

        const script = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/)[1]
        const siteJson = JSON.parse(script)

        return siteJson.props.pageProps.playUrl
    },
}

$.exports = histar
