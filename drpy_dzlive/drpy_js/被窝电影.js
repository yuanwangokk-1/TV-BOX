muban.首图2.二级.title = '.v-thumb&&title;.data--span:eq(0)&&Text';
muban.首图2.二级.desc = '.data:eq(3)&&Text;;;.data--span:eq(1)&&Text;.data--span:eq(2)&&Text';
muban.首图2.二级.content = '.desc.hidden-xs--a&&Text';
muban.首图2.二级.tabs = '.stui-pannel__head.bottom-line';
muban.首图2.二级.tab_text = 'h3&&Text';
var rule = {
    title: '被窝电影',
    模板: '首图2',
    host: 'https://www.bei5dy.com',
    url: '/show/fyfilter/',
    filterable: 1,//是否启用分类筛选,
    filter_url: '{{fl.cateId}}-{{fl.area}}-{{fl.by}}-{{fl.class}}-{{fl.lang}}-{{fl.letter}}---fypage---{{fl.year}}',
    filter: 'H4sIAAAAAAAAA+1X204TURT9l3nmYaZy/wO/wfBwKBM6UKZSOsaWQDCAtiIUjbY21FsCtCRgByUoUws/0zOlf+GZnsveA9oQI2rivHWtvfa57DNn7dNFbcoidtayp7Xxe4varJnVxrU4yZh3p7QBzSZzJsOd4yZ9u8HwA5J0zJ7QZjRdr3dX6wHNgBpmaUBEn9bbrWqn8EQKUvZ0zkndZzrQlKq0UAPNQ2vGCQk6+WN/dR0ExJpnc4Qltef0rAmSWTPhEDsk8R9t+yslJGFLmQxPxJYRmmjGuTaRn3/d9gogySWInUuYV5fT/Ea386BKOnbS4oqJQMMrTNImgfrSqkufef3rCyvdrXUrjwUrgIx19yv+14aICaDyiq5/di7zOFCLPt+iOy0RE0Bt+/MriAkgY5cbxxATQOWV9/zqoczjQK3z3QHkCaDWef4FYgLAWly8FjeUt+lSb1/mcaDy1oqsUjR/IFMVVjvZu+gUjzqFityMwvA9v/c3LlianEJhpVg/bTdLMswBPvSsSdLo0M9O2s3WDQ89psfuCK73E/Ex4GOYN4A3MK8DryPeGFM8+4n4UeBHMT8C/Ajmh4EfxvwQ8EOYHwR+EPOwXwPv14D9Gni/BuzXwPs19OWYrqOgwKDQ9WVjbAwUEksFAwEzLAsHGB9ukjDvU4d72Ti6rK/c9EbvtJhefjccoBsGMQHUrf20CzEB1A0rt+hmGcKA0R1EYQ7Q3YWYAMgPUIwDdHfRTjhAt4N+XIXbEQBcwMkslM/fekG94rXy+eXTbvlEDJGxmFQO3vY8330pIgkrswAFbKzRvLTLhXgqbQazTgz0GtZCgjWc39D4+DjoPNtejXUUoZh2UnHWK5CC+TJzYKRgH0+G4DFY0QNfVIq0dWWEw1rg0yqecubM0Bp69gPxeStDgvAf6EF9vP1X+1O/XtK/d/28X/TtXSWX2Tt980GmKhx5feT1/4/X/2uenWMP96yFDPuWPIz7s6wJB2FnhnoFIOzKMsZB5AqRK0SucKsvOeYKc+wP9u3bQp9nyA+vfvRYiGwhsoW/YgtL3wE/jAqm2hQAAA==',
    filter_def: {
        dianying: {cateId: 'dianying'},
        dianshiju: {cateId: 'dianshiju'},
        zongyi: {cateId: 'zongyi'},
        dongman: {cateId: 'dongman'}
    },
    searchUrl: '/search/**----------fypage---/',
    class_parse: '.stui-header__menu&&li;a&&Text;a&&href;.*/(\\w+)/',
    搜索: muban.首图2.搜索2,
}