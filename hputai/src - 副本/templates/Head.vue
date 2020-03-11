<template>
  <div class="head" :style="{'minWidth':minWidth?minWidth:'1100px'}">
    <!-- <img v-if="linkTo" class="return-btn fl" src="../../images/return.png" alt="返回按钮" @click="goBack"> -->
   
    <div class="fl"> <span ></span><i :class="addShow" alt="返回按钮"></i><span >{{title}}</span></div>
    <div class="contents fr">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "zxhead",
  props: ["title", "linkTo", "minWidth",'addShow'],
  //通过props传值 可以自定义标题 宽度 图标  是否显示跳转图标
  data: function() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.push({
        path: this.linkTo,
        query: this.curPage
      });
    }
  }
};
</script>
<style scoped>
    .head{
        font-size: 22px;
        font-weight: 500;
          margin: 10px 0;

    }
    .f1{
        height: 23px;
    }
    .fl span:nth-child(1){
        width: 6px;
        height: 23px;
        margin:4px 5px 0 5px;
        float: left;
        background-color: #FF4A16;
    }
        .fl span:nth-child(2){
             height: 23px;
            line-height: 23px;
             float: left;
    }
</style>