const channels_path = "hiker://files/rules/js/TyrantGenesis_抖音关注.js"
const douyin_cookie = "hiker://files/TyrantG/cookie/douyin.txt"

const baseParse = _ => {
    let d = [], category, html
    let home_cookie = request(douyin_cookie)
    const empty = "hiker://empty"
    html = fetch("https://www.douyin.com", {headers: {"User-Agent": PC_UA, "cookie": home_cookie}, withHeaders: true})
    html = JSON.parse(html)

    // 首页cookie
    if (!home_cookie || !home_cookie.match(/__ac_nonce/) || html.body.match(/<body><\/body>/)) {
        let cookie = html.headers["set-cookie"].join(';')

        writeFile(douyin_cookie, cookie.match(/__ac_nonce=(.*?);/)[0])
    }

    // 滑块验证
    if (html.body.match(/验证码/)) {
        d.push({
            title: '本地cookie失效， 请点击获取（需要过验证，15秒左右）',
            url: $(empty).lazyRule(_ => {
                const douyin_cookie = "hiker://files/TyrantG/cookie/douyin.txt"
                let current_cookie = request(douyin_cookie).match(/__ac_nonce=(.*?);/)[0]
                showLoading('自动验证中')
                let slide_cookie = fetch("http://student.tyrantg.com:8199/slide.php", {timeout: 30000})
                if (slide_cookie) writeFile(douyin_cookie, current_cookie + slide_cookie)
                hideLoading()
                refreshPage(true)
                return 'toast://验证成功'
            }),
            col_type: 'text_1'
        })
    } else {
        let current_page = MY_URL.split('##')[1].toString()
        let channels

        if (fetch(channels_path)) {
            let local_channels = fetch(channels_path)
            channels = JSON.parse(local_channels)
        } else {
            let defaultChannels = [
                {
                    title: '橄榄（联盟记者）',
                    sec_uid: 'MS4wLjABAAAAx9uv2rkiSVYxg3-4kygWEpsR0XWPnajnaKsuq3XGxMc',
                    avatar_url: 'https://p11.douyinpic.com/img/tos-cn-i-0813/ce41336f7815445db7345c78b4f0da1e~c5_100x100.jpeg?from=2956013662'
                },
                {
                    title: '法老_Pharaoh',
                    sec_uid: 'MS4wLjABAAAAENcAhhKYCY80DmEdGk9gH2jlG42xW_5kRh33ynV8Ii4',
                    avatar_url: 'https://p3.douyinpic.com/img/tos-cn-i-0813/833a09e8f9b14bcf87ee5a9c5435b825~c5_1080x1080.jpeg?from=116350172'
                },
                {
                    title: '马思唯马思唯',
                    sec_uid: 'MS4wLjABAAAA508qPG3qA_ogo6wjQ9QTIEW_n_NBemKv8ujnHDxt-4OjNI0vC_rqs8x7I0EOoywP',
                    avatar_url: 'https://p3.douyinpic.com/img/tos-cn-avt-0015/cd07db037361174d855251b2854d8b49~c5_1080x1080.jpeg?from=116350172'
                },
                {
                    title: '乃万NINEONE',
                    sec_uid: 'MS4wLjABAAAAPqhPtBXeQ1E3eow8onFHRaZsfKXZnb9gLii-8QvhiJ4',
                    avatar_url: 'https://p9.douyinpic.com/aweme/1080x1080/31afc0003a07472f77daf.jpeg?from=116350172'
                },
            ]
            writeFile(channels_path, JSON.stringify(defaultChannels))
            channels = defaultChannels
        }

        let cate_select = getVar("tyrantgenesis.douyin_web.cate_select", "void")
        let channel_select = getVar("tyrantgenesis.douyin_web.channel_select", "0")
        let button_show = getVar("tyrantgenesis.douyin_web.button_show", "1") // 1:热门,2:直播,3:关注,4:收起,5:取消,6:置顶
        let max_cursor = getVar("tyrantgenesis.douyin_web.max_cursor", "")
        let live_1st_cate = getVar("tyrantgenesis.douyin_web.live_1st_cate", "")
        let live_2nd_cate = getVar("tyrantgenesis.douyin_web.live_2nd_cate", "")
        putVar("tyrantgenesis.douyin_web.video_other_button", "0")

        let level_1_button_1_title = '',
            level_1_button_2_title = '',
            level_1_button_3_title = '',
            level_1_button_4_title = '',
            level_1_button_3_show = '',
            level_1_button_4_show = '',
            channel_prefix = ''

        switch (button_show) {
            case "1": {
                level_1_button_1_title = '‘‘’’<strong><font color="red">热门视频</font></strong>'
                level_1_button_2_title = '热门直播'
                level_1_button_3_title = '我的关注'
                level_1_button_4_title = '取消关注'
                level_1_button_3_show = '3'
                level_1_button_4_show = '5'
                channel_prefix = ''
                break
            }
            case "2": {
                level_1_button_1_title = '热门视频'
                level_1_button_2_title = '‘‘’’<strong><font color="red">热门直播</font></strong>'
                level_1_button_3_title = '我的关注'
                level_1_button_4_title = '取消关注'
                level_1_button_3_show = '3'
                level_1_button_4_show = '5'
                channel_prefix = ''
                break
            }
            case "3": {
                level_1_button_1_title = '热门视频'
                level_1_button_2_title = '热门直播'
                level_1_button_3_title = '‘‘’’<strong><font color="red">我的关注</font></strong>'
                level_1_button_4_title = '取消关注'
                level_1_button_3_show = '4'
                level_1_button_4_show = '5'
                channel_prefix = '✓'
                break
            }
            case "4": {
                level_1_button_1_title = '热门视频'
                level_1_button_2_title = '热门直播'
                level_1_button_3_title = '‘‘’’<strong><font color="red">我的关注</font></strong>'
                level_1_button_4_title = '取消关注'
                level_1_button_3_show = '3'
                level_1_button_4_show = '5'
                channel_prefix = ''
                break
            }
            case "5": {
                level_1_button_1_title = '热门视频'
                level_1_button_2_title = '热门直播'
                level_1_button_3_title = '我的关注'
                level_1_button_4_title = '‘‘’’<strong><font color="red">取消关注</font></strong>'
                level_1_button_3_show = '3'
                level_1_button_4_show = '6'
                channel_prefix = '❌'
                break
            }
            case "6": {
                level_1_button_1_title = '热门视频'
                level_1_button_2_title = '热门直播'
                level_1_button_3_title = '我的关注'
                level_1_button_4_title = '‘‘’’<strong><font color="red">置顶关注</font></strong>'
                level_1_button_3_show = '3'
                level_1_button_4_show = '5'
                channel_prefix = '🔝'
                break
            }
        }

        if (current_page === '1') {
            d.push({
                title: level_1_button_1_title,
                url: $("hiker://empty").lazyRule(_ => {
                    putVar("tyrantgenesis.douyin_web.button_show", "1")
                    putVar("tyrantgenesis.douyin_web.cate_select", "")
                    putVar("tyrantgenesis.douyin_web.max_cursor", "")
                    refreshPage(true)
                    return "hiker://empty"
                }),
                col_type: 'scroll_button',
            })
            d.push({
                title: level_1_button_2_title,
                url: $("hiker://empty").lazyRule(_ => {
                    putVar("tyrantgenesis.douyin_web.button_show", "2")
                    refreshPage(true)
                    return "hiker://empty"
                }),
                col_type: 'scroll_button',
            })
            d.push({
                title: level_1_button_3_title,
                url: $("hiker://empty").lazyRule(params => {
                    putVar("tyrantgenesis.douyin_web.button_show", params.level_1_button_3_show)
                    putVar("tyrantgenesis.douyin_web.max_cursor", "")
                    refreshPage(true)
                    return "hiker://empty"
                }, {
                    level_1_button_3_show: level_1_button_3_show
                }),
                col_type: 'scroll_button',
            })
            d.push({
                title: level_1_button_4_title,
                url: $("hiker://empty").lazyRule(params => {
                    putVar("tyrantgenesis.douyin_web.button_show", params.level_1_button_4_show)
                    putVar("tyrantgenesis.douyin_web.max_cursor", "")
                    refreshPage(false)
                    return "hiker://empty"
                }, {
                    level_1_button_4_show: level_1_button_4_show
                }),
                col_type: 'scroll_button',
            })
            d.push({
                title: "设置",
                url: $("hiker://empty").rule(_ => {
                    let d = []
                    d.push({
                        title: '根据抖音接口限制，登陆后才能享受更多搜索（即搜索的翻页）<br />需要解锁这个功能<del>点下方登录扫码登录</del>到网页版登陆后查找cookie - sessionid并将值填入下方输入框',
                        col_type: 'rich_text',
                    })
                    d.push({
                        title: "登录（已废弃）",
                        url: $("hiker://empty").rule(_ => {
                            let d = []
                            // let home_cookie = getVar("tyrantgenesis.douyin_web.home_cookie")
                            const base64_title = "data:image/jpeg;base64,"
                            const login_url = "https://sso.douyin.com/get_qrcode/?service=https%3A%2F%2Fwww.douyin.com&need_logo=false&aid=6383"
                            let data_json = fetch(login_url, {headers: {"User-Agent": PC_UA}, withHeaders: true})
                            let data = JSON.parse(data_json)
                            let info = JSON.parse(data.body)
                            // let first_cookie = home_cookie.split(';').shift()
                            // putVar("tyrantgenesis.douyin_web.home_cookie", first_cookie+';'+data.headers["set-cookie"].join(';'))

                            if (info.data) {
                                d.push({
                                    title: "1. 图片为base64格式不能直接保存\r\n2. 抖音限制不能通过扫相册的二维码登录，请使用app直接扫码",
                                    col_type: 'long_text',
                                })
                                d.push({
                                    pic_url: base64_title + info.data.qrcode,
                                    url: "hiker://empty",
                                    col_type: 'pic_1_full',
                                })
                            } else {
                                d.push({
                                    title: '获取二维码失败，请下拉刷新',
                                    col_type: 'long_text',
                                })
                            }

                            setResult(d);
                        }),
                        col_type: "text_1",
                    })
                    d.push({
                        title: "确认",
                        desc: "填写 sessionid",
                        url: "input.trim() ? $('hiker://empty').lazyRule(params => {eval(fetch('hiker://files/TyrantG/VIDEO/douyin_web.js'));return saveCookie(params.input)}, {input: input.trim()}) : 'toast://请填写sessionid'",
                        col_type: "input"
                    })
                    setResult(d);
                }),
                col_type: 'scroll_button',
            })
        }

        switch (button_show) {
            case "1": {
                if (current_page === '1') {
                    category = [
                        {title: '全部', id: 'void'},
                        {title: '娱乐', id: '300201'},
                        {title: '知识', id: '300203'},
                        {title: '二次元', id: '300206'},
                        {title: '游戏', id: '300205'},
                        {title: '游戏', id: '300205'},
                        {title: '美食', id: '300204'},
                        {title: '体育', id: '300207'},
                        {title: '时尚', id: '300208'},
                        {title: '音乐', id: '300209'},
                    ]
                    d.push({
                        col_type: "blank_block"
                    })
                    category.forEach(cate => {
                        d.push({
                            title: cate_select === cate.id ? '‘‘’’<strong><font color="red">' + cate.title + '</font></strong>' : cate.title,
                            url: $("hiker://empty").lazyRule(params => {
                                putVar("tyrantgenesis.douyin_web.cate_select", params.id)
                                refreshPage(false)
                                return "hiker://empty"
                            }, {
                                id: cate.id
                            }),
                            col_type: 'scroll_button',
                        })
                    })
                }

                // let not_sign_url = "https://www.douyin.com/aweme/v1/web/channel/feed/?device_platform=webapp&aid=6383&channel=channel_pc_web&tag_id="+cate_select+"&count=20&version_code=160100&version_name=16.1.0"

                let sign_url = fetch("http://douyin_signature.dev.tyrantg.com?type=feed&params=" + cate_select)
                // let true_url = not_sign_url + "&_signature="+sign
                let data_json = fetch(sign_url, {
                    headers: {
                        "referer": "https://www.douyin.com/",
                        "cookie": home_cookie,
                        "Accept": 'application/json, text/plain, */*',
                        "User-Agent": PC_UA,
                        "Accept-Language": 'zh-CN,zh;q=0.9',
                    }
                })

                if (!data_json || data_json === 'Need Verifying') {
                    d.push({
                        title: 'signature 获取失败，待修复',
                        col_type: "long_text",
                    })
                } else {
                    let list = JSON.parse(data_json).aweme_list
                    if (list && list.length > 0) {
                        list.forEach(item => {
                            if (item.video && item.author) {
                                d.push({
                                    title: item.desc,
                                    pic_url: item.video.cover.url_list[0],
                                    desc: item.author.nickname,
                                    url: $("https://www.douyin.com/video/" + item.aweme_id + "##fypage").rule(item => {
                                        eval(fetch('hiker://files/TyrantG/VIDEO/douyin_web.js'))
                                        videoParse(item)
                                    }, item),
                                    col_type: 'movie_2',
                                })
                            } else {
                                //item.cell_room.rawdata.replace(/:([1-9]\d*),/g, ':"$1",')
                            }
                        })
                    }
                }

                break
            }
            case "2": {
                if (current_page === '1') {
                    d.push({
                        col_type: "blank_block"
                    })
                    html = fetch("https://www.douyin.com/live", {headers: {"User-Agent": PC_UA}})
                    let cate_1st_list = parseDomForArray(html, '._1ccdf9ef5e1baec8470ed46e874b49fd-scss&&.ece80b1afae1c9f97b41337a7ccdfaa3-scss')
                    d.push({
                        title: live_1st_cate === '' ? '‘‘’’<strong><font color="red">热门直播</font></strong>' : '热门直播',
                        url: $("hiker://empty").lazyRule(_ => {
                            putVar("tyrantgenesis.douyin_web.live_1st_cate", "")
                            putVar("tyrantgenesis.douyin_web.live_2nd_cate", "")
                            refreshPage(true)
                            return "hiker://empty"
                        }),
                        col_type: 'scroll_button',
                    })
                    cate_1st_list.forEach(cate => {
                        let cate_id = parseDomForHtml(cate, '.a18585314085fd46d4da4b236d3d2903-scss&&href').split('/').pop()
                        let title = parseDomForHtml(cate, 'h2&&Text')
                        if (title !== '热门直播') {
                            d.push({
                                title: live_1st_cate === cate_id.toString() ? '‘‘’’<strong><font color="red">' + title + '</font></strong>' : title,
                                url: $("hiker://empty").lazyRule(params => {
                                    putVar("tyrantgenesis.douyin_web.live_1st_cate", params.cate_id.toString())
                                    putVar("tyrantgenesis.douyin_web.live_2nd_cate", "")
                                    refreshPage(true)
                                    return "hiker://empty"
                                }, {
                                    cate_id: cate_id
                                }),
                                col_type: 'scroll_button',
                            })
                        }
                    })
                    d.push({
                        col_type: "blank_block"
                    })
                    if (live_1st_cate !== '') {
                        html = fetch("https://live.douyin.com/category/" + live_1st_cate, {headers: {"User-Agent": PC_UA}})
                        let cate_2nd_list = parseDomForArray(html, '._51b435273dea21a09f82e973bb87baf1-scss&&a')
                        d.push({
                            title: live_2nd_cate === '' ? '‘‘’’<strong><font color="red">全部</font></strong>' : '全部',
                            url: $("hiker://empty").lazyRule(_ => {
                                putVar("tyrantgenesis.douyin_web.live_2nd_cate", "")
                                refreshPage(false)
                                return "hiker://empty"
                            }),
                            col_type: 'scroll_button',
                        })
                        cate_2nd_list.forEach(cate => {
                            let cate_group = parseDomForHtml(cate, 'a&&href').split('/').pop().split('_')
                            let title = parseDomForHtml(cate, 'a&&title')
                            if (cate_group.length > 1) {
                                let cate_id = cate_group[1]
                                d.push({
                                    title: live_2nd_cate === cate_id.toString() ? '‘‘’’<strong><font color="red">' + title + '</font></strong>' : title,
                                    url: $("hiker://empty").lazyRule(params => {
                                        putVar("tyrantgenesis.douyin_web.live_2nd_cate", params.cate_id.toString())
                                        refreshPage(false)
                                        return "hiker://empty"
                                    }, {
                                        cate_id: cate_id
                                    }),
                                    col_type: 'scroll_button',
                                })
                            }
                        })
                    }
                }
                let count = 20
                let offset = (parseInt(current_page) - 1) * count
                let partition = 720

                if (live_2nd_cate !== '') {
                    partition = live_2nd_cate
                } else if (live_1st_cate !== '') {
                    partition = live_1st_cate
                }

                let not_sign_url = "https://live.douyin.com/webcast/web/partition/detail/room/?aid=6383&live_id=1&device_platform=web&language=zh-CN&count=" + count + "&offset=" + offset + "&partition=" + partition + "&partition_type=1"
                let sign = fetch("http://douyin_signature.dev.tyrantg.com/old_index.php?url=" + encodeURIComponent(not_sign_url))
                let true_url = not_sign_url + "&_signature=" + sign
                let data_json = fetch(true_url, {
                    headers: {
                        "referer": "https://live.douyin.com",
                        "cookie": home_cookie,
                        "Accept": 'application/json, text/plain, */*',
                        "User-Agent": PC_UA,
                        "Accept-Language": 'zh-CN,zh;q=0.9',
                    }
                })

                if (data_json === '') {
                    d.push({
                        title: 'signature 获取失败，待修复',
                        col_type: "long_text",
                    })
                } else {
                    let list = JSON.parse(data_json).data.data

                    if (list && list.length > 0) {

                        list.forEach(item => {
                            let room = item.room
                            let m3u8 = room.stream_url.hls_pull_url_map || room.stream_url.flv_pull_url
                            d.push({
                                title: room.title,
                                pic_url: room.cover.url_list[0],
                                desc: room.owner.nickname,
                                url: m3u8[Object.keys(m3u8)[0]],
                                col_type: 'movie_2',
                            })
                        })
                    }
                }
                break
            }
            case "3":
            case "4": {
                let sec_uid = channels[channel_select].sec_uid

                if (current_page === '1' && button_show === '3') {
                    channels.forEach((channel, index) => {
                        d.push({
                            title: parseInt(channel_select) === index ? channel_prefix + channel.title : channel.title,
                            pic_url: channel.avatar_url,
                            url: $("hiker://empty").lazyRule(params => {
                                putVar("tyrantgenesis.douyin_web.channel_select", params.index.toString())
                                putVar("tyrantgenesis.douyin_web.max_cursor", "")
                                refreshPage(true)
                                return "hiker://empty"
                            }, {
                                index: index
                            }),
                            col_type: 'icon_round_4'
                        })
                    })

                    d.push({
                        col_type: "blank_block"
                    })

                    /*let web_url = "https://www.douyin.com/user/"+sec_uid
                    let html = fetch(web_url, {headers:{"User-Agent": PC_UA}})
                    max_cursor = html.match(/%22maxCursor%22%3A(.*?)%2C%22/)[1]*/
                    max_cursor = ''
                }

                let not_sign_url = "https://www.douyin.com/aweme/v1/web/aweme/post/?device_platform=webapp&aid=6383&channel=channel_pc_web&sec_user_id=" + sec_uid + "&max_cursor=" + max_cursor + "&count=10&publish_video_strategy_type=2&version_code=160100&version_name=16.1.0"
                let sign = fetch("http://douyin_signature.dev.tyrantg.com?url=" + encodeURIComponent(not_sign_url))
                let true_url = not_sign_url + "&_signature=" + sign
                let data_json = fetch(true_url, {
                    headers: {
                        "referer": "https://www.douyin.com/",
                        "cookie": home_cookie,
                        "Accept": 'application/json, text/plain, */*',
                        "User-Agent": PC_UA,
                        "Accept-Language": 'zh-CN,zh;q=0.9',
                    }
                })

                if (data_json === 'Need Verifying') {
                    d.push({
                        title: 'signature 获取失败，待修复',
                        col_type: "long_text",
                    })
                } else {
                    let data = JSON.parse(data_json)
                    let list = data.aweme_list

                    if (list && list.length > 0) {
                        putVar("tyrantgenesis.douyin_web.max_cursor", data.max_cursor.toString())

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
                break
            }
            case "5":
            case "6": {
                let sec_uid = channels[channel_select].sec_uid

                if (current_page === '1') {
                    channels.forEach((channel, index) => {
                        d.push({
                            title: channel_prefix + channel.title,
                            pic_url: channel.avatar_url,
                            url: $("hiker://empty").lazyRule(params => {
                                const channels_path = "hiker://files/rules/js/TyrantGenesis_抖音关注.js"
                                if (params.button_show === '5') {
                                    params.channels.splice(params.index, 1)
                                    writeFile(channels_path, JSON.stringify(params.channels))
                                } else {
                                    let current = params.channels[params.index]
                                    params.channels.splice(params.index, 1)
                                    params.channels.unshift(current)
                                    writeFile(channels_path, JSON.stringify(params.channels))
                                }
                                putVar("tyrantgenesis.douyin_web.channel_select", "0")
                                putVar("tyrantgenesis.douyin_web.max_cursor", "")
                                refreshPage(true)
                                return "hiker://empty"
                            }, {
                                channels: channels,
                                index: index,
                                button_show: button_show
                            }),
                            col_type: 'icon_round_4'
                        })
                    })

                    d.push({
                        col_type: "blank_block"
                    })

                    /*let web_url = "https://www.douyin.com/user/"+sec_uid
                    let html = fetch(web_url, {headers:{"User-Agent": PC_UA}})
                    max_cursor = html.match(/%22maxCursor%22%3A(.*?)%2C%22/)[1]*/
                    max_cursor = ''
                }

                let not_sign_url = "https://www.douyin.com/aweme/v1/web/aweme/post/?device_platform=webapp&aid=6383&channel=channel_pc_web&sec_user_id=" + sec_uid + "&max_cursor=" + max_cursor + "&count=10&publish_video_strategy_type=2&version_code=160100&version_name=16.1.0"
                let sign = fetch("http://douyin_signature.dev.tyrantg.com?url=" + encodeURIComponent(not_sign_url))
                let true_url = not_sign_url + "&_signature=" + sign
                let data_json = fetch(true_url, {
                    headers: {
                        "referer": "https://www.douyin.com/",
                        "cookie": home_cookie,
                        "Accept": 'application/json, text/plain, */*',
                        "User-Agent": PC_UA,
                        "Accept-Language": 'zh-CN,zh;q=0.9',
                    }
                })

                if (data_json === 'Need Verifying') {
                    d.push({
                        title: 'signature 获取失败，待修复',
                        col_type: "long_text",
                    })
                } else {
                    let data = JSON.parse(data_json)
                    let list = JSON.parse(data_json).aweme_list

                    if (list && list.length > 0) {
                        putVar("tyrantgenesis.douyin_web.max_cursor", data.max_cursor.toString())

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
                break
            }
        }
    }

    setResult(d);
}

const searchParse = _ => {
    let d = [];
    let input = MY_URL.split('##')[1].toString()

    d.push({
        title: "搜索视频-关键词：" + input,
        url: $("hiker://empty##fypage").rule(params => {
            const douyin_cookie = "hiker://files/TyrantG/cookie/douyin.txt"
            let home_cookie = request(douyin_cookie)
            // let home_cookie = getVar("tyrantgenesis.douyin_web.home_cookie")
            let d = [];
            let current_page = parseInt(MY_URL.split('##')[1])
            let page = 20
            let offset = (current_page - 1) * page
            // let not_sign_url = "https://www.douyin.com/aweme/v1/web/search/item/?device_platform=webapp&aid=6383&channel=channel_pc_web&search_channel=aweme_video_web&sort_type=0&publish_time=0&keyword="+encodeURIComponent(params.input)+"&search_source=normal_search&query_correct_type=1&is_filter_search=0&offset="+offset+"&count="+page+"&version_code=160100&version_name=16.1.0"
            let not_sign_url = "https://www.douyin.com/aweme/v1/web/search/item/?device_platform=webapp&aid=6383&channel=channel_pc_web&search_channel=aweme_video_web&sort_type=0&publish_time=0&keyword=" + encodeURIComponent(params.input) + "&search_source=normal_search&query_correct_type=1&is_filter_search=0&offset=" + offset + "&count=" + page + "&version_code=160100&version_name=16.1.0&cookie_enabled=true&screen_width=1920&screen_height=1080&browser_language=zh-CN&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0+(Windows+NT+10.0%3B+Win64%3B+x64)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F91.0.4472.114+Safari%2F537.36&browser_online=true"
            let sign = fetch("http://douyin_signature.dev.tyrantg.com?url=" + encodeURIComponent(not_sign_url))
            let true_url = not_sign_url + "&_signature=" + sign
            let data_json = fetch(true_url, {
                headers: {
                    "referer": "https://www.douyin.com/search/" + encodeURIComponent(params.input) + "?source=normal_search&aid=3e8899ee-879c-4f85-b666-1009462412c4&enter_from=main_page",
                    "cookie": home_cookie,
                }
            })
            if (data_json === 'Need Verifying') {
                d.push({
                    title: 'signature 获取失败，待修复',
                    col_type: "long_text",
                })
            } else {
                let list = JSON.parse(data_json).data
                if (list && list.length > 0) {
                    list.forEach(item => {
                        let aweme = item.aweme_info
                        d.push({
                            title: aweme.desc,
                            pic_url: aweme.video.cover.url_list[0],
                            desc: aweme.author.nickname,
                            url: $("https://www.douyin.com/video/" + item.aweme_id + "##fypage").rule(aweme => {
                                eval(fetch('hiker://files/TyrantG/VIDEO/douyin_web.js'))
                                videoParse(aweme)
                            }, aweme),
                            col_type: 'movie_2',
                        })
                    })
                }

                if (list && list.length === 0 && current_page === 2) {
                    d.push({
                        title: "抖音接口限制，在设置里填写token模拟后可搜索更多",
                        col_type: "long_text",
                    })
                }
            }
            setResult(d);
        }, {
            input: input
        }),
    })
    d.push({
        title: "搜索用户-关键词：" + input,
        url: $("hiker://empty##fypage").rule(params => {
            const douyin_cookie = "hiker://files/TyrantG/cookie/douyin.txt"
            let home_cookie = request(douyin_cookie)
            // let home_cookie = getVar("tyrantgenesis.douyin_web.home_cookie")
            let d = [];
            let current_page = parseInt(MY_URL.split('##')[1])
            let page = 30
            let offset = (current_page - 1) * page
            let not_sign_url = "https://www.douyin.com/aweme/v1/web/discover/search/?device_platform=webapp&aid=6383&channel=channel_pc_web&search_channel=aweme_user_web&keyword=" + encodeURIComponent(params.input) + "&search_source=normal_search&query_correct_type=1&is_filter_search=0&offset=" + offset + "&count=" + page + "&version_code=160100&version_name=16.1.0"
            let sign = fetch("http://douyin_signature.dev.tyrantg.com?url=" + encodeURIComponent(not_sign_url))
            let true_url = not_sign_url + "&_signature=" + sign

            let data_json = fetch(true_url, {
                headers: {
                    "referer": "https://www.douyin.com/",
                    "cookie": home_cookie,
                }
            })
            if (data_json === 'Need Verifying') {
                d.push({
                    title: 'signature 获取失败，待修复',
                    col_type: "long_text",
                })
            } else {
                let list = JSON.parse(data_json).user_list
                if (list && list.length > 0) {
                    list.forEach(item => {
                        let userinfo = item.user_info
                        d.push({
                            title: userinfo.nickname,
                            pic_url: userinfo.avatar_thumb.url_list[0],
                            desc: userinfo.signature,
                            url: $("https://www.douyin.com/user/" + userinfo.sec_uid + '##fypage').rule(userinfo => {
                                eval(fetch('hiker://files/TyrantG/VIDEO/douyin_web.js'))
                                userParse(userinfo)
                            }, userinfo),
                            col_type: 'icon_2_round',
                        })
                    })
                }

                if (list && list.length === 0 && current_page === 2) {
                    d.push({
                        title: "抖音接口限制，在设置里填写token模拟后可搜索更多",
                        col_type: "long_text",
                    })
                }
            }
            setResult(d);
        }, {
            input: input
        }),
    })
    setResult(d);
}

/*const searchParse = _ => {
    const douyin_cookie = "hiker://files/TyrantG/cookie/douyin.txt"
    let home_cookie = request(douyin_cookie)
    // let home_cookie = getVar("tyrantgenesis.douyin_web.home_cookie")
    let d = [];
    let input = MY_URL.split('##')[1].toString()
    let current_page = parseInt(MY_URL.split('##')[2])
    let page = 30
    let offset = (current_page - 1) * page
    let not_sign_url = "https://www.douyin.com/aweme/v1/web/discover/search/?device_platform=webapp&aid=6383&channel=channel_pc_web&search_channel=aweme_user_web&keyword="+encodeURIComponent(input)+"&search_source=normal_search&query_correct_type=1&is_filter_search=0&offset="+offset+"&count="+page+"&version_code=160100&version_name=16.1.0"
    let sign = fetch("http://douyin_signature.dev.tyrantg.com?url="+encodeURIComponent(not_sign_url))
    let true_url = not_sign_url + "&_signature="+sign

    let data_json = fetch(true_url, {
        headers: {
            "referer" : "https://www.douyin.com/",
            "cookie": home_cookie,
        }
    })
    if (data_json === 'Need Verifying') {
        d.push({
            title: 'signature 获取失败，待修复',
            col_type: "long_text",
        })
    } else {
        let list = JSON.parse(data_json).user_list
        if (list && list.length > 0) {
            list.forEach(item => {
                let userinfo = item.user_info
                d.push({
                    title: userinfo.nickname,
                    pic_url: userinfo.avatar_thumb.url_list[0],
                    desc: userinfo.signature,
                    url: $("https://www.douyin.com/user/"+userinfo.sec_uid+'##fypage').rule(userinfo => {
                        eval(fetch('hiker://files/TyrantG/VIDEO/douyin_web.js'))
                        userParse(userinfo)
                    }, userinfo),
                    col_type: 'icon_2_round',
                })
            })
        }

        if (list && list.length === 0 && current_page === 2) {
            d.push({
                title: "抖音接口限制，在设置里填写token模拟后可搜索更多",
                col_type: "long_text",
            })
        }
    }
    setResult(d);
}*/

const userParse = userinfo => {
    const douyin_cookie = "hiker://files/TyrantG/cookie/douyin.txt"
    let home_cookie = request(douyin_cookie)
    // let home_cookie = getVar("tyrantgenesis.douyin_web.home_cookie")
    let uid = userinfo.sec_uid
    let channels_json = request(channels_path)
    let channels = JSON.parse(channels_json)
    let d = [];
    let user_url = MY_URL.split('##')[0]
    let page = MY_URL.split('##')[1]
    let max_cursor = getVar("tyrantgenesis.douyin_web.search_max_cursor", "")

    if (parseInt(page) === 1) {
        /*let html = fetch(user_url, {headers:{"User-Agent": PC_UA}})
        max_cursor = html.match(/%22maxCursor%22%3A(.*?)%2C%22/)

        setError(html)
        return false*/
        max_cursor = ''
        d.push({
            title: userinfo.nickname,
            pic_url: userinfo.avatar_thumb.url_list[0],
            url: MY_URL,
            col_type: 'icon_2_round'
        })

        let has_collect = false

        channels.forEach(item => {
            if (item.sec_uid === userinfo.sec_uid) has_collect = true
        })

        d.push({
            title: has_collect ? "已关注" : "关注用户",
            url: $("").lazyRule(params => {
                const channels_path = "hiker://files/rules/js/TyrantGenesis_抖音关注.js"
                if (params.has_collect) {
                    refreshPage(false)
                    return 'toast://已关注'
                } else {
                    params.channels.push({
                        title: params.author.nickname,
                        sec_uid: params.author.sec_uid,
                        avatar_url: params.author.avatar_thumb.url_list[0],
                    })
                    writeFile(channels_path, JSON.stringify(params.channels))
                    refreshPage(false)
                    return 'toast://关注成功'
                }
            }, {
                has_collect: has_collect,
                author: userinfo,
                channels: channels,
            }),
            col_type: 'text_2'
        })
    }

    let not_sign_url = "https://www.douyin.com/aweme/v1/web/aweme/post/?device_platform=webapp&aid=6383&channel=channel_pc_web&sec_user_id=" + uid + "&max_cursor=" + max_cursor + "&count=10&publish_video_strategy_type=2&version_code=160100&version_name=16.1.0"
    let sign = fetch("http://douyin_signature.dev.tyrantg.com?url=" + encodeURIComponent(not_sign_url))
    let true_url = not_sign_url + "&_signature=" + sign
    data_json = fetch(true_url, {
        headers: {
            "referer": "https://www.douyin.com/",
            "cookie": home_cookie,
        }
    })

    if (data_json === 'Need Verifying') {
        d.push({
            title: 'signature 获取失败，待修复',
            col_type: "long_text",
        })
    } else {
        let data = JSON.parse(data_json)
        let list = data.aweme_list

        if (list && list.length > 0) {
            putVar("tyrantgenesis.douyin_web.search_max_cursor", data.max_cursor.toString())

            list.forEach(item => {
                d.push({
                    title: item.desc,
                    pic_url: item.video.cover.url_list[0],
                    // desc: '',
                    url: $("https://www.douyin.com/video/" + item.aweme_id + "##fypage").rule(aweme => {
                        eval(fetch('hiker://files/TyrantG/VIDEO/douyin_web.js'))
                        videoParse(aweme)
                    }, item),
                    col_type: 'movie_2',
                })
            })
        }
    }

    setResult(d);
}

const videoParse = aweme => {
    let d = [];
    const douyin_cookie = "hiker://files/TyrantG/cookie/douyin.txt"
    let home_cookie = request(douyin_cookie)
    // let home_cookie = getVar("tyrantgenesis.douyin_web.home_cookie")
    let channels_json = request(channels_path)
    let channels = JSON.parse(channels_json)
    let current_page = parseInt(MY_URL.split('##')[1])
    let video_other_button = getVar("tyrantgenesis.douyin_web.video_other_button") // 1:推荐视频,2:评论

    if (current_page === 1) {
        d.push({
            title: aweme.author.nickname,
            pic_url: aweme.author.avatar_thumb.url_list[0],
            desc: aweme.author.signature,
            url: $("https://www.douyin.com/user/" + aweme.author.sec_uid + '##fypage').rule(userinfo => {
                eval(fetch('hiker://files/TyrantG/VIDEO/douyin_web.js'))
                userParse(userinfo)
            }, aweme.author),
            col_type: 'icon_2_round',
        })

        let has_collect = false

        channels.forEach(item => {
            if (item.sec_uid === aweme.author.sec_uid) has_collect = true
        })

        d.push({
            title: has_collect ? "已关注" : "关注用户",
            url: $("").lazyRule(params => {
                const channels_path = "hiker://files/rules/js/TyrantGenesis_抖音关注.js"
                if (params.has_collect) {
                    refreshPage(false)
                    return 'toast://已关注'
                } else {
                    params.channels.push({
                        title: params.author.nickname,
                        sec_uid: params.author.sec_uid,
                        avatar_url: params.author.avatar_thumb.url_list[0],
                    })
                    writeFile(channels_path, JSON.stringify(params.channels))
                    refreshPage(false)
                    return 'toast://关注成功'
                }
            }, {
                has_collect: has_collect,
                author: aweme.author,
                channels: channels,
            }),
            col_type: 'text_2'
        })

        d.push({
            title: aweme.desc,
            pic_url: aweme.video.origin_cover.url_list[0],
            desc: aweme.author.nickname,
            url: MY_URL,
            col_type: 'pic_1',
        })

        d.push({
            title: '选择线路：',
            col_type: 'text_1'
        })

        if (aweme.video.play_addr) {
            aweme.video.play_addr.url_list.forEach((url, index) => {
                d.push({
                    title: "线路" + (parseInt(index) + 1).toString(),
                    url: url + "#isVideo=true#",
                    col_type: "text_4"
                })
            })
        } else if (aweme.video.play_addr_lowbr) {
            aweme.video.play_addr_lowbr.url_list.forEach((url, index) => {
                d.push({
                    title: "线路" + (index + 1),
                    url: url + "#isVideo=true#",
                    col_type: "text_4"
                })
            })
        }

        d.push({
            col_type: 'line_blank'
        })
        d.push({
            title: video_other_button === '1' ? '‘‘’’<strong><font color="red">推荐视频</font></strong>' : '推荐视频',
            url: $('hiker://empty').lazyRule(params => {
                putVar("tyrantgenesis.douyin_web.video_other_button", params.video_other_button === "1" ? "0" : "1")
                refreshPage(true)
                return "hiker://empty"
            }, {
                video_other_button: video_other_button
            }),
            col_type: 'text_2'
        })
        d.push({
            title: video_other_button === '2' ? '‘‘’’<strong><font color="red">评论</font></strong>' : '评论',
            url: $('hiker://empty').lazyRule(params => {
                putVar("tyrantgenesis.douyin_web.video_other_button", params.video_other_button === "2" ? "0" : "2")
                refreshPage(true)
                return "hiker://empty"
            }, {
                video_other_button: video_other_button
            }),
            col_type: 'text_2'
        })
    }

    let count = 20
    let cursor = (current_page - 1) * count

    if (video_other_button === '1') {
        let not_sign_url = "https://www.douyin.com/aweme/v1/web/aweme/related/?device_platform=webapp&aid=6383&channel=channel_pc_web&aweme_id=" + aweme.aweme_id + "&count=" + count + "&version_code=160100&version_name=16.1.0"
        let sign = fetch("http://douyin_signature.dev.tyrantg.com?url=" + encodeURIComponent(not_sign_url))
        let true_url = not_sign_url + "&_signature=" + sign

        let data_json = fetch(true_url, {
            headers: {
                "referer": "https://www.douyin.com/video/" + aweme.aweme_id + "?previous_page=main_page",
                "cookie": home_cookie,
            }
        })

        if (data_json === 'Need Verifying') {
            d.push({
                title: 'signature 获取失败，待修复',
                col_type: "long_text",
            })
        } else {
            let data = JSON.parse(data_json)
            let list = data.aweme_list

            if (list && list.length > 0) {
                list.forEach(item => {
                    d.push({
                        title: item.desc,
                        pic_url: item.video.cover.url_list[0],
                        // desc: '',
                        url: $("https://www.douyin.com/video/" + item.aweme_id + "##fypage").rule(aweme => {
                            eval(fetch('hiker://files/TyrantG/VIDEO/douyin_web.js'))
                            videoParse(aweme)
                        }, item),
                        col_type: 'movie_2',
                    })
                })
            }
        }
    } else if (video_other_button === '2') {
        let not_sign_url = "https://www.douyin.com/aweme/v1/web/comment/list/?device_platform=webapp&aid=6383&channel=channel_pc_web&aweme_id=" + aweme.aweme_id + "&cursor=" + cursor + "&count=" + count + "&version_code=160100&version_name=16.1.0"
        let sign = fetch("http://douyin_signature.dev.tyrantg.com?url=" + encodeURIComponent(not_sign_url))
        let true_url = not_sign_url + "&_signature=" + sign

        let data_json = fetch(true_url, {
            headers: {
                "referer": "https://www.douyin.com/video/" + aweme.aweme_id + "?previous_page=main_page",
                "cookie": home_cookie,
            }
        })

        if (data_json === 'Need Verifying') {
            d.push({
                title: 'signature 获取失败，待修复',
                col_type: "long_text",
            })
        } else {
            let data = JSON.parse(data_json)
            let list = data.comments

            if (list && list.length > 0) {
                list.forEach(item => {
                    d.push({
                        title: item.user.nickname + '：' + item.text,
                        col_type: 'text_1',
                    })
                })
            }
        }
    }

    setResult(d);
}

const saveCookie = sessionid => {
    const douyin_cookie = "hiker://files/TyrantG/cookie/douyin.txt"
    let home_cookie = request(douyin_cookie)
    // let home_cookie = getVar("tyrantgenesis.douyin_web.home_cookie")
    let first_cookie = home_cookie.split(';')[0]
    let new_cookie = 'sessionid=' + sessionid


    writeFile(douyin_cookie, first_cookie + ';' + new_cookie)
    // putVar("tyrantgenesis.douyin_web.home_cookie", first_cookie+';'+new_cookie)

    refreshPage(true)
    return "toast://设置成功"
}
