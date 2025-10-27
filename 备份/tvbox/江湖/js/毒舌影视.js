var rule = {
    title: '毒舌影视',
    host: 'https://www.dushe03.com',
    url: '/show/fyclass------fypage.html',
    homeUrl: '/',
    searchUrl: '/search?k=**',
    searchable: 2,
    quickSearch: 1,
    filterable: 1,
    limit: 30,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; M2102J2SC Build/TKQ1.221114.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.3 Mobile Safari/537.36'
    },
    
    class_parse: '.swiper-slide;a&&Text;a&&href;/channel/(\\d+).html',
    
    预处理: $js.toString(() => {
        rule.img_host = 'https://vres.uujjyp.cn';
        rule.图片替换 = HOST + '=>' + rule.img_host;
    }),
    推荐: '*',
    
    一级: '.module-item;.v-item-title:eq(1)&&Text;img:eq(-1)&&data-original;span:eq(-1)&&Text;a&&href',
    
    二级: {
        title: '.detail-title&&strong:eq(1)&&Text;.detail-tags-item:eq(-1)&&Text',
        img: '.detail-pic&&img&&data-original',
        desc: '.detail-info-row-main:eq(-2)&&Text;.detail-tags-item:eq(0)&&Text;.detail-tags-item:eq(1)&&Text;.detail-info-row-main:eq(1)&&Text;.detail-info-row-main:eq(0)&&Text',
        content: '.detail-desc&&Text',
        tabs: '.source-item',
        tab_text: 'span:eq(-1)&&Text',
        lists: '.episode-list:eq(#id)&&a',
        list_text: 'a&&Text',
        list_url: 'a&&href',
    },
    
    搜索: $js.toString(() => {
        let t = pdfh(fetch(input), 'input:eq(0)&&value');
        input = input.split('?')[0];
        let surl = `${input}?k=${KEY}&page=${MY_PAGE}&t=${t}`;
        let khtml = fetch(surl);
        VODS = [];
        let klists = pdfa(khtml, '.search-result-item');
        klists.forEach((it) => {
            VODS.push({
                vod_name: pdfh(it, 'img&&alt'),
                vod_pic: pd(it, 'img&&data-original', rule.img_host),
                vod_remarks: pdfh(it, '.search-result-item-header&&Text'),
                vod_id: pdfh(it, 'a&&href')
            })
        })
    }),
}