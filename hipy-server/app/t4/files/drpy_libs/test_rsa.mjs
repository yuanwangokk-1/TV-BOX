import JSEncrypt from './jsencrypt.js';
// import './jsencrypt.js';

var log = console.log;
// 封装的RSA加解密类
const RSA = {
    decode: function (data, key, option) {
        option = option || {};
        if (typeof (JSEncrypt) === 'function') {
            let chunkSize = option.chunkSize || 117; // 默认分段长度为117
            let privateKey = this.getPrivateKey(key); // 获取私钥
            const decryptor = new JSEncrypt(); //创建解密对象实例
            decryptor.setPrivateKey(privateKey); //设置秘钥
            let uncrypted = '';
            // uncrypted = decryptor.decrypt(data);
            uncrypted = decryptor.decryptUnicodeLong(data);
            return uncrypted;
        } else {
            return false
        }
    },
    encode: function (data, key, option) {
        option = option || {};
        if (typeof (JSEncrypt) === 'function') {
            let chunkSize = option.chunkSize || 117; // 默认分段长度为117
            let publicKey = this.getPublicKey(key); // 获取公钥
            const encryptor = new JSEncrypt();
            encryptor.setPublicKey(publicKey); // 设置公钥
            let encrypted = ''; // 加密结果
            // const textLen = data.length; // 待加密文本长度
            // let offset = 0; // 分段偏移量
            // // 分段加密
            // while (offset < textLen) {
            //     let chunk = data.substr(offset, chunkSize); // 提取分段数据
            //     let enc = encryptor.encrypt(chunk); // 加密分段数据
            //     encrypted += enc; // 连接加密结果
            //     offset += chunkSize; // 更新偏移量
            // }
            encrypted = encryptor.encryptUnicodeLong(data);
            return encrypted
        } else {
            return false
        }
    },
    fixKey(key, prefix, endfix) {
        if (!key.includes(prefix)) {
            key = prefix + key;
        }
        if (!key.includes(endfix)) {
            key += endfix
        }
        return key
    },
    getPrivateKey(key) {
        let prefix = '-----BEGIN RSA PRIVATE KEY-----';
        let endfix = '-----END RSA PRIVATE KEY-----';
        return this.fixKey(key, prefix, endfix);
    },
    getPublicKey(key) {
        let prefix = '-----BEGIN PUBLIC KEY-----';
        let endfix = '-----END PUBLIC KEY-----';
        return this.fixKey(key, prefix, endfix);
    }
};

console.log('typeof (JSEncrypt):' + typeof (JSEncrypt));
let publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwEc7wBMtYKkxvrQNI3+ITBZwAkPkGvsv4TsAHFskKGZWz9eYl3scivhmlEfWHlEkdyb0m82CmB1qAgef+pD4cZu+Cdmm2e9lnExhLwm8cBgpkAen9QRNdjojZgxM0W+JcReH4W6pw+uFXiLRn4AIQkDftWGNLg6wlNS+39Z/RvP9zyATJLZ9AKDdHp62XMxEK1KZvWBuIg+Oa5UzgA9jy+2XyIqwhBtO8tPbUl21t2pvTzHoLUjSkPNm2LurcUk6+jQ2r6aiS2CN1NXIucPJU6mkuIQ821SjvkYPtIdRMntW4y2u4cyiqVEEQwlzWVMHh+/vfrWAQr9fgjDuYYtvPQIDAQAB';
let privateKey = 'MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDARzvAEy1gqTG+tA0jf4hMFnACQ+Qa+y/hOwAcWyQoZlbP15iXexyK+GaUR9YeUSR3JvSbzYKYHWoCB5/6kPhxm74J2abZ72WcTGEvCbxwGCmQB6f1BE12OiNmDEzRb4lxF4fhbqnD64VeItGfgAhCQN+1YY0uDrCU1L7f1n9G8/3PIBMktn0AoN0enrZczEQrUpm9YG4iD45rlTOAD2PL7ZfIirCEG07y09tSXbW3am9PMegtSNKQ82bYu6txSTr6NDavpqJLYI3U1ci5w8lTqaS4hDzbVKO+Rg+0h1Eye1bjLa7hzKKpUQRDCXNZUweH7+9+tYBCv1+CMO5hi289AgMBAAECggEBAIRbRJUWXmEwdq64kGbELlV6CIZ2p3mvOSlIjO34Cy7IK7AMz9xOgbpj/XDK9miOIJTouu7ZC7GcZdGZ4BUCYBMMS0fKjGFuurpZlXhkslNTPqEHtCUkXhIpOR7RDrwIlErGEOIsZC4aXQcM3tF1t7mroJLh4OY4dHMu82lv5NM4hhFMNvHzXVvrPXeTzw26gddHVG/ke0WUYOcB5j3cPp8xaVp7JV8bdxtGtkqIfBLY/dIczzJu/3F3cBpU2nNwt8uVUF/w/HKlr7j8FqqFHXWh182beU0n5AIdRyRJBrRUAEhdtsUnvJOVBDqzZa+9DJ5395F7V8KRlQptxETdhCECgYEA4x/2HM9fnVIhG6wTbEt1LhGTKYb/igMAHLqquEMfRsB44tobI8gVNwR3qJQY/nKXxcQemQV29PcdqpENCKyXUXGD8SI1UPg15rHFBI8CIqlCXfzJybdHjmzlhaA9I5lofIVh+5MW7WkvHZoRy7NeDMhHUuaiveuqC4OJ8n+dD2kCgYEA2LkmUVef3WkBBwUBRdkyoog3DMwR+/ubb0ncJVYy3ItYVJltQ4HqmrRiJc8xBAoFnG8rbiqDnmTnDR3WbuxU1G2hml09fqId+rQds2UfESswCXHU43A4f77m1XyA6PprBxpozVIcmK69N4rR9jOXflLWo3O+p2ipUbmNpId7+rUCgYBSpcbBJRT+AmzZzPwkZDD32p1ady114zGfQq3s7z/qVw+mPQezNZPCuXVxerK9pKVl6b/Ynwxyh5nb/3xms6c8k7oXfQM5u5ihof63cfKs+jqUSPCE3pTDVw0OWwjkc2Z6KW9GRHgLXEMw2mevYE3RCPArUpHV2nO+TNddzuIwQQKBgQDOZwdnUNygMfEYjlu3+jOPN8u2FGTMZ8SRKPbRWFb4VH27lKPLN2AIFuOivsEf56uQYRAry7GumMq0Y0ZmPg5Mglz2dvaqNBv5OLFQuW3tHAST+iWWtroYb+fISts7B8QG79AAO8OgZksvKrbslBYj6SEiaomZRsR7YQzVNXOOQQKBgQCovElZ50c8ZJ6m9D9fw3Nes7u9vshpyyac5tt4tZ7yfU4l5pWGrIUqCE703qZp4NAqEvlZUCJbj9kkysaj/2MfFb2b9jSvdNB+V/YW9Cwg+5TziYoOcQzN1z2u4p4goTAv0S+pTNSr3qWaTUI4TXUXQajif45Fexv+MrP5AAXQyw=='
// let text = '你好';
let text = '[{"vod_name":"兔小贝原创儿歌","vod_pic":"https://resource-cdn.tuxiaobei.com/video-album/FnQ8ieJHgsbgCKWXNBg4uoOmKgG5.jpg","vod_remarks":"共229首","vod_content":"","vod_id":"/subject/17@@兔小贝原创儿歌@@https://resource-cdn.tuxiaobei.com/video-album/FnQ8ieJHgsbgCKWXNBg4uoOmKgG5.jpg"},{"vod_name":"英文儿歌","vod_pic":"https://resource-cdn.tuxiaobei.com/video-album/Fqjpx2H_-QaYNAYn2MekRuDpeyUv.jpg","vod_remarks":"共10首","vod_content":"","vod_id":"/subject/23@@英文儿歌@@https://resource-cdn.tuxiaobei.com/video-album/Fqjpx2H_-QaYNAYn2MekRuDpeyUv.jpg"}]';
let str = RSA.encode(text, publicKey);
console.log("加密数据：" + str);
let str1 = 'Wa2c/868VOm0PgpGG2s2aMrDbGOlJRdZXlSGswjFgywd3nZNB7ND8kVMdNB/OsNFoQXJXSJMvPaE73BH7rs8fz54JGdYQK+qTgfQRqQZvomCjbzseSR4bm4NOrtIOOslL3WqxlzOuU0M1P1eERmkLEVU2WSyc3RGtJro3b3MOWYCNdKMoZdncfOHJndkl4wm9V3GGc3uH98hs6OxLvBWgXoW9jZQ3n0vR2FtS2KYrPGuSuKGkxlt9Kw5TD6nri142NOimz05WK55Xe04YUQ1VZd51t0wzJGXolWgfzIQaK2zzhk5Zjlm+IQJxXqEWiJ2+O6TJ+lIttvsDSaUflcDXQ==';
let str2 = 'R86mW9DzBw05pxBSh9ECh1stXxINmnudgZBbzU/cz1EcFgrEgdk0Zk4ruAiJZB2fP5c7d3gMmN8+Dv19IfARWSzw85xCEjUhpdcMJ0jn6ZE5H+muadND9LzjeVisojqwYxot3YVdKof7HMhPFN8QR0jfzqhjmnGFTlY1jMXzJK0MSOLNRLDar480CdKNb/cxALC8+xKIlhM9E4B31t8J4rNMUWSCAr49lbZ3jx3PxieBpTQUdDJz96AttR93Pc+c51wrxh0Ch/Mt4Rs09HGMXwIpNV+CxsGwSGRQUlyJo2k3d0WqsVzpz6S8A4VGEMTRLGI3IjEt+eWt7wM3nAXarg==';
let str3 = 'D4eOsRqua+jYA5+ZOR9PLI2PExKjKfArQfv9/wGeG50bQSjWypShJPY6RQfO+rghyf0juzHIUSxqH91OxinhCFkONaF2Vod2QVyphyn9eh73dAcEFKIFFKGXoPCjbMWrr3p4d+hgVrHzrFeGqkRq8JFOvG2L5XDxVfWbV8KmUA0DKuz6QwWg7P4kesy+C7BbLALy5W/wfZchD3gnsBvx/pjFoe11VfAify9isLxg9a15jj52xr6lzQ9kge9C2JcV8yq85bFKaUpJWgobzz+BSIv3lVMU6vgcldmOrhkyiETpFGFGGF00DphGCEoK6uAyyNDh7+Jn8P17zf/DW1wV3A==';
let uncrypted = RSA.decode(str, privateKey);
log('解密数据:' + uncrypted);
uncrypted = RSA.decode(str1, privateKey);
log('解密数据1:' + uncrypted);
uncrypted = RSA.decode(str2, privateKey);
log('解密数据2:' + uncrypted);
uncrypted = RSA.decode(str3, privateKey);
log('解密数据3:' + uncrypted);