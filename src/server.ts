import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import path from 'path';

// 定义请求体的类型，增强类型安全
interface PostData {
  name: string;
  age: number;
}

const app = new Koa();
const router = new Router();
const PORT: number = 5000;

// --- 中间件注册 ---

// 1. koa-bodyparser
// 使用 <Koa.DefaultState, Koa.DefaultContext> 确保与 Koa 实例类型兼容
app.use(bodyParser());

// 2. koa-static：处理静态文件
// __dirname 在 TS 编译后指向正确的目录
app.use(serve(path.join(__dirname, '..', 'public'))); 


// --- 路由定义 ---

// GET 请求路由
router.get('/', async (ctx: Koa.Context) => {
  ctx.body = {
    message: 'Hello Koa TS Demo! Try POST to /submit or access /test.html',
    timestamp: new Date().toISOString()
  };
});

// POST 请求路由：使用类型断言 (as PostData) 来保证请求体类型安全
router.post('/submit', async (ctx: Koa.Context) => {
  // 使用类型断言将 body 视为我们定义的 PostData 类型，
  // 确保访问 .name 和 .age 时有类型提示和检查
  const receivedData = ctx.request.body as PostData; 
  console.log('Received POST Data:', receivedData);
  // 类型检查：确保 name 存在且是字符串
  if (!receivedData || typeof receivedData.name !== 'string') {
    ctx.status = 400; 
    ctx.body = { error: 'Missing or invalid name in request body' };
    return;
  }
  ctx.body = {
    status: 'success',
    message: `Received data for user: ${receivedData.name}`,
    data: receivedData
  };
});

// 3. 注册路由
app.use(router.routes()).use(router.allowedMethods());


// 4. 启动服务器
app.listen(PORT, () => {
  console.log(`✅ TypeScript Koa server running on http://localhost:${PORT}`);
});