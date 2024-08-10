muban.mxpro.二级.desc = '.module-info-item:eq(4)&&Text;;;.module-info-item-content:eq(1)&&Text;.module-info-item-content:eq(0)&&Text';
muban.mxpro.二级.tabs = '#y-playList .tab-item';
var rule = {
    title: '大师兄影视[优]',
    模板: 'mxpro',
    // host:'https://dsxys.com',
    host: 'https://dsxys.pro',
    // url:'/vodshow/fyclass--------fypage---.html',
    url: '/vodshow/fyfilter.html',
    filterable: 1,//是否启用分类筛选,
    filter_url: '{{fl.cateId}}-{{fl.area}}-{{fl.by}}-{{fl.class}}-{{fl.lang}}-{{fl.letter}}---fypage---{{fl.year}}',
    filter: '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',
    filter_def: {
        1: {cateId: '1'},
        2: {cateId: '2'},
        3: {cateId: '3'},
        4: {cateId: '4'}
    },
    class_parse: '.navbar-items.swiper-wrapper li;a&&title;a&&href;/(\\d+).html',
    lazy: "js:var html=JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);var url=html.url;if(html.encrypt=='1'){url=unescape(url)}else if(html.encrypt=='2'){url=unescape(base64Decode(url))}if(/m3u8|mp4/.test(url)){input=url}else{input}",

    // searchUrl:'/search-**----------fypage---/',
    searchUrl: '/index.php/ajax/suggest?mid=1&wd=**&limit=50',
    detailUrl: '/v/fyid.html', //非必填,二级详情拼接链接
    二级访问前: 'log(MY_URL);MY_URL=MY_URL.replace("/p","/v").replace("-1-1","")',
    搜索: 'json:list;name;pic;;id',
}