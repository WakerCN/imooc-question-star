export default function handler(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const segments = url.pathname.split('/').slice(3); // ['', 'api', 'catch', ...]
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify({ segments }));
}


