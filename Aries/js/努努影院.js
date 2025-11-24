var rule = {
    //rc4解密函数
    rc4Decrypt: function(encryptedHex) {
        const key = "i_love_you";
        const encryptedBytes = new Uint8Array(encryptedHex.length / 2);
        for (let i = 0; i < encryptedBytes.length; i++) {
            encryptedBytes[i] = parseInt(encryptedHex.substr(i * 2, 2), 16);
        }
        const s = Array.from({
            length: 256
        }, (_, i) => i);
        let j = 0;
        const keyLength = key.length;
        for (let i = 0; i < 256; i++) {
            j = (j + s[i] + key.charCodeAt(i % keyLength)) % 256;
            [s[i], s[j]] = [s[j], s[i]];
        }
        let i = 0;
        j = 0;
        const decryptedBytes = new Uint8Array(encryptedBytes.length);
        for (let k = 0; k < encryptedBytes.length; k++) {
            i = (i + 1) % 256;
            j = (j + s[i]) % 256;
            [s[i], s[j]] = [s[j], s[i]];
            const keyStreamByte = s[(s[i] + s[j]) % 256];
            decryptedBytes[k] = encryptedBytes[k] ^ keyStreamByte;
        }
        const decoder = new TextDecoder('utf-8');
        const result = decoder.decode(decryptedBytes);
        return result;
    },

    author: '小可乐/v5.10.1',
    title: '努努影院',
    类型: '影视',
    host: 'https://nnyy.la',
    hostJs: '',
    headers: {
        'User-Agent': MOBILE_UA
    },
    编码: 'utf-8',
    timeout: 5000,

    homeUrl: '/',
    url: '/fyclass/?page=fypage&fyfilter',
    filter_url: 'area={{fl.area}}&by={{fl.by}}&class={{fl.class}}&year={{fl.year}}',
    searchUrl: '/search?page=fypage&wd=**',
    detailUrl: '',

    limit: 9,
    double: false,
    class_name: '电影&剧集&综艺&动漫&短剧&纪录',
    class_url: 'dianying&dianshiju&zongyi&dongman&duanju&jilupian',
    filter_def: {},

    推荐: '*',
    一级: $js.toString(() => {
        let klists = pdfa(fetch(input), '.thumbnail');
        VODS = [];
        klists.forEach((it) => {
            VODS.push({
                vod_name: pdfh(it, 'img&&alt'),
                vod_pic: pdfh(it, 'img&&data-src'),
                vod_remarks: pdfh(it, '.note&&Text'),
                vod_id: pdfh(it, 'a&&href')
            })
        })
    }),
    搜索: '*',
    二级: $js.toString(() => {
        let khtml = fetch(input);
        let ktabs = pdfa(khtml, 'dl&&dt').map((it) => {
            return pdfh(it, 'body&&Text')
        });
        let kurls = pdfa(khtml, '.sort-list').map((item) => {
            let kurl = pdfa(item, 'a').map((it) => {
                return pdfh(it, 'body&&Text') + '$' + input + '@' + pdfh(it, 'a&&onclick')
            });
            return kurl.join('#')
        });
        VOD = {
            vod_id: input,
            vod_name: pdfh(khtml, '.thumb&&alt'),
            vod_pic: pdfh(khtml, '.thumb&&data-src'),
            type_name: pdfh(khtml, '.product-excerpt:contains(类型)&&Text').replace('类型：', '') || '未提供',
            vod_remarks: pdfh(khtml, 'h1.product-title&&span:eq(-1)&&Text') || '未提供',
            vod_year: pdfh(khtml, 'h2&&span&&Text').replace(/\D+/g, '') || '3000',
            vod_area: pdfh(khtml, '.product-excerpt:contains(地区：)&&a&&Text') || '未提供',
            vod_lang: '未提供',
            vod_director: pdfh(khtml, '.product-excerpt:contains(导演)&&Text').replace('导演：', '') || '未提供',
            vod_actor: pdfh(khtml, '.product-excerpt:contains(主演)&&Text').replace('主演：', '') || '未提供',
            vod_content: pdfh(khtml, '.product-excerpt:eq(-1)&&span&&Text') || '未提供',
            vod_play_from: ktabs.join('$$$'),
            vod_play_url: kurls.join('$$$')
        }
    }),

    play_parse: true,
    lazy: $js.toString(() => {
        let [kurl, kids] = input.split('@');
        let [sid, kid] = kids.match(/\d+/g);
        let flag = `[${sid}][${kid}]`;
        kurl = fetch(kurl).split(`${flag}`)[1].split('"')[1];
        if (kurl) {
            kurl = rule.rc4Decrypt(kurl)
        };
        if (/\.(m3u8|mp4|mkv)/.test(kurl)) {
            input = {
                jx: 0,
                parse: 0,
                url: kurl,
                header: rule.headers
            }
        } else {
            input = {
                jx: 0,
                parse: 1,
                url: input
            }
        }
    }),

    filter: 'H4sIAAAAAAAAA+1Y204iQRB99zPm2Qfvt18xPsy6RHEVN6KbsMbECyioC2oUFiXqxgvqiuIlKsOCPzPdA3+xDd1d3YOmmWyM7kO/cep09a16qk4x22J89puBkD8wYgwMtswaX3whY8AYHjeDQaPVCJgTPgJRLIuXIgR/M8dniGFw1gjUzJGz6tJZzUyAMdfKrMkMGc+sDHDOid6wiQQAv9Uzu5ThfhSAX3YTFYrcjwLJz9kuCr8a4BxevHSSm4xjAOZcvXZKF3xOCsBvaRUv7nI/CmC95a1q+pyvRwHnqgd3dmGDcQyAX3wZJW65HwXAnayI8zEAe1nYwPNJvhcKgIv+tK0Y5yjgnP3nsHKVZxwD4Jdbr0T3uR8Fgju1y4fA1YG4l0gldgv3Ugdwnwvl6m6Z3ycFnKucPIuXwgD4WReotOPEVrgrYBhxkJNoCuaG5lrhuZpTPlN6rZk8Wre8vtYf8cp1jt88BXDay6xTjvPTUiAifY72ShDpOgC/1AnOXHI/CiAqTzkyFB1nq+llHhvZBGcux8X8DLjnqJ6m8dO1aw5malgrkceFsnstaoLorN2ItRiAs9ztCI4BuLvyo+AYAL9wgpwIRfmHIrD0JpwEiWVaPAuGRWzyyDqF2NSB2Fde3lfedT/PYaeUwkm4HMAiZxzitWeyIUgbHMP85Tu6X9uCPCCbpIyG8tsowj80gWHE5j6KPHGaAtjH4z05Nt8EBSJ6hSqcngHXqw/5zCnp1Rfu7WLJ46vvaOtoqzscMUYySGO6Bdst27uEvUu2dwp7p2zvEPYO2d4u7O2uvUm7kuzt/WAnPyV741naX56lrXFMW+OYfveI/ka+z833NfK9br63ke9x8z2NPN67xyn4XChwxftTSEQbx7eQlXgRbbwew6mHauqeTTPtJ6NhgfWYbVk4v83IUf90UCYr12EU5UkpODw55aut3zLUSjVCcNQ/NvPRIkFV0JVCQFHUUOK4csTXYwC4qwdkQXmgwIuAUAkWVUFXiQRVsVeJJ5VgUYkEEVABPAkWhXhSiQSVKHlVWH2wBKgXbR5HBt5LHniVACoZoS77ivLqUVY0lwD/Ki6aS4fmEuBNy7IHwdJccjSXEk1FiZYHWh58gDz4PhkYCfnfShs4mQOyESc7z78DwPD9h29Q4kiMENhLI/5qndG1RNcSXUt0LdG15KNbTVJLJszAmxWTeFhqxCjw1KSpGkZFQ0X6MpxMiSatBoDb2HcuoXmlQDSFa+QbhaawDqAA5LbFPhmAM/zex6tQKSnw0iyTWoGeeMpiALjDX2iPFzEG3MXZVZmFX/zM2eBRZcBLY+sUE1L6pAD8Ig92EQojBW9WrJcjZDzEsQ68FFZlIW+2X51KdSp9r1Q6Ywb0X3b6LzvG/W9/2elMqDPhO2XCMf/4zFe/W1XqLl93+brL1wlZJ+T3Tsgtc38Bc7UuQ3cmAAA='
}