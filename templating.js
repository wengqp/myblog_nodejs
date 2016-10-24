const nunjucks = require('nunjucks');

function templating(path, opts) {
    //nunjucks的opts属性设置默认值（非缓冲、更新html、自动转义、非定义等抛出异常），加载filters（如果有）
    var 
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        autoescape = opts.autoescape && true,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (let f in opts.filters) {
            env.addFilters(f, opts.filters[f]);
        }
    }
    return async (ctx, next) => {
        //render函数:ctx.response
        ctx.render = function (view, model) {
            ctx.response.type = 'text/html';
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
        };
        await next();
    };
}

module.exports = templating;