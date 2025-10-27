var rule = {
  title: '夸克影视[优]',
  host: 'https://www.quarktv.com/',
  url: 'https://www.quarktv.com/category/fyclass/page/fypage',
  searchUrl: '/?s=**',
  class_parse: `.site-nav li:gt(0):lt(10);a&&Text;a&&href;.*/category/(.*/?)`,
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
  headers: {
    'User-Agent': 'MOBILE_UA',
  },
  play_parse: true,
  lazy: $js.toString(() => {
    let html = request(input);
    let url = input.startsWith('push://') ? input : 'push://' + input;
    input = {parse: 0, url: url};
  }),
  limit: 6,
  double: true,
  推荐: '.content;.excerpt;*;*;*;*',
  一级: '.content .excerpt;img&&alt;img&&data-src;.meta&&Text;a&&href',
  二级: {
    title: 'h1&&Text',
    img: '.cover img&&src',
    desc: '.article-meta&&Text;;;;',
    content: '.intro&&Text',
    tabs: "js:TABS=['下载']",
    lists: '.ul-pans li:last-child',
  },
  搜索: '*',
};
