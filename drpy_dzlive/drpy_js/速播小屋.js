var rule = {
    模板: 'mxone5',
    title: '速播小屋',
    host: 'http://vzjkqi.subowu22.com',
    // url: '/show/fyclass/page/fypage/',
    url: '/show/fyfilter/page/fypage/',
    filterable: 1,
    filter_url: '{{fl.cateId}}',
    filter: 'H4sIAAAAAAAAA5WRwU7CQBCG32XPfQLewGcwHBa6aRfoNiqLtqQJxhCpJqIHUWOjJ60aEuUGbcrTdLfhLZy2KV2OPc5+//wz8+8Y6RQzhzIDtY7HqE8c1EJdPCRHOtIQwxaBOlvF4u0W6hEecFIIR/Cs28xwuZ3roBI3X2kSZP418rSSX9Aer+AiEH6oQkxP8qElzmYreTVVcZ+YHLMKhw9iEx9gGN2pzOXlvZwsVNwD6/yuqj+ei+laFbgmZq5J9gvI2XMa+YcWg8o/i35E8ljAttfWisTOTNo8MIPbXRhcp/KapFEIweynqnT3/g0CldrcInWmchlm2zuVnyrw6UMGSxUamBnYrt0/X+T6VxUMMT1Xl5v/yc22EBRXuxC50+joMixos+AnmvV5//XemOyYAgAA',
    filter_def: {
        dianying: {cateId: 'dianying'},
        dianshi: {cateId: 'dianshi'},
        zongyi: {cateId: 'zongyi'},
        dongman: {cateId: 'dongman'}
    },
    class_parse: '.nav-menu-items li.nav-menu-item:lt(5);a&&Text;a&&href;.*/(.*?)/',
}