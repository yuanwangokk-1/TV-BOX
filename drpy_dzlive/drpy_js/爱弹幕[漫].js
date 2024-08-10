muban.短视2.二级.img = '.detail-pic&&img&&data-src';
var rule = {
    title: '爱弹幕[漫]',
    模板: '短视2',
    host: 'https://anime.girigirilove.com',
    homeUrl: '/map/',
    // url:'/show/fyclass--------fypage---/'
    url: '/show/fyclassfyfilter/',
    filterable: 1,//是否启用分类筛选,
    filter_url: '-{{fl.area}}-{{fl.by}}-{{fl.class}}-{{fl.lang}}-{{fl.letter}}---fypage---{{fl.year}}',
    filter: 'H4sIAAAAAAAAA+1Yy07bQBT9F68RGodn+ZWKRYqiFpVSCWglhJBMQiBACoZCWogFZYES1AQC6SKPJv0Zz9j5izrM3Lk3KrK8iABV3vmc47kzx7q5x86akTBmXq8Z71Orxowxt5BcXjZGjMXkh1QAvbs2P98L8OfkwqfUw32LAc2z5V6m3KcDYKyPKLbg8J2SYhUAzcvdiUxWaQqAJjZsYRWUpoCuuVt2Ow7UlEDXLB3yZhtqSqDX7ZRwPwX0frnvbmsH9pNAr7vaxpoKaG3rqHd6DZoEuma64hUOoaYEWvtxyYtV0CTQNe19fvMTakqg/WWq/qUF/iQAzf9jB09DaQrodaddbudgnQSguc1TflVXmgL6nE7LO76Hc0qgtW9XvNEATQLQetVjUT/htUOsPEBpr7/TbqPgneTBrsa0S3YLPeeeNIrEeq+Lutu0YRcJ9DOxoXL/an22z8uuTi6lktjU3KnxfCtiU7sNSzjwMBXQhopF1BTAdRm6LjOw7ssGWScBPe5qKrlEjtv85bY7EY+bYIlxxT1cEn4M+THKJ5BPUN5E3qQ8Q54R3nyl+eCS8NPIT1N+Cvkpyk8iP0n5CeQnKI9+TerXRL8m9WuiX5P6NdGvSf2a6Nekfhn6ZdQvQ7+M+mXol1G/DP0y6pehX0b9MvTLqF+Gfhn1y9Avo34Z+mXUL0O/wSVty4Xk4ltsS/+26petiG0ZTIzgfhwffYC/og5qCtBt36zipmL/iLcO/tlUOJYo1FSJlfngVpxpVjA5lfJufmUZp8XtJs9tKWV57uNSqr/r7IgxNqQ4FPa5V9GRIEEch08Yh8MJAL6VDe7XNh+AttK45QegKUBavndxjS3fB1qrlLzuPmgSxAEQB8AwA2A4g/vR4Qw/ur071BR4zsEddONwJnfYdA6bsl77gGfhJVmBKNMybDqHTXxu54WlP7gkiPIxFjbVw9JHDvJRkdkV6bOB4Q5clEx5dPiBVs37uXPQJNBPd6PbO+vC05VA98RNjXdORkW9hqYHOf1e3vnqp+H7QgFMmJK/CamlwJBSJAgA4VQwDfog0gMJTl/sgCZBnBRxUkRMitHBWFD4CV7qH80G7GmyToJnzQ0z/gPs/3jjh3Uhf4D5VgeHrQLYOy/4D7B46MdD/8V9HoRFgNuoisI2vGlJ8GI/HcZJBDz55pPPtvn6X4c9w5P+GQAA',
    searchUrl: '/search/**----------fypage---/',
    class_name: '日漫&美漫&剧场版&真人剧&BD副音轨&其他',
    class_url: '2&3&21&20&24&26',
    play_parse: true,
    lazy: $js.toString(() => {
        let html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        let url = html.url;
        let from = html.from;
        let next = html.link_next;
        if (html.encrypt == '1') {
            url = unescape(url)
        } else if (html.encrypt == '2') {
            url = unescape(base64Decode(url))
        } else if (html.encrypt == '3') {
            url = url.substring(8, url.length);
            url = base64Decode(url);
            url = url.substring(8, (url.length) - 8)
        }
        if (/\.m3u8|\.mp4/.test(url)) {
            input = {
                jx: 0,
                url: url,
                parse: 0
            }
        } else {
            let paurl = request(HOST + '/static/player/' + from + '.js').match(/ src="(.*?)'/)[1];
            if (/https/.test(paurl)) {
                let purl = paurl + url + '&next=' + next + '&title=';
                input = {
                    jx: 0,
                    url: purl,
                    parse: 1
                }
            }
        }
    }),
    推荐: '.border-box&&.public-list-box;a&&title;.lazy&&data-src;.public-list-prb&&Text;a&&href',
    double: false, // 推荐内容是否双层定位
    一级: '.border-box .public-list-box;a&&title;.lazy&&data-src;.public-list-prb&&Text;a&&href',
    搜索: '.row-right&&.search-box;.thumb-txt&&Text;.lazy&&data-src;.public-list-prb&&Text;a&&href',
}