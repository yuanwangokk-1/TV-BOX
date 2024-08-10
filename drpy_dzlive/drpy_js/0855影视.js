var rule = {
    title: '0855影视',
    模板: '海螺3',
    host: 'https://www.085518.com',
    searchUrl: '/vod/search/page/fypage/wd/**.html',
    url: "/vod/show/fyfilter.html",
    class_parse: 'body&&.hl-nav li:gt(0);a&&Text;a&&href;.*/(.*?)/',
    cate_exclude: '明星|专题|最新|排行|美图',
    二级: {
        "title": ".hl-full-box li--em&&Text;.hl-full-box li:eq(4)--em&&Text",
        "img": ".hl-lazy&&data-original",
        "desc": ".hl-full-box li:eq(1)--em&&Text;.hl-full-box li:eq(2)--em&&Text;.hl-full-box li:eq(5)--em&&Text;.hl-full-box li:eq(6)--em&&Text;.hl-full-box li:eq(3)--em&&Text",
        "content": ".hl-col-xs-12.blurb--em&&Text",
        "tabs": ".hl-tabs&&a",
        "lists": ".hl-plays-list:eq(#id)&&li"
    },
    filterable: 1,
    filter: "H4sIAAAAAAAAA+2W3U4aQRSA32WvNfzYi+KTmDS92BRiaRUbFRNrTEAiIv6hERHBn1YRsApYjQoUeBlm2X2L7p5B9pypkd3IRS+4MdlvPs7MmTnjmSXJG5QDX4LS+Icl6atvURqXOrd1drIhjUgBedqHvxfkqaAPxICO2WpBixQMrH9IyyOcaqGo+vOmSz9NyXNzDo4cPaWzn2WlM6JwZCpqOqGEN4jCEYpSbKkPcRoFkKloa1ud/VO6FkC68nH5o85nvIPKm8UL7UaWzMWRuRy2nlciq1QBhJSDrI6oAgjlnd9l1TrNGxBSYrfiRByZihJOKKEDonCElJXrzsEuVQChieLlTuOKTgQIRYnElZUjGgUQSnrnQj0X9gUQUqJ7WrpIFUBoLbUr1kjStQBC9XB6164maD0AQhNtR9nObzoRIKTk1sQD4AglHTts19Zp0oAcuF46+3WxXnSELkEroSN6CQCZSvvPmVqqEIUjtJabTTV2QtcCCCuX7eaZoBgI7W64qR016e4CQhmVHliN3nyOUEa5lnl1uhkBQlESm0pIuAGA4M6OPN9Vlq2wzZp5V3vflu7qRV5LR7tUnvXJDk5Qus1tlmlggxNUS5dp5amMDU5wtRWFGJzgwq8o1SZZBxB0Mqmckr3GBifIuKsIs3CCZtmqsNolmQUIjpH8J0aSxFA3bgWDEzRL81EwOBGOrXrfrjfQsT1/Wzk2t9P9rssciz551gEAjY6Jo2N41C2OuvGoSxx14VGnOOrsjbqckMS5YLg8o/ofU3O+rDkNzWlqnpc0l8fjGdX/mJqSuVdSRUF6b0hGLOht8wuotbFYVO9maN+fv61fF7Mv+b0Or/4z/c3QW85TWa9cYkzKgcl52Y+lVM64AFia9X+Gt0dPuc4b9wwrM8FpH0RBVfS2Rt2/21jpfI0r5UeM/j8EZKs5dnInavmYKoBs9XILDUkthMQoHNlqAiz8wCI7dCJAtpqAdrynHOZoFwaElEiDPa1QBZCtl5KVLhzNKCmhGAChrats6b+iWwfI1lOUlX6x+qOwLway9fSw8PYj/z66UQDhpLPK8a6QtIGQkoyKSXNk6zWrth61TFOnLFsTnjHmgKlPvGBO9KT/qvn3be39nweDaP6vtOVh07XedF/sph7aTb/hbvqW+utfO/3P3UJ1DaDKX6nQYXUNtLq8M4HJaTkwqBLrf/j9S+yV8hge/kAP/7t++It+fPbDTX3jpi7/BZmu5lPWFAAA",
    filter_url: "{{fl.地区}}{{fl.类型}}{{fl.分类}}/page/fypage{{fl.年份}}",
    filter_def: {
        duanju: {
            分类: "id/duanju"
        },
        vod: {
            分类: "id/vod"
        },
        tv: {
            分类: "id/tv"
        },
        tp: {
            分类: "id/tp"
        },
        dongman: {
            分类: "id/dongman"
        },
        zongyi: {
            分类: "id/zongyi"
        }
    },
}