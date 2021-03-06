// 用户相关接口
const express = require("express");
const router = express.Router();
const db = require("../db");
const util = require('../util');
const _ = require('lodash');

// 注册接口
router.post("/api/user/register", (req, res) => {
    db.userInfo.findOne({
            email: req.body.email
        },
        (err, data) => {
            if (data) {
                res.send({
                    code: 404,
                    data: "账号已被注册!"
                })
            } else {
                const newUser = new db.userInfo({
                    name: req.body.name,
                    password: req.body.password,
                    email: req.body.email,
                });
                newUser.save(function (err) {
                    if (!err) {
                        res.send({
                            code: 0,
                            data: "账号注册成功!"
                        })
                    } else {
                        res.send({
                            code: 404,
                            data: "账号注册失败!"
                        })
                    }
                })
            }
        }
    )
});

// 登录接口
router.post("/api/user/login", (req, res) => {
    db.userInfo.findOne({
            email: req.body.email
        },
        (err, data) => {
            if (data) {
                if (data.password === req.body.password) {
                    res.cookie("email", util.CodeCookie(data.email), {
                        //有效期，单位是秒
                        maxAge: 1000 * 24 * 60 * 60
                    });
                    res.send({
                        code: 0,
                        data: "登录成功!"
                    })
                } else {
                    res.send({
                        code: 404,
                        data: "密码错误!"
                    })
                }
            } else {
                res.send({
                    code: 404,
                    data: "账号未注册,请注册!"
                })
            }
        }
    )
});

router.get('/api/user/info',async (req,res) => {
    const data = await db.userInfo.findOne({email: req.query.cookie});
    if(_.size(data) !== 0){
        res.send({
            code:0,
            data
        })
    }else{
        res.send({
            code:404,
            data:'获取用户信息失败'
        })
    }
});

module.exports = router;
