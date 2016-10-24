const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const isProduction = process.env.Node_ENV === 'production';
const templating = require('./templating.js');
const controller = require('./controller.js');
const rest = require('./rest');

const app = new Koa();

//记录耗时
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);    
});

//处理static files：css/js
if (!isProduction) {
    let staticFiles = require('./static-files.js');
    app.use(staticFiles('/static'));
}

//处理post request
app.use(bodyParser());

//处理views: text/html response
//前端引擎nunjucks: ctx.render = env.render
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

//
app.use(rest.restify());

//router:加载controllers的.js文件
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');