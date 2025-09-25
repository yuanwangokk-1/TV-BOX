var rule = {
author: '小可乐/2408/第一版',
title: '低端影院',
类型: '影视',
host: 'https://ddys.pro',
hostJs: '',
headers: {'User-Agent': 'MOBILE_UA'},
编码: 'utf-8',
timeout: 5000,

homeUrl: '/',
url: '/fyfilter/page/fypage',
filter_url: '{{fl.cateId}}',
detailUrl: '',
searchUrl: '/?s=**&post_type=post',

limit: 9,
double: false,
class_name: '所有电影&连载剧集&精彩动画&类型推荐',
class_url: 'category/movie&category/airing&category/anime&tag/recommend',
filter_def: {
'category/movie': {cateId: 'category/movie'},
'category/airing': {cateId: 'category/airing'},
'category/anime': {cateId: 'category/anime'},
'tag/recommend': {cateId: 'tag/recommend'}
},

play_parse: true,
lazy: $js.toString(() => {
input = { jx: 0, parse: 0, url: input, header: {'User-Agent': MOBILE_UA, 'Referer': HOST} }
}),

推荐: '*',
一级: 'article;a:eq(-1)&&Text;.post-box-image&&style;.post-box-meta&&Text;a:eq(-1)&&href',
二级: $js.toString(() => {
let khtml = fetch(input);
let kdetail = pdfh(khtml, '.abstract&&Html');
VOD = {};
VOD.vod_id = input;
VOD.vod_name = pdfh(khtml, 'h1&&Text');
VOD.vod_pic = pdfh(khtml, '.mod&&img&&data-cfsrc');
VOD.type_name = /类型:/.test(kdetail) ? kdetail.match(/类型:(.*?)</)[1] : '未提供';
VOD.vod_remarks = '更新于' + pdfh(khtml, '.published&&Text');
VOD.vod_year = /年份:/.test(kdetail) ? kdetail.match(/年份:(.*?)</)[1].trim() : '未提供';
VOD.vod_area = /地区:/.test(kdetail) ? kdetail.match(/地区:(.*?)</)[1] : '未提供';
VOD.vod_actor = /演员:/.test(kdetail) ? kdetail.match(/演员:(.*?)</)[1] : '未提供';
VOD.vod_director = /导演:/.test(kdetail) ? kdetail.match(/导演:(.*?)</)[1] : '未提供';
VOD.vod_content = '👶' + pdfh(khtml, '.abstract&&Text').split('简介:')[1];
VOD.vod_play_from = '👶exo国内专线';

let np = pdfa(khtml, '.post-page-numbers');
if (!np.length) {np = ['1']};
let kurl = [];
np.map((it) => {
    let num = pdfh(it, 'body&&Text');
    if (num == '1') { num = ''};       
    let nUrl = input + num;
    let kdata = pdfh(fetch(nUrl), '.wp-playlist-script&&Html') 
    let kjson = JSON.parse(kdata).tracks;
	kjson.forEach((it) => {
    	let plist = `${it.caption}$https://v.ddys.pro${it.src0}`;
    	kurl.push(plist)
	})  
});
VOD.vod_play_url = kurl.join('#')
}),
搜索: $js.toString(() => {
VODS = [];
let klists = pdfa(fetch(input), 'article');
klists.forEach((it) => {
    let kid = pdfh(it, 'a:eq(0)&&href');
    let kpic = pdfh(fetch(kid), '.mod&&img&&data-cfsrc');
    VODS.push({
        vod_name: pdfh(it, 'a:eq(0)&&Text'),
        vod_pic: kpic,
        vod_remarks: pdfh(it, '.cat-links&&Text'),
        vod_id: kid
    })
})
}),

filter: 'H4sIAAAAAAAAA62Sz04qMRTG9zxG1xCMiRvfwGcwLmqnF6q2NaVgCCHxT1DRaDTimBiiC2NAgtFZ3JtcAZ+GTvEt7IiZKRXc6LI9v+87p19PJQUQlDjHRTlLeYlgsLicqoB1XAaLH5UlD6QBg9QUgA566ubYnEtwoxiRFcDMtaq13/ba0fWnxnKrpsdM2G3p11Pd+KsGwVQyu4ULEguWcXRX92+3D9/pYIFAV6VOTkdPj9+pUJ4wXMCObhTs64u7CZ2EuazHi6umh+Sb8wtzoLpSTa2krdwgEYTlfi24T7vJ5FS95XKegBTGsX2c7NhmKtY2HdgEPBNeFw48jnYmj9xJVO3fsOfP5LnMYzElUkbo763i2C3OptlVj3eh/6wvO1PJLMNbGfPhuSIl8WjRHgiMOKWYeT+dbNIsjuqoPRw0LQQiSThL6n4zyTGqGwPsleO6PgzCvZrdglPIUPJy3TpX/3sWUEAk84ck9aMnPejYDcREcLtd7Z9bZVqOdi8ZINw5C7d9C8hzIbhI/F86anCp6wdfdoGjoolCQstM9/qj+otLlqAgWFot+w3VCIb9axdE3LxcyPH/parve7ivmugEAAA='
}