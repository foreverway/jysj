

<template id="CMenu">
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      router
      background-color="#ffffff"
      text-color="#000"
      :default-active="defaultUrl"
      active-text-color="#fff"
      @select="selectMenu"
      style="  overflow-x:hidden;"
      open="0"
    >
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <span v-for="(item,index) in rolemenu" :key="index">
        <!-- 刷新出首层菜单名字 style="pointer-events: none;" -->
        <el-submenu index="index" ref="getThis" id="click_1" style="pointer-events: none;">
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
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";

  export default{
      data() {
    return {
      isCollapse: true,
      // ActiveMenu: this.$route.path,
      //  rolemenu:'',  菜单列表
      admin_name: "",
      defaultUrl: "/",
      peopleInfo: {},
      seeHeight: document.body.scrollHeight,
      dialogVisible: false
    };
  },
  created() {
    this.getMen();
  },
  computed: mapState(["rolemenu"]),
  methods: {
    selectMenu(index, indexPath) {
      console.log(this.defaultUrl);
      //console.log(document.body.scrollHeight);
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
    ...mapActions(["get_mune_list"]), //发送actions this.store.dispatch
    getMen() {
      let params = {
        search: this.getdataCookie("admin_name")
      };
      this.$apis.menber.admin_list(params).then(res => {
        this.peopleInfo = res.data.data.list[0];
      });
    }
  },
  mounted() {
    var iconI = $(".el-icon-arrow-down");
    var menuC = $(".el-submenu__title");
    $(menuC)[0].click();

    for (let i = 0; i < iconI.length; i++) {
      var addAttr = $(iconI)[i];
      $(addAttr).attr("class", "");
    }
    this.defaultUrl = window.location.href.split("/#")[1];
  }
  }
</script>
<style scoped>
#changeC {
  color: #e6563a !important;
}
.el-submenu__title {
  pointer-events: none !important;
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