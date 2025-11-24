/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: '老白故事[听]',
  lang: 'ds'
})
*/

const {
    randDeviceWithId,
    formatPlayUrl,
} = misc;
const appVersion = '1.1.7';
let appUA = '';
let appData = {};
let device = {};
const nativeEncode = '1449682949';
const pk = NODERSA.NodeRSA(
    `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtSwotbu7UEonUCzCsJXP
SpYOrkuMnpyk24PBQskkcwYZsUTwbh8Y9vHuPIerh3AfZZ1luFV9yPC282xiNX+/
+IAzWHWG6M+dWmJnDyybeUVTh7H7YVM31eSR9TFT4VASr7NftgCv7hfS2mVNL0sx
RrMSPSXa6SbjkIeW4GTpYpWKehKfaqrgDwVfFCu67ogL9JLIdDxvWthIe42uUMnz
4II1/pdrPtWRu0CDjaxvsLz26UdMGSL3gFEloaJhp4KuIPK4RlIx+9t28H00+3Ip
eVirmiayDYJQe1cjiDKoERSkLubJRD2yj5X3trGmgXex3QkcRtx5UNXYkLEuEMNG
iwIDAQAB
-----END PUBLIC KEY-----`,
    'pkcs8-public-pem',
    {
        encryptionScheme: 'pkcs1',
    },
);
const imgUrl = function (pic) {
    if (pic.startsWith('http')) return pic;
    return appData.img_url + pic;
}

var rule = {
    类型: '听书',//影视|听书|漫画|小说
    title: '老白故事[听]',
    // host: 'https://lags.oss-cn-hangzhou.aliyuncs.com/',
    host: 'https://lbgs-1306000603.cos.ap-nanjing.myqcloud.com/',
    url: '',
    searchUrl: '#fypage',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: '',
    filter_url: '',
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    timeout: 5000,
    play_parse: true,
    预处理: async function () {
        device = getItem('device', '{}');
        if (typeof device == "string") {
            device = JSON.parse(device);
        }
        if (!device.id) {
            device = randDeviceWithId(32);
            device.id = device.id.toLowerCase();
            device.ua = 'Dalvik/2.1.0 (Linux; U; Android ' + device.release + '; ' + device.model + ' Build/' + device.buildId + ')';
            setItem('device', JSON.stringify(device))
        }
        appUA = '(Mozilla/5.0 (Linux; Android ' + device.release + '; ' + device.model + ' Build/' + device.buildId + '; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.70 Mobile Safari/537.36)';
        try {
            let html = await request(rule.host + '/' + appVersion + '.json');
            let content = JSON.parse(html);
            // log(content.data);
            var datas = content.data.split('$6c1cef78ae=');
            var json = '';
            for (let d of datas) {
                // json += pk.decryptPublic(d, 'utf8').replace(/^\s*\n|\s*$/gm, '');
                json += pk.decryptPublic(d, 'utf8');
            }
            appData = JSON.parse(json);
            appUA = appData.ua + '/' + appVersion + appUA;
            log('appUA:' + appUA);
        } catch (error) {
            console.log(error);
        }
        rule.headers = {
            'User-Agent': appUA,
            Referer: appData.http_referer,
        }
    },
    class_parse: async function () {
        let html = await request(appData.json_url + 'cat/index.json', {
            headers: rule.headers
        });
        // log(html);
        let content = JSON.parse(html);
        let datas = content.data;
        let classes = [];
        let filterObj = {};
        // log(datas);
        for (let data of datas) {
            let name = data.title.replace('分类', '');

            let type = {
                key: 'type',
                name: '类型',
            };
            var cvalues = data.types.reduce((result, t) => {
                result.push({n: t.name, v: t.type_id});
                return result;
            }, []);
            type['init'] = cvalues[0]['v'];
            type['value'] = cvalues;
            let sort = {
                key: 'sort',
                name: '排序',
                init: 'hot',
            };
            let sortValues = [];
            sortValues.push({n: '默认', v: 'index'});
            sortValues.push({n: '热门', v: 'hot'});
            sortValues.push({n: '连载', v: 'serial'});
            sortValues.push({n: '完结', v: 'done'});
            sort['value'] = sortValues;

            filterObj[type['init']] = [type, sort];
            classes.push({
                type_id: type['init'],
                type_name: name,
            });
        }
        return {class: classes, filters: filterObj}
    },
    推荐: '',
    一级: async function () {
        let {MY_FL, MY_CATE, MY_PAGE} = this;
        let type = MY_FL.type || MY_CATE;
        let sort = MY_FL.sort || 'hot';
        let html = await request(appData.json_url + 'cat_list/' + type + '/' + sort + '/' + MY_PAGE + '.json', {headers: rule.headers});
        let content = JSON.parse(html);
        let datas = content.data;
        let books = [];
        for (let book of datas.books) {
            books.push({
                vod_id: book.book_id,
                vod_name: book.name,
                vod_pic: imgUrl(book.pic),
                vod_remarks: book.status,
            });
        }
        return books;
    },
    二级: async function (ids) {
        let books = [];
        for (let id of ids) {
            let html = await request(appData.json_url + 'cont/' + id + '.json', {headers: rule.headers});
            let content = JSON.parse(html);
            let data = content.data;
            let book = {
                vod_name: data.name,
                vod_pic: imgUrl(data.pic),
                type_name: '',
                vod_year: data.time,
                vod_area: '',
                vod_remarks: data.status,
                vod_actor: data.teller,
                vod_director: '',
                vod_content: data.synopsis,
                vod_play_from: '道长在线',
            };
            // log(book);
            let us = data.play_data
                .map(function (b) {
                    return formatPlayUrl(book.vod_name, b.name) + '$' + data.book_id + '-' + b.play_id;
                })
                .join('#');
            book.vod_play_url = us;
            books.push(book);
        }
        return books.length > 0 ? books[0] : {}
    },
    搜索: async function () {
        let {KEY} = this;
        let time = Math.floor(new Date().getTime() / 1000);
        time = time - (time % 60);
        let t = CryptoJS.enc.Hex.stringify(CryptoJS.MD5(CryptoJS.enc.Hex.stringify(CryptoJS.MD5('search00')).toString() + nativeEncode + time)).toString();
        let data = {
            m: 'search',
            t: t,
            aid: 0,
            pid: 0,
            key: KEY,
        };
        // var params = pk.encrypt(JSON.stringify(data), 'base64').replace(/^\s*\n|\s*$/gm, '');
        var params = pk.encrypt(JSON.stringify(data), 'base64');
        log('params长度:' + params.length);
        let post_obj = {
            params: params,
            version: appVersion,
        };
        let post_data = `params=${params}&version=${appVersion}`;
        // log('post_data:' + post_data);
        log('api_url:' + appData.api_url);
        let headers = JSON.parse(JSON.stringify(rule.headers));
        // headers['Accept'] = 'application/json, text/plain, */*';
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let html = await post(appData.api_url, {
            headers: headers,
            // body: post_data,
            data: post_obj,
        });
        let content = JSON.parse(html);
        var datas = content.data;
        let books = [];
        for (let book of datas.books) {
            books.push({
                vod_id: book.book_id,
                vod_name: book.name,
                vod_pic: imgUrl(book.pic),
                vod_remarks: book.status,
            });
        }
        return books;
    },
    lazy: async function () {
        let {input} = this;
        let info = input.split('-');
        let time = Math.floor(new Date().getTime() / 1000);
        time = time - (time % 60);
        let t = CryptoJS.enc.Hex.stringify(CryptoJS.MD5(CryptoJS.enc.Hex.stringify(CryptoJS.MD5('play' + info[0] + info[1])).toString() + nativeEncode + time)).toString();
        let data = {
            m: 'play',
            t: t,
            aid: info[0],
            pid: info[1],
        };
        // var params = pk.encrypt(JSON.stringify(data), 'base64').replace(/^\s*\n|\s*$/gm, '');
        var params = pk.encrypt(JSON.stringify(data), 'base64');
        // log('params:' + params);
        // log([params]);
        log('params长度:' + params.length);
        let post_obj = {
            params: params,
            version: appVersion,
        };
        let post_data = buildUrl('', post_obj).slice(1);
        // let post_data = `params=${params}&version=${appVersion}`;
        // log('post_data:' + post_data);
        log('api_url:' + appData.api_url);
        let headers = JSON.parse(JSON.stringify(rule.headers));
        // headers['Accept'] = 'application/json, text/plain, */*';
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let html = await post(appData.api_url, {
            headers: headers,
            // body: post_data,
            data: post_obj,
        });
        let content = JSON.parse(html);
        var datas = content.data;
        return {
            parse: 0,
            url: datas.url,
            header: {
                'User-Agent': appUA,
                Referer: appData.referer,
            },
        };
    },
}
