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
    author: String, // 作者
    title: String,  // 文章标题
    createdTime: String,   // 创建时间
    updateTime: String,     // 更新时间
    abstract: String,       // 摘要
    categoryName: String,   // 分类name
    categoryId: String, // 分类id
    tagName: Array,    // 标签name
    tagId: Array,      // 标签id
    commentData: Array,   // 评论数据
    fabulousNum: Number,    // 点赞数量
    img: String, // 文章封面图片
    content: String, // 转换过后的文章内容
    contentMD: String // markdown格式的文章内容
});

// 文章分类表
const articleClassSchema = new mongoose.Schema({
    id: String,
    name: String,
    desc: String
});

// 文章标签表
const articleTagsSchema = new mongoose.Schema({
    id: String,
    name: String,
    type: String
});

const db = {
    userInfo: mongoose.model("userInfo", User),
    articleInfo: mongoose.model("articleInfo", articleSchema),
    articleClassInfo: mongoose.model('articleClassInfo',articleClassSchema),
    articleTags: mongoose.model('articleTags',articleTagsSchema)
};

module.exports = db;
