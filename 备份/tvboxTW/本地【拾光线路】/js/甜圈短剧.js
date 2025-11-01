var rule = {
author: '小可乐/2505/第一版',
title: '甜圈短剧',
类型: '影视',
host: 'https://mov.cenguigui.cn',
hostJs: '',
headers: {'User-Agent': 'MOBILE_UA'},
编码: 'utf-8',
timeout: 5000,

homeUrl: '/duanju/api.php?classname=推荐榜&offset=0',
url: '/duanju/api.php?classname=fyclass&offset=(fypage-1)',
filter_url: '',
detailUrl: '/duanju/api.php?book_id=fyid',
searchUrl: '/duanju/api.php?name=**&page=fypage',

limit: 9,
double: false,
class_parse: $js.toString(() => {
classes = [];
let klists = pdfa(fetch(HOST), '.btn.btn-light');
klists.forEach((it) => {
    let cname = pdfh(it, 'body&&Text').replace('🎬','').trim();
    classes.push({
    type_name: cname,
    type_id: cname
    })
})
}),
filter_def: {},

推荐: '*',
一级: 'json:data;title;cover;sub_title;book_id;video_desc',
二级: $js.toString(() => {
let kjson = JSON.parse(fetch(input));
let kurl = kjson.data.map((it) => { return it.title + '$' + it.video_id });
VOD = {
    vod_id: kjson.book_id,
    vod_name: kjson.book_name,
    type_name: kjson.category,
    vod_pic: kjson.book_pic,
    vod_remarks: `更新至${kjson.total}集`,
    vod_year: kjson.time.split('-')[0],
    vod_area: '中国',
    vod_lang: '国语',
    vod_director: kjson.author,
    vod_actor: `片长${kjson.duration}`,
    vod_content: kjson.desc,
    vod_play_from: '👶甜圈专线',
    vod_play_url: kurl.join("#")
}
}),
搜索: '*;*;*;type;*;intro',

play_parse: true,
lazy: $js.toString(() => {
let kurl = `${HOST}/duanju/api.php?video_id=${input}&type=mp4`;
input = { jx: 0, parse: 0, url: kurl }
}),

filter: {}
}