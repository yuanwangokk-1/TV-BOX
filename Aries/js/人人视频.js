/*
@header({
  searchable: 1,
  filterable: 1,
  quickSearch: 0,
  title: '人人视频',
  lang: 'ds'
})
*/

// http://localhost:5757/api/人人视频?ac=list&t=1&pg=1
// http://localhost:5757/api/人人视频?ac=detail&ids=447
// http://localhost:5757/api/人人视频?wd=&pg=1
// http://localhost:5757/api/人人视频?play=&flag=人人视频
const {getPublicIp} = $.require('_lib.request.js');
var rule = {
    类型: '影视',
    host: 'https://jiekou-1314054699.cos.ap-chongqing.myqcloud.com/jiekou.txt',
    title: '人人视频',
    desc: '人人视频纯js版本',
    homeUrl: '',
    class_name: '电视剧&电影&动漫',
    class_url: '2&1&3',
    url: '/api.php/getappapi.index/typeFilterVodList?fyfilter',
    filter_url: 'area=全部&year={{fl.year or "全部"}}&type_id=fyclass&page=fypage&sort={{fl.sort or "最新"}}&lang=全部&class=全部',
    detailUrl: '/api.php/getappapi.index/vodDetail?vod_id=fyid',
    searchUrl: '/api.php/getappapi.index/searchList?keywords=**&type_id=0&page=fypage',
    searchable: 1,
    filterable: 1,
    quickSearch: 0,
    headers: {
        'User-Agent': 'okhttp/3.14.9',
    },
    timeout: 5000,
    play_parse: true,
    hostJs: async function () {
        let {HOST} = this;
        HOST = await request(HOST, {headers: {'User-Agent': 'MOBILE_UA'}});
        return HOST;
    },
    class_parse: async function () {
        let filters = {};
        let years = '2025&2024&2023&2022&2021&2020&2019&2018&2017&2016&2015&2014&2013&2012&2011&2010&2009&2008&2007&2006&2005&2004&2003&2002&2001&2000'.split('&');
        let yearArea = years.map((it) => {
            return {n: it, v: it}
        });
        let sorts = '最新&最热&最赞'.split('&');
        let sortArea = sorts.map((it) => {
            return {n: it, v: it}
        });
        for (let tid of rule.class_url.split('&')) {
            filters[tid] = [
                {key: 'year', name: '年份', value: yearArea},
                {key: 'sort', name: '排序', value: sortArea},
            ]
        }
        return {filters}
    },
    预处理: async function (env) {
        rule.headers['Host'] = rule.host.split('//')[1];
    },
    推荐: async function () {
        return []
    },
    一级: async function (tid, pg, filter, extend) {
        let {input} = this;
        log(input);
        let d = [];
        let html = await post(input.split('?')[0], {
            body: input.split('?')[1],
        });
        // log(html);
        let html1 = Decrypt(JSON.parse(html).data);
        let list = JSON.parse(html1).recommend_list;
        list.forEach(item => {
            d.push({
                title: item.vod_name,
                desc: item.vod_remarks,
                pic_url: item.vod_pic,
                url: item.vod_id,
            })
        });
        return setResult(d);
    },
    二级: async function (ids) {
        let {input} = this;
        let html = await post(input.split('?')[0], {
            body: input.split('?')[1],
        });
        let html1 = Decrypt(JSON.parse(html).data);
        let list = JSON.parse(html1);
        const vod = {
            vod_id: list.vod.vod_id,
            vod_name: list.vod.vod_name,
            vod_pic: list.vod.vod_pic,
            vod_remarks: list.vod.vod_remarks,
            vod_content: list.vod.vod_content
        };
        const playlist = list.vod_play_list;
        let playmap = {};
        for (const i in playlist) {
            let form = playlist[i].player_info.show;
            let parse = playlist[i].player_info.parse;
            let user_agent = playlist[i].player_info.user_agent;
            const list = playlist[i].urls;
            if (!playmap.hasOwnProperty(form)) {
                playmap[form] = [];
            }
            for (const i in list) {
                playmap[form].push(list[i].name.trim() + '$' + encodeURIComponent(list[i].url + '#' + parse + '#' + user_agent));
            }
        }
        vod.vod_play_from = Object.keys(playmap).join('$$$');
        const urls = Object.values(playmap);
        const playUrls = urls.map((urllist) => {
            return urllist.join("#")
        });
        vod.vod_play_url = playUrls.join('$$$');
        return vod
    },
    搜索: async function (wd, quick, pg) {
        let {input} = this;
        let d = [];
        let html = await post(input.split('?')[0], {
            body: input.split('?')[1]
        });
        try {
            let html1 = Decrypt(JSON.parse(html).data);
            let list = JSON.parse(html1).search_list;
            list.forEach(it => {
                d.push({
                    title: it.vod_name,
                    url: it.vod_id,
                    desc: it.vod_remarks,
                    content: it.vod_blurb,
                    pic_url: it.vod_pic,
                });
            });
        } catch (e) {
            log(e.message);
        }
        return setResult(d);
    },
    lazy: async function (flag, id, flags) {
        let {getProxyUrl, input} = this;
        let params = decodeURIComponent(input).split('#');
        log(params);
        input = params[0];
        let parse = params[1];
        let ua = params[2];
        if (/mp4/.test(input)) {
            return input
        }
        if (/m3u8/.test(input)) {
            return {parse: 0, url: getProxyUrl() + '&url=' + input}
        }
        if (parse.includes('http')) {
            let html = await post(parse + input, {
                headers: {
                    'User-Agent': ua
                },
            });
            try {
                let url = JSON.parse(html).url + '#isVideo=true#'
                if (url.includes('&vkey=')) {
                    return {parse: 0, url: getProxyUrl() + '&url=' + url}
                }
                return {parse: 0, url: url}
            } catch (e) {
                log(e.message)
            }
        }

        let html = await post(rule.host + '/api.php/getappapi.index/vodParse', {
            headers: {
                'User-Agent': ua
            },
            body: 'parse_api=' + parse + '&url=' + Encrypt(input) + '&token=',
        });
        try {
            let json = JSON.parse(html);
            if (json.code === 1) {
                let url = JSON.parse(JSON.parse(Decrypt(json.data)).json).url + '#isVideo=true#';
                if (url.includes('.m3u8')) {
                    return {parse: 0, url: getProxyUrl() + '&url=' + url}
                }
                return {parse: 0, url: url}
            }
        } catch (e) {
            log(e.message);
        }
    },
    proxy_rule: async function () {
        let {input} = this;
        if (input) {
            let html1 = await request(input);
            let m3u8 = html1.includes('http') ? html1.replace(/#EXT-X-DISCONTINUITY[\s\S]*?#EXT-X-DISCONTINUITY/, '#EXT-X-DISCONTINUITY') : html1.replace(/#EXT-X-DISCONTINUITY[\s\S]*?#EXT-X-DISCONTINUITY/, '#EXT-X-DISCONTINUITY').replace(/^(\w.*?)$/gm, input.match(/http.*\//)[0] + '$1');
            return [200, 'application/vnd.apple.mpegurl', m3u8]
        }
    }
};


function Decrypt(word) {
    const key = CryptoJS.enc.Utf8.parse("F51F5D52D23CBF27");
    const iv = CryptoJS.enc.Utf8.parse("F51F5D52D23CBF27");
    let decrypt = CryptoJS.AES.decrypt(word, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

function Encrypt(word) {
    const key = CryptoJS.enc.Utf8.parse("F51F5D52D23CBF27");
    const iv = CryptoJS.enc.Utf8.parse("F51F5D52D23CBF27");
    let encrypt = CryptoJS.AES.encrypt(word, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    let encryptedStr = encrypt.toString(CryptoJS.enc.base64);
    return encryptedStr.toString();
}
