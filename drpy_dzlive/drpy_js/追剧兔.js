Object.assign(muban.短视2.二级, {
    img: '.lazy&&data-src',
});
var rule = {
    模板: '短视2',
    title: '追剧兔',
    host: 'https://zjtu.tv',
    class_name: '电影&电视剧&综艺&动漫&记录&短剧',
    class_url: '1&2&3&4&5&20',
    searchUrl: '/index.php/ajax/suggest?mid=1&wd=**&limit=50',
    detailUrl: '/project-fyid/',
    推荐: '.public-list-box;a&&title;.lazy&&data-src;.public-list-prb&&Text;a&&href',
    图片替换: $js.toString(() => {
        input = input.replace('mac://', 'https://');
    }),
}