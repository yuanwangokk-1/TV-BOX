const miss = {
    empty: 'hiker://empty',
    url: 'https://missav888.com/cn/',
    d: [],
    taskList: [],
    data: {
        category: getMyVar('MissAV.category', '0'),
        subCate: getMyVar('MissAV.subCate', '0'),
    },
    baseParse: () => {
        const page = parseInt(MY_URL.split('##')[1])

        let categoryList = JSON.parse(base64Decode("W3sidGl0bGUiOiLku4rml6Xng63pl6giLCJwYXRoIjoidG9kYXktaG90IiwidHlwZSI6InZpZGVvIiwic3ViIjpbXX0seyJ0aXRsZSI6IuacrOmAseeDremXqCIsInBhdGgiOiJ3ZWVrbHktaG90IiwidHlwZSI6InZpZGVvIiwic3ViIjpbXX0seyJ0aXRsZSI6IuacrOaciOeDremXqCIsInBhdGgiOiJtb250aGx5LWhvdCIsInR5cGUiOiJ2aWRlbyIsInN1YiI6W119LHsidGl0bGUiOiLkuK3mloflrZfluZUiLCJwYXRoIjoiY2hpbmVzZS1zdWJ0aXRsZSIsInR5cGUiOiJ2aWRlbyIsInN1YiI6W119LHsidGl0bGUiOiLmnIDov5Hmm7TmlrAiLCJwYXRoIjoibmV3IiwidHlwZSI6InZpZGVvIiwic3ViIjpbXX0seyJ0aXRsZSI6IuaWsOS9nOS4iuW4giIsInBhdGgiOiJyZWxlYXNlIiwidHlwZSI6InZpZGVvIiwic3ViIjpbXX0seyJ0aXRsZSI6Iue0oOS6uiIsInBhdGgiOiIiLCJ0eXBlIjoidmlkZW8iLCJzdWIiOlt7InRpdGxlIjoi57Sg5Lq6U0lSTyIsInBhdGgiOiJzaXJvIn0seyJ0aXRsZSI6Iue0oOS6ukxVWFUiLCJwYXRoIjoibHV4dSJ9LHsidGl0bGUiOiLntKDkurpHQU5BIiwicGF0aCI6ImdhbmEifSx7InRpdGxlIjoi57Sg5Lq6UFJFU1RJR0UgUFJFTUlVTSIsInBhdGgiOiJtYWFuIn0seyJ0aXRsZSI6Iue0oOS6ulMtQ1VURSIsInBhdGgiOiJzY3V0ZSJ9LHsidGl0bGUiOiLntKDkurpBUkEiLCJwYXRoIjoiYXJhIn1dfSx7InRpdGxlIjoi5peg56CBIiwicGF0aCI6IiIsInR5cGUiOiJ2aWRlbyIsInN1YiI6W3sidGl0bGUiOiLml6DnoIHmtYHlh7oiLCJwYXRoIjoidW5jZW5zb3JlZC1sZWFrIn0seyJ0aXRsZSI6IuaXoOeggUZDMiIsInBhdGgiOiJmYzIifSx7InRpdGxlIjoi5peg56CBSEVZWk8gIiwicGF0aCI6ImhleXpvIn0seyJ0aXRsZSI6IuaXoOeggeS4nOS6rOeDrSIsInBhdGgiOiJ0b2t5b2hvdCJ9LHsidGl0bGUiOiLml6DnoIFDYXJpYmJlYW5jb20iLCJwYXRoIjoiY2FyaWJiZWFuY29tIn0seyJ0aXRsZSI6IuaXoOeggUNhcmliYmVhbmNvbXByIiwicGF0aCI6ImNhcmliYmVhbmNvbXByIn0seyJ0aXRsZSI6IuaXoOeggTEwbXVzdW1lIiwicGF0aCI6IjEwbXVzdW1lIn0seyJ0aXRsZSI6IuaXoOeggXBhY29wYWNvbWFtYSIsInBhdGgiOiJwYWNvcGFjb21hbWEifSx7InRpdGxlIjoi5peg56CBR2FjaGluY28iLCJwYXRoIjoiZ2FjaGluY28ifSx7InRpdGxlIjoi5peg56CBWFhYLUFWIiwicGF0aCI6Inh4eGF2In0seyJ0aXRsZSI6IuaXoOeggeS6uuWmu+aWqSIsInBhdGgiOiJtYXJyaWVkc2xhc2gifSx7InRpdGxlIjoi5peg56CB6aG955quIDQ2MTAiLCJwYXRoIjoibmF1Z2h0eTQ2MTAifSx7InRpdGxlIjoi5peg56CB6aG955quIDA5MzAiLCJwYXRoIjoibmF1Z2h0eTA5MzAifV19LHsidGl0bGUiOiLlm73kuqcgQVYiLCJwYXRoIjoiIiwidHlwZSI6InZpZGVvIiwic3ViIjpbeyJ0aXRsZSI6Ium6u+ixhuS8oOWqkiIsInBhdGgiOiJtYWRvdSJ9LHsidGl0bGUiOiJUV0FWIiwicGF0aCI6InR3YXYifV19LHsidGl0bGUiOiJWUiIsInBhdGgiOiJnZW5yZXMvVlIiLCJ0eXBlIjoidmlkZW8iLCJzdWIiOltdfSx7InRpdGxlIjoiQVYg5b2x6K+EIiwicGF0aCI6ImFydGljbGVzIiwidHlwZSI6ImFydGljbGVzIiwic3ViIjpbXX0seyJ0aXRsZSI6IuWls+S8mOS4gOiniCIsInBhdGgiOiJhY3RyZXNzZXMiLCJ0eXBlIjoiYXZhdGFyIiwic3ViIjpbXX0seyJ0aXRsZSI6IuWls+S8mOaOkuihjCIsInBhdGgiOiJhY3RyZXNzZXMvcmFua2luZyIsInR5cGUiOiJhdmF0YXIiLCJzdWIiOltdfSx7InRpdGxlIjoi57G75Z6LIiwicGF0aCI6ImdlbnJlcyIsInR5cGUiOiJ0YWdzIiwic3ViIjpbXX0seyJ0aXRsZSI6IuWPkeihjOWVhiIsInBhdGgiOiJtYWtlcnMiLCJ0eXBlIjoidGFncyIsInN1YiI6W119XQ=="))
        const currentCate = categoryList[miss.data.category]
        let url

        const type = currentCate.type
        const path = currentCate.path

        if (currentCate.sub.length > 0) {
            url = miss.url + currentCate.sub[miss.data.subCate].path
        } else {
            url = miss.url + currentCate.path
        }
        url += '?page=' + page

        if (page === 1) {
            categoryList.forEach((cate, index) => {
                miss.d.push({
                    title: parseInt(miss.data.category) === index ? '‘‘’’<strong><font color="#ff1493">' + cate.title + '</font></strong>' : cate.title,
                    url: $(miss.empty).lazyRule((index) => {
                        putMyVar("MissAV.category", index.toString())
                        putMyVar("MissAV.subCate", '0')
                        refreshPage(true)
                        return "hiker://empty"
                    }, index),
                    col_type: 'scroll_button',
                })
            })

            if (currentCate.sub.length > 0) {
                miss.d.push({
                    col_type: 'blank_block',
                })
                currentCate.sub.forEach((cate, index) => {
                    miss.d.push({
                        title: parseInt(miss.data.subCate) === index ? '‘‘’’<strong><font color="#ff1493">' + cate.title + '</font></strong>' : cate.title,
                        url: $(miss.empty).lazyRule((index) => {
                            putMyVar("MissAV.subCate", index.toString())
                            refreshPage(true)
                            return "hiker://empty"
                        }, index),
                        col_type: 'scroll_button',
                    })
                })
            }
        }

        const html = fetch(url, {headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0)'}})

        switch (type) {
            case 'video':
                miss.videoType(html)
                break
            case 'articles':
                miss.articlesType(html)
                break
            case 'avatar':
                if ((path === 'actresses/ranking' && page === 1) || path !== 'actresses/ranking') {
                    miss.avatarType(html)
                }
                break
            case 'tags':
                miss.tagsType(html)
                break
            default:
                miss.videoType(html)
        }

        setResult(miss.d)
    },
    searchParse: () => {
        miss.videoType(getResCode())
        setResult(miss.d)
    },
    videoParse: (url) => {
        const html = fetch(url, {headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0)'}})
        const title = pdfh(html, 'h1&&Text')
        setPageTitle(title)

        miss.d.push({
            title: title,
            desc: pdfh(html, '.text-secondary.break-all.line-clamp-2&&Text'),
            pic_url: pdfh(html, 'meta[property=og:image]&&content') + '@Referer=' + miss.url,
            url: $(miss.empty + '#noHistory#').lazyRule((html, url) => {
                eval(html.match(/eval.*?\n/)[0])
                return source + ';{Referer@' + url + '}'
            }, html, miss.url),
            col_type: 'pic_1',
        })

        const text_secondary_list = pdfa(html, 'body&&.text-secondary')
        let num, actressesList, tagsList, series, makers, directors, labelsList

        text_secondary_list.forEach(item => {
            let current_title = pdfh(item, 'span&&Text')

            // 不能分享，加密处理
            let actressName = base64Decode('5aWz5LyY')

            if (current_title === '番号:') {
                num = pdfh(item, '.font-medium&&Text')
            } else if (current_title === actressName + ':') {
                actressesList = pdfa(item, '.text-secondary&&a')
            } else if (current_title === '类型:') {
                tagsList = pdfa(item, '.text-secondary&&a')
            } else if (current_title === '系列:') {
                series = pdfa(item, '.text-secondary&&a')[0]
            } else if (current_title === '发行商:') {
                makers = pdfa(item, '.text-secondary&&a')[0]
            } else if (current_title === '导演:') {
                directors = pdfa(item, '.text-secondary&&a')[0]
            } else if (current_title === '标籤:') {
                labelsList = pdfa(item, '.text-secondary&&a')
            }
        })

        if (num) {
            miss.d.push({
                title: '番号',
                url: miss.empty,
                col_type: 'text_center_1',
                extra: {lineVisible: false},
            })
            miss.d.push({
                title: num,
                url: 'copy://' + num,
                col_type: 'text_1',
                extra: {lineVisible: false},
            })
            miss.d.push({
                col_type: 'line_blank'
            })
        }

        if (actressesList) {
            miss.d.push({
                title: '演员',
                url: miss.empty,
                col_type: 'text_center_1',
                extra: {lineVisible: false},
            })
            actressesList.forEach((actresses, index) => {
                let title = pdfh(actresses, 'a&&Text')
                let url = pdfh(actresses, 'a&&href')
                miss.taskList.push({
                    func: miss.updateAvatar,
                    param: {
                        url: url,
                        index: 'avatar_' + index
                    },
                    id: 'avatar_' + index,
                })

                miss.d.push({
                    title: title,
                    pic_url: miss.empty,
                    url: $(url + '?page=fypage#noHistory#').rule((title) => {
                        const miss = $.require('hiker://page/miss')
                        setPageTitle(title)
                        miss.avatarParse(MY_URL)
                        setResult(miss.d)
                    }, title),
                    col_type: 'avatar',
                    extra: {
                        id: 'avatar_' + index,
                    }
                })
            })
            miss.d.push({
                col_type: 'line_blank'
            })
        }

        if (tagsList) {
            miss.d.push({
                title: '类型',
                url: miss.empty,
                col_type: 'text_center_1',
                extra: {lineVisible: false},
            })
            tagsList.forEach(tag => {
                let tag_title = pdfh(tag, 'a&&Text')
                miss.d.push({
                    title: tag_title,
                    url: $(pdfh(tag, 'a&&href') + '?page=fypage#noHistory#').rule((tag_title) => {
                        const miss = $.require('hiker://page/miss')
                        setPageTitle(tag_title)
                        miss.tagsParse(MY_URL)
                        setResult(miss.d)
                    }, tag_title),
                    col_type: 'flex_button'
                })
            })

            miss.d.push({
                col_type: 'line_blank'
            })
        }

        if (series) {
            miss.d.push({
                title: '系列',
                url: miss.empty,
                col_type: 'text_center_1',
                extra: {lineVisible: false},
            })
            let series_title = pdfh(series, 'a&&Text')
            miss.d.push({
                title: series_title,
                url: $(pdfh(series, 'a&&href') + '?page=fypage#noHistory#').rule((series_title) => {
                    const miss = $.require('hiker://page/miss')
                    setPageTitle(series_title)
                    miss.tagsParse(MY_URL)
                    setResult(miss.d)
                }, series_title),
                col_type: 'flex_button'
            })
            miss.d.push({
                col_type: 'line_blank'
            })
        }

        if (makers) {
            miss.d.push({
                title: '发行商',
                url: miss.empty,
                col_type: 'text_center_1',
                extra: {lineVisible: false},
            })
            let makers_title = pdfh(makers, 'a&&Text')
            miss.d.push({
                title: makers_title,
                url: $(pdfh(makers, 'a&&href') + '?page=fypage#noHistory#').rule((makers_title) => {
                    const miss = $.require('hiker://page/miss')
                    setPageTitle(makers_title)
                    miss.tagsParse(MY_URL)
                    setResult(miss.d)
                }, makers_title),
                col_type: 'flex_button'
            })
            miss.d.push({
                col_type: 'line_blank'
            })
        }

        if (directors) {
            miss.d.push({
                title: '导演',
                url: miss.empty,
                col_type: 'text_center_1',
                extra: {lineVisible: false},
            })
            let directors_title = pdfh(directors, 'a&&Text')
            miss.d.push({
                title: directors_title,
                url: $(pdfh(directors, 'a&&href') + '?page=fypage#noHistory#').rule((directors_title) => {
                    const miss = $.require('hiker://page/miss')
                    setPageTitle(directors_title)
                    miss.tagsParse(MY_URL)
                    setResult(miss.d)
                }, directors_title),
                col_type: 'flex_button'
            })
            miss.d.push({
                col_type: 'line_blank'
            })
        }

        if (labelsList) {
            miss.d.push({
                title: '类型',
                url: miss.empty,
                col_type: 'text_center_1',
                extra: {lineVisible: false},
            })
            labelsList.forEach(label => {
                let label_title = pdfh(label, 'a&&Text')
                miss.d.push({
                    title: label_title,
                    url: $(pdfh(label, 'a&&href') + '?page=fypage#noHistory#').rule((label_title) => {
                        const miss = $.require('hiker://page/miss')
                        setPageTitle(label_title)
                        miss.tagsParse(MY_URL)
                        setResult(miss.d)
                    }, label_title),
                    col_type: 'flex_button'
                })
            })

            miss.d.push({
                col_type: 'line_blank'
            })
        }

        /*const videoList = pdfa(html, '.grid.grid-cols-2.gap-5&&.relative')

        miss.d.push({
          title: '推荐视频',
          url: miss.empty,
          col_type: 'text_center_1',
          extra: {lineVisible: false},
        })
        videoList.forEach(item => {
          miss.d.push({
            title: pdfh(item, '.lozad&&alt'),
            url: $(pdfh(item, 'a&&href')+'#noHistory#').rule(() => {
              const miss = $.require('hiker://page/miss')
              miss.videoParse(MY_URL)
              setResult(miss.d)
              if (miss.taskList.length > 0) {
                be(miss.taskList)
              }
            }),
            pic_url: pdfh(item, '.lozad&&data-src')+'@Referer='+miss.url,
            desc: pdfh(item, '.absolute&&Text'),
            col_type: 'movie_2'
          })
        })*/
    },
    avatarParse: (url) => {
        const html = fetch(url, {headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0)'}})
        miss.videoType(html)
    },
    tagsParse: (url) => {
        const html = fetch(url, {headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0)'}})
        miss.videoType(html)
    },
    videoType: (html) => {
        const list = pdfa(html, '.grid&&.relative')
        list.forEach(item => {
            miss.d.push({
                title: pdfh(item, '.lozad&&alt'),
                url: $(pdfh(item, 'a&&href') + '#noHistory#').rule(() => {
                    const miss = $.require('hiker://page/miss')
                    miss.videoParse(MY_URL)
                    setResult(miss.d)
                    if (miss.taskList.length > 0) {
                        be(miss.taskList)
                    }
                }),
                pic_url: pdfh(item, '.lozad&&data-src') + '@Referer=' + miss.url,
                desc: pdfh(item, '.absolute&&Text'),
                col_type: 'movie_2'
            })
        })
    },
    articlesType: (html) => {
        const list = pdfa(html, '.grid&&.rounded-lg')
        list.forEach(item => {
            miss.d.push({
                title: pdfh(item, 'img&&alt'),
                url: $(pdfh(item, 'a&&href') + '#noHistory#').rule(() => {
                    const miss = $.require('hiker://page/miss')
                    const html = fetch(MY_URL, {headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0)'}})

                    miss.d.push({
                        title: pdfh(html, 'article&&Html'),
                        col_type: 'rich_text'
                    })

                    setResult(miss.d)
                }),
                pic_url: pdfh(item, 'img&&data-src') + '@Referer=' + miss.url,
                col_type: 'movie_2'
            })
        })
    },
    avatarType: (html) => {
        const list = pdfa(html, '.max-w-full&&ul&&li')
        list.forEach(item => {
            miss.d.push({
                title: pdfh(item, 'h4&&Text'),
                url: $(pdfh(item, 'a&&href') + '?page=fypage#noHistory#').rule(() => {
                    const miss = $.require('hiker://page/miss')
                    miss.avatarParse(MY_URL)
                    setResult(miss.d)
                }),
                pic_url: pdfh(item, 'img&&src') + '@Referer=' + miss.url,
                col_type: 'icon_round_4'
            })
        })
    },
    tagsType: (html) => {
        const list = pdfa(html, '.gap-4&&div')
        list.forEach(item => {
            miss.d.push({
                title: pdfh(item, 'a&&Text'),
                url: $(pdfh(item, 'a&&href') + '?page=fypage#noHistory#').rule(() => {
                    const miss = $.require('hiker://page/miss')
                    miss.tagsParse(MY_URL)
                    setResult(miss.d)
                }),
                col_type: 'text_4'
            })
        })
    },
    updateAvatar: (param) => {
        const actressesHtml = fetch(param.url, {headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0)'}})

        updateItem({
            pic_url: pdfh(actressesHtml, '.object-cover.object-top.w-full.h-full&&src'),
            col_type: 'avatar',
            extra: {
                id: param.index
            }
        })
    },
}

$.exports = miss
