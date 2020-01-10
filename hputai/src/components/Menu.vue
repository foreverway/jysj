<template>
  <div class="main">
    <el-container class="youCom main" direction="horizontal" style="  border: 1px solid #eee">
      <el-header>
        <div class="header">
          <img href="#top" src="../assets/logo.png" height="50" alt style="padding:5px;float:left;" />
         <div style="display:inline-block;height:100%;width:100px;" @click="showCli"></div>
          <div class="users" >
               
            
          
            <img :src='form.admin_head' alt class="touxiang" />
            <el-dropdown trigger="click" >
              <span class="el-dropdown-link">
                <span class="youName" >{{form.admin_name}}</span>
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="forChoose">
                <el-dropdown-item >
                  <div class="clearfix" @click="dialogVisible = true">设置</div>
                </el-dropdown-item>
                <el-dropdown-item >
                  <p class="clearfix" @click="delCookie('usertoken')">退出</p>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          <span style="width:15px;height:5px;"></span>
          </div>
        </div>
        <el-dialog title="我的基本信息"     :close-on-click-modal='false'
 :visible.sync="dialogVisible" center width="600px">
          <el-form ref="form" :model="form" status-icon :rules="rules" label-width="80px">
         
            <el-form-item label="我的角色">
              <!-- // <el-input v-model="form.role_name" style="width:200px;margin:0 15px;"></el-input> -->
              <span class="selfSet">{{form.role_name}}</span>
            </el-form-item>
            <el-form-item label="更换头像">
              <el-upload
                class="upload-demo"
                ref="upload"
                action
                :on-change="handlePreview"
                :file-list="form.admin_head"
                :auto-upload="false"
              >
                <el-avatar
                  :size="15"
                  style="margin:0 20px;"
                  src="https://empty"
                  @error="errorHandler"
                >
                  <img :src="form.admin_head" class="touxiang_edit" style />
                </el-avatar>
                <el-button slot="trigger" size="small" type="primary">选取本地图片</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="form.admin_name" style="width:200px;margin:0 15px;"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="form.admin_tel" style="width:200px;margin:0 15px;"></el-input>
            </el-form-item>
            <el-form-item label="微信号">
              <el-input v-model="form.admin_weixin" style="width:200px;margin:0 15px;"></el-input>
            </el-form-item>
            <el-form-item label="QQ号">
              <el-input v-model="form.admin_qq" style="width:200px;margin:0 15px;"></el-input>
            </el-form-item>
            <el-form-item
              label="邮箱"
              prop="admin_email"
              :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
            >
              <el-input v-model="form.admin_email" style="width:200px;margin:0 15px;"></el-input>
            </el-form-item>
            <el-form-item label="修改密码" prop="admin_pass">
              <el-input
                v-model="form.admin_pass"
                type="password"
                autocomplete="off"
                style="width:200px;margin:0 15px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="admin_pass_sure">
              <el-input
                v-model="form.admin_pass_sure"
                type="password"
                autocomplete="off"
                style="width:200px;margin:0 15px;"
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
          </span>
        </el-dialog>
      </el-header>
      <div class="left">
        <el-aside width="195px" style="   overflow-x:hidden; background-color: rgb(238, 241, 246)">
          <div style="height:55px;"></div>
          <el-menu
            class="el-menu-vertical-demo"
            router
            background-color="#ffffff"
            text-color="#000"
            :default-active="defaultUrl"
            active-text-color="#fff"
            @select="selectMenu"
            style="  overflow-x:hidden;"
            :default-openeds="openeds"
          >
            <el-menu-item index="/">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <span v-for="(item,index) in rolemenu" :key="index">
              <!-- 刷新出首层菜单名字 style="pointer-events: none;" -->
              <el-submenu
                :index="index.toString()"
                ref="getThis"
                id="click_1"
                style="pointer-events: none;"
              >
                <template slot="title">
                  <span class="data_color" id="" ><i  :class="item.menu_icon" ></i></span>
                  <span slot="title" class="changeC">{{item.menu_name}}</span>
                </template>
                <span v-for="(items,index1) in item.children" :key="index1">
                  <!-- 刷新出次级菜单名字 -->
                  <el-menu-item :index="items.menu_url" route style="pointer-events:painted;">
                    <template slot="title">
                      
                      <span style="display:inline-block;margin-left:12px;" slot="title">{{items.menu_name}}</span>
                    </template>
                  </el-menu-item>
                </span>
              </el-submenu>
            </span>
          </el-menu>
        </el-aside>
      </div>
      <div class="right">
        <el-main class="this_height">
          <router-view />
        </el-main>
      </div>
    </el-container>
    <el-dialog
    ref="mybox"
  title=''
  class="changeT"
  :visible.sync="cli"
  width="500px"
  >
  <div id="calculator">
    <!-- <header class="cal"> -->
      <!-- <h1>Calculator</h1> -->
      <!-- <span class="author">BY </span> -->
    <!-- </header> -->
    <section class="calculator" id="calculator">
      <calculator-content></calculator-content>
    </section>
  </div>

</el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import CalculatorContent from '../templates/CalculatorContent.vue'
// export default {

//  }
export default {
    name: 'calculator',
  components: {
    CalculatorContent
  },
     inject:['reload'],//在export default下面加上这一段
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.admin_pass_sure !== "") {
          this.$refs.form.validateField("admin_pass_sure");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.admin_pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isCollapse: true,
      admin_name: "",
      defaultUrl: "/",
      peopleInfo: {},
      aa1:'',
      aa:[
  "既见君子 云胡不喜",
  "浮云一别后，流水十年间",
  "一片两片三四片，五六七八九十片。 千片万片无数片，飞入梅花总不见",
  "山不过来 我就过去",
  "叶里藏花一度，梦里踏雪几回",
  "吹灭读书灯，一身都是月",
  "迷津欲有问，平海夕漫漫","器有大小，唯心难量","相识起，到永远"
      ],
      seeHeight: document.body.scrollHeight,
      dialogVisible: false,
      openeds: ["0", "1", "2", "3", "4", "5"],
      visible: false,
      form: {
        admin_head: "",
        admin_email: ""
      }, //个人信息
      cli:false,
      rules: {
        admin_pass: [{ validator: validatePass, trigger: "blur" }],
        admin_pass_sure: [{ validator: validatePass2, trigger: "blur" }]
      }
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

    this.$nextTick(function() {
      this.getMen(); //
      //实现菜单的展开 图标消失
    });
 
  },
  watch: {

$route(to, from) {
 var name=this.$route.path.substring(this.$route.path.indexOf("/")+1);
}
},
  beforeMount() {},
  computed: mapState([
    "banzhuren_list",
    "rolemenu",
    "live_list",
    "teacher_data",
    "zhujiao_data",
    "jiaowu_data",
    "region_list"
  ]),
  updated() {  //获取地址栏地址，如果#后面不是login就存入sessionStorage
        //var matchReg = /(?<=#\/).*?(?=\/)/;

  //console.log(this.$route.path)//使用route方法获取路径  在使用split对/进行切割
  // var matchReg = /(?<=#\/).*?(?=\/)/;//使用正则零宽断言来取出第一位地址
    if (window.location.href.split("/#")[1] !== "login") {
      sessionStorage.setItem("url", window.location.href.split("/#")[1]);
    }
    if(this.$route.path.split('/')[1]){
      let twoUrl='/'+this.$route.path.split('/')[1]
sessionStorage.setItem("url",twoUrl);
    }
    this.defaultUrl = sessionStorage.getItem("url");
      var bodyDiv=$('.right')
    $(bodyDiv)[0].style.height=$(window).height()*1-50+'px'
              var bodyDiv=$('.this_height')
    $(bodyDiv)[0].style.height=$(window).height()*1-40+'px'
  },
  mounted() {

 if (window.location.href.split("/#")[1] !== "login") {
      sessionStorage.setItem("url", window.location.href.split("/#")[1]);
    }
    if(this.$route.path.split('/')[1]){
      let twoUrl='/'+this.$route.path.split('/')[1]
sessionStorage.setItem("url",twoUrl);
    }
    this.defaultUrl = sessionStorage.getItem("url");
    //console.log(this.defaultUrl)
    //在login页就报错  说明在那时就执行
    // var iconI = $(".el-icon-arrow-down");
    // var menuC = $(".el-submenu__title");
    // $(menuC)[0].click();
    // for (let i = 0; i < iconI.length; i++) {
    //   var addAttr = $(iconI)[i];
    //   $(addAttr).attr("class", "");
    // }
  },

  methods: {
    showCli(){
      console.log($('.changeT .el-dialog__title').html())
      $('.changeT .el-dialog__title').html('')
      this.cli=true
      this.open1()
    },
            //调用App.vue下的this.reload()方法，来改变v-if的状态
        clickDiv(){//刷新按钮调用的方法
          this.reload()
        },
    handlePreview(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        let _base64 = reader.result;
        let ba = _base64.split(",");
        this.form.admin_head = _base64;
      };
    },
    errorHandler() {
      //没有头像时候的回调
      return true;
    },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.dialogVisible = false;
          this.$apis.menber.admin_base_put(this.form).then(res => {
            if (res.data.data == 1) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
     open1() {
  
 $('.changeT .el-dialog__title').innerHTML=''
      const sample=arr=>arr[Math.floor(Math.random()*arr.length)];
      
      this.aa1=sample(this.aa)
     const dom = document.querySelector('.changeT .el-dialog__title')
     $('.changeT .el-dialog__title').attr('id','showClick')
const data = this.aa1.split('')
    let index = 0
    writing(index)
    function writing(index) {
        if (index < data.length) {
            dom.innerHTML += data[index]
            setTimeout(writing.bind(this), 200, ++index)
        }
    }

    },
    selectMenu(index, indexPath) {
      //console.log(document.body.scrollHeight);
      //实现点击子菜单父菜单变化
      var menuList = $(".changeC");
      var spanList = $(".data_color");
      
      for (let y = 0; y < menuList.length; y++) {
        $(menuList[y]).attr("id", "");
        $(spanList[y]).attr("id", "");
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
              $(spanList[index]).attr("id", "i_color");
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
            sessionStorage.setItem("url", "");
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
    // open1() {
    //   const h = this.$createElement;
    //   this.$notify({
    //     title: "今天也有好心情吗?",
    //     duration: 6000,
    //     message: h(
    //       "i",
    //       { style: "color: teal" },
    //       "欢迎回来," +
    //         this.peopleInfo.admin_name +
    //         " 这是我们的第 " +
    //         this.peopleInfo.admin_login +
    //         " 次见面" +
    //         ""
    //     )
    //   });
    // },
    getMen() {
      let params = {
        search: this.getdataCookie("admin_name")
      };
      this.$apis.menber.admin_list(params).then(res => {
        if (res && res.data.code == 1) {
          this.peopleInfo = res.data.data.list[0];
        }
      }); //用户打招呼用语
      this.$apis.menber.admin_base(params).then(res => {
        if (res && res.data.code == 1) {
          this.form = res.data.data; //获取编辑使用用户信息
        }
      });
    }
  }
};
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Pacifico');
.data_color{

  margin-top:3px;
}
.clearfix{
  padding:0 20px;
}
.forChoose{
  /* float:right; */
}
.forChoose /deep/ .el-dropdown-menu__item{
  /* //width: 80px; */
  padding:0px;
    text-align: center;
}
.youName{
display:inline-block;
margin:0 5px;
font-weight:700;color:#FF8500;
text-align: center;
font-size:  15px;
}
#click_1 /deep/ .el-icon-arrow-down:before {
  content: "";
}
.selfSet {
  margin: 0 50px;
  color: #ff755f;
}
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
  /* margin-top: 50px; */
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
#i_color /deep/ i{
  color: #e6563a !important;
}
#changeC {
  color: #e6563a !important;
}
.touxiang:hover {
  cursor: pointer;
}
.touxiang_edit {
  display: inline-block;
  vertical-align: middle;
  float: left;
  margin: 0 20px;
  width: 40px;
  height: 40px;
  border: 1px solid white;
  border-radius: 50%;
}
.touxiang {
  display: inline-block;
  vertical-align: middle;
    width: 50px;
  height: 50px;
    border: 1px solid white;
  border-radius: 50%;
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
    /* .item {
      margin: 4px;
    } */
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
  /* width: 0px; */
  margin-right:3%;
  line-height: 61px;
  cursor:pointer;
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





.cal{
  font-size: 1.8rem;
  font-family: 'Pacifico', cursive;
}

.author{
  font-size: 1.5rem;
  width: 300px;
  display: inline-block;
  text-align: left;
  color:#fff;
}

.cal .author a{
  text-decoration: none;
}

.cal , .calculator {
  margin: auto;
  text-align: center;
}
html{
   font-size:62.5%;  /* =10px */
}
.calculator{
  border: 0.8rem solid #f67373;
  width: 405px;
  height:27rem;
  background-color: #f28080;
  font-size: 1.6rem;
  -webkit-border-radius: 1rem;
  -moz-border-radius: 1rem;
  -ms-border-radius: 1rem;
  -o-border-radius: 1rem;
  border-radius: 1rem;
  -webkit-box-shadow: 1rem 1rem 0.5rem #ccc;
  box-shadow: 1rem 1rem 0.5rem #ccc;
  
}
.main /deep/ .el-dialog{
  background: rgba(0, 0, 0, 0);
  -webkit-box-shadow:rgba(0, 0, 0, 0);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0)
}
.main /deep/ .el-dialog__body{
  padding:0;
}
 .main /deep/ .el-dialog__title {
   margin-left:10px;
    font-size: 16px;
    color: #fff;
}


</style>

