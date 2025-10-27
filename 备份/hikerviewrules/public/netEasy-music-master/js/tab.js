$('.tabs').on('click', 'li', function (e) {
    //监听的元素
    let $li = $(e.currentTarget)
    let index = $li.index()
    $li.addClass('active').siblings().removeClass('active')

    $('.tab-content').children().eq(index)
        .addClass('active').siblings().removeClass('active')
})