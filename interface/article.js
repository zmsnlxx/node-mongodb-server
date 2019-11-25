// 评论接口
const express = require("express");
const router = express.Router();
const db = require("../db");
const util = require('../util');
const _ = require('lodash');
const moment = require('moment');


// 文章新增
router.post('/api/article/addArticle', (req, res) => {
    const newArticle = new db.articleInfo({
        id: util.setRandomId(),         // 文章id
        title: req.body.title,          // 文章标题
        abstract: req.body.abstract,    // 文章摘要
        createdTime: moment().format('YYYY-MM-DD HH:mm'),     // 创建时间
        tags: req.body.tags,            // 文章分类
        content: req.body.content,      // 文章内容
        img: req.body.img,              // 文章图片显示
        contentMD: req.body.contentMD   //
    });
    newArticle.save().then(async (req) => {
        const data = await db.articleInfo.find();
        if (!_.isEmpty(req)) {
            res.send({
                code: 0,
                data
            })
        }
    })
});

// 获取分类文章
router.post('/api/article/getArticle', async (req, res) => {
    const articleArr = await util.getArticle(req.body.id);
    if (_.isEmpty(articleArr)) {
        res.send({
            code: 1,
            data: [],
        })
    } else {
        res.send({
            code: 0,
            data: articleArr
        })
    }
});

// 获取指定文章详情
router.post('/api/article/details', async (req, res) => {
    const articleDetails = await db.articleInfo.findOne({id:req.body.id});
    if (_.isEmpty(articleDetails)) {
        res.send({
            code: 1,
            data: [],
        })
    } else {
        res.send({
            code: 0,
            data: articleDetails
        })
    }

});

// 文章删除
router.post('/api/article/deleteArticle', async (req, res) => {
    const data = await db.articleInfo.deleteOne({id: req.body.articleId});
    if (data.ok === 1) {
        const data = await util.getArticle(req.body.classId);
        res.send({
            code: 0,
            data
        })
    } else {
        res.send({
            code: 404,
            data: '删除失败!'
        })
    }
});

// 编辑文章
const updateArticle = async (req) => {
    const {id, abstract, title, img, content, contentMD, tags} = req.body;
    return await db.articleInfo.update({id}, {
        $set: {
            abstract,
            title,
            img,
            updateTime: moment().format('YYYY-MM-DD HH:mm'),
            content,
            contentMD,
            tags
        }
    });
};

// 更新文章（更新内容包含文章标题/更新时间/更新内容/文章图片/文章摘要）
router.post('/api/article/updateArticle', async (req, res) => {
    await updateArticle(req).then(async req => {
        if (req.ok === 1) {
            const data = await db.articleInfo.find();
            res.send({
                code: 0,
                data,
            })
        } else {
            res.send({
                code: 404,
                data: '编辑失败',
            })
        }
    })
});


module.exports = router;
