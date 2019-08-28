<template>
  <div class="main">
    <el-page-header @back="goBack" content="新建账户" style="margin-bottom:20px"></el-page-header>

    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
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
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
     function  check_tel(rule, value, callback) {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      if (value.length != 11) {
        return callback(new Error("手机号长度不足11位"));
      }
      let parms = {
        admin_tel: this.form.admin_tel
      };
      this.$apis.menber.check_tel(parms).then(res => {
        alert(res.data.msg);
        return false;
      });
    };
    return {
      rolelist: "",
      form: {
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
  methods: {
  
    // 获取角色数据列表
    getdata() {
      this.$apis.menber.role_list().then(res => {
        if (res.data.code == 1) {
          this.rolelist = res.data.data;
          console.log(this.rolelist);
        }
      });
    },
    onSubmit() {
      this.$apis.menber.admin_add(this.form).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: "添加成功",
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
    }
  }
};
</script>
