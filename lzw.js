/*!
 * LZW.js - LZW implemented in JavaScript
 * https://github.com/jamesliu96/LZW.js
 *
 * Copyright (c) 2015 James Liu
 * Released under the MIT license
 */
;(function(c) {
    c.LZW = {
        compress: function(c) {
            for (var b = 0, d = {}; 256 > b; b++) {
                d[String.fromCharCode(b)] = b;
            }
            var g = "", b = [], k = 256, e = 8, a = "", f = 0, h = 0, l;
            l = 0;
            for (var m; l <= c.length; l++) {
                m = c[l], l == c.length && (m = ""), m.length && "undefined" !== typeof d[g + m] ? g += m : (b.push(d[g]), d[g + m] = d.length, g = m);
            }
            for (l in b) {
                for (c = b[l], f = (f << e) + c, h += e, k++, k > 1 << e && e++; 7 < h;) {
                    h -= 8, a += String.fromCharCode(f >> h), f &= (1 << h) - 1;
                }
            }
            return a + (h ? String.fromCharCode(f << 8 - h) : "");
        },
        decompress: function(c) {
            for (var b = 256, d = 8, g = [], k = 0, e = 0, a = 0; a < c.length; a++) {
                k = (k << 8) + c[a].charCodeAt(0), e += 8, e >= d && (e -= d, g.push(k >> e), k &= (1 << e) - 1, b++, b > 1 << d && d++);
            }
            a = 0;
            for (c = {}; 256 > a; a++) {
                c[a] = String.fromCharCode(a);
            }
            for (var b = "", f, a = 0; a < g.length; a++) {
                d = g[a], element = c[d], "undefined" === typeof element && (element = f + f[0]), b += element, c[f + element[0]] = f + element[0], f = element;
            }
            return b;
        }
    };
})(this);