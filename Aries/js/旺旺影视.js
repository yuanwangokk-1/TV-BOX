/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 0,
  title: '旺旺影视',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    title: '旺旺影视',
    host: 'https://www.wwgz.cn',
    url: '/vod-list-id-fyclass-pg-fypage-order--by-time-class-0-year-0-letter--area--lang-.html',
    searchUrl: '/index.php?m=vod-search&wd=**',
    headers:{//网站的请求头,完整支持所有的,常带ua和cookies
    'User-Agent':'MOBILE_UA',
    },
    searchable: 2,
    quickSearch: 0,
    timeout: 5000,
    class_parse: '.topnav li;a&&Text;a&&href;/vod-type-id-(\\d+)-pg-1.html',
    cate_exclude: '音乐',
    double: false,
    推荐: '.globalPicList li:has(.pic);a&&title;img&&data-src;.sBottom--em&&Text;a&&href;.sBottom--em&&Text',
    一级: '.globalPicList li:has(.pic);a&&title;img&&src;.sBottom--em&&Text;a&&href',
     二级: {
        title: '.mod-media-page h1&&Text;h1&&Text',
        img: 'img&&src',
         desc: '.desc_item:eq(0)&&Text;.detail-con span&&Text;h1&&Text;.desc_item:eq(1)&&Text;.desc_item:eq(2)&&Text',
        content: '.detail-con p&&Text',
        tabs: '.hd',
        lists: '.numList:eq(#id) li',
            },
    play_parse: true,
    lazy: $js.toString(() => {
        input = {
            parse: 1,
            url: input,
            js: 'document.querySelector("#player video").click()',
        }
    }),
    搜索: '.ulPicTxt li;.txtHeight .sTit&&Text;.lazyload&&data-src;;.pBottom a&&href;',
	搜索验证标识:'系统安全验证',
	searchNoPage:1,
}