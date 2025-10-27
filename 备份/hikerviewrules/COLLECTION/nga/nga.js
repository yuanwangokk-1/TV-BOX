const nga = {
    BaseUrl: 'https://nga.178.com/app_api.php',
    NukeUrl: 'https://nga.178.com/nuke.php',
    ThreadUrl: 'https://nga.178.com/thread.php',
    ReadUrl: 'https://nga.178.com/read.php',
    iconCDNUrl: 'https://img4.nga.178.com/proxy/cache_attach/ficon/',
    attachmentsCDNUrl: 'https://img.nga.178.com/attachments/',
    defaultIconPath: 'https://img4.nga.178.com/ngabbs/nga_classic/f/00.png',
    empty: 'hiker://empty',
    files: {
        userinfoFilePath: 'hiker://files/rules/TyrantG/cookie/nga_userinfo.txt',
    },
    api: {
        HomeCategory: '__lib=home&__act=category&_v=2',
        SubjectList: '__lib=subject&__act=list',
        FavorAll: '__lib=favor&__act=all',
        FavorForum: '__lib=favorforum&__act=sync',
    },
    publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyKzZWDimCN1OCprqWUhF\n\
UPhcwxDE62/BFVP6LtQHJu+65dm4YNmDvzitmcfaXW9YbhXnd4oP7j+6vpcgJQ+p\n\
3ucySo1ZnqO0Bb2JKEtxpCmxe7IYXhFEkJqHpFYBTiAxQz2n2mX4JZy/ehBUSMjz\n\
gzd0NdG6Ai1C42oCzYltUOjNWZUNHn1nqpElSWHnUWqkdN8+5ISP/ZMKiQdFANkE\n\
qDGw3/34qyF+E/hVgrGF4/CcWNP/LJCdB6DYtx7VPlQZF0tP1s+q/++rC4rQ2wmV\n\
l2V8zGh1j7ojZbt62hVjy6byK1E/2XYo97ZtL4KDW7F5jJMvSDRFR7901UR8hCdf\n\
4wIDAQAB',
    d: [],
    data: {
        username: getMyVar('nga.username', ''),
        password: getMyVar('nga.password', ''),
        captcha: getMyVar('nga.captcha', ''),
    },
    request: (api, method, data) => {
        const userinfo = nga.getUserinfo()
        const cookie = userinfo ? 'ngaPassportUid=' + userinfo.ngaPassportUid + '; ngaPassportCid=' + userinfo.ngaPassportCid + ';' : ''
        let json_res

        if (method === 'GET') {
            json_res = fetch(api, {
                headers: {
                    'Cookie': cookie,
                    'User-Agent': PC_UA,
                }
            })
        } else {
            json_res = post(api, {
                body: data,
                headers: {
                    'Cookie': cookie,
                    'User-Agent': PC_UA,
                }
            })
        }

        try {
            const res = JSON.parse(json_res)

            if (res.code) {
                if (res.code === 0) {
                    return res
                } else if (res.code === 12) {
                    toast(res.msg)
                    writeFile(nga.files.userinfoFilePath, '')
                    back(true)
                } else {
                    toast(res.msg)
                    back(true)
                }
            }

            return res
        } catch (e) {
        }

        return {}
    },
    get: (api) => {
        const realUrl = nga.BaseUrl + '?' + api
        return nga.request(realUrl, 'GET', {})
    },
    post: (api, data) => {
        const realUrl = nga.BaseUrl + '?' + api
        return nga.request(realUrl, 'POST', data)
    },
    nuke: (data) => {
        const params = {
            __output: '11',
            __inchst: 'UTF8',
        }
        Object.keys(data).forEach(key => {
            params[key] = data[key]
        })
        return nga.request(nga.NukeUrl, 'POST', params)
    },
    thread: (data) => {
        const params = {
            __output: '11',
            __inchst: 'UTF8',
        }
        Object.keys(data).forEach(key => {
            params[key] = data[key]
        })
        return nga.request(nga.ThreadUrl, 'POST', params)
    },
    read: (data) => {
        const params = {
            __output: '11',
            __inchst: 'UTF8',
            v2: '1',
        }
        Object.keys(data).forEach(key => {
            params[key] = data[key]
        })
        return nga.request(nga.ReadUrl, 'POST', params)
    },
    loginPage: () => {
        setPageTitle('NGA登录')
        const frm = 'login'
        const __checkCodeId = frm + (Math.random() + '').slice(2)
        const __PAGEID = 'P' + (Math.random() + '').slice(2)

        nga.d.push({
            col_type: 'pic_1_full',
            url: nga.empty,
            pic_url: 'https://nga.178.com/login_check_code.php?id=' + __checkCodeId + '&from=' + frm + '@Referer=https://nga.178.com/nuke/account_copy.html?login'
        })
        nga.d.push({
            desc: '请输入用户名',
            col_type: 'input',
            extra: {
                titleVisible: false,
                onChange: $.toString(() => {
                    if (input) putMyVar('nga.username', input)
                })
            }
        })
        nga.d.push({
            desc: '请输入密码',
            col_type: 'input',
            extra: {
                titleVisible: false,
                onChange: $.toString(() => {
                    if (input) putMyVar('nga.password', input)
                })
            }
        })
        nga.d.push({
            desc: '请输入验证码',
            col_type: 'input',
            extra: {
                titleVisible: false,
                onChange: $.toString(() => {
                    if (input) putMyVar('nga.captcha', input)
                })
            }
        })

        nga.d.push({
            title: '登录',
            url: $(nga.empty).lazyRule((__checkCodeId, __PAGEID) => {
                const nga = $.require('hiker://page/nga')
                if (nga.data.username === '') {
                    return 'toast://请填写用户名'
                }
                if (nga.data.password === '') {
                    return 'toast://请填写密码'
                }
                if (nga.data.captcha === '') {
                    return 'toast://请填写验证码'
                }
                const response = nga.nuke({
                    __lib: 'login',
                    __act: 'login',
                    name: nga.data.username,
                    password: nga.encrypt(nga.data.password),
                    captcha: nga.data.captcha,
                    prid: __PAGEID,
                    rid: __checkCodeId,
                })

                try {
                    const data = response.data
                    if (data.length === 4) {
                        writeFile(nga.files.userinfoFilePath, JSON.stringify({
                            ngaPassportUid: data[1],
                            ngaPassportCid: data[2]
                        }))
                        back(true)
                        return 'toast://登录成功'
                    } else {
                        log('处理错误')
                        log(response)
                    }
                } catch (e) {
                    log('解析错误')
                    log(response)
                }
                return 'toast://登录失败'
            }, __checkCodeId, __PAGEID),
            col_type: 'text_center_1',
            extra: {
                lineVisible: false,
            }
        })
    },
    encrypt: (password) => {
        return rsaEncrypt(password, nga.publicKey)
    },
    getUserinfo: () => {
        try {
            const userinfo_json = fetch(nga.files.userinfoFilePath)
            const userinfo = JSON.parse(userinfo_json)
            return userinfo
        } catch (e) {
            writeFile(nga.files.userinfoFilePath, '')
        }

        return null
    },
    baseParse: () => {
        const userinfo = nga.getUserinfo()

        if (userinfo) {
            const userInfo = nga.nuke({
                __lib: 'ucp',
                __act: 'get',
                uid: userinfo.ngaPassportUid,
            })
            const user_detail = userInfo.data[0]

            nga.d.push({
                title: '[' + user_detail.group + '] ' + user_detail.username,
                pic_url: user_detail.avatar || nga.defaultIconPath,
                url: $(nga.empty).rule(() => {
                    const nga = $.require('hiker://page/nga')
                    nga.ownerParse()
                    setResult(nga.d);
                }),
                col_type: 'avatar',
            })
            /*nga.d.push({
                title: '收藏板块',
                pic_url: 'https://iconfont.tyrantg.com/like.svg',
                url: $(nga.empty+'##fypage').rule(() => {
                    const nga = $.require('hiker://page/nga')
                    nga.channelParse()
                    setResult(nga.d);
                }),
                col_type: 'icon_round_small_4',
            })*/
            nga.d.push({
                title: '收藏帖子',
                pic_url: 'https://iconfont.tyrantg.com/like.svg',
                url: $(nga.empty + '##fypage#noHistory#').rule(() => {
                    const nga = $.require('hiker://page/nga')
                    nga.favorParse()
                    setResult(nga.d);
                }),
                col_type: 'icon_round_small_4',
            })
            /*nga.d.push({
                title: '我的主题',
                pic_url: 'https://iconfont.tyrantg.com/like.svg',
                url: $(nga.empty+'##fypage').rule(() => {
                    const nga = $.require('hiker://page/nga')
                    nga.ownerParse()
                    setResult(nga.d);
                }),
                col_type: 'icon_round_small_4',
            })*/
            /*nga.d.push({
                title: '精华主题',
                pic_url: 'https://iconfont.tyrantg.com/like.svg',
                url: $(nga.empty+'##fypage').rule(() => {
                    const nga = $.require('hiker://page/nga')
                    nga.ownerParse()
                    setResult(nga.d);
                }),
                col_type: 'icon_round_small_4',
            })*/
        } else {
            nga.d.push({
                title: '尚未登录',
                pic_url: nga.defaultIconPath,
                url: $(nga.empty).rule(() => {
                    const nga = $.require('hiker://page/nga')
                    nga.loginPage()
                    setResult(nga.d);
                }),
                col_type: 'avatar',
            })
        }

        const categoryList = nga.get(nga.api.HomeCategory)
        const result = categoryList.result

        nga.d.push({
            col_type: 'line_blank',
        })

        result.forEach((item) => {
            item.groups.forEach((group) => {
                nga.d.push({
                    title: group.name,
                    url: nga.empty,
                    col_type: 'text_1',
                })
                group.forums.forEach((forum) => {
                    nga.d.push({
                        title: forum.name,
                        url: $(nga.empty + '##fypage').rule((fid) => {
                            const nga = $.require('hiker://page/nga')
                            nga.forumParse(fid)
                            setResult(nga.d);
                        }, forum.fid),
                        pic_url: nga.iconCDNUrl + (forum.stid ? forum.stid + 'v.png' : forum.fid + 'u.png'),
                        col_type: 'icon_round_small_4',
                    })
                })
                nga.d.push({
                    col_type: 'line_blank',
                })
            })
        })

        setResult(nga.d)
    },
    ownerParse: () => {
        setPageTitle('个人中心')

        nga.d.push({
            title: '退出',
            url: $(nga.empty).lazyRule(() => {
                const nga = $.require('hiker://page/nga')
                deleteFile(nga.files.userinfoFilePath)
                back(true)
                return nga.empty
            }),
            col_type: 'text_1',
        })
    },
    channelParse: () => {
        setPageTitle('收藏板块')

        const res = nga.thread({
            __lib: 'forum_favor2',
            __act: 'forum_favor',
        })

        log(res)
    },
    favorParse: () => {
        setPageTitle('收藏帖子')
        const page = MY_PAGE

        const res = nga.get(nga.api.FavorAll + '&page=' + page)

        if (res.result) {
            res.result.data.forEach(item => {
                const url = $(nga.empty + '##fypage#noHistory#').rule((tid, title) => {
                    const nga = $.require('hiker://page/nga')
                    nga.readParse(tid, title)
                    setResult(nga.d);
                }, item.tid, item.subject)
                nga.d.push({
                    title: item.subject,
                    url: url,
                    col_type: 'text_1'
                })

                nga.d.push({
                    title: item.author,
                    pic_url: nga.defaultIconPath,
                    url: url,
                    col_type: 'avatar',
                })

                nga.d.push({
                    col_type: 'line_blank',
                })
            })
        }
    },
    forumParse: (fid) => {
        const page = MY_PAGE
        const res = nga.post(nga.api.SubjectList, {
            fid: fid,
            page: page,
        })

        const attachPrefix = res.result.attachPrefix

        if (res.result) {
            res.result.data.forEach(item => {
                const url = $(nga.empty + '##fypage').rule((tid, title) => {
                    const nga = $.require('hiker://page/nga')
                    nga.readParse(tid, title)
                    setResult(nga.d);
                }, item.tid, item.subject)
                nga.d.push({
                    title: item.subject,
                    url: url,
                    col_type: 'text_1'
                })

                if (item.attachs && item.attachs.length > 0) {
                    item.attachs.forEach((item, index) => {
                        if (index < 3) {
                            nga.d.push({
                                url: attachPrefix + item.attachurl,
                                pic_url: attachPrefix + item.attachurl,
                                col_type: 'pic_3'
                            })
                        }
                    })
                }

                nga.d.push({
                    title: item.author,
                    pic_url: nga.defaultIconPath,
                    url: url,
                    col_type: 'avatar',
                })

                nga.d.push({
                    col_type: 'line_blank',
                })

            })
        }
    },
    readParse: (tid, title) => {
        setPageTitle(title)
        const page = MY_PAGE
        const bbcode2Html = $.require('hiker://page/bbcode2Html')
        const res = nga.read({
            tid: tid,
            page: page,
        })

        if (res.data) {
            const userList = res.data.__U || res.data.__u
            const list = res.data.__R || res.data.__r

            list.forEach(item => {
                if (item.subject) {
                    nga.d.push({
                        title: item.subject,
                        url: nga.empty,
                        col_type: 'text_1'
                    })
                }

                const user = userList[item.authorid]

                nga.d.push({
                    title: user.username,
                    pic_url: user.avatar || nga.defaultIconPath,
                    // url: url,
                    col_type: 'avatar',
                })

                const content = item.content
                    .replace(/\[url](.*?)\[\/url]/g, '[url=$1][/url]')
                    .replace(/\[h](.*?)\[\/h]/g, '[url=$1][/url]')
                    .replace(/\[img]\.\/(.*?)\[\/img]/g, '[img=' + nga.attachmentsCDNUrl + '$1][/img]')

                const convert = bbcode2Html.parser(content)

                log(convert)

                nga.d.push({
                    title: convert,
                    col_type: 'rich_text',
                })

                nga.d.push({
                    col_type: 'line_blank',
                })
            })
        } else {
            toast('接口异常')
            back()
        }
    },
}

$.exports = nga
