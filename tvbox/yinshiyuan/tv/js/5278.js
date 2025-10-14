var rule = {
    title:'5278',
    host:'https://5278.cc/',
	searchUrl:'/cn/search/**',
    url:'forum.php?mod=forumdisplay&fid=23&filter=typeid&typeid=fyclass&page=fypage',
    headers:{
        'User-Agent':'MOBILE_UA'
    },
    timeout:5000,
    class_name:'自拍',//静态分类名称拼接
    class_url:'1357',//静态分类标识拼接
    limit:5,
    play_parse:true,
    lazy:'',
    一级:'#waterfall&&li;a&&title;img&&src;.auth.cl&&div,1&&Text;a&&href',
    二级:'*',
	搜索:'.gap-5&&.thumbnail;.text-secondary&&Text;img&&data-src;span&&Text;a&&href',
	searchable:1,//是否启用全局搜索,
    quickSearch:1,//是否启用快速搜索,
    filterable:0,//是否启用分类筛选,
}

