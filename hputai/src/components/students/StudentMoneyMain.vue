<template>
  <div class="main">
    <el-container>
      <zx-head title="账户明细"></zx-head>
      
          
      <el-header>
      
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="学习币明细" name="1"></el-tab-pane>
          <el-tab-pane label="现金钱包明细" name="2"></el-tab-pane>
          <el-tab-pane label="福利钱包明细" name="3"></el-tab-pane>
        </el-tabs>
      </el-header>
      <el-container>
        <el-main>
          <router-view />
          <!-- 主体部分在这里显示 -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "1",
      activeIndex: "1",
      url:''
    };
  },
  created() {
    this.$nextTick(function() {
      this.$router.push("/StudentMoneyMain/VirtualMonney");
    });
  },
    mounted() {
    var name = this.$route.path.substring(this.$route.path.indexOf("/") + 1);
    this.url = name.substr(0, 12);
  },
  methods: {
    handleClick(tab, event) {
      switch (tab.name) {
        case "1":
          this.$router.push("/StudentMoneyMain/VirtualMonney");
          break;
        case "2":
          this.$router.push("/StudentMoneyMain/NewMoney");
          break;
        case "3":
          this.$router.push("/StudentMoneyMain/LearningMoney");
          break;
      }
    }
  }
};
</script>
<style  scoped>
.el-header {
  background-color: #fff;
}
</style>

