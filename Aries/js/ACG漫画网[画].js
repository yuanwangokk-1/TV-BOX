/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 0,
  title: 'ACG漫画网',
  lang: 'ds'
})
*/

class Rule {
    类型 = "漫画";
    author = "LoyDgIk";
    title = "ACG漫画网";
    desc = "";
    host = "https://acgmhb.com/";
    homeUrl = "";
    url = "fyclass-fypage.html";
    searchUrl = "/q/**-fypage.html";
    searchable = 2;
    quickSearch = 0;
    headers = {
        'User-Agent': 'okhttp/3.14.9',
    };
    timeout = 5000;
    play_parse = true;
    class_name = "最新&英文同人&日语漫画&中文漫画";
    class_url = "index&language/english&language/japanese&language/chinese";

    async 预处理() {
    }

    async 推荐() {
    }

    async 一级(tid, pg, filter, extend) {
        let {
            //MY_CATE,
            pdfa,
            pdfh,
            pd,
            input
        } = this;
        let d = [];
        let html = (await req(input)).content;
        let arr = pdfa(html, "#list&&li");
        for (let it of arr) {

            //let img = url.split('src="')[1].split('"')[0];
            let img = pd(it, "source,1&&srcset") || pd(it, "img&&src");
            let text = String(pdfh(it, "a&&title"));
            d.push({
                title: text,
                pic_url: img,
                desc: String(pdfh(it, ".time&&Text")),
                url: pd(it, "a&&href") + "#" + encodeURIComponent(text)
            });
        }
        //console.log(d)
        return setResult(d);
    }

    async 搜索(wd, quick, pg) {
        try {
            // log(Object.keys(this));
            return this.一级();

            // let 一级 = rule.一级.bind(this);
            // return await 一级();
        } catch (e) {
            log(e.toString())
        }

    }

    async 二级(ids) {
        let {
            input
        } = this;
        let a = input.split("#");
        let vod = {
            vod_id: a[0],
            vod_play_from: "ACG",
            vod_play_url: decodeURIComponent(a[1]).replace("$", "_") + "$" + a[0],
        };
        return vod;
    }

    async lazy(flag, id, flags) {
        try {
            let {
                input,
                pdfh,
                pdfa,
                pd,
            } = this;
            var firstPage = await request(input);
            var i = pdfh(pdfa(firstPage, "#pages&&a").at(-2), "Text");
            var map = (html, arr) => {
                pdfa(html, ".manga-picture&&img").map(item => {
                    arr.push(pdfh(item, "img&&src"));
                });
            }

            var htmlUrl = [];
            for (let p = 1; p <= i; p++) {
                htmlUrl.push({
                    url: input.replace(".html", "-" + p + ".html")
                });
            }
            var htmlArr = await batchFetch(htmlUrl);
            var picArr = [];
            map(firstPage, picArr);
            htmlArr.map(item => map(item, picArr));

            return {
                parse: 0,
                url: "pics://" + picArr.join("&&"),
                js: ''
            }
        } catch (e) {
            log(e.toString())
        }
    }
}

rule = new Rule();
