/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: '旋风视频',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    类型: '影视',//影视|听书|漫画|小说
    title: '旋风视频',
    host: 'https://miao101.com/',
    url: '/tag/fyfilter',
    searchUrl: '/search?q=**',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: 'H4sIAAAAAAAAA52Ty07CQBSG36VrnoBXMSxYsFLZaWJME4VwaUkEvFRRohuwgMSCBJVCeZq2U97C1k7/OcedLL8z30z/c2Z6ronbZeDNtfzBuXZYOtPympivg+eWltPKxeMS5dPi0UnpVyzH5cAc+V5fGI1khbGek4bVDwybGODMEM15WK0pQzEMuxus1sQA4yvDBjMUw6hf73pjYoAzI7zshBeWMhTDqJph5ZEYYBiVqbC6xACjF9MR3oT0AkZScxRu3thMJcMwbDYxxcjRfPBdg+QAI4c7Cbw7kgOsF/RCLnkRkV2PT97jUTx5vmsnW2U8cPbx3Wsv/HaUoRjGyzjeRgwwWpzaYnulDMUYU3sWrrYkBxhn3A/D/pScAYaxmLEciuWY1pvIcPeY0cDe9epyt4xHSyRh3DrzWAlePL72jHu0xKfGPVpKu0qf3N43n+5ml5+WeFrmsRLvnnu09OctMI+W4C2/goHFPVpKu/e9m6jy8f/uo8+F6FTluRLwuznvak0C1rwuWUsBiS0nctyg1srigpOs+g/OiiFXugUAAA==',
    filter_url: '{{fl.类型}}/fypage',
    filter_def: {
        电影: {类型: '动作片'},
        电视剧: {类型: '国产剧'},
        综艺: {类型: '大陆综艺'},
        动漫: {类型: '国产动漫'},
        体育: {类型: '足球'}
    },
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    timeout: 5000,
    class_name: '电影&电视剧&综艺&动漫&体育',
    class_url: '电影&电视剧&综艺&动漫&体育',
    cate_exclude: '',
    play_parse: true,
    lazy: $js.toString(() => {
        input = {parse: 1, url: input, js: ''};
    }),
    double: false,
    推荐: '*',
    一级: '.g-2&&div.col-6;.card-title--span&&Text;img&&src;.sub&&Text;a&&href',
    二级: {
        title: 'h6&&Text;.row.mb-3:eq(1)&&.badge&&Text',
        img: 'img&&src',
        desc: '.row.mb-3:eq(1)&&.sub&&Text;.row.phone&&.flex-grow-1&&p:eq(3)&&Text;.row.phone&&.flex-grow-1&&p:eq(4)&&Text;.row.phone&&.flex-grow-1&&p:eq(1)&&Text;.row.phone&&.flex-grow-1&&p:eq(2)&&Text',
        content: '.text-break&&Text',
        tabs: '',
        lists: $js.toString(() => {
            let srcHtml = pdfh(html, '#container&&script&&Html');
            //log(srcHtml);
            let data = {};
            eval(srcHtml + '\ndata=vo;');
            // log(data);
            let list1 = data.clips.map(i => i.join('$'));
            LISTS = [list1];
        }),
        tab_text: 'body&&Text',
        list_text: 'body&&Text',
        list_url: 'a&&href',
        list_url_prefix: '',
    },
    搜索: '*',
}