<template>
  <div>
    <!-- <button open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">授权登录</button>  -->
    <div v-if="isShowLoginWindow">
      <wocaonima @changeShow="fatherChange(arguments)"></wocaonima>
    </div>
    <!-- <div v-if="isShowLoginWindow"> -->
    <!-- <Loginwindow></Loginwindow> -->
    <!-- </div>  -->
    <!-- <button open-type="getUserInfo" lang="zh_CN" class="btn" @getuserinfo="login">授权登录</button> -->
  </div>
</template>
    

<script>
// import LoginWindow from '@/components/LoginWindow';
import wocaonima from "@/components/wocaonima";
import { showSuccess, showModel, post, get } from "@/util";

export default {
  components: {
    // LoginWindow,
    wocaonima
  },
  data() {
    return {
      mark: 0,
      userinfo: {},
      isShowLoginWindow: false
    };
  },
  methods: {
    async addMark(add) {
      try {
        const data = {
          openid: this.userinfo.openId,
          add: add
        };
        const res = await post("/weapp/createrecord", data);

        this.mark = this.mark + add;
      } catch (e) {
        showModel("请求失败", "可能是服务器端问题");
      }
    },
    fatherChange(argument) {
      this.isShowLoginWindow = argument[0];
      this.userinfo = argument[1];
      this.getCurrentMark();
    },
    async getCurrentMark() {
      try {
        const data = {
          openid: this.userinfo.openId
        };
        const res = await get("/weapp/getmark", data);
        console.log("从后端传来了mark", res.mark);
        this.mark = res.mark;
      } catch (e) {
        showModel("刷新分数失败", "请重试");
        console.log("错误信息", e);
      }
    },
    async resetMark() {
      try {
        const data = {
          openid: this.userinfo.openId
        };

        const res = await post("/weapp/resetmark", data);
        console.log("从后端返回的信息res:", res);
        if (res) {
          this.mark = res.mark;
        }
      } catch (e) {
        showModel("操作失败", "可能是服务器的问题");
        console.log("清零错误：", e);
      }
    },
    reset() {
      let that = this;
      wx.showModal({
        content: "确定要清零吗",
        success: function(res) {
          if (res.confirm) {
            that.resetMark();
          }
        }
      });
    },
    async recall() {
      try {
        const data = {
          openid: this.userinfo.openId
        };
        const res = await post('/weapp/recall',data)
        console.log("从后端传来的res",res);
        this.mark = res.mark
        
      } catch (e) {
        showModel("撤销失败","可能是服务器的问题")
        console.log("撤销失败的错误信息",e);
        
      }

    }
  },
  mounted() {
    const userinfo = wx.getStorageSync("userinfo");

    if (userinfo.openId) {
      this.userinfo = userinfo;
      console.log("用户信息:", this.userinfo);
    } else {
      wx.hideTabBar();
      //  console.log(this.isShowLoginWindow);
      this.isShowLoginWindow = true;
      console.log(this.isShowLoginWindow);
    }
  },
  onShow() {
    this.getCurrentMark();
  },
  onPullDownRefresh() {
    console.log("我正在下拉刷新");
    this.getCurrentMark();
    wx.stopPullDownRefresh();
  },
  onShareAppMessage() {
    return {
      title: "自律首页",
      path: "/pages/index/main"
    };
  }
};
</script>


<style lang='scss'>
.show {
  text-align: center;
  height: 266px;
  background: #ea5149;
  margin-bottom: 5px;
  color: #ffffff;
  font-weight: bold;
  .mark-text {
    font-size: 20px;
    padding: 28px;
  }
  .mark {
    font-size: 88px;
  }
  .button {
    margin: 0 10px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    background: #ea5149;
    .btn0 {
      width: 60px;
      border-radius: 15px;
      border: 1px dashed #feb600;
    }
    .btn1 {
      width: 60px;
      border-radius: 15px;
      border: 1px dashed #feb600;
    }
  }
}
.row {
  margin: 40px 56px;
  .button {
    width: 70px;
    height: 70px;
    line-height: 70px;
    border-radius: 20%;
    border: none;
    text-align: center;
    font-size: 25px;
    color: #ffffff;
    font-weight: bold;
  }
}
.right {
  background: #ea5149;
  float: right;
}
.left {
  background: #feb600;
  margin-right: 80px;
}

// 自定义组件

.modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  overflow: hidden;
  z-index: 9000;
  color: #fff;
}
.modal-dialog {
  box-sizing: border-box;
  width: 560rpx;
  overflow: hidden;
  position: fixed;
  top: 30%;
  left: 0;
  z-index: 9999;
  background: #fff;
  margin: -150rpx 95rpx;
  border-radius: 16rpx;
}
.modal-content {
  box-sizing: border-box;
  display: flex;
  padding: 0rpx 53rpx 50rpx 53rpx;
  font-size: 32rpx;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.content-tip {
  text-align: center;
  font-size: 36rpx;
  color: #333333;
}
.content-text {
  height: 130px;
  padding: 10px 0px 50px 0px;
  font-size: 14px;
}
.modal-footer {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  border-top: 1px solid #e5e5e5;
  font-size: 16px;
  font-weight: bold;
  height: 45px;
  line-height: 45px;
  text-align: center;
  background: #feb600;
}
button {
  width: 100%;
  background: #feb600;
  color: #ffffff;
  font-weight: bold;
}
.img {
  width: 280px;
  height: 90px;
}
.little-tip {
  padding-top: 15px;
  padding-bottom: 3px;
  font-size: 14px;
  font-weight: bold;
  color: #feb600;
}
.little-content {
  padding-top: 5px;
  font-size: 13px;
  color: #606060;
}
.key-bold {
  padding-top: 5px;
  font-size: 14px;
  font-weight: bold;
}
</style>

