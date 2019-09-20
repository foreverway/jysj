<template>
  <div class="main">
    <el-container style=" border: 1px solid #eee;height: 100vh;">
      <el-container>
        <el-header
          style="text-align: right; font-size: 12px;background:#fff;"
          v-on:function1="function1"
        >
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">
              <router-link to="/ShareList">
                <span
                  index="1"
                  class="_span"
                  style="display: inline-block; width: 100px;text-align: center;height: 60px;"
                >分享素材列表</span>
              </router-link>
            </el-menu-item>

            <el-menu-item index="2">
              <router-link to="/ShareStatistical">
                <span
                  index="1"
                  class="_span"
                  style="display: inline-block; width: 100px;text-align: center;height: 60px;"
                >分享记录列表</span>
              </router-link>
            </el-menu-item>

            <!-- <el-menu-item index v-if="isShowConfig==1"> -->
             <el-menu-item index="3">
              <router-link to="/ShareArticleConfig">
                <span
                  index="1"
                  class="_span"
                  style="display: inline-block; width: 100px;text-align: center;height: 60px;"
                >分享素材配置</span>
              </router-link>
            </el-menu-item>
          </el-menu>
          <el-dropdown>
          </el-dropdown>
        </el-header>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      admin_uid: "",
      admin_name: "",
      isShowConfig: ""
    };
  },
  created() {
    this.$common.getuilcode();
    this.admin_name = this.getdataCookie("admin_name");
    this.admin_name = this.getdataCookie("admin_uid");
    this.getdata();
  },
  methods: {
    //接收子组件传回的值
    function1(data) {
      alert(data);
      this.isShowConfig = data;
    },

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    //变换颜色
    showcolor(name) {
      alert(name);
      this.show_color = name;
    },
    // 获取url的值
    getQueryString(value) {
      const reg = new RegExp("(^|&)" + value + "=([^&]*)(&|$)");
      const r =
        window.location.search.substr(1).match(reg) ||
        window.location.hash
          .substring(window.location.hash.search(/\?/) + 1)
          .match(reg);
      if (r != null) {
        var d = new Date();
        d.setTime(d.getTime() + 2 * 3600000);
        var expires = "expires=" + d.toGMTString();
        document.cookie =
          "admin_uid=" + decodeURIComponent(r[2]) + ";" + expires;
      }
    },

    getdataCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      // 路由跳转
      // window.location.href = 'http://testadmin.test.hqjystudio.com/admin/login/login.php'
      // Router.push("/")
    },
    getdata() {
      this.$common.is_show_config(this.admin_uid).then(res => {
        this.isShowConfig = res.data.data.permissions.isShowConfig;
      });
    }
  },
  mounted() {}
};
</script>

<style >
* {
  padding: 0;
  margin: 0;
}
.ziyicaidan {
  float: left;
  display: inline-block;
}

.color_red {
  color: red;
}
.logo {
  background: #000;
  height: 60px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.container::-webkit-scrollbar {
  display: none;
}
</style>



