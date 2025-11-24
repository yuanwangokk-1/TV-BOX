/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: '瓜子H5',
  lang: 'ds'
})
*/

// http://localhost:5757/api/瓜子H5?ac=list&t=1&pg=1
// http://localhost:5757/api/瓜子H5?ac=detail&ids=447
// http://localhost:5757/api/瓜子H5?wd=&pg=1
// http://localhost:5757/api/瓜子H5?play=&flag=瓜子H5
var rule = {
    类型: '影视',
    title: '瓜子H5',
    desc: '瓜子H5纯js版本',
    homeUrl:'https://api.zaqohu.com/H5',
    url: '/api.php/getappapi.index/typeFilterVodList',
    searchUrl: '/api.php/getappapi.index/searchList',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter_url: '{{fl.class}}',
    filter: '',
    filter_def: {
        '3': {class: ''},
        '4': {class: ''},
        '5': {class: ''},
        '6': {class: ''},
    },
    headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
        'Content-Type': 'application/json',
    },
    timeout: 5000,
    play_parse: true,
    class_parse: async () => {
        let classes = [{
            type_id: '3',
            type_name: '电影',
        }, {
            type_id: '4',
            type_name: '电视剧',
        }, {
            type_id: '5',
            type_name: '动漫'
        }, {
            type_id: '6',
            type_name: '综艺'
        }];
        let filters = {}
        for (const it of classes) {
            const params = encrypt(JSON.stringify({'pid':parseInt(it.type_id)}))
            let data = JSON.stringify({
                "params": params
            });
            let config = {
                method: 'POST',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
                    'Content-Type': 'application/json',
                },
                data: data
            };
            const html = JSON.parse((await req('https://api.zaqohu.com/H5/Index/CategoryList',config)).content)
            const list = JSON.parse(decrypt(html.data)).list
            let values = []
            list.forEach((val)=>{
                values.push({
                    'n':val.type.trim(),
                    'v':val.show_id===undefined?'':val.show_id
                })
            })
            filters[it.type_id] = [{
                "key":"class",
                "name":"class",
                "value":values
            }]
        }
        return {
            class: classes, filters,
        }
    },
    预处理: async () => {
        return []
    },
    推荐: async () => {
        return []
    },
    一级: async function (tid, pg, filter, extend) {
        let {MY_CATE, input} = this;
        if (pg <= 0) pg = 1;
        let html = ''
        let list = ''
        let videos = []
        if(extend.class===''||extend.class===undefined){
            const params = encrypt(JSON.stringify({"pid": Number(tid), "pageSize": 24, "page": pg}))
            const data =JSON.stringify({
                "params": params
            });
            html = JSON.parse((await req(`${rule.homeUrl}/Category/GetChoiceList`, {
                method:'post',
                headers: rule.headers,
                data:data
            })).content);
            list = JSON.parse(decrypt(html.data)).list
            list.forEach((it)=>{
                videos.push({
                    vod_id: it.vod_id,
                    vod_name:it.c_name,
                    vod_pic:it.c_pic
                })
            })
        }else {
            const params = encrypt(JSON.stringify({ show_id: extend.class, show_pid: Number(tid), pageSize: 24, page: pg }))
            const data =JSON.stringify({
                "params": params
            })
            html = JSON.parse((await req(`${rule.homeUrl}/Category/GetModuleList`, {
                method:'post',
                headers: rule.headers,
                data:data,
            })).content);
            list = JSON.parse(decrypt(html.data)).list
            list.forEach((it)=>{
                videos.push({
                    vod_id: it.vod_id,
                    vod_name:it.vod_name,
                    vod_pic:it.vod_pic
                })
            })
        }
        return videos
    },
    二级: async function (ids) {
        let {input} = this;
        log(input)
        const vod_id = {"vod_id":ids[0],"pageSize":"10000","page":"1"}
        const params = encrypt(JSON.stringify(vod_id))
        const data = JSON.stringify({
            "params":params
        })
        const html = JSON.parse((await req(`${rule.homeUrl}/Resource/GetOnePlayList`, {
            headers:rule.headers,
            method:'post',
            body:data
        })).content);;
        const list = JSON.parse(decrypt(html.data)).urls
        const urls = []
        list.forEach((it)=>{
            urls.push(it.name+"$"+it.url)
        })
        let vod = {
            vod_id: ids[0],
        }
        let playFroms = [];
        let playUrls = []
        playFroms.push('由不知道倾情打造');
        vod.vod_play_from = playFroms.join('$$$');
        playUrls.push(urls.join('#'));
        vod.vod_play_url = playUrls.join('$$$');
        return vod
    },
    搜索: async function (wd, quick, pg) {
        
    },
    lazy: async function (flag, id, flags) {
        let {getProxyUrl,input} = this;
        return {parse:0,url:id}
    },
    proxy_rule:async function(params){
        let {input} = this;
    }
};

const key = CryptoJS.enc.Utf8.parse("181cc88340ae5b2b")
const iv = CryptoJS.enc.Utf8.parse("4423d1e2773476ce")


function encrypt(data) {
    return CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).ciphertext.toString(CryptoJS.enc.Hex)
}

function decrypt(data) {
    const text = CryptoJS.enc.Hex.parse(data)
    return CryptoJS.AES.decrypt({
        ciphertext: text
    }, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8)
}