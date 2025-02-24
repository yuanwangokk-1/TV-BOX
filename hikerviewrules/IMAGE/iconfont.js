const Iconfont = {
    empty: 'hiker://empty',
    d: [],
    files: {
        likes: "hiker://files/rules/js/TyrantGenesis_Iconfont收藏.js",
    },
    collectionListParse: (list) => {
        list.forEach(item => {
            Iconfont.d.push(
                {
                    title: item.User.nickname,
                    url: $(Iconfont.empty).rule((id) => {
                        const Iconfont = $.require('hiker://page/Iconfont')
                        Iconfont.userParse(id)
                        setResult(Iconfont.d)
                    }, item.User.id),
                    pic_url: 'https:' + item.User.avatar + '@Referer=https://www.iconfont.cn/',
                    col_type: 'avatar',
                },
                {
                    title: '图标集：' + item.name,
                    url: $(Iconfont.empty).rule((id) => {
                        const Iconfont = $.require('hiker://page/Iconfont')
                        Iconfont.collectionParse(id)
                        setResult(Iconfont.d)
                    }, item.id),
                    col_type: 'text_1',
                    extra: {
                        lineVisible: false,
                    },
                }
            )
            item.icons.forEach(icon => {
                let svg_url = 'https://iconfont.tyrantg.com/api/illustrate.svg?svg_string=' + encodeURIComponent(icon.show_svg)
                Iconfont.d.push({
                    title: icon.name,
                    url: $(Iconfont.empty).rule((name, show_svg) => {
                        const Iconfont = $.require('hiker://page/Iconfont')
                        Iconfont.iconParse(name, show_svg)
                        setResult(Iconfont.d)
                    }, icon.name, icon.show_svg),
                    pic_url: svg_url,
                    col_type: 'icon_5',
                })
            })
            Iconfont.d.push({
                col_type: 'line_blank'
            })
        })
    },
    userParse: (uid) => {
        const url = 'https://www.iconfont.cn/api/user/collections.json?uid=' + uid + '&type=icon'
        const json = JSON.parse(fetch(url))
        const list = json.data.collections

        list.forEach(item => {
            if (item.has_secret === 0) {
                Iconfont.d.push({
                    title: '图标集：' + item.name,
                    url: $(Iconfont.empty).rule((id) => {
                        const Iconfont = $.require('hiker://page/Iconfont')
                        Iconfont.collectionParse(id)
                        setResult(Iconfont.d)
                    }, item.id),
                    col_type: 'text_1',
                    extra: {
                        lineVisible: false,
                    },
                })
                item.icons.forEach(icon => {
                    let svg_url = 'https://iconfont.tyrantg.com/api/illustrate.svg?svg_string=' + encodeURIComponent(icon.show_svg)
                    Iconfont.d.push({
                        title: icon.name,
                        url: $(Iconfont.empty).rule((name, show_svg) => {
                            const Iconfont = $.require('hiker://page/Iconfont')
                            Iconfont.iconParse(name, show_svg)
                            setResult(Iconfont.d)
                        }, icon.name, icon.show_svg),
                        pic_url: svg_url,
                        col_type: 'icon_5',
                    })
                })
                Iconfont.d.push({
                    col_type: 'line_blank'
                })
            }
        })
    },
    iconParse: (name, svg_url) => {
        let true_svg_url = 'https://iconfont.tyrantg.com/api/illustrate.svg?svg_string=' + encodeURIComponent(svg_url)
        Iconfont.d.push(
            {
                url: 'copy://' + true_svg_url,
                pic_url: true_svg_url,
                col_type: 'pic_1_full',
            },
            {
                title: '复制图标',
                url: 'copy://' + true_svg_url,
                col_type: 'text_center_1',
            },
            {
                title: '复制SVG',
                url: 'copy://' + svg_url,
                col_type: 'text_center_1',
            },
            {
                title: '收藏图标',
                url: $(true_svg_url).lazyRule((name, svg_url) => {
                    const Iconfont = $.require('hiker://page/Iconfont')
                    let attention = name + '$$$' + svg_url

                    if (!fileExist(Iconfont.files.likes)) {
                        writeFile(Iconfont.files.likes, attention)
                    } else {
                        writeFile(Iconfont.files.likes, fetch(Iconfont.files.likes) + "\n" + attention)
                    }
                    refreshPage(false)
                    return "toast://收藏成功"
                }, name, svg_url),
                col_type: 'text_center_1',
            },
        )
    },
    collectionParse: (id) => {
        const url = 'https://www.iconfont.cn/api/collection/detail.json?id=' + id
        const json = JSON.parse(fetch(url))
        const list = json.data.icons

        list.forEach(icon => {
            let svg_url = 'https://iconfont.tyrantg.com/api/illustrate.svg?svg_string=' + encodeURIComponent(icon.show_svg)
            Iconfont.d.push({
                title: icon.name,
                url: $(Iconfont.empty).rule((name, show_svg) => {
                    const Iconfont = $.require('hiker://page/Iconfont')
                    Iconfont.iconParse(name, show_svg)
                    setResult(Iconfont.d)
                }, icon.name, icon.show_svg),
                pic_url: svg_url,
                col_type: 'icon_5',
            })
        })
    },
    baseParse: () => {
        const json = JSON.parse(getResCode())

        if (parseInt(MY_PAGE) === 1) {
            Iconfont.d.push(
                {
                    url: $(Iconfont.empty + "#fullTheme#$$fypage").rule(() => {
                        const Iconfont = $.require('hiker://page/Iconfont')
                        Iconfont.iconSearchParse()
                        setResult(Iconfont.d)
                    }),
                    pic_url: 'https://iconfont.tyrantg.com/search.svg',
                    title: '单图标搜索',
                    col_type: "icon_4",
                },
                {
                    url: $(Iconfont.empty + "#fullTheme#$$fypage").rule(() => {
                        const Iconfont = $.require('hiker://page/Iconfont')
                        Iconfont.collectionSearchParse()
                        setResult(Iconfont.d)
                    }),
                    pic_url: 'https://iconfont.tyrantg.com/collection.svg',
                    title: '图标集搜索',
                    col_type: "icon_4",
                },
                {
                    url: $(Iconfont.empty).rule(() => {
                        const Iconfont = $.require('hiker://page/Iconfont')
                        Iconfont.likesParse()
                        setResult(Iconfont.d)
                    }),
                    pic_url: 'https://iconfont.tyrantg.com/like.svg',
                    title: '收藏图标',
                    col_type: "icon_4",
                },
                // {
                //     url: $(Iconfont.empty+"#fullTheme#$$fypage").rule(() => {
                //         const Iconfont = $.require('hiker://page/Iconfont')
                //         Iconfont.likesParse()
                //         setResult(Iconfont.d)
                //     }),
                //     pic_url: 'https://iconfont.tyrantg.com/tool.svg',
                //     title: '工具',
                //     col_type: "icon_4",
                // },
                {
                    col_type: 'line_blank'
                }
            )
        }

        Iconfont.collectionListParse(json.data.lists)
        setResult(Iconfont.d)
    },
    collectionSearchParse: () => {
        addListener('onClose', $.toString(() => {
            clearItem('searchValue')
        }))

        const page = MY_URL.split('$$')[1]

        if (parseInt(page) === 1) {
            Iconfont.d.push({
                title: '搜索',
                url: $.toString(() => {
                    setItem('searchValue', input)
                    refreshPage(false)
                    return "hiker://empty"
                }),
                desc: '请输入关键词',
                col_type: 'input',
                extra: {
                    defaultValue: getItem('searchValue', ''),
                    onChange: $.toString(() => {
                        if (getItem('searchValue', '') && !input) {
                            clearItem('searchValue')
                            refreshPage(false)
                            return "hiker://empty"
                        }
                    })
                }
            })
        }

        const url = 'https://www.iconfont.cn/api/collections.json?type=3&sort=time&limit=8&page=' + page + '&keyword=' + getItem('searchValue', '')
        const json = JSON.parse(fetch(url))
        Iconfont.collectionListParse(json.data.lists)
        setResult(Iconfont.d)
    },
    iconSearchParse: () => {
        addListener('onClose', $.toString(() => {
            clearItem('searchValue')
        }))

        const page = MY_URL.split('$$')[1]

        if (parseInt(page) === 1) {
            Iconfont.d.push({
                title: '搜索',
                url: $.toString(() => {
                    setItem('searchValue', input)
                    refreshPage(false)
                    return "hiker://empty"
                }),
                desc: '请输入关键词',
                col_type: 'input',
                extra: {
                    defaultValue: getItem('searchValue', ''),
                    onChange: $.toString(() => {
                        if (getItem('searchValue', '') && !input) {
                            clearItem('searchValue')
                            refreshPage(false)
                            return "hiker://empty"
                        }
                    })
                }
            })
        }

        if (getItem('searchValue', '') !== '') {
            const json = JSON.parse(fetch('https://www.iconfont.cn/api/icon/search.json', {
                headers: {
                    Cookie: 'ctoken=ctoken;',
                },
                method: 'POST',
                body: {
                    q: getItem('searchValue', ''),
                    sortType: 'updated_at',
                    page: page,
                    pageSize: 60,
                    ctoken: 'ctoken',
                }
            }))

            const list = json.data.icons

            list.forEach(icon => {
                let svg_url = 'https://iconfont.tyrantg.com/api/illustrate.svg?svg_string=' + encodeURIComponent(icon.show_svg)
                Iconfont.d.push({
                    title: icon.name,
                    url: $(Iconfont.empty).rule((name, show_svg) => {
                        const Iconfont = $.require('hiker://page/Iconfont')
                        Iconfont.iconParse(name, show_svg)
                        setResult(Iconfont.d)
                    }, icon.name, icon.show_svg),
                    pic_url: svg_url,
                    col_type: 'icon_5',
                })
            })
        }
    },
    likesParse: () => {
        const list = fetch(Iconfont.files.likes).split("\n")

        list.forEach((icon, index) => {
            if (icon) {
                let [name, svg] = icon.split('$$$')
                let svg_url = 'https://iconfont.tyrantg.com/api/illustrate.svg?svg_string=' + encodeURIComponent(svg)

                Iconfont.d.push({
                    title: name,
                    url: $(Iconfont.empty).rule((name, svg) => {
                        const Iconfont = $.require('hiker://page/Iconfont')
                        Iconfont.iconParse(name, svg)
                        setResult(Iconfont.d)
                    }, name, svg),
                    pic_url: svg_url,
                    col_type: 'icon_5',
                    extra: {
                        longClick: [
                            {
                                title: '置顶图标',
                                js: $.toString((list, index) => {
                                    const Iconfont = $.require('hiker://page/Iconfont')
                                    const current = list[index]
                                    list.splice(index, 1)
                                    list.unshift(current)
                                    writeFile(Iconfont.files.likes, list.join("\n"))
                                    refreshPage(false)
                                    return "toast://置顶成功"
                                }, list, index)
                            },
                            {
                                title: '取消收藏',
                                js: $.toString((list, index) => {
                                    const Iconfont = $.require('hiker://page/Iconfont')
                                    list.splice(index, 1)
                                    writeFile(Iconfont.files.likes, list.join("\n"))
                                    refreshPage(false)
                                    return "toast://取消成功"
                                }, list, index)
                            },
                        ],
                    },
                })
            }
        })
    },
}

$.exports = Iconfont
