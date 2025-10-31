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

const handler = app.callback();

export default function vercelHandler(req, res) {
  // 将 /api/server?path=user/login&foo=bar 转换为 /api/user/login?foo=bar
  const u = new URL(req.url, 'http://localhost');
  const pathParam = u.searchParams.get('path') || '';
  const newSearch = new URLSearchParams(u.searchParams);
  newSearch.delete('path');
  const queryString = newSearch.toString();
  const newPath = `/api/${pathParam}${queryString ? `?${queryString}` : ''}`;
  req.url = newPath;
  return handler(req, res);
}
