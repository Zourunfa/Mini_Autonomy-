<template>
  <div>
    <div class="contain">
      <div class="row">
        <label class="name">意见与反馈</label>
      </div>
      <div class="row text">
        <div>
          <textarea
            v-model="opinion"
            class="input"
            maxlength="200"
            placeholder="点击这里填写你的建议、问题反馈、合作等信息，我会认真对待每一条信息~"
          ></textarea>
          <!-- word_count用来保存实时输入字数的长度 -->
          <label class="word-count">{{word_count}}/200</label>
        </div>
      </div>
      <div class="row">
        <div>
          <label class="name">相关截图（选填）</label>
          <label class="img-count">{{img_count}}/2</label>
        </div>
        <!-- v-for是vue的语法，循环语句，循环显示当前上传的照片 -->
        <label v-for="(item, index) in src" :key="index">
          <img class="img" :src="item" />
        </label>
        <!-- v-if是判断语句，判断当前照片数量如果小于2张，就显示添加照片的按钮；反之就不显示了在这里添加点击事件，点击按钮调用uploadPicture方法上传照片 -->
        <label v-if="img_count < 2" @click="uploadPicture">
          <img class="add-img" :src="addimage" />
        </label>
      </div>
      <div class="row">
        <div class="name">微信号（选填）</div>
        <input
          v-model="wechat"
          class="wechat-input"
          maxlength="20"
          placeholder="如果想要详细交流，可以点击这里留下微信号哦~"
        />
      </div>
    </div>
    <button @click="submit()">提交</button>
  </div>
</template>

<script>
import { showModel, post } from "@/util";
export default {
  data() {
    return {
      opinion: "",
      word_count: 0,
      addimage: "../../static/images/addimage.png",
      img_count: 0,
      src: [],
      wechat: "",
      userinfo: wx.getStorageSync("userinfo")
        ? wx.getStorageSync("userinfo")
        : {}
    };
  },
  watch: {
    opinion() {
      this.word_count = this.opinion.length;
    },
    src() {
      this.img_count = this.src.length;
    }
  },
  methods: {
    uploadPicture() {
      //将this保存到that上面
      let that = this;
      wx.chooseImage({
        count: 2,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;
          //用that.src来调用data函数定义的src变量
          that.src.push(tempFilePaths);
          console.log("that.src", that.src);
        }
      });
    },
    async submit() {
      if (this.word_count > 0) {
         const data = {
	          opinion: this.opinion,
	          src: this.src.join(','),
	          wechat: this.wechat,
	          openid: wx.getStorageSync('userinfo').openId
	        }

        try {
          const res = await post('/weapp/createopinion', data);
          console.log("从后端返回的提交成功的信息", res);

          showModel("提交成功", "已经将信息发送给了阿锋");
        } catch (error) {
          console.log(error);
          showModel("提交失败", error);
        }
      } 
      else {
        showModel("提交失败", "反馈信息不能为空");
        console.log(4);
      }
    }
  }
};
</script>

<style lang="scss">
.contain {
  background: #ffffff;
  font-size: 15px;
  .text {
    height: 110px;
  }
  .row {
    border-bottom: 1px #e8e8e8 solid;
    padding: 5px 15px;
    .name {
      width: 80%;
      height: 40px;
      line-height: 40px;
    }
    .input {
      width: 100%;
      height: 85px;
      font-size: 14px;
      padding-top: 5px;
    }
    .word-count {
      float: right;
      color: #808080;
    }
    .img-count {
      float: right;
      line-height: 40px;
      color: #808080;
    }
    .add-img {
      width: 80px;
      height: 80px;
    }
    .img {
      width: 66px;
      height: 66px;
      margin-bottom: 7px;
      margin-right: 10px;
    }
    .wechat-input {
      font-size: 14px;
    }
  }
}
button {
  margin: 20px auto;
  width: 90%;
  border-radius: 5px;
  background: #ea5149;
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
}
</style>
