/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: '包子漫画[画]',
  '类型': '漫画',
  lang: 'ds'
})
*/

var rule = {
    类型: '漫画',//影视|听书|漫画|小说
    title: '包子漫画[画]',
    host: 'https://godamh.com/',
    url: 'fyclass/page/fypage',
    searchUrl: '/s/**?page=fypage',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: '',
    filter_url: '',
    filter_def: {},
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    timeout: 5000,
    class_name: '全部',
    class_url: '/manga',
    class_parse: '.homenavtax&&a;a&&Text;a&&href;(/manga.*-.*)',
    cate_exclude: '',
    play_parse: true,
    lazy: $js.toString(() => {
        log(input);
        let _id = input.split('@@')[0];
        let _url = input.split('@@')[1];
        //let mid = _url.split('/').slice(-1)[0].split('-')[0];
        let html1 = request(_url, {headers: {Referer: 'https://godamh.com/'}});
        let mid = pdfh(html1, '#chapterContent&&data-ms');
        let html = request(`https://api-get.mgsearcher.com/api/chapter/getinfo?m=${mid}&c=${_id}`, {headers: {Referer: 'https://godamh.com/'}});
        let json = JSON.parse(html);
        let re = '@Referer=https://godamh.com/';
        let imgs = json.data.info.images.map(it => it.url + re);
        //log(imgs);
        input = {url: 'pics://' + imgs.join('&&')};
    }),
    double: true,
    推荐: '.cardlist;.pb-2;*;*;*;*',
    一级: '.cardlist&&.pb-2;.cardtitle&&Text;img&&src;;a&&href',
    二级: {
        重定向: $js.toString(() => {
            log('执行重定向:' + MY_URL);
            // let html = request(MY_URL);
            MY_URL = pd(html, '#morechap&&a&&href', MY_URL);
            log('二级重定向到:' + MY_URL);
            html = request(MY_URL);
        }),
        title: 'h1&&Text',
        img: 'img&&src',
        desc: '#lastchap&&Text',
        content: 'p.text-medium&&Text',
        tabs: 'h2.text-medium',
        lists: $js.toString(() => {
            //log(input);
            let data_id = pdfh(html, '#allchapters&&data-mid');
            //log(data_id);
            let html1 = request(`https://api-get.mgsearcher.com/api/manga/get?mid=${data_id}&mode=all`, {headers: {Referer: 'https://godamh.com/'}});
            let json = JSON.parse(html1);
            //log(json);
            let list1 = [];
            let url_prefix = input.replace('chapterlist', 'manga');
            json.data.chapters.forEach(it => {
                let _tt = it.attributes.title;
                let _slug = it.attributes.slug;
                let _id = it.id;
                list1.push(_tt + '$' + _id + '@@' + url_prefix + '/' + _slug);
            });
            LISTS = [list1];
        }),
        tab_text: 'body&&Text',
        list_text: 'body&&Text',
        list_url: 'a&&href',
        list_url_prefix: '',
    },
    搜索: '*',
}