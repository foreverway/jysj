<template>
  <div class="main">
    <el-container>
      <el-header>
        <div class="header">
          <img src="../assets/logo.png" height="50" alt style="padding:5px;float:left;" />
          <div class="users">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <img src="../assets/touxiang.png" alt class="touxiang" />
                <span>{{admin_name}}</span>
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="clearfix">设置</el-dropdown-item>
                <el-dropdown-item class="clearfix">
                  <span @click="delCookie('usertoken')">退出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="202px">
          <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
              <el-radio-button :label="false">展开</el-radio-button>
              <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group> -->
          <el-menu
            :default-active="ActiveMenu"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            unique-opened
            router
            background-color="#ffffff"
            text-color="#000"
            active-text-color="#fff"
          >
            <el-menu-item index="/" style="background-color:#ddd;color:#e6563a; border:none;">
              <i class="el-icon-s-home" style="color:#e6563a; border:none;"></i>
              <span slot="title" >首页</span>
            </el-menu-item>
            <span v-for="(item,index) in rolemenu" :key="index">
              <!-- 刷新出首层名字 -->
              <el-submenu index="index" link="item.menu_url">
                <template slot="title">
                  <i :class="item.menu_icon"></i>
                  <span slot="title">{{item.menu_name}}</span>
                </template>
                <span v-for="(items,index1) in item.children" :key="index1">
                  <el-menu-item :index="items.menu_url" route>
                    <!-- <span slot="title">分组一</span> -->
                    <!-- <div > -->
                    <!-- 刷新出每一个首层每一个子级 -->

                    <template slot="title">
                      <i :class="items.menu_icon"></i>
                      <span slot="title">{{items.menu_name}}</span>
                    </template>
                  </el-menu-item>
                </span>
              </el-submenu>
            </span>
          </el-menu>
        </el-aside>

        <el-container>
          <el-main>
            <router-view />
            <!-- 主体部分在这里显示 -->
          </el-main>
          <el-footer>
            <!-- <p class="banquan">精英世家</p> -->
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>




<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      isCollapse: true,
      ActiveMenu: this.$route.path,
      //  rolemenu:'',  菜单列表
      admin_name: ""
    };
  },
  created() {
     let params = {
      admin_id: this.getdataCookie("admin_id")
    };
      this.get_banzhuren_list({
      //获取班主任列表
      url: "/api/api_banzhuren_list",
    });
    this.get_mune_list({
      url: "/api/api_menu_list",
    });
    this.get_live_list({
      //获取直播列表
      url: "/api/api_live_list",
    });
    this.get_teacher_data({
      //获取讲师列表
      url: "/api/api_teacher_data",
    });
    this.get_zhujiao_data({
      //获取助教列表
      url: "/api/api_zhujiao_data",
    });
    this.get_jiaowu_data({
      //获取教务专员列表
      url: "/api/api_jiaowu_data",
    });


  },
  computed:
        mapState(["banzhuren_list","rolemenu","live_list",
      "teacher_data",
      "zhujiao_data",
      "jiaowu_data",
      "region_list",
      ]),
 
  methods: {
    ...mapActions(["get_mune_list" ,"get_banzhuren_list",
      "get_live_list",
      "get_region_list",
      "get_teacher_data",
      "get_zhujiao_data",
      "get_jiaowu_data"]), //发送actions this.store.dispatch
 //获取直播列表发送actions this.store.dispatch
 handleOpen(key, keyPath) {
      // console.log(key, keyPath);
      //用于打开页面，通过key
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    // 读取缓存
    getdataCookie(cname) {
      // return 1
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      // 路由跳转
      // window.location.href = ''
      this.$router.push({ path: "/login" });
      // Router.push("/")
    },
    delCookie(name) {
      this.$confirm("此操作将退出当前用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var exp = new Date();
          exp.setTime(exp.getTime() - 1);
          var cval = this.getdataCookie(name);
          if (cval != null) {
            document.cookie =
              name + "=" + cval + ";expires=" + exp.toGMTString();
            this.$message({ message: "用户已退出", type: "success" });
            this.$router.push({ path: "/login" });
          } else {
            this.$message.error("退出失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "退出失败"
          });
        });
    }
    // getmune(){
    //   let parms={
    //     admin_id:this.getdataCookie('admin_id')
    //   }
    //   //获取列表之前，先获取用户的id用于后台返回数据
    // this.$apis.common.menu_list(parms).then(res=>{
    //   if(res.data.code==1){
    //         this.rolemenu=res.data.data
    //   }else{
    //      this.$router.push({path:'/login'})
    //   }
    // })
    // },
  },
  mounted() {}
};
</script>
<style scoped>
.touxiang:hover {
  cursor: pointer;
}
.touxiang {
  display: inline-block;
  vertical-align: middle;
  animation: run 8s linear 2s infinite;
}
@keyframes run {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

.main {
  background: #f6f8f9;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
}
.header {
  height: 61px;
  background: #ffffff;
  width: 100%;
}
.banquan {
  text-align: center;
  height: 60px;
  line-height: 60px;
}
.el-header {
  padding: 0;
}
.users {
  float: right;
  line-height: 61px;
}
.el-menu-item{
  background-color: #fff !important;
}
.el-menu-item:hover {
  outline: 0 !important;
  color: #fff !important;
  background: #ddd !important;
}
.el-menu-item.is-active {
  color: #fff !important;
  background: #e6563a !important;
}

.el-submenu__title:focus,
.el-submenu__title:hover {
  outline: 0 !important;
  color: #e6563a !important;
  background: none !important;
}
</style>
