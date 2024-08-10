var rule = {
    类型: '影视',//影视|听书|漫画|小说
    title: '世纪DJ音乐网[听]',
    host: 'http://m.dj0898.com',
    url: '/dance/lists/id/fyclass/fypage',
    homeUrl: '/dance/lists/id/10/1',
    searchUrl: '/index.php/dance/so/key?key=**&cid=0&p=fypage',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    filter: '',
    filter_url: '',
    filter_def: {},
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    timeout: 5000,
    class_parse: $js.toString(() => {
        let _classes = [{type_id: 1, type_name: "🎧串烧舞曲"}, {type_id: 2, type_name: "🎧外文舞曲"}, {
            type_id: 3,
            type_name: "🎧早场暖场"
        }, {type_id: 4, type_name: "🎧中文舞曲"}, {type_id: 5, type_name: "🎧其他舞曲"}, {
            type_id: 6,
            type_name: "🎧国外电音"
        }, {type_id: 8, type_name: "🎧慢歌连版"}, {type_id: 9, type_name: "🎧酒吧潮歌"}, {
            type_id: 10,
            type_name: "🎧中文串烧"
        }, {type_id: 11, type_name: "🎧外文串烧"}, {type_id: 12, type_name: "🎧中外串烧"}, {
            type_id: 13,
            type_name: "🎧车载串烧"
        }, {type_id: 14, type_name: "🎧越鼓串烧"}, {type_id: 40, type_name: "🎧3D/环绕"}, {
            type_id: 45,
            type_name: "🎧口水旋律"
        }, {type_id: 46, type_name: "🎧精品收藏"}, {type_id: 47, type_name: "🎧开场舞曲"}, {
            type_id: 48,
            type_name: "🎧印度舞曲"
        }, {type_id: 49, type_name: "🎧编排套曲"}, {type_id: 20, type_name: "🎧DuTch"}, {
            type_id: 21,
            type_name: "🎧Mash up"
        }, {type_id: 22, type_name: "🎧ClubHouse"}, {type_id: 23, type_name: "🎧ElectroHouse"}, {
            type_id: 24,
            type_name: "🎧越南鼓Dj"
        }, {type_id: 30, type_name: "🎧Funky"}, {type_id: 31, type_name: "🎧Reggae"}, {
            type_id: 32,
            type_name: "🎧Rnb"
        }, {type_id: 33, type_name: "🎧Hip Hop"}, {type_id: 34, type_name: "🎧Dubstep"}, {
            type_id: 8017,
            type_name: "🎧Hardstyle"
        }, {type_id: 8018, type_name: "🎧Hands Up"}];
        input = _classes;
    }),
    cate_exclude: '',
    play_parse: true,
    lazy: $js.toString(() => {
        log(input);
        let html = request(input);
        let src = pd(html, 'body&&audio[src*=http]&&src', input);
        if (src) {
            input = {parse: 0, url: src};
        }
    }),
    double: false,
    推荐: '*',
    一级: 'ul.djddv_djList li;strong&&Text;img&&src;font:eq(5)&&Text;a:eq(1)&&href',
    二级: '*',
    搜索: '*',
}