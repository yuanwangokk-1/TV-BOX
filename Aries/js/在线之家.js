var rule = {
    title: '在线之家',
    host: 'https://www.zxzjys.com',
    //域名
    url: '/list/fyclass-fypage.html',
    //分类url
    homeUrl: '/list/fyclass.html',
    //主页url
    searchUrl: '/vodsearch/-------------.html?wd=**&submit=',
    //搜索url
    searchable: 2,
    quickSearch: 1,
    filterable: 1,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.97 Safari/537.36 SE 2.X MetaSr 1.0',
    },
    //请求头
    class_name: '电影&美剧&韩剧&日剧&泰剧&动漫',
    //分类: '电影&美剧&韩剧&日剧&泰剧&动漫',
    class_url: '1&2&3&4&5&6',
    //分类值: '1&2&3&4&5&6',
    推荐: '*',
    //推荐: '数组;标题;图片;副标题;链接',
    一级: '.stui-vodlist__box;a&&title;a&&data-original;.pic-text.text-right&&Text;a&&href',
    //一级: '数组;标题;图片;副标题;链接',
    二级: {
        title: 'h1&&Text;p:contains(类型)&&Text',
        img: '.detail-pic&&data-src',
        desc: 'p:contains(状态)&&Text;p:contains(年份)&&Text;p:contains(地区)&&Text;p:contains(主演)&&Text;p:contains(导演)&&Text',
        content: '.detail-sketch&&Text',
        tabs: 'body&&h3',
        tab_text: 'h3&&Text',
        lists: '.stui-content__playlist&&li',
        list_text: 'Text',
        list_url: 'a&&href',
    },
    /*二级: {
        title: '标题;类型',
        img: '图片链接',
        desc: '主要信息;年代;地区;演员;导演',
        content: '简介',
        tabs: '线路数组',
        tab_text: '线路标题',
        lists: '播放数组',       
        list_text: '播放标题',
        list_url: '播放链接',
    },*/
    搜索: '.stui-vodlist__box;a&&title;a&&data-original;pic-text.text-right&&Text;a&&href',
    //搜索: '数组;标题;图片;副标题;链接',
}