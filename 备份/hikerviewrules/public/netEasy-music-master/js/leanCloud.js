let $olSongs = $("ol#songs")
let $songImg = $("ol#song-img")
let $list = $(".hotlist .list")
// 热歌榜
let $song = $("#olSongs")


// 最新音乐
var query = new AV.Query('Song');
var cql = 'select * from Song where hotsong != true';   // CQL  查询
AV.Query.doCloudQuery(cql).then(function (data) {
    let results = data.results;
    // loading加载成功干掉
    $("#songs-loading").remove()
    for (var i = 0; i < results.length; i++) {
        let song = results[i].attributes
        let li = `
			<li>
				<a class="playButton" href="./song.html?id=${results[i].id}">
					<h3>${song.name}</h3>
					<p>
						<svg class="icon icon-sq">
							<use xlink:href="#icon-sq"></use>
						</svg>
						${song.singer}-${song.name}
					</p>
						<span class="click">

							<svg class="icon icon-play">
								<use xlink:href="#icon-play"></use>
							</svg>
						</span>
				</a>
			</li>
		`
        $olSongs.append(li)
    }
}, function (error) {
    alert("获取歌曲失败")
});

// 填充推荐歌单数据
var queryS = new AV.Query('Playlist')
queryS.find().then(function (result) {
    console.log(result)
    $("#songs-loading").remove()
    for (var i = 0; i < result.length; i++) {
        let songImg = result[i].attributes
        let liImg = `
			<li>
				<a href="./playlist.html?id=${result[i].id}">
					<div class="cover">
						<img src="${songImg.src}" alt="我的封面">
					</div>
					<p>${songImg.title}</p>
				</a>
			</li>
		`
        $songImg.append(liImg)
    }
}, function (error) {
    alert("获取歌曲失败")
});


// 在线获取热歌榜
var hotQuery = new AV.Query('Song');
var cqh = 'select * from Song where hotsong = true';
AV.Query.doCloudQuery(cqh).then(function (data) {
    $("#songs-loading").remove()
    let results = data.results;
    for (var i = 0; i < results.length; i++) {
        let song = results[i].attributes
        if (i < 9) {
            let Li = `
	            <li class="clearfix">
	            	<div class="num hotnum">0${[i + 1]}</div>
					<a class="playButton" href="./song.html?id=${results[i].id}">
						<h3>${song.name}</h3>
						<p>
							<svg class="icon icon-sq">
								<use xlink:href="#icon-sq"></use>
							</svg>
							${song.singer}-${song.name}
						</p>
						<span class="click">
							<svg class="icon icon-play">
								<use xlink:href="#icon-play"></use>
							</svg>
						</span>
					</a>
				</li>
	        `
            $song.append(Li)
        } else {
            let Li = `
	            <li class="clearfix">
	            	<div class="num">${[i + 1]}</div>
					<a class="playButton" href="./song.html?id=${results[i].id}">
						<h3>${song.name}</h3>
						<p>
							<svg class="icon icon-sq">
								<use xlink:href="#icon-sq"></use>
							</svg>
							${song.singer}-${song.name}
						</p>
						<span class="click">
							<svg class="icon icon-play">
								<use xlink:href="#icon-play"></use>
							</svg>
						</span>
					</a>
				</li>
	        `
            $song.append(Li)
        }
    }
}, function (error) {
    alert('获取热门歌曲失败')
})

//搜索
// 设置定时器
let timer = null
$("input.search-input").on('input', function (e) {
    //函数节流
    if (timer) {
        window.clearTimeout(timer)
    }
    timer = setTimeout(function () {
        let $input = $(e.currentTarget)
        let value = $input.val().trim()  // 防止输入空格
        // 如果输入空字符串,直接返回
        if (value === '') {
            return
        }
        // 查询字符串,or 组合查询
        var queryName = new AV.Query('Song');
        queryName.contains('name', value);
        var querySinger = new AV.Query('Song')
        querySinger.contains('singer', value);
        var query = AV.Query.or(queryName, querySinger)
        //显示查找结果
        query.find().then(function (results) {
            $("#searchResult").empty()
            //搜索没有结果
            if (results.length === 0) {
                let li = `
						<li>
							<a href="#">
								搜索 "没有结果"
							</a>
						</li>
		    		`
                $('#searchResult').append(li)
            } else {
                //有结果
                for (var i = 0; i < results.length; i++) {
                    let song = results[i].attributes
                    let li = `
						<li data-id="${results[i].id}">
							<a href="song.html?id=${results[i].id}">
								搜索 "${song.name} - ${song.singer}"
							</a>
						</li>
		    		`
                    $('#searchResult').append(li)
                }
            }
        });
    }, 400)
})

var query = new AV.Query('Song');
query.find().then(function (results) {
    for (var i = 0; i < results.length; i++) {
        let song = results[i].attributes
        let li = `
			<li class="item">
    			<a href="./song.html?id=${results[i].id}">${song.name}</a>
    		</li>
		`
        $list.append(li)
    }
}, function (error) {
    alert("获取歌曲失败")
});


//最新音乐加载
// var SongObject = AV.Object.extend('Song');  // 选择表名
// var songOBject = new SongObject();  // 生成一条数据
// songOBject.save({
//   name: '智商二五零',
//   singer: '华晨宇',
//   cover: '//i.loli.net/2017/10/08/59da11c5b94f3.jpg',
//   url: 'http://owyvuq3lo.bkt.clouddn.com/%E6%99%BA%E5%95%86%E4%BA%8C%E4%BA%94%E9%9B%B6.m4a'
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })

//推荐歌单加载数据
// var PlayObject = AV.Object.extend('Playlist');  // 选择表名
// var PlayOBject = new PlayObject();  // 生成一条数据
// PlayOBject.save({
//   title: '等你下课！',
//   src: 'https://i.loli.net/2018/01/18/5a601088b0a59.jpg'
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })