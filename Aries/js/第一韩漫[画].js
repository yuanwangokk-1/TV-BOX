/*
@header({
  searchable: 1,
  filterable: 0,
  quickSearch: 0,
  title: '第一韩漫[画]',
  '类型': '漫画',
  lang: 'ds'
})
*/

var rule = {
    类型: '漫画',//影视|听书|漫画|小说
    title: '第一韩漫[画]',
    host: 'https://www.hztoon.com',
    url: '/api/fyclass-fypage',
    detailUrl: '/comic/fyid',
    searchUrl: '/search/**',
    searchable: 1,
    quickSearch: 0,
    filterable: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36 Edg/125.0.0.0',
    },
    class_name: '人气排行&总排行',
    class_url: 'rank/0-0-0&rank/0-0-3',
    play_parse: true,
    limit: 6,
    lazy: $js.toString(() => {
        let html = request(input.replace("/", ""));
        let list = jsp.pdfa(html, ".charpetBox img")
            .map(v => jsp.pdfh(v, "img&&data-original"));
        let url = html;
        input = {
            //parse: 0,
            url: "pics://" + list.join("&&"),
            js: ''
        };
    }),
    一级: 'json:$.data.comics;$.title;$.cover;$.last_volpub_time;$.id',
    二级: {
        title: 'body&&#comicName&&Text',
        img: '#Cover&&img&&src',
        desc: '.sub_r&&p,-1&&Text',
        content: '.txtDesc&&Text',
        tabs: '#comicName',
        lists: $js.toString(() => {
            LISTS = [];
            let data = html.split("initIntroData(")[1].split(')')[0];
            try {
                let api = getHome(MY_URL);
                data = JSON.parse(data)[0].data;
                //log(data);
                LISTS = [data.map(it => it.chapter_name + "$" + `/${api}/view/${it.comic_id}/${it.id}`)];
                //log(data);
            } catch (e) {
                log(e.message);
            }
        })
    },

    搜索: $js.toString(() => {
        let d = [];

        let arr = jsp.pdfh(request(input), "body&&script:eq(3)&&Html");
        arr = JSON.parse(arr.split("serchArry=")[1].slice(0, -1));
        arr.forEach(v => {
            d.push({
                title: v.title,
                img: rule.host + v.cover,
                content: v.authorstr + " " + v.tags,
                desc: v.last_volpub_time,
                url: v.id
            })
        });
        setResult(d)
    }),
}