var rule = {
    author: '书虫/250605/第1版',
    title: '西瓜在线',
    类型: '影视',
    //主页 网页的域名根
    host: 'https://www.a6club.com/',
    hostJs: ``,
    headers: {
        'User-Agen': 'Mozilla/5.0'
    },
    //不填就默认utf-8，根据网页源码所显示的格式填，根据需要可填UTF-8，GBK，GB2312
    编码: 'utf-8',
    timeout: 5000,
    //首页链接，可以是完整路径或者相对路径,用于分类获取和推荐获取
    homeUrl: '/',
    //分类链接,分类参数用fyclasss,页码用fypage，带筛选的用fyfilter，第一页无页码的用[]括起，处理方式同xbpq方式，fyfilter代表filter_url里内容


    //  https://www.a6club.com/vod/show/area/大陆/id/21/page/2.html

    url: 'https://www.a6club.com/vod/show/id/fyfilter/page/fypage.html',

    filter_url: '{{fl.cateId}}{{fl.area}}',
    detailUrl: 'https://www.a6club.com/vod/detail/id/fyid.html',
    //搜索链接 可以是完整路径或者相对路径,用于分类获取和推荐获取 **代表搜索词 fypage代表页数
//   searchUrl: 'https://yipinmaoyi.com/search.php?page=fypage&searchword=**&searchtype=',

    //  搜索页找参数  数组标题图片副标题链接
//   搜索: '*',
    //rss搜索写法
    //    searchUrl: '/rss/index.xml?wd=**&page=fypage',
    //  ajax搜索写法
         searchUrl: '/index.php/ajax/suggest?mid=1&wd=**&page=fypage&limit=30',

        搜索: 'json:list;name;pic;en;id',  

    searchable: 1,
    quickSearch: 1,
    filterable: 1,
    limit: 10,
    double: false,
    class_name: '电影&连续剧&动漫&综艺&B站&体育',
    //静态分类值
    class_url: '20&37&43&45&47&52',


    filter_def: {
20: {
            cateId: '20'
        },
        37:{
            cateId: '37'
        },
       43: {
            cateId: '43'
        },
    
        
           45: {
            cateId: '45'
        },
              47:{
            cateId: '47'
        },
        
        52:{
            cateId: '52'
        },
    
        


    },


    //推荐列表可以单独写也是几个参数，和一级列表部分参数一样的可以用*代替，不一样写不一样的，全和一级一样，可以用一个*代替
    推荐: '*',
    //推荐页的json模式
    //推荐: 'json:list;vod_name;vod_pic;vod_remarks;vod_id',
    //数组、标题、图片、副标题、链接，分类页找参数
    一级: '.movie-list-item;.txtHide&&Text;.Lazy&&data-original;.cor4&&Text;a&&href',


    //数组、标题、图片、副标题、链接，分类页找参数

    //一级: `js:
    //let klist=pdfa(request(input),'.vertical-box');
    // let k=[];
    //klist.forEach(it=>{
    // k.push({
    //title: pdfh(it,'.title&&Text'),
    // pic_url: !pdfh(it,'.lazyload&&data-original').startsWith('http') ? HOST + pdfh(it,'.lazyload&&data-original') : pdfh(it,'.lazyload&&data-original'),

    //desc: pdfh(it,''),
    // url: pdfh(it,'a&&href'),
    //content: ''    
    // })
    //});
    //setResult(k)
    //`,

    //普通搜索模板  搜索数组标题图片副标题链接
    //搜索: `js:

    //let klist=pdfa(request(input),'.hzixunui-vodlist__thumb');
    // let k=[];
    //klist.forEach(it=>{
    //k.push({
    //        title: pdfh(it,'a&&title'),
    //       pic_url: !pdfh(it,'a&&data-original').startsWith('http') ? HOST + pdfh(it,'a&&data-original') : pdfh(it,'a&&data-original'),
    //       desc: pdfh(it,'.text-right&&Text'),
    //        url: pdfh(it,'a&&href'),
    //        content: ''    
    //     })
    // });
    // setResult(k)
    // `,

    //rss搜索模板
    //  搜索: `js:
    //let klist=pdfa(request(input),'rss&&item');
    //   let k=[];
    //   klist.forEach(it=>{
    //    it=it.replace(/title|link|author|pubdate|description/g,'p');
    //    k.push({
    //         title: pdfh(it,'p:eq(0)&&Text'),
    //         pic_url: '',
    //       desc: pdfh(it,'p:eq(3)&&Text'),
    //         url: pdfh(it,'p:eq(1)&&Text').replace('cc','la'),    
    //      content: pdfh(it,'p:eq(4)&&Text')    
    //     })
    //     });
    // setResult(k)
    //" `,

    //详情页找参数
    //第一部分分别是对应参数式中的标题、类型、图片、备注、年份、地区、导演、主演、简介
    //第二部分分别对应参数式中的线路数组和线路标题
    //第三部分分别对应参数式中的播放数组、播放列表、播放标题、播放链接

    二级: `js:
let html = request(input);
VOD = {};
 VOD.vod_id = input;
VOD.vod_name = pdfh(html, 'h1&&Text');
 VOD.type_name = pdfh(html, '.scroll-content&&Text');
 VOD.vod_pic = pd(html, '.poster&&img&&src', input);
 VOD.vod_remarks = pdfh(html, '.scroll-content&&Text&&Text');
 VOD.vod_year = pdfh(html, '');
VOD.vod_area = pdfh(html, '');
 
VOD.vod_director = pdfh(html, '');
 VOD.vod_actor = pdfh(html, 'p:matches(演员)&&Text').replace('演员：','');
 VOD.vod_content = '书虫祝您观影愉快！现为您介绍剧情:' + pdfh(html, '.detailsTxt&&Text');
 
 let r_ktabs = pdfa(html,'.swiper-wrapper&&a');
 let ktabs = r_ktabs.map(it => pdfh(it, 'Text'));
 VOD.vod_play_from = ktabs.join('$$$');
 

let klists = [];
 let r_plists = pdfa(html, '.content_playlist');
 r_plists.forEach((rp) => {
     let klist = pdfa(rp, 'body&&a').map((it) => {
     return pdfh(it, 'a&&Text') + '$' + pd(it, 'a&&href', input);
     });
     klist = klist.join('#');
     klists.push(klist);
 });
 VOD.vod_play_url = klists.join('$$$')
 

 `,
 
 //a href="/paly-293442-2-1/"
 
 
    //是否启用辅助嗅探: 1,0
    sniffer: 0,
    // 辅助嗅探规则
    isVideo: 'http((?!http).){26,}\\.(m3u8|mp4|flv|avi|mkv|wmv|mpg|mpeg|mov|ts|3gp|rm|rmvb|asf|m4a|mp3|wma)',
    
    play_parse: false,
    //播放地址通用解析
    lazy: $js.toString(() => {
let kcode = JSON.parse(fetch(input).split('aaaa=')[1].split('<')[0]);
let kurl = decodeURIComponent(kcode.url);
if (/\.(m3u8|mp4)/.test(kurl)) {
    input = { jx: 0, parse: 0, url: kurl, header: {'User-Agent': MOBILE_UA, 'Referer': getHome(kurl)} }
} else {
    input = { jx: 0, parse: 1, url: input }
}
}),

    filter: {
        "20": [


            {
                "key": "cateId",
                "name": "类型",
                "value": [
    {"n": "动作片", "v": "21"},
    {"n": "喜剧片", "v": "22"},
    {"n": "爱情片", "v": "23"},
    {"n": "科幻片", "v": "24"},
    {"n": "恐怖片", "v": "25"},
    {"n": "剧情片", "v": "26"},
    {"n": "战争片", "v": "27"},
    {"n": "惊悚片", "v": "28"},
    {"n": "犯罪片", "v": "29"},
    {"n": "冒险篇", "v": "30"},
    {"n": "动画片", "v": "31"},
    {"n": "悬疑片", "v": "32"},
    {"n": "武侠片", "v": "33"},
    {"n": "奇幻片", "v": "34"},
    {"n": "纪录片", "v": "35"},
    {"n": "其他片", "v": "36"}
]
            },
            
            
            {
                "key": "area",
                "name": "地区",
                "value": [
    {"n": "全部", "v": ""},
    {"n": "中国大陆", "v": "/area/中国大陆"},
    {"n": "中国香港", "v": "/area/中国香港"},
    {"n": "中国台湾", "v": "/area/中国台湾"},
    {"n": "美国", "v": "/area/美国"},
    {"n": "法国", "v": "/area/法国"},
    {"n": "英国", "v": "/area/英国"},
    {"n": "日本", "v": "/area/日本"},
    {"n": "韩国", "v": "/area/韩国"},
    {"n": "泰国", "v": "/area/泰国"},
    {"n": "新加坡", "v": "/area/新加坡"},
    {"n": "马来西亚", "v": "/area/马来西亚"},
    {"n": "印度", "v": "/area/印度"},
    {"n": "加拿大", "v": "/area/加拿大"},
    {"n": "西班牙", "v": "/area/西班牙"},
    {"n": "俄罗斯", "v": "/area/俄罗斯"},
    {"n": "其它", "v": "/area/其它"}
]
            }
        ],
        "37": [

            {
                "key": "cateId",
                "name": "类型",
                "value":[
    {"n": "国产剧", "v": "38"},
    {"n": "港台剧", "v": "39"},
    {"n": "欧美剧", "v": "40"},
    {"n": "日韩剧", "v": "41"},
    {"n": "其他剧", "v": "42"}
]
            },
            
            

            {
                "key": "area",
                "name": "地区",
                "value": [
    {"n": "全部", "v": ""},
    {"n": "中国大陆", "v": "/area/中国大陆"},
    {"n": "中国香港", "v": "/area/中国香港"},
    {"n": "中国台湾", "v": "/area/中国台湾"},
    {"n": "美国", "v": "/area/美国"},
    {"n": "法国", "v": "/area/法国"},
    {"n": "英国", "v": "/area/英国"},
    {"n": "日本", "v": "/area/日本"},
    {"n": "韩国", "v": "/area/韩国"},
    {"n": "泰国", "v": "/area/泰国"},
    {"n": "新加坡", "v": "/area/新加坡"},
    {"n": "马来西亚", "v": "/area/马来西亚"},
    {"n": "印度", "v": "/area/印度"},
    {"n": "加拿大", "v": "/area/加拿大"},
    {"n": "西班牙", "v": "/area/西班牙"},
    {"n": "俄罗斯", "v": "/area/俄罗斯"},
    {"n": "其它", "v": "/area/其它"}
]
            }

        ]

        
    }
}