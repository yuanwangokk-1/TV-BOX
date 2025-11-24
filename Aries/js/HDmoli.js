/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: 'HDmoli',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    title: 'HDmoli',
    host: 'https://www.hdmoli.pro',
    url: '/search.php?page=fypage&searchtype=5&tid=fyfilter',
    searchUrl: '/search.php?page=fypage&searchword=**&searchtype=',
    searchable: 2,
    quickSearch: 0,
    "filterable": 1,
    "filter": "H4sIAAAAAAAAA+2X3W4SQRTH32WviWV3+WzCk5herGETUT4iUmPTNNFiKVBDaaPgB9GrBtq0ttiGCIh9mZ3d8hbuMmdnzkwm8cJ6Y/by//+dGWbOnjMnbGu6tv5wW3tqb2nrmjeeky8HWkwrWyUb6xdWcdNeBZYF2xfaToy6pD1yFgNwk8z2mmO3vgd2itvDIzKdg51mtvu6677qgZ3hdvODM2uBneU/2RuQ1hBsPc43n52RxXuvtR8inS9pDflxdIMvaV96izPwzTi+lfcuPKfpx28EhKaL7QXp4nsL6RJ+Un2lJ89yoJWJCDDVymv4GLQy6T4GzVZ/m5DZBVpNNb/zmNz2EaaaHW333OsdoaNRrayD1eqVZvhkn3/4AFPNcON4+fEUYaoZ7jTI4XeEqWZHq7fd3U/oaFSHePn12pl2OQatrMkga1QrSyTAVIf47rbrX5Vj0MpaDU5OtVBPgyvydobqKdRSPTFbaL+90bI+kl3vV4d8XoBrVW0rBw5PyakUAA671sFYCgCH5bx/4g7OcQA4LOD6StoBnDDA+XEhBYDD7zZx5j0cAI6QvemNM1+g7IVayh6z/5w9I24kwNuyrWpupRE0JWhiaEjQwFCXoI5hXIJxBPWsCPUshhkJZjBMSzCNYUqCKQyTEkxiKGVIxxnSpQzpPEOlStXGcKXx93Q7x2R2yL8n0+L35LbwuvYny/4NuJVq3q7magV/G1bVl29IsyHwfGXzkVUOjrAR04z7mopBu/ERlRT6jvsp3E3IN4U2ZL6ZUPcOyn3QYize4EXizX/etcLHw8yqW8zMRHMumnPRnIvmXDTn/u85l8B///6qL4X2WCsVC89ra4Vy3n6ZMB48rpWK6iIXAk0IjEZPNHr+1eiJHs/o8byfx3PnN0dky8c8EwAA",
  "filter_url": "{{fl.类型}}&{{fl.剧情}}&{{fl.地区}}&{{fl.年份}}&{{fl.排序}}",
  "filter_def": {
    "1": {
      "类型": "1"
    },
    "2": {
      "类型": "2"
    },
    "41": {
      "类型": "41"
    }
  },
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    class_parse: '.myui-header__menu li;a&&Text;a&&href;index(\\d+)\.html',
    play_parse: true,
    lazy: '',
    limit: 6,
    推荐: 'ul.myui-vodlist.clearfix;li;a&&title;a&&data-original;.pic-text&&Text;a&&href',
    double: true,
    一级: '.myui-vodlist li;a&&title;a&&data-original;.pic-text&&Text;a&&href',
    二级: {
        title: '.myui-content__detail .title&&Text;.myui-content__detail p:eq(-2)&&Text',
        img: '.myui-content__thumb .lazyload&&data-original',
        desc: '.myui-content__detail p:eq(0)&&Text;.myui-content__detail p:eq(1)&&Text;.myui-content__detail p:eq(2)&&Text',
        content: '.content&&Text',
        tabs: '.nav-tabs:eq(0) li',
        lists: '.myui-content__list:eq(#id) li',
    },
    搜索: '#searchList li;a&&title;.lazyload&&data-original;.pic-text.text-right&&Text;a&&href;.detail&&p:eq(3)&&Text',
}