/*
@header({
  searchable: 1,
  filterable: 1,
  quickSearch: 1,
  title: '歪片星球[资]',
  author: '小可乐/2408/第一版',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
author: '小可乐/2408/第一版',
title: '歪片星球[资]',
类型: '影视',
host: 'https://waipian14.com',
hostJs: '',
headers: {'User-Agent': 'MOBILE_UA'},
编码: 'utf-8',
timeout: 5000,

homeUrl: '/',
url: '/show-fyclass-fyfilter',
filter_url: '{{fl.area}}-{{fl.by}}-{{fl.class}}--{{fl.letter}}---fypage---{{fl.year}}',
detailUrl: '',
searchUrl: 'https://soupian.one/movie/**?page=fypage',
searchable: 1,
quickSearch: 1,
filterable: 1,

class_name: '电影&剧集&综艺&动漫&短剧&纪录&Netflix',
class_url: 'dianying&juji&zongyi&dongman&duanju&jilupian&netflix',
filter_def: {},

play_parse: true,
lazy: `js:
let kcode = JSON.parse(request(input).match(/var player_.*?=(.*?)</)[1]);
let kurl = unescape(kcode.url);
kurl = kurl.split('&')[0];
if (/\\.(m3u8|mp4)/.test(kurl)) {
    input = { jx: 0, parse: 0, url: kurl }
} else {
    input = { jx: 0, parse: 1, url: input }
}
`,

limit: 9,
double: false,
推荐: '*',
一级: '.module-item:has(.module-item-note);img&&alt;img&&data-src;.module-item-note&&Text;a&&href',
二级: {
title: 'h1&&Text;.module-info-tag-link:eq(2)&&Text',
img: '.module-info-poster&&img&&data-src',
desc: '.module-info-item:eq(-1)&&Text;.module-info-tag-link:eq(0)&&Text;.module-info-tag-link:eq(1)&&Text;.module-info-item-content:eq(1)&&Text;.module-info-item-content:eq(0)&&Text',
content: '.module-info-introduction-content&&Text',
tabs: '.tab-item span',
tab_text: 'body&&Text',
lists: '.module-play-list:eq(#id)&&a',
list_text: 'body&&Text',
list_url: 'a&&href',
},
搜索: `js:
VODS = [];
let klists = pdfa(request(input),'.list-row-text:contains(歪片星球)');
klists.forEach((it) => {
    let kid = HOST + pdfh(it, 'h4&&a:eq(0)&&href').match(/com(.*?)\\?/)[1];
    let kpic = pdfh(request(kid), '.module-info-poster&&img&&data-src');
    VODS.push({
        vod_name: pdfh(it, 'h4&&span&&Text'),
        vod_pic: kpic,
        vod_remarks: pdfh(it, 'p:eq(0)&&Text'),
        vod_id: kid,
        vod_content: ''
    })
})
`,

filter: 'H4sIAAAAAAAAA+2ZW08bRxTH3/0x9plKu6S5NG+535v7XVHlFjc1IW4VoK2DkAwON2PAQYDj1ARSMGCEwZQWgYntL+O9fYuuPWf+M06RgxAPFM2b/7+zOztnPD7nv+Mun9YS9IfCwdBz7fRTX5f2IhDWTms/tPnb27UmLeR/GfCkObRoRfs8/au/rdMDT7u0UBX3LbnRpSr2hNbdRBQXC4HYVNojPMYEYrGlSjHNY0zwmD24LsYkgdjiW3N7h8eYkMa0J3bEmFXBY1bvij31lmIkEIvGrN73PMYEYj0JKzLFY0xgLrE1u7jM58IE5pKIWxHkzgRio/3m2F88xgSeN/iuUhjiz2MC92UGRO4kEOsfd1NZHmMC8+wpue9LfJ5M4Hm5hUpplj+PCYw5Nu/M4btlAmPO5OyhAT4mEzz2baDjx7bg7xTkqvtZdxO2nP9VwC/tuHTejBf2uOMqWznzj6I5v+im+ilWh+qvcxdS1tZa3XWEPhtvLG9tl+rHYwgZl0Y9yDNmgsfcmayIkcAKJzNWeoWvMBOIbeTFfSQQm8qbsVlz+iMPQ+Op2RVrOuNkypUC3711CN/jSN4sLPDvkQkec4bXxQxIiNlNyrOblGPeVKzhsrfk+LlxjXUtv7GLSWsKiw+N8Usb3g3mYFbMvw7V7ZhwwP9K7Bgruekm/97jjmnWm78mVvso8WOCH5N5s+DNMjcEN2SuC65L3PgG3Pso8VOCn5L5ScFPyvyE4Cdkflzw4zIX+RpyvobI15DzNUS+hpyvIfI15HwNka8h56uLfHU5X13kq8v56iJfXc5XF/nqcr66yFeX89VFvt7Hun3TFujoCEg7x8wlrbWRPe6cMwTOgJwlchbkHJFzIOeJnAe5QOQCyEUiF0EuEbkEcpnIZZArRK6AXCVyFeQakWsg14lcB7lB5Iao2bxag9wkchPkFpFbILeJ3Aa5Q+QOyF0id0HuEbkHcp/IfZAHRB6APCTyEOQRkUcgj4k8BnlC5AmI/hXfpNVPdXvl+7BUYUbHzcLYf/aJKDye6Ah6l6KapSPmPK9jPwU72kXniObc5JIU+a7FH5aj1nhOjv4WCLyQ24BotLUi6E3Z96zJp7V2tgaPoo1TVu1grZobLZpbvdwgMCHWs89KrWE9awJjrm6aBb4xSUj2T+wJEkfb/u3X4jWyjQ3N15fMER8jU7bHPPud4sNA78VkNrKGB2BAlYFTBk4ZOGXglIHbzcC9/jn0PHxgFs6d2ahsJ9CgakJYh7gz+AHWoSbQQMoJz7jx7sEEUkvPVAoFezHC+xe0aH191tYWWl9NSK3PnZsRra8qjrZJ2K8R2NVcqOapmqdqnqp5qua5W/Ns8ZrnS3/oKB6A/F/+x2p4ALLPQw7lC754QKB8gfIFyhcoX6B8wa6+oNMfau08KFvQ6JzbjfQ7f/IpksB9E2lzlZ/Vk0BRTyWsnmFe1JnAfdmysxnj9zGB5w2M2BP8dZoEYg3O+O3RfGVnzlmKSGZERmjZDf5D8Lq7ncEBAhMYP/PBjMPKMCHFnPVlEasKrMNmnxNFc2MCsUTcXJ3mMSYwz/mRyg7/7kngvn/emdkyv48JsQ5vJMvFhLTdnI845WDi0DRaVbhV4T76hbs12Nb5S/Dg3ugqn2ad1TxREighDf7WtQvLZnGSlwIm1NtJ3dvJYSmM6g1EvYGoRqYamXaoGlmI2oLUx1SRVEVSFUlVJFWRrBVJX/e/EuhLTIo0AAA='
}