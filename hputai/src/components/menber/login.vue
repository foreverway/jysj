<template>
    <div class="main">
   <div class="header">
      <img src="../../assets/login_title.png" alt="">
   </div>
    <div class="main1" v-show="dialogFormVisible==false">
			<iframe scrolling="no" frameborder="0" height="100%" width="100%" :src="backg_url"></iframe>
			<div class="login">
                <!-- <img src="../../assets/logo.png" alt=""> -->
<p class="login_title" ></p>
              <div class="form">
                      <el-form ref="form" :model="form" label-width="60px">
                            <el-form-item label="账号:" >
                              <el-input v-model="form.admin_tel"  clearable  placeholder="请输入账号"></el-input>
                            </el-form-item>
                              <el-form-item label="密码:" >
                              <el-input v-model="form.admin_pass" @keyup.enter.native="login" show-password clearable placeholder="请输入密码"></el-input>
                            </el-form-item>
                      </el-form>
              </div>
                 <el-button type="primary" @click="login" round style="width:175px">登录</el-button>
    <el-link type="primary" @click="dialogFormVisible = true">忘记密码?</el-link>
              
			</div>
		</div>



    <div class="main1" v-show="dialogFormVisible">
			<iframe scrolling="no" frameborder="0" height="100%" width="100%" :src="backg_url"></iframe>
			<div class="login zhuce">
                <!-- <img src="../../assets/logo.png" alt=""> -->
<p class="login_title" ></p>
              <div class="form">
                      <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="手机号:" >
                              <el-input v-model="formphone.admin_tel"  clearable  placeholder="手机号"></el-input>
                            </el-form-item>
                              <el-form-item label="验证码:" >
                              <el-input v-model="formphone.code" style="width:100px" clearable  placeholder="验证码"></el-input>
                                 <el-button type="primary"  v-if="isgetcode" @click="getcode">获取验证码</el-button>
                                  <el-button type="primary" v-if="isgetcode==false" @click="login">({{miao}})再获取</el-button>

                            </el-form-item>
                              <el-form-item label="密码:">
                              <el-input v-model="formphone.admin_pass" show-password clearable placeholder="密码"></el-input>
                            </el-form-item>
                               <el-form-item label="确认密码:" >
                              <el-input v-model="formphone.admin_pass_sure" show-password clearable placeholder="确认密码"></el-input>
                            </el-form-item>
                      </el-form>
              </div>
                 <el-button type="primary" @click="change_pass" round style="width:175px">确定</el-button>
    <el-link type="primary" @click="dialogFormVisible = false">登录</el-link>
              
			</div>
		</div>



    <div class="footer">
           <p> © 2015-2019 深圳市精英世家教育科技有限公司</p>
    </div>



    </div>
</template>
<script>
export default {
      data() {
      return {
        isgetcode:true,//是否显示倒计时按钮
        miao:'',

        dialogFormVisible:false,
       //   backg_url:'http://player.youku.com/player.php/sid/XNDA0NjAwMDkwMA==/v.swf',
       form:{
         admin_tel:'',
         admin_pass:'',
       },
       formphone:{
         admin_tel:'',
         code:'',
         admin_pass:'',
         admin_pass_sure:''
       },
        msg:'',
      }
    },
    created () {
     
    },
     methods: {
       getcode(){
          this.$apis.menber.send_code(this.formphone).then(res=>{
            if(res.data.code==1){
                       this.$message({
                        message: '发送验证码成功,请注意查收',
                        type: 'success'
                      });
               this.isgetcode=false
            this.miao=60
               
   var auth_timetimer =  setInterval(()=>{
                this.miao--
                if(this.miao<=0){
                    this.isgetcode = true
                    clearInterval(auth_timetimer)
                }
            }, 1000)
            }else{
                this.$message.error(res.data.msg);
            }
          })
       },

      change_pass(){
          this.$apis.menber.change_pass(this.formphone).then(res=>{
            if(res.data.code==1){
                 this.dialogFormVisible = false
                   this.$message({
                        message: '修改密码成功,请重新登录',
                        type: 'success'
                      });
            }else{
               this.$message.error(res.data.msg);
            }
          })
      },

  
      login () {
        this.$apis.menber.login(this.form).then(res=>{
                      if(res.data.code==1){
                        var d = new Date();
                        d.setTime(d.getTime()+(2*3600000));
                        var expires = "expires="+d.toGMTString();
                        document.cookie = "usertoken="+ res.data.data.token+";" + expires;
                         document.cookie = "admin_id="+ res.data.data.admin_id+";" + expires;
                        document.cookie = "admin_name="+ res.data.data.admin_name+";" + expires;
                       
                              this.$router.push({path:'/'})
}else{
    this.$message.error(res.data.msg);
}
        })

        
      },

    },mounted () {
  
        	var c= Math.ceil(Math.random()*15);
	if(c!=6){
  // this.backg_url="http://www.jq22.com/js/a"+c+".html"
		
	}else{
  //  this.backg_url="http://player.youku.com/player.php/sid/XNDA0NjAwMDkwMA==/v.swf"
  }
    }
}
</script>

<style scoped>
.login_title{
 border-radius: 5px;
  height:5px;background: #e6563a;
  margin-bottom: 50px;
}
.footer{
  height: 50px;
  background: #e6563a;
  text-align: center;
  line-height: 50px;
  color: #ffffff;
  position:absolute;
  bottom: 0px;
  width: 100%
}
.main{
  background: url('../../assets/login_back.jpg');
  height: 100vh;
  position: relative;
}
.main1{

	width: 100%;
 
}
.main1 .login{
	height: 250px;
	width: 350px;
	top: 20%;
	right: 10%;

	/* background: rgba(225,225,225,0.9); */
	position: fixed;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #ddd;
}
.form{
  width: 300px;
  margin: 0  auto;
}

.main .zhuce{
  height: 380px;
}

</style>

