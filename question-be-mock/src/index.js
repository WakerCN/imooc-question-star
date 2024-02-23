const Koa = require("koa");
const mockList = require("./mock");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

async function getResDelay(fn, ctx) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = fn(ctx);
      resolve(res);
    }, 1000);
  });
}

/* 注册 mock 路由
=========================================== */
mockList.forEach((route) => {
  const { url, method, response } = route;

  router[method](url, async (ctx) => {
    const res = await getResDelay(response, ctx);
    // 输出结果
    ctx.body = res;
  });
});

app.use(router.routes());
app.listen(3000);
