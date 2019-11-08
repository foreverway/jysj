<template>
  <div class="main" title="创建学员账户">
    <h3>编辑学员账户</h3>
    <h4>账户信息：</h4>
    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
      <div class="input_1_main">
        <div class="input_1">
          <el-form-item label="学生姓名:" prop="username">
            <el-input v-model="form.username" style="width:150px"></el-input>
          </el-form-item>
        </div>
        <div class="input_1">
          <el-form-item label="地区：" prop="address_type">
            <el-select v-model="form.address_type" style="width:150px" placeholder="请选择">
              <el-option
                v-for="item in region"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="input_1">
          <el-form-item label="手机号：" prop="tel">
            <el-input v-model="form.tel" @blur="ifphone" style="width:150px"></el-input>
          </el-form-item>
        </div>
        <div class="input_1">
          <el-form-item label="密码：">
            <el-input v-model="form.password" placeholder="默认手机号后6位" style="width:200px"></el-input>
          </el-form-item>
        </div>
      </div>

      <h4 style="clear: both;">基础信息：</h4>
      <div class="input_1_main">
        <div class="input_1">
          <el-form-item label="性别：" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option
                v-for="item in sex"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="input_1">
          <el-form-item label="年龄：" prop="age">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
        </div>
        <div class="input_1">
          <el-form-item label="学校：" >
            <el-input v-model="form.school"></el-input>
          </el-form-item>
        </div>
        <div class="input_1">
          <el-form-item label="年级：" >
            <el-input v-model="form.grade"></el-input>
          </el-form-item>
        </div>
        <div class="input_1">
          <el-form-item label="微信/QQ：" prop="weixin_qq">
            <el-input v-model="form.weixin_qq"></el-input>
          </el-form-item>
        </div>
        <div class="input_1">
          <el-form-item label="监护人：" prop="guardian">
            <el-input v-model="form.guardian"></el-input>
          </el-form-item>
        </div>
        <div class="input_1">
          <el-form-item label="监护人联系方式：" prop="guardian_phone">
            <el-input v-model="form.guardian_phone"></el-input>
          </el-form-item>
        </div>

        <div class="input_1" v-if="form.address_type==2">
          <el-form-item label="国外地址：" prop="foreign_address">
            <el-input v-model="form.foreign_address" style="width:300px" placeholder="详细地址"></el-input>
          </el-form-item>
        </div>
        <br />
        <div v-if="form.address_type==1">
          <div class="input_1">
            <el-form-item label="家庭地区：" prop="home_area">
              <el-cascader
                style="width:150px"
                expand-trigger="hover"
                filterable
                :options="address"
                v-model="form.home_area"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </div>
          <div class="input_1">
            <el-form-item label="常驻地区：" prop="always_area">
              <el-cascader
                style="width:150px"
                expand-trigger="hover"
                filterable
                :options="address"
                v-model="form.always_area"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </div>
          <div class="input_1">
            <el-form-item label="常驻地址：" prop="always_address">
              <el-input v-model="form.always_address" style="width:150px" placeholder="例：深圳宝安xxx"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <br style="clear:both" />
      <h4>市场信息：</h4>
      <div class="input_1_main">
        <div class="input_1">
          <el-form-item label="进线编号：" prop="line_number">
            <el-input v-model="form.in_number" style="width:150px" placeholder></el-input>
          </el-form-item>
        </div>
        <div class="input_1">
          <el-form-item label="进线项目：" prop="line_project">
            <el-select v-model="form.inproject" filterable placeholder="请选择" v-if="msg.data">
              <el-option
                v-for="item in msg.data.inproject_list"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="input_1">
          <el-form-item label="进线渠道："  prop="line_channel">
            <el-select v-model="form.inchannel" placeholder="请选择" v-if="msg.data">
              <el-option
                v-for="item in msg.data.inchannel_list"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="input_1">
          <el-form-item label="接入人：">
            <el-select v-model="form.inpeople" filterable placeholder="请选择" v-if="msg.data">
              <el-option
                v-for="item in msg.data.inpeople_list"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="input_1">
          <el-form-item label="班主任：">
            <el-select v-model="form.banzhuren_id" style="width:200px" filterable placeholder="请选择">
              <el-option
                v-for="item in teacher"
                :key="item.id"
                :label="item.banzhuren"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="input_1" style="margin-left:10px;">
          <el-form-item label="课程顾问：" v-if="form.isDisable==1">
            <el-select
              v-model="form.consultant1"
              disabled
              style="width:200px"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in adviser"
                :key="item.id"
                :label="item.adviser"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程顾问：" style="margin-left:10px;" v-show="form.isDisable==0">
            <el-select v-model="form.consultant1" style="width:200px" filterable placeholder="请选择">
              <el-option
                v-for="item in adviser"
                :key="item.id"
                :label="item.adviser"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>

      <h4 style="clear: both;">咨询信息：</h4>
      <div class="input_2_main">
        <el-form-item label="咨询缘由:" style="width:550px" >
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.reason"></el-input>
        </el-form-item>

        <el-form-item label="升学目标:" style="width:550px" >
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.target"></el-input>
        </el-form-item>

        <el-form-item label="需求:" style="width:550px" >
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.demand"></el-input>
        </el-form-item>

        <el-form-item label="潜在需求:" style="width:550px">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.potential_demand"></el-input>
        </el-form-item>

        <el-form-item label="客户性格:" style="width:550px" >
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.character"></el-input>
        </el-form-item>
        <el-form-item label="在意偏好:" style="width:550px" >
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.preferences"></el-input>
        </el-form-item>
      </div>

      <h4>账户等级评定：</h4>
      <div class="input_1_main">
        <div class="input_1">
          <el-form-item label="用户等级评定：" prop='grade'>
            <el-select v-model="form.alevel" placeholder="请选择" style="width:300px" v-if="msg.data">
              <el-option
                v-for="item in msg.data.alevel_list"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">确认修改</el-button>
        <el-button @click="goback">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var Yanuusername = (rules, value, callback) => {
      if (!value) {
        return callback(new Error("姓名不能为空"));
      } else {
        callback();
      }
    };

    var Yanuage = (rules, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      if (value < 0) {
        return callback(new Error("年龄不能小于0岁"));
      } else {
        callback();
      }
    };
    return {
      msg: "",

      classs: "", // 课程数据
      adviser: "", //顾问数据
      teacher: "", //班主任数据
      address: [], // 地址选择
      id: this.$route.params.id,
      region: [
        // 国内外区分
        {
          value: 1,
          label: "国内"
        },
        {
          value: 2,
          label: "国外"
        }
      ],
      sex: [
        {
          value: 1,
          label: "男"
        },
        {
          value: 2,
          label: "女"
        }
      ],

      form: {
        id: this.$route.query.id,
        username: "", //用户名
        password: "", //密码
        tel: "", //手机号
        sex: "", //性别
        age: "", //年龄
        school: "", //学校
        grade: "", //年级
        weixin_qq: "", //微信/qq
        address_type: "", // 区分国内外
        home_area: "", //家庭地区
        always_area: "", //常驻地区
        foreign_address: "", //国外地址
        guardian: "", //监护人
        guardian_phone: "", //监护人手机号
        always_address: "", //常住地址
        in_number: "", //进线编号
        inproject: "", //进线项目
        inchannel: "", //进线渠道
        inpeople: "", //接入人
        banzhuren_id: "", //班主任
        consultant1: "", //顾问
        reason: "", //咨询缘由
        target: "", //升学目标
        demand: "", //需求
        potential_demand: "", //潜在需求
        character: "", //客户性格
        preferences: "", //在意偏好
        alevel: "" //用户等级评定
      },
      rules: {
        username: [{ required: true, validator: Yanuusername, trigger: "blur" }],
        tel: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        sex: [{ required: true, message: "此项不能为空", trigger: "blur" }],
        age: [{ required: true, validator: Yanuage, trigger: "blur" }],
        //school: [{ required: true, message: "此项不能为空", trigger: "blur" }],
         grade: [{ required: true, message: "此项不能为空", trigger: "blur" }],
        weixin_qq: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        address_type: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        always_address: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        guardian: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        guardian_phone: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        always_address: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        reason: [{ required: true, message: "此项不能为空", trigger: "blur" }],
           grade: [{ required: true, message: "此项不能为空", trigger: "blur" }],
        line_number: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
          line_project: [{ required: true, message: "此项不能为空", trigger: "blur" }],
           line_channel: [{ required: true, message: "此项不能为空", trigger: "blur" }],

      }
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    //       ifname(){
    //      if(this.form.username==''){
    //        return false
    //      }else{
    //  this.$common.ifusername(this.form.username).then(res => {
    //                  if(res.data.code==1){
    //                    this.loading=false
    //                     this.$message({
    //       message: res.data.msg,
    //       type: 'success'
    //     })
    //     }else{
    //           this.$message.error( res.data.msg);
    //     }
    // })
    //      }

    //    },
    //地区选择
    handleChange(value) {
    },
    // 返回上一页
    goback() {
      javascript: history.back(-1);
    },
    getdata() {
      this.$apis.students.students_edit({id:this.$route.query.id}).then(res => {
        if (res.data.code == 1) {
          this.form = res.data.data;
          this.form.home_area[0] = parseInt(res.data.data.home_area[0]);
          this.form.home_area[1] = parseInt(res.data.data.home_area[1]);
          this.form.always_area[0] = parseInt(res.data.data.always_area[0]);
          this.form.always_area[1] = parseInt(res.data.data.always_area[1]);

          let consultant1 = res.data.data.add_admin_id;

          this.$apis.common.adviser_list().then(res => {
            //获取顾问数据
            if (res.data.code == 1) {
              this.adviser = res.data.data.list;
              let num1 = parseInt(consultant1);
              for (var i = 0; i < this.adviser.length; i++) {
                if (this.adviser[i].id == num1) {
                  this.form.consultant1 = this.adviser[i].id;
                }
              }
            }
          });

          this.$apis.common.banzhuren_list().then(res => {
            // 获取班主任数据
            if (res.data.code == 1) {
              this.teacher = res.data.data.list;
              let num = parseInt(this.getdataCookie("admin_uid"));
              for (var i = 0; i < this.teacher.length; i++) {
                if (this.teacher[i].id == num) {
                  this.form.teacher = this.teacher[i].banzhuren;
                }
              }
            }
          });

          // 获取配置数据
          this.$apis.common.basedata_list().then(res => {
            if (res.data.code == 1) {
              this.msg = res.data;
            }
          });

          this.$apis.common.region_list().then(res => {
            if (res.data.code == 1) {
              this.address = res.data.options;
            }
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
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
      // window.location.href =
      //   "http://testadmin.test.hqjystudio.com/admin/login/login.php";
      // Router.push("/")
    },
    ifphone() {
      let parms={
        tel:this.form.tel,
        address_type:this.form.address_type
      }
        this.$apis.students.ifuserphone(parms )
          .then(res => {
            if (res.data.code == 1) {
              this.loading = false;
              this.$message({
                message: res.data.msg,
                type: "success"
              });
            } else {
              this.$message.error(res.data.msg);
            }
          });
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$apis.students.put_students_edit(this.form).then(res => {
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: this.form.username + " 修改成功"
              });
              this.$router.push({name:'StudentsList'});
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
         // console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.input_2_main {
  width: 100%;
}
.input_1_main {
  width: 95%;
  height: 80px;
}
.input_1 {
  width: 300px;
  float: left;
}
h3 {
  margin-bottom: 20px;
}
</style>