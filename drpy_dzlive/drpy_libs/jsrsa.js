//任意长度RSA Key分段加密解密长字符串
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function btoa(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += b64map.charAt(c1 >> 2);
            out += b64map.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += b64map.charAt(c1 >> 2);
            out += b64map.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += b64map.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += b64map.charAt(c1 >> 2);
        out += b64map.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += b64map.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += b64map.charAt(c3 & 0x3F);
    }
    return out;
}

function atob(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1) break;
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1) break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61) return out;
            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1) break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61) return out;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1) break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

function hex2b64(h) {
    var i;
    var c;
    var ret = "";
    for (i = 0; i + 3 <= h.length; i += 3) {
        c = parseInt(h.substring(i, i + 3), 16);
        ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
    }
    if (i + 1 == h.length) {
        c = parseInt(h.substring(i, i + 1), 16);
        ret += b64map.charAt(c << 2);
    } else if (i + 2 == h.length) {
        c = parseInt(h.substring(i, i + 2), 16);
        ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
    }
    while ((ret.length & 3) > 0) ret += b64pad;
    return ret;
}

function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

function bytesToHex(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
    }
    return hex.join("");
}

function b64tohex(str) {
    for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
        var tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
    }
    return hex.join("");
}

function addPreZero(num, length) {
    var t = (num + '').length,
        s = '';
    for (var i = 0; i < length - t; i++) {
        s += '0';
    }

    return s + num;
}

//获取RSA key 长度
JSEncrypt.prototype.getkeylength = function () {
    return ((this.key.n.bitLength() + 7) >> 3);
};

// 分段解密，支持中文
JSEncrypt.prototype.decryptUnicodeLong = function (string) {
    var k = this.getKey();
    //解密长度=key size.hex2b64结果是每字节每两字符，所以直接*2
    var maxLength = ((k.n.bitLength() + 7) >> 3) * 2;
    try {
        var hexString = b64tohex(string);
        var decryptedString = "";
        var rexStr = ".{1," + maxLength + "}";
        var rex = new RegExp(rexStr, 'g');
        var subStrArray = hexString.match(rex);
        if (subStrArray) {
            subStrArray.forEach(function (entry) {
                decryptedString += k.decrypt(entry);
            });
            return decryptedString;
        }
    } catch (ex) {
        console.log('加密错误:' + ex.message);
        return false;
    }
};

// 分段加密，支持中文
JSEncrypt.prototype.encryptUnicodeLong = function (string) {
    var k = this.getKey();
    //根据key所能编码的最大长度来定分段长度。key size - 11：11字节随机padding使每次加密结果都不同。
    var maxLength = ((k.n.bitLength() + 7) >> 3) - 11;
    try {
        var subStr = "", encryptedString = "";
        var subStart = 0, subEnd = 0;
        var bitLen = 0, tmpPoint = 0;
        for (var i = 0, len = string.length; i < len; i++) {
            //js 是使用 Unicode 编码的，每个字符所占用的字节数不同
            var charCode = string.charCodeAt(i);
            if (charCode <= 0x007f) {
                bitLen += 1;
            } else if (charCode <= 0x07ff) {
                bitLen += 2;
            } else if (charCode <= 0xffff) {
                bitLen += 3;
            } else {
                bitLen += 4;
            }
            //字节数到达上限，获取子字符串加密并追加到总字符串后。更新下一个字符串起始位置及字节计算。
            if (bitLen > maxLength) {
                subStr = string.substring(subStart, subEnd)
                encryptedString += k.encrypt(subStr);
                subStart = subEnd;
                bitLen = bitLen - tmpPoint;
            } else {
                subEnd = i;
                tmpPoint = bitLen;
            }
        }
        subStr = string.substring(subStart, len)
        encryptedString += k.encrypt(subStr);
        return hex2b64(encryptedString);
    } catch (ex) {
        console.log('解密错误:' + ex.message);
        return false;
    }
};
//添加的函数与方法结束
