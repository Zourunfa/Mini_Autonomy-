const {mysql} = require('../qcloud')


module.exports = async (ctx)=>{
    const {id,note} = ctx.request.body
    

    try {
        const  res = await mysql('records').where('id',id).update('note',note)
        ctx.state.data = {
            code:0,
            msg:'success'
        }
        console.log(res);
        
    } catch (error) {
        ctx.state ={
            code:-1,
            data:{
                msg:'失败'+e.sqlMessage
            }
        }
        
    }
}