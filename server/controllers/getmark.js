const {mysql} = require('../qcloud')

module.exports = async (ctx) =>{
   
    try {
        const {openid} = ctx.request.query
        const res = await mysql('records').where('openid',openid).select('mark').orderBy('id','desc').first()

        // const res = await mysql('records')
        // .where("openid",openid)
        // .orderBy('id','desc').first()
        
        console.log("查询数据返回信息",res);
        console.log(typeof res);
        
        let mark = 0 ;
        if(res){
            mark =res.mark
        }
        
        console.log("当前分数",mark);
        
    
        ctx.state.data ={
            code:0,
            msg:"success",
            mark:mark
        }
        console.log("执行成功");
        
    } catch (e) {
        
        ctx.state.data = {
            code:-1,
            msg:"fail"
        }
        console.log("执行失败",e);
        
    }
    

}