<template>
  <div>
    <div class="top">
      <div class="userinfo">
        <!-- 取userinfo变量中的avatarUrl字段，也就是微信头像的链接 -->
        <img :src="userinfo.avatarUrl" alt />
      </div>
      <div class="name">
        <!-- 取userinfo变量中的nickName字段，也就是微信昵称 -->
        <label>{{userinfo.nickName}}</label>
        <p class="notice">{{quote}}</p>
      </div>
    </div>

    <div class="contain">
      <div class="row" @click="operateTo()">
        <label class="left">
          <!-- <img class="img" src="/static/images/homework.png"> -->
        </label>
        <label class="name">&nbsp;&nbsp;操作指引</label>
        <label class="right">></label>
      </div>
      <div class="row">
        <label class="left">
          <!-- <img class="img" src="/static/images/classroom.png"> -->
        </label>
        <label class="name">&nbsp;&nbsp;小程序开发实战课程</label>
        <label class="right">></label>
      </div>
    </div>

    <div class="contain">
      <div class="row">
        <label class="left">
          <!-- <img class="img" src="/static/images/delete.png"> -->
        </label>
        <label class="name">&nbsp;&nbsp;清空记录</label>
        <label class="right">></label>
      </div>
      <div class="row" @click="showOpinion()">
        <label class="left">
          <!-- <img class="img" src="/static/images/approval.png"> -->
        </label>
        <label class="name">&nbsp;&nbsp;意见反馈</label>
        <label class="right">></label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 用户信息
      userinfo: {},
      quote: ""
    };
  },
  methods: {
    randomQuote() {
      let quotes = [];
      //将10个励志语句放到数组中
      quotes[1] = "不奋发，则心日颓靡；不检束，则心日恣肆";
      quotes[2] = "自制是一种秩序，一种对于快乐与欲望的控制";
      quotes[3] = "哪怕一点小小的克制，也会使人变得强而有力";
      quotes[4] = "做一个自律的人，像优秀的人学习，然后做好自己";
      quotes[5] = "真正的自由是在所有时候都能控制自己";
      quotes[6] = "每天爱自己多一点！！！";
      quotes[7] = "如果连自己都不能控制，有什么资格去谈自己想要的";
      quotes[8] = "登峰造极的成就源于自律";
      quotes[9] = "自我控制是最强者的本能";
      quotes[0] = "立志言为本，修身行乃先";

      let digit =  parseInt(Math.random()*10);

      this.quote = quotes[digit]

      console.log(digit);
      
    },
    showOpinion(){
      wx.navigateTo({
        url:'/pages/opinion/main'
  
      })
     
    },
    operateTo(){
       wx.navigateTo({
        url:"/pages/instruction/main"
      })
    }
  },

  onShow() {
    const userinfo = wx.getStorageSync("userinfo");
    if (userinfo.openId) {
      this.userinfo = userinfo;
    }
    this.randomQuote();
  }
};
</script>


<style lang='scss'>
.contain {
  margin-top: 10px;
  background: #ffffff;
  font-size: 15px;
  .row {
    padding: 0px 18px;
    border-bottom: 1px #e8e8e8 solid;
    height: 55px;
    line-height: 55px;
    .img {
      float: left;
      width: 20px;
      height: 20px;
      padding-top: 16px;
    }
    .name {
      float: left;
    }
  }
  .right {
    float: right;
    color: #c8c8c8;
    line-height: 55px;
  }
  .left {
    width: 80%;
  }
}

.top {
  height: 80px;
  width: 100%;
  background: #ea5149;
  padding-top: 30px;
  display: block;
  .userinfo {
    padding-bottom: 5px;
    float: left;
    img {
      width: 120rpx;
      height: 120rpx;
      margin: 10rpx;
      border-radius: 1px;
      border: 1px #d0d0d0 solid;
    }
  }
  .name {
    padding-top: 30px;
    padding-left: 5px;
    color: #ffffff;
    font-size: 16px;
    float: left;
    .underline {
      border: 1px solid #ffffff;
      border-radius: 5px;
      text-align: center;
    }
    .notice {
      color: #d8d8d8;
      font-size: 12px;
    }
    .a-line {
      background: #ea5149;
      border: none;
      display: inline;
      font-size: 16px;
      color: #ffffff;
      text-decoration: underline;
    }
  }
}
</style>