muban.mxone5.二级.desc = '.video-info-items:eq(4)&&Text;;;.video-info-actor:eq(1)&&Text;.video-info-actor:eq(0)&&Text';
muban.mxone5.二级.tab_text = 'body--small&&Text';
var rule={
	title:'新视觉影视',
	模板:'mxone5',
	host:'https://kan80.app',
	hostJs:'print(HOST);let html=request(HOST,{headers:{"User-Agent":PC_UA}});let src=jsp.pdfh(html,".go:eq(0)&&a&&href");print(src);HOST=src',
	url:'/vodshow/fyfilter.html',
   filter_url:'{{fl.cateId}}-{{fl.area}}-{{fl.by}}-{{fl.class}}-{{fl.lang}}-{{fl.letter}}---fypage---{{fl.year}}',
   filter:'H4sIAAAAAAAAA+2ZW28aRxTHn52PwbMfZnFuzVep8kAj1EZ1XclOK1mRJduAA9jh4hIwARtHsQ1OwF4S18WgNV+GmYVv0YWZcyFVV9vWUltp3/Z3zszs+c/tHJaX9xYWIlbkydcvI9/H1yNPIs+WY2trkcXISuyHuIcy01SJlMc/x5Z/is/arUzNqdYk0ZqaPYhsLBprue61N1YD4HPTXTMQAfjUVkFtlo3PAI6ZbY2cOoypAcdsFuXNAMbUgP0wcAJ8X/pg1M/A+zSAb9w5k3sfjM8Avi976TrgM8DidEsDinMK6Dt9RXEawFg6Z6PbY4hFA/bb2Z9Uz6GfBux39MGLHPppCDKfarvtlovg04C+RFZtvwWfBtQ+yMtUD7RrAN/kcF8dnBqfARyz/Gqc6cOYGlDf7YVb+lU6XZCIjC3yJ+P3uIoa0JfbkflP4NOAqzgseGsAq6iBZrWuDos4qzNAX3LofgQlBnAGnKI7qM8FPGfaeDptqU9RbDUeY4eobsu9fsBDNOp1ZM2RJ81Jdcf45kzz7SZnVdW7nGtnTF+Ml7fVze38eNqE8m5znhGEacBF/PyGfAZwqne75DOA/Sqnqt6Gfhpw0zTOqZ8B2hi/kc8AxWLzWOy5fq9t2T+DfhqwXzLvzaBMw3kiRiWnQzffcTNVEINMh/xY7Q69bnjOgbFF6lpeJMCtgW+M5djKt7QxxpedcWsz6O1ac7z2MLQGtgjkM4AL++mEfAZwESqOfF0hNzFbJubWwJaXfAbYlmE+DWx5mRINQSdwPR5bZSfr5mo0cAJOYFRE7xvb7JHZl8i+xO1Rske53SK7xe2C7ILZra/Q7j0y+2OyP+b2R2R/xO0Pyf6Q2x+Q/QG3k16L67VIr8X1WqTX4not0mtxvRbptbheQXoF1ytIr+B6BekVXK8gvYLrFaRXcL2C9AquV5BewfUK0iu4XkF6BdcrSK/3yLflN+u0KVVuX/bzf9iUqnI9qVyZAV4895riFd3vK7tkPN89f7FG5/oyKdOQBtae/bgan7716eK0aoveUdXmV5n55V+/SmKScGRvG24NDUGqRL/KzK+i86tA/OoEL4FTLAaCVG1+lZnMduWwghliBoEqyDc7VNEZCFLRuefD8XUWxtQQpNbxdp2bAQ0GWCyj3luKZQr4vlJDXWHVrQF9jQ6bTw1Bb/b/Yc3kV8P41T7+tdaf1ze+tVbZ9soRefgOa23gsDb5ojYJa4ywxghrjCA1xtId1Riq11PpPJxGDfj+ZFfm37vNTbgikOmcfx7dFPCczwBHTqRUsgEjawiSqcZbe7IO3yUMYL96Y5oPMSJifGvhyG1j7aOBbpe2W4N8bADfmumrOqQeA+i7GI7tNPg0YES1rKpCtAZwZZ1fxttQ3xjAWOyiTA4hFg10Q15LG7/2aAhUG/z7edzL1V4mxu00g0A5ud30si300xBmxzA7wmOYHcPs+Bey4/27+t/E7zt/+kCV4dekgSBZyO97vd//Jm4uyXwa8EbplMhnAGPx+R9Dbe26afhmbgB9uZZbgPk1wG4p2QMNBtB3/E7W8AbTgD6fLxM6l88ldloHvy8FH49UFgsCDf+ljPg3v7SHGTHMiGFGDDPiP8+I9xY2fgdl7JXkTSAAAA==',
    filter_def:{
        1:{cateId:'1'},
        2:{cateId:'2'},
        3:{cateId:'3'},
        4:{cateId:'4'}
    },
   cate_exclude:'纪录片',
   tab_rename:{'高清线路②':'量子','超清线路3':'乐视','高清线路③':'非凡','高清线路④':'优质','高清线路⑤':'索尼','超清线路2':'360'},
	searchUrl:'/vod-s/**----------fypage---.html',
	tab_remove:['夸克4K'],
	lazy:`js:
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
		} else {
			input
		}
	`,
}