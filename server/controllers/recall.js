const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {openid} = ctx.request.body
  try{
    const res = await mysql('records')
        .where("openid",openid)
        .orderBy('id','desc').first()
    if(res){
      await mysql('records')
        .where("id",res.id).del()
      //得到撤销后，最后一条记录的当前分数
      const re_res = await mysql('records')
          .where("openid",openid)
          .orderBy('id','desc').first()
      if(re_res){
        var mark = re_res.mark
      }else{
        var mark = 0
      }
    }else{
      var mark = 0
    }
    // 执行成功返回的数据，将删除的这条记录的add值也传回到前端
    ctx.state.data = {
      code: 0,
      mark:mark,
      msg: 'success'
    }
    console.log("执行成功")
  }catch(e){
    console.log("执行错误:",e)
    // 执行失败返回的数据
    ctx.state = {
      code: -1,
      data: {
        msg: '撤销失败' + e.sqlMessage
      }
    }
  }
}
