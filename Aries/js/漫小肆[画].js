/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 0,
  title: '漫小肆[画]',
  '类型': '漫画',
  lang: 'ds'
})
*/

var rule = {
    类型: '漫画',
    title: '漫小肆[画]',//名称
    host: 'http://www.mxshm.top/',//域名
    class_name: '连载中&已完结',//分类名
    class_url: '0&1',//分类词
    url: '/booklist?tag=%E5%85%A8%E9%83%A8&area=-1&end=fyclass&page=fypage',//分类链接
    searchUrl: 'https://www.mxshm.top/search?keyword=**',//搜索链接
    searchable: 2,//是否启用全局搜索,
    quickSearch: 0,//是否启用快速搜索,
    filterable: 0,//是否启用分类筛选,
    //class_parse: '.myui-header__menu li.hidden-sm:gt(0):lt(5);a&&Text;a&&href;/(\\d+).html',//动态大分类
    //cate_exclude:'',//屏蔽
    play_parse: true,
    lazy: $js.toString(() => {
        let html = request(input);
        let list = jsp.pdfa(html, "#cp_img img").map(v => jsp.pdfh(v, "img&&data-original"));
        let url = html;
        input = {
            //parse: 0,
            url: "pics://" + list.join("&&"),
            js: ''
        };
    }),
    limit: 6,
    推荐: '*',
    double: true, // 推荐内容是否双层定位
    一级: '.manga-list-2 li;a:eq(1)&&Text;.lazy&&data-original;a:eq(2)&&Text;a&&href',
    二级: {
        title: '.detail-main-info&&p&&Text',
        img: '.lazy&&gata-original',
        desc: '.detail-main-info&&p:eq(2)&&Text;.detail-main-info&&p:eq(3)&&Text',
        content: '.detail-desc&&Text',
        tabs: '',
        lists: '#detail-list-select&&li',
        tab_text: '',
        list_text: 'a&&Text',
        list_url: 'a&&href',
        list_url_prefix: '',
    },
    搜索: '.book-list li;a&&title;.lazy&&data-original;span:eq(-1)&&Text;a&&href;span&&Text',
}