var rule={
    title: 'javmp', // 网站的标题
    host: 'https://javmap.com/', // 网站的根域名
    url: 'https://javmap.com/e/action/ListInfo/index.php?page=fypage&classid=fyclass', // 基本的URL模式，用于浏览分类
    searchUrl: 'https://777090.xyz/page/fypage/?s=**', // 搜索URL模式
   // class_name: '厕所抄底&国产精选&探花約炮&日韩影片&欧美专区&无码素人&丝袜美腿', // 分类名称
   // class_url: '厕所抄底&国产精选&探花約炮&日韩影片&欧美专区&无码素人&丝袜美腿',
               class_parse: 'body&&.sidebar-nav&&ul&&a;a&&Text;a&&href;.*/(.*?)/',
  cate_exclude: '明星|主|全部分',             
    searchable: 2, // 是否可以搜索，2表示可以
    quickSearch: 0, // 是否启用快速搜索
    filterable: 0, // 是否可以过滤
    headers: {
        'User-Agent': 'MOBILE_UA', // 模拟手机访问
      //  'Referer': 'https://777090.xyz/' // 引用页
    },
    // 解析推荐内容
    推荐: 'body&&.wrapper&&.th-image;img&&alt;img&&src;a&&Text;a&&href',
    // 解析一级内容
    一级:  '.videos-list .loop-video;img&&alt;img&&data-src;a&&Text;a&&href',
    二级: '*', // 留空或用*表示不需要二级解析
    搜索: '*' // 搜索结果的解析规则
}