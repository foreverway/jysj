<template>
  <div class="main">
    <div class="header">
      <img src="../../assets/login_title.png" alt />
    </div>
    <div class="imgandlogin">
      <div class="logo_index">
        <img src="../../images/logo_index.png" />
      </div>
      <div class="main1" v-show="dialogFormVisible==false">
        <!-- <iframe scrolling="no" frameborder="0" height="100%" width="100%" :src="backg_url"></iframe> -->

        <div class="login">
          <div class="logo_from_bgc"></div>
          <p class="login_title"></p>

          <div class="form">
            <el-form ref="form" :model="form" label-width="60px">
              <el-form-item label="账号:">
                <el-input v-model="form.admin_tel" clearable placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  v-model="form.admin_pass"
                  @keyup.enter.native="login"
                  show-password
                  clearable
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <el-form ref="form" :model="form" label-width="60px">
            <el-form-item label>
              <el-button
                @click="login"
                round
                style="width:175px;background-color:#e6563a; border:none;color:white;"
              >登录</el-button>
              <el-link type="primary" @click="dialogFormVisible = true">忘记密码?</el-link>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div class="main1" v-show="dialogFormVisible">
        <!-- //	<iframe scrolling="no" frameborder="0" height="100%" width="100%" :src="backg_url"></iframe> -->
        <div class="login zhuce">
          <!-- <img src="../../assets/logo.png" alt=""> -->
          <p class="login_title"></p>
          <div class="form">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="手机号:">
                <el-input v-model="formphone.admin_tel" clearable placeholder="手机号"></el-input>
              </el-form-item>
              <el-form-item label="验证码:">
                <el-input v-model="formphone.code" style="width:100px" clearable placeholder="验证码"></el-input>
                <el-button
                  style="background-color:#e6563a; border:none;color:white;"
                  v-if="isgetcode"
                  @click="getcode"
                >获取验证码</el-button>
                <el-button
                  style="background-color:#e6563a; border:none;color:white;"
                  v-if="isgetcode==false"
                  @click="login"
                >({{miao}})再获取</el-button>
              </el-form-item>
              <el-form-item label="密码:">
                <el-input v-model="formphone.admin_pass" show-password clearable placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码:">
                <el-input
                  v-model="formphone.admin_pass_sure"
                  show-password
                  clearable
                  placeholder="确认密码"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <el-button
            type="primary"
            @click="change_pass"
            round
            style="width:175px;background-color:#e6563a; border:none;color:white;"
          >确定</el-button>
          <el-link type="primary" @click="dialogFormVisible = false" style="color:white;">登录</el-link>
        </div>
      </div>
    </div>
    <template></template>
  </div>
</template>

    <div class="footer">
           <p> © 2015-2019 深圳市精英世家教育科技有限公司</p>
    </div>



    </div>
</template>
<script>
export default {
  data() {
    return {
      isgetcode: true, //是否显示倒计时按钮
      miao: "",
      url: "/",
      dialogFormVisible: false,
      //   backg_url:'http://player.youku.com/player.php/sid/XNDA0NjAwMDkwMA==/v.swf',
      form: {
        admin_tel: "",
        admin_pass: ""
      },
      formphone: {
        admin_tel: "",
        code: "",
        admin_pass: "",
        admin_pass_sure: ""
      },
      msg: "",
      peopleInfo: {},
      helloWord:[
  "今天也有好心情吗",
  "浮云一别后，流水十年间",
  "精英世家，育见未来",
  "4周年是我们的起点",
  "每一天都是新的一天，加油",
      ]
    };
  },
  created() {
    this.getMen();

  },
  methods: {
            // 浏览器检查结果

    getMen(a) {
      let params = {
        search: a
      };
      this.$apis.menber.admin_list(params).then(res => {
        if (res && res.data.code == 1) {
          this.peopleInfo = res.data.data.list[0];
          this.open1();
        }
      });
    },
    getcode() {
      this.$apis.menber.send_code(this.formphone).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: "发送验证码成功,请注意查收",
            type: "success"
          });
          this.isgetcode = false;
          this.miao = 60;

          var auth_timetimer = setInterval(() => {
            this.miao--;
            if (this.miao <= 0) {
              this.isgetcode = true;
              clearInterval(auth_timetimer);
            }
          }, 1000);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    change_pass() {
      this.$apis.menber.change_pass(this.formphone).then(res => {
        if (res.data.code == 1) {
          this.dialogFormVisible = false;
          this.$message({
            message: "修改密码成功,请重新登录",
            type: "success"
          });
        } else {
          this.$message.error(res.data.msg);
        }
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
            " 这是你第 " +
            this.peopleInfo.admin_login +
            " 次来这儿" +
            ""
        )
      });
      const sample=arr=>arr[Math.floor(Math.random()*arr.length)];
      
      $('.el-notification__title').text(sample(this.helloWord))
    },
    login() {
      this.$apis.menber
        .login(this.form)
        .then(res => {
          if (res.data.code == 1) {
            var d = new Date();
            d.setTime(d.getTime() + 2 * 3600000);
            //d.setTime(d.getTime()+(5000));
            var expires = "expires=" + d.toGMTString();
            document.cookie =
              "usertoken=" + res.data.data.token + ";" + expires;
            document.cookie =
              "admin_id=" + res.data.data.admin_id + ";" + expires;
            document.cookie =
              "admin_name=" + res.data.data.admin_name + ";" + expires;
            this.getMen(res.data.data.admin_name);
           // console.log(sessionStorage.getItem("url"))
            if (sessionStorage.getItem("url") !== null&&sessionStorage.getItem("url") !== "") {
              this.$router.push({ path: sessionStorage.getItem("url") });
            } else {
              this.$router.push({ path: "/" });
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message({
            // type: 'info',
            message: "登录失败"
          });
        });
    }
  },
  mounted() {
    // console.log(this.$route.query.goUrl)
    //       if(this.$route.query.url){
    //    this.url=this.$route.query.url
    //  }else{
    //    this.url='/'
    //  }
    var c = Math.ceil(Math.random() * 15);
    if (c != 6) {
      // this.backg_url="http://www.jq22.com/js/a"+c+".html"
    } else {
      //  this.backg_url="http://player.youku.com/player.php/sid/XNDA0NjAwMDkwMA==/v.swf"
    }
  }
};
</script>

<style scoped>
.login_title {
  border-radius: 5px;
  /* height:5px;background: #e6563a; */
  margin-bottom: 50px;
  /* position:absolute;
right:50px;
top:200px; */
}
.footer {
  height: 50px;
  background: #e6563a;
  text-align: center;
  line-height: 50px;
  color: #ffffff;
  position: absolute;
  bottom: 0px;
  width: 100%;
}
.main {
  background: url("../../assets/login_back.jpg");
  height: 100vh;
  position: relative;
}
.main1 {
  width: 100%;
}
.imgandlogin {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  width: 1200px;
}
.main1 .login {
  height: 350px;
  width: 320px;
  position: fixed;
  top: 28%;
  right: 18%;
  background: white;
  padding-top: 10px;
  text-align: center;
  border-radius: 3%;
  box-shadow: 2px 2px 5px #333333;
  /* border: 1px solid #ddd; */
}
.logo_index {
  width: 700px;
  height: 393px;
  background: rgba(255, 74, 22, 1);
  position: fixed;
  top: 25%;
  right: 45%;

  /* margin:0 auto; */
  border-radius: 14px;
}
.logo_from_bgc {
  background-image: url("../../images/login_index2.png");
  background-size: 100% 100%;

  width: 320px;
  margin: 0 auto;
  height: 100px;
  border-radius: 3%;
}
.form {
  width: 300px;
  /* height:250px; */
  margin: 0 auto;
}

.main .zhuce {
  height: 380px;
}
</style>

