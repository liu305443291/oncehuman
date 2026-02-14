import tcb from "@cloudbase/node-sdk";

// 云函数环境使用 commonjs 引入方式
// const tcb = require('@cloudbase/node-sdk')

const app = tcb.init({
    env: "http://192.168.10.37:9527/", // 替换为您的环境 ID
});