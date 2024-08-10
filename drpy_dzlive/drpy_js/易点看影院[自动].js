var rule = {
    模板: '自动',
    模板修改: $js.toString(() => {
        Object.assign(muban.自动.二级, {
            tabs: '#y-playList&&.tab-item',
        });
    }),
    title: '易点看影院[自动]',
    host: 'http://www.edktv.com',
    url: '/vodshow_fyclass--------fypage---.html',
    class_parse: '.navbar-items&&li;a&&Text;a&&href;/type_(.*?).html',
    searchUrl: '/vodsearch_**----------fypage---.html',
}