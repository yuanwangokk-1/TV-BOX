/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: '看了么',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    类型: '影视',//影视|听书|漫画|小说
    title: '看了么',
    host: 'https://www.ksksn.com/',
    url: '/show/fyclassfyfilter',
    searchUrl: '/ch/page/fypage/wd/**.html',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: 'H4sIAAAAAAAAA+2Z607bSBTH3yWfkYLp9rL7Kqt+SNtI7S7tSkArsRUSuZKEbBJYSJom0CIuCSm5QUlDguFlMmP7LdbOmRyPj5ESS5UWJH9C+Z2/zsycGc/fx3wMvFoN/Pb7x8CfYfNvILQUDgXmAu9Cb8PmL1btsOzA/P0htPg+PJa9s3CibsTqFjZ/BNbmgI76TVZR2VHNKCdFLGilCzoCTrVxUub99h1qESC58x1+dXNXbghM1NpNzoQOnUATBS8d8+qZQyHQRGF8OaU5BJoo9M0uVQiEo1zsUoVAa88tDZT85WJoeVmqeSqpdYcz1pwVqyxdm4wwzhQUDIuR6vJYwikRDOcZKfD1olMiGA6UqY/UKhkIGA5U22JXQzIQMMySrrnmIhhWtXnCsg2nRDAcKNPWVCIRTJqutjN0TddiKDnecE1XMKxL82R085XUBRhmSW4b5VOSBRhm2W/w1CeSBZiHDeDRM624RSTAUBLL8OhnIgGGpRvmWaJPSgcMD/7eNv907JQIhgMVN/T0gAwEDOuSP9IP6U4DQ0kuyfLnRAIMD8Ntwdw1chiA2RtQ5XtbdAPGTH7IVsOhJekZu/o+GqozPmML8wu/TPJbaYJjIEUf0egjObpAowtyVKFRRY7O0+i8FFV+JVETSNFnNPpMjj6l0ady9AmNPpGjj2n0sRyltVLkWim0VopcK4XWSpFrpdBaKXKtFForRa7VPK2VCeTj8WLVPhw8t80Gedfh4KWeUfo+SfNiNbjyxpSjQQ0GvLMjRV+/WVm2z3E7bl7rUnT55V9LYWsGz+cCKx98/32w/jv9mtPr6y7PE8yLz0R6LJYnF7ezpqzVY4MmmQswD68Lpi2NBmkyF2D2lVvhJbpoYLjozj8uzxPMg6GZjs4PUmTRwFByeqv3MkQCzK7LNzb8QesyZh6sSDve19t7ZCBgXl6ALOM5JAMBm8XQJpLdpKu6gnl405rhBUhTt1znRTB8TmMq60fJ6wIw3399/30A/vu33/8+WP/VD+r8Grdd+AwwnMR2k2dIPyMYZmnd6h3iM4LhBqj/Go2sUyIY3qeJIU8VyH0KDOfS7/MUcXHB7IN8zpoki2DS9hqHX1zvAhazW8EEjxOJYLjB62mttk4ubmA4UCXDy6TPEwwHKn8eXdOeE5h9ki5GV2RFgkkNJcvS/heYl1eXyrm7LQWGOx3JsiqRCIaSeJflD12lsbGHLlj7ts8zJJFgmEVt8cvInQWQI9I51KPnrnNoMVzAZVxvtcnsgfmO7DvyA3DkV299R36ojqzFmkaJfLITDCdR2NfOaOcHDLPsNtyNBzA0BLPIqQoxBGAoOappO5dM7RIVYmnS+gG9p4FhrugZvyAfnQVDSabLbktEAgyXXh24vwUDQ8nXa14kWQRDSWRTS5FFCealF53e/xnNHZdEMJxLrq4VkmQuwOwVHbBKk65ozKTTz/rku7RguKLpn65naeNneHea/jVGy8Xd1QU2i/X7Luy78P134T8W/w8Xnu6D0710nLXoUAhk92q90ZAoAP00Hzy6cTVGgtl+UdfS9H+HwDw0RvpGQ4v3yOs+MPkQFDdoTzlmOJdkZTTYJHMB5uF21Vsdpu7SRnrMft6l519r9/VauxcX19p/tEgC3dIiAAA=',
    filter_url: '{{fl.area}}{{fl.by}}{{fl.class}}/page/fypage{{fl.year}}.html',
    filter_def: {},
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    timeout: 5000,
    class_parse: '.vi-nav li;a&&Text;a&&href;.*/(.*?)\.html',
    cate_exclude: '专题',
    play_parse: true,
    lazy: $js.toString(() => {
        let init_js = `Object.defineProperties(navigator, {platform: {get: () => 'iPhone'}});`;
        input = {
            parse: 1,
            url: input,
            parse_extra: '&init_script=' + encodeURIComponent(base64Encode(init_js)),
        }
    }),
    double: false,
    推荐: '*',
    一级: 'ul.dx-list li;a&&title;a&&data-original;span.vod_remarks&&Text;a&&href',
    二级: {
        title: 'h1&&Text',
        img: '.video-cover&&img&&src',
        desc: '.stui-content__detail p:eq(5)&&Text',
        content: '.vod_content&&Text',
        tabs: 'div.player_info h2',
        lists: 'div.play_li:eq(#id)&&a',
        tab_text: 'body&&Text',
        list_text: 'body&&Text',
        list_url: 'a&&href',
        list_url_prefix: '',
    },
    搜索: '*',
}