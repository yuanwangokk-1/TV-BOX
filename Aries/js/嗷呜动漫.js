/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 0,
  title: '1',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule ={
            title: '1',
            host: 'https://www.aowu.tv/',
            url: '/vodshow/fyclass--------fypage---/',
            searchUrl: '/vodsearch/**----------fypage---/',
            class_parse: '.head-nav li;a&&Text;a&&href;.*/(.*?)/',
            searchable: 2,
            quickSearch: 0,
            filterable: 0,
            headers: {
                'User-Agent': 'MOBILE_UA',
            },
            play_parse: true,
            lazy: '',
            limit: 6,
            推荐: '.flex;.public-list-box;a&&title;.lazy&&data-src;.ft2&&Text;a&&href',
            double: true,
            一级: 'ul.vodlist li;a&&title;a&&data-original;.pic_text&&Text;a&&href',
            二级: {
                title: 'h3&&Text;.detail_list&&ul:eq(1)&&li&&a:eq(2)&&Text',
                img: '.vodlist_thumb&&data-original',
                desc: '.content_detail&&li:eq(1)&&Text;.detail_list&&ul:eq(1)&&li&&a&&Text;.detail_list&&ul:eq(1)&&li&&a:eq(1)&&Text;.detail_list&&ul:eq(1)&&li:eq(2)&&Text;.detail_list&&ul:eq(1)&&li:eq(3)&&Text',
                content: '.content_desc&&span&&Text',
                tabs: '.nav-tabs a&&href',
                lists: '.stui-content__playlist:eq(#id) a',
            },
            搜索: '*',
        }