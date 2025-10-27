var rule = {
    title: '去广告测试源1',
    host: '',
    play_parse: true,
    lazy: `js:
    input = {
        parse:0,
        jx:0,
        url:getProxyUrl()+'&url='+'https://yzzy.play-cdn21.com/20240227/945_dd89a1c4/index.m3u8',
        //url:getProxyUrl()+'&url='+'https://s1.bfzycdn.com/video/renmindemingyi/第07集/index.m3u8',
    };
    `,
    proxy_rule: `js:
  let url = input.url;
  // input = [403,'text/plain',url];
  // let html = request(url);
  //let content = fixAdM3u8(null,url,'reg:/video/adjump(.*?)ts')
  //input = [200,'video/MP2T',content];
  
  let m3u8 = fixAdM3u8Ai(url);
  input = [200,'application/vnd.apple.mpegurl',m3u8]
  `
}