<template>
    <div class="main">
         <!-- <div class="head_word">系统配置</div> -->

            <el-menu router :default-active="activeIndex"
             class="el-menu-demo"
              mode="horizontal"
             
               @select="handleSelect">
                <el-menu-item index="/SystemMain">系统设置</el-menu-item>
                <el-menu-item index="/SysSms">短信设置</el-menu-item>
             
              <el-menu-item index="/RoleList">角色设置</el-menu-item> 
                   <el-menu-item index="/LiveList">直播设置</el-menu-item>
                    <el-menu-item index="6">其他设置</el-menu-item>
            </el-menu>
    <router-view/>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: this.$route.path,
      };
    },
    created () {
      console.log(this.$route.path)
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped>
.el-menu-demo{
    margin-bottom: 20px;
}
.head_word {
  font-size: 26px;
  margin:10px 0;
  font-weight: 700;
}
</style>


