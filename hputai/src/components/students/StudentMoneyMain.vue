<template>
    <div class="main">

   <el-container>
     <div class="head_word">学生账户明细</div>
<el-header>
  
        <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="学习币明细" name="1"></el-tab-pane>
    <el-tab-pane label="现金钱包明细" name="2" ></el-tab-pane>
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
        activeName: '1',
          activeIndex: '1',
      };
    },
    created(){
      this.$nextTick(function(){
    this.$router.push('/VirtualMonney')
      })
    },
    methods: {
   
      handleClick(tab, event) {
        switch(tab.name){
          case "1":
              this.$router.push('/VirtualMonney')
        
            break;
             case "2":
              this.$router.push('/NewMoney')
            break;
             case "3":
                  this.$router.push('/LearningMoney')
            break;
        }
      }
    }
  }
</script>
<style  scoped>
.head_word {
  font-size: 26px;
  margin:15px 0 15px 20px;
  font-weight: 700;
}
</style>

