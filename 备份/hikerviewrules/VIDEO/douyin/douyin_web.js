const douyin = {
    d: [],
    empty: 'hiker://empty',
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    files: {
        cookieTemp: 'hiker://files/rules/TyrantG/cookie/douyin.txt',
        channels: 'hiker://files/rules/TyrantG/js/douyin_web_channels.json',
    },
    variable: {
        host: 'https://www.douyin.com',
        live: 'https://live.douyin.com',
        tabs: [
            {title: '推荐', name: 'feed'},
            {title: '直播', name: 'live'},
            // {title: '热点', name: 'hot'},
            {title: '本地关注', name: 'local'},
            {title: '抖音关注', name: 'attention'},
            {title: '设置', name: 'setting'},
        ],
        feedTab: [
            {title: '全部', id: ''},
            {title: '娱乐', id: '300201'},
            {title: '知识', id: '300203'},
            {title: '二次元', id: '300206'},
            {title: '游戏', id: '300205'},
            {title: '美食', id: '300204'},
            {title: '体育', id: '300207'},
            {title: '时尚', id: '300208'},
            {title: '音乐', id: '300209'},
        ],
    },
    data: {
        tab_selected: getMyVar('tg.dy_web.class.tab_selected', '0'),
        feed_tab_selected: getMyVar('tg.dy_web.class.feed_tab_selected', '0'),
        live_1st_tab_selected: getMyVar('tg.dy_web.class.live_1st_tab_selected', '0'),
        live_2nd_tab_selected: getMyVar('tg.dy_web.class.live_2nd_tab_selected', '0'),
        channel_select: getMyVar('tg.dy_web.class.channel_select', '0'),
        live_url: getMyVar('tg.dy_web.url.live_url', 'https://live.douyin.com'),
        max_cursor: getMyVar('tg.dy_web.page.max_cursor', ''),
    },
    request: (e) => {
        const cookie_content = request(douyin.files.cookieTemp)
        eval(JSON.parse(request('hiker://page/signature')).rule)
        const url = makeSignatureUrl(e)

        let data_json = fetch(url, {
            method: e.method,
            headers: {
                "referer": "https://www.douyin.com/",
                "origin": "https://www.douyin.com",
                "cookie": cookie_content,
                "Accept": 'application/json, text/plain, */*',
                "User-Agent": douyin.ua,
            }
        })

        return data_json
    },
    channelsInit: () => {
        let channels = []

        try {
            if (fetch(douyin.files.channels)) {
                let local_channels = fetch(douyin.files.channels)
                channels = JSON.parse(local_channels)
            } else {
                let defaultChannels = [
                    {
                        title: '长期洗涤Longwashing',
                        sec_uid: 'MS4wLjABAAAAG6rxkrEV5bnuXAL1K8uiY8dZKkFBLszhYw1nm5_ohIQ',
                        avatar_url: 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_f8826b2fe246913f696a2ca94a832e23~c5_300x300.jpeg?from=2956013662'
                    }
                ]
                writeFile(douyin.files.channels, JSON.stringify(defaultChannels))
                channels = defaultChannels
            }
        } catch (e) {
        }

        return channels
    },
    baseParse: () => {
        // eval(JSON.parse(request('hiker://page/signature')).rule)

        const cookie_content = request(douyin.files.cookieTemp)
        const has_login = cookie_content.match(/(^| )passport_assist_user=([^;]*)(;|$)/)

        if (has_login) {
            const page = parseInt(MY_URL.split('##')[1])
            const channels = douyin.channelsInit()

            if (page === 1) {
                douyin.d.push({
                    url: $(douyin.empty + "#fullTheme#$$fypage").rule(() => {
                        const douyin = $.require('hiker://page/douyin')

                        setResult(douyin.d)
                    }),
                    title: '请输入关键词',
                    col_type: "icon_1_search",
                })

                douyin.variable.tabs.forEach((item, index) => {
                    let url
                    if (item.name === 'setting') {
                        url = $(douyin.empty).rule(() => {
                            const douyin = $.require('hiker://page/douyin')
                            douyin.settingParse()
                            setResult(douyin.d)
                        })
                    } else {
                        url = $(douyin.empty).lazyRule((index) => {
                            putMyVar('tg.dy_web.class.tab_selected', index)
                            refreshPage(false)
                            return 'hiker://empty'
                        }, index.toString())
                    }
                    douyin.d.push({
                        title: douyin.data.tab_selected === index.toString() ? '‘‘’’<strong><font color="#5FCC97">' + item.title + '</font></strong>' : item.title,
                        url: url,
                        col_type: 'scroll_button',
                    })
                })
                douyin.d.push({
                    col_type: 'blank_block',
                })
            }

            switch (parseInt(douyin.data.tab_selected)) {
                case 0:
                    if (page === 1) {
                        douyin.variable.feedTab.forEach((tab, index) => {
                            douyin.d.push({
                                title: douyin.data.feed_tab_selected === index.toString() ? '‘‘’’<strong><font color="#5FCC97">' + tab.title + '</font></strong>' : tab.title,
                                url: $(douyin.empty).lazyRule((index) => {
                                    putMyVar('tg.dy_web.class.feed_tab_selected', index)
                                    refreshPage(false)
                                    return 'hiker://empty'
                                }, index.toString()),
                                col_type: 'scroll_button',
                            })
                        })
                    }
                    douyin.feedList(douyin.variable.feedTab[douyin.data.feed_tab_selected].id, page)
                    break
                case 1:
                    if (page === 1) {
                        let html = fetch(douyin.data.live_url, {
                            headers: {
                                "referer": "https://www.douyin.com/",
                                "origin": "https://www.douyin.com",
                                "cookie": cookie_content,
                                "Accept": 'application/json, text/plain, */*',
                                "User-Agent": douyin.ua,
                            }
                        })

                        const live_1st_tab = pdfa(html, '.dTHxj109&&.O9_s5yI4')
                        let live_2nd_tab = pdfa(html, '.w6nhrn5n&&a')

                        live_1st_tab.forEach((tab, index) => {
                            let title = pdfh(tab, 'a&&Text')
                            let tab_url = douyin.variable.live + pdfh(tab, 'a&&href')
                            douyin.d.push({
                                title: douyin.data.live_1st_tab_selected === index.toString() ? '‘‘’’<strong><font color="#5FCC97">' + title + '</font></strong>' : title,
                                url: $(douyin.empty).lazyRule((index, tab_url) => {
                                    putMyVar('tg.dy_web.class.live_1st_tab_selected', index)
                                    putMyVar('tg.dy_web.class.live_2nd_tab_selected', '0')
                                    putMyVar('tg.dy_web.url.live_url', tab_url)
                                    refreshPage(false)
                                    return 'hiker://empty'
                                }, index.toString(), tab_url),
                                col_type: 'scroll_button',
                            })
                        })
                        douyin.d.push({
                            col_type: 'blank_block',
                        })
                        live_2nd_tab.forEach((tab, index) => {
                            let title = pdfh(tab, 'a&&Text')
                            let tab_url = douyin.variable.live + pdfh(tab, 'a&&href')
                            douyin.d.push({
                                title: douyin.data.live_2nd_tab_selected === index.toString() ? '‘‘’’<strong><font color="#5FCC97">' + title + '</font></strong>' : title,
                                url: $(douyin.empty).lazyRule((index, tab_url) => {
                                    putMyVar('tg.dy_web.class.live_2nd_tab_selected', index)
                                    putMyVar('tg.dy_web.url.live_url', tab_url)
                                    refreshPage(false)
                                    return 'hiker://empty'
                                }, index.toString(), tab_url),
                                col_type: 'scroll_button',
                            })
                        })
                    }

                    let partition_arr = douyin.data.live_url.split('/').pop().split('_'), partition = 720, type = 1

                    if (partition_arr.length > 1) {
                        partition = partition_arr.pop()
                        type = partition_arr.pop()
                    }

                    douyin.liveList(page, partition, type)
                    break
                case 2:
                    let sec_uid = channels[douyin.data.channel_select].sec_uid
                    if (page === 1) {
                        channels.forEach((channel, index) => {
                            douyin.d.push({
                                title: parseInt(douyin.data.channel_select) === index ? '✓' + channel.title : channel.title,
                                pic_url: channel.avatar_url,
                                url: $(douyin.empty).lazyRule(index => {
                                    putMyVar("tg.dy_web.class.channel_select", index)
                                    putMyVar("tg.dy_web.page.max_cursor", "")
                                    refreshPage(true)
                                    return "hiker://empty"
                                }, index.toString()),
                                col_type: 'icon_round_4',
                                extra: {
                                    longClick: [
                                        {
                                            title: '置顶关注',
                                            js: $.toString((channels, index) => {
                                                const douyin = $.require('hiker://page/douyin')
                                                const current = channels[index]
                                                channels.splice(index, 1)
                                                channels.unshift(current)
                                                putMyVar("tg.dy_web.class.channel_select", '0')
                                                putMyVar("tg.dy_web.page.max_cursor", "")
                                                writeFile(douyin.files.channels, JSON.stringify(channels))
                                                refreshPage(false)
                                                return "toast://置顶成功"
                                            }, channels, index)
                                        },
                                        {
                                            title: '取消关注',
                                            js: $.toString((channels, index) => {
                                                const douyin = $.require('hiker://page/douyin')
                                                channels.splice(index, 1)
                                                putMyVar("tg.dy_web.class.channel_select", '0')
                                                putMyVar("tg.dy_web.page.max_cursor", "")
                                                writeFile(douyin.files.channels, JSON.stringify(channels))
                                                refreshPage(false)
                                                return "toast://取消成功"
                                            }, channels, index)
                                        },
                                    ],
                                },
                            })
                        })

                        douyin.d.push({
                            col_type: "blank_block"
                        })

                        let html = fetch(douyin.variable.host + '/user/' + sec_uid, {
                            headers: {
                                "referer": "https://www.douyin.com/",
                                "cookie": cookie_content,
                                "Accept": 'application/json, text/plain, */*',
                                "User-Agent": douyin.ua,
                            }
                        })
                        try {
                            putMyVar("tg.dy_web.page.max_cursor", html.match(/%22maxCursor%22%3A(.*?)%2C%22logPb/)[1])
                        } catch (e) {
                        }
                    }
                    douyin.userPostList(sec_uid, page, douyin.data.max_cursor)
                    break
                case 3:
                    let html = fetch(douyin.variable.host + '/user/self', {
                        headers: {
                            "referer": "https://www.douyin.com/",
                            "cookie": cookie_content,
                            "Accept": 'application/json, text/plain, */*',
                            "User-Agent": douyin.ua,
                        }
                    })

                    try {
                        let user_id = html.match(/user_id%22%3A%22(.*?)%22%2C%22/)[1]
                        let sec_user_id = html.match(/secUid%22%3A%22(.*?)%22%2C%22shortId/)[1]
                        douyin.followingList(user_id, sec_user_id, page)
                    } catch (e) {
                    }
            }

        } else {
            douyin.d.push({
                title: '小程序没有检测到有效的cookie，请按照下面步骤登录抖音网页版以获取cookie',
                col_type: 'rich_text',
            })
            douyin.d.push({
                title: '前往登录',
                url: $(douyin.empty).rule(() => {
                    const douyin = $.require('hiker://page/douyin')
                    douyin.d.push({
                        title: '1. 进入抖音网页版x5网页后，等待登录弹窗弹出，选择任意方法登录（扫码、短信、密码），推荐使用短信验证码登录。\r\n' +
                            '2. 登录完成后等待”记住登录信息“的弹窗出现，点击”确认“。如果第一步是扫码登录或者密码登录会需要短信验证。\r\n' +
                            '3. 点击侧边栏”首页“，同时将页面迅速向右下拖动至基本居中，此时会弹出文字验证码或者图形验证码\r\n' +
                            '4. 通过验证后返回到首页刷新即可使用',
                        url: $(douyin.empty).rule(() => {
                            const douyin = $.require('hiker://page/douyin')
                            douyin.d.push({
                                url: 'https://www.douyin.com',
                                desc: '100%&&float',
                                col_type: 'x5_webview_single',
                                extra: {
                                    ua: PC_UA,
                                    canBack: true,
                                    imgLongClick: false,
                                    js: $.toString(douyin.injectJS),
                                }
                            })
                            setResult(douyin.d)
                        }),
                        col_type: 'long_text',
                    })

                    douyin.d.push({
                        title: '操作视频',
                        url: 'https://cdn.tyrantg.com/videos/QQ%E8%A7%86%E9%A2%9120230206164831.mp4',
                        col_type: 'text_1',
                    })

                    douyin.d.push({
                        title: '抖音登录',
                        url: $(douyin.empty).rule(() => {
                            const douyin = $.require('hiker://page/douyin')
                            douyin.d.push({
                                url: 'https://www.douyin.com',
                                desc: '100%&&float',
                                col_type: 'x5_webview_single',
                                extra: {
                                    ua: PC_UA,
                                    canBack: true,
                                    imgLongClick: false,
                                    js: $.toString(douyin.injectJS),
                                }
                            })
                            setResult(douyin.d)
                        }),
                        col_type: 'text_1',
                    })
                    setResult(douyin.d)
                }),
                col_type: 'text_1',
            })
            /*douyin.d.push({
                title: '输入已登录的网站cookie',
                col_type: 'text_1',
            })*/
        }

        setResult(douyin.d)
    },
    liveParse: () => {
        const page = parseInt(MY_URL.split('##')[1])
        if (page === 1) {
            let html = fetch(douyin.data.live_url, {
                headers: {
                    "referer": douyin.data.live_url,
                    "origin": douyin.data.live_url,
                    // "cookie": cookie_content,
                    "Accept": 'application/json, text/plain, */*',
                    "User-Agent": douyin.ua,
                }
            })

            const live_1st_tab = pdfa(html, '.dTHxj109&&.O9_s5yI4')
            let live_2nd_tab = pdfa(html, '.w6nhrn5n&&a')

            live_1st_tab.forEach((tab, index) => {
                let title = pdfh(tab, 'a&&Text')
                let tab_url = douyin.variable.live + pdfh(tab, 'a&&href')
                douyin.d.push({
                    title: douyin.data.live_1st_tab_selected === index.toString() ? '‘‘’’<strong><font color="#5FCC97">' + title + '</font></strong>' : title,
                    url: $(douyin.empty).lazyRule((index, tab_url) => {
                        putMyVar('tg.dy_web.class.live_1st_tab_selected', index)
                        putMyVar('tg.dy_web.class.live_2nd_tab_selected', '0')
                        putMyVar('tg.dy_web.url.live_url', tab_url)
                        refreshPage(false)
                        return 'hiker://empty'
                    }, index.toString(), tab_url),
                    col_type: 'scroll_button',
                })
            })
            douyin.d.push({
                col_type: 'blank_block',
            })
            live_2nd_tab.forEach((tab, index) => {
                let title = pdfh(tab, 'a&&Text')
                let tab_url = douyin.variable.live + pdfh(tab, 'a&&href')
                douyin.d.push({
                    title: douyin.data.live_2nd_tab_selected === index.toString() ? '‘‘’’<strong><font color="#5FCC97">' + title + '</font></strong>' : title,
                    url: $(douyin.empty).lazyRule((index, tab_url) => {
                        putMyVar('tg.dy_web.class.live_2nd_tab_selected', index)
                        putMyVar('tg.dy_web.url.live_url', tab_url)
                        refreshPage(false)
                        return 'hiker://empty'
                    }, index.toString(), tab_url),
                    col_type: 'scroll_button',
                })
            })
        }

        let partition_arr = douyin.data.live_url.split('/').pop().split('_'), partition = 720, type = 1

        if (partition_arr.length > 1) {
            partition = partition_arr.pop()
            type = partition_arr.pop()
        }

        douyin.liveList(page, partition, type)

        setResult(douyin.d)
    },
    settingParse: () => {
        douyin.d.push({
            title: '删除cookie',
            url: $(douyin.empty).lazyRule(() => {
                const douyin = $.require('hiker://page/douyin')
                writeFile(douyin.files.cookieTemp, '')
                refreshPage(false)
                back(true)
                return 'hiker://empty'
            }),
            col_type: 'text_1',
        })
    },
    videoParse: () => {

    },
    injectJS: () => {
        window.document.body.style.width = '768px'
        // const getCookie = function (name) {
        //     let arr;
        //     const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
        //     if (arr = document.cookie.match(reg)) return unescape(arr[2]);
        //     return null;
        // };

        setInterval(() => {
            fba.writeFile('hiker://files/rules/TyrantG/cookie/douyin.txt', document.cookie)
            // let login_status = getCookie('passport_assist_user')
            // if (login_status) {
            // alert('获取登录信息成功')
            // clearInterval(interval)

            // fba.back()
            // }
        }, 1000)
    },
    feedList: (tag_id, page) => {
        const cookie_content = request(douyin.files.cookieTemp)
        let e = {
            "url": douyin.variable.host + "/aweme/v1/web/channel/feed/",
            "method": "get",
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "withCredentials": true
            },
            "params": {
                "device_platform": "webapp",
                "aid": 6383,
                "channel": "channel_pc_web",
                "tag_id": tag_id,
                "count": 100,
                "refresh_index": page,
                "version_code": "160100",
                "version_name": "16.1.0",
                "cookie_enabled": true,
                "screen_width": 1280,
                "screen_height": 720,
                "browser_language": "zh-CN",
                "browser_platform": "Win32",
                "browser_name": "Mozilla",
                "browser_version": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36",
                "browser_online": true
            },
        }

        let data_json = douyin.request(e)

        if (!data_json) {
            douyin.d.push({
                title: 'cookie失效，请到设置里清除cookie并重新登录',
                col_type: "long_text",
            })
        } else {
            let list = JSON.parse(data_json).aweme_list
            if (list && list.length > 0) {
                list.forEach(item => {
                    if (item.video && item.author) {
                        douyin.d.push({
                            title: item.desc,
                            pic_url: item.video.cover.url_list[0],
                            desc: item.author.nickname,
                            url: item.video.play_addr.url_list[0] + "#isVideo=true#;{Cookie@" + cookie_content.replace(/;/g, '；；') + "}",
                            col_type: 'movie_2',
                        })
                    }
                })
            }
        }
    },
    liveList: (page, partition, type) => {
        let e = {
            "url": douyin.variable.live + "/webcast/web/partition/detail/room/",
            "method": "get",
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "withCredentials": true
            },
            "params": {
                "device_platform": "web",
                "aid": 6383,
                "live_id": 1,
                "partition": partition,
                "partition_type": type,
                "req_from": 2,
                "count": 48,
                "offset": (page - 1) * 48,
                "cookie_enabled": true,
                "screen_width": 1920,
                "screen_height": 1080,
                "browser_language": "zh-CN",
                "browser_platform": "Win32",
            },
        }

        let data_json = douyin.request(e)

        if (!data_json) {
            douyin.d.push({
                title: 'cookie失效，请到设置里清除cookie并重新登录',
                col_type: "long_text",
            })
        } else {
            let list = JSON.parse(data_json).data.data
            if (list && list.length > 0) {
                list.forEach(item => {
                    const stream_url_map = item.room.stream_url.flv_pull_url

                    douyin.d.push({
                        title: item.room.title,
                        pic_url: item.room.cover.url_list[0],
                        desc: item.room.owner.nickname,
                        url: JSON.stringify({urls: Object.values(stream_url_map), names: Object.keys(stream_url_map)}),
                        col_type: 'movie_2',
                    })
                })
            }
        }
    },
    userPostList: (uid, page, max_cursor) => {
        let e = {
            "url": douyin.variable.host + "/aweme/v1/web/aweme/post/",
            "method": "get",
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "withCredentials": true
            },
            "params": {
                "device_platform": "webapp",
                "aid": 6383,
                "channel": "channel_pc_web",
                "search_channel": "aweme_video_web",
                "publish_video_strategy_type": "2",
                "sec_user_id": uid,
                // "max_cursor":max_cursor,
                "search_source": "normal_search",
                "query_correct_type": "1",
                "is_filter_search": "0",
                "count": 10,
                "version_code": "160100",
                "version_name": "16.1.0",
                "cookie_enabled": true,
                "screen_width": 1280,
                "screen_height": 720,
                "browser_language": "zh-CN",
                "browser_platform": "Win32",
                "browser_name": "Mozilla",
                "browser_version": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36",
                "browser_online": true
            },
        }

        let data_json = douyin.request(e)

        if (!data_json) {
            douyin.d.push({
                title: 'cookie失效，请到设置里清除cookie并重新登录',
                col_type: "long_text",
            })
        } else {
            let data = JSON.parse(data_json)
            let list = data.aweme_list
            if (list && list.length > 0) {
                putMyVar("tg.dy_web.page.max_cursor", data.max_cursor.toString())
                list.forEach(item => {
                    d.push({
                        title: item.desc,
                        pic_url: item.video.cover.url_list[0],
                        desc: item.author.nickname,
                        url: item.video.play_addr.url_list[0] + "#isVideo=true#",
                        col_type: 'movie_2',
                    })
                })
            }
        }
    },
    followingList: (user_id, sec_user_id, page) => {
        let e = {
            "url": douyin.variable.host + "/aweme/v1/web/user/following/list/",
            "method": "get",
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "withCredentials": true
            },
            "params": {
                "device_platform": "webapp",
                "aid": 6383,
                "channel": "channel_pc_web",
                "user_id": user_id,
                "sec_user_id": sec_user_id,
                "count": 1000,
                "offset": (page - 1) * 1000,
                "min_time": 0,
                "max_time": 0,
                "source_type": 4,
                "is_top": 1,
                "version_code": "160100",
                "version_name": "16.1.0",
                "cookie_enabled": true,
                "screen_width": 1280,
                "screen_height": 720,
                "browser_language": "zh-CN",
                "browser_platform": "Win32",
                "browser_name": "Mozilla",
                "browser_version": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36",
                "browser_online": true,
                "round_trip_time": 50
            },
        }

        let data_json = douyin.request(e)

        if (!data_json) {
            douyin.d.push({
                title: 'cookie失效，请到设置里清除cookie并重新登录',
                col_type: "long_text",
            })
        } else {
            let data = JSON.parse(data_json)
            log(data)
            // let list = data.aweme_list
            // if (list && list.length > 0) {
            //     putMyVar("tg.dy_web.page.max_cursor", data.max_cursor.toString())
            //     list.forEach(item => {
            //         d.push({
            //             title: item.desc,
            //             pic_url: item.video.cover.url_list[0],
            //             desc: item.author.nickname,
            //             url: item.video.play_addr.url_list[0] + "#isVideo=true#",
            //             col_type: 'movie_2',
            //         })
            //     })
            // }
        }
    },
}

$.exports = douyin
