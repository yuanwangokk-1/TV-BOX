var rule = {
    类型: '影视',//影视|听书|漫画|小说
    title: '童趣[儿]',
    host: 'https://www.boosj.com',
    url: '/search_res_3362__fyclass_fypage_fyfilter',
    searchUrl: 'https://search.boosj.com/m_ajax?q=**&p=fypage&typeId=3362',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: '',
    filter_url: '{{fl.by}}.html{{fl.age}}',
    filter_def: {},
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    timeout: 5000,
    class_parse: $js.toString(() => {
        let classes = [{type_id: '', type_name: '全部'}, {type_id: 28, type_name: '辅食'}, {
            type_id: 582,
            type_name: '动画'
        }, {type_id: 3364, type_name: '儿童舞蹈'}, {type_id: 3366, type_name: '少儿英语'}, {
            type_id: 3367,
            type_name: '儿童歌曲'
        }, {type_id: 3622, type_name: '才艺'}, {type_id: 3782, type_name: '播视自制'}, {
            type_id: 3822,
            type_name: '故事'
        }, {type_id: 3842, type_name: '亲子教育'}, {type_id: 4402, type_name: '美术'}, {
            type_id: 4583,
            type_name: '其他'
        }, {type_id: 4762, type_name: '儿童游戏'}, {type_id: 4842, type_name: '识物'}, {
            type_id: 4843,
            type_name: '绘本'
        }, {type_id: 4844, type_name: '古诗'}, {type_id: 4845, type_name: '科普'}, {
            type_id: 5102,
            type_name: '儿童玩具'
        }, {type_id: 5142, type_name: '播视童趣儿童玩具'}];
        homeObj.filter = {};
        let jsonData = [
            {
                key: 'age',
                name: '年龄段',
                value: [
                    {n: '全部', v: ''},
                    {n: '6岁以上', v: '?p367=370'},
                    {n: '3~6岁', v: '?p367=369'},
                    {n: '0~3岁', v: '?p367=368'},
                ],
                init: '',
            },
            {
                key: 'by',
                name: '排序',
                value: [
                    {n: '全部', v: ''},
                    {n: '最新发布', v: 'lately'},
                    {n: '最多播放', v: 'pop'},
                    {n: '最多评论', v: 'view'},
                ],
                init: '',
            },
        ];
        classes.forEach(it => {
            homeObj.filter[it.type_id] = jsonData;
        });
        input = classes
    }),
    cate_exclude: '',
    play_parse: true,
    lazy: $js.toString(() => {
        input = {
            parse: 1, url: input, js: "document.querySelector('video').play();",
            header: {
                'User-Agent': PC_UA,
            }
        };
    }),
    推荐: '',
    一级: 'body div.bj-col4:has(h3);a&&title;img&&data-original;span.played&&Text;a&&href',
    二级: '*',
    搜索: 'json:body.result;resourceName;imageUrl;clickNumStr;playUrl',
}