const douyu = {
    empty: 'hiker://empty',
    douyuFirstCate: getItem('TyrantGenesis.streamLab.FirstCate', ''),
    douyuSecondCate: getItem('TyrantGenesis.streamLab.SecondCate', ''),
    baseParseLoad: (d, page) => {
        let douyuSecondCate = getItem('TyrantGenesis.streamLab.SecondCate', '')
        const roomListJson = request(`https://m.douyu.com/api/room/list?page=${page}&type=${douyuSecondCate}`)
        const roomListList = JSON.parse(roomListJson).data.list
        roomListList.forEach(item => {
            d.push({
                title: item.roomName,
                desc: item.nickname,
                pic_url: item.roomSrc,
                url: $("https://www.douyu.com/" + item.rid).lazyRule((nickname) => {
                    return $.require('hiker://page/douyu').secParse(input, nickname)
                }, item.nickname),
                col_type: 'movie_2'
            })
        })

        return d
    },
    categoryLoad: (d) => {
        const html = fetch('https://www.douyu.com/directory', {headers: {'User-Agent': PC_UA}})
        const script = html.match(/var \$DATA =.*};/)
        eval(script[0])
        const firstCategory = $DATA.firstCategory
        const baseRecommendCategory = $DATA.baseRecommendCategory
        firstCategory.unshift({
            cate1Name: '推荐分类',
            secondCategory: [],
            isHideZero: 0,
            shortName: '',
            cate1Id: 0,
        })

        firstCategory.forEach(Category => {
            d.push({
                title: douyu.douyuFirstCate === Category.shortName ? '‘‘’’<b><span style="color: #FF0000">' + Category.cate1Name + '</span></b>' : Category.cate1Name,
                url: $(douyu.empty).lazyRule((shortName) => {
                    setItem('TyrantGenesis.streamLab.FirstCate', shortName)
                    clearItem('TyrantGenesis.streamLab.SecondCate')
                    refreshPage(true)
                    return 'hiker://empty'
                }, Category.shortName),
                col_type: 'scroll_button',
            })
        })
        d.push({
            col_type: 'blank_block',
        })
        let douyuSecondCate = getItem('TyrantGenesis.streamLab.SecondCate', '')
        if (douyu.douyuFirstCate === '') {
            if (douyuSecondCate === '') {
                setItem('TyrantGenesis.streamLab.SecondCate', baseRecommendCategory[0].cate2Url.slice(2))
                douyuSecondCate = baseRecommendCategory[0].cate2Url.slice(2)
            }
            baseRecommendCategory.forEach((item, index) => {
                let cate2Url = item.cate2Url.slice(2)
                d.push({
                    title: (douyuSecondCate === cate2Url) ? '‘‘’’<b><span style="color: #FF0000">' + item.cate2Name + '</span></b>' : item.cate2Name,
                    url: $(douyu.empty).lazyRule((cate2Url) => {
                        setItem('TyrantGenesis.streamLab.SecondCate', cate2Url)
                        refreshPage(true)
                        return 'hiker://empty'
                    }, cate2Url),
                    col_type: 'scroll_button',
                })
            })
        } else {
            const douyuSecondCateListJson = fetch(`https://www.douyu.com/japi/weblist/api/getC2List?shortName=${douyu.douyuFirstCate}&offset=0&limit=200`, {headers: {'User-Agent': PC_UA}})
            const douyuSecondCateList = JSON.parse(douyuSecondCateListJson).data.list

            if (douyuSecondCate === '') {
                setItem('TyrantGenesis.streamLab.SecondCate', douyuSecondCateList[0].shortName)
                douyuSecondCate = douyuSecondCateList[0].shortName
            }
            douyuSecondCateList.forEach((item, index) => {
                let cate2Url = item.shortName
                d.push({
                    title: (douyuSecondCate === cate2Url) ? '‘‘’’<b><span style="color: #FF0000">' + item.cname2 + '</span></b>' : item.cname2,
                    url: $(douyu.empty).lazyRule((cate2Url) => {
                        setItem('TyrantGenesis.streamLab.SecondCate', cate2Url)
                        refreshPage(true)
                        return 'hiker://empty'
                    }, cate2Url),
                    col_type: 'scroll_button',
                })
            })
        }
        d.push({
            col_type: 'blank_block',
        })

        return d
    },
    secParse: (input, nickname) => {
        const html = fetch(input, {headers: {'User-Agent': PC_UA}})

        const rid = html.match(/rid":(.*?),"vipId/)[1]
        const tt = Date.parse(new Date()).toString().substr(0, 10)
        const did = "10000000000000000000000000001501"

        let param_body = douyu.getSign(html, rid, did, tt)

        const stream_json = fetch('https://m.douyu.com/api/room/ratestream', {
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            body: param_body,
            method: 'POST'
        })
        const stream = JSON.parse(stream_json).data

        // log(stream.url)
        return stream.url
    },
    getSign: (script, rid, did, tt) => {
        let result = script.match(/(function ub98484234.*)\s(var.*)/)[0]
        let func_ub9 = result.replace(/eval.*;}/, 'strc;}', result)
        eval(func_ub9)

        let res = ub98484234()
        let v = res.match(/v=(\d+)/)[0].replace("v=", '')
        let rb = md5(rid + did + tt + v)

        let func_sign = res.replace(/return rt;}\);?/, 'return rt;}')
        func_sign = func_sign.replace('(function (', 'function sign(')
        func_sign = func_sign.replace('CryptoJS.MD5(cb).toString()', '"' + rb + '"')
        eval(func_sign)

        return sign(rid, did, tt) + "&ver=219032101&rate=-1&rid=" + rid
    }
}

$.exports = douyu
