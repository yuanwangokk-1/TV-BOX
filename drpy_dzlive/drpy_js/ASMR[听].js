var rule = {
    title: 'ASMR助眠[听]',
    host: 'https://asmrasmr.top',
    url: "/fyclass/page/fypage",
    searchUrl: '/page/fypage?s=**&type=post',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    class_name: '国内&日本&国外&韩国',
    class_url: 'guonei&riben&guowai&hanguo',
    play_parse: true,
    lazy: $js.toString(() => {
        let html = post('https://asmrasmr.top/wp-json/b2/v1/getPostVideos', {
            headers: {
                'User-Agent': PC_UA,
                'Cookie': '__51uvsct__3IAMSCC5G7Y2Y1Ru=1; __51vcke__3IAMSCC5G7Y2Y1Ru=58facad0-766a-5603-b4d7-83c027053a07; __51vuft__3IAMSCC5G7Y2Y1Ru=1719079277800; __vtins__3IAMSCC5G7Y2Y1Ru=%7B%22sid%22%3A%20%22120f7985-dd06-562a-924f-c928d22f92d7%22%2C%20%22vd%22%3A%202%2C%20%22stt%22%3A%2010023%2C%20%22dr%22%3A%2010023%2C%20%22expires%22%3A%201719081087819%2C%20%22ct%22%3A%201719079287819%7D'
            }, body: {post_id: input.split("/")[4], order_id: 'null'}
        });
        let data = JSON.parse(html)
        let url = data['videos'][0].url + '#.mp4';
        input = {parse: 0, url: url}
    }),
    double: false,
    推荐: '*',
    一级: '.b2_gap&&.post-module-thumb;.post-thumb&&alt;img&&data-src;;.post-module-thumb&&a&&href',
    二级: '*',
    搜索: '*',
}