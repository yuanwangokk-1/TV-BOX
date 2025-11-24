/*
@header({
  searchable: 1,
  filterable: 0,
  quickSearch: 1,
  title: '金牌影院',
  lang: 'ds'
})
*/

// http://localhost:5757/api/金牌影院?ac=list&t=1&pg=1
// http://localhost:5757/api/金牌影院?ac=detail&ids=/detail/131374
// http://localhost:5757/api/金牌影院?wd=我的&pg=1
// http://localhost:5757/api/金牌影院?play=/vod/play/131374/sid/1125278&flag=金牌影院
const {req_} = $.require('./_lib.request.js')
var rule = {
    类型: '影视',
    title: '金牌影院',
    desc: '金牌影院纯js版本',
    host: 'https://m.cfkj86.com',
    homeUrl:'',
    url: 'https://m.cfkj86.com/api/mw-movie/anonymous/video/list?pageNum=fypage&pageSize=30&sort=1&sortBy=1&type1=fyclass',
    searchUrl: '/api/mw-movie/anonymous/video/searchByWordPageable?keyword=**&pageNum=fypage&pageSize=12&type=false',
    searchable: 1,
    quickSearch: 1,
    timeout: 5000,
    play_parse: true,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'zh-CN,zh;q=0.9'
    },
    class_parse: async () => {
         let classes = [{
                type_id: '1',
                type_name: '电影',
            },{
                type_id: '2',
                type_name: '剧集',
            },{
                type_id: '3',
                type_name: '综艺',
            },{
                type_id: '4',
                type_name: '动漫',
            }];
        return {
            class: classes,
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
        const t = new Date().getTime()
        const signkey = `pageNum=${pg}&pageSize=30&sort=1&sortBy=1&type1=${tid}&key=cb808529bae6b6be45ecfab29a4889bc&t=`+t
        const key = CryptoJS.SHA1(CryptoJS.MD5(signkey).toString()).toString()
        const html = JSON.parse((await req(`https://m.cfkj86.com/api/mw-movie/anonymous/video/list?pageNum=${pg}&pageSize=30&sort=1&sortBy=1&type1=${tid}`,
            {
            headers:{
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'deviceId': '58a80c52-138c-48fd-8edb-138fd74d12c8',
                'sign': key,
                't': t
            }
        })).content);
        let d = [];
        const list = html.data.list
        list.forEach((it)=>{
            d.push({
                title: it.vodName,
                url: '/detail/'+it.vodId,
                desc: it.vodRemarks || it.vodVersion,
                pic_url: it.vodPic,
            })
        })
        return setResult(d)
    },
    二级: async function (ids) {
        let {input} = this;
        let id = ids[0]
        let id_ = id.split('/')[2]
        const t = new Date().getTime()
        const signkey = `id=${id_}&key=cb808529bae6b6be45ecfab29a4889bc&t=`+t
        const key = CryptoJS.SHA1(CryptoJS.MD5(signkey).toString()).toString()
        const html = await req_(`https://www.cfkj86.com/api/mw-movie/anonymous/video/detail?id=${id_}`,'get',{
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
            'Accept': 'application/json, text/plain, */*',
            'authorization':'',
            'deviceId': '58a80c52-138c-48fd-8edb-138fd74d12c8',
            'sign': key,
            't': t.toString()
        });
        const vod = {
            vod_id: id,
            vod_name: html.data.vodName,
        };
        let playFroms = [];
        let playUrls = [];
        const temp = [];
        let playlist = html.data.episodeList;
        // let list = html.match(/\"episodeList\\":\s*(\[[\s\S]*?\])/g)[0].replace('"episodeList\\":', '').replace(/\\/g, '');
        // let playlist = JSON.parse(list)
        for (const it of playlist) {
            temp.push(it.name+'$'+`/vod/play/${id_}/sid/${it.nid}`)
        }
        playFroms.push('不知道倾情打造');
        playUrls.push(temp.join('#'));
        vod.vod_play_from = playFroms.join('$$$');
        vod.vod_play_url = playUrls.join('$$$');

        return vod
    },
    搜索: async function (wd, quick, pg) {
        let {input} = this
        const t = new Date().getTime()
        //keyword=你&pageNum=1&pageSize=12&type=false&key=cb808529bae6b6be45ecfab29a4889bc&t=1722904806016
        const signkey = 'keyword='+wd+'&pageNum='+pg+'&pageSize=12&type=false&key=cb808529bae6b6be45ecfab29a4889bc&t='+t
        const key = CryptoJS.SHA1(CryptoJS.MD5(signkey).toString()).toString()
        let html = JSON.parse((await req(input,
            {
                headers:{
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
                    'Accept': 'application/json, text/plain, */*',
                    'authorization':'',
                    'deviceId': '58a80c52-138c-48fd-8edb-138fd74d12c8',
                    'sign': key,
                    't': t.toString()
                }
        })).content);
        let d = [];
        const list = html.data.list
        list.forEach((it)=>{
            d.push({
                title: it.vodName,
                url: '/detail/'+it.vodId,
                desc: it.vodRemarks || '暂无更新',
                pic_url: it.vodPic,
            })
        })
        return setResult(d)
    },
    lazy: async function (flag, id, flags) {
        let {getProxyUrl,input} = this;
        const pid = input.split('/')[3]
        const nid = input.split('/')[5]
        const t = new Date().getTime()
        const signkey = `clientType=1&id=${pid}&nid=${nid}&key=cb808529bae6b6be45ecfab29a4889bc&t=`+t
        const key = CryptoJS.SHA1(CryptoJS.MD5(signkey).toString()).toString()
        const relurl = 'https://www.cfkj86.com/api/mw-movie/anonymous/v1/video/episode/url?clientType=1&id='+pid+'&nid='+nid
        const html = await req_(relurl,'get', {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
                    'Accept': 'application/json, text/plain, */*',
                    'authorization':'',
                    'deviceId': '58a80c52-138c-48fd-8edb-138fd74d12c8',
                    'sign': key,
                    't': t.toString()
                })
        return {parse: 0, url: html.data.playUrl}
    },
};

