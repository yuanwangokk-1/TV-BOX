const getQueryVariable = (host, variable) => {
    let vars = host.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] === variable) return pair[1]
    }
    return false
}

const baseParse = _ => {
    let d = [];
    // const list_json = parseDomForHtml(getResCode(), "#ssrData&&Text")
    const list_json = getResCode().match(/window\.HNF_GLOBAL_INIT = (.*?) <\/script>/)[1]
    const json = JSON.parse(list_json)
    const list = json.recommendList

    d.push({
        desc: '48',
        url: 'file:///storage/emulated/0/Android/data/com.example.hikerview/files/Documents/TyrantG/public/huya-tabs.html',
        col_type: "x5_webview_single"
    })

    list.forEach((cate, index) => {
        let group = cate.sName, current_cate, cate_id

        try {

            let videoDom = cate.vItems.value
            cate_id = videoDom[0].iGameId
            current_cate = "g/" + cate_id
            let group_url = "https://m.huya.com/" + current_cate + '?p=fypage&id=' + cate_id

            d.push({
                title: group,
                pic_url: cate.sIcon,
                url: $(group_url).rule(params => {
                    eval(fetch('hiker://files/TyrantG/LIVE/huya.js'))
                    categoryParse(params.index)
                }, {index: index}),
                col_type: 'avatar'
            })
            videoDom.forEach(item => {
                d.push({
                    title: item.sTitle,
                    desc: item.sNickName,
                    pic_url: item.sCoverUrl,
                    url: $("https://m.huya.com" + item.sAction).lazyRule(_ => {
                        eval(fetch('hiker://files/TyrantG/LIVE/huya.js'))
                        return secParse()
                    }),
                    col_type: 'movie_2'
                })
            })
            d.push({
                col_type: 'line_blank'
            })
        } catch (e) {
        }
    })

    setResult(d);
}

const secParse = params => {
    let rid = input.split('/').pop()
    let html = fetch(input, {headers: {"User-Agent": MOBILE_UA}})

    const userinfoJson = fetch('https://udblgn.huya.com/web/anonymousLogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: {
            "appId": 5002,
            "byPass": 3,
            "context": "",
            "version": "2.4",
            "data": {},
        }
    })

    const uid = JSON.parse(userinfoJson).data.uid

    // let live_json = (html.match(/window\.HNF_GLOBAL_INIT = ((.|\n)*?)<\/script>/)[1]).replace(/function\(\)(.|\n)*?}/g, 'null')
    let live_json = html.match(/window\.HNF_GLOBAL_INIT = ((.|\n)*?)<\/script>/)[1]
    eval(`let live = ${live_json}`)
    // let live = JSON.parse(live_json)

    let streamInfo = live.roomInfo.tLiveInfo.tLiveStreamInfo.vStreamInfo.value
    // let gameName = live.roomInfo.tLiveInfo.sGameFullName
    // let iGameId = live.roomInfo.tLiveInfo.iGameId
    // let defaultLiveStreamUrl = live.roomInfo.tLiveInfo.tLiveStreamInfo.sDefaultLiveStreamUrl

    let live_url = []
    // return JSON.stringify({
    //     urls: [getRealUrl(base64Decode(live.roomProfile.liveLineUrl)).replace('//', 'http://')],
    //     // urls: [base64Decode(live.roomProfile.liveLineUrl).replace('//', 'http://')],
    //     // danmu: 'web://http://huya_danmu.dev.tyrantg.com/?rid='+rid+'&ver=1'
    // })

    // if (parseInt(iGameId) === 2135) {
    //     return fetch("https://hiker.dev.tyrantg.com/huya/live_parser.php?id="+rid)
    // } else {
    streamInfo.forEach(info => {

        let rand = generateRandomNumber()
        let sStreamName = info.sStreamName
        let sFlvUrl = info.sFlvUrl
        let sFlvUrlSuffix = info.sFlvUrlSuffix
        let sFlvAntiCode = info.sFlvAntiCode
        let sHlsUrl = info.sHlsUrl
        let sHlsUrlSuffix = info.sHlsUrlSuffix
        let sHlsAntiCode = info.sHlsAntiCode

        // if (info.sCdnType === 'TX') {

        let flv_anti_code = process_anticode(sFlvAntiCode, sStreamName, uid, rand)
        // let hls_anti_code = process_anticode(sHlsAntiCode, sStreamName, uid, rand)

        // let hls_url = sHlsUrl + '/' + sStreamName + '.' + sHlsUrlSuffix + '?' + hls_anti_code
        // live_url = info.sFlvUrl + '/' + info.sStreamName + '.' + info.sFlvUrlSuffix + '?' + info.sFlvAntiCode
        live_url.push(sFlvUrl.replace('http', 'https') + '/' + sStreamName + '.' + sFlvUrlSuffix + '?' + flv_anti_code)
        // }

        // live_url.push(flv_url)
        // live_url.push(hls_url)
    })
    // }

    return live_url[0]
}

const categoryParse = index => {
    let d = [];
    let id = getQueryVariable(MY_URL, 'id')
    let page = getQueryVariable(MY_URL, 'page')
    const url = index === 0 ? "https://m.huya.com/cache.php?m=Live&do=ajaxGetProfileLive&page=" + page + "&pageSize=120" : "https://m.huya.com/cache.php?m=Game&do=ajaxGetGameLive&gameId=" + id + "&page=" + page + "&pageSize=120"
    const html = fetch(url, {headers: {"User-Agent": MOBILE_UA}});
    const list = JSON.parse(html).gameList ? JSON.parse(html).gameList : JSON.parse(html).profileList

    list.forEach(item => {
        d.push({
            title: item.introduction,
            desc: item.nick,
            pic_url: item.screenshot,
            url: $("https://m.huya.com/" + item.profileRoom).lazyRule(_ => {
                eval(fetch('hiker://files/TyrantG/LIVE/huya.js'))
                return secParse()
            }),
            col_type: 'movie_2'
        })
    })

    setResult(d);
}

const searchParse = () => {
    let res = {};
    let d = [];
    const html = getResCode();
    const list = JSON.parse(html).response[3].docs

    list.forEach(item => {
        d.push({
            title: item.game_roomName,
            desc: item.game_nick,
            pic_url: item.game_screenshot,
            url: $("https://m.huya.com/" + item.room_id).lazyRule(_ => {
                eval(fetch('hiker://files/TyrantG/LIVE/huya.js'))
                return secParse()
            }),
            col_type: 'movie_2'
        })
    })

    res.data = d;
    setHomeResult(res);
}

const cateGroupParse = _ => {
    let d = [], cate
    /*const list_json = parseDomForHtml(getResCode(), "#ssrData&&Text")
    const json = JSON.parse(list_json)*/

    const tabCurrent = parseInt(getVar('tab-current') || 0)
    switch (tabCurrent) {
        case 0:
            cate = JSON.parse(fetch("https://live.cdn.huya.com/liveconfig/game/bussLive?bussType=1")).data;
            break;
        case 1:
            cate = JSON.parse(fetch("https://live.cdn.huya.com/liveconfig/game/bussLive?bussType=2")).data;
            break;
        case 2:
            cate = JSON.parse(fetch("https://live.cdn.huya.com/liveconfig/game/bussLive?bussType=8")).data;
            break;
        case 3:
            cate = JSON.parse(fetch("https://live.cdn.huya.com/liveconfig/game/bussLive?bussType=3")).data;
            break;
        default:
            cate = /*json.gameList*/[]
    }

    d.push({
        desc: '45',
        url: 'file:///storage/emulated/0/Android/data/com.example.hikerview/files/Documents/TyrantG/public/huya-category.html',
        col_type: "x5_webview_single"
    })

    cate.forEach(cate2 => {
        d.push({
            title: cate2.gameFullName,
            pic_url: "https://huyaimg.msstatic.com/cdnimage/game/" + cate2.gid + "-MS.jpg",
            url: $("https://m.huya.com/g/" + cate2.gid + '?p=fypage&id=' + cate2.gid).rule(_ => {
                eval(fetch('hiker://files/TyrantG/LIVE/huya.js'))
                categoryParse()
            }),
            col_type: "icon_round_4"
        });
    });
    setResult(d);
}

const getRealUrl = (live_url) => {
    let [i, b] = live_url.split('?')
    let r = i.split('/').pop()
    let s = r.replace(/\.(flv|m3u8)/, '')
    let c_tmp = b.split('&').filter(n => n)
    // let c = []
    let n = {}
    let c_tmp2 = []
    c_tmp.forEach((tmp, index) => {
        if (index < 3) {
            // c.push(tmp)
            n[tmp.split('=')[0]] = tmp.split('=')[1]
        } else {
            c_tmp2.push(tmp)
        }
    })
    let tmp2 = c_tmp2.join('&')
    n[tmp2.split('=')[0]] = tmp2.split('=')[1]

    let fm = decodeURIComponent(n.fm).split('&')[0]
    let u = base64Decode(fm)
    let p = u.split('_')[0]
    let f = new Date().getTime() + '0000'
    let ll = n.wsTime
    let t = '0'
    let h = [p, t, s, f, ll].join('_')
    let m = md5(h)
    return (i + "?wsSecret=" + m + "&wsTime=" + ll + "&u=" + t + "&seqid=" + f + "&" + c_tmp2.pop()).replace('hls', 'flv').replace('m3u8', 'flv')
}

const process_anticode = (anticode, stream_name, uid, rand) => {
    const now = new Date().getTime();
    let antiMap = getAntiMap(anticode)

    let seqid = Number(uid) + Number(now) * 1000
    let ctype = antiMap.ctype
    let t = antiMap.t
    let wsTime = antiMap.wsTime

    antiMap['ver'] = '1';
    antiMap['sv'] = '2110211124';
    antiMap['seqid'] = seqid;
    antiMap['uid'] = uid;
    antiMap['uuid'] = get_uuid(now, rand);

    let result = md5(seqid + '|' + ctype + '|' + t)
    let fm = base64Decode(decodeURIComponent(antiMap.fm))

    fm = fm.replace('$0', uid).replace('$1', stream_name).replace('$2', result).replace('$3', wsTime)

    antiMap['wsSecret'] = md5(fm)

    let search = ''

    for (let key in antiMap) {
        if (key !== 'fm') search += '&' + key + '=' + antiMap[key]
    }

    return search.substring(1)
}

const getAntiMap = (anticode) => {
    var keyValue = anticode.split("&"); // 将所有的参数放到一个数组里
    let obj = {}; // 定义一个对象 用来存放所有参数
    keyValue.map((e) => {
        let key = e.split("=")[0];
        obj[key] = e.split("=")[1];
    });
    return obj;
}

const get_uuid = (now, rand) => {
    return ((now % 10000000000 * 1000) + rand) % 4294967295
}

function generateRandomNumber() {
    // 生成0到1之间的随机小数
    var randomNumber = Math.random();

    // 将随机小数乘以10000，得到0到10000之间的随机整数
    var randomInteger = Math.floor(randomNumber * 10000);

    // 将随机整数转化为字符串
    var randomString = randomInteger.toString();

    // 如果字符串的长度小于4，就在字符串前面添加0，直到长度等于4
    for (let i = 0; i < 4; i++) {
        randomString = "0" + randomString;
    }

    // 返回四位随机数
    return randomString;
}
