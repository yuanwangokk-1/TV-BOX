var rule = {
    title: '橘子柚[盘]',
    host: 'https://juziyou.vip/',
    url: '/vodshow/fyclass--------fypage---.html',
    //url: '/index.php/vodshow/fyfilter.html',
    searchUrl: 'https://juziyou.vip/vodsearch/**----------fypage---.html',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,//是否启用分类筛选,

    filter_def: {
        20: {cateId: '21'},
        21: {cateId: '22'},
        23: {cateId: '23'},
        22: {cateId: '24'}
    },
    headers: {
        'User-Agent': 'MOBILE_UA'
    },
    class_parse: '.navbar-items&&li;span&&Text;a&&href;.*/(.*?).html',
    cate_exclude: '今日|热榜',
    play_parse: true,
    //推送阿里播放  支持影视壳
    lazy: `js:
    var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
    var url = html.url;
    if (url.includes("www.alipan.com") || input.includes("www.aliyundrive.com")){
    input = 'push://'+url.trim();
    }
  `,
    limit: 6,
    推荐: '.module-main;.module-items&&.module-poster-item;a&&title;img&&data-original;.module-item-note&&Text;a&&href',
    double: true,
    一级: '.module-items&&.module-poster-item;a&&title;img&&data-original;.module-item-note&&Text;a&&href',
    二级: {
        title: '.module-info-heading&&h1',
        img: '.module-item-pic&&img&&data-original',
        desc: ';.module-info-item-content:eq(2)&&Text;.module-info-tag-link:eq(1)&&Text;.module-info-item-content:eq(1)&&Text;.module-info-item-content:eq(0)&&Text',
        content: '.module-info-introduction-content&&Text',
        tabs: '.module-tab-item',
        lists: '.module-play-list-content&&a',
    },
    搜索: '.module-items .module-card-item;img&&alt;img&&data-original;.module-item-note&&Text;a&&href',
}