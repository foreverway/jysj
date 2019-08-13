<template>
    <div class="main">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">学习币明细</el-menu-item>
                <el-menu-item index="2">现金钱包明细</el-menu-item>
                  <el-menu-item index="3">福利钱包明细</el-menu-item>
            </el-menu>
    <router-view/>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

