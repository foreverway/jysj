<template>
    <div class="main ">
            <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">待上课表</el-menu-item>
                <el-menu-item index="2">已上课表</el-menu-item>
            </el-menu> -->
             <zx-head title="学生课表" ></zx-head>
              <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="待上课表" name="1"></el-tab-pane>
    <el-tab-pane label="已上课表" name="2"></el-tab-pane>

  </el-tabs>
    <router-view :changeTab.sync='activeName' ></router-view> 
    <!-- 显示子组件studencClass -->
    </div>
</template>
<script>
  export default {
    data() {
      return {
        // activeIndex: '1',
        // index:"1"
        activeName: '1'
      };
    },
    updated(){
  
    },
    methods: {
      // handleSelect(key, keyPath) {
      //   if(key==1){
      //     this.index=1
      //   }else{
      //     this.index=2
      //   }
      //   console.log(key, keyPath);
      // }
           handleClick(tab, event) {
        // console.log(tab, event);
      }
    }
  }
</script>
<style>
  .el-calendar-table .el-calendar-day {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 8px;
  height: 35px !important;
}

</style>

