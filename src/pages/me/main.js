//加载vue组件和me.vue文件
import Vue from 'vue'
import App from './me'

//新建一个me页面的Vue实例
const app = new Vue(App)
//挂载Vue实例，让me页面显示出来
app.$mount()