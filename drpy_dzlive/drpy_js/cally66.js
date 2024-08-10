Object.assign(muban.mxpro.二级, {
    "desc": ".module-info-item:eq(1)&&Text;.module-info-item:eq(2)&&Text;.module-info-item:eq(3)&&Text;;",
    "tab_text": "span&&Text"
})
var rule = {
    模板: "mxpro",
    title: "cally66",
    host: "https://cally66.icu",
    url: "/vod/list.html?fyfilter",
    searchUrl: "https://cally66.icu/public/auto/search1.html?keyword=**&page=fypage",
    filterable: 1,
    filter: "H4sIAAAAAAAAAO2Yb0/aUBTGv0tf7JXMlhYEk2UfZCFLM8m2DN3imIkxJioDAeeci8IUEpcNBzidsPmXWvwyvb30W6wgcC6Hk+kL3Ku+vPd5bm97nnN/bbogKdLkkwXpVXRempRYOsXrhjQmzejTUXE8p8feRTvGmfZ0suIkKu1pdyAtjnVnsxXLLPLMald4psejT19OPQqDI1dkmfKwQ5H7Fp6u24kkYVH6Fnv5k72UIyx+2ChTpq+iwkblTXZpEBYNNkpk7ZVdwhKAjfZX6asExbLwLcoyARutHPLcJmEJwVVSn52dKmGB6vLGATO3hy1+qK6d/mI1MoQFqsuNDZa8GLZowkbZY24eDFsCQozLTWe3SViEjcxNbhT51ikz69jlJhlp+7pdeXliGabQlb3xP7pyfO711Hjs5dv4wxfx6djj3pXlB/H5NzeF69+IX/Zr3VXzUX22Uw9RVJGoiqIfiQFRVJAYFEUZidAOSsDnxjqoQicosk/B9wvZyAGfjNcKx0uWfTJeLB6twomdr2IdpVGssQ8NIY3e+E6MKJWdnVR3Vp+N6p1qQ7nti2O2UcM6VNzO79vFQ6zDkXX2qqxgYh1C4c2PhA652H9qhA7RtNbqhB4S1m8TukDA5vmwrkI+bL3GGj+wDgFZ1++J9UL9DsvuI2Id6seSZ+xXAuvaQMCt46NWZQkC7o/vFHDBdP3d2Zg+8xwx1S0goQsB/S4RelBsAEKfEBuA0CEgJ2+y9TzWw3SBenqboJHFyJjkH9m7smBajbL7msIgxkeBsKgobcISEOvVPhPDFtzzhCUkVsUycoQlfP+gHmCxB2oP1B6oPVDfBmp1ZKDunANuXLUyDQQ/oRtuTgPtUsSSuE9Nu3Bn0C7hfJ2es1KOdmn3D+UBtHpQ9qDsQdmD8m1Q1kb89Zyt2Fc/MfyGPn1JVxBlTrsm0IPRrtD941YT0efh1sOth1sPt7d+A4dHxVtevW6dZRH3NGgEZ3Wdb+1hHRqBbZRa35NYh0awjB2r+RXr0AhOwmQXK1iHnHia+H2hCW+C5TWexj+ZNcjJWUq1vh1hHdMf6/+B+ypk7YH/LuCPLP4FuLsWZ9EaAAA=",
    filter_url: "&page=fypage&{{fl.分类}}&{{fl.年份}}&{{fl.地区}}&{{fl.语言}}&type_id=fyclass",
    headers: {
        "User-Agent": "*mobile"
    },
    timeout: 5000,
    class_parse: ".tem_head_meun li;a&&Text;a&&href;id=(\\d+)",
    lazy: $js.toString(() => {
        input = {parse: 1, url: input, js: ''};
    }),
    double: false,
    推荐: "*",
    一级: "body a.module-poster-item.module-item;.module-poster-item-title&&Text;.lazyload&&data-original;.module-item-note&&Text;a&&href",
    搜索: ".module-card-item;.module-card-item-title&&Text;*;*;*"
}