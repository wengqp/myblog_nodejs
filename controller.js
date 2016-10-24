const fs = require('fs');
//这里require('koa-router')是函数
const router = require('koa-router')();

function controller(dir) {
    let 
        cdir = dir || '/controllers',
        files = fs.readdirSync(__dirname + cdir),
        js_files = files.filter((f) => {
            return f.endsWith('.js');
        }, files);
    for (let jf of js_files) {
        console.log(`process controller: ${jf}...`);
        let mapping = require(__dirname + cdir + '/' + jf);
        for (let url in mapping) {
            if (url.startsWith('GET ')) {
                var path = url.substring(4);
                router.get(path, mapping[url]);
                console.log(`register URL mapping: GET ${path}`);
            } else if (url.startsWith('POST ')) {
                var path = url.substring(5);
                router.post(path, mapping[url]);
                console.log(`register URL mapping: POST ${path}`);
            } else if (url.startsWith('PUT ')) {
                var path = url.substring(4);
                router.put(path, mapping[url]);
                console.log(`register URL mapping: PUT ${path}`);
            } else if (url.startsWith('DELETE ')) {
                var path = url.substring(7);
                router.del(path, mapping[url]);
                console.log(`register URL mapping: DELETE ${path}`);
            } else {
                console.log(`invalid URL: ${url}`);
            }
        }
    }
    return router.routes();
}

module.exports = controller;