<template>
  <div class="main">
    <zx-head title="查看报名需求"></zx-head>

    <el-form ref="form"  :model="form" label-width="120px">
      <el-form-item label="报名编号">
        <!-- 报名编号每次从后台拉取+1 -->
        <p>{{this.edit_data.number}}</p>
        <!-- <el-input v-model="form.data_number" ></el-input> -->
      </el-form-item>
      <el-form-item label="报名标题" prop="title">
        <p>{{form.title}}</p>
      </el-form-item>
      <el-form-item label="上课地点" prop="radio">
        <!-- <el-radio-group v-model="form.radio" @change="whereGo(form.radio)">
          <el-radio :label="1">线上</el-radio>
          <el-radio :label="2">线下</el-radio>
        </el-radio-group> -->
        <p>{{form.radio==1?'线上':'线下'}}</p>
      </el-form-item>
      <el-form-item label="上课地址" width="200px" v-if="form.radio==2" prop="address">
        <!-- <el-cascader placeholder="支持到地级市" v-model="form.address" :options="address_check" filterable></el-cascader> -->
        <p >{{form.address}}</p>
      </el-form-item>
      <el-form-item :inline="true" label="已排课时">
        <div class="add_ul">
          <p id="sss">科目</p>
          <p>课时</p>
          <p>单价(元)</p>
          <p>总额</p>
          <p>课程性质</p>
          <p>班课</p>
          <p>一对一</p>
          <p>自组班课</p>
        </div>
        <div class="add_ul_new" v-for="(item,i) in editableTabs_1" :key="i">
          <p>{{item.subject_name}}</p>
          <span style="display:none;" v-bind:id="'course_id'+ i">{{item.course_id}}</span>
          <p>{{item.classhour}}
          </p>
          <p>{{item.price}}
          </p>
          <p v-if="item.price&&item.classhour">{{item.price*item.classhour}}</p>
          <p v-if="item.price==''||item.classhour==''">待填充</p>
          <p>{{item.course_type==1?'正课':item.course_type==2?'试听':'辅导'}}

          </p>
          <p>{{item.course_id==0?'否':'是'}}</p>
          <p>{{item.is_one==0?'否':'是'}}

          </p>
          <p>{{item.is_group==0?'否':'是'}}
          </p>

        </div>
      </el-form-item>
      <el-form-item label="学生信息" prop="value_1">
        <div class="add_ul_2">
          <p>学生姓名</p>
          <p>手机号</p>
        </div>
        <div class="add_ul_2" v-for="(item,i) in editableTabs" :key="i">
          <span style="display:none;" v-bind:id="'students'+ i">{{item.id}}</span>
          <p>{{ item.student_name}}</p>
          <p>{{item.tel}}</p>


          <!-- <p @click=" deleteTest" style="cursor:pointer;color:white;background-color:#e6563a;">撤销</p> -->
        </div>
      </el-form-item>

      <el-form-item label="有效期限">
        <p>：{{ this.form.valueDate }}</p>
      </el-form-item>
      <el-form-item label="备注说明" prop="feedback">
        <p>{{form.feedback}}</p>
      </el-form-item>
    </el-form>
    <!-- 步骤二 -->
    <div>
      <el-form ref="form2" :model="form2" label-width="120px">
        <el-form-item label="需求1" >
          <p>{{form2.need_one}}</p>
        </el-form-item>
        <el-form-item label="需求2" >
          <p>{{form2.need_two}}</p>
        </el-form-item>
        <el-form-item label="需求3" >
          <p>{{form2.need_three}}</p>
        </el-form-item>
        <el-form-item label="需求4">
          <p>{{form2.need_four}}</p>
        </el-form-item>
        <!-- <el-form-item label="需求5">
          <p>{{form2.need_five}}</p>
        </el-form-item> -->
      </el-form>
    </div>

    <p style="margin-left:120px;"><el-button type="primary" @click="goBack" >确 定</el-button></p>
    <!-- <el-button  v-if="active==1||active==2">取消</el-button> -->

    <!-- 设置充值链接 -->
    <!-- <div style="display:none" cols="20" id="biao1">{{copyurl1}}</div> -->
  </div>
</template>

<script>
import studens_url from "../../config/config";
import { mapState } from "vuex";
export default {
  data() {
    return {
      show: "false",
      input: "",
      input1: "",
      input2: "",
      active: 1,
      edit_data: {}, //从编辑得来的数据
      money: "",
      parms: {
        search: "",
        page: 1
      },
      options1: [
        //学生姓名的数据
        // label:"username",
      ],
      options_1: [], //学生数组总数据
      options: [], //课程名称的数据
      options_: [], //总数据的数据
      // radio: "1", //上课地点的选择
      editableTabs_1: [],
      pushArray1: [], //线上数组
      pushArray2: [], //线下数组
      editableTabs: [
        //新增的内容的数据数组(学生)
      ],
      students_data: [], //用户id
      subjects_data: [], //学科数据
      feedback: "", //反馈
      course_address: "", //上课地址
      address_check: [], //上课地址数组
      form: {
        title: "", //标题
        value: "", //报读科目
        value_1: "", //学生姓名
        valueDate: "", //有效期限
        feedback: "", //备注说明
        radio: "", //上课地点的选择
        address: "" //上课地址
      },
      form2: {
        need_one: "",
        need_two: "",
        need_three: "",
        need_four: "",
        need_five: ""
      },
      parms: {
        //提交的数据
        subjects_data: [],
        students_data: []
      }
    };
  },
  created() {
    this.getdata();
    this.getStudent();
  },
  computed: {
    ...mapState(["region_list"])
  },
  mounted() {
    let getId = arr => {
      arr.forEach(v => {
        v.value = v.label;
        if (v.children instanceof Array) {
          getId(v.children);
        }
      });
    };
    getId(this.region_list);
    this.address_check = this.region_list;
  },
  methods: {
    //生成学员编号
    deleteTest_1(index) {
      this.editableTabs_1.splice(index,1);
      this.form.value = "";
    },
    deleteTest(index) {
      this.editableTabs.splice(index,1);
    },
    getdata() {
      let parms = {
        admin_id: this.getdataCookie("admin_id")
      };
      let parms1 = {
        id: this.$route.query.id
      };
      this.$apis.menber.application_edit(parms1).then(res => {
        if (res.data.code == 1) {
          //从编辑的位置获取之前的信息
          this.edit_data = res.data.data;
          this.form.title = this.edit_data.title;
          this.form.feedback = this.edit_data.remarks;
          this.form.valueDate = res.data.data.expiry_date;
          this.form.radio = this.edit_data.needs_data.course_address;
          this.form.address = this.edit_data.needs_data.address;

          this.form2.need_one = this.edit_data.needs_data.need_one;
          this.form2.need_two = this.edit_data.needs_data.need_two;
          this.form2.need_three = this.edit_data.needs_data.need_three;
          this.form2.need_four = this.edit_data.needs_data.need_four;
          this.form2.need_five = this.edit_data.needs_data.need_five;
          // this.radio=this.edit_data.needs_data.course_address  这里是用户在线上还是线下
          this.editableTabs_1 = this.edit_data.subjects_data; //学科数据
          this.editableTabs = this.edit_data.students_data; //学生数据
          console.log(this.edit_data.students_data);
          let subArr = this.edit_data.subjects_data; //原学科数据的数组
          // console.log(subArr)   //需要用户科目  手机号  学生姓名的id
          // console.log(this.editableTabs)//在这里循环得到想要的数据
        }
      });
      //获取科目的数据
      this.$apis.common.subject_list(parms).then(res => {
        if (res.data.code == 1) {
          this.msg = res.data;
          this.options_ = res.data.data;
          let addWord = arr => {
            arr.forEach(item => {
              (item.value = item.subject_name),
                (item.label = item.subject_name);
              if (item.children instanceof Array) {
                addWord(item.children);
              }
            });
          };
          addWord(this.options_);
          this.options = this.options_;
        }
      });
    },
    createStudent() {},
    //获取学生列表
    getStudent() {
      this.$apis.students.get_students_data().then(res => {
        if (res.data.code == 1) {
          this.options_1 = res.data.data.list;
          for (let i = 0; i < this.options_1.length; i++) {
            var val = this.options_1[i];
            this.options1.push({ value: val.username, label: val.username });
          }
        }
      });
    },
    //选择报读科目的函数
    handleChange_1(targetName) {
      var lastName =
        targetName.length == 1
          ? targetName[0]
          : targetName.length == 2
          ? targetName[1]
          : targetName[2];
      let ifCheck = this.editableTabs_1.filter(res => {
        return res.title == lastName.toString();
      });
      if (ifCheck.length == 0) {
        const result = [];
        let getNeed = arr => {
          arr.forEach(v => {
            result.push({
              value: v.id,
              label: v.subject_name,
              offline_price: v.offline_price,
              online_price: v.online_price
            });
            if (v.children instanceof Array) {
              getNeed(v.children);
            }
          });
        };
        getNeed(this.options_); //多维数组简化为二维数组(可以使用find，indexOf。findIndex查找返回)
        var needArr = result.find((res, index, arr) => {
          return res.label == lastName;
        });
        this.pushArray1.push({
          subject_name: needArr.label,
          subject_id: needArr.value, //科目id
          classhour: "",
          amount: "",
          price: needArr.online_price,
          course_type: 0, //课程类型
          course_id: 0, //班课
          is_one: 1, //一对一？
          is_group: 0 //自主班课?
        });
        this.pushArray2.push({
          subject_name: needArr.label,
          subject_id: needArr.value, //科目id
          classhour: "",
          amount: "",
          price: needArr.offline_price,
          course_type: 0, //课程类型
          course_id: 0, //班课
          is_one: 1, //一对一？
          is_group: 0 //自主班课?
        });
        if (this.form.radio == 1) {
          this.editableTabs_1 = this.pushArray1;
        } else {
          this.editableTabs_1 = this.pushArray2;
        }
      } else {
        this.$message({
          type: "warning",
          message: "不可以重复选课"
        });
      }
    },
    whereGo(a) {
      if (a == "2") {
        this.form.radio = 2;
      } else {
        this.form.radio == 1;
      }
      if (this.form.radio == 1) {
        this.editableTabs_1 = this.pushArray1;
      } else {
        this.editableTabs_1 = this.pushArray2;
      }
    },
    //学生姓名选择产生的变化
    handleChange(targetName) {
      var checkOne = this.options_1.filter(
        item => item.username == targetName[0]
      );
      console.log(checkOne);
      checkOne[0] &&
        this.editableTabs.push({
          student_name: checkOne[0].username,
          tel: checkOne[0].tel,
          student_id: checkOne[0].id
        });
      // this.student_data.push({student_id:checkOne[0].id})//注入学生id
    },
    toPlanClass() {
      this.$router.push({ name: "ApplicationAdd" });
    },
    toNeedsList() {
      this.$router.push({ name: "ApplyNeedsList" });
    },
    onSubmit(form2) {
      this.$refs[form2].validate(valid => {
        if (valid) {
          this.parms = {
            title: this.form.title,
            expiry_date: this.form.valueDate,
            remarks: this.form.feedback,
            course_address: this.form.radio,
            address: this.form.address.toString(),
            need_one: this.form2.need_one,
            need_two: this.form2.need_two,
            need_three: this.form2.need_three,
            need_four: this.form2.need_four,
            // need_five: this.form2.need_five,
            app_id: this.$route.query.id,
            students_data: [],
            subjects_data: []
          };
          this.parms.subjects_data = this.subjects_data;
          this.parms.students_data = this.students_data;
          this.$apis.common.application_edit_put(this.parms).then(res => {
            if (res.data.code == 1) {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.active = 3;
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning"
              });
            }
          });
        } else {
          this.$message({
            message: "请按提示填写内容",
            type: "warning"
          });
          return false;
        }
      });
    },
    next(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.editableTabs_1.forEach(item => {
            this.subjects_data.push({
              subject_id: item.subject_id,
              classhour: item.classhour,
              price: item.price,
              amount: item.classhour * item.price,
              course_type: item.course_type,
              course_id: item.course_id,
              is_one: item.is_one,
              is_group: item.is_group
            });
          });
          this.editableTabs.forEach(item => {
            this.students_data.push({
              student_id: item.student_id
            });
          });
          this.editableTabs_1.forEach((item, i) => {
            if (item.course_id == 1) {
              this.parms = {
                title: this.form.title,
                expiry_date: this.form.valueDate,
                remarks: this.form.feedback,
                course_address: this.form.radio,
                address: this.form.address.toString(),
                need_one: this.form2.need_one,
                need_two: this.form2.need_two,
                need_three: this.form2.need_three,
                need_four: this.form2.need_four,
                need_five: this.form2.need_five,
                app_id: this.$route.query.id
              };
              this.parms.subjects_data = this.subjects_data;
              this.parms.students_data = this.students_data;
              this.$apis.common.application_edit_put(this.parms).then(res => {
                if (res.data.code == 1) {
                  this.$message({
                    message: "修改成功",
                    type: "success"
                  });
                  this.active = 3;
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "warning"
                  });
                }
              });
            }
          });
          this.active++;
        } else {
          this.$message({
            type: "warning",
            message: "请按照提示进行完善"
          });
          return false;
        }
      });
    },
    pre() {
      console.log(this.parms);
      this.parms.students_data = [];
      this.parms.subjects_data = [];
      this.students_data = [];
      this.subjects_data = [];
      this.active--;
    },

    goBack() {
      history.back(-1);
    }, // 复制链接
    copyUrl() {
      let url = studens_url.student_url + "login/1/" + this.money;
      let oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value);
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        message: url + "已成功复制到剪切板",
        type: "success"
      });
      this.money = "";
      oInput.remove();
    },
    getdataCookie(cname) {
      // return 1
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      // this.$router.push({path:'/login'})
    }
  }
};
</script>
<style scoped>
.goBack{
  position: absolute;
  bottom:10px;
  right:0;
  left:0;
  margin:0 auto;
}
/* *{
       padding:0;
       margin:0;
     } */
option {
  /* height: 100%;
       width:100%; */
  /* appearance: none;   */
  border: none;
  font-size: 16px;
}
.add_ul p {
  list-style: none;
  display: inline-block;
  background-color: #fff;
  padding: 0;
  margin-right: -5px;
  width: 8%;
  border: 1px solid silver;
  text-align: center;
}
.add_ul p:nth-child(1) {
  width: 14%;
}

.add_ul_new p:nth-child(1) {
  width: 14%;
}
.add_ul_new p {
  list-style: none;
  display: inline-block;
  background-color: #fff;
  padding: 0;
  margin-right: -5px;
  width: 8%;
  border: 1px solid silver;
  text-align: center;
}
.add_ul_2 p {
  list-style: none;
  display: inline-block;
  background-color: #fff;
  padding: 0;
  margin-right: -5px;
  width: 12%;
  border: 1px solid silver;
  text-align: center;
}

.stap_3 {
  width: 100%;
}
.succ_tip {
  width: 80%;
  margin: 30px auto;
  text-align: center;
  font-size: 40px;
  color: green;
  height: 80px;
}
.succ_word {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 25px;
}
select {
  border: none;
  width: 80%;
  height: 40px;
  text-align: center;
}
p {
  cursor: pointer;
}
</style>

