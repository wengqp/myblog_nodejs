const fs = require('mz/fs');
const path = require('path');
const mime = require('mime');

//判断是否以指定目录开头（不是则继续下个middleware），再判断完整路径是否存在（不存在404状态），最后赋值到ctx.response
//mz的fs有异步
function staticFiles(dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        if (rpath.startsWith(dir)) {
            let fp = path.join(__dirname, rpath);
            if (await fs.exists(fp)) {
                ctx.response.type = mime.lookup(fp);
                ctx.response.body = await fs.readFile(fp);
            } else {
                ctx.response.status = 404;
            }
        } else {
            await next();
        }
    };
}

module.exports = staticFiles;