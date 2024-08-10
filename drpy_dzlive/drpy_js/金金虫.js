var rule = {
    "title": "金金虫",
    "模板": "mxone5",
    "host": "https://www.jinjinchong.com",
    "url": "/vodshow/fyfilter.html",
    "searchUrl": "/vodsearch/**----------fypage---.html",
    "searchable": 2,
    "quickSearch": 0,
    "filterable": 1,
    "filter": "H4sIAAAAAAAAA+2ZW09bRxDHv8t5LZX2HMItb7nf7/dUeYgqpEZtU6lJK1VRJBKu5g4idggQiIIxNBgMNARsbH8Z7x77W+TYOzsza/xSlSYo2rf8f//sOTu7s+uZwzPP947+8Mz7ufMv76gne5cr3cvhRk6+HfKavMcPf+3cT/98+MsfnbVBjxuYEfK9501gDi6X8rNhrB+cVnLiszKWIqcNnXBgQ3X3ktNOTmpC7ubI6aCnxVLWGF+gpV6Mq644s2h2auB1KRtjVsAnHk6xVwXM6t0u5dgDg+hdD6omX0I9ofolRNpoCcmMEL2tb7IyvQIUhB218bSwV954WtjBkVcV6I0Pq66U8bSw98x4WqCX7I/2xnha2FsAHgj0Xq6G8QnjaYFe96B6+cZ4WqCXHi4PvDWeFpgnLwqVNwXwQNjZZTwt7PwynhboDa6H+b+NpwV6uTHZu2M8LdDLT4S52XDqo8xvmP/BkZ2LJh4tjFfaScmMeT4IXPeeYvghadZdC+NV5rdKu+PggcBn7i2U1zLmmVoYr5wsRvkIHgh839hi+T3mnBa0J0ulwgLuSU3guLVtmU2bcVrguIV3csZ4INCL95djWeNpgfMsjkfZa+apBcY+N6lem3UBQfm/IYsJzP+awHXJZin/QeBeFkYr7+fNLmpB+b/Fzo0WGMNmTvUMmBi0wHGjfXJs04zTosF1MpuRw9l914mhDa8TNK3rZDFVme4zr9MCl2xpWu2smyXTgrY9o3YLuO01wZZFzuRpWaqCUnCFPBC4LImkml01y6IFelsZGgeCUiIjBxfk3DvMCqPxrSurai4ZZW4pa64PC2FUIxmZXTJRaYHJNbRBMwBBs3vFZ/eKe9FU1FAxWlrML6PZ8QrH0mFsmk4YaEzCYk+YT6i42QzS7EdIrnWbV2ixP23K6+nycld92iBtlDZkWmkzk48M8zot2EKRBwJTY3ORPBC4SYm8HEmQTZolD7O1YMlDHgi2PczTAiMpfGKRaPHvFlUltiuJf+oXFWmjRSWTL2oggiNYQ0T/ZLyZeDPnAfGAc5+4z7kgLhj3O5D7HZy3E2/nvI14G+etxFs5byHewjnF6/N4fYrX5/H6FK/P4/UpXp/H61O8Po9XULyCxysoXsHjFRSv4PEKilfweAXFK3i8guIVPF5B8Qoer6B4BY9XULyCxysoXlFXhaYTan1EzSdVrMBS1aZ1qVpn8lQ9BuAYkuNAjiM5AeQEkpNATiI5BeQUktNATiM5A+QMkrNAziI5B+QckvNAziO5AOQCkotALiK5BOQSkstALiO5AuQKkqtAriK5BuQakutAriO5AeQGkptAbiK5BeQWkttAbiO5A+QOkrtA7iK5B+QekvtA7iMR35tTYadOeb1HDvSp0UmZHaPUqaN26uj7jcwIPX0UDeNFVWbK8n969PQJ/YTUPTxCT3787ffO6rweNHnBgXeodLhKO+no94zaGnb/qNVUtZohi45w9INTLWbIolNfLTSiegWtgPW8tc6RjWr9Yp3jd651dK2jax1d6+haR9c6utbRtY6udXSto2sdXesI5FttHZsPvHWkQ6dbxzC3R1VmQFeB7h5tly4Q3UBabjP7m+XHT3Ixbru+q+3+a23naravWbP9HxWZq7pc1eWqLld1ea7qOkxV15EDr7roMMIH+8FltffB1EZ09OCbveWyL/r6s73lso/6tarLdlu+VtV1mCorVzcdQN10CL9nuerJVU+uenLVk+eqp8NUPQXWRyuX2S6zv5nMbtvXGLjywpUXrrxwl7C7hL/MJfz8M4zwwPvxNwAA",
    "filter_url": "{{fl.全部类型}}-{{fl.全部地区}}-{{fl.评分排序}}-{{fl.全部剧情}}-{{fl.全部语言}}-{{fl.字母查找}}---fypage---{{fl.全部时间}}",
    "filter_def": {
        "1": {"全部类型": "1"},
        "2": {"全部类型": "2"},
        "3": {"全部类型": "3"},
        "4": {"全部类型": "4"},
        "23": {"全部类型": "23"},
        "27": {"全部类型": "27"}
    },
    "class_parse": ".nav-menu-items&&li;a&&Text;a&&href;(\\d+)",
    "cate_exclude": "小姐姐",
    "play_parse": true,
    "lazy": $js.toString(() => {
        input = {parse: 1, url: input, js: ''};
    }),
    搜索: '.module-items .module-search-item;h3&&a&&Text;img&&data-src;.video-serial&&Text;h3&&a&&href',
}