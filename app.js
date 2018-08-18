const Koa = require('koa');
const route = require('koa-route');
const app = new Koa();
const request = require('request-promise');
const fs = require('fs');
const http = require('http');

function downloadImage(url, ctx) {
  return new Promise((resolve, reject) => {
    const name = url.substring(url.lastIndexOf('/') + 1, url.length);
    fs.exists(`images/${name}`, function(exists) {
      if (exists) {
        ctx.response.body = `https://www.flowergo.xyz/images/${name}`;
        resolve();
      } else {
        http.get(url, function(response) {
          const file = fs.createWriteStream(`images/${name}`);
          response.pipe(file);
          ctx.response.body = `https://www.flowergo.xyz/images/${name}`;
          resolve();
        });
      }
    });
  })
};

const main = async ctx => {
  let path = ctx.request.url;
  if (path.startsWith('/download')) {
    await downloadImage(ctx.query.pic, ctx);
    return;
  }
  await new Promise((resolve, reject) => {
    request(`http://dili.bdatu.com/${path}`)
    .then(function (body) {
      ctx.response.body = body;
      resolve();
    });
  });
};

app.use(main);
app.listen(3000);