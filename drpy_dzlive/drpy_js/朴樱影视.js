muban.首图.二级.desc = '.other-data:eq(0)&&Text;.other-data:eq(2)&&.top&&Text;.other-data:eq(1)&&.top&&Text;;';
muban.首图.二级.content = '.col-xs-1:eq(1)&&Text';
var rule = {
    title: '朴樱影视',
    模板: '首图',
    host: 'https://www.pyys.top',
    homeUrl: '/index.php/vod/show/by/hits/id/41.html',
    // url:'/index.php/vod/show/id/fyclass/page/fypage.html',
    url: '/index.php/vod/show/id/fyfilter.html',
    filterable: 1,//是否启用分类筛选,
    filter_url: '{{fl.cateId}}{{fl.area}}{{fl.by or "/by/time"}}{{fl.class}}{{fl.lang}}{{fl.letter}}/page/fypage{{fl.year}}',
    filter: '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',
    filter_def: {
        1: {cateId: '1'},
        2: {cateId: '2'},
        3: {cateId: '3'},
        4: {cateId: '4'},
        36: {cateId: '36'}
    },
    tab_remove: ['L线路', '禁国内IP线路'],
    headers: {
        'User-Agent': 'PC_UA',
    },
    lazy: `js:
		var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
		var url = html.url;
		if (html.encrypt == '1') {
			url = unescape(url)
		} else if (html.encrypt == '2') {
			url = unescape(base64Decode(url))
		}
		if (/\\.m3u8|\\.mp4/.test(url)) {
			input = {
				jx: 0,
				url: url,
				parse: 0
			}
		} else {
			input
		}
	`,
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    class_parse: '.myui-screen__list:eq(0) li;a&&Text;a&&href;/(\\d+).html',
    // 二级访问前: 'MY_URL=/play/.test(MY_URL)?MY_URL.replace("play","detail").replace("/sid/1/nid/1",""):MY_URL',
    搜索: '*',
}