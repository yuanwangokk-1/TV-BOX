var rule = {
    author: '',
    title: '花都影视',
    host: 'https://rb.huaduys.org',
    url: '/index.php/vodshow/fyclass--------fypage---.html',
    homeUrl: '/',
    searchUrl: '/vodsearch/**----------fypage---.html',
    searchable: 2,
    quickSearch: 1,
    filterable: 1,
    limit: 30,
    编码: 'utf-8',
    timeout: 5000,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; M2102J2SC Build/TKQ1.221114.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.3 Mobile Safari/537.36'
    },
    class_parse: '.stui-header__menu a;a&&Text;a&&href;/vodtype/(\\d+).html',
    推荐: '*',
    一级: '.stui-vodlist .stui-vodlist__box;h4&&Text;img&&data-original;.pic-tag&&Text;a&&href',
    二级: {
        title: '.stui-vodlist__detail span:eq(0)&&alt;.stui-vodlist__detail span:eq(2)&&Text',
        img: '.col-pd.clearfix img&&data-original',
        desc: '.col-pd.clearfix&&p:eq(8)&&Text;.col-pd.clearfix&&p:eq(7)&&Text;;.col-pd.clearfix&&.title:eq(3)&&span&&Text;',
        content: '.stui-vodlist__detail span:eq(0)&&alt',
        tabs: '.col-pd.clearfix&&h5',
        lists: '.col-pd.clearfix&&h5',
    },
    搜索: '*',
}