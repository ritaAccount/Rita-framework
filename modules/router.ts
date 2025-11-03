import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx: Koa.Context) => {
    ctx.body = {
      message: 'Hello Koa TS Demo! Try POST to /submit or access /test.html',
      timestamp: new Date().toISOString()
    };
});
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
export default router;