/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 0,
  title: '大千视界',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    title: '大千视界',
    host: "https://www.dqsj.top",
    class_name: "热门新番&日本动漫&国产动漫&欧美动漫&动漫电影&剧集&电影&综艺",
    class_url: "23&21&22&25&24&27&28&31",
    //searchUrl: '/index.php/ajax/suggest?mid=1&wd=**&limit=50',
    searchUrl: 'https://www.dqsj.top/index.php/vod/search/page/fypage/wd/**.html',
    searchable: 2,
    quickSearch: 0,
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    url: '/index.php/api/vod#type=fyclassfyfilter&page=fypage',
    filterable: 0,
    filter: "H4sIAAAAAAAAAO2bW08bRxTHv8s+U2kWQqB5y/1+v6fKgxtZbVRKJaCRUITkQCC2Q4yJih0aAyWtEyfBNTe1YDD5Mp71+ltk7Tk3q3TFgx/iaN72/zszs/P3zp45O5IfO92uc+S7x85P0VHniPNgIDI87HQ5g5Gfo4Gsre3oxeeBfhQZ+DXabDcYYD1ZqE8UGjgQzliXoV56sbYyCxQExvxPaZ3EHiAwppNr+lMWYiAwVpso+ssxiIGg+8VfeRnsB4L6fVz0ktTPCOr3x7J+XcR+RmCsvvDSe5WHGAgaM77mTUzimEaQh6mX9fn36MEIiqVT+u+PGDOCxpzf0+k4jmkEzXN9x3uKMRD0e6YX/FQCf08jyEPxN29jDj0YQWOOr9Qy9IyMoFiqUEtPYcwI8pB/prd30IMR5OHdLMdA0JhbW158Bsc0gvrlF4PZYT8jqN+TtBfLYD8jyPtyzJ/EZwSC+uXKwUrAfkaI9VItJ3i9NATNJVmqVT7gXIwg76kpPbOO3o2gfn/tVXd/x35G0DyfTOtcGedpBI2ZeMdrCQTGqrsfdAE9gKAxY5XaXgrHNILXfF5vb9KabwryPjfvj6MHEHS/8roupvF+RtCYuaVqGT2AoDGL0358Ecc0guY5nqjN4e8JgsbcS+nVWZ3fwGFJU+/Kjl6d8UtohjW/U1vBk6+v7NJrhZpcbc8HQ+o0LnbWNP+N5frCG54ma2qx8qa6neYxWI/db7QxOTMyFI1wytS5VT1dPmjKzOa93AqObgQZ2Crq1xWcvRHytqPRyJC47fZmdadywNt2q+5DwJqXgvcw75G8m3m35C5zV3LFXAnufks8uBS8n3m/5H3M+yQ/zPyw5L3MeyVnv67067JfV/p12a8r/brs15V+XfbrSr+K/SrpV7FfJf0q9qukX8V+lfSr2K+SfhX7VdKvYr9K+lXsV0m/iv0q6Vex3+BSLsuByOAPvCz9UtEvxA7+NgTt+W1oCPE2eJln/DY0RMttoyMjUfk+FLNe6cUBb3wUwFEix4AcI3IcyHEiJ4CcIHISyEkip4CcInIayGkiZ4CcIXIWyFki54CcI3IeyHkiF4BcIHIRyEUil4BcInIZyGUiV4BcIXIVyFUi14BcI3IdyHUiN4DcIHITyE0it4DcInIbyG0id4DcIXIXyF0i94DcI6K+wVevcSWXyvejvEy87D/17OZ/lok3nfByMS+zCkOMPAxa0zJtBoNiFII/PhwZlkG/9FTHsY4afvDLULRx+/tdTpA5baVtK21badtK27GVtq20baVtK21badtK21baba+0e2ylbSttx1battJ2bKXdOZW2LWlsSWNLmv1LmkO2pLEljWNLGlvSOLak6ZySxh4ePsJLwe3hoWMPDx1badtK+wustHvbVGnrTC6oGXDrMyK0GmvPbtXYqGlHAmF3JLsjfb07kv98jXckEHbXceyu00m7Tl+7dp2Qb1adLFQrOYwZEbojYb+Qc4WwM5Ww73VvIumN4zc5CIqFnCuEnY2E7rgh50J+8a2epu9gI8R2Wv9zibfThmjjTk3TBSGqbI6BwFh96T3HQFC/rZLoZwQ/qslgfvSomkLkUK4aQNgcanNoR+XQ/nbl0GZqrCXwS5Z1a6YRLUi35htuwbo144oWpFvzILdgTS2aB6SiBenW/UDMlHSbsti+J2Bh3yKYxd7OB/kJs5gRZGtjjvuBkNmPYiBE1vzfk7p9Mxz+SHv/cgyEzX42+3VS9uuRf+S1C9Yu2C97wY59BtQD41t7PgAA",
    filter_url: "&class={{fl.class}}&area={{fl.area}}&year={{fl.year}}&lang={{fl.lang}}&letter={{fl.letter}}&by={{fl.by}}",
    filter_def: "",
    filter_def: {},
    detailUrl: '/index.php/vod/detail/id/fyid.html',
    play_parse: true,
    sniffer: 1,
    is_video: 'obj/tos|bd.xhscdn|/ugc/',
    lazy: $js.toString(() => {
        input = {
            parse: 1,
            url: input,
            //js:'try{let urls=Array.from(document.querySelectorAll("iframe")).filter(x=>x.src.includes("?url="));if(urls){location.href=urls[0].src}}catch{}document.querySelector("button").click()',
            js: 'try{location.href=document.querySelector("#playleft iframe").src}catch{}document.querySelector("button.swal-button--confirm").click()',
            parse_extra: '&is_pc=1&custom_regex=' + rule.is_video,
        }
    }),
    limit: 6,
    推荐: '.border-box.public-r .public-list-box;a&&title;img&&data-src;.public-list-prb&&Text;a&&href',
    一级: $js.toString(() => {
        let body = input.split("#")[1];
        let t = Math.round(new Date / 1e3).toString();
        let key = md5("DS" + t + "DCC147D11943AF75");
        let url = input.split("#")[0];
        body = body + "&time=" + t + "&key=" + key;
        print(body);
        fetch_params.body = body;
        let html = post(url, fetch_params);
        let data = JSON.parse(html);
        VODS = data.list.map(function (it) {
            it.vod_pic = urljoin2(input.split("/i")[0], it.vod_pic);
            return it
        });
    }),
    二级: {
        title: '.slide-info-title&&Text;.slide-info:eq(3)--strong&&Text',
        img: '.detail-pic&&data-original',
        desc: '.fraction&&Text;.slide-info-remarks:eq(1)&&Text;.slide-info-remarks:eq(2)&&Text;.slide-info:eq(2)--strong&&Text;.slide-info:eq(1)--strong&&Text',
        content: '#height_limit&&Text',
        tabs: '.anthology.wow.fadeInUp.animated&&.swiper-wrapper&&a',
        tab_text: '.swiper-slide&&Text',
        lists: '.anthology-list-box:eq(#id) li',
    },
    //搜索: 'json:list;name;pic;;id',
    搜索: $js.toString(() => {
        let html = fetch(input);
        let list = pdfa(html, ".public-list-box");
        VODS = list.map(x => {
            return {
                vod_name: pdfh(x, ".thumb-txt&&Text"),
                vod_pic: pdfh(x, ".lazy&&data-src"),
                vod_remarks: pdfh(x, ".public-list-prb&&Text"),
                vod_content: pdfh(x, ".thumb-blurb&&Text"),
                vod_id: pdfh(x, "a&&href")
            }
        });
    }),
    图片替换: '&amp;=>&'
}