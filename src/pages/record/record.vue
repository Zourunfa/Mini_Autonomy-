<template>
  <div>
    <div v-if="show_record">
      <div class="prompt">目前还没有记录</div>
    </div>
    <div v-else>
      <div class="table th" id="table">
        <div class="likeli">时间</div>
        <div class="likeli">分数</div>
        <div class="likeli">最后得分</div>
        <div class="likeli">备注</div>
      </div>

      <recordList v-for="(record,index) in records" :key="index" :record='record'></recordList>

    </div>
  </div>
</template>

<script>
import { get } from "@/util"
import recordList from "@/components/recordList"
export default {
  components:{
    recordList
  },
  data() {
    return {
      userinfo: {},
      show_record: false,
      records: []
    };
  },
  methods: {
    async getRecords() {
      wx.showToast({
        title: "加载中",
        icon: "loading"
      });



      try {
        const res = await get("/weapp/getrecords", {
          openid: this.userinfo.openId
        });

        console.log("从后端传过来的信息：" + res);
        this.records = res.records;
        console.log(this.records);
        
        if (this.records.length === 0) {
          this.show_record = true;
        }
        this.show_record = false;
        wx.hideToast();
      } catch (error) {
        console.log("错误信息：" + error);
        wx.hideToast();
      }
    }
  },
  onShow() {
    console.log("子组件：",recordList);
    
    const userinfo = wx.getStorageSync("userinfo");
    if (userinfo.openId) {
      this.userinfo = userinfo;
      console.log("用户信息：" + this.userinfo);
    }

    this.getRecords();
  },
  onShareAppMessage() {
    return {
      title: "自律首页",
      path: "/pages/index/main"
    };
  }
};
</script>

<style lang="scss" scoped>
.add {
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  p {
    font-size: 15px;
  }
}
.th {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background: #ea5149;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  display: flex;
}
.prompt {
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 14px;
  color: #888888;
  text-align: center;
}

#table {
  display: flex;
}

.likeli {
  width: 25%;
  text-align: center;
}

.text-footer {
  text-align: center;
  font-size: 12px;
  margin-bottom: 5px;
  padding-top: 5px;
}
</style>
