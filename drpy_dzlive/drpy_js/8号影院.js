Object.assign(muban.首图2.二级, {
    tabs: '.stui-pannel__head h3',
});
var rule = {
    模板: '首图2',
    title: '8号影院',
    host: 'http://www.bahaoys.com',
    url: "/frim/fyfilter.html",
    filterable: 1,//是否启用分类筛选,
    filter_url: "{{fl.按分类}}-fypage",
    tab_exclude: '本周热门|最近更新',
    filter: "H4sIAAAAAAAAA6tWMlSyiq5Wyk6tVLJSetbT+bSj7fnG3Uo6SnmJualoQmWJOaWpYOV5QJmnXSue7J3zvLMdJAPkmyrV6kBknndsfNbcipAxQ8gsn/h0526EjDlc5lnjhGcN0xAyFnCZp9PmPO1cjpAxNEBIdS5HscjQSKk2tjZWR8mIbE/N3vtk13KguTATjREu3LH+af8GJCkThNSa5c/39SFJIcLi2fSlL+evRJIygzrRmHQngvWZkKWvFgCFYy+16QEAAA==",
    filter_def: {
    1: {
      按分类: "1"
    },
    2: {
      按分类: "2"
    },
    3: {
      按分类: "3"
    },
    4: {
      按分类: "4"
    }
  },
    searchUrl: '/search.php?page=fypage&searchword=**   &searchtype=',
    class_parse: ".stui-tou__menu li;a&&Text;a&&href;.*/(.*?).html",
    lazy: $js.toString(() => {
        let init_js = `Object.defineProperties(navigator, {platform: {get: () => 'iPhone'}});`;
        input = {
            parse: 1,
            url: input,
            js: '',
            parse_extra: '&init_script=' + encodeURIComponent(base64Encode(init_js)),
        }
    }),
    搜索: '.stui-vodlist__media&&li;a&&title;.lazyload&&data-original;.text-right&&Text;a&&href',
}