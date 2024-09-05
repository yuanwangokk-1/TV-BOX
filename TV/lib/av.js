var rule ={
            title: 'avtoday',
            host: 'https://avtoday.io',
            url: '/catalog/fyclass?page=fypage',
            searchUrl: 'https://avtoday.io/search?s=**',
            //class_parse: '.nav a;script&&Text;a&&href;.*/(.*?).html',
  class_name:'无码&制服&丝袜&萝莉&多人&动长腿',
  class_url:'无码&制服&丝袜&4萝莉&多人&长腿',
  
                      searchable: 2,
            quickSearch: 0,
            filterable: 0,
            //编码:'GBK',
            headers: {
                'User-Agent': 'MOBILE_UA',
                'Referer': 'https://avtoday.io'
            },
            play_parse: true,
                      lazy: `js:
let kcode=jsp.pdfh(request(input), 'iframe&&src').replace(/^\\./ ,'https://avtoday.io');
log(kcode)
let kurl=request(kcode).match(/m3u8_url = '(.*?)'/)[1];
if (/m3u8|mp4/.test(kurl)) {
input ={ url: kurl + ';{Referer@'+input+'}'}
} else {
input = { jx: 0, parse: 1, url: rule.parse_url+kurl }
}`, 
            limit: 6,
            推荐: '.swiper;a;h2&&Text;img&&src;;a:eq(0)&&href',
            double: true,
            一级: `js:
            pdfh = jsp.pdfh, pdfa = jsp.pdfa, pd = jsp.pd;
    var d = [];
    let html = fetch(input, {});
    var list = pdfa(html, '.album&&.thumbnail');
    for (var i = 0; i < list.length; i++) {
        d.push({
            title: pdfh(list[i], '.video-title&&a&&Text'),
            desc: pdfh(list[i], '.video-duration&&Text'),
            pic_url: pdfh(list[i], 'img&&src').replace(/^\\./ ,'https://avtoday.io') + '@Referer=',
            url: pdfh(list[i], 'a&&href').replace(/^\\./ ,'https://avtoday.io'),
        });
    }
setResult(d);`,
            二级: '*',
            搜索: '*',
        }