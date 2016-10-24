module.exports = {
    'GET /about': async (ctx, next) => {
        ctx.render('about.html', {
            title: '关于哈骑士'
        });
    }
};