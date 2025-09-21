var rule = {
    author: '书虫/0912/第一版',
    title: '土豆影院',
    类型: '影视',

    host: 'http://www.xf-td.com/',
    hostJs: '',
    headers: {
        'User-Agent': MOBILE_UA
    },
    编码: 'utf-8',
    timeout: 5000,

    homeUrl: 'http://www.xf-td.com/', 
    
    //https://www.xf-td.com/show/7-大陆-------3---.html
    url: 'https://www.xf-td.com/show/fyfilter-------fypage---.html',
    filter_url: '{{fl.cateId}}-{{fl.area}}',
   searchUrl: 'http://www.xf-td.com/vodsearch/**/page/fypage.html',
    detailUrl: 'https://www.xf-td.com/weihu/fyid.html',       
       //rss搜索写法
 //     searchUrl: '/rss/index.xml?wd=**&page=fypage',
//      ajax搜索写法
 //       searchUrl: '/index.php/ajax/suggest?mid=1&wd=**&page=fypage&limit=30',

        搜索: 'json:list;name;pic;en;id',
    limit: 9,
    double: false,
    class_name: '电影&电视剧&综艺&动漫&短剧&午夜',
    class_url: '1&2&3&4&30&36',

    filter_def: {
        1: {
            cateId: '1'
        },
        2: {
            cateId: '2'
        },
        3: {
            cateId: '3'
        },
        4: {
            cateId: '4'
        },
        
        30: {
            cateId: '30'
        },
        36: {
            cateId: '36'
        },

    },
    推荐: '*',
    一级: '.item;a&&title;img&&data-src;.tag2&&Text;a&&href',
    搜索: '*',

    二级: `js:
let html = request(input);
VOD = {};
 VOD.vod_id = input;
VOD.vod_name = pdfh(html, 'h1&&Text');
 VOD.type_name = pdfh(html, '.info:contains(类型)&&Text').replace('类型：','');
 VOD.vod_pic = pd(html, 'img&&src', input);
 VOD.vod_remarks = pdfh(html, '.info:contains(资源)&&Text').replace('资源：','');
 VOD.vod_year = pdfh(html, '.info:contains(年份)&&Text').replace('年份：','');
VOD.vod_area = pdfh(html, '.info:contains(地区)&&Text').replace('地区：','');
 
VOD.vod_director = pdfh(html, '.info:contains(导演)&&Textt').replace('导演：','');
 VOD.vod_actor = pdfh(html, '.info:contains(演员)&&Text').replace('演员：','');
 VOD.vod_content = '书虫祝您观影愉快！现为您介绍剧情:' + pdfh(html, '.info-box&&Text');
 
  let jinput = pd(html, '.gm-thumb&&a&&href', HOST); 
 let r_ktabs = pdfa(request(jinput),'.clearfix&&span');
 let ktabs = r_ktabs.map(it => pdfh(it, '.hd-item&&Text'));
 VOD.vod_play_from = ktabs.join('$$$');
 

let klists = [];
 let r_plists = pdfa(request(jinput), '.list');
 r_plists.forEach((rp) => {
     let klist = pdfa(rp, 'a').map((it) => {
     return pdfh(it, 'a&&Text') + '$' + pd(it, 'a&&href', input);
     });
     klist = klist.join('#');
     klists.push(klist);
 });
 VOD.vod_play_url = klists.join('$$$')
 

 `,


    play_parse: true,
    lazy: $js.toString(() => {
        let kcode = JSON.parse(fetch(input).split('aaaa=')[1].split('<')[0]);
        let kurl = kcode.url;
        if (/\.(m3u8|mp4)/.test(kurl)) {
            input = {
                jx: 0,
                parse: 0,
                url: kurl,
                header: rule.headers
            }
        } else {
            input = {
                jx: 0,
                parse: 1,
                url: input
            }
        }
    }),

    filter: {
        "1": [

            {
                "n": "全部",
                "v": ""
            },
            {
                "key": "cateId",
                "name": "类型",
                "value":[ {"n":"全部","v":"1"},
{"n":"动作片","v":"6"},
{"n":"喜剧片","v":"7"},
{"n":"爱情片","v":"8"},
{"n":"科幻片","v":"9"},
{"n":"恐怖片","v":"10"},
{"n":"剧情片","v":"11"},
{"n":"战争片","v":"12"},
{"n":"纪录片","v":"13"}
]
            },

            {
                "key": "area",
                "name": "地区",
                "value":[
  {"n": "全部", "v": ""},
  {"n": "大陆", "v": "大陆"},
  {"n": "香港", "v": "香港"},
  {"n": "台湾", "v": "台湾"},
  {"n": "美国", "v": "美国"},
  {"n": "法国", "v": "法国"},
  {"n": "英国", "v": "英国"},
  {"n": "日本", "v": "日本"},
  {"n": "韩国", "v": "韩国"},
  {"n": "德国", "v": "德国"},
  {"n": "泰国", "v": "泰国"},
  {"n": "印度", "v": "印度"},
  {"n": "意大利", "v": "意大利"},
  {"n": "西班牙", "v": "西班牙"},
  {"n": "加拿大", "v": "加拿大"},
  {"n": "其他", "v": "其他"}
]


            }
        ],
        "2": [



            {
                "key": "cateId",
                "name": "类型",
                "value":[
  {"n":"全部","v":"2"},
  {"n":"国产剧","v":"14"},
  {"n":"港剧","v":"15"},
  {"n":"台湾剧","v":"16"},
  {"n":"韩剧","v":"17"},
  {"n":"日剧","v":"18"},
  {"n":"泰剧","v":"31"},
  {"n":"欧美剧","v":"19"},
  {"n":"海外剧","v":"20"}
]



            },

            {
                "key": "area",
                "name": "地区",
                "value": [
  {"n": "全部", "v": ""},
  {"n": "内地", "v": "内地"},
  {"n": "韩国", "v": "韩国"},
  {"n": "香港", "v": "香港"},
  {"n": "台湾", "v": "台湾"},
  {"n": "日本", "v": "日本"},
  {"n": "美国", "v": "美国"},
  {"n": "泰国", "v": "泰国"},
  {"n": "英国", "v": "英国"},
  {"n": "新加坡", "v": "新加坡"},
  {"n": "其他", "v": "其他"}
]


            }


        ],

        "3": [


            {
                "key": "cateId",
                "name": "类型",
                "value":[
  {"n":"全部","v":"3"},
  {"n":"大陆综艺","v":"21"},
  {"n":"日韩综艺","v":"22"},
  {"n":"港台综艺","v":"23"},
  {"n":"欧美综艺","v":"24"}
]



            },

            {
                "key": "area",
                "name": "地区",
                "value": [
  {"n": "全部", "v": ""},
  {"n": "内地", "v": "内地"},
  {"n": "港台", "v": "港台"},
  {"n": "日韩", "v": "日韩"},
  {"n": "欧美", "v": "欧美"}
]


            }

        ],

        "4": [



            {
                "key": "cateId",
                "name": "类型",
                "value":[
  {"n":"全部","v":"4"},
  {"n":"国产动漫","v":"25"},
  {"n":"日本动漫","v":"26"},
  {"n":"欧美动漫","v":"27"},
  {"n":"海外动漫","v":"28"}
]


            },

            {
                "key": "area",
                "name": "地区",
                "value":[
  {"n": "全部", "v": ""},
  {"n": "大陆", "v": "国产"},
  {"n": "日本", "v": "日本"},
  {"n": "欧美", "v": "欧美"},
  {"n": "其他", "v": "其他"}
]


            }


        ]


    }
}