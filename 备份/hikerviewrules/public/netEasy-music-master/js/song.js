// 获取url 的id
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


let id = getParameterByName('id');
var query = new AV.Query('Song');
query.get(id).then(function (song) {
    // 解构获取歌曲url
    let {url, lyric, cover, name, singer} = song.attributes


    imagesInit.call(undefined, cover)
    initPlayer.call(undefined, url)
    initText(name, lyric)
})

// 歌词数据
function initText(name, lyric) {
    $('.lyric > h1').text(name)
    parseLyric(lyric)
}

function imagesInit(cover) {
    // 添加css伪类
    var s = "<style type='text/css' > .page::before{ background:transparent url(\"" + cover + "\")no-repeat center;background-size: cover; } </style>";
    $('head').append(s)
    document.querySelector('#bg').src = cover;
}

//歌词
function parseLyric(lyric) {
    //解构
    let array = lyric.split('\n')

    // 正则匹配分开时间[ ]和歌词
    // let regex = /^\[(.+)\](.*)$/
    let regex = /^\[(.+)\](.+)/
    //遍历数组,得到时间和歌词
    array = array.map(function (string, index) {
        let matches = string.match(regex)
        if (matches) {
            return {time: matches[1], words: matches[2]}
        }
    })
    let $lyric = $('.word')
    array.map(function (object) {
        // 创建p标签
        if (!object) {
            return
        }
        let $p = $('<p></p>')
        //给每一个标签自定义时间属性,然后的文本内容是words
        $p.attr('data-time', object.time).text(object.words)
        //插入div
        $p.appendTo($lyric.children('.lines'))
    })
}

// 初始化暂停播放
function initPlayer(url) {
    let audio = document.createElement("audio")
    audio.src = url;
    audio.oncanplay = function () {
        audio.play()
        $('section.disk').addClass('playing')
        $('section.disk').removeClass('pause')
    }
    $(".icon-pause").on('click', function () {
        audio.pause()
        $('section.disk').removeClass('playing')
        $('section.disk').addClass('pause')
        $('section.pointer .point').addClass('rotate')
    })
    $(".icon-bofang").on('click', function () {
        audio.play()
        $('section.disk').addClass('playing')
        $('section.disk').removeClass('pause')
        $('section.pointer .point').removeClass('rotate')
    })
    //歌词动画
    setInterval(function () {
        let seconds = audio.currentTime
        let munites = ~~(seconds / 60)
        let left = seconds - munites * 60
        let time = `${pad(munites)}:${pad(left)}`;  // 问题: 不能分开

        let $lines = $('.lines>p')

        let $whichline
        for (let i = 0; i < $lines.length; i++) {
            // 歌曲时间
            let currentLine = $lines.eq(i).attr('data-time')
            let nextLine = $lines.eq(i + 1).attr('data-time')


            if ($lines.eq(i + 1).length !== 0 && currentLine < time && nextLine > time) {
                $whichline = $lines.eq(i)
                break
            }
        }
        if ($whichline) {
            //高亮
            $whichline.addClass('active').prev().removeClass('active')
            //高度计算往上移动距离
            let top = $whichline.offset().top
            let linesTop = $('.lines').offset().top
            let delta = top - linesTop - $('.word').height() / 3

            $('.lines').css('transform', `translateY(-${delta}px)`)

        }
    }, 300)
}

function pad(num) {
    return num >= 10 ? num + '' : '0' + num
}
