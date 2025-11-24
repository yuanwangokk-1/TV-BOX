/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 0,
  title: '达达龟',
  '类型': '影视',
  lang: 'ds'
})
*/


var rule = {
    title:'达达龟',
    模板:'首图2',
    host:'https://www.dadagui.me',
    url:'/vodtype/fyclass-fypage.html',
    searchUrl: '/rss.xml?wd=**',
    class_parse: '.stui-header__menu li:gt(0):lt(5);a&&Text;a&&href;.*/(.*?).html',
    lazy: $js.toString(() => {
        let js = 'try{function requestApix(callback){$.post(\"api.php\",{vid:getQueryString(\"vid\")},function(result){callback(result.data.url);},\"json\");}requestApix(function(data){location.href=sign(data);})}catch(e){}location.href=document.querySelector(\"#playleft iframe\").src;';
        input = {
            parse: 1,
            url: input,
            click: js,
            js: js
        };
    }),
    搜索: $js.toString(() => {
        let html = post(input.split('?')[0], {body: input.split('?')[1]});
        let items = pdfa(html, 'rss&&item');
        // log(items);
        let d = [];
        items.forEach(it => {
            it = it.replace(/title|link|author|pubdate|description/g, 'p');
            let url = pdfh(it, 'p:eq(1)&&Text');
            d.push({
                title: pdfh(it, 'p&&Text'),
                url: url,
                desc: pdfh(it, 'p:eq(3)&&Text'),
                content: pdfh(it, 'p:eq(2)&&Text'),
                pic_url: "",
            });
        });
        setResult(d);
    }),
    二级: {
      title: '.stui-content__detail .title&&Text;.stui-content__detail p:eq(3)&&Text',
      img: '.lazyload&&data-original||data-src||src',
      desc: '.module-info-item:eq(-2)&&Text;.stui-content__detail p:eq(2)&&Text;.stui-content__detail p:eq(0)&&Text;.module-info-item:eq(2)&&Text;.module-info-item:eq(1)&&Text',
      content: '.detail&&Text',
      tabs:'.stui-vodlist__head h3',
      lists:'.stui-content__playlist:eq(#id)&&li'
    },
    
}