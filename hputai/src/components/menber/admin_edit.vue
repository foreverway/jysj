<template>
  <div class="main">
    <el-page-header @back="goBack" content="编辑账户"></el-page-header>

    <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="margin-top:20px">
      <el-form-item label="账户名">
        <el-input v-model="form.admin_name"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="admin_tel">
        <el-input v-model="form.admin_tel"></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="form.admin_pass"></el-input>
      </el-form-item>

      <el-form-item label="确认密码">
        <el-input v-model="form.admin_pass_sure"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="form.admin_sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="form.admin_email"></el-input>
      </el-form-item>

      <el-form-item label="微信">
        <el-input v-model="form.admin_weixin"></el-input>
      </el-form-item>

      <el-form-item label="QQ">
        <el-input v-model="form.admin_qq"></el-input>
      </el-form-item>
      <el-form-item label="是否战队长">
    <el-radio-group v-model="form.is_captain">
      <el-radio label='0'>否</el-radio>
      <el-radio label='1'>是</el-radio>
    </el-radio-group>
  </el-form-item>
         <el-form-item label="战队" >
                   <el-input v-model="form.team" ></el-input>

       <!-- <p>{{form.team?form.team:'此战队没有名称'}}</p> -->
      </el-form-item>
      <el-form-item label="账户角色">
        <el-select v-model="form.role_id" placeholder="请选择">
          <el-option
            v-for="item in rolelist.list"
            :key="item.id"
            :label="item.role_name"
            :value="item.id"
          >{{item.role_name}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button  @click="onSubmit">编辑保存</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var check_tel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      if (value.length != 11) {
        return callback(new Error("手机号长度不足11位"));
      }
    };

    return {
      rolelist: "",
      id: this.$route.params.id*1, //用户id
      form: {
        is_captain:'',
        admin_id: "",
        admin_name: "",
        admin_tel: "",
        admin_pass: "",
        admin_pass_sure: "",
        admin_sex: "",
        admin_email: "",
        admin_weixin: "",
        admin_qq: "",
        role_id: ""
      },
      rules: {
        admin_tel: [{ validator: check_tel, trigger: "blur" }]
      }
    };
  },
  created() {
     this.getdata();
  },
  mounted(){
  //  console.log(this.$route.params)
  },
  methods: {
    onSubmit() {
      this.form.admin_id = this.id*1;
      this.$apis.menber.admin_edit_put(this.form).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: "编辑成功",
            type: "success"
          });
          history.back(-1);
        } else {
          this.$message.error(res.data.msg);
          return false;
        }
      });
    },
    goBack() {
      history.back(-1);
    },
    getdata() {
      let params = {
        admin_id: this.id*1
      };
      this.$apis.menber.admin_edit(params).then(res => {
        if (res.data.code == 1) {
          this.form = res.data.data;
          this.form.admin_sex = res.data.data.admin_sex.toString();
          this.form.is_captain = res.data.data.is_captain.toString()
          console.log( this.form)
        }
      });

      this.$apis.menber.role_list(params).then(res => {
        if (res.data.code == 1) {
          this.rolelist = res.data.data;
          //console.log(this.rolelist);
        }
      });
    }
  }
};
</script>
