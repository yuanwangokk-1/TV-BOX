function str2binl(d) {
    for (var _ = Array(), m = (1 << 8) - 1, r = 0; r < d.length * 8; r += 8)
        _[r >> 5] |= (d.charCodeAt(r / 8) & m) << r % 32;
    return _
}

function binl2hex(d) {
    for (var _ = 0 ? "0123456789ABCDEF" : "0123456789abcdef", m = "", r = 0; r < 4 * d.length; r++)
        m += _.charAt(d[r >> 2] >> r % 4 * 8 + 4 & 15) + _.charAt(d[r >> 2] >> r % 4 * 8 & 15);
    return m
}

function core_md5(d, _) {
    d[_ >> 5] |= 128 << _ % 32,
        d[14 + (_ + 64 >>> 9 << 4)] = _;
    for (var m = 1732584193, r = -271733879, n = -1732584194, h = 271733878, f = 0; f < d.length; f += 16) {
        var i = m
            , t = r
            , c = n
            , e = h;
        m = md5_ff(m, r, n, h, d[f + 0], 7, -680876936),
            h = md5_ff(h, m, r, n, d[f + 1], 12, -389564586),
            n = md5_ff(n, h, m, r, d[f + 2], 17, 606105819),
            r = md5_ff(r, n, h, m, d[f + 3], 22, -1044525330),
            m = md5_ff(m, r, n, h, d[f + 4], 7, -176418897),
            h = md5_ff(h, m, r, n, d[f + 5], 12, 1200080426),
            n = md5_ff(n, h, m, r, d[f + 6], 17, -1473231341),
            r = md5_ff(r, n, h, m, d[f + 7], 22, -45705983),
            m = md5_ff(m, r, n, h, d[f + 8], 7, 1770035416),
            h = md5_ff(h, m, r, n, d[f + 9], 12, -1958414417),
            n = md5_ff(n, h, m, r, d[f + 10], 17, -42063),
            r = md5_ff(r, n, h, m, d[f + 11], 22, -1990404162),
            m = md5_ff(m, r, n, h, d[f + 12], 7, 1804603682),
            h = md5_ff(h, m, r, n, d[f + 13], 12, -40341101),
            n = md5_ff(n, h, m, r, d[f + 14], 17, -1502002290),
            r = md5_ff(r, n, h, m, d[f + 15], 22, 1236535329),
            m = md5_gg(m, r, n, h, d[f + 1], 5, -165796510),
            h = md5_gg(h, m, r, n, d[f + 6], 9, -1069501632),
            n = md5_gg(n, h, m, r, d[f + 11], 14, 643717713),
            r = md5_gg(r, n, h, m, d[f + 0], 20, -373897302),
            m = md5_gg(m, r, n, h, d[f + 5], 5, -701558691),
            h = md5_gg(h, m, r, n, d[f + 10], 9, 38016083),
            n = md5_gg(n, h, m, r, d[f + 15], 14, -660478335),
            r = md5_gg(r, n, h, m, d[f + 4], 20, -405537848),
            m = md5_gg(m, r, n, h, d[f + 9], 5, 568446438),
            h = md5_gg(h, m, r, n, d[f + 14], 9, -1019803690),
            n = md5_gg(n, h, m, r, d[f + 3], 14, -187363961),
            r = md5_gg(r, n, h, m, d[f + 8], 20, 1163531501),
            m = md5_gg(m, r, n, h, d[f + 13], 5, -1444681467),
            h = md5_gg(h, m, r, n, d[f + 2], 9, -51403784),
            n = md5_gg(n, h, m, r, d[f + 7], 14, 1735328473),
            r = md5_gg(r, n, h, m, d[f + 12], 20, -1926607734),
            m = md5_hh(m, r, n, h, d[f + 5], 4, -378558),
            h = md5_hh(h, m, r, n, d[f + 8], 11, -2022574463),
            n = md5_hh(n, h, m, r, d[f + 11], 16, 1839030562),
            r = md5_hh(r, n, h, m, d[f + 14], 23, -35309556),
            m = md5_hh(m, r, n, h, d[f + 1], 4, -1530992060),
            h = md5_hh(h, m, r, n, d[f + 4], 11, 1272893353),
            n = md5_hh(n, h, m, r, d[f + 7], 16, -155497632),
            r = md5_hh(r, n, h, m, d[f + 10], 23, -1094730640),
            m = md5_hh(m, r, n, h, d[f + 13], 4, 681279174),
            h = md5_hh(h, m, r, n, d[f + 0], 11, -358537222),
            n = md5_hh(n, h, m, r, d[f + 3], 16, -722521979),
            r = md5_hh(r, n, h, m, d[f + 6], 23, 76029189),
            m = md5_hh(m, r, n, h, d[f + 9], 4, -640364487),
            h = md5_hh(h, m, r, n, d[f + 12], 11, -421815835),
            n = md5_hh(n, h, m, r, d[f + 15], 16, 530742520),
            r = md5_hh(r, n, h, m, d[f + 2], 23, -995338651),
            m = md5_ii(m, r, n, h, d[f + 0], 6, -198630844),
            h = md5_ii(h, m, r, n, d[f + 7], 10, 1126891415),
            n = md5_ii(n, h, m, r, d[f + 14], 15, -1416354905),
            r = md5_ii(r, n, h, m, d[f + 5], 21, -57434055),
            m = md5_ii(m, r, n, h, d[f + 12], 6, 1700485571),
            h = md5_ii(h, m, r, n, d[f + 3], 10, -1894986606),
            n = md5_ii(n, h, m, r, d[f + 10], 15, -1051523),
            r = md5_ii(r, n, h, m, d[f + 1], 21, -2054922799),
            m = md5_ii(m, r, n, h, d[f + 8], 6, 1873313359),
            h = md5_ii(h, m, r, n, d[f + 15], 10, -30611744),
            n = md5_ii(n, h, m, r, d[f + 6], 15, -1560198380),
            r = md5_ii(r, n, h, m, d[f + 13], 21, 1309151649),
            m = md5_ii(m, r, n, h, d[f + 4], 6, -145523070),
            h = md5_ii(h, m, r, n, d[f + 11], 10, -1120210379),
            n = md5_ii(n, h, m, r, d[f + 2], 15, 718787259),
            r = md5_ii(r, n, h, m, d[f + 9], 21, -343485551),
            m = safe_add(m, i),
            r = safe_add(r, t),
            n = safe_add(n, c),
            h = safe_add(h, e)
    }
    return Array(m, r, n, h)
}

function md5_cmn(d, _, m, r, n, h) {
    return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(r, h)), n), m)
}

function md5_ff(d, _, m, r, n, h, f) {
    return md5_cmn(_ & m | ~_ & r, d, _, n, h, f)
}

function md5_gg(d, _, m, r, n, h, f) {
    return md5_cmn(_ & r | m & ~r, d, _, n, h, f)
}

function md5_hh(d, _, m, r, n, h, f) {
    return md5_cmn(_ ^ m ^ r, d, _, n, h, f)
}

function md5_ii(d, _, m, r, n, h, f) {
    return md5_cmn(m ^ (_ | ~r), d, _, n, h, f)
}

function safe_add(d, _) {
    var m = (65535 & d) + (65535 & _);
    return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m
}

function bit_rol(d, _) {
    return d << _ | d >>> 32 - _
}

function hex_md5(d) {
    return binl2hex(core_md5(str2binl(d), d.length * 8))
}

globalThis.hex_md5 = hex_md5
var rule = {
    类型: '听书',
    title: '六月听书[听]',
    host: 'http://m.6yueting.com',
    url: '/ys/fyclass/o2/pfypage',
    searchUrl: '/search/index/search?content=**&type=1&pageNum=fypage&pageSize=40',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,//是否启用分类筛选,
    headers: {
        'User-Agent': MOBILE_UA,
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Range': 'bytes=0-',
        'Referer': 'http://www.6yueting.com/'
    },
    class_name: '全部分类&玄幻奇幻&修真武侠&恐怖灵异&古今言情&都市言情&穿越重生&粤语古仔&网游小说&通俗文学&历史纪实&军事&悬疑推理&ebc5系列&官场商战&儿童读物&广播剧&外文原版&评书大全&相声小品&百家讲坛&健康养生&教材&期刊头条&戏曲&脱口秀',
    class_url: 't0&t1&t2&t3&t4&t28&t5&t6&t7&t11&t12&t13&t14&t18&t15&t16&t17&t22&t8&t9&t10&t20&t21&t23&t24&t27',
    play_parse: true,
    lazy: $js.toString(() => {
        let T = input.split('/')[4];
        let U = 'FRDSHFSKVKSKFKS';
        let b = input.split('/')[5];
        let data = {
            code: T,
            no: b,
            type: 0,
            timestamp: (new Date).getTime(),
            sign: hex_md5((new Date).getTime() + T + b + U)
        };
        let html = request('http://www.6yueting.com/web/index/video_new?code=' + data.code + '&no=' + data.no + '&type=' + data.type + '&timestamp=' + data.timestamp + '&sign=' + data.sign);
        let url = unescape(JSON.parse(html).data.videoUrl);
        input = {parse: 0, url: url, header: rule.headers};
    }),
    limit: 6,
    图片来源: '@Referer=http://m.6yueting.com/@User-Agent=MOBILE_UA',
    推荐: '*',
    一级: '.list-wrapper&&.item-link;h2--span&&Text;img&&src;.status&&Text;a&&href',
    二级: {
        "title": ".book-title&&Text;.text:eq(0)&&Text",
        "img": ".img&&src",
        "desc": ".text:eq(3)&&Text;;;.text:eq(1)&&Text;.text:eq(2)&&Text",
        "content": ".book-intro&&Text",
        "tabs": ".operate-bar&&.total-num",
        "lists": ".book-list:eq(#id)&&.list-item"
    },
    搜索: 'js:let d=[];let MY_HOME="http://m.6yueting.com";let html=request(input);html=JSON.parse(html);let list=html.data.content;list.forEach(function(it){d.push({title:it.name.replace(/<.*?>/g,""),img:"http://img.6yueting.com:20001/"+it.coverUrlLocal,url:MY_HOME+"/list/"+it.code,desc:it.cdate,content:it.descXx.replace(/&nbsp;/g,"")})});setResult(d);',
}