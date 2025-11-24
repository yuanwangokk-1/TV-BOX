/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 0,
  title: '短剧库',
  lang: 'ds'
})
*/

var rule = {
  类型: '影视',
  title: '短剧库',
  desc: '源动力出品',
  host: 'https://duanjuzy.com',
  url: '/vod/search/class/fyclass.html?page=fypage',
  searchUrl: '/vod/search.html?page=fypage&wd=**',
  searchable: 2,
  quickSearch: 0,
  timeout: 5000,
  play_parse: true,
  filterable: 0,
  预处理: async () => {
    return []
  },
  class_parse: async function () {
    const { sign, timestamp } = this.decodeCk();
    const html = await request(`${this.host}/label/tabs.html`, {
      headers: {
        Ck: { user_check:"", time: timestamp, sign, "Version": "1.0.0" },
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "https://modupan.com",
        Referer: "https://modupan.com/",
      }
    });
    const response = JSON.parse(html);
    const lists = response.list;
    const classes = [];
    const filters = {};

    for (let list of lists) {
      classes.push({
        type_id: list.name,
        type_name: list.name
      })
    }

    return { class: classes, filters }
  },
  推荐: async function (tid, pg, filter, extend) {
    const { input, pdfa, pdfh, pd } = this;
    const { sign, timestamp } = this.decodeCk();
    const html = await request(`${this.host}/vod/index.html?page=1&type=recommend`, {
      headers: {
        Ck: { user_check:"", time: timestamp, sign, "Version": "1.0.0" },
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "https://modupan.com",
        Referer: "https://modupan.com/",
      }
    });
    const response = JSON.parse(html);
    const lists = response.data;
    const vod = [];

    lists.forEach((list) => {
      vod.push({
        vod_name: list.title,
        vod_id: list.id,
        vod_pic: list.image,
        vod_remarks: list.subtitle
      })
    });

    return vod;
  },
  一级: async function (tid, pg, filter, extend) {
    const { input, pdfa, pdfh, pd } = this;
    const { sign, timestamp } = this.decodeCk();
    const html = await request(input, {
      headers: {
        Ck: { user_check:"", time: timestamp, sign, "Version": "1.0.0" },
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "https://modupan.com",
        Referer: "https://modupan.com/",
      }
    });
    const response = JSON.parse(html);
    const lists = response.data;
    const vod = [];

    lists.forEach((list) => {
      vod.push({
        vod_name: list.title,
        vod_id: list.id,
        vod_pic: list.image,
        vod_remarks: list.subtitle
      })
    });

    return vod;
  },
  二级: async function (ids) {
    const { input, pdfa, pdfh, pd } = this;
    const url = `${this.host}/vod/detail/id/${ids[0]}.html`;
    const { sign, timestamp } = this.decodeCk();
    const html = await request(url, {
      headers: {
        Ck: { user_check:"", time: timestamp, sign, "Version": "1.0.0" },
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "https://modupan.com",
        Referer: "https://modupan.com/",
      }
    });
    const response = JSON.parse(html);
    const vod = {
      vod_id: response.id,
      vod_name: response.title,
      vod_pic: response.image,
    };

    const playFroms = ["源动力偷的线路"];
    const playUrls = [];

    const episodes = response.list;
    const tmpUrls = [];
    const image = response.image;
    const basePlayUrl = image.split('/').slice(0, -1).join('/');
    episodes.forEach((episode) => {
      const index = episode.nid;
      const playUrl = `${basePlayUrl}/${index}.mp4`;
      tmpUrls.push(`${episode.name}$${playUrl}`);
    });
    playUrls.push(tmpUrls.join('#'));

    vod.vod_play_from = playFroms.join('$$$');
    vod.vod_play_url = playUrls.join('$$$');

    return vod;
  },
  搜索: async function (wd, quick, pg) {
    const { input, pdfa, pdfh, pd } = this;
    const { sign, timestamp } = this.decodeCk();
    const html = await request(input, {
      headers: {
        Ck: { user_check:"", time: timestamp, sign, "Version": "1.0.0" },
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "https://modupan.com",
        Referer: "https://modupan.com/",
      }
    });
    const response = JSON.parse(html);
    const lists = response.data;
    const vod = [];

    lists.forEach((list) => {
      vod.push({
        vod_name: list.title,
        vod_id: list.id,
        vod_pic: list.image,
        vod_remarks: list.subtitle
      })
    });

    return vod;
  },
  lazy: async function (flag, id, flags) {
    const { input, pdfa, pdfh, pd } = this;

    if (/m3u8|mp4|flv/.test(input)) {
      return { parse: 0, url: input };
    } else {
      return { parse: 1, url: input };
    }
  },
  decodeCk: function () {
    const prefix = 'e3e2e10r058g6';
    const suffix = 'e3e2e10r058g6';
    const version = 'Version=1.0.0';
    const timestamp = Math.ceil(new Date().getTime() / 1000); 
    const plainText = `${prefix}${encodeURIComponent(version)}${timestamp}${suffix}`;
    const sign = md5(plainText);
    return { sign, timestamp };
  }
}
