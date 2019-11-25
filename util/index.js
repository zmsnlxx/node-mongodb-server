const db = require("../db");

// 自定义函数方法:
// cookie编码程序
function CodeCookie(str) {
    let strRtn = "";
    for (let i = str.length - 1; i >= 0; i--) {
        strRtn += str.charCodeAt(i);
        if (i) strRtn += "a" //用a作分隔符
    }
    return strRtn
}

function setRandomId() {
    return Date.now() + "" + Math.floor(Math.random() * 10000);
}

function getArticle(params) {
    return db.articleInfo.find({tags:params})
}

function getArticleClass() {
    return db.articleClassInfo.find()
}

/**
 * 过滤字符串函数
 **/
function filterStr(str) {
    const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]");
    let specialStr = "";
    for (let i = 0; i < str.length; i++) {
        specialStr += str.substr(i, 1).replace(pattern, '');
    }
    return specialStr;
}

module.exports = {
    CodeCookie,
    setRandomId,
    getArticle,
    filterStr,
    getArticleClass,
};
