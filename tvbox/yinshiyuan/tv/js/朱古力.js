var rule = {
    title:'朱古力',
    host:'https://pigav.com',
    url:'/fyclass/page/fypage',
    searchUrl: 'https://pigav.com/page/fypage?s=**',
    headers:{
        'User-Agent':'MOBILE_UA'
    },
    timeout:5000,
    //class_parse: '#menu-main-menu&&li;a&&Text;a&&href;https://pigav.com/(.*?)',
    //通配符匹配.*/(.*?).html
			//cate_exclude:'升级 VIP|地址发布',//排除分类
    class_name:'最新&最新AV&熱門&每日&最新AV&熱門&每日&新作&朱古力AV&A片&AV&朱古力AV&A片&AV&無碼&無碼&流出&AV&無碼&流出&AV&亞洲&國產AV&台灣AV&素人AV&國產AV&台灣AV&素人AV&A片&精選&素人&熱門&精選&素人&熱門',//静态分类名称拼接
    class_url:'最新av線上看&最新av&熱門av線上看&每日av線上看&最新av&熱門av線上看&每日av線上看&新作上市&朱古力av&a片&av影片&朱古力av&a片&av影片&無碼av線上看&無碼av線上看&流出版av線上看&av&無碼av線上看&流出版av線上看&av&亞洲av線上看&國產av線上看&台灣av&素人av線上看&國產av線上看&台灣av&素人av線上看&a片&精選av線上看&素人av線上看&熱門av線上看&精選av線上看&素人av線上看&熱門av線上看',//静态分类标识拼接
    limit:5,
    play_parse:true,
    lazy:'',
    一级:'.block-content&&article;a&&title;span&&data-bgsrc;.absolute.bottom-1&&Text;a&&href',
    二级:'*',
}
