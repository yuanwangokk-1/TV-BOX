// 搜索安全验证
muban.首图2.二级.title = 'h1--span&&Text;.data--span:eq(0)&&Text';
muban.首图2.二级.desc = '.data:eq(3)&&Text;;;.data--span:eq(1)&&Text;.data--span:eq(2)&&Text';
muban.首图2.二级.content = '.desc--span--a&&Text';
muban.首图2.二级.tabs = '.nav-tabs li';
var rule = {
    title: '小白菜电影',
    模板: '首图2',
    host: 'https://www.xbcdy.com',
    // url: '/vodshow/fyclass--------fypage---.html',
    url: '/vodshow/fyfilter.html',
    filterable: 1,//是否启用分类筛选,
    filter_url: '{{fl.cateId}}-{{fl.area}}-{{fl.by or "time"}}-{{fl.class}}-{{fl.lang}}-{{fl.letter}}---fypage---{{fl.year}}',
    filter: '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',
    filter_def: {
        dianying: {cateId: 'dianying'},
        dianshiju: {cateId: 'dianshiju'},
        duanju: {cateId: 'duanju'},
        zongyi: {cateId: 'zongyi'},
        dongman: {cateId: 'dongman'},
        zhibo: {cateId: 'zhibo'}
    },
    class_parse: '.stui-header__menu li:gt(0):lt(8);a&&Text;a&&href;.*/(.*?).html',
    pagecount: {"zhibo": 1},
    lazy: `js:
        var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        var url = html.url;
        if (html.encrypt == '1') {
            url = unescape(url)
        } else if (html.encrypt == '2') {
            url = unescape(base64Decode(url))
        }
        if (/m3u8|mp4/.test(url)) {
            input = {
                jx: 0,
                url: url,
                parse: 0
            }
        } else {
            input
        }
    `,
    searchUrl: '/index.php/ajax/suggest?mid=1&wd=**&limit=50',
    detailUrl: '/voddetail/fyid.html', //非必填,二级详情拼接链接
    搜索: 'json:list;name;pic;;id',
}
