/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: '348电影网',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    title: '348电影网',
    host: 'https://www.348z.com',
    // url:'/vodshow/id/fyclass/page/fypage.html',
    url: '/vodshow/id/fyfilter.html',
    filterable: 1,//是否启用分类筛选,
    filter_url: '{{fl.cateId}}{{fl.area}}/page/fypage{{fl.year}}',
    filter: 'H4sIAAAAAAAAA+2Xy27TUBCG38XrSM2xc+2SHeIRUBYWeAV0UQFSVUWilISkBdKiNjQ0FSCROi0pdVRuSeT0ZXyp34Lj2Dkzc5BaSw07L/1/4/Hx7zm/7XWFKcv315VHxpqyrDzQnxp3HyoZZUV/YvBjt1H3hxN+/Fx//MyYFa6Ecq0fbPZDmR8wpZqJ5a2+Y3f95uuYFIC0u27TBFIUxG8Mvc0akBIQc9cdTYCUBfE2drwXbSAsCxdqmqQdg9V5jQNn3ERIhUuNT117H5AKDf2NafBxihA0DM72yAJVaBgcvfcOeghp0HDr3LdPEcrBCl8O/PYuQnm4r+l3f++naw/nCLwNPl04ox10Fph7x//WoadxEyshjR63vmro6GF3LffN+PqHDQv6agadeqwuhY2WYkms67jj/TknFbEkerQsbzSlPSJJmDV95x7apCKWhGcX+3JFLM0rrraHckUsiR4fel53QHtEEnh8IveIJXhAv+WKWIKVWv+u1CI93lru+Jj2iCTR41WLu+w2TmgboYp77l36rTO/2aG3LVTYsZ+97Ut+Mr2oUEVd7ZczadOiSMLjtGboq2icRj+ciZ1wnNQs3wdx+7DN0kxAVJOphqkqUxVTJlOGaVamWURZWaKsjGlJpiVMizItYlqQaQHTvEzzmMpeMewVk71i2Csme8WwV0z2imGvmOxVmLyVaiWjqLd8icAa+IZwxibP8XlMw+J5dvB8QCiHt3C4IQGBXd7ADDMDEPgc5iMHweE8yHJlaeThtHx2YdFZr/F6upkiKXncLCJcb469JPF7U6gliN+2xRPHPfpC2wg1DaE0hBKFkIZC6L/uzyiI6LhGEs0jeW+FEo0lWhFJ6TSn08ynObegaZ69T+k0R1Ly98A1s5pmczrNibK5eMsvRA28yd0jP7VaiZIrsw6fbVr6x5v+8aZ/vGmgLTbQqn8B50a4ODgVAAA=',
    filter_def: {
        1: {cateId: '1'},
        2: {cateId: '2'},
        3: {cateId: '3'},
        4: {cateId: '4'},
        37: {cateId: '37'}
    },
    searchUrl: '/vodsearch/page/fypage/wd/**.html',
    searchable: 2,//是否启用全局搜索,
    headers: {//网站的请求头,完整支持所有的,常带ua和cookies
        'User-Agent': 'PC_UA',
    },
    class_parse: '.nav-channel a;a&&Text;a&&href;/(\\d+).html',
    play_parse: true,
    tab_remove: ['蓝光Z', '极速', '极速2'],
    lazy: `js:
		let html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
		let url = html.url;
		if (html.encrypt == '1') {
			url = unescape(url)
		} else if (html.encrypt == '2') {
			url = unescape(base64Decode(url))
		}
if (/\\.m3u8/.test(url)) {
            let body = request(url);
            let lines = body.split('\\n');
            let m3u8Url = null;
            for (let line of lines) {
                line = line.trim();
                if (line.endsWith('.m3u8')) {
                    m3u8Url = urljoin(url,line);//获取嵌套M3U8
                    console.log(m3u8Url);
                    break;
                }
            }
            input = {
                jx: 0,
                url: m3u8Url || url,
                parse: 0
            };
    } else {
			input = {
                jx: 0,
                url: url,
                parse: 0
            };
		}
	`,
    limit: 6,
    double: true, // 推荐内容是否双层定位
    推荐: '.vodlist;*;*;*;*;*',
    一级: '.pack-ykpack;a&&title;.eclazy&&data-original;.pack-prb&&Text;a&&href',
    二级: {
        "title": ".fyy&&Text;.s-top-info-detail&&Text",
        "img": ".g-playicon&&img&&src",
        "desc": ".s-top-info-title span&&Text;;;.item-type&&Text;.item-actor:eq(2)&&Text",
        "content": ".ec-palytcji span&&Text",
        "tabs": `js:
            TABS = [];
			let tabs = pdfa(html.replace(/&nbsp;/g,''), '.swiper-wrapper .channelname');
			tabs.forEach((it) => {
    TABS.push(pdfh(it, "body&&Text").replace(/\\s*\\([^)]*\\)/,'').replace(/[^\x00-\x7F]/,''));
});
		`,
        "lists": ".content_playlist:eq(#id) li"
    },
    搜索: '.pack-packcover.returl.list-top-b;*;*;*;*',
}