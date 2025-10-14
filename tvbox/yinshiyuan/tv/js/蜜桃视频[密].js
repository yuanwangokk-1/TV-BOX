var rule ={
            title: '蜜桃视频',
            host: 'https://www.mt07ml.vip:9527/',
            url: 'https://www.mt07ml.vip:9527/type/fyclass/---fypage',
            searchUrl: '/vodsearch/**----------fypage---/',
           // class_parse: '.menu-tabs-content .menu-link;a&&Text;a&&href;.*/(.*?)/',
 class_name:'国产&传媒&日韩&动漫&欧美&吃瓜',    
 class_url:'guochan&chuanmei&rihan&dongman&oumei&chigua',      
            searchable: 2,
            quickSearch: 0,
            filterable: 0,
            headers: {
                'User-Agent': 'MOBILE_UA',
            },
            play_parse: true,
                                  lazy: `js:
let kcode=jsp.pdfh(request(input).match(/<iframe(.*?)</iframe>/)[1]);
let kurl=kcode.match(/url=(.*?)\"/)[1];
if (/m3u8|mp4/.test(kurl)) {
input = { jx: 0, parse: 0, url: kurl }
} else {
input = { jx: 0, parse: 1, url: rule.parse_url+kurl }
}`, 
            limit: 6,
            推荐: '*',
            double: true,
            一级: '.darkgreen-list-grid.darkgreen-v-list .darkgreen-v-item;.darkgreen-v-title&&Text;img&&data-original;.darkgreen-v-duration .zicon-time&&Text;a&&href',
            二级:'*',
            搜索: '*',
        }