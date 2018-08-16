const Koa = require('koa');
const route = require('koa-route');
const app = new Koa();
var request = require('request-promise');

const main = async ctx => {
  let url = ctx.request.url
  await new Promise((resolve, reject) => {
    request(`http://dili.bdatu.com/${ctx.request.url}`)
    .then(function (body) {
      ctx.response.body = body;
      resolve();
    });
  });
};

app.use(main);
app.listen(3000);