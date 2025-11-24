/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: '奇米动漫',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    title: '奇米动漫',
    host: 'http://www.qimiqimi.net',
    url: '/show/fyclassfyfilter.html',
    filterable: 1,//是否启用分类筛选,
    filter_url: '{{fl.area}}{{fl.by}}{{fl.class}}{{fl.letter}}/page/fypage{{fl.year}}',
    filter: 'H4sIAAAAAAAAA+2WW08TURSF/8s8Y3qmcvWN+/1+x/BQsGqVS9IWY0NIVLBW0VIIUghQJbEBQiugxJQ28Gs6U/ovnHZmdndXX3jk4bwx61vsPWcxJ6xl5a1n4blrQXnydFl57Q4oT5TZOZfPp1QpC655t/GYu8xosXXj+Y1rbsld9BluRft4kl89KcjGg7JSZanBrfzeqaU6ipMclmZbcqvJu6N35RZLoynxT9p1BqaYmm3R36/nQpflFksjy88jbT8JFlOjRZGw9vsMFpkaTYnEcolNmGJqZPmT0ddCYDE1OnQ8lk9uw6FNzbYYP+t/v5dbLI2m7N1qEVhkafQu4ZNcJAjvYmo05XizIl1LI8tZTP+CfyNTo0UfErkdzMXU6ESHW/puHE5kajQltJtNf4YppmZb7iKHd2GwWBqLruJElsYW6TvRikUFjSzRuJZKgcXUVqYLJvN6uLxuV+l2aAcX2tf0PW+HMU0/SNgbCoMcpuQofZG/jvN7wTJLNpXU9m9KFj1xnLsNl08pSiVL/sep8StlFlNiU1Ln2sZF+ZSi5Cg7bcDt8rLTXl9lMzf3PK1TOB/b8wtjHEWBUSdSJ6cqUpVTgVQwqjYANQRG65HWc1qHtI7TWqS1nNYgreG0Gmk1p5iVyrNSMSuVZ6ViVirPSsWsVJ6VwKwEz0pgVoJnJTArwbMSmJXgWQnMSvCsBGYleFYCsxI8K4FZCZ6VwKwEz0pgVobAr8Oc2+938wuRjOrn3yovBMn8QjTas80pjkYiTUCaiDQDaSbSAqSFSCuQViJtQNqItANpJ9IBpINIJ5BOIl1Auoh0A+km0gOkh0gvkF4ifUD6iPQD6ScyAGSAyCCQQSJDQIaIDAMZJjICZITIKJBRImNAxoiMAxknMgFkgsgkkEkiU0CmiIhHDcAKCr8CM4HS56+Ht7T0RsXnr0f/5aNX9pyZgMPvMez2imw6rV9sM/rS4/eV/t2fr2mhIKO+2UWvu/AG01WK1zMvqypbJKuqrKqyqsqqKquqrKqyqsqqqsiq+lCq6oulRdlVZVeVXVV2VdlVZVeVXVV2VdlVZVd9kF311eyzedlUZVOVTVU2VdlUZVOVTVU2VdlUZVN9aE115T/22zEHrioAAA==',
    searchable: 2,//是否启用全局搜索,
    headers: {//网站的请求头,完整支持所有的,常带ua和cookies
        'User-Agent': 'PC_UA',
    },
    class_parse: '#nav li;a&&Text;a&&href;.*/(\\w+).html',
    cate_exclude: '番组专题|最近更新',
    play_parse: true,
    lazy: '',
    limit: 6,
    推荐: '*;*;*;.text&&Text;*',
    一级: '.img-list li;a&&title;img&&src;i&&Text;a&&href',
    二级: {
        "title": "h1&&Text;dl.fn-left:eq(3)&&Text",
        "img": ".detail-pic&&img&&src",
        "desc": "dl.fn-left:eq(2)&&Text;;;.nyzhuy--dt&&Text;.fn-right:eq(0)--dt&&Text",
        "content": ".tjuqing&&Text",
        "tabs": ".down-title h2",
        "lists": ".video_list:eq(#id) a"
    },
    searchUrl: '/index.php/ajax/suggest?mid=1&wd=**&limit=50',
    detailUrl: '/detail/fyid.html', //非必填,二级详情拼接链接
    搜索: 'json:list;name;pic;;id',
}