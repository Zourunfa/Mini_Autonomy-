const {mysql} = require('../qcloud')

module.exports = async (ctx) =>{
    const {openid} = ctx.request.body

    try {
        let add = 0
        let mark = 0
        let note = "清零"
        //往数据表records中添加一条新的记录，mark字段为0，add为0，note备注为"清零"
        await mysql('records').insert({
          openid, add, mark, note
        })

    
        ctx.state.data = {
            code:0,
            msg:"success",
            mark:0
        }

    } catch (e) {
        ctx.state.data = {
            code:0,
            data:"错误信息："+e
        }
    }
    
}