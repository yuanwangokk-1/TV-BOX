var rule = {
    title:'酷狗MV',
    host:'https://www.kugou.com/',
    url:'/yy/rank/home/1-fyclass.html?from=rank',
    searchUrl:'',
    searchable:2,
    quickSearch:0,
  class_name:'热门榜单&特色音乐榜&全球榜',
 class_url:'6666&33162&4681',
    headers:{
        'User-Agent':'PC_UA'
    },
    timeout:5000,
    play_parse:true,

   limit:6,
    推荐:'*',
    一级:'.pc_rank_sidebar&&li;a&&title;img&&_src;a&&Text;a&&href',

 
    二级: {  
    title: '',
    img: 'img&&_src',
    desc: '',
    content: '',
    tabs: '',
    lists: 'li a.pc_temp_songname',
    list_text: 'body&&Text',
    list_url: 'a&&href',
  },
  
    搜索:'js:let d=[];let html=request(input);let list=JSON.parse(html).sun;for(let j=1;j<=list;j++){let t=JSON.parse(request(MY_URL+j));d.push({title:t.name,desc:t.author,img:t.img,url:t.video})}setResult(d)',
}