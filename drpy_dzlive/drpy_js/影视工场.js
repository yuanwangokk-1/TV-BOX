muban.首图.二级.desc = ';;;.myui-content__detail p:eq(4)&&Text;.myui-content__detail p:eq(2)&&Text';
muban.首图.二级.content = '.text-collapse p&&Text';
var rule = {
    title: '影视工场',
    模板: '首图',
    host: 'https://www.ysgc.fun',
    url: '/vodshow/fyclassfyfilter.html',
    filterable: 1,//是否启用分类筛选,
    filter_url: '-{{fl.area}}-{{fl.by or "time"}}-{{fl.class}}-----fypage---{{fl.year}}',
    filter: 'H4sIAAAAAAAAA+2YW0/bSBTHv4ufeRiH3r/Kqg/ZKtJWvawE3ZVQhVTIpSGFJFSUQBNIKwiBlhBTUAhOk3wZz9h8izqeORdpK8tt0VZq85bf+XvOzH8yPsf2c8u27v3x3HqUWbDuWQ8ep+fnrRnrafpJJkS50lbZfMj/ph//k4muezoJ5w+vsoeTcAjW4oyJlg69YcNEDaC22QhzgaYBNL94aiYhQK29Li8HoGkATS1V1YtNoxlAbfnY31wHTQNq2ZJafguaBpyv1PWHH2A+DegBN4MAcxa3PHcFcmpg++JvDGhfJoBa6yX5M4A5Owfe6B3k1IDjKvvBHq5FA2qF11fbR6BpQK1ckJVPoGmg+VaD4i7OFwGOO+lJtwPjNOCeDdf9AfzvBhbvT1R9ptJzmTQ7Ug1HrrpJj1QhH16PViIA7epgW/W7RjNA2+OoyxFuTwRos9ZSjWOwqQFzNo9kfQg5NeC4M4c0A7gFozJpBnAta450D2AtGijnG57zDR8XvDolzQBo3jjnD2tqE+wT46yjCxptADO3xn6l469sQ3JkXFeuIvfbsginiBivGJ3piOfircRDONfahczDP2iAH46FTHqOHY7Lc28wTHg4UiJ1w8Sinyw+S/FZHk9RPMXjNsVtHhcUFyxu38V4+JPF71D8Do/fpvhtHr9F8Vs8fpPiN3mc/Nrcr01+be7XJr8292uTX5v7tcmvzf0K8iu4X0F+BfcryK/gfgX5FdyvIL+C+xXkV3C/gvwK7leQX8H9CvIruF9BfsOf/Fj+uUCHUpVfS7fyn0Opar2r2rlJ8OxheCnena6rnA2j/PXw2TzdDd2cLBaMMv/g77nMZNb7M1bqmnpwXC+N6xnf2y/jenBcv/TLjjfYg3VqwCKcHcr+MhRhDZhzqSezFcipIYkHWWioHdAMJOmJQedArsLzgIEkPfF7+3rc807cs0ngrIVPHbBODTjuaBz0SjBOA3n4KAcX6CECHNfaDbo7ME4D6/n0PGdg2vMT9fy4zvzV54Fpt/zFu+WPdcWf2LVmr6lrqequf4yVWwPeZo1muDK//QLuNGRc3tKqbLhQ+zTg6I+7qoRDNeCNePRWLb2CG1ED9by8yjWx50VAxSSv+n0sJhHgfBtNdY71WwMWmlpX5s+g0GjAnP2+KkJfM4A53Q/yBN7LDOC4rbLawnVqwH05GQdOEfZFA2q5U1nZo10l/h+qeFi1w/qMZiNglTqswVSpJ4DacTuss6BpmFbHX706Tt8lvrEq37iuqhxTA2OfU7Od4D3WXA2Ys3zoV2HRBpJ0gbhvWkF1JyjDtzcDmPPde1mHZ3QDmDPme6VquPQ8bQDnG1fDq2E+DTgu7jugE24T/MkGuNY6Y1qLeoO/P/I+w/uXAXp3acpiHd9dIqCj80l2qkYzgDnrJbUNPdMA7cupHNdwXyJALd/zBvC+Z+C6OkZ96Ln4iVhDkuf3r3aFhMuddoxpx/jtO8biFyHU9AoDGgAA',
    searchUrl: '/index.php/rss/index.xml?wd=**',
    class_parse: '.nav-list li:gt(0):lt(8);a&&Text;a&&href;/(\\d+).html',
    cate_exclude: '少儿',
    tab_remove: ['LZ源'],
    搜索: `js:
		pdfh = jsp.pdfh, pdfa = jsp.pdfa, pd = jsp.pd;
		let d = [];
		var html = request(input);
		let list = pdfa(html, "rss&&item");
		for (var i = 0; i < list.length; i++) {
			var title = list[i].match(/\\<title\\>(.*?)\\<\\/title\\>/)[1];
			var desc = pdfh(list[i], 'description&&Text');
			var cont = pdfh(list[i], 'pubdate&&Text');
			var url = list[i].match(/\\<link\\>(.*?)\\n/)[1];
			d.push({
				title: title,
				desc: desc,
				content: cont,
				url: url
			})
		}
		setResult(d)
	`,

    //是否启用辅助嗅探: 1,0
    //sniffer: 1,
    // 辅助嗅探规则js写法
    /*isVideo: `js:
		log(input);
		if (/m3u8\\?sign=/.test(input)) {
			input = true
		} else if (/index\\.m3u8/.test(input)) {
			input = true
		} else {
			input = false
		}
	`,*/
}
