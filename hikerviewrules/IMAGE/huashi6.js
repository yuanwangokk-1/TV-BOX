const channels_path = "hiker://files/rules/js/TyrantGenesis_触站关注.js"
const base_url = "https://www.huashi6.com"
const empty = "hiker://empty"

const baseParse = _ => {
    // 初始化
    let d = [];
    const page = MY_URL.split('##')[1]
    const cateArray = [
        {
            title: '关注画师',
            url: empty,
        },
        {
            title: '新作',
            url: "https://rt.huashi6.com/front/works/sharelist?index=" + page,
        },
        {
            title: '热门',
            url: "https://rt.huashi6.com/front/works/hotlist?index=" + page,
        },
        /*{
            title: '标签',
            url: "https://www.huashi6.com/tags",
        },*/
        {
            title: '今日榜单',
            url: "https://rt.huashi6.com/front/works/rank_page?index=0&size=50",
        },
        {
            title: '推荐画师',
            url: "https://rt.huashi6.com/front/painter/list?index=" + page + "&size=12",
        },
    ]
    let channels

    // 缓存
    let cate = getItem("cate_select", "0")
    let channel_select = getItem("channel_select", "0")
    let button_show = getItem("button_show", "1") // 1:热门,2:收起,3:取消,4:置顶

    if (fetch(channels_path)) {
        let local_channels = fetch(channels_path)
        channels = JSON.parse(local_channels)
    } else {
        let defaultChannels = [
            {
                name: 'wlop',
                uid: '7168',
                avatar: 'https://img2.huashi6.com/images/resource/2015/06/24/51h068746p0.jpg?imageView2/1/q/100/interlace/1/w/160/h/160'
            },
        ]
        writeFile(channels_path, JSON.stringify(defaultChannels))
        channels = defaultChannels
    }

    if (parseInt(page) === 1) {
        cateArray.forEach((item, index) => {
            d.push({
                title: parseInt(cate) === index ? '‘‘’’<strong><font color="red">' + item.title + '</font></strong>' : item.title,
                url: $(empty).lazyRule(params => {
                    setItem("cate_select", params.index.toString())
                    refreshPage(true)
                    return "hiker://empty"
                }, {
                    item: item,
                    index: index
                }),
                col_type: 'scroll_button',
            })
        })
    }

    switch (cate) {
        case '0': {
            if (parseInt(page) === 1) {
                d.push({
                    col_type: 'blank_block',
                })
                d.push({
                    title: button_show === '1' ? '‘‘’’<strong><font color="red">展开</font></strong>' : '展开',
                    url: $(empty).lazyRule(_ => {
                        setItem("button_show", '1')
                        refreshPage(true)
                        return "hiker://empty"
                    }),
                    col_type: 'scroll_button',
                })
                d.push({
                    title: button_show === '2' ? '‘‘’’<strong><font color="red">收起</font></strong>' : '收起',
                    url: $(empty).lazyRule(_ => {
                        setItem("button_show", '2')
                        refreshPage(true)
                        return "hiker://empty"
                    }),
                    col_type: 'scroll_button',
                })
                d.push({
                    title: button_show === '3' ? '‘‘’’<strong><font color="red">置顶</font></strong>' : '置顶',
                    url: $(empty).lazyRule(_ => {
                        setItem("button_show", '3')
                        refreshPage(true)
                        return "hiker://empty"
                    }),
                    col_type: 'scroll_button',
                })
                d.push({
                    title: button_show === '4' ? '‘‘’’<strong><font color="red">取关</font></strong>' : '取关',
                    url: $(empty).lazyRule(_ => {
                        setItem("button_show", '4')
                        refreshPage(true)
                        return "hiker://empty"
                    }),
                    col_type: 'scroll_button',
                })

                if (channels.length === 0) {
                    d.push({
                        title: '先关注几位画师吧~',
                        col_type: 'long_text',
                    })
                }
            }

            if (channels.length > 0) {
                if (button_show !== '2') {
                    let prefix = ''
                    switch (button_show) {
                        case '1':
                            prefix = '';
                            break
                        case '3':
                            prefix = '🔝';
                            break
                        case '4':
                            prefix = '❌';
                            break
                    }
                    if (parseInt(page) === 1) {
                        channels.forEach((channel, index) => {
                            d.push({
                                title: parseInt(channel_select) === index && button_show === '1' ? '✓' + channel.name : prefix + channel.name,
                                pic_url: channel.avatar + '@Referer=' + base_url,
                                url: $(empty).lazyRule(params => {
                                    const channels_path = "hiker://files/rules/js/TyrantGenesis_触站关注.js"
                                    if (params.button_show === '1') {
                                        setItem("channel_select", params.index.toString())
                                    } else if (params.button_show === '3') {
                                        let current = params.channels[params.index]
                                        params.channels.splice(params.index, 1)
                                        params.channels.unshift(current)
                                        writeFile(channels_path, JSON.stringify(params.channels))
                                        setItem("channel_select", '0')
                                    } else {
                                        params.channels.splice(params.index, 1)
                                        writeFile(channels_path, JSON.stringify(params.channels))
                                        setItem("channel_select", '0')
                                    }

                                    refreshPage(true)
                                    return "hiker://empty"
                                }, {
                                    index: index,
                                    button_show: button_show,
                                    channels: channels
                                }),
                                col_type: 'icon_round_4',
                            })
                        })
                        d.push({
                            col_type: 'blank_block',
                        })
                    }
                }

                let uid = channels[channel_select].uid
                let url = "https://rt.huashi6.com/front/works/painter?painterId=" + uid + "&index=" + page

                let html = fetch(url, {headers: {"User-Agent": PC_UA}})

                // let list = parseDomForArray(html, '.px-container&&.c-px-waterfall-item')
                let list = JSON.parse(html).data.datas

                /*list.forEach(item => {
                    d.push({
                        title: parseDomForHtml(item, '.px-info-title&&Text'),
                        pic_url: parseDomForHtml(item, 'img&&src')+'@Referer='+base_url,
                        url: parseDomForHtml(item, 'a&&href'),
                        desc: parseDomForHtml(item, '.px-info-title&&Text'),
                        col_type: 'movie_2'
                    })
                })*/
                list.forEach(item => {
                    d.push({
                        title: item.title,
                        pic_url: "https://img2.huashi6.com/" + item.coverImage.originalPath + '@Referer=' + base_url,
                        url: "https://www.huashi6.com/draw/" + item.id,
                        desc: item.likeNum + '次喜欢',
                        col_type: 'movie_2'
                    })
                })
            }
            break
        }
        case '1':
        case '2': {
            let html = fetch(cateArray[parseInt(cate)].url, {headers: {"User-Agent": PC_UA}})

            let list = JSON.parse(html).data.datas
            list.forEach(item => {
                d.push({
                    title: item.title,
                    pic_url: "https://img2.huashi6.com/" + item.coverImage.originalPath + '@Referer=' + base_url,
                    url: "https://www.huashi6.com/draw/" + item.id,
                    desc: item.likeNum + '次喜欢',
                    col_type: 'movie_2'
                })
            })

            break
        }
        case '3': {
            /*if (parseInt(page) === 1) {
                let html = fetch(cateArray[parseInt(cate)].url, {headers:{"User-Agent": PC_UA}})

                let list = parseDomForArray(html, '.c-tag-alphabet-list&&li')

                list.forEach((item, index) => {
                    let title = parseDomForHtml(item, '.row-label&&Text')
                    let tagList = parseDomForArray(item, '.label-list&&a')
                    d.push({
                        title: '首字母：'+title,
                        col_type: 'text_1'
                    })
                    if (index === 1)
                        tagList.forEach(tag => {
                            d.push({
                                title: parseDomForHtml(tag, 'a&&Text'),
                                url: parseDomForHtml(tag, 'a&&href'),
                                col_type: 'flex_button',
                            })
                        })
                    d.push({
                        col_type: 'line_blank'
                    })
                })
            }*/
            if (parseInt(page) === 1) {
                let list_json = fetch(cateArray[parseInt(cate)].url, {
                    headers: {
                        "User-Agent": PC_UA,
                        // "body": "index=0&size=50",
                        // "method": "POST"
                    }
                })

                let list = JSON.parse(list_json).data.works.datas

                list.forEach(item => {
                    d.push({
                        title: item.title,
                        pic_url: "https://img2.huashi6.com/" + item.coverImage.path + '@Referer=' + base_url,
                        url: "https://www.huashi6.com/draw/" + item.id,
                        desc: item.description,
                        col_type: 'movie_2'
                    })
                })
            }

            break
        }
        case '4': {
            let list_json = fetch(cateArray[parseInt(cate)].url, {headers: {"User-Agent": PC_UA}})

            let list = JSON.parse(list_json).data.datas

            list.forEach(item => {
                let userObj = {
                    name: item.name,
                    uid: item.id,
                    avatar: item.coverImageUrl ? "https://img2.huashi6.com/" + item.coverImageUrl : "https://res2.huashi6.com/static/hst/pc/imgs/default_avatar.d59d546.png"
                }
                d.push({
                    title: userObj.name,
                    pic_url: userObj.avatar + '@Referer=' + base_url,
                    url: $("https://www.huashi6.com/painter/" + item.id + "?p=fypage##fypage").rule(userObj => {
                        eval(fetch('hiker://files/TyrantG/IMAGE/huashi6.js'))
                        userParse(userObj)
                    }, userObj),
                    desc: item.profile,
                    col_type: 'movie_3_marquee'
                })
            })

            break
        }
    }

    setResult(d);
}

const secParse = _ => {
    let d = [];
    let channel_select = getItem("channel_select", "0")
    let channels = JSON.parse(fetch(channels_path))

    let html = fetch(MY_URL, {headers: {"User-Agent": PC_UA}})
    let userinfo = parseDomForArray(html, '.detail-painter-info&&a')[0]

    let url = parseDomForHtml(userinfo, 'a&&href')
    let url_arr = url.split('/')
    let uid = url_arr[url_arr.length - 1]

    let title = parseDomForHtml(userinfo, 'a&&title')
    let avatar = parseDomForHtml(userinfo, 'img&&src')

    let userObj = {
        name: title,
        uid: uid,
        avatar: avatar
    }

    d.push({
        title: title,
        pic_url: avatar + '@Referer=' + base_url,
        url: $(url + "?p=fypage##fypage").rule(userObj => {
            eval(fetch('hiker://files/TyrantG/IMAGE/huashi6.js'))
            userParse(userObj)
        }, userObj),
        col_type: 'icon_2_round',
    })

    let has_collect = false

    channels.forEach((item, index) => {
        if (item.uid.toString() === uid.toString()) has_collect = index
    })

    d.push({
        title: has_collect === false ? "关注用户" : "取消关注",
        url: $(empty).lazyRule(params => {
            const channels_path = "hiker://files/rules/js/TyrantGenesis_触站关注.js"
            if (params.has_collect) {
                params.channels.splice(params.index, 1)
                writeFile(channels_path, JSON.stringify(params.channels))
                if (parseInt(channel_select) === params.index) setItem("channel_select", '0')
                refreshPage(false)
                return 'toast://取消关注'
            } else {
                params.channels.push(params.userObj)
                writeFile(channels_path, JSON.stringify(params.channels))
                refreshPage(false)
                return 'toast://关注成功'
            }
        }, {
            index: has_collect,
            channel_select: channel_select,
            has_collect: has_collect,
            channels: channels,
            userObj: userObj
        }),
        col_type: 'text_2'
    })

    d.push({
        col_type: 'blank_block'
    })

    let list = fetch("https://rt.huashi6.com/front/works/detail?id=" + MY_URL.split('/').pop())
    const data = JSON.parse(list).data
    setPageTitle(data.title)
    let images = data.images

    images.forEach(item => {
        d.push({
            pic_url: "https://img2.huashi6.com/" + item.originalPath + '@Referer=' + base_url,
            url: "https://img2.huashi6.com/" + item.originalPath + '@Referer=' + base_url,
            col_type: 'pic_1_full'
        })
    })

    setResult(d);
}

const userParse = userObj => {
    let d = [];

    setPageTitle(userObj.name)

    const url = MY_URL.split('##')[0]
    const page = MY_URL.split('##')[1]

    if (page === '1') {
        let channel_select = getItem("channel_select", "0")
        let channels = JSON.parse(fetch(channels_path))

        let has_collect = false

        channels.forEach(item => {
            if (item.uid.toString() === userObj.uid.toString()) has_collect = true
        })

        d.push({
            title: has_collect ? "取消关注" : "关注用户",
            url: $(empty).lazyRule(params => {
                const channels_path = "hiker://files/rules/js/TyrantGenesis_触站关注.js"
                if (params.has_collect) {
                    params.channels.splice(params.index, 1)
                    writeFile(channels_path, JSON.stringify(params.channels))
                    if (parseInt(channel_select) === params.index) setItem("channel_select", '0')
                    refreshPage(false)
                    return 'toast://取消关注'
                } else {
                    params.channels.push(params.userObj)
                    writeFile(channels_path, JSON.stringify(params.channels))
                    refreshPage(false)
                    return 'toast://关注成功'
                }
            }, {
                index: has_collect,
                channel_select: channel_select,
                has_collect: has_collect,
                channels: channels,
                userObj: userObj
            }),
            col_type: 'text_center_1'
        })

        d.push({
            col_type: 'blank_block'
        })
    }

    let api_url = "https://rt.huashi6.com/front/works/painter?painterId=" + userObj.uid + "&index=" + page

    let html = fetch(api_url, {headers: {"User-Agent": PC_UA}})

    // let list = parseDomForArray(html, '.px-container&&.c-px-waterfall-item')
    let list = JSON.parse(html).data.datas

    list.forEach(item => {
        d.push({
            title: item.title,
            pic_url: "https://img2.huashi6.com/" + item.coverImage.originalPath + '@Referer=' + base_url,
            url: $("https://www.huashi6.com/draw/" + item.id).rule(_ => {
                eval(fetch('hiker://files/TyrantG/IMAGE/huashi6.js'))
                secParse()
            }),
            desc: item.likeNum + '次喜欢',
            col_type: 'movie_2'
        })
    })

    setResult(d);
}

const searchParse = _ => {
    let d = [];
    let list = JSON.parse(getResCode()).data.datas

    list.forEach(item => {
        d.push({
            title: item.title,
            pic_url: "https://img2.huashi6.com/" + item.coverImage.path + '@Referer=' + base_url,
            url: "https://www.huashi6.com/draw/" + item.id,
            desc: item.description,
            col_type: 'movie_2'
        })
    })

    setResult(d);
}