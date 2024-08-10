var rule = {
    title: "速讯影院",
    模板: "mxpro",
    host: "https://vip.suxun.site",
    url: "/vodshow/fyfilter.html",
    searchUrl: "/vodsearch/**----------fypage---.html",
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: "H4sIAAAAAAAAA+2YW08TURDHv8s+Y3J2W8rljfv9fsfwQEwTiYqJoIkhJChyKYSbgVYD0RegFcEWQZAty6fp7rbfwtPu7MwcH4wJTw37tvP7b8/OnMv8czqn6Vrt4zntWfStVqu551n7y7pWoU1Pvojy+M3k89fR0ovTEttLqcJiqohloGvzFYDXUjnrwI2tgBIhJX5gx5KkVKHirp47i0ukVJOS3LFvsqTUoOK823YW4qTogj4USyrD6ZSds/opZ8aYZNCnzBPb2iPJELwmd5dlYbAB35+68R2SQpShu5Z2rROSwmzAoxWlrDANmLs9dreX2bcoQ3vpKpdlJYelNFEUvXXLp8/yqQVaN4z/sW409r4l3wcKga/l189JgwCL/HlIGgS+VkhY9kaCZIrxja/fmOwFOLOJI9IgQO1ij2legJXcXbNKvIDNoP1j0de8gE+hfXOZy1o0hRj/zxQawgjj3pGPjIeIhzg3iBuM6zXI9RrOq4lXc15FvIrzCPEI55XEKzmn/HWev0756zx/nfLXlfx14jrngrhgXFC9gtcrqF7B6xVUl+B1CapL8LoE1SUflQU/SzjpDbbgfvzXgiPmC14HoA5JPZB6JA1AGpA0AmlE0gSkCUkzkGYkLUBakLQCaUXSBqQNSTuQdiQdQDqQdALpRNIFpAtJN5BuJD1AepD0AulF0gekD0k/kH4kA0AGkAwCGUQyBGQIyTCQYSQjQEaQjAIZRTIGZAzJOJBxJOKRvxeFslGczY+2uUUbBWN1oziJq0LikkSJZqfkD7C7m6aT2VX0p1OzM9Rq0x/s1WVFn3ny8lW0mMtEhWbc06aZl+xbOTMpndI3QjrX9lbGubljErUC2aLlD5lEp8w5Tbp3m0yig1k4/uz8TpPEeqBzkVEGZG1Ttnzn4JRJ7Fu/ru3DOJMiD9UIA0PTAkMLDE0LDK08DS10T0NjrlUyNDd7m4+Z/uGg1lH0n62MqtIBlE1V9lxVZTfNkrMpakgEhqMFhuM/lqHhUL2C1xsYkRYY0UM0ovA9jYgOO9ys1lLO7XffLtj/hSWrUVU6+J5NqSq7LHlXLEVl9yXvUqSolYFNaYFN+Y9laFOBHQV29CDtiF+Mgr0b7N2y2bvzfwDFCUaZTR4AAA==",
    filter_url: "{{fl.类型}}--{{fl.排序}}--{{fl.语言}}-{{fl.字母}}---fypage---{{fl.年份}}",
    filter_def: {
        1: {
            类型: "1"
        },
        2: {
            类型: "2"
        },
        3: {
            类型: "3"
        },
        4: {
            类型: "4"
        },
        43: {
            类型: "43"
        }
    },
    headers: {
        "User-Agent": "MOBILE_UA"
    },
    timeout: 10000,
    class_parse: ".navbar-items&&li;a&&Text;a&&href;(\\d+)",
    cate_exclude: "",
    play_parse: true,
    lazy: '',
    double: false,
    推荐: "*",
    一级: 'body a.module-poster-item.module-item;a&&title;.lazyload&&data-original;.module-item-note&&Text;a&&href',
}