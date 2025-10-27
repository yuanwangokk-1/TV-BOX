const picacg = {
    // BaseUrl: "https://picaapi.picacomic.com/",
    // cdnUrl: "https://storage.wikawika.xyz/",
    // cdnUrl: "https://storage-b.diwodiwo.xyz/",
    cdnUrl: "https://s3.picacomic.com",
    BaseUrl: "http://172.67.7.24/",
    empty: 'hiker://empty',
    picacg_path: "hiker://files/rules/js/TyrantGenesis_哔咔设置.js",
    searchHistory: "hiker://files/rules/js/TyrantGenesis_哔咔搜索历史.js",
    apiKey: "C69BAF41DA5ABD1FFEDC6D2FEA56B",
    nonce: "b1ab87b4800d4d4590a11701b8551afa",
    secretKey: "~d}$Q7$eIni=V)9\\RK/P.RM4;9[7|@/CA}b~OW!3?EV`:<>M7pddUBL5n|0/*Cn",
    d: [],
    data: {
        rankTT: getItem('rankTT', 'H24'),
        sort: getItem('sort', 'ua'),
        searchValue: getItem('searchValue', ''),
        searchHistoryShowStatus: getItem('searchHistoryShowStatus', '0'),
        infoTab: getItem('infoTab', '1'),
        infoReverse: getItem('infoReverse', '1'),
    },
    share_account: {
        name: 'hiker_share',
        passwd: 'hiker_share_12345678'
    },
    defaultConfig: {
        searchHistoryMax: 100,
        searchHistoryShowLimit: 20,
    },
    images: [],
    episodes: [],
    headers: {
        "accept": "application/vnd.picacomic.com.v1+json",
        "app-channel": "2",
        "time": (new Date().getTime() / 1000).toFixed(0),
        "app-version": "2.2.1.2.3.3",
        "app-uuid": "defaultUuid",
        "app-platform": "android",
        "app-build-version": "44",
        "Content-Type": "application/json; charset=UTF-8",
        "User-Agent": "okhttp/3.8.1",
        "image-quality": "original",
        "Host": "picaapi.picacomic.com",
    },
    encrypt: (url, ts, method) => {
        eval(getCryptoJS())
        let raw = url.replace(picacg.BaseUrl, "") + ts + picacg.nonce + method + picacg.apiKey
        raw = raw.toLocaleLowerCase()
        return CryptoJS.HmacSHA256(raw, picacg.secretKey).toString(CryptoJS.enc.Hex)
    },
    httpRequest: (path, method, data) => {
        let responseJson
        const request_url = picacg.BaseUrl + path
        let headers = picacg.headers
        headers['api-key'] = picacg.apiKey
        headers.nonce = picacg.nonce
        headers.signature = picacg.encrypt(request_url, headers.time, method)
        try {
            if (fileExist(picacg.picacg_path)) headers.authorization = fetch(picacg.picacg_path).split('\n')[2]
        } catch (e) {
            writeFile(picacg.picacg_path, '')
            toast('账号异常,请重新登录')
            refreshPage(false)
        }

        responseJson = method === 'GET' ? fetch(request_url, {headers: headers}) : fetch(request_url, {
            headers: headers,
            method: method,
            body: data
        })

        const response = JSON.parse(responseJson)

        // 自动登录
        if (response.code === 401 && response.error === '1005') {
            let email, password
            try {
                if (fileExist(picacg.picacg_path)) {
                    email = fetch(picacg.picacg_path).split('\n')[0]
                    password = fetch(picacg.picacg_path).split('\n')[1]
                }
            } catch (e) {
                writeFile(picacg.picacg_path, '')
                toast('账号异常,请重新登录')
                refreshPage(true)
            }
            if (!email || !password) {
                writeFile(picacg.picacg_path, '')
                toast('账号异常,请重新登录')
                refreshPage(true)
            } else {
                const autoLoginResponse = picacg.post('auth/sign-in', {
                    email: email,
                    password: password,
                })
                if (autoLoginResponse.code === 400) {
                    return 'toast://' + (autoLoginResponse.detail || autoLoginResponse.message)
                } else {
                    const setting = email + '\n' + password + '\n' + autoLoginResponse.data.token
                    writeFile(picacg.picacg_path, setting)
                    refreshPage(true)
                }
            }
        }
        return response
    },
    get: path => picacg.httpRequest(path, 'GET', ''),
    post: (path, data) => picacg.httpRequest(path, 'POST', data),
    baseParse: () => {
        if (!fileExist(picacg.picacg_path) || !fetch(picacg.picacg_path)) {
            picacg.d.push({
                title: '登录哔咔',
                url: $(picacg.empty).rule(() => {
                    const picacg = $.require('hiker://page/picacg')
                    picacg.login()
                    setResult(picacg.d);
                }),
                col_type: 'text_center_1'
            })
            picacg.d.push({
                title: '注册哔咔',
                url: $(picacg.empty).rule(() => {
                    const picacg = $.require('hiker://page/picacg')
                    picacg.register()
                    setResult(picacg.d);
                }),
                col_type: 'text_center_1'
            })
            picacg.d.push({
                title: '共享账号登录',
                url: $(picacg.empty).lazyRule(() => {
                    const picacg = $.require('hiker://page/picacg')
                    return picacg.shareLogin()
                }),
                col_type: 'text_center_1'
            })
        } else {
            try {
                const userInfo = picacg.get('users/profile').data.user

                picacg.d.push({
                    title: '用户『' + userInfo.name + '』 # 个人中心',
                    pic_url: 'https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/assets/images/pica.jpg',
                    url: $(picacg.empty).rule(() => {
                        const picacg = $.require('hiker://page/picacg')
                        picacg.settingPage()
                        setResult(picacg.d)
                    }),
                    col_type: 'avatar',
                })
            } catch (e) {
            }

            picacg.d.push({
                url: $(picacg.empty + "#fullTheme#$$fypage").rule(() => {
                    const picacg = $.require('hiker://page/picacg')
                    picacg.getSearch()
                    setResult(picacg.d)
                }),
                title: '请输入关键词',
                col_type: "icon_1_search",
            })
            picacg.d.push({
                title: '排行榜',
                url: $(picacg.empty + "#fullTheme#").rule(() => {
                    const picacg = $.require('hiker://page/picacg')
                    picacg.getRanking()
                    setResult(picacg.d)
                }),
                col_type: 'text_3',
            })
            picacg.d.push({
                title: '随机本子',
                url: $(picacg.empty + "#fullTheme#$$fypage").rule(() => {
                    const picacg = $.require('hiker://page/picacg')
                    picacg.getRandom()
                    setResult(picacg.d)
                }),
                col_type: 'text_3',
            })
            picacg.d.push({
                title: '我的收藏',
                url: $(picacg.empty + "#fullTheme#$$fypage").rule(() => {
                    const picacg = $.require('hiker://page/picacg')
                    picacg.getFavourite()
                    setResult(picacg.d)
                }),
                col_type: 'text_3',
            })
            picacg.d.push({
                col_type: 'line_blank'
            })
            picacg.getCategories()
        }

        setResult(picacg.d);
    },
    login: () => {
        picacg.d.push({
            desc: '请输入用户名',
            col_type: 'input',
            extra: {
                titleVisible: false,
                onChange: $.toString(() => {
                    if (input) setItem('email', input)
                })
            }
        })
        picacg.d.push({
            desc: '请输入密码',
            col_type: 'input',
            extra: {
                titleVisible: false,
                onChange: $.toString(() => {
                    if (input) setItem('password', input)
                })
            }
        })
        picacg.d.push({
            title: '登录',
            url: $(picacg.empty).lazyRule(() => {
                const picacg = $.require('hiker://page/picacg')
                const response = picacg.post('auth/sign-in', {
                    email: getItem('email', ''),
                    password: getItem('password', ''),
                })
                if (response.code === 400) {
                    return 'toast://' + (response.detail || response.message)
                } else {
                    const setting = getItem('email', '') + '\n' + getItem('password', '') + '\n' + response.data.token
                    writeFile(picacg.picacg_path, setting)
                    toast('登录成功')
                    back(true)
                    return picacg.empty
                }
            }),
            col_type: 'text_center_1',
            extra: {
                lineVisible: false,
            }
        })

    },
    shareLogin: () => {
        const response = picacg.post('auth/sign-in', {
            email: picacg.share_account.name,
            password: picacg.share_account.passwd,
        })
        if (response.code === 400 || response.code === 401) {
            return 'toast://' + (response.detail || response.message)
        } else {
            const setting = getItem('email', '') + '\n' + getItem('password', '') + '\n' + response.data.token
            writeFile(picacg.picacg_path, setting)
            refreshPage(false)
            return "toast://登录成功"
        }
    },
    register: () => {
        picacg.d.push({
            desc: '请输入昵称',
            col_type: 'input',
            extra: {
                titleVisible: false,
                onChange: $.toString(() => {
                    if (input) setItem('name', input)
                })
            }
        })
        picacg.d.push({
            desc: '请输入用户名',
            col_type: 'input',
            extra: {
                titleVisible: false,
                onChange: $.toString(() => {
                    if (input) setItem('email', input)
                })
            }
        })
        picacg.d.push({
            desc: '请输入密码',
            col_type: 'input',
            extra: {
                titleVisible: false,
                onChange: $.toString(() => {
                    if (input) setItem('password', input)
                })
            }
        })
        picacg.d.push({
            title: '注册',
            url: $(picacg.empty).lazyRule(() => {
                const picacg = $.require('hiker://page/picacg')
                const response = picacg.post('auth/register', {
                    email: getItem('email', ''),
                    password: getItem('password', ''),
                    name: getItem('name', ''),
                    birthday: '1970-01-01',
                    gender: 'f',
                    question1: 'question1',
                    question2: 'question2',
                    question3: 'question3',
                    answer1: 'answer1',
                    answer2: 'answer2',
                    answer3: 'answer3',
                })

                if (response.code === 400) {
                    return 'toast://' + (response.detail || response.message)
                } else {
                    const loginResponse = picacg.post('auth/sign-in', {
                        email: getItem('email', ''),
                        password: getItem('password', ''),
                    })
                    const setting = getItem('email', '') + '\n' + getItem('password', '') + '\n' + loginResponse.data.token
                    writeFile(picacg.picacg_path, setting)
                    toast('注册成功，已自动登录')
                    back(true)
                    return picacg.empty
                }
            }),
            col_type: 'text_center_1',
            extra: {
                lineVisible: false,
            }
        })
    },
    getSearch: () => {
        addListener('onClose', $.toString(() => {
            clearItem('sort')
            clearItem('searchValue')
            clearItem('searchHistoryShowStatus')
        }))

        const page = MY_URL.split('$$')[1]

        if (parseInt(page) === 1) {
            picacg.d.push({
                title: '搜索',
                url: $.toString(() => {
                    const picacg = $.require('hiker://page/picacg')
                    picacg.setSearchHistory(input)
                    setItem('searchValue', input)
                    refreshPage(false)
                    return "hiker://empty"
                }),
                desc: '请输入关键词',
                col_type: 'input',
                extra: {
                    defaultValue: picacg.data.searchValue,
                    onChange: $.toString(() => {
                        if (getItem('searchValue', '') && !input) {
                            clearItem('searchValue')
                            clearItem('searchHistoryShowStatus')
                            refreshPage(false)
                            return "hiker://empty"
                        }
                    })
                }
            })

            if (!picacg.data.searchValue) {
                if (fileExist(picacg.searchHistory) && fetch(picacg.searchHistory)) {
                    const searchHistory = fetch(picacg.searchHistory).split('||').filter(item => item)
                    picacg.d.push({
                        title: '搜索记录：',
                        url: picacg.empty,
                        col_type: 'text_1',
                        extra: {
                            lineVisible: false
                        },
                    })

                    let picacgConfig = picacg.defaultConfig
                    searchHistory.forEach((history, index) => {
                        if (picacg.data.searchHistoryShowStatus === '1' || (picacg.data.searchHistoryShowStatus === '0' && picacgConfig.searchHistoryShowLimit - index >= 1)) {
                            picacg.d.push({
                                title: history,
                                url: $(picacg.empty).lazyRule(history => {
                                    const picacg = $.require('hiker://page/picacg')
                                    picacg.setSearchHistory(history)
                                    setItem('searchValue', history)
                                    refreshPage(false)
                                    return "hiker://empty"
                                }, history),
                                col_type: 'flex_button'
                            })
                        }
                    })

                    picacg.d.push({
                        title: picacg.data.searchHistoryShowStatus === '1' ? '折叠记录' : '展开记录',
                        url: $(picacg.empty).lazyRule(params => {
                            setItem('searchHistoryShowStatus', params.status ? '0' : '1')
                            refreshPage(true)
                            return "hiker://empty"
                        }, {
                            status: picacg.data.searchHistoryShowStatus === '1'
                        }),
                        col_type: 'text_2',
                    })
                    picacg.d.push({
                        title: '清除记录',
                        url: $(picacg.empty).lazyRule(params => {
                            writeFile(params.filename, '')
                            refreshPage(true)
                            return "hiker://empty"
                        }, {
                            filename: picacg.searchHistory
                        }),
                        col_type: 'text_2',
                    })
                }

                const hot_data = picacg.get('keywords')
                picacg.d.push({
                    col_type: 'line_blank'
                })
                picacg.d.push({
                    title: '热门搜索：',
                    url: picacg.empty,
                    col_type: 'text_1',
                    extra: {
                        lineVisible: false
                    },
                })
                hot_data.data.keywords.forEach(hot => {
                    picacg.d.push({
                        title: hot,
                        url: $(picacg.empty).lazyRule(hot => {
                            const picacg = $.require('hiker://page/picacg')
                            picacg.setSearchHistory(hot)
                            setItem('searchValue', hot)
                            refreshPage(false)
                            return "hiker://empty"
                        }, hot),
                        col_type: 'flex_button'
                    })
                })
            } else {
                picacg.makeSort()
            }
        }

        picacg.getSearchResult(page, '')
    },
    getSearchResult: (page, value) => {
        const searchValue = value ? value : picacg.data.searchValue
        if (searchValue) {
            const response = picacg.post('comics/advanced-search?page=' + page, {
                keyword: searchValue,
                sort: picacg.data.sort,
            })
            response.data.comics.docs.forEach(comic => {
                picacg.d.push({
                    title: comic.title,
                    desc: comic.author,
                    pic_url: /*comic.thumb.fileServer*/picacg.cdnUrl + '/static/' + comic.thumb.path,
                    url: $(picacg.empty + '#immersiveTheme##noHistory#$$fypage').rule((id) => {
                        const picacg = $.require('hiker://page/picacg')
                        picacg.getInfo(id)
                        setResult(picacg.d);
                    }, comic._id),
                    col_type: 'movie_3'
                })
            })
        }
    },
    setSearchHistory: value => {
        let picacgConfig = picacg.defaultConfig
        let searchHistory = fetch(picacg.searchHistory).split('||').filter(item => item)

        if (searchHistory.includes(value)) {
            for (let i in searchHistory) {
                if (searchHistory[i] === value) {
                    searchHistory.splice(i, 1)
                    break
                }
            }
        } else if (searchHistory.length >= picacgConfig.searchHistoryMax) {
            searchHistory = searchHistory.slice(0, picacgConfig.searchHistoryMax - 1)
        }

        searchHistory.unshift(value)
        writeFile(picacg.searchHistory, searchHistory.join('||'))
    },
    getRanking: () => {
        addListener('onClose', $.toString(() => {
            clearItem('rankTT')
        }))
        const tabs = [
            {title: '24小时', id: 'H24'},
            {title: '7天', id: 'D7'},
            {title: '30天', id: 'D30'},
        ]
        picacg.d.push({
            title: '排行榜',
            url: picacg.empty,
            col_type: 'text_center_1',
            extra: {
                lineVisible: false
            },
        })
        picacg.d.push({
            col_type: 'line_blank'
        })
        tabs.forEach(item => {
            picacg.d.push({
                title: picacg.data.rankTT === item.id ? '‘‘’’<strong><font color="#ff1493">' + item.title + '</font></strong>' : item.title,
                url: $(picacg.empty).lazyRule((item) => {
                    setItem('rankTT', item.id)
                    refreshPage(false)
                    return 'hiker://empty'
                }, item),
                col_type: 'text_3',
            })
        })
        picacg.d.push({
            col_type: 'line_blank'
        })
        const response = picacg.get('comics/leaderboard?tt=' + picacg.data.rankTT + '&ct=VC')

        response.data.comics.forEach(comic => {
            picacg.d.push({
                title: comic.title,
                desc: comic.author,
                pic_url: /*comic.thumb.fileServer*/picacg.cdnUrl + '/static/' + comic.thumb.path,
                url: $(picacg.empty + '#immersiveTheme##noHistory#$$fypage').rule((id) => {
                    const picacg = $.require('hiker://page/picacg')
                    picacg.getInfo(id)
                    setResult(picacg.d);
                }, comic._id),
                col_type: 'movie_3'
            })
        })
    },
    getRandom: () => {
        const page = MY_URL.split('$$')[1]
        if (parseInt(page) === 1) {
            picacg.d.push({
                title: '随机本子',
                url: picacg.empty,
                col_type: 'text_center_1',
                extra: {
                    lineVisible: false
                },
            })
            picacg.d.push({
                col_type: 'line_blank'
            })
        }
        const response = picacg.get('comics/random?page=' + page)
        response.data.comics.forEach(comic => {
            picacg.d.push({
                title: comic.title,
                desc: comic.author,
                pic_url: /*comic.thumb.fileServer*/picacg.cdnUrl + '/static/' + comic.thumb.path,
                url: $(picacg.empty + '#immersiveTheme##noHistory#$$fypage').rule((id) => {
                    const picacg = $.require('hiker://page/picacg')
                    picacg.getInfo(id)
                    setResult(picacg.d);
                }, comic._id),
                col_type: 'movie_3'
            })
        })
    },
    getFavourite: () => {
        const page = MY_URL.split('$$')[1]
        if (parseInt(page) === 1) {
            picacg.d.push({
                title: '我的收藏',
                url: picacg.empty,
                col_type: 'text_center_1',
                extra: {
                    lineVisible: false
                },
            })
            picacg.d.push({
                col_type: 'line_blank'
            })
        }
        const response = picacg.get('users/favourite?s=dd&page=' + page)
        response.data.comics.docs.forEach(comic => {
            picacg.d.push({
                title: comic.title,
                desc: comic.author,
                pic_url: /*comic.thumb.fileServer*/picacg.cdnUrl + '/static/' + comic.thumb.path,
                url: $(picacg.empty + '#immersiveTheme##noHistory#$$fypage').rule((id) => {
                    const picacg = $.require('hiker://page/picacg')
                    picacg.getInfo(id)
                    setResult(picacg.d);
                }, comic._id),
                col_type: 'movie_3'
            })
        })
    },
    getCategories: () => {
        const response = picacg.get('categories')
        if (response.code === 200) {
            const no_image = ['大家都在看', '那年今天', '官方都在看'];
            response.data.categories.forEach((cate, index) => {
                let pic = no_image.includes(cate.title) ? 'https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/assets/images/pica.jpg' : /*cate.thumb.fileServer*/(picacg.cdnUrl + '/static/' + cate.thumb.path)
                let desc = no_image.includes(cate.title) ? '0' : '5'
                // let desc = '3'
                if (!cate.isWeb) {
                    picacg.d.push({
                        title: cate.title,
                        desc: desc,
                        pic_url: pic,
                        url: $(picacg.empty + '#noHistory#$$fypage').rule((title) => {
                            const picacg = $.require('hiker://page/picacg')
                            picacg.getComics(title)
                            setResult(picacg.d);
                        }, cate.title),
                        col_type: 'card_pic_3'
                    })
                }
            })
        }
    },
    getComics: (title) => {
        addListener('onClose', $.toString(() => {
            clearItem('sort')
        }))
        const page = MY_URL.split('$$')[1]
        if (parseInt(page) === 1) picacg.makeSort()
        const response = picacg.get('comics?c=' + encodeURIComponent(title) + '&page=' + page + '&s=' + picacg.data.sort)
        if (response.code === 200) {
            response.data.comics.docs.forEach((comic, index) => {
                picacg.d.push({
                    title: comic.title,
                    desc: comic.author,
                    pic_url: /*comic.thumb.fileServer*/picacg.cdnUrl + '/static/' + comic.thumb.path,
                    url: $(picacg.empty + '#immersiveTheme##noHistory#$$fypage').rule((id) => {
                        const picacg = $.require('hiker://page/picacg')
                        picacg.getInfo(id)
                        setResult(picacg.d);
                    }, comic._id),
                    col_type: 'movie_3'
                })
            })
        }
    },
    getEpisodesPicture: (id, page) => {
        const episodesRes = picacg.get('comics/' + id + '/eps?page=' + page)
        if (episodesRes.code === 200 && episodesRes.data.eps.docs.length > 0) {
            episodesRes.data.eps.docs.forEach((ep, index) => {
                picacg.episodes.push({
                    title: ep.title,
                    url: ep.order,
                })
            })
            page = page + 1
            picacg.getEpisodesPicture(id, page)
        }
    },
    getInfo: (id) => {
        addListener('onClose', $.toString(() => {
            clearItem('infoTab')
            clearItem('infoReverse')
        }))
        const page = MY_URL.split('$$')[1]

        if (parseInt(page) === 1) {
            const response = picacg.get('comics/' + id)
            if (!response.data) {
                toast('漫画信息错误')
                back(false)
            }

            const info = response.data.comic

            setPageTitle(info.title)

            picacg.d.push({
                title: info.title,
                desc:
                    '✨ 分类：' + info.categories.join(' ') + '\n' +
                    '❤️ 喜欢：' + info.likesCount + '    🌐 浏览：' + info.viewsCount + '\n' +
                    '🎯 详情：' + info.description,
                pic_url: /*info.thumb.fileServer*/picacg.cdnUrl + '/static/' + info.thumb.path,
                url: $(picacg.empty).rule((description, image) => {
                    const picacg = $.require('hiker://page/picacg')
                    setPageTitle('本子详情')
                    picacg.d.push({
                        pic_url: image,
                        url: image,
                        col_type: 'pic_1_full'
                    })
                    picacg.d.push({
                        title: description,
                        col_type: 'long_text'
                    })
                    setResult(picacg.d)
                }, info.description, /*info.thumb.fileServer*/picacg.cdnUrl + '/static/' + info.thumb.path),
                col_type: 'movie_1_vertical_pic_blur'
            })

            picacg.d.push({
                col_type: 'line_blank'
            })

            try {
                picacg.d.push({
                    title: '作者：' + info.author,
                    pic_url: 'https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/assets/images/pica.jpg',
                    url: $(picacg.empty + "#fullTheme##noHistory#$$fypage").rule((author) => {
                        addListener('onClose', $.toString(() => {
                            clearItem('sort')
                            clearItem('searchValue')
                        }))
                        const page = MY_URL.split('$$')[1]
                        const picacg = $.require('hiker://page/picacg')
                        picacg.setSearchHistory(author)
                        if (parseInt(page) === 1) {
                            picacg.d.push({
                                title: '标签搜索：‘‘’’<strong><font color="#ff1493">' + author + '</font></strong>',
                                url: picacg.empty,
                                col_type: 'text_center_1',
                                extra: {
                                    lineVisible: false
                                },
                            })
                            picacg.makeSort()
                        }
                        picacg.getSearchResult(page, author)
                        setResult(picacg.d)
                    }, info.author),
                    col_type: 'icon_2_round'
                })
                picacg.d.push({
                    title: '上传：' + info._creator.name,
                    pic_url: info._creator.avatar ? /*info._creator.avatar.fileServer*/(picacg.cdnUrl + '/static/' + info._creator.avatar.path) : 'https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/assets/images/pica.jpg',
                    url: $(picacg.empty + "#fullTheme##noHistory#$$fypage").rule((name) => {
                        addListener('onClose', $.toString(() => {
                            clearItem('sort')
                            clearItem('searchValue')
                        }))
                        const page = MY_URL.split('$$')[1]
                        const picacg = $.require('hiker://page/picacg')
                        picacg.setSearchHistory(name)
                        if (parseInt(page) === 1) {
                            picacg.d.push({
                                title: '标签搜索：‘‘’’<strong><font color="#ff1493">' + name + '</font></strong>',
                                url: picacg.empty,
                                col_type: 'text_center_1',
                                extra: {
                                    lineVisible: false
                                },
                            })
                            picacg.makeSort()
                        }
                        picacg.getSearchResult(page, name)
                        setResult(picacg.d)
                    }, info._creator.name),
                    col_type: 'icon_2_round'
                })

                if (info.tags.length > 0) {
                    info.tags.forEach(tag => {
                        picacg.d.push({
                            title: tag,
                            url: $(picacg.empty + "#fullTheme##noHistory#$$fypage").rule((tag) => {
                                addListener('onClose', $.toString(() => {
                                    clearItem('sort')
                                    clearItem('searchValue')
                                }))
                                const page = MY_URL.split('$$')[1]
                                const picacg = $.require('hiker://page/picacg')
                                picacg.setSearchHistory(tag)
                                if (parseInt(page) === 1) {
                                    picacg.d.push({
                                        title: '标签搜索：‘‘’’<strong><font color="#ff1493">' + tag + '</font></strong>',
                                        url: picacg.empty,
                                        col_type: 'text_center_1',
                                        extra: {
                                            lineVisible: false
                                        },
                                    })
                                    picacg.makeSort()
                                }
                                picacg.getSearchResult(page, tag)
                                setResult(picacg.d)
                            }, tag),
                            col_type: 'flex_button',
                        })
                    })

                    picacg.d.push({
                        col_type: 'line'
                    })
                }
            } catch (e) {
            }

            // 递归获取选集
            picacg.getEpisodesPicture(id, 1)

            picacg.d.push({
                title: info.isFavourite ? '‘‘’’<strong><font color="red">取消收藏</font></strong>' : '‘‘’’<strong><font color="#00bfff">收藏</font></strong>',
                url: $(picacg.empty).lazyRule((id, isFavourite) => {
                    const picacg = $.require('hiker://page/picacg')
                    picacg.post('comics/' + id + '/favourite', {})
                    toast(isFavourite ? '取消收藏' : '收藏成功')
                    refreshPage(false)
                    return picacg.empty
                }, id, info.isFavourite),
                col_type: 'text_3'
            })

            picacg.d.push({
                title: info.isLiked ? '‘‘’’<strong><font color="red">取消点赞</font></strong>' : '‘‘’’<strong><font color="#00bfff">点赞</font></strong>',
                url: $(picacg.empty).lazyRule((id, isLiked) => {
                    const picacg = $.require('hiker://page/picacg')
                    picacg.post('comics/' + id + '/like', {})
                    toast(isLiked ? '取消点赞' : '点赞成功')
                    refreshPage(false)
                    return picacg.empty
                }, id, info.isLiked),
                col_type: 'text_3'
            })

            picacg.d.push({
                title: '‘‘’’<strong><font color="#ff1493">下载</font></strong>',
                url: "hiker://page/download.view#noHistory##noRecordHistory##noRefresh#?rule=本地资源管理",
                extra: {
                    chapterList: picacg.episodes,
                    info: {
                        bookName: info.title,
                        ruleName: MY_RULE.title,
                        bookTopPic: /*info.thumb.fileServer*/picacg.cdnUrl + '/static/' + info.thumb.path,
                        parseCode: $.toString((id, ruleName) => {
                            const picacg = $.require('hiker://page/picacg?rule=' + ruleName)
                            return picacg.getPicture(id, input)
                        }, id, MY_RULE.title)
                    },
                    defaultView: "1"
                },
                col_type: 'text_3',
            })

            picacg.d.push({
                col_type: 'line'
            })

            const tabs = [
                {title: '章节', id: '1'},
                {title: '推荐', id: '2'},
                {title: '看评论', id: '3'},
                {title: '写评论', id: '4'},
            ]

            tabs.forEach(tab => {
                picacg.d.push({
                    title: picacg.data.infoTab === tab.id ? '‘‘’’<strong><font color="#ff1493">' + tab.title + '</font></strong>' : tab.title,
                    url: $(picacg.empty).lazyRule((tab) => {
                        setItem('infoTab', tab.id)
                        refreshPage(false)
                        return 'hiker://empty'
                    }, tab),
                    col_type: 'text_4',
                })
            })

            switch (picacg.data.infoTab) {
                case '1':
                    picacg.d.push({
                        title: picacg.data.infoReverse === '1' ? '当前排序：正序' : '当前排序：倒序',
                        url: $(picacg.empty).lazyRule((infoReverse) => {
                            setItem('infoReverse', infoReverse ? '2' : '1')
                            refreshPage(false)
                            return 'hiker://empty'
                        }, picacg.data.infoReverse === '1'),
                        col_type: 'text_center_1',
                    })

                    const data = picacg.data.infoReverse === '1' ? picacg.episodes.reverse() : picacg.episodes

                    data.forEach(ep => {
                        picacg.d.push({
                            title: ep.title,
                            url: $(picacg.empty).lazyRule((id, order) => {
                                const picacg = $.require('hiker://page/picacg')
                                return picacg.getPicture(id, order)
                            }, id, ep.url),
                            col_type: 'text_3'
                        })
                    })
                    break
                case '2':
                    const recommendationResponse = picacg.get('comics/' + id + '/recommendation')
                    recommendationResponse.data.comics.forEach(comic => {
                        picacg.d.push({
                            title: comic.title,
                            desc: comic.author,
                            pic_url: /*comic.thumb.fileServer*/picacg.cdnUrl + '/static/' + comic.thumb.path,
                            url: $(picacg.empty + '#immersiveTheme##noHistory#$$fypage').rule((id) => {
                                const picacg = $.require('hiker://page/picacg')
                                picacg.getInfo(id)
                                setResult(picacg.d);
                            }, comic._id),
                            col_type: 'movie_3'
                        })
                    })
                    break
                case '4':
                    picacg.d.push({
                        desc: '请输入评论',
                        col_type: 'input',
                        extra: {
                            type: 'textarea',
                            height: 5,
                            titleVisible: false,
                            onChange: $.toString(() => {
                                if (input) setItem('comment', input)
                            })
                        }
                    })
                    picacg.d.push({
                        title: '提交评论',
                        url: $(picacg.empty).lazyRule((id) => {
                            const picacg = $.require('hiker://page/picacg')
                            const comment = getItem('comment', '')
                            if (!comment) {
                                return 'toast://请填写评论'
                            } else {
                                const sendCommentResponse = picacg.post('comics/' + id + '/comments', {
                                    content: comment
                                })

                                if (sendCommentResponse.code === 200) {
                                    setItem('infoTab', '3')
                                    refreshPage(true)
                                    return 'toast://评论成功'
                                } else {
                                    return 'toast://' + (sendCommentResponse.message || sendCommentResponse.detail)
                                }
                            }
                        }, id),
                        col_type: 'text_center_1',
                    })
                    break
            }

        }

        try {
            if (picacg.data.infoTab === '3') {
                const commentsResponse = picacg.get('comics/' + id + '/comments?page=' + page)
                commentsResponse.data.comments.docs.forEach(comment => {
                    let user = comment._user
                    if (user) {
                        picacg.d.push({
                            title: user.name,
                            pic_url: user.avatar ?/* user.avatar.fileServer*/(picacg.cdnUrl + '/static/' + user.avatar.path) : 'https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/assets/images/pica.jpg',
                            url: picacg.empty,
                            col_type: 'avatar'
                        })
                    }
                    picacg.d.push({
                        title: comment.content + '<br />' + '❤️ 喜欢：' + comment.likesCount + '&nbsp;&nbsp;&nbsp;&nbsp;🌐 回复：' + comment.commentsCount,
                        col_type: 'rich_text'
                    })
                    picacg.d.push({
                        title: comment.isLiked ? '取消点赞' : '点赞',
                        url: $(picacg.empty).lazyRule((id) => {
                            const picacg = $.require('hiker://page/picacg')
                            picacg.post('comments/' + id + '/like', {})
                            refreshPage(false)
                            return 'toast://提交成功'
                        }, comment._id),
                        col_type: 'text_3',
                    })
                    picacg.d.push({
                        title: '看回复',
                        url: $(picacg.empty + '$$fypage').rule((id) => {
                            const page = MY_URL.split('$$')[1]
                            const picacg = $.require('hiker://page/picacg')
                            const response = picacg.get('comments/' + id + '/childrens?page=' + page)

                            response.data.comments.docs.forEach(comment => {
                                let user = comment._user
                                if (user) {
                                    picacg.d.push({
                                        title: user.name,
                                        pic_url: user.avatar ? (/*user.avatar.fileServer*/picacg.cdnUrl + '/static/' + user.avatar.path) : 'https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/assets/images/pica.jpg',
                                        url: picacg.empty,
                                        col_type: 'avatar'
                                    })
                                }
                                picacg.d.push({
                                    title: comment.content + '<br />' + '❤️ 喜欢：' + comment.likesCount,
                                    col_type: 'rich_text'
                                })
                                picacg.d.push({
                                    title: comment.isLiked ? '取消点赞' : '点赞',
                                    url: $(picacg.empty).lazyRule((id) => {
                                        const picacg = $.require('hiker://page/picacg')
                                        picacg.post('comments/' + id + '/like', {})
                                        refreshPage(false)
                                        return 'toast://提交成功'
                                    }, comment._id),
                                    col_type: 'text_center_1',
                                    extra: {
                                        lineVisible: false
                                    },
                                })
                                picacg.d.push({
                                    col_type: 'line',
                                })
                            })

                            setResult(picacg.d);
                        }, comment._id),
                        col_type: 'text_3',
                    })
                    picacg.d.push({
                        title: '写回复',
                        url: $(picacg.empty).rule((id) => {
                            const picacg = $.require('hiker://page/picacg')
                            picacg.d.push({
                                desc: '请输入评论',
                                col_type: 'input',
                                extra: {
                                    type: 'textarea',
                                    height: 5,
                                    titleVisible: false,
                                    onChange: $.toString(() => {
                                        if (input) setItem('comment', input)
                                    })
                                }
                            })
                            picacg.d.push({
                                title: '提交评论',
                                url: $(picacg.empty).lazyRule((id) => {
                                    const picacg = $.require('hiker://page/picacg')
                                    const comment = getItem('comment', '')
                                    if (!comment) {
                                        return 'toast://请填写评论'
                                    } else {
                                        const sendCommentResponse = picacg.post('comments/' + id, {
                                            content: comment
                                        })

                                        if (sendCommentResponse.code === 200) {
                                            back(false)
                                            return 'toast://评论成功'
                                        } else {
                                            return 'toast://' + (sendCommentResponse.message || sendCommentResponse.detail)
                                        }
                                    }
                                }, id),
                                col_type: 'text_center_1',
                            })
                            setResult(picacg.d);
                        }, comment._id),
                        col_type: 'text_3',
                    })
                    /*picacg.d.push({
                        title: '举报',
                        url: $(picacg.empty).lazyRule((id) => {
                            const picacg = $.require('hiker://page/picacg')
                            picacg.post('comics/'+id+'/report', {})
                            return 'toast://提交成功'
                        }, id),
                        col_type: 'text_4',
                    })*/
                    picacg.d.push({
                        col_type: 'line',
                    })
                })
            }
        } catch (e) {
        }

    },
    getRecursionPicture: (id, order, page) => {
        const response = picacg.get('comics/' + id + '/order/' + order + '/pages?page=' + page)
        if (response.code === 200 && response.data.pages.docs.length > 0) {
            response.data.pages.docs.forEach((page, index) => {
                picacg.images.push(/*page.media.fileServer*/picacg.cdnUrl + '/static/' + page.media.path)
            })
            page = page + 1
            picacg.getRecursionPicture(id, order, page)
        }
    },
    getPicture: (id, order) => {
        // 递归获取内容
        picacg.getRecursionPicture(id, order, 1)
        return 'pics://' + picacg.images.join('&&')
    },
    makeSort: () => {
        const tabs = [
            {title: '默认排序', id: 'ua'},
            {title: '新到旧', id: 'dd'},
            {title: '旧到新', id: 'da'},
            {title: '最多爱心', id: 'ld'},
            {title: '最多指名', id: 'vd'},
        ];

        tabs.forEach(item => {
            picacg.d.push({
                title: picacg.data.sort === item.id ? '‘‘’’<strong><font color="#ff1493">' + item.title + '</font></strong>' : item.title,
                url: $(picacg.empty).lazyRule((item) => {
                    setItem('sort', item.id)
                    refreshPage(false)
                    return 'hiker://empty'
                }, item),
                col_type: 'scroll_button',
            })
        })

        picacg.d.push({
            col_type: 'blank_block',
        })
    },
    settingPage: () => {
        picacg.d.push({
            title: '签到',
            url: $(picacg.empty).lazyRule(() => {
                const picacg = $.require('hiker://page/picacg')
                const response = picacg.post('users/punch-in', {})
                if (response.code === 200) {
                    return 'toast://签到成功'
                } else {
                    return 'toast://' + (response.message || response.detail)
                }
            }),
            col_type: 'text_center_1'
        })
        picacg.d.push({
            title: '我的评论',
            url: $(picacg.empty + '$$fypage').rule(() => {
                const page = MY_URL.split('$$')[1]
                const picacg = $.require('hiker://page/picacg')
                const response = picacg.get('users/my-comments?page=' + page)

                response.data.comments.docs.forEach(comment => {
                    let user = comment._user
                    if (user) {
                        picacg.d.push({
                            title: user.name,
                            pic_url: user.avatar ? (/*user.avatar.fileServer*/picacg.cdnUrl + '/static/' + user.avatar.path) : 'https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/assets/images/pica.jpg',
                            url: picacg.empty,
                            col_type: 'avatar'
                        })
                    }
                    picacg.d.push({
                        title: comment.content + '<br />' + '❤️ 喜欢：' + comment.likesCount,
                        col_type: 'rich_text'
                    })
                    picacg.d.push({
                        title: comment.isLiked ? '取消点赞' : '点赞',
                        url: $(picacg.empty).lazyRule((id) => {
                            const picacg = $.require('hiker://page/picacg')
                            picacg.post('comments/' + id + '/like', {})
                            refreshPage(false)
                            return 'toast://提交成功'
                        }, comment._id),
                        col_type: 'text_2',
                        extra: {
                            lineVisible: false
                        },
                    })
                    picacg.d.push({
                        title: '查看漫画',
                        url: $(picacg.empty + '#immersiveTheme##noHistory#$$fypage').rule((id) => {
                            const picacg = $.require('hiker://page/picacg')
                            picacg.getInfo(id)
                            setResult(picacg.d);
                        }, comment._comic._id),
                        col_type: 'text_2',
                        extra: {
                            lineVisible: false
                        },
                    })
                    picacg.d.push({
                        col_type: 'line',
                    })
                })
                setResult(picacg.d)
            }),
            col_type: 'text_center_1'
        })
        picacg.d.push({
            title: '退出登录',
            url: $(picacg.empty).lazyRule(() => {
                const picacg = $.require('hiker://page/picacg')
                writeFile(picacg.picacg_path, '')
                toast('退出登录')
                back(true)
                return picacg.empty
            }),
            col_type: 'text_center_1'
        })
    },
}

$.exports = picacg
