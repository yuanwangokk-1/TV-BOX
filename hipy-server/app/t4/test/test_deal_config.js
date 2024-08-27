// 需要java注入joinUrl
const joinUrl = (from, to) => {
  const resolvedUrl = new URL(to, new URL(from, 'resolve://'));
  if (resolvedUrl.protocol === 'resolve:') {
    const { pathname, search, hash } = resolvedUrl;
    return pathname + search + hash;
  }
  return resolvedUrl.href;
};

// 这个就是js逻辑，处理url和data为正确的data
function dealConfig(url, data) {
  let obj = JSON.parse(data);
  let keys = ['api', 'ext', 'jar'];
  for (let key of keys) {
    if (obj.hasOwnProperty(key)) {
      let value = obj[key];
      if (typeof (value) == 'string' && value && (value.startsWith('./') || value.startsWith('../'))) {
        obj[key] = decodeURIComponent(joinUrl(url, value));
      }
    }
  }
  return JSON.stringify(obj);
}

// 下面是测试
function test1() {
  let url = 'http://py.nokia.press:8888/config/1';
  let data = '{"key":"hipy_js_我的哔哩传参","name":"我的哔哩传参(drpy_t3)","type":3,"api":"http://py.nokia.press:8888/files/drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":146,"ext":"http://py.nokia.press:8888/files/drpy_js/我的哔哩传参.js?type=url&params=../json/小学教育.json"}';
  console.log(dealConfig(url, data));
}

function test2() {
  let url = 'http://py.nokia.press:8888/files/';
  let data = '{"key":"hipy_js_我的哔哩传参","name":"我的哔哩传参(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":146,"ext":"./drpy_js/我的哔哩传参.js?type=url&params=../json/小学教育.json"}';
  console.log(dealConfig(url, data));
}

// test1();
// test2();

/**
 * 递归查找json文本中，某个属性值以prefix开头的
 * @param obj
 * @param prefixs ['./','../'] 或者 './'
 * @returns {*[]}
 */
function findAllStringPropertiesStartingWith(obj, prefixs) {
  if (!Array.isArray(prefixs)) {
    prefixs = [prefixs];
  }
  let result = [];

  if (typeof obj === 'object') {
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        for (let prefix of prefixs) {
          if (obj[key].startsWith(prefix)) {
            result.push(obj[key]);
            break;
          }
        }
      }

      // 递归查找子对象中的属性
      const recursiveResult = findAllStringPropertiesStartingWith(obj[key], prefixs);
      if (recursiveResult.length > 0) {
        result = result.concat(recursiveResult);
      }
    }
  }

  return result;
}


/**
 * 这个就是js逻辑，处理完整的box配置。传入url和data
 * @param url 配置链接
 * @param data 配置文本
 * @returns {*}
 */
function dealConfigAll(url, data) {
  let obj = JSON.parse(data);
  let values = findAllStringPropertiesStartingWith(obj, ['./', '../']);
  let newList = Array.from(new Set(values));
  newList.forEach(value => {
    data = data.replaceAll(value, decodeURIComponent(joinUrl(url, value)));
  });
  return data;
}


let data = `
{"wallpaper":"https://tuapi.eees.cc/api.php?category=fengjing&type=302","homepage":"https://github.com/hjdhnx/hipy-server","sites":[{"key":"hipy_js_爱看机器人","name":"公众号【云星日记】","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":52,"ext":"./drpy_js/爱看机器人.js"},{"key":"hipy_js_厂长资源","name":"QQ群：783468715","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":0,"order_num":121,"ext":"./drpy_js/厂长资源.js"},{"key":"hipy_js_360影视","name":"接口更新于0508","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":0,"order_num":15,"ext":"./drpy_js/360影视.js"},{"key":"hipy_js_996影视","name":"996影视(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":16,"ext":"./drpy_js/996影视.js"},{"key":"hipy_js_优酷","name":"优酷(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":17,"ext":"./drpy_js/优酷.js"},{"key":"hipy_js_哔哩影视","name":"哔哩影视(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":19,"ext":"./drpy_js/哔哩影视.js?render=1"},{"key":"hipy_js_奇珍异兽","name":"奇珍异兽(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":20,"ext":"./drpy_js/奇珍异兽.js"},{"key":"hipy_js_百忙无果","name":"百忙无果(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":21,"ext":"./drpy_js/百忙无果.js"},{"key":"hipy_js_腾云驾雾","name":"腾云驾雾(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":22,"ext":"./drpy_js/腾云驾雾.js"},{"key":"hipy_js_荐片","name":"荐片(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":23,"ext":"./drpy_js/荐片.js"},{"key":"hipy_js_菜狗","name":"菜狗(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":24,"ext":"./drpy_js/菜狗.js"},{"key":"hipy_js_酷云77","name":"酷云77(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":53,"ext":"./drpy_js/酷云77.js"},{"key":"hipy_js_在线之家","name":"在线之家(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":54,"ext":"./drpy_js/在线之家.js"},{"key":"hipy_js_兔小贝","name":"兔小贝(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":0,"order_num":55,"ext":"./drpy_js/兔小贝.js"},{"key":"hipy_js_555影视[飞]","name":"555影视[飞](drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":56,"ext":"./drpy_js/555影视[飞].js"},{"key":"hipy_js_豆瓣","name":"豆瓣(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":1,"filterable":1,"order_num":57,"ext":"./drpy_js/豆瓣.js?render=1"},{"key":"hipy_js_耐看","name":"耐看(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":0,"order_num":122,"ext":"./drpy_js/耐看.js"},{"key":"hipy_js_暴风资源","name":"暴风资源(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":1,"filterable":0,"order_num":131,"ext":"./drpy_js/暴风资源.js"},{"key":"hipy_js_白嫖影视","name":"白嫖影视(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":132,"ext":"./drpy_js/白嫖影视.js"},{"key":"hipy_js_花子动漫","name":"花子动漫(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":0,"order_num":133,"ext":"./drpy_js/花子动漫.js"},{"key":"hipy_js_卧龙资源","name":"卧龙资源(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":1,"filterable":0,"order_num":135,"ext":"./drpy_js/卧龙资源.js"},{"key":"hipy_js_LIBVIO","name":"LIBVIO(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":137,"ext":"./drpy_js/LIBVIO.js"},{"key":"hipy_js_量子资源","name":"量子资源(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":1,"filterable":0,"order_num":138,"ext":"./drpy_js/量子资源.js"},{"key":"hipy_js_农民影视3","name":"农民影视3(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":139,"ext":"./drpy_js/农民影视3.js"},{"key":"hipy_js_金鹰资源","name":"金鹰资源(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":1,"filterable":0,"order_num":141,"ext":"./drpy_js/金鹰资源.js"},{"key":"hipy_js_南瓜影视","name":"南瓜影视(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":143,"ext":"./drpy_js/南瓜影视.js"},{"key":"hipy_js_极速资源","name":"极速资源(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":1,"filterable":0,"order_num":145,"ext":"./drpy_js/极速资源.js"},{"key":"hipy_js_我的哔哩传参","name":"我的哔哩传参(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":146,"ext":"./drpy_js/我的哔哩传参.js?type=url&params=../json/小学教育.json"},{"key":"hipy_js_白嫖者联盟","name":"白嫖者联盟(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":0,"order_num":147,"ext":"./drpy_js/白嫖者联盟.js"},{"key":"hipy_js_极客资源","name":"极客资源(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":1,"filterable":0,"order_num":148,"ext":"./drpy_js/极客资源.js"},{"key":"hipy_js_大米星球","name":"大米星球(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":149,"ext":"./drpy_js/大米星球.js"},{"key":"hipy_js_6V新版[磁]","name":"6V新版[磁](drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":150,"ext":"./drpy_js/6V新版[磁].js"},{"key":"hipy_js_777影视","name":"777影视(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":152,"ext":"./drpy_js/777影视.js"},{"key":"hipy_js_可可影视","name":"可可影视(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":153,"ext":"./drpy_js/可可影视.js"},{"key":"hipy_js_榜一短剧","name":"榜一短剧(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":0,"order_num":154,"ext":"./drpy_js/榜一短剧.js"},{"key":"hipy_js_大米星球[V2]","name":"大米星球[V2](drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":155,"ext":"./drpy_js/大米星球[V2].js"},{"key":"hipy_js_voflix","name":"voflix(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":156,"ext":"./drpy_js/voflix.js"},{"key":"hipy_js_量子影视","name":"量子影视(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":157,"ext":"./drpy_js/量子影视.js"},{"key":"hipy_js_我的哔哩","name":"我的哔哩(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":158,"ext":"./drpy_js/我的哔哩.js"},{"key":"hipy_js_网飞猫","name":"网飞猫(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":159,"ext":"./drpy_js/网飞猫.js"},{"key":"hipy_js_非凡资源","name":"非凡资源(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":1,"filterable":0,"order_num":160,"ext":"./drpy_js/非凡资源.js"},{"key":"hipy_js_索尼资源","name":"索尼资源(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":1,"filterable":0,"order_num":161,"ext":"./drpy_js/索尼资源.js"},{"key":"hipy_js_新片场","name":"新片场(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":190,"ext":"./drpy_js/新片场.js"},{"key":"hipy_js_cokemv","name":"cokemv(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":191,"ext":"./drpy_js/cokemv.js"},{"key":"hipy_js_TVB云播","name":"TVB云播(drpy_t3)","type":3,"api":"./drpy_libs/drpy2.min.js","searchable":1,"quickSearch":0,"filterable":1,"order_num":192,"ext":"./drpy_js/TVB云播.js"}],"parses":[{"name":"777","url":"https://jx.777jiexi.com/player/?url=","type":0,"ext":{"flag":["qiyi","imgo","爱奇艺","奇艺","qq","qq 预告及花絮","腾讯","youku","优酷","pptv","PPTV","letv","乐视","leshi","mgtv","芒果","sohu","xigua","fun","风行"]},"header":{"User-Agent":"Mozilla/5.0"}},{"name":"8090g","url":"https://www.8090g.cn/jiexi/?url=","type":0,"ext":{"flag":["qiyi","imgo","爱奇艺","奇艺","qq","qq 预告及花絮","腾讯","youku","优酷","pptv","PPTV","letv","乐视","leshi","mgtv","芒果","sohu","xigua","fun","风行"]},"header":{"User-Agent":"Mozilla/5.0"}}],"flags":["imgo","youku","qq","qq 预告及花絮","iqiyi","qiyi","fun","letv","leshi","sohu","tudou","xigua","cntv","1905","pptv","mgtv","wasu","bilibili","renrenmi"],"lives":[{"group":"redirect","channels":[{"name":"杭州华数直播","urls":["proxy://do=live&type=txt&ext=http://127.0.0.1:9978/api/v1/file/drpy_dzlive/lives/杭州华数.m3u"]},{"name":"云星日记直播","urls":["proxy://do=live&type=txt&ext=http://itvbox.cc/云星日记/Ipv4.txt"]},{"name":"本地嗅探器直播","urls":["proxy://do=live&type=txt&ext=http://127.0.0.1:5708/ysp"]}]}]}
`.trim();
data = dealConfigAll('http://itvbox.cc/zyplayer/%E4%BA%91%E6%98%9F%E6%97%A5%E8%AE%B0.json', data);
console.log(data);
