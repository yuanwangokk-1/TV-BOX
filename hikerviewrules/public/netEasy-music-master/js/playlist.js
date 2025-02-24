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

let $cover = $('.cover')
let $info = $('.playlist-head .info')

let id = getParameterByName('id');
var query = new AV.Query('Playlist');
query.get(id).then(function (list) {
    console.log(list)
    let wrapImg = list.attributes
    let wrap = `<img src="${wrapImg.src}" alt="">`
    let word = `<h2 class="line-clamp2">${wrapImg.title}</h2>`
    $info.prepend(word)
    $cover.append(wrap)
})


let $intro = $('#intro')
$intro.on('click', function () {
    let $upButton = $('.playlist-info .arrow .icon-arrow-up')
    let $downButton = $('.playlist-info .arrow .icon-arrow-down')
    if ($intro.hasClass('active')) {
        $intro.removeClass('active')
        $upButton.css('display', 'inline')
        $downButton.css('display', 'none')
    } else {
        $intro.addClass('active')
        $upButton.css('display', 'none')
        $downButton.css('display', 'inline')
    }
})


let $list = $('.playlist-content .list')
var query = new AV.Query('Song')
query.limit(20)
query.find().then(function (results) {
    for (let i = 0; i < results.length; i++) {
        let song = results[i].attributes
        let songId = results[i].id
        let li = `<li>
                <a href="./song.html?id=${songId}"> 
                  <div class="list-number">${i + 1}</div>
                  <div class="list-content-wrapper">
                    <div class="list-text">
                      <h3 class="line-clamp1">${song.name}</h3>
                      <p class="line-clamp1"> ${song.singer}</p>
                    </div>  
                    <div class="icon-wrapper">
                      <svg class="icon icon-play">
                        <use xlink:href="#icon-play"></use>
                      </svg>
                    </div>
                  </div>
                </a>
              </li>`
        $list.append(li)
        if (song.transName) {
            console.log(song.transName)
            let span = `<span>(${song.transName})</span>`
            $list.find($('.list-text h3')).eq(i).append(span)
        }
    }
}, function (error) {
    alert(error)
})