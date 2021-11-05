const http = require('http');
const parser = require('./parser');

const server = http.createServer(async (req, res) => {
  try {
    const originalPath = req.url.replace('/?path=', '');
    const path = decodeURIComponent(originalPath);
    if (!path || !path.includes('.dxf')) return res.end('400');
    const dxf = await parser(path);
    res.end(JSON.stringify(dxf));
  } catch (e) {
    console.error(e);
    res.end(e);
  }
});

server.listen(19104, () => {
  console.log('服务已开启');
});
