export default function handler(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const name = url.pathname.split('/').pop();
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify({ name }));
}


