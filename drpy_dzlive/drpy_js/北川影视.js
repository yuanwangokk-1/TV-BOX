// 发布页 https://www.bcyingshi.ink/fb
muban.mxpro.二级.desc = '.module-info-item:eq(3)&&Text;;;.module-info-item--span:eq(2)&&Text;.module-info-item--span:eq(1)&&Text';
muban.mxpro.二级.tabs = '#y-playList .module-tab-item';
var rule = {
    title: '北川影视',
    模板: 'mxpro',
    // host:'https://bczhuiju.com',
    host: 'https://www.bcyingshi.ink/fb',
    hostJs: 'print(HOST);let html=request(HOST,{headers:{"User-Agent":PC_UA}});let src=jsp.pdfh(html,"li:eq(2)&&a&&href");print(src);HOST=src',
    // url:'/vodshow/fyclass--------fypage---/',
    url: '/vodshow/fyclassfyfilter/',
    filterable: 1,//是否启用分类筛选,
    filter_url: '-{{fl.area}}-{{fl.by or "time"}}-{{fl.class}}-{{fl.lang}}-{{fl.letter}}---fypage---{{fl.year}}',
    filter: 'H4sIAAAAAAAAA+2ZbU8TWRTHv4qZt/CCKfiwvgMEFy0PKopifFFNs2sWMQF2E2JICqXYsjwHqQiRZFcsGkqLErZMM/BlOnfab+Gd3vNwyeqk2VRdw7yb3//fe+eee2/OOQzPDNO4fP+Z8Vt03LhsPBqKjI4ajcZw5ElUopPKiHhC8h+Rod+j1d8Ne3JipxLf8WQJxkQjqGub8vegAqDnJvdhIgb0xOSSiK2BB0Bzzu6U7E2cUwHNmVl2joo4pwIaRwtnoHGzOdd+j+MU0Ljt5zwnAK1zatddW8Z1KiAvPiumXqGngObcO3SsLM6pgLyZlcr6O/QUkLc0J2K0nwrQK58syd0AD4DWknxZslK4FgUU++Rx5dUxxq4AvZ/besHwnlBta2vv7ekAQ0KDR2i2drcOsotEE94O38YZvUca1dcX7ui/g6M8apCIdmfvXbC8p4kHnq5uZ2QkGtEu52bembNqvZxvMpX1GdxMBehV3q6LQg48ABq3mBdHuGEAtJnHC86GjZupgA4hvS02d/EQFND7tt7xOAB633zesd7i+xTQof+5z+MA6H0fX7AHQOtcfu0kCrhOBeiVTqZdOy3WMHxmnjmvz1wF/VCGIsO/8KGUc9nyTqzWQ9mw5e8xWAVasOwBUEAf3rAHQJubtp35NNvM2vZrtgLt2NgD0LZY8xRQJMf/aJEoIC9x6OzF0VOgb+B4NDKi3eqjg1LRrnEDQ02hFtCqj5rezHqzrodYD+m6ybqp602sN2m6+RPp8lHTL7F+Sdcvsn5R1y+wfkHXz7N+Xtc5XlOP1+R4TT1ek+M19XhNjtfU4zU5Xvl46p5Hx8ai+kFl0yI3X+NBtWKy47yKKZWUdlDaSbkCyhVSMNVyku3EXEnKVVCuciLGLExKFyhdpFwD5Rop10G5TkoYlDAp3aB0k9IDSg8pWFW4pvSB0kfKDVBukHITlJuk3ALlFin9oPSTgvWGiw2WGa4vA6AMkIL15i4p90C5R8ogKIOnLsXDcb4QYmHFsRb/dSFE+rCSPoDRY4/lTyn3WpbIr4Lz6+OxUU5+uWknidVq9NHTkaj31geNRqhOvZq7leVerQHorDRy/7Xp8msAXeu9Y79wU89xOcRfs2Xr6ejvDHfh9UX6nzd0uPY2THjeU73avJmE/D0dbRW+Zpvn18r5tYCfbapqaPN82rWz2JIFrVXQWgWtVdBa1aO1aq5Ta1WJpdxMDHOZAspl8YSY3sJcpoAWtndSzicxuyqgcStZMbuN4xRwfkyIAv51D8B59WPpaInyahW0slb5G9cCoHcze6+1VkYCvW/jQzll4fsU0LjVLXFAnZwCGlcoiORiyVrhLuiURPtw8JdbXMR9UEBz7E+VJ+dwtIJv0DnITkH2BLToKmjlSRYsLk8ekLebkRuLnoLvX6fPBYU6KNRBoQ4KtfFjFuqWb/D/Kt9PBD6fMnw/O/h8ypDTuKtFntMDStk+n0e+8AGgTiVxwy5ZtEEKtGT/5T9uP1f2uBCUiviNCOD7l8SgIgYVMaiIQUU0fsSKOPEJtJr2PsMhAAA=',
    searchUrl: '/vodsearch/page/fypage/wd/**/',
    class_parse: '.navbar-items li:gt(1):lt(6);a&&Text;a&&href;.*/(.*?)/',
    cate_exclude: '更新',
    二级: {
        "title": "h1&&Text;.module-info-tag&&Text",
        "img": ".lazyload&&data-original",
        "desc": ".module-info-item:eq(1)&&Text;.module-info-item:eq(2)&&Text;.module-info-item:eq(3)&&Text",
        "content": ".module-info-introduction&&Text",
        "tabs": ".module-tab-item--small",
        "lists": ".module-play-list:eq(#id) a"
    },
    lazy: `js:
		var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
		var url = html.url;
		if (html.encrypt == '1') {
			url = unescape(url)
		} else if (html.encrypt == '2') {
			url = unescape(base64Decode(url))
		}
		if (/\\.m3u8|\\.mp4/.test(url)) {
			input = {
				jx: 0,
				url: url,
				parse: 0
			}
        } else if (/youku|iqiyi|v\\.qq\\.com|pptv|sohu|le\\.com|1905\\.com|mgtv|bilibili|ixigua/.test(url)) {
			let play_Url = /bilibili/.test(url) ? 'https://jx.xmflv.com/?url=' : 'https://jx.777jiexi.com/player/?url='; // type0的parse
			input = {
				jx: 0,
				url: url,
				playUrl: play_Url,
				parse: 1,
				header: JSON.stringify({
					'user-agent': 'Mozilla/5.0',
				}),
			}
		} else {
			input
		}
	`,
}