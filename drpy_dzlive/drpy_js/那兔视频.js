Object.assign(muban.mxpro.二级, {
    "desc": ".module-info-item:eq(1)&&Text;.module-info-item:eq(2)&&Text;.module-info-item:eq(3)&&Text;;",
    "content": ".module-info-introduction-content&&Text",
    "tabs": "body&&.module-tab-item",
    "lists": "body&&.module-play-list:eq(#id)&&a"
})
var rule = {
    模板: "mxpro",
    title: "那兔视频",
    host: "https://ntsp.cc",
    url: "/vodshow-fyclassfyfilter",
    searchUrl: "/index.php/ajax/suggest?mid=1&wd=**&limit=50",
    detailUrl: '/project-fyid/',
    filterable: 1,
    filter: "H4sIAAAAAAAAA+2aWU/jVhiG/4uvqYJhmO1u9n3fp5qLdBS1o1IqAa2ERkhASCbJQBIiJpk0Yeuwl5AAKQWnIX/G59j5F3U4x5/P+Ywao6FVO/Kln/fNd1Yn73H8VlGV81+/Vb4PDSnnFRJfoeGI0qH0BX8Iidc/B3t/Ch0a+1o4stoMr7awdaEMd3CaLVp+TgOve4MDAwHObIsR2+L1HAtntoWOpulIVrZwBg0lVvV6ETXEGDS0MkX2a6ghxqAKjE2owhj0JfZR1+KoL4zZFrO0TCbWZQtn0JdE2agjC2fCiIzpmmtELQaWpXeuEXEG3S0t6wfzqLuMQZVopplfQ1UYgyqz69YYURXGjrFGdGzDyE4hC2NgCSfo2C/IwhhMXS1FInto6hizLc2ZDP24JFs4g4ay78y4hhpiDOblYNOY/p3Ut9DUAAZjatH8hHcNY2BJRklqG1kYg13TSFvLi3YNY85KFenMFF6pQwaW8YbxGxo6ZzCB9SmjVjxqaJIy/Kr1Af4dUKyQCU34DrCvPX0HLK4081G7pWB/KBjgCNZrOU/3ypKDI2eKK3T/QK7BEIzqIEkKdcnBESz5zgfs4AiW4P0WdnAENXJLtLgh12AIxjK3hmtw5OyrP7CDI6enFXdPK1KNyQrRluUaDEGN8ZQ1yyS2JpcBCmNeahipkhHPy8MG6nwdzdP3DevDcqNAwRfZ1WtZ2cSQuKHMcslcHXE2FFx72lCFuuW3m+gN9n0b4EhYSOzgCLbL9iJ2cAQLmauTyRw2OVRYcJeJIWHTYAdHwtZ0ORgSNo1rzAwJE082w7KDIelO3q/qtbpwJ9vXXia+q7PrlN3AUCjYHzgEgtqN1W5R7cJql6iqWFVFtROrnYKqnkOqBQT1LFbPiuoZrJ4R1dNYPS2qPVjtEVU8V6o4VyqeK1WcKxXPlSrOlYrnShXnSsVzZQFpC5RytDwpbAH72ssWuAAbLDQ4GOoPXADlIlIugnIJKZdAuYyUy6BcQcoVUK4i5Soo15ByDZTrSLkOyg2k3ADlJlJugnILKbdAuY2U26DcQcodUO4i5S4o95ByD5T7SLkPygOkPADlIVIegvIIKY9AeYyUx6A8QcoTUJ4i5Skoz5DyDJTnSHkOygukvADlJVJegtL51TmktYh4C9Bkhmgp5xaAa/kWoBNxmttt5qqO3ir6zVBg8I31Ofj2nojrmkYr0y7bd28GB0SbWR4nsajLNvD6x/5Qq4OvOpSuEzt6tU+lHs4yLDaT0V0STslGSTnGeY9s7hKthCyMHe901O685+F05OG85yG5eziR6PsLruTOmXP0idB8GS0GY9CXD1HXMYwzIdy7FoCzoxMar+KOaJ+X+aMRyy+nQIa85+STOBW0z+tezg3t0riHc0O2YkVlMrMglwHqp+fPSM9+8vWTr+InX0Hxk6+ffP93ybf7pJJvcyRurIygtMqYGLbG59xhy2LwK7jZMCsx2cIZVMmUaAI9bOXM+fWK0D2UDTlzfgJ39P006i5jQkhpfkLd5Qws2jrZnEUWxqAvhW33M2/GoMr0HK3i/0gYgyp7ezSW0rWM62m1pMA0Vn+1sjCaRsag4taYOTqBajH2LwZSK1ha4VHOZwwJScTKJjhMthA4NlasZZEdDPnxzY9vfnzz45ug+PHNj29fUHw7dVLxzUM28/AqhxEumQsoBHIGDSVXjXQUNcQYWNKzxgZ+ZYExJ1m0fX3CTM+YSfSclTNoaH6BFNBTUc6gofaPPGlRc7+nwRj0pf1rBh4eC5OKNdlV1BfGRMvSjttiMVijxQP9T/S2B2dQJTlHYgVUhTHbomvbpITyM2fQUCFB8yj5cubM7hZp5PDsHjIhqPzzD04LdV1D/7EzJASqNo80/yaFHjkS/zGj4udUP6f6OdXPqX5O/eJzao+YU/071b9T/Tv1P3mnDv8FBqpBjocwAAA=",
    filter_url: "{{fl.地区}}{{fl.排序}}{{fl.剧情}}{{fl.语言}}{{fl.字母}}/page/fypage{{fl.年份}}/",
    timeout: 5000,
    class_parse: ".navbar-items&&li;a&&Text;a&&href;(\\d+)",
    cate_exclude: "",
    play_parse: true,
    lazy: $js.toString(() => {
        let html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        let url = html.url;
        let id = input.split('-')[1]
        let rehtml = request('https://ntsp.cc/addons/dp/player/dp.php?key=0&from=0&id=' + id + '&api=&url=' + url + '&jump=')
        let reurl = rehtml.match(/[a-zA-z]+:\/\/[^\s]*.m3u8.*/)[0].replace('",', '')
        input = {parse: 0, url: reurl}
    }),
    推荐: "body&&.module:eq(0);*;*;*;*;*",
    一级: ".module-item;a&&title;img&&data-original;.module-item-note&&Text;a&&href",
    搜索: "json:list;name;pic;;id"
}