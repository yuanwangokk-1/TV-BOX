globalThis.searchphp = '';
var rule = {
    title: "auete",
    host: "https://auete.pro/",
    hostJs: 'let html=request(HOST);searchphp=html.match(/form action="(.*?)"/)[1];',
    url: "/fyclassfyfilter/indexfypage.html[/fyclassfyfilter/index.html]",
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: "H4sIAAAAAAAAAJXTwU7CQBAG4HfZM4l3zp5IvHnScFjSprTAVpRWgZCAhAiYiCSIRki8YMCYKMSYIKU+DdviW7gUaf9667F83dm/M0OZHOimKpP4cZlk5CKJkwJVSIwwmpP9B5Nmje0rTPzG+0PeGrutq42I570L7YRUYn/YnqzsIaBUCtBtzpx6A5DmAcdd/mUBZtIBOrVbp9pHTAHW287lI6B2Bth8WC1agCUIJL4jHEjbBEpWkjFyaEbpift9I2rtquhGTlb9S36eXsDSlGlGkO7+GexURfqYAhVpgaK6dhf0nDIFkHfwaPggH9irhW9MVqUgqTN/x3NmStF8W1/PMI4avnDUD6XxLvTaeFSMtFoD27WWuzqKoZd0pmAjQUUjQypGACoGsFUvxX4uUor2xO1Z/gKLMmmD4sic5Wswshxl2FwwkR9RBAQUAT308uXVAo2ScP025fYd7G0iC38kq8Mbc0TpP8KwEpIWWqrR2O19cnvmDxMqb3dnXa2FX8lSXVIp2+yE9z2VX1mJ3vdVBAAA",
    filter_url: "{{fl.tag}}",
    filter_def: {},
    headers: {
        "User-Agent": "MOBILE_UA"
    },
    timeout: 5000,
    class_parse: ".navbar-nav&&li:lt(6);a&&Text;a&&href;.*/(.*?)/index",
    cate_exclude: "发布|影讯",
    play_parse: true,
    lazy: 'js:eval(unescape(base64Decode("anM6CgkJcGRmaCA9IGpzcC5wZGZoOyBwZGZhID0ganNwLnBkZmE7IHBkID0ganNwLnBkOwoJCWxldCBkb2N1bWVudCA9IHt9OwoJCWxldCBuYXZpZ2F0b3IgPSB7CgkJCXVzZXJBZ2VudDogTU9CSUxFX1VBLAoJCX07CgkJbGV0IGJhc2U2NGRlY29kZSA9IGJhc2U2NERlY29kZTsKCQlsZXQgcG4gPSAnJywgbm93ID0gJycsIG5leHRQYWdlID0gJycsIHByZVBhZ2UgPSAnJywgbmV4dCA9ICcnLCB2aWQgPSAnJywgdmZyb20gPSAnJywgdnBhcnQgPSAnJywgc3JjVXJsID0gJyc7CgkJZXZhbChyZXF1ZXN0KEhPU1QgKyAiL2pzL3BsYXkuanMiKSk7CgkJbGV0IGh0bWwgPSByZXF1ZXN0KGlucHV0KTsKCQlldmFsKHBkZmgoaHRtbCwgIi5tYi0yJiZzY3JpcHQmJkh0bWwiKS5yZXBsYWNlQWxsKCd2YXIgJywnJykpOwoJCWV2YWwocGRmaChodG1sLCAiLm1iLTImJnNjcmlwdCwxJiZIdG1sIikucmVwbGFjZUFsbCgndmFyICcsJycpLnNwbGl0KCJkb2N1bWVudCIpWzBdKTsKCQlsZXQgcGFyc2VIdG1sID0gcmVxdWVzdChIT1NUICsgIi9qcy9wbGF5ZXIvIiArIHBuICsgIi5odG1sIik7CgkJbGV0IHBhcmVudCA9IHsKCQkJbm93OiBub3csCgkJCW5leHRQYWdlOiBuZXh0UGFnZSwKCQkJbmV4dDogbmV4dCwKCQkJdmlkOiB2aWQsCgkJCXZmcm9tOiB2ZnJvbSwKCQkJdnBhcnQ6IHZwYXJ0LAoJCX07CgkJbGV0IHBhcmpzID0gcGRmaChwYXJzZUh0bWwsICJib2R5JiZzY3JpcHQmJkh0bWwiKTsKCQlldmFsKCJzcmNVcmwgPSAnIiArIHBkZmgocGFyanMsICJpZnJhbWUmJnNyYyIpICsgIiciKTsKCQlpZiAoc3JjVXJsLmluZGV4T2YoIj91cmw9IikgPiAtMSB8fCBzcmNVcmwuaW5kZXhPZigiP3VpZD0iKSA+IC0xKSB7CgkJCWlucHV0ID0ge2p4OjAsIHVybDpzcmNVcmwuc3BsaXQoIj0iKVsxXSwgcGFyc2U6MH0KCQl9IGVsc2UgewoJCQlsZXQgcHVybCA9IHNyY1VybC5zcGxpdCgiPSIpWzFdLnNwbGl0KCIsIilbMV07CgkJCWlucHV0ID0ge2p4OjAsIHVybDpwdXJsLCBwYXJzZTowfQoJCX0=")))',
    double: false,
    推荐: "*",
    一级: ".threadlist&&li;.title&&Text;.pic&&img&&src;.hdtag&&Text;a&&href",
    二级: {
        title: "meta[property]:eq(1)&&content;meta[property]:eq(4)&&content",
        img: ".cover&&img&&src",
        desc: ".media-body&&.small&&Text;.module-info-item:eq(2)&&Text;.module-info-item:eq(3)&&Text;meta[property]:eq(6)&&content;meta[property]:eq(5)&&content",
        content: "meta[property]:eq(-1)&&content",
        tabs: "#player_list&&h2",
        lists: "#player_list:eq(#id) a",
        tab_text: "*--span&&Text",
        list_text: "body&&Text",
        list_url: "a&&href"
    },
    searchUrl: '/auete2so.php?page=fypage&searchword=**',
    搜索: `js:
	let cookie = "";
	let submit_url = "";
	let html = "";
	log("-----------------------------");
	for (var i = 0; i < 2; i++) {
		let yzm = HOST + "/include/vdimgck.php";
		let html = request(yzm, {
			withHeaders: true,
			toBase64: true
		}, true);
		print(yzm);
		let json = JSON.parse(html);

		if (!cookie) {
			let setCk = Object.keys(json).find(it => it.toLowerCase() === "set-cookie");
			cookie = setCk ? json[setCk].split(";")[0] : "";
		}
		console.log("cookie:" + cookie);
		let img = json.body;
		html=post('https://api.nn.ci/ocr/b64/text',{body:img});

		html=eval(html.slice(0,3));
		print(html);
		submit_url = HOST + searchphp +"?scheckAC=check&page=&searchtype=&order=&tid=&area=&year=&letter=&yuyan=&state=&money=&ver=&jq=" ;
		fetch_params.headers["Cookie"]=cookie;
		fetch_params.body ="validate="+ html+"&searchword="+KEY ;
		html = post(submit_url, fetch_params);
		if (html.indexOf(KEY)>0) {
			log("********************");
			let list = pdfa(html, ".card-body .media");
			list.forEach(it => {
				d.push({
				title: pdfh(it, "a&&Text"),
				desc: pdfh(it, ".text-grey&&Text"),
				pic_url: pdfh(it, "a&&data-original"),
				url: HOST+pdfh(it, "a&&href")
				})
			});
			setResult(d);
			break;
		}	
	}`,
}