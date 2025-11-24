/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: 'NT动漫[漫]',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    类型: '影视',//影视|听书|漫画|小说
    title: 'NT动漫[漫]',
    host: 'http://www.ntdm9.com/',
    url: '/type/fyclass-fypage.html',
    class_name: '日本&中国&欧美',
    class_url: 'riben&zhongguo&omei',
    searchUrl: '/search/**----------fypage---.html',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: '',
    filter_url: '',
    filter_def: {},
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    timeout: 5000,
    class_parse: '#side-menu li;a&&Text;a&&href;/(.*?)\.html',
    cate_exclude: '',
    play_parse: true,
    lazy: $js.toString(() => {
        input = {parse: 1, url: input, js: ''};
    }),
    double: true,
    推荐: '.blockcontent;ul.ul_li_a5&&li;.anime_icon1_name&&Text;*;.anime_icon1_name1&&Text;*',
    一级: '.blockdif2;.cell_imform_name&&Text;img&&src;.newname&&Text;a&&href;.cell_imform_desc&&Text',
    二级: {
        title: 'h4&&Text;.baseblock2&&li:eq(-1)&&Text',
        img: 'img&&src',
        desc: '.baseblock2&&li&&Text;.baseblock2&&li:eq(-2)&&Text;.baseblock2&&li:eq(2)&&Text;;',
        content: '.detail_imform_desc_pre&&p&&Text',
        tabs: 'ul.title&&li',
        lists: '.movurl:eq(#id)&&a',
        tab_text: 'body&&Text',
        list_text: 'body&&Text',
        list_url: 'a&&href',
        list_url_prefix: '',
    },
    搜索: '*',
}