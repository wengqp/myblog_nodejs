var now = new Date();
//时间戳/1000
var nowTime = now.getTime()/1000;

let 
    summary = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    blogs = [
        {id: '1', name: 'Test Blog', summary: summary, created_at: datetimeFilter(nowTime-120)},
        {id: '2', name: 'Something New', summary: summary, created_at: datetimeFilter(nowTime-3701)},
        {id: '3', name: 'Learn Swift', summary: summary, created_at: datetimeFilter(nowTime-87400)},
        {id: '4', name: 'Learn Swift', summary: summary, created_at: datetimeFilter(nowTime-605800)},
        {id: '5', name: 'Learn Swift', summary: summary, created_at: datetimeFilter(nowTime-704800)},
        {id: '6', name: 'Learn Swift', summary: summary, created_at: datetimeFilter(nowTime-804800)}
    ],
    page = {
        "has_next": true,
        "page_index": 1,
        "page_count": 2,
        "has_previous": false,
        "item_count": 8
    };


function datetimeFilter(t) {
    let delta = nowTime - t;
    if (delta < 60) {
        return '1分钟前';
    } else if (delta < 3600) {
        return `${ Math.round(delta/60) }分钟前`;
    } else if (delta < 86400) {
        return `${ Math.round(delta/3600) }小时前`;
    } else if (delta < 604800) {
        return `${ Math.round(delta/86400) }天前`;
    } else {
        return `${ new Date(t*1000).toLocaleDateString() }`.replace(/-/, '年').replace(/-/, '月') + '日';
    }
}
function getBlogs() {
    return async(ctx, next) => {

    };
}


module.exports = {
    'GET /api/blog': async (ctx, next) => {
        ctx.rest({
            blogs: blogs,
            page: page          
        })
    }
}