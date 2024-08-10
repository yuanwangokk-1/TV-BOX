var charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789';

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randStr(len, withNum, onlyNum) {
    var _str = '';
    let containsNum = withNum === undefined ? true : withNum;
    for (var i = 0; i < len; i++) {
        let idx = onlyNum ? rand(charStr.length - 10, charStr.length - 1) : rand(0, containsNum ? charStr.length - 1 : charStr.length - 11);
        _str += charStr[idx];
    }
    return _str;
}

function randUUID() {
    return randStr(8).toLowerCase() + '-' + randStr(4).toLowerCase() + '-' + randStr(4).toLowerCase() + '-' + randStr(4).toLowerCase() + '-' + randStr(12).toLowerCase();
}

function randMAC() {
    return randStr(2).toUpperCase() + ':' + randStr(2).toUpperCase() + ':' + randStr(2).toUpperCase() + ':' + randStr(2).toUpperCase() + ':' + randStr(2).toUpperCase() + ':' + randStr(2).toUpperCase();
}

const deviceBrands = ['Huawei', 'Xiaomi'];
const deviceModels = [
    ['MHA-AL00', 'HUAWEI Mate 9', 'MHA-TL00', 'HUAWEI Mate 9', 'LON-AL00', 'HUAWEI Mate 9 Pro', 'ALP-AL00', 'HUAWEI Mate 10', 'ALP-TL00', 'HUAWEI Mate 10', 'BLA-AL00', 'HUAWEI Mate 10 Pro', 'BLA-TL00', 'HUAWEI Mate 10 Pro', 'HMA-AL00', 'HUAWEI Mate 20', 'HMA-TL00', 'HUAWEI Mate 20', 'LYA-AL00', 'HUAWEI Mate 20 Pro', 'LYA-AL10', 'HUAWEI Mate 20 Pro', 'LYA-TL00', 'HUAWEI Mate 20 Pro', 'EVR-AL00', 'HUAWEI Mate 20 X', 'EVR-TL00', 'HUAWEI Mate 20 X', 'EVR-AN00', 'HUAWEI Mate 20 X', 'TAS-AL00', 'HUAWEI Mate 30', 'TAS-TL00', 'HUAWEI Mate 30', 'TAS-AN00', 'HUAWEI Mate 30', 'TAS-TN00', 'HUAWEI Mate 30', 'LIO-AL00', 'HUAWEI Mate 30 Pro', 'LIO-TL00', 'HUAWEI Mate 30 Pro', 'LIO-AN00', 'HUAWEI Mate 30 Pro', 'LIO-TN00', 'HUAWEI Mate 30 Pro', 'LIO-AN00m', 'HUAWEI Mate 30E Pro', 'OCE-AN10', 'HUAWEI Mate 40', 'OCE-AN50', 'HUAWEI Mate 40E', 'OCE-AL50', 'HUAWEI Mate 40E', 'NOH-AN00', 'HUAWEI Mate 40 Pro', 'NOH-AN01', 'HUAWEI Mate 40 Pro', 'NOH-AL00', 'HUAWEI Mate 40 Pro', 'NOH-AL10', 'HUAWEI Mate 40 Pro', 'NOH-AN50', 'HUAWEI Mate 40E Pro', 'NOP-AN00', 'HUAWEI Mate 40 Pro', 'CET-AL00', 'HUAWEI Mate 50', 'CET-AL60', 'HUAWEI Mate 50E', 'DCO-AL00', 'HUAWEI Mate 50 Pro', 'TAH-AN00', 'HUAWEI Mate X', 'TAH-AN00m', 'HUAWEI Mate Xs', 'TET-AN00', 'HUAWEI Mate X2', 'TET-AN10', 'HUAWEI Mate X2', 'TET-AN50', 'HUAWEI Mate X2', 'TET-AL00', 'HUAWEI Mate X2', 'PAL-AL00', 'HUAWEI Mate Xs 2', 'PAL-AL10', 'HUAWEI Mate Xs 2', 'EVA-AL00', 'HUAWEI P9', 'EVA-AL10', 'HUAWEI P9', 'EVA-TL00', 'HUAWEI P9', 'EVA-DL00', 'HUAWEI P9', 'EVA-CL00', 'HUAWEI P9', 'VIE-AL10', 'HUAWEI P9 Plus', 'VTR-AL00', 'HUAWEI P10', 'VTR-TL00', 'HUAWEI P10', 'VKY-AL00', 'HUAWEI P10 Plus', 'VKY-TL00', 'HUAWEI P10 Plus', 'EML-AL00', 'HUAWEI P20', 'EML-TL00', 'HUAWEI P20', 'CLT-AL00', 'HUAWEI P20 Pro', 'CLT-AL01', 'HUAWEI P20 Pro', 'CLT-AL00l', 'HUAWEI P20 Pro', 'CLT-TL00', 'HUAWEI P20 Pro', 'CLT-TL01', 'HUAWEI P20 Pro', 'ELE-AL00', 'HUAWEI P30', 'ELE-TL00', 'HUAWEI P30', 'VOG-AL00', 'HUAWEI P30 Pro', 'VOG-AL10', 'HUAWEI P30 Pro', 'VOG-TL00', 'HUAWEI P30 Pro', 'ANA-AL00', 'HUAWEI P40', 'ANA-AN00', 'HUAWEI P40', 'ANA-TN00', 'HUAWEI P40', 'ELS-AN00', 'HUAWEI P40 Pro', 'ELS-TN00', 'HUAWEI P40 Pro', 'ELS-AN10', 'HUAWEI P40 Pro', 'ELS-TN10', 'HUAWEI P40 Pro', 'ABR-AL00', 'HUAWEI P50', 'ABR-AL80', 'HUAWEI P50', 'ABR-AL60', 'HUAWEI P50E', 'ABR-AL90', 'HUAWEI P50E', 'JAD-AL00', 'HUAWEI P50 Pro', 'JAD-AL80', 'HUAWEI P50 Pro', 'JAD-AL50', 'HUAWEI P50 Pro', 'JAD-AL60', 'HUAWEI P50 Pro', 'BAL-AL00', 'HUAWEI P50 Pocket', 'BAL-AL60', 'HUAWEI Pocket S', 'PIC-AL00', 'HUAWEI nova 2', 'PIC-TL00', 'HUAWEI nova 2', 'BAC-AL00', 'HUAWEI nova 2 Plus', 'BAC-TL00', 'HUAWEI nova 2 Plus', 'HWI-AL00', 'HUAWEI nova 2s', 'HWI-TL00', 'HUAWEI nova 2s', 'ANE-AL00', 'HUAWEI nova 3e', 'ANE-TL00', 'HUAWEI nova 3e', 'PAR-AL00', 'HUAWEI nova 3', 'PAR-TL00', 'HUAWEI nova 3', 'INE-AL00', 'HUAWEI nova 3i', 'INE-TL00', 'HUAWEI nova 3i', 'VCE-AL00', 'HUAWEI nova 4', 'VCE-TL00', 'HUAWEI nova 4', 'MAR-AL00', 'HUAWEI nova 4e', 'MAR-TL00', 'HUAWEI nova 4e', 'SEA-AL00', 'HUAWEI nova 5', 'SEA-TL00', 'HUAWEI nova 5', 'SEA-AL10', 'HUAWEI nova 5 Pro', 'SEA-TL10', 'HUAWEI nova 5 Pro', 'GLK-AL00', 'HUAWEI nova 5i', 'GLK-TL00', 'HUAWEI nova 5i', 'GLK-LX1U', 'HUAWEI nova 5i', 'SPN-TL00', 'HUAWEI nova 5i Pro', 'SPN-AL00', 'HUAWEI nova 5z', 'WLZ-AL10', 'HUAWEI nova 6', 'WLZ-AN00', 'HUAWEI nova 6', 'JNY-AL10', 'HUAWEI nova 6 SE', 'JNY-TL10', 'HUAWEI nova 6 SE', 'JEF-AN00', 'HUAWEI nova 7', 'JEF-AN20', 'HUAWEI nova 7', 'JEF-TN00', 'HUAWEI nova 7', 'JEF-TN20', 'HUAWEI nova 7', 'JER-AN10', 'HUAWEI nova 7 Pro', 'JER-AN20', 'HUAWEI nova 7 Pro', 'JER-TN10', 'HUAWEI nova 7 Pro', 'JER-TN20', 'HUAWEI nova 7 Pro', 'CDY-AN00', 'HUAWEI nova 7 SE', 'CDY-AN20', 'HUAWEI nova 7 SE', 'CDY-TN00', 'HUAWEI nova 7 SE', 'CDY-TN20', 'HUAWEI nova 7 SE', 'ANG-AN00', 'HUAWEI nova 8', 'BRQ-AN00', 'HUAWEI nova 8 Pro', 'BRQ-AL00', 'HUAWEI nova 8 Pro', 'JSC-AN00', 'HUAWEI nova 8 SE', 'JSC-TN00', 'HUAWEI nova 8 SE', 'JSC-AL50', 'HUAWEI nova 8 SE', 'NAM-AL00', 'HUAWEI nova 9', 'RTE-AL00', 'HUAWEI nova 9 Pro', 'JLN-AL00', 'HUAWEI nova 9 SE', 'NCO-AL00', 'HUAWEI nova 10', 'GLA-AL00', 'HUAWEI nova 10 Pro', 'CHA-AL80', 'HUAWEI nova 10z'],
    ['M2001J2C', 'Xiaomi 10', 'M2001J2G', 'Xiaomi 10', 'M2001J2I', 'Xiaomi 10', 'M2011K2C', 'Xiaomi 11', 'M2011K2G', 'Xiaomi 11', '2201123C', 'Xiaomi 12', '2201123G', 'Xiaomi 12', '2112123AC', 'Xiaomi 12X', '2112123AG', 'Xiaomi 12X', '2201122C', 'Xiaomi 12 Pro', '2201122G', 'Xiaomi 12 Pro'],
];

function randDevice() {
    let brandIdx = rand(0, deviceBrands.length - 1);
    let brand = deviceBrands[brandIdx];
    let modelIdx = rand(0, deviceModels[brandIdx].length / 2 - 1);
    let model = deviceModels[brandIdx][modelIdx * 2 + 1];
    let release = rand(8, 13);
    let buildId = randStr(3, false).toUpperCase() + rand(11, 99) + randStr(1, false).toUpperCase();
    return {
        brand: brand,
        model: model,
        release: release,
        buildId: buildId,
    };
}

function randDeviceWithId(len) {
    let device = randDevice();
    device['id'] = randStr(len);
    return device;
}

function formatPlayUrl(src, name) {
    if (src.trim() == name.trim()) {
        return name;
    }
    return name
        .trim()
        .replaceAll(src, '')
        .replace(/<|>|《|》/g, '')
        .replace(/\$|#/g, ' ')
        .trim();
}

globalThis.randDeviceWithId = randDeviceWithId;
globalThis.formatPlayUrl = formatPlayUrl;

globalThis.appVersion = '1.1.7';
globalThis.appUA = '';
globalThis.appData = {};
globalThis.device = {};
globalThis.nativeEncode = '1449682949';
globalThis.pk = NODERSA.NodeRSA(
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
globalThis.imgUrl = function (pic) {
    if (pic.startsWith('http')) return pic;
    return appData.img_url + pic;
}

var rule = {
    类型: '听书',//影视|听书|漫画|小说
    title: '老白故事[听]',
    host: 'https://lags.oss-cn-hangzhou.aliyuncs.com/',
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
    预处理: $js.toString(() => {
        device = getItem('device', '{}');
        if (typeof device == "string") {
            device = JSON.parse(device);
        }
        // device = JSON.parse(device);
        if (!device.id) {
            device = randDeviceWithId(32);
            device.id = device.id.toLowerCase();
            device.ua = 'Dalvik/2.1.0 (Linux; U; Android ' + device.release + '; ' + device.model + ' Build/' + device.buildId + ')';
            setItem('device', JSON.stringify(device))
        }
        // log('device:');
        // log(device);
        appUA = '(Mozilla/5.0 (Linux; Android ' + device.release + '; ' + device.model + ' Build/' + device.buildId + '; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.70 Mobile Safari/537.36)';

        try {
            let html = request(rule.host + '/' + appVersion + '.json');
            let content = JSON.parse(html);
            // log(content.data);
            var datas = content.data.split('$6c1cef78ae=');
            var json = '';
            for (let d of datas) {
                // json += pk.decryptPublic(d, 'utf8').replace(/^\s*\n|\s*$/gm, '');
                json += pk.decryptPublic(d, 'utf8');
            }
            appData = JSON.parse(json);
            // log(appData);
            appUA = appData.ua + '/' + appVersion + appUA;
            log('appUA:' + appUA);
        } catch (error) {
            console.log(error);
        }
        rule.headers = {
            'User-Agent': appUA,
            Referer: appData.http_referer,
        }
    }),
    class_parse: $js.toString(() => {
        let html = request(appData.json_url + 'cat/index.json', {
            headers: rule.headers
        });
        let content = JSON.parse(html);
        let datas = content.data;
        let classes = [];
        let filterObj = {};
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
        // log(classes);
        input = classes;
        homeObj.filter = filterObj;

    }),
    推荐: '',
    一级: $js.toString(() => {
        VODS = [];
        let type = MY_FL.type || MY_CATE;
        let sort = MY_FL.sort || 'hot';
        let html = request(appData.json_url + 'cat_list/' + type + '/' + sort + '/' + MY_PAGE + '.json', {headers: rule.headers});
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
        VODS = books;
    }),
    二级: $js.toString(() => {
        let ids = [orId];
        let books = [];
        for (let id of ids) {
            let html = request(appData.json_url + 'cont/' + id + '.json', {headers: rule.headers});
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
        VOD = books.length > 0 ? books[0] : {};
    }),
    搜索: $js.toString(() => {
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
        let html = post(appData.api_url, {
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
        VODS = books;
    }),
    lazy: $js.toString(() => {
        var info = input.split('-');
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
        let html = post(appData.api_url, {
            headers: headers,
            // body: post_data,
            data: post_obj,
        });
        let content = JSON.parse(html);
        var datas = content.data;
        input = {
            parse: 0,
            url: datas.url,
            header: {
                'User-Agent': appUA,
                Referer: appData.referer,
            },
        };
    }),
}