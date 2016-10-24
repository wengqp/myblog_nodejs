
module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('home.html', {
            title: '哈骑士的博客 - 「 勇士的渴望 」'
        });
    }
};