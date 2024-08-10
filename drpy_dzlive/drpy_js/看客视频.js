Object.assign(muban.海螺3.二级, {
    "title": ".hl-full-box&&li:eq(0)&&Text;.hl-full-box&&li:eq(6)&&Text",
    "desc": ".hl-full-box&&li:eq(1)&&Text;;;.hl-full-box&&li:eq(2)&&Text;.hl-full-box&&li:eq(3)&&Text"
})
var rule = {
    模板: "海螺3",
    title: "看客视频",
    host: "https://www.kanke.cc",
    url: "/Show/fyclassfyfilter",
    searchUrl: "https://www.kanke.cc/Search/**----------fypage---/",
    filterable: 1,
    filter: "H4sIAAAAAAAAAO2W709SURjH/5f7mjYq3+Q7STGU/ImaOl+wxparbEtrNcdGIhCooG7hqFuWy/gxGVjNKQz7Zzjnwn/RvZzneQ5XncMFbWz33fl+vs+Bw7nP8+WuKreV3vlV5anvrdKraMdl9mVDsSlL3ue+Zv3a++yVr1G4pGMWytSDGQPrQvHbBB0Z8DjdrkeAUaHrcNwHx1ghfeAYBWqsiE65pxAbS+SjIwOAjRXSh943QI0VUpZUWTQNBgj0tFhBq+TAA0H7omkeDOE+IdDjwRhf+wgeCPLebfNAEj0hyFs70pI76AlB33cYYWdl/D4hyItlqhUVPSHoN6R35D4QtC+8W09lcZ8Q/gXDFY+ZqUW2WZKPmXQrj7m+n2WfKkBB0KHO49IDQZfwqyg9EOjVNo6lBwK96mlel/UfKX5agAoTMtexRJGfnZvqANE59g65eoTnEIIu7nu6ngrjxQlhurj8Hi9sNV0c6lYurg9An5wJnAgiOCNyQvqB9BPBGZAT4ATiJDIIZFDOFA4UERcQF5EhIENEhoEME3EDccv5w+mTSYAZICcX55bIGJAxIuNAxolMAJkgMglkkogHiIcIRofMjWkg00RmgMwQwdySiTULZJbIHJA5IvZb94DZTY3C47uslJCNQtrcKHwzytUATxbhQ1YW9Wpq1IapBfNgPllcWW42a4V19h6bdfnxi5c+4wgLNuVuuxJdU/erpZKWDuBEk6aKUo5VPmjRCFaQvlRh7IxmL9YB/Zf/kFokp62fYHgIQQMdD7PETxxoIegK4wfa7wMMAiHalpJXJgnFc0j/LIrnhmglXU0ZeCH9TLl3g8TrRGLr/cxiX9nnb7iVNJ02dFIt458lCCtnrZztrpzt+T9vzp14k73yDbHL3nJrf7b1aowgIdqW3zd+S+xgfl+X0R3I4evS38poK6O7KqPv2JtC2mpZq2W7oGV7rJa1WraLWtb/F39ScTxFFgAA",
    filter_url: "-{{fl.地区}}-{{fl.排序}}-{{fl.类型}}--{{fl.字母}}---fypage---/",
    class_parse: "body&&.hl-nav li:gt(0);a&&Text;a&&href;.*/Type/(.*?)/",
    lazy: $js.toString(() => {
        input = {parse: 1, url: input, js: ''};
    }),
}