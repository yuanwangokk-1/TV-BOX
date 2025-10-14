var rule = {
    title:'youjizz',
    host:'https://www.youjizz.com',
    url:'fyclassfypage.html?country=cn',
    searchUrl: 'https://pigav.com/page/fypage?s=**',
    headers:{
        'User-Agent':'MOBILE_UA'
    },
    timeout:5000,
    class_name:'最新&🔥热门🔥&人气排行&趋势&分类',//静态分类名称拼接
    class_url:'/newest-clips/&/most-popular/&/top-rated/&/trending/&/categories/japanese-',//静态分类标识拼接
    limit:5,
    play_parse:true,
    lazy:'',
    一级:'#content&&.video-thumb;.video-title&&Text;img&&data-original;.time&&Text;a&&href',
    二级:'*',
}
