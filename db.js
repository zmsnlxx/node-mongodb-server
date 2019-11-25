const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/myBlog", err => {
    if (err) {
        console.log("数据库连接失败");
    } else {
        console.log("数据库连接成功");
    }
});

// 用户信息表
const User = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    headPortrait: String
});

// 文章详情表
const articleSchema = new mongoose.Schema({
    id: String,     // id
    title: String,  // 文章标题
    createdTime: String,   // 创建时间
    updateTime: String,     // 更新时间
    abstract: String,       // 摘要
    tags: String,           // 分类
    img: String, // 文章图片
    content: String, // 转换过后的html
    contentMD: String // markdown
});

// 文章分类表
const articleClassSchema = new mongoose.Schema({
    id: String,
    name: String,
    desc: String
});

const db = {
    userInfo: mongoose.model("userInfo", User),
    articleInfo: mongoose.model("articleInfo", articleSchema),
    articleClassInfo: mongoose.model('articleClassInfo',articleClassSchema)
};

module.exports = db;
