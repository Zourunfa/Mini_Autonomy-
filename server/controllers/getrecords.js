const {mysql} = require('../qcloud')

module.exports = async (ctx) =>{
   
    const {openid} = ctx.request.query
    try {
        const records  = await mysql("records").where('openid',openid).orderBy("id", "desc")
        ctx.state.data ={
            records
        }

    } catch (error) {
        ctx.state = {
            code: -1,
            data:{
                msg:"获取失败"+error.sqlMessage 
            }
        }
    }
        


}