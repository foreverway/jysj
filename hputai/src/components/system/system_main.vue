<template>
    <div class="main">
        <!-- <zx-head title="系统配置" ></zx-head> -->

            <el-menu router :default-active="activeIndex"
             class="el-menu-demo"
              mode="horizontal"
             
               @select="handleSelect">
                <el-menu-item index="/SystemMain">系统设置</el-menu-item>
                <el-menu-item index="/SystemMain/SysSms">短信设置</el-menu-item>
             
              <el-menu-item index="/SystemMain/RoleList">角色设置</el-menu-item> 
                   <el-menu-item index="/SystemMain/LiveList">直播设置</el-menu-item>
                    <!-- <el-menu-item index="6">其他设置</el-menu-item> -->
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
     // this.activeIndex="/SystemMain/SystemMain"
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

</style>


