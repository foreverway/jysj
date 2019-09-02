<template>
    <div class="main">

                    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="学习币明细" name="1"></el-tab-pane>
    <el-tab-pane label="现金钱包明细" name="2"></el-tab-pane>
 <el-tab-pane label="福利钱包明细" name="3"></el-tab-pane>
  </el-tabs>
    <router-view :activeIndex="activeName" />
    </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: '1',
  
      };
    },
    methods: {
      handleClick(tab, event) {
        //console.log(key, keyPath);
      }
    }
  }
</script>

