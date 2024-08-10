Object.assign(muban.首图.二级, {
    "title": "h2&&Text;.text-red:eq(1)&&Text",
    "img": ".vod_history&&data-pic",
    "desc": ".text-muted:eq(3)&&Text;a.text-muted:eq(2)&&Text;a.text-muted:eq(1)&&Text;.;",
    "content": "meta:eq(2)&&content",
    "tabs": ".item li"
})
var rule = {
    模板: "首图",
    title: "影视控",
    host: "https://www.yingshikong1.com",
    url: "/show-fyclassfyfilter",
    searchUrl: "/search-**----------fypage---.html",
    filterable: 1,
    filter: "H4sIAAAAAAAAAO2Z604bRxTH38WfSbumuZVXqfIBNSg4BVMVSEUjJMDYsR1iG0TsuDa3hFsoNjZQatY1fpmdWfstOt6Zc7EUVlYLNErWn/w7Z2fmnDM7+5/ZfRl6GhmNzkWiz0IjP7wM/TQ2FxoJidSBjMVDQ6Ho6OQY5xejE7Nj3oXRnjl+2I0d9swKQvNDxpovq+uN1QD43GTddEQAPrmYkwt54zOAfaYPnVYZ+tSAfR6sissm9KkB22HgBDhe8p1jp2A8DeDrVPbFypHxGcDx0iduC3wGWJzuepPi7AH69l5RnAYwlsq+c7UNsWjAdom1bvEjtNOA7TaPVOTQTsMg9ZRLx25+FXwa0BdLy6XfwacBc29mRbwBuWsAX3djTb7bMz4D2Gf+VSdlQ58aML+rqrv+p2jVIUVkvCK72/mAs6gBfZmEyJ6CTwPOYjun5gBmUQNVtSw3VrGqHqBvue3+AZkYwAq0Vt1muS/gPtP8k96VZhmVa2LFZssIeKBltHvQLSYgCA1Y6v2ibJxAqTVQsWry8gqL5QEGf5URpRaErQGn6Owt+QxgIV/XyWcA2xX2ZPkY2mnAOLc+UjsDNO1/kc8AxVLjsdT62r2pCXsf2mnAdstZVSmRhNVCjJnstd1sxU0VIRlkWsLb8nVbNcNVDIxXxC+cJiwsA33TfnnuNFts2oF9pv3b6fGpX+/Bo/ge/b4Zn5mcwKGHreHvTAvvL7MPk32Y28NkD3O7RXaL2cPfo139ZfbHZH/M7Y/I/ojbH5L9Ibc/IPsDbr9P9vvcTvmGeb5hyjfM8w1TvmGeb5jyVX/5dHVOKp3DBZou5IFWaamlrod7QQNbNeQzgCvxdJd8BnDVFFriTYHcxGxdMbcGth7JZ4CtcebTwNYjy0QDu+NFNUZ3fA94CWVmTdhZKiFyfwll4aJbODfdzETUpTCAY9uytm4845GZaSriybJIwmNw+sepX8Z6Iz8Z8rYt0+OR57M3tm/xURm/vYKWOrF4IWLZPvUzpkH2RaJ6IWwsvoYB9xvX7ov89ht++yI/RfXTf+dyhxTVAO0p4rIIgmUAx3uboD2MAaa2VDMDAz+G/5P6JuLqetweeDCIqv1bZfZTUX/Vvl4pfVU7X1PCJjZ2cE8GfDcq563cQOZuW+bQblG+Fs/Xonwtnq9FeVk8L4vysnheFuWl/n6l8vo5yuRvU9Fnc5Gb0sjuQso9WIDKaODP+OUt9oxXgOFV251aEuZKA7Zbq8g0nLYMULXjstHAantAs3TmXOZwljxgj8zuB4jFAPrsI1HdBJ8GHK90ys6pGrDd+pY8x/cMGrBdoyGTWcdeo/NmnwnrcP5eqSbUQQP2UV/qLK5Aaw13omdKo5QaYdgesNtdLQC63XuAvuMDVVrwabgZhdA3bSAPn688UL4WzzeQjS9ENp6qFTg5Gr0p3fDTBr/3t26s0tkBvTGAfWYO3RzEbgB9uU33GN9vaqBH4fXvUzu5jU4GznkGsM/tHVHCKdQwyDlMlm32jlYDjufzhtLvzClqqkww1wa4b++M+RRgPXevnL/h3a4BOvdtiWQJ2mmgO+hUVEBrDWCfpbQsgmYaoLrURbuAdfHgbs5vpZZj42FbwyBnrU9q2u2fiPRqCwQvELxA8P4fwXsemZj9OXJzihd8BaU4g6+gps/gKyjn4CvoSPAV9BO7IXgUB9uh294OfZ3bjy/nK+j8P4Ab3yu+JQAA",
    filter_url: "-{{fl.地区}}-{{fl.排序}}-{{fl.剧情}}-{{fl.语言}}----fypage---{{fl.年份}}.html",
    timeout: 5000,
    class_parse: ".nav-list&&a;a&&Text;a&&href;/(\\w+).html",
    cate_exclude: "福利",
    lazy: $js.toString(() => {
        input = {parse: 1, url: input, js: ''};
    }),
    double: false,
    推荐: ".myui-vodlist__box;a&&title;a&&data-original;*;a&&href",
    一级: ".myui-vodlist__box;a&&title;a&&data-original;.text&&Text;a&&href",
    搜索: "#searchList li;a&&title;.lazyload&&data-original;.text-right&&Text;a&&href;.text-muted:eq(-1)&&Text"
}