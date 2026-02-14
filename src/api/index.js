import tcb from "@cloudbase/node-sdk";

// 云函数环境使用 commonjs 引入方式
// const tcb = require('@cloudbase/node-sdk')

const app = tcb.init({
    env: "oncehuman-4gcx45zs07534b7a", // 替换为您的环境 ID
});