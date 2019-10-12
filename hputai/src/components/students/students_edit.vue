<template>
  <div class="main">
    <el-page-header @back="goBack" content="编辑学员账户" style="margin-bottom:20px"></el-page-header>
    <el-form ref="sizeForm" :model="sizeForm" :rules="rules" label-width="100px" size="mini">
      <el-form-item label="学员姓名" prop="username">
        <el-input v-model="sizeForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="sizeForm.password"></el-input>
      </el-form-item>
      <el-form-item label="国内/外">
        <el-radio-group v-model="sizeForm.address_type" size="medium">
          <el-radio border label="1">国内</el-radio>
          <el-radio border label="2">国外</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号" prop="tel">
        <el-input v-model="sizeForm.tel"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="sizeForm.sex" size="medium">
          <el-radio border label="1">男</el-radio>
          <el-radio border label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="sizeForm.age" placeholder="列:信息学院"></el-input>
      </el-form-item>
      <el-form-item label="学校">
        <el-input v-model="sizeForm.school"></el-input>
      </el-form-item>
      <el-form-item label="年级">
        <el-input v-model="sizeForm.grade" placeholder="列:初一"></el-input>
      </el-form-item>
      <el-form-item label="微信/QQ">
        <el-input v-model="sizeForm.weixin_qq"></el-input>
      </el-form-item>

      <el-form-item label="家庭地区">
        <el-cascader
          clearable
          filterable
          v-model="sizeForm.home_area"
          :options="address"
          :props="{ expandTrigger: 'hover' }"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="国外地址" v-if="sizeForm.address_type==2">
        <el-input v-model="sizeForm.foreign_address"></el-input>
      </el-form-item>
      <el-form-item label="监护人">
        <el-input v-model="sizeForm.guardian"></el-input>
      </el-form-item>
      <el-form-item label="监护人手机号">
        <el-input v-model="sizeForm.guardian_phone"></el-input>
      </el-form-item>
      <el-form-item label="常驻地区">
        <el-cascader
          clearable
          filterable
          v-model="sizeForm.always_area"
          :options="address"
          :props="{ expandTrigger: 'hover' }"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="常住地址">
        <el-input v-model="sizeForm.always_address"></el-input>
      </el-form-item>

      <el-form-item label="班主任">
        <el-select clearable filterable v-model="sizeForm.banzhuren_id" placeholder="请选择">
          <el-option
            v-for="item in banzhuren"
            :key="item.id"
            :label="item.banzhuren"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="进线编号">
        <el-input v-model="sizeForm.in_number"></el-input>
      </el-form-item>
      <el-form-item label="进线项目">
        <el-select clearable filterable v-model="sizeForm.inproject" placeholder="请选择">
          <el-option
            v-for="item in basedata_list.inproject_list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="进线渠道">
        <el-select clearable filterable v-model="sizeForm.inchannel">
          <el-option
            v-for="item in basedata_list.inchannel_list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接入人">
        <el-select clearable filterable v-model="sizeForm.inpeople" placeholder="请选择">
          <el-option v-for="item in adviser" :key="item.id" :label="item.adviser" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="咨询缘由">
        <el-input type="textarea" autosize v-model="sizeForm.reason"></el-input>
      </el-form-item>

      <el-form-item label="升学目标">
        <el-input type="textarea" autosize v-model="sizeForm.target"></el-input>
      </el-form-item>

      <el-form-item label="需求">
        <el-input type="textarea" autosize v-model="sizeForm.demand"></el-input>
      </el-form-item>
      <el-form-item label="潜在需求">
        <el-input type="textarea" autosize v-model="sizeForm.potential_demand"></el-input>
      </el-form-item>
      <el-form-item label="客户性格">
        <el-input type="textarea" autosize v-model="sizeForm.character"></el-input>
      </el-form-item>
      <el-form-item label="在意偏好">
        <el-input type="textarea" autosize v-model="sizeForm.preferences"></el-input>
      </el-form-item>
      <el-form-item label="用户等级评定">
        <el-select clearable filterable v-model="sizeForm.alevel" placeholder="请选择">
          <el-option
            v-for="item in basedata_list.alevel_list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item size="large">
        <el-button
          type="primary"
          style="background-color:#e6563a; border:none;"
          autosize
          @click="onSubmit('sizeForm')"
        >确定</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    var students_check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("此项不能为空!"));
      }
      let parm = {
        username: this.sizeForm.username
      };
      this.$apis.students.students_check(this.parm).then(res => {
        if (res.data.code == 1) {
          callback();
        } else {
          // callback(new Error(res.data.msg));
        }
      });
    };
    var students_check_phone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("此项不能为空!"));
      }
      let parm = {
        address_type: this.sizeForm.address_type,
        tel: this.sizeForm.tel
      };
      this.$apis.students.students_check(this.parm).then(res => {
        if (res.data.code == 1) {
          callback();
        } else {
          // callback(new Error(res.data.msg));
        }
      });
    };
    return {
      basedata_list: "", //基础配置数据
      adviser: "", //顾问选择
      banzhuren: this.banzhuren_list, //班主任选择
      address: [], //地区选择
      sizeForm: {
        id: this.$route.query.id, //用户id
        username: "", //用户名
        password: "", //密码
        tel: "", //手机号
        sex: "", //  性别
        age: "", //年龄
        school: "", //学校
        grade: "", //年级
        weixin_qq: "", //微信/qq
        address_type: "", //国内国外
        home_area: "", //家庭地区
        always_area: "", //常驻地区
        foreign_address: "", //国外地址
        guardian: "", //监护人
        guardian_phone: "", // 监护人手机号
        always_address: "", //常住地址
        banzhuren_id: "", //班主任id
        in_number: "", //进线编号
        inproject: "", //进线项目 （课程数据）
        inchannel: "", //进线渠道,1百度SEM,2转介绍
        inpeople: "", //接入人（顾问数据）
        reason: "", //咨询缘由
        target: "", //升学目标
        demand: "", //需求
        potential_demand: "", //潜在需求
        character: "", //客户性格
        preferences: "", ///在意偏好
        alevel: "" //用户等级评定
      },
      rules: {
        username: [
          { required: true, validator: students_check, trigger: "blur" }
        ],
        tel: [
          { required: true, validator: students_check_phone, trigger: "blur" }
        ],
        address_type: [
          { required: true, message: "此项不能为空!", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getdata();
  },
  computed:mapState['banzhuren_list'],
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$apis.students.put_students_edit(this.sizeForm).then(res => {
            if (res.data.code == 1) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.goBack();
            } else {
              this.$message.error(res.data.msg);
            }
          });
          this.$router.push({ path: "/StudentsList" });
        } else {
          this.$message.error("提交失败请联系研发部");
          return false;
        }
      });
    },
    getdata() {
      //编辑获取数据
      this.$apis.students.students_edit(this.sizeForm).then(res => {
        if (res.data.code == 1) {

          this.sizeForm = res.data.data;
          this.sizeForm.address_type = res.data.data.address_type.toString();
          this.sizeForm.sex = res.data.data.sex.toString();
          this.sizeForm.always_area = res.data.data.always_area.map(Number);
          this.sizeForm.home_area = res.data.data.home_area.map(Number);
          this.sizeForm.alevel = parseInt(res.data.data.alevel);
          this.sizeForm.inchannel = parseInt(res.data.data.inchannel);
          this.sizeForm.inpeople = parseInt(res.data.data.inpeople);
          this.sizeForm.inproject = parseInt(res.data.data.inproject);
        }
      });
      //获取基础配置数据
      this.$apis.sys.basedata_list().then(res => {
        if (res.data.code == 1) {
          this.basedata_list = res.data.data;
        }
      });
      //获取省市数据
      this.$apis.common.region_list().then(res => {
        if (res.data.code == 1) {
          this.address = res.data.options;
        }
      });

      // //获取班主任数据
      // this.$apis.common.banzhuren_list().then(res => {
      //   if (res.data.code == 1) {
      //     this.banzhuren = res.data.data.list;
      //   }
      // });
      //获取顾问数据
      this.$apis.common.adviser_list().then(res => {
        if (res.data.code == 1) {
          this.adviser = res.data.data.list;
        }
      });
    },
    goBack() {
      history.back(-1);
    }
  }
};
</script>