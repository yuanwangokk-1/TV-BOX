Object.assign(muban.首图2.二级, {
    tabs: '.stui-pannel_hd h3',
});
var rule = {
    title: '七新电影网',
    模板: '首图2',
    host: 'http://www.7xdy.com',
    // url:'/fyclass/indexfypage.html[/fyclass/index.html]',
    url: '/fyfilter/indexfypage.html[/fyfilter/index.html]',
    filterable: 1,//是否启用分类筛选,
    filter_url: '{{fl.cateId}}',
    tab_exclude: '本周热门|最近更新',
    filter: 'H4sIAAAAAAAAA6tWSslMzKvMzEsvANJKVtHVStmplUpWSsmJJameKUo6SnmJualA/tOOtucbdwP5ZYk5palghXkg4dYVL5tXgISBHBSjanWgKrpWPNk753lnO0xRfl56VWk+iprnHRufNbci1CRmFqIb83z5xKc7dyOUZKdmlCbmoSh51jjhWcM0JCVAm5JKUR0zbc7TzuUIJRWZWagKXqzb8HTvVISCrMwcNBM6l6M4NasU4dTY2lgdcCAUZwDNpUJgQsyBWz1775Ndy4EOgKpIL81PzkjMQ1LxbMf6p/0bECpKEvPSSxKRzXi2ZvnzfX0IFfmluako8tOXvpy/EiFflIlqw/P5axGSKaUQOaC/awEa2+pBSQIAAA==',
    filter_def: {
        dianyingpian: {cateId: 'dianyingpian'},
        dianshiju: {cateId: 'dianshiju'},
        zongyi: {cateId: 'zongyi'},
        dongman: {cateId: 'dongman'}
    },
    lazy: $js.toString(() => {
        // 屏蔽图片onerror无限请求问题
        // let init_js = `
        // var imgTimer = setInterval(function(){
        //     if(typeof($)!='undefined'){
        //         let css = $('.lazyload[alt="成人深夜福利"]');
        //         if(css.length > 0){
        //             css.attr('onerror','this.onerror=null');
        //             clearInterval(imgTimer);
        //         }
        //     }
        // },200);
        // `;
        let init_js = `Object.defineProperties(navigator, {platform: {get: () => 'iPhone'}});`;
        input = {
            parse: 1,
            url: input,
            js: '',
            parse_extra: '&init_script=' + encodeURIComponent(base64Encode(init_js)),
        }
    }),
    // searchUrl:'/search.php?page=fypage&searchword=**&searchtype=',
    searchUrl: '/search.php#searchword=**;post',
    class_parse: '.stui-tou__menu li:gt(0):lt(7);a&&Text;a&&href;.*/(.*?)/.*html',
}