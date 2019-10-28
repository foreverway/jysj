<template>
  <div class="main">
    <!-- 设置充值链接 -->

        <zx-head title="充值链接" ></zx-head>
    <el-input style="width:200px" v-model="money" placeholder="请输入充值金额"></el-input>
    <el-button type="primary" v-show="money>0" @click="copyUrl">生成并复制充值链接</el-button>
    <!-- <zx-button type="primary">ddd</zx-button> -->
   <!-- // <div style="display:none" cols="20" id="biao1">{{copyurl1}}</div> -->
  </div>
</template> 

<script>
import studens_url from "../../config/config";
import Input from '../../templates/Input.vue'
import zxbutton from '../../templates/Button/button'
export default {
  data() {
    return {
      money: "",
  inputvalue:''
    };
  },
     components: {
      'zx-input':Input  ,
      'zx-button':zxbutton
    },
  methods: {
   selectFunc(value) {
        this.selectValue2 = value
        console.log(this.selectValue)
        console.log(this.selectValue2)
      },
    // 复制链接
    copyUrl() {
      let url = studens_url.student_url + "login/1/" + this.money;
      let oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value);
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        message: url + "已成功复制到剪切板",
        type: "success"
      });
      this.money = "";
      oInput.remove();
    }
  }
};
</script>

