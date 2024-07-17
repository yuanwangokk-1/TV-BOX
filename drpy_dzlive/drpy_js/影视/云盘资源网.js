var rule = {
    title: '云盘资源网',
    host: 'https://res.yunpan.win',
    hostJs: '',
    headers: {'User-Agent': 'MOBILE_UA'},
    编码: 'utf-8',
    timeout: 5000,
    url: '/?PageIndex=fypage&PageSize=12&Keyword=&Type=fyclass&Tag=',
    filter_url: '',
    detailUrl: '',
    searchUrl: '/?PageIndex=fypage&PageSize=12&Keyword=**&Type=&Tag=',
    searchable: 1,
    quickSearch: 1,
    filterable: 1,

    class_name: '电影&剧集&综艺&动漫',
    class_url: '电影&电视剧&综艺&动漫',
    filter_def: {},

    proxy_rule: '',
    sniffer: 0,
    isVideo: '',
    play_parse: true,
    parse_url: '',
    lazy: `
if (/(pan.quark.cn|www.aliyundrive.com|www.alipan.com)/.test(input)){
let type="ali";
if (input.includes("pan.quark.cn")){
type="quark";
} else if (input.includes("www.aliyundrive.com") || input.includes("www.alipan.com")){
type="ali";
}
let confirm="";
//let confirm="&confirm=0";
input = getProxyUrl().replace('js',type)+'&type=push'+confirm+'&url='+encodeURIComponent(input);
}`,

    limit: 9,
    double: false,
//列表;(true双层列表);标题;图片;描述;链接;详情(可不写)
    推荐: '*',
//列表;标题;图片;描述;链接;详情(可不写)
    一级: '.col;h5&&Text;img&&src;.card-text--span:eq(-2)&&Text;a:eq(-1)&&href',
    二级: {
//名称;类型
        "title": "h5&&Text;.card-text--span:eq(-2)&&Text",
//图片
        "img": "img&&src",
//主要描述;年份;地区;演员;导演
        "desc": ".card-text:eq(2)&&Text;;;;",
//简介
        "content": ".card-text:eq(0)&&Text",
//线路数组
        "tabs": "js:TABS = ['阿里网盘']",
//线路标题
        "tab_text": "",
//播放数组 选集列表
// "lists": ".card-footer:eq(#id)&&.float-end",
        lists: $js.toString(() => {
            LISTS = [];
            //log(input);
            let lists1 = pdfa(html, '.card-footer&&.float-end').map(it => {
                let _tt = pdfh(it, 'a&&Text');
                let _uu = pdfh(it, 'a&&onclick').match(/open\('(.*?)'/)[1];
                return _tt + '$' + _uu
            });
            LISTS.push(lists1);
        }),
    },

//列表;标题;图片;描述;链接;详情(可不写)
    搜索: '*',

    filter: {}

}