/*
@header({
  searchable: 0,
  filterable: 1,
  quickSearch: 0,
  title: '策驰影院',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    模板: '自动',
    title: '策驰影院',
    host: 'https://www.cecidy.cc',
    url: "/vodshow/fyfilter/",
    class_parse: ".nav-list&&li:lt(6);a&&Text;a&&href;/(\\d+)/",
    filterable: 1,
  filter: "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",
  filter_url: "{{fl.类型}}-{{fl.地区}}-{{fl.排序}}-{{fl.剧情}}-{{fl.语言}}-{{fl.字母}}---fypage---{{fl.年份}}",
  filter_def: {
    1: {
      类型: "1"
    },
    2: {
      类型: "2"
    },
    3: {
      类型: "3"
    },
    4: {
      类型: "4"
    },
    60: {
      类型: "60"
    }
  },
    searchUrl: '/rss.xml?wd=**',
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
}