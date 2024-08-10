// 发布页 https://www.bdys.me/
var rule = {
    title: '哔嘀影视[优]',
    host: 'https://www.yjys.top',
    //hostJs:'print(HOST);let html=request(HOST,{headers:{"User-Agent":PC_UA}});HOST = html.match(/可用网址：<a href=\'(.*)\'>点此进入/)[1];print("哔嘀跳转地址 =====> " + HOST)',
    // url: '/s/all/fypage?type=fyclass',
    //url: '/s/all/fypage?type=fyclassfyfilter',
    //url:'/s/{{fl.lx}}/fypage?type=fyclass&{{fl.area}}&{{fl.year}}&{{fl.by}}[/s/all/fypage?type=fyclassfyfilter]'
    url: '/s/fyfilter',
    filter_url: '{{fl.lx}}/fypage?type={{fl.type}}&{{fl.area}}&{{fl.year}}&{{fl.by}}',
    filter: 'H4sIAAAAAAAAA+2W31ITMRTG32WvuciCgjLDnW/heBHoQhfKVourtAwzKlBKgRYQigVUZvhTcOy0CAq0trxMk919C1OaTU6C4513e9f9ficnOV9OOmfOQMbw8zljykobw0Zi1ugzHDxtsd/eRZN8WWXfb3DCte6DHCZ3btaD8kZXZh84kTDm+3qA5M86rQMOYklnIuMmBfRyF3RhKVxlv7KdCbmwdEBWKpzN2pOuXFXZJLdNTqasuIsdwej7DfquFDK23ahcR3OfOo0VzjJx7GTiFtiQVk877UOO37qzNhYoqG7LHaeTyo7skLKGSVetIX/mbTdB8Wyl3G8hTz/shQvZspkkWDrwjBP2QxT+vh3stcMCsO3Awj9890qboV3sgGlbML96Sta+gZ3GLQlpadlfaYRlW3Bd8HmLfjrhqFvYWNwFhWe3gvJ5aApOMsMk9PI1rxVuOc6sdmVar/GNtHbEcRLyhkjx2D8KvZxwM12jgZsny/IWXtnqLey3/FpVrEymQbs0f8sCM8xjUCEpZEnxB2cJeyYOTLvbYNfHUdp1YvB2SOErye2TwirJ/RIh2BlTD+y1C7KFpy3Yw8HXc4lYKwLESuk0Kt72T7+SlTGsJhBDd08kSsHE/uqFJGl2ZzBz+1qymAVI525REgjI9ZUEoxiS/KEkkzZE/smdRDMvscOMlUdfLJLjCsmdw2PGcAIWQS/rkr7GCrqpkSKgE8xwLeJyR+JxeC7avpQE3/v5ost6/3I4ZWH5P0cO6mSt8e//OWnfTZXdGisrKGfD9CzbiKKrwcFpmZXyMJjrWuZind62/5K5p8N+22/BMK7A5lADuAL6ih58hwFcgX2rZuAKdF8N4Irom/U6aZzCAK7ALlUzcAW0l1eseitlpRAhPmg05TBChE1xr3Qae0ok1EVwbZspdPeXEilEcRGbX8jSjXIRPUWUsH5NlurK+XuKvPfbQHWJK+D50dU7dkLFKCGCh+21dmlJ7TQhwv5PWzgF+v/2qtNsPeh/snQWLJzp/d+P+h+Fb5llGbn/BnBAgwMQ9muwH0JTgyaESIMIQPOpCtk3gE80+ATCIQ0OQTiowUEIH2vwMYSaQyZ0yNQcMqFDpuaQCR0yNYdM6JCpOWRCh5DmEIIOIc0hBB1CmkMIOoQ0hxB0CGkOIegQ0hxC0CGkOYSgQ0hzCEGHkOYQgg4hzSH2Dd/EaFq+CFrYIo3igxdB969oqc5ef7B7xXMlUzErNSK99i+y3scjv7ZIclklxOxu9qLPMKNhOxq2o2E7GrajYTsatqNhOxq2o2E7GrajYft/DNvzfwAYtZwS2xYAAA==',
    filter_def: {
        0: {lx: 'all', type: '0'},//最新电影
        1: {lx: 'all', type: '1'},//最新电视剧
        2: {lx: 'donghua', type: '1'},//动漫
        3: {lx: 'all', type: '1', area: 'area=中国大陆', by: 'order=0'},//国产剧
        4: {lx: 'gangtaiju', type: ''},//港台剧
        5: {lx: 'meiju', type: ''},//欧美剧
        6: {lx: 'hanju', type: ''}//日韩剧

    },
    filterable: 1,//是否启用分类筛选,
    class_name: '最新电影&最新电视剧&动漫&国产剧&港台剧&欧美剧&日韩剧',
    class_url: '0&1&2&3&4&5&6',
    searchUrl: '/search/**/fypage',
    searchable: 2,//是否启用全局搜索,
    quickSearch: 0,//是否启用快速搜索,
    headers: {
        //'User-Agent': 'MOBILE_UA',
        'User-Agent': 'PC_UA',
    },
    play_parse: true,
    lazy: $js.toString(() => {


        // 获取 pid 并输出
        let pid = JSON.parse(request(MY_URL).match(/var pid = (\d+);/)[1]);
        //console.log(pid);

        // 获取当前时间并输出
        let currentTimeMillis = Date.now();
        //console.log(currentTimeMillis);

        let str4 = pid + '-' + currentTimeMillis;
        //console.log(str4);
        //通过对str4进行SHA-256哈希，生成前16个字节作为密钥

        let md5Hash = CryptoJS.MD5(str4).toString(CryptoJS.enc.Hex);

        // 确保哈希值长度为32个字符，并转换为小写
        while (md5Hash.length < 32) {
            md5Hash = '0' + md5Hash;
        }

        md5Hash = md5Hash.toLowerCase();

//console.log(md5Hash);
        let key = CryptoJS.enc.Utf8.parse(md5Hash.substring(0, 16));
        let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(str4), key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });


        let encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);

        let encryptedString = encryptedHex.toUpperCase();
//console.log(encryptedString);

        let lines = HOST + '/lines?t=' + currentTimeMillis + '&sg=' + encryptedString + '&pid=' + pid;

        //console.log(lines);

        //let lines = 'https://www.yjys.top/lines?t=1718379627499&sg=66759BAA896EC5E7B26EE88F9994F25F4CBB434C967416CDD51EB25F3EF0D77A&pid=179395';

        // 发起请求并获取匹配的 URL
        let url = JSON.parse(request(lines)).data.url3;
        // console.log(url);
        let splitUrl = url.indexOf(',') !== -1 ? url.split(',')[0].trim() : url.trim();
        //console.log(splitUrl);
        //let resp = request(splitUrl.replace('www.yjys02.com','www.yjys.top'), {withHeaders: true, redirect: false});
        //console.log(resp);

        if (splitUrl.includes('yjys')) {
            let resp = request(splitUrl, {withHeaders: true, redirect: false});
            splitUrl = JSON.parse(resp).location;
            console.log(splitUrl);
        }

        input = {
            jx: 0,
            url: splitUrl,
            parse: 0
        };


    }),
    limit: 6,
    double: true, // 推荐内容是否双层定位
    推荐: '.row-cards;.card-link;*;img&&data-src;*;*',
    一级: '.row-cards&&.card-link;h3&&Text;img&&src;p&&Text;a&&href',
    二级: {
        "title": ".col h2&&Text;.mt-1&&Text",
        "img": ".col-md-auto img&&src",
        "desc": ";;;.mb-md-2:eq(3)&&Text;.mb-md-2:eq(1)&&Text",
        "content": "#synopsis .card-body&&Text",
        "tabs": ".card-header:eq(2) h3",
        "lists": "#play-list:eq(#id) a"
    },
    搜索: '.row-cards .row-0;.d-inline-block&&title;img&&src;.d-inline-block&&Text;a&&href',
}