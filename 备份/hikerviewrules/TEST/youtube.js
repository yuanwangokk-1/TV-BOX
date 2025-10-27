const key_path = "hiker://files/rules/js/TyrantGenesis_YouTube-api-key.js"
const channels_path = "hiker://files/rules/js/TyrantGenesis_YouTube频道.js"

let key

if (fetch(key_path)) {
    key = fetch(key_path)
} else {
    key = "AIzaSyDAVB60lCVpHO0nnsWyGtDWC9DTxH8vWlg"
    writeFile(key_path, key)
}

const baseParse = _ => {
    let d = [];
    let channels = []
    let script = ""
    if (fetch(channels_path)) {
        script = fetch(channels_path)
        eval(script)
        channels = local_channels || []
    } else {
        const defaultChannels = [
            {
                title: 'J. Cole',
                channelId: 'UCnc6db-y3IU7CkT_yeVXdVg',
                uploadsId: 'UUnc6db-y3IU7CkT_yeVXdVg',
                icon: 'https://yt3.ggpht.com/ytc/AAUvwniDYxWC2x4VZF7ecutGEaLpssNmrptdeuVFJI999g=s88-c-k-c0x00ffffff-no-rj-mo'
            },
            {
                title: 'Lofi Girl',
                channelId: 'UCSJ4gkVC6NrvII8umztf0Ow',
                uploadsId: 'UUSJ4gkVC6NrvII8umztf0Ow',
                icon: 'https://yt3.ggpht.com/ytc/AAUvwnhGIymQGp3jRMECbTCBSRAUqi8sKbATpWowQG44CA=s88-c-k-c0x00ffffff-no-rj'
            },
            {
                title: 'HatsuneMiku',
                channelId: 'UCJwGWV914kBlV4dKRn7AEFA',
                uploadsId: 'UUJwGWV914kBlV4dKRn7AEFA',
                icon: 'https://yt3.ggpht.com/ytc/AAUvwnjlsiW6yKsmkrfqn2foSm-ONTTWLeK_G70PF6TXBg=s800-c-k-c0x00ffffff-no-rj-mo'
            }
        ]
        script = `const local_channels = ` + JSON.stringify(defaultChannels)
        writeFile(channels_path, script)
        channels = defaultChannels
    }

    const channel_select = getVar("tyrantgenesis.youtube.channel_select", "0")
    const max_results = getVar("tyrantgenesis.youtube.max_results", "50")
    const page_token = getVar("tyrantgenesis.youtube.page_token", "")
    const channel_show = getVar("tyrantgenesis.youtube.channel_show", "1") // 0:关闭,1:展示,2:取消,3:置顶
    const search_select = getVar("tyrantgenesis.youtube.search_select", "video") // channel
    const search_show = getVar("tyrantgenesis.youtube.search_show", "1")

    let button_1_title = '', button_2_title = '', channel_prefix_status = false, channel_prefix = '',
        button_1_status = '', button_2_status = ''
    switch (channel_show) {
        case '0': {
            button_1_title = '关注频道'
            button_2_title = '取消关注'
            channel_prefix_status = false
            channel_prefix = ''
            button_1_status = '1'
            button_2_status = '2'
            break
        }
        case '1': {
            button_1_title = '‘‘’’<strong><font color="red">关注频道</font></strong>'
            button_2_title = '取消关注'
            channel_prefix_status = false
            channel_prefix = '✓'
            button_1_status = '0'
            button_2_status = '2'
            break
        }
        case '2': {
            button_1_title = '关注频道'
            button_2_title = '‘‘’’<strong><font color="red">取消关注</font></strong>'
            channel_prefix_status = true
            channel_prefix = '❌'
            button_1_status = '1'
            button_2_status = '3'
            break
        }
        case '3': {
            button_1_title = '关注频道'
            button_2_title = '‘‘’’<strong><font color="red">置顶关注</font></strong>'
            channel_prefix_status = true
            channel_prefix = '🔝'
            button_1_status = '1'
            button_2_status = '2'
            break
        }
    }

    if (search_show === '1') {
        /* d.push({
            title: search_select === 'video' ? '‘‘’’<strong>搜索：<font color="red">视频</font></strong>' : '搜索：视频',
            url: $('').lazyRule(_ => {
                putVar("tyrantgenesis.youtube.search_select", "video")
                refreshPage(false)
                return "hiker://empty"
            }),
            col_type: 'text_2'
        })
        d.push({
            title: search_select === 'channel' ? '‘‘’’<strong>搜索：<font color="red">频道</font></strong>' : '搜索：频道',
            url: $('').lazyRule(_ => {
                putVar("tyrantgenesis.youtube.search_select", "video")
                refreshPage(false)
                return 'toast://频道搜索未完成'
            }),
            col_type: 'text_2'
        }) */

        d.push({
            url: "input.trim() ? $('hiker://empty').rule(params => {eval(fetch('hiker://files/TyrantG/TEST/youtube.js'));searchParse(params);}, {input: input.trim(), search_select: '" + search_select + "'}) : 'toast://请输入搜索内容'",
            col_type: "input"
        });
    }

    d.push({
        title: button_1_title,
        url: $("").lazyRule(params => {
            putVar("tyrantgenesis.youtube.channel_show", params.button_1_status)
            refreshPage(false)
            return "hiker://empty"
        }, {
            button_1_status: button_1_status
        }),
        col_type: 'scroll_button',
    })
    d.push({
        title: button_2_title,
        url: $("").lazyRule(params => {
            putVar("tyrantgenesis.youtube.channel_show", params.button_2_status)
            refreshPage(false)
            return "hiker://empty"
        }, {
            button_2_status: button_2_status
        }),
        col_type: 'scroll_button',
    })
    d.push({
        title: search_show === '1' ? '隐藏搜索' : '显示搜索',
        url: $("").lazyRule(params => {
            putVar("tyrantgenesis.youtube.search_show", params.search_show === '1' ? '0' : '1')
            refreshPage(false)
            return "hiker://empty"
        }, {
            search_show: search_show
        }),
        col_type: 'scroll_button',
    })
    d.push({
        title: '设置',
        url: $('hiker://empty').rule(_ => {
            eval(fetch('hiker://files/TyrantG/TEST/youtube.js'))
            let d = [];
            d.push({
                title: "使用须知：规则使用的接口来自 Google 开发者平台官方接口，配额限制为每日10000，除搜索外每次操作会消耗1次配额，而搜索会消耗100配额。首先请使用自己申请的密钥，其次尽量少用搜索，多用订阅。另外有美国信用卡或者其他国外支付途径的可以将自己的开发者账号绑定 Google Cloud 以获得更多配额。",
                col_type: "long_text"
            })
            d.push({
                col_type: "line"
            });
            d.push({
                title: "申请 Google YouTube API 教程",
                url: "https://www.tyrantg.com/post/7",
                col_type: "text_1"
            })
            d.push({
                title: "确认",
                desc: "请输入密钥",
                url: "input.trim() ? $('hiker://empty').lazyRule(params => {const key_path = 'hiker://files/rules/js/TyrantGenesis_YouTube-api-key.js';writeFile(key_path, params.input);back(true);}, {input: input.trim()}) : 'toast://请输入搜索内容'",
                col_type: "input"
            });
            setResult(d);
        }),
        col_type: 'scroll_button',
    })

    if (channel_show !== '0') {
        channels.forEach((item, index) => {
            d.push({
                title: (parseInt(channel_select) === index || channel_prefix_status) ? channel_prefix + item.title : item.title,
                pic_url: item.icon,
                url: $("").lazyRule(params => {
                    const channels_path = "hiker://files/rules/js/TyrantGenesis_YouTube频道.js"
                    if (params.channel_show === '1') {
                        putVar("tyrantgenesis.youtube.channel_select", params.index.toString())
                        putVar("tyrantgenesis.youtube.page_token", "")
                    } else if (params.channel_show === '2') {
                        params.channels.splice(params.index, 1)
                        let script = `const local_channels = ` + JSON.stringify(params.channels)
                        writeFile(channels_path, script)
                        putVar("tyrantgenesis.youtube.channel_select", "0")
                        putVar("tyrantgenesis.youtube.page_token", "")
                    } else if (params.channel_show === '3') {
                        let current = params.channels[params.index]
                        params.channels.splice(params.index, 1)
                        params.channels.unshift(current)
                        let script = `const local_channels = ` + JSON.stringify(params.channels)
                        writeFile(channels_path, script)
                        putVar("tyrantgenesis.youtube.channel_select", "0")
                        putVar("tyrantgenesis.youtube.page_token", "")
                    }

                    refreshPage(false)
                    return "hiker://empty"
                }, {
                    index: index,
                    channel_show: channel_show,
                    channels: channels,
                }),
                col_type: 'icon_round_4',
            })
        })
        d.push({
            col_type: "blank_block"
        })
    }

    if (channels.length > 0) {
        const url = "https://www.googleapis.com/youtube/v3/playlistItems?key=" + key + "&part=snippet&maxResults=" + max_results + "&playlistId=" + channels[channel_select].uploadsId + "&pageToken=" + page_token
        const video_item_json = fetch(url)
        const video_item = JSON.parse(video_item_json)
        if (video_item.error) {
            if (search_show === '1') {
                putVar("tyrantgenesis.youtube.search_show", '0')
                refreshPage(false)
                return "hiker://empty"
            }
            if (video_item.error.code === 403) {
                d.push({
                    title: "接口配额已超量，请进入设置 按照教程申请 Google YouTube API 并在设置中输入密钥",
                    col_type: "long_text"
                })
            } else if (video_item.error.code === 400) {
                d.push({
                    title: "api key 无效，请进入设置 按照教程申请 Google YouTube API 并在设置中输入密钥",
                    col_type: "long_text"
                })
            }

        } else {
            const list = video_item.items

            if (video_item.prevPageToken) {
                d.push({
                    title: '上一页',
                    url: $("").lazyRule(video_item => {
                        putVar("tyrantgenesis.youtube.page_token", video_item.prevPageToken)
                        refreshPage(true)
                        return "hiker://empty"
                    }, video_item),
                    col_type: 'text_center_1',
                })
                d.push({
                    col_type: 'blank_block',
                })
            }

            list.forEach(item => {
                let thumbnails = item.snippet.thumbnails
                let pic_url = thumbnails[Object.keys(thumbnails)[Object.keys(thumbnails).length - 1]].url
                let video_id = item.snippet.resourceId.videoId
                let video_url = "https://www.googleapis.com/youtube/v3/videos?key=" + key + "&part=snippet&part=snippet&id=" + video_id
                d.push({
                    title: item.snippet.title,
                    pic_url: pic_url,
                    url: $(video_url).rule(params => {
                        eval(fetch('hiker://files/TyrantG/TEST/youtube.js'))
                        secParse(params)
                    }, {
                        video_id: video_id,
                        channel_id: item.snippet.channelId,
                    }),
                    col_type: 'movie_2',
                })
            })

            if (video_item.nextPageToken) {
                d.push({
                    col_type: 'blank_block',
                })
                d.push({
                    title: '下一页',
                    url: $("").lazyRule(video_item => {
                        putVar("tyrantgenesis.youtube.page_token", video_item.nextPageToken)
                        refreshPage(true)
                        return "hiker://empty"
                    }, video_item),
                    col_type: 'text_center_1',
                })
            }
        }
    } else {
        d.push({
            title: '还没有关注的频道',
            col_type: 'long_text',
        })
    }

    setResult(d);
}

const secParse = params => {
    let d = [];
    // local_channels
    eval(fetch(channels_path))
    const channels = local_channels || []

    // video
    const video_desc_json = getResCode()
    const video_desc = JSON.parse(video_desc_json)
    const snippet = video_desc.items[0].snippet

    let thumbnails = snippet.thumbnails
    let pic_url = thumbnails[Object.keys(thumbnails)[Object.keys(thumbnails).length - 1]].url
    let ori_url = "https://m.youtube.com/watch?v=" + params.video_id

    // 频道
    const channel_url = "https://www.googleapis.com/youtube/v3/channels?key=" + key + "&part=snippet,contentDetails&id=" + params.channel_id
    const channel_desc = JSON.parse(fetch(channel_url)).items[0]
    // const channel_desc = JSON.parse(fetch(channel_url))

    let channel_thumbnails = channel_desc.snippet.thumbnails
    let channel_upload_id = channel_desc.contentDetails.relatedPlaylists.uploads
    let channel_pic_url = channel_thumbnails[Object.keys(channel_thumbnails)[Object.keys(channel_thumbnails).length - 1]].url

    d.push({
        title: channel_desc.snippet.title,
        pic_url: channel_pic_url,
        url: "https://m.youtube.com/channel/" + params.channel_id,
        col_type: "icon_2_round"
    })

    let has_collect = false

    channels.forEach(item => {
        if (item.channelId === params.channel_id) has_collect = true
    })

    d.push({
        title: has_collect ? "已关注" : "关注频道",
        url: $("").lazyRule(params => {
            const channels_path = "hiker://files/rules/js/TyrantGenesis_YouTube频道.js"
            if (params.has_collect) {
                refreshPage(false)
                return 'toast://已关注'
            } else {
                params.channels.push({
                    title: params.channel_desc.snippet.title,
                    channelId: params.channel_id,
                    uploadsId: params.channel_upload_id,
                    icon: params.channel_pic_url,
                })
                script = `const local_channels = ` + JSON.stringify(params.channels)
                writeFile(channels_path, script)
                refreshPage(false)
                return 'toast://关注成功'
            }
        }, {
            has_collect: has_collect,
            channel_upload_id: channel_upload_id,
            channel_id: params.channel_id,
            channel_pic_url: channel_pic_url,
            channels: channels,
            channel_desc: channel_desc,
        }),
        col_type: "text_2"
    })

    d.push({
        title: snippet.title,
        pic_url: pic_url,
        url: ori_url,
        desc: snippet.description,
        col_type: 'pic_1'
    })

    /*const videoParse = fetch("https://www.youtubemy.com/search?url="+ori_url)
    const video_list = parseDomForArray(videoParse, '.video_files&&a')
    video_list.forEach(video => {
        let audio = parseDomForHtml(video, 'img&&src').indexOf("yy.png") !== -1
        d.push({
            title: parseDomForHtml(video, 'a&&Text').replace(/\(.*?\)/, '') + (audio ? '（有声）' : '（无声）'),
            url: parseDomForHtml(video, 'a&&href'),
            col_type: 'text_2'
        })
    })*/

    const videoParse = fetch("https://www.y2mate.com/mates/analyze/ajax", {
        headers: {
            "User-Agent": PC_UA,
        },
        body: 'ajax=1&q_auto=1&url=' + ori_url,
        method: 'POST'
    })

    const html = JSON.parse(videoParse).result

    const id_res = html.match(/var k__id = "(.*?)"/)
    const _id = id_res ? id_res[1] : ''

    const video_list = parseDomForArray(html, 'tbody&&tr')

    video_list.forEach(video => {
        let quality = parseDomForHtml(video, 'a&&data-fquality')
        d.push({
            title: quality,
            url: $("").lazyRule(params => {
                const videoParse = fetch("https://www.y2mate.com/mates/convert", {
                    headers: {
                        "User-Agent": PC_UA,
                    },
                    body: 'type=youtube&ftype=mp4&ajax=1&v_id=' + params.v_id + '&fquality=' + params.fquality + '&_id=' + params._id,
                    method: 'POST'
                })

                const html = JSON.parse(videoParse).result

                const url_res = html.match(/<a href="(.*?)"/)

                return url_res ? url_res[1] + "#isVideo=true#" : "toast://该清晰度解析失败，请使用更低清晰度"
            }, {
                v_id: params.video_id,
                fquality: quality,
                _id: _id,
            }),
            col_type: 'text_2'
        })
    })

    // d.pop()

    /*let res_json = fetch('https://s6.save.tube/ajax/getLinks.php?video='+encodeURIComponent(ori_url)+'&rand=xCAasG22rQg2XeV', {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
            'Origin': 'https://save.tube',
            'Referer': 'https://save.tube',
        }
    })
    log(res_json)
    let res = JSON.parse(res_json)

    if (res.status === 'success') {
        let data = res.data.av

        data.forEach(item => {
            d.push({
                title: item.quality+'.'+item.ext,
                url: item.url+'#isVideo=true#',
                col_type: 'text_2'
            })
        })
    } else {
        log(res)
        res_json = fetch(res.data)
        log(res_json)
        res = JSON.parse(res_json)
        if (res.status === 'success') {
            let data = res.data.av

            data.forEach(item => {
                d.push({
                    title: item.quality+'.'+item.ext,
                    url: item.url+'#isVideo=true#',
                    col_type: 'text_2'
                })
            })
        } else {
            d.push({
                title: '解析失败',
                url: 'hiker://empty',
                col_type: 'text_center_1',
            })
        }
    }*/

    setResult(d);
}

const searchParse = params => {
    let d = []
    const search = params.input
    const type = params.search_select
    const max_results = getVar("tyrantgenesis.youtube.max_results", "50")
    const search_page_token = getVar("tyrantgenesis.youtube.search_page_token", "")
    const url = "https://www.googleapis.com/youtube/v3/search?key=" + key + "&part=snippet,id&maxResults=" + max_results + "&type=" + type + "&q=" + search + "&pageToken=" + search_page_token

    const search_json = fetch(url)
    const search_item = JSON.parse(search_json)
    const list = search_item.items

    if (search_item.prevPageToken) {
        d.push({
            title: '上一页',
            url: $("").lazyRule(search_item => {
                putVar("tyrantgenesis.youtube.search_page_token", search_item.prevPageToken)
                refreshPage(true)
                return "hiker://empty"
            }, search_item),
            col_type: 'text_center_1',
        })
        d.push({
            col_type: 'blank_block',
        })
    }

    if (type === 'video') {
        list.forEach(item => {
            let thumbnails = item.snippet.thumbnails
            let pic_url = thumbnails[Object.keys(thumbnails)[Object.keys(thumbnails).length - 1]].url
            let video_id = item.id.videoId
            let video_url = "https://www.googleapis.com/youtube/v3/videos?key=" + key + "&part=snippet&part=snippet&id=" + video_id
            d.push({
                title: item.snippet.title,
                pic_url: pic_url,
                url: $(video_url).rule(params => {
                    eval(fetch('hiker://files/TyrantG/TEST/youtube.js'))
                    secParse(params)
                }, {
                    video_id: video_id,
                    channel_id: item.snippet.channelId,
                }),
                col_type: 'movie_2',
            })
        })
    }

    if (search_item.nextPageToken) {
        d.push({
            col_type: 'blank_block',
        })
        d.push({
            title: '下一页',
            url: $("").lazyRule(search_item => {
                putVar("tyrantgenesis.youtube.search_page_token", search_item.nextPageToken)
                refreshPage(true)
                return "hiker://empty"
            }, search_item),
            col_type: 'text_center_1',
        })
    }

    setResult(d);
}
