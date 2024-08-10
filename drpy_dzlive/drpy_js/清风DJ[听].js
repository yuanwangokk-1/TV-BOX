var rule = {
    title: '清风DJ[听]',
    host: 'https://www.vvvdj.com',
    // url: '/sort/fyclass/0-0-0-0-fypage.html',
    url: '/sort/fyclass/fyfilter.html',
    filterable: 1,//是否启用分类筛选,
    filter_url: '{{fl.class or "0"}}-{{fl.lang or "0"}}-{{fl.year or "0"}}-{{fl.by or "0"}}-fypage',
    filter: 'H4sIAAAAAAAAA+2WX2sTQRTFv8s+B3Znd/Ovj6WVvAgifZM8bNelSre7IWmEUAItMbZYm5gKrdg82FJqQIMaqsTW+Gmys8m3cNJq7r3ZEPJQBGEe5/xmwpmzcw/ZUmymLDzaUtadkrKg2K5VKCgxxbM2HLEM9l6EX6/F+pnlFp2bfd5IrraGldZIFgtNKcduZV49443dfrcTVj78gWwMw3fPhx/fEqgDPKvx/QMCDaWcHeFbX67lrYGtwef2oLU9r62wcy4ORAwFJz2QwUpwfgQyNVFyrDyY4Mffh8eX85oweHMvYkEHEQwwEA0Q0VYTVLQ3DqoGamKspkFMjsUUiKmxmAQxPRYTyD/cKo5UuJaJVLiXrulm8OPy733FCiODIAMjnSDyg4wghpFGkIYQS2PE0hilCEphlCQoiVGCoARGcYLiGJE0GE6DkTQYToORNEi8jKTBcBqMpMFwGhpJQ8NpaCQNLUWGYbWERqF2GFzVI6PAm9v86Eu/+7L/8/2UqfwVvNnhtdbg4HVkMHjzU9BohZU2P2zzi2ZkRsRvTuEGPi/e4CQ38fkpHL6OuHdwdTHJExO8390f9HowVNlyNqbY+p3V6bedwemr4W6Dn3QiNwjqDdGV4XU9qHbBvmxM2ZiyMWVj/l+NadxVYy4v3VeXLM921GXXsTfzvprxiwUnYuZe0Vsv3SD1Qd5fw5vgla7krZyaeZrL+Dn1obeqjg6pi4uR4c9Y+ceFzZLrqCuO/cTzVXFQWIA+kH0o+1D2oezDufvQ/Dd9iD7ijEJEr2B2I6KXNLsSmfyPKDtRdqLsxLk7sfwbc2KWk6YUAAA=',
    searchUrl: '/search/so?key=**&cid=0&list=2&page=fypage',
    searchable: 2,//是否启用全局搜索,
    quickSearch: 0,//是否启用快速搜索,
    headers: {
        'User-Agent': 'MOBILE_UA'
    },
    timeout: 5000,//网站的全局请求超时,默认是3000毫秒
    class_parse: '#top_bannerct&&.se.banneroff;a&&title;a&&href;/sort/(.*?)/',
    play_parse: true,
    lazy: '',
    limit: 6,
    推荐: '#recs-list&&li;h2&&Text;*;i&&Text;a&&href',
    一级: '.isgood_list;a&&title;img&&src;.sc_1&&Text;a&&href',
    二级: '*',
    搜索: '*',
}