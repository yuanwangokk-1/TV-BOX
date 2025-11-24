/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: '可可影视[优]',
  '类型': '影视',
  lang: 'dr2'
})
*/

var rule = {
    title: '可可影视[优]',
    host: 'https://www.keke1.app',
    //host: 'https://www.kkys01.com',
    url: '/show/fyclass-----2-fypage.html',
    //url: '/show/fyclass-fyfilter-fypage.html',
    searchUrl: '/search?k=**&page=fypage',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    class_parse: '#nav-swiper&&.nav-swiper-slide;a&&Text;a&&href;/(\\w+).html',
    cate_exclude: 'Netflix|今日更新|专题列表|排行榜',
    tab_exclude:'可可影视提供',
    tab_order: ['超清', '蓝光', '极速蓝光'],
    tab_remove:['4K(高峰不卡)'],
    play_parse: true,
	    lazy: $js.toString(() => {
        input = {
            parse: 1,
            url: input,
            js: 'document.querySelector("#my-video video").click()',
        }
    }),
    limit: 20,
    推荐: '.section-box:eq(2)&&.module-box-inner&&.module-item;*;*;*;*',
    double: false,
    一级: '.module-box-inner&&.module-item;.v-item-title:eq(1)&&Text;img:last-of-type&&data-original;.v-item-bottom&&span&&Text;a&&href',
    二级: {
        title: '.detail-pic&&img&&alt;.detail-tags&&a&&Text',
        img: '.detail-pic&&img&&data-original',
        desc: '.detail-info-row-main:eq(-2)&&Text;.detail-tags&&a&&Text;.detail-tags&&a:eq(1)&&Text;.detail-info-row-main:eq(1)&&Text;.detail-info-row-main&&Text',
        content: '.detail-desc&&Text',
        tabs: '.source-item-label',
        //tabs: 'body&&.source-item-label[id]',
        lists: '.episode-list:eq(#id) a',
    },
    搜索: '.search-result-list&&a;.title:eq(1)&&Text;*;.search-result-item-header&&Text;a&&href;.desc&&Text',
    图片替换:'https://www.keke1.app=>https://vres.cfaqcgj.com',
    // 预处理: $js.toString(() => {
    //     let html = request(rule.host);
    //     let scripts = pdfa(html, 'script');
    //     let img_script = scripts.find(it => pdfh(it, 'script&&src').includes('rdul.js'));
    //     if (img_script) {
    //         let img_url = img_script.match(/src="(.*?)"/)[1];
    //         //console.log(img_url);
    //         let img_html = request(img_url);
    //         let img_host = img_html.match(/'(.*?)'/)[1];
    //         log(img_host);
    //         rule.图片替换 = rule.host + '=>' + img_host;
    //     }
    // }),
    
}