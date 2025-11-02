// app.js

const Koa = require('koa');
const app = new Koa();

// 使用 async/await 语法的中间件
app.use(async (ctx) => {
  ctx.body = 'Hello Koa2!';
});

// 监听端口
app.listen(3000, () => {
  console.log('Koa server is running at http://localhost:3000');
});