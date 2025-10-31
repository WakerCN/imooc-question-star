import Koa from 'koa';
import Router from 'koa-router';
import mockList from './mock/index.js';

const app = new Koa();
const router = new Router();

async function getResDelay(fn, ctx, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = fn(ctx);
      resolve(res);
    }, delay);
  });
}

mockList.forEach((route) => {
  const { url, method, response, delay = 0 } = route;
  router[method](url, async (ctx) => {
    const res = await getResDelay(response, ctx, delay);
    ctx.body = res;
  });
});

app.use(router.routes());

export default app.callback();
