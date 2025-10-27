//初始化
var APP_ID = 'eNuy1gIwgY9cI6KeKsGfw3Mr-gzGzoHsz';
var APP_KEY = 'DX4tkQ07mmA8cQHGujuTa6aT';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});


// 最新音乐加载
// var SongObject = AV.Object.extend('Song');  // 选择表名
// var songOBject = new SongObject();  // 生成一条数据
// songOBject.save({
//   name: '等你下课',
//   singer: '周杰伦',
//   cover: '//i.loli.net/2018/01/19/5a61a88f9b1bc.jpg',
//   url: 'http://owyvuq3lo.bkt.clouddn.com/C400001J5QJL1pRQYB.m4a'
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })