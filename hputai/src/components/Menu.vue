<template>
  <div class="main">
    <el-container class="youCom main" direction="horizontal" style="  border: 1px solid #eee">
      <el-header>
        <div class="header">
          <img href="#top" src="../assets/logo.png" height="50" alt style="padding:5px;float:left;" />
          <div class="users" style="width:180px;">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <img src="../assets/touxiang.png" alt class="touxiang" />
                <span style="display:inline-block;width:88px;">{{this.getdataCookie("admin_name")}}</span>
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
      <div class="left">
        <el-aside width="195px" style="   overflow-x:hidden; background-color: rgb(238, 241, 246)">
          <div style="height:55px;"></div>
          <el-menu
            class="el-menu-vertical-demo"
            router
            :default-openeds="openeds"
            background-color="#ffffff"
            text-color="#000"
            active-text-color="#fff"
            @select="selectMenu"
            style="  overflow-x:hidden;"
          >
            <el-menu-item index="/">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <span v-for="(item,index) in rolemenu" :key="index">
              <!-- 刷新出首层菜单名字 style="pointer-events: none;" -->
              <el-submenu index="index" id="click_1" style="pointer-events: none;">
                <template slot="title">
                  <i :class="item.menu_icon"></i>
                  <span slot="title" class="changeC">{{item.menu_name}}</span>
                </template>
                <span v-for="(items,index1) in item.children" :key="index1">
                  <!-- 刷新出次级菜单名字 -->
                  <el-menu-item :index="items.menu_url" route style="pointer-events:painted;">
                    <template slot="title">
                      <span slot="title">{{items.menu_name}}</span>
                    </template>
                  </el-menu-item>
                </span>
              </el-submenu>
            </span>
          </el-menu>
        </el-aside>
      </div>
      <div class="right">
        <el-main>
          <router-view />
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      isCollapse: true,
      // ActiveMenu: this.$route.path,
      //  rolemenu:'',  菜单列表
      admin_name: "",
      openeds: ["1", "2", "3"],
      peopleInfo: {},
      seeHeight: document.body.scrollHeight
    };
  },
  created() {
    let params = {
      admin_id: this.getdataCookie("admin_id")
    };
    this.get_banzhuren_list({
      //获取班主任列表
      url: "/api/api_banzhuren_list"
    });
    this.get_mune_list({
      url: "/api/api_menu_list"
    });
    this.get_live_list({
      //获取直播列表
      url: "/api/api_live_list"
    });
    this.get_teacher_data({
      //获取讲师列表
      url: "/api/api_teacher_data"
    });
    this.get_zhujiao_data({
      //获取助教列表
      url: "/api/api_zhujiao_data"
    });
    this.get_jiaowu_data({
      //获取教务专员列表
      url: "/api/api_jiaowu_data"
    });
    this.getMen(); //
    this.$nextTick(function() {
      //实现菜单的展开 图标消失
      var iconI = $(".el-icon-arrow-down");
      var menuC = $(".el-submenu__title");
      $(menuC)[0].click();
      for (let i = 0; i < iconI.length; i++) {
        var addAttr = $(iconI)[i];
        $(addAttr).attr("class", "");
      }
    });
  },
  computed: mapState([
    "banzhuren_list",
    "rolemenu",
    "live_list",
    "teacher_data",
    "zhujiao_data",
    "jiaowu_data",
    "region_list"
  ]),
  mounted() {
    //     $('.youCom').height(document.documentElement.clientHeight)
    // console.log(document.documentElement.clientHeight)
    // window.location.reload();
  },
  methods: {
    selectMenu(index, indexPath) {
      console.log(document.body.scrollHeight);
      //实现点击子菜单父菜单出现
      var menuList = $(".changeC");
      for (let y = 0; y < menuList.length; y++) {
        $(menuList[y]).attr("id", "");
      }
      this.rolemenu.forEach((item, index, array) => {
        //遍历菜单
        if (item.children) {
          //有子集
          for (let j = 0; j < item.children.length; j++) {
            //遍历子集
            let a = item.children.filter(function(item) {
              return item.menu_url == indexPath[1];
            });
            if (a.length > 0) {
              $(menuList[index]).attr("id", "changeC");
              return index;
            }
          }
        } else {
          //无子集
        }
      });
    },

    ...mapActions([
      "get_mune_list",
      "get_banzhuren_list",
      "get_live_list",
      "get_region_list",
      "get_teacher_data",
      "get_zhujiao_data",
      "get_jiaowu_data"
    ]), //发送actions this.store.dispatch
    //获取直播列表发送actions this.store.dispatch

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
    },
    open1() {
      const h = this.$createElement;
      this.$notify({
        title: "今天也有好心情吗?",
        duration: 6000,
        message: h(
          "i",
          { style: "color: teal" },
          "欢迎回来," +
            this.peopleInfo.admin_name +
            " 这是我们的第 " +
            this.peopleInfo.admin_login +
            " 次见面" +
            ""
        )
      });
    },
    //       getIndex(){
    // var arr =this.rolemenu.map((iten,index)=>{
    //           return index
    //       })
    //       return arr
    //       },
    getMen() {
      //  $('.el-submenu__icon-arrow').attr('class','')
      //   $('.el-icon-arrow-down').attr('class','')

      let params = {
        search: this.getdataCookie("admin_name")
      };
      this.$apis.menber.admin_list(params).then(res => {
        this.peopleInfo = res.data.data.list[0];
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
  //     <el-container class="youCom" direction="horizontal" height="750px" style="  border: 1px solid #eee">
  //          <el-header >
  //         <div class="header">
  //           <img href="#top" src="../assets/logo.png" height="50" alt style="padding:5px;float:left;" />
  //           <div class="users" style="width:180px;">
  //             <el-dropdown trigger="click">
  //               <span class="el-dropdown-link">
  //                 <img src="../assets/touxiang.png" alt class="touxiang" />
  //                 <span style="display:inline-block;width:88px;">{{this.getdataCookie("admin_name")}}</span>
  //                 <i class="el-icon-caret-bottom el-icon--right"></i>
  //               </span>
  //               <el-dropdown-menu slot="dropdown">
  //                 <el-dropdown-item class="clearfix">设置</el-dropdown-item>
  //                 <el-dropdown-item class="clearfix">
  //                   <span @click="delCookie('usertoken')">退出</span>
  //                 </el-dropdown-item>
  //               </el-dropdown-menu>
  //             </el-dropdown>
  //           </div>
  //         </div>
  //       </el-header>

  //       <el-aside width="202px"  style="background-color: rgb(238, 241, 246)">
  //     <div style="height:55px;">
  //     </div>
  //           <el-menu
  //             class="el-menu-vertical-demo"
  //             router
  //             :default-openeds="openeds"
  //             background-color="#ffffff"
  //             text-color="#000"
  //             active-text-color="#fff"
  //             @select="selectMenu"
  //           >
  //             <el-menu-item index="/">
  //               <i class="el-icon-s-home"></i>
  //               <span slot="title">首页</span>
  //             </el-menu-item>
  //             <span v-for="(item,index) in rolemenu" :key="index">
  //               <!-- 刷新出首层菜单名字 style="pointer-events: none;" -->
  //               <el-submenu index="index" id="click_1" style="pointer-events: none;">
  //                 <template slot="title">
  //                   <i :class="item.menu_icon"></i>
  //                   <span slot="title" class="changeC">{{item.menu_name}}</span>
  //                 </template>
  //                 <span v-for="(items,index1) in item.children" :key="index1">
  //                   <!-- 刷新出次级菜单名字 -->
  //                   <el-menu-item :index="items.menu_url" route style="pointer-events:painted;">
  //                     <template slot="title">
  //                       <span slot="title">{{items.menu_name}}</span>
  //                     </template>
  //                   </el-menu-item>
  //                 </span>
  //               </el-submenu>
  //             </span>
  //           </el-menu>
  //   </el-aside>
  //     <el-main>
  //    <router-view />
  //     </el-main>
  // </el-container>

  //    <el-container class="youCom" style="height:750px; border: 1px solid #eee">
  //   <el-aside width="202px" style="background-color: rgb(238, 241, 246)">
  //     <div style="height:55px;">
  //     </div>
  //           <el-menu
  //             class="el-menu-vertical-demo"
  //             router
  //             :default-openeds="openeds"
  //             background-color="#ffffff"
  //             text-color="#000"
  //             active-text-color="#fff"
  //             @select="selectMenu"
  //           >
  //             <el-menu-item index="/">
  //               <i class="el-icon-s-home"></i>
  //               <span slot="title">首页</span>
  //             </el-menu-item>
  //             <span v-for="(item,index) in rolemenu" :key="index">
  //               <!-- 刷新出首层菜单名字 style="pointer-events: none;" -->
  //               <el-submenu index="index" id="click_1" style="pointer-events: none;">
  //                 <template slot="title">
  //                   <i :class="item.menu_icon"></i>
  //                   <span slot="title" class="changeC">{{item.menu_name}}</span>
  //                 </template>
  //                 <span v-for="(items,index1) in item.children" :key="index1">
  //                   <!-- 刷新出次级菜单名字 -->
  //                   <el-menu-item :index="items.menu_url" route style="pointer-events:painted;">
  //                     <template slot="title">
  //                       <span slot="title">{{items.menu_name}}</span>
  //                     </template>
  //                   </el-menu-item>
  //                 </span>
  //               </el-submenu>
  //             </span>
  //           </el-menu>
  //   </el-aside>
  //   <el-container>
  //        <el-header >
  //         <div class="header">
  //           <img href="#top" src="../assets/logo.png" height="50" alt style="padding:5px;float:left;" />
  //           <div class="users" style="width:180px;">
  //             <el-dropdown trigger="click">
  //               <span class="el-dropdown-link">
  //                 <img src="../assets/touxiang.png" alt class="touxiang" />
  //                 <span style="display:inline-block;width:88px;">{{this.getdataCookie("admin_name")}}</span>
  //                 <i class="el-icon-caret-bottom el-icon--right"></i>
  //               </span>
  //               <el-dropdown-menu slot="dropdown">
  //                 <el-dropdown-item class="clearfix">设置</el-dropdown-item>
  //                 <el-dropdown-item class="clearfix">
  //                   <span @click="delCookie('usertoken')">退出</span>
  //                 </el-dropdown-item>
  //               </el-dropdown-menu>
  //             </el-dropdown>
  //           </div>
  //         </div>
  //       </el-header>
  //     <el-main>
  //    <router-view />
  //     </el-main>
  //   </el-container>
  // </el-container>
};
</script>
  
<style scoped>
.left {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 195px;
  overflow-y: auto;

  display: inline-block;
}
.right {
  /* position: fixed; */
  display: inline-block;
  overflow-y: auto;
  width: calc(100% - 200px);
  margin-left: 200px;
  margin-top: 50px;
  height: 100%;
}
.left[data-v-98c1a456],
.right[data-v-98c1a456] {
  height: 100%;
  overflow-y: auto;
  display: inline-block;
  position: fixed;
}

.el-submenu__title {
  pointer-events: none !important;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  height: 61px;
  width: 100%;
  background: #fff;
}

#changeC {
  color: #e6563a !important;
}
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
  position: relative;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
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
  width: 150px;
  line-height: 61px;
}
.el-menu-item {
  background-color: rgb(235, 232, 232) !important;
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

