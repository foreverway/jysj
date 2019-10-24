<template>
  <div class="main">
    <div class="main_head">|&nbsp;添加报名需求</div>
    <el-steps :active="active" finish-status="success">
      <el-step title="填写报名情况"></el-step>
      <el-step title="填写需求情况"></el-step>
      <el-step title="填写完成"></el-step>
    </el-steps>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px" v-if="active==1">
      <el-form-item label="报名编号">
        <p>{{this.writeCurrentDate()}}</p>
      </el-form-item>
      <el-form-item label="报名标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="上课地点" prop="radio">
        <el-radio-group v-model="form.radio" @change="whereGo(form.radio)">
          <el-radio :label="1">线上</el-radio>
          <el-radio :label="2">线下</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上课地址" v-if="show==true" prop="address">
        <el-cascader
          placeholder="支持到地级市"
          v-model="form.address"
          :options="address_check"
          filterable
        ></el-cascader>
      </el-form-item>
      <el-form-item :inline="true" label="报读科目" prop="value">
        <el-cascader
          v-model="form.value"
          :options="options"
          filterable
          :props="{ expandTrigger: 'hover' }"
          :show-all-levels="false"
          @change="handleChange_1"
          clearable
        ></el-cascader>
      </el-form-item>

      <el-form-item :inline="true" label="已选科目">
        <div class="add_ul">
          <p id="sss">科目</p>
          <p>课时</p>
          <p>单价(元)</p>
          <p>课程性质</p>
          <p>班课</p>
          <p>一对一</p>
          <p>自组班课</p>
          <p>操作</p>
        </div>
        <div class="add_ul_new" v-for="(item,i) in editableTabs_1" :key="i">
          <p>{{item.title}}</p>
          <span style="display:none;" v-bind:id="'course_id'+ i">{{item.subject_id}}</span>
          <p>
            <el-input v-model.number="item.classhour" v-bind:id="'time' + i" placeholder="课时"></el-input>
          </p>
          <p>
            <el-input v-model.number="item.price" v-bind:id="'mach' + i" placeholder="单价(元)"></el-input>
          </p>
          <!-- <p  v-bind:id="'all_mach' + i"  v-model=item.price>0</p> -->
          <p>
            <select v-model="item.course_type" v-bind:id="'attr' + i" placeholder="课程性质">
              <option label="试听" value="2"></option>
              <option label="正课" value="1"></option>
              <option label="辅导" value="3"></option>
            </select>
          </p>
          <p>
            <select v-model="item.course_id" v-bind:id="'clas' + i" placeholder="班课">
              <option label="否" value="0">否</option>
              <option label="是" value="1">是</option>
            </select>
          </p>
          <p>
            <select v-model="item.is_one" v-bind:id="'one' + i" placeholder="一对一">
              <option label="否" value="0"></option>
              <option label="是" value="1"></option>
            </select>
          </p>
          <p>
            <select v-model="item.is_group" v-bind:id="'self' + i" placeholder="自组班课">
              <option label="否" value="0"></option>
              <option label="是" value="1"></option>
            </select>
          </p>
          <p @click=" deleteTest_1" style="cursor:pointer;color:white;background-color:#e6563a;">撤销</p>
        </div>
      </el-form-item>
      <el-form-item label="学生姓名" prop="value_1">
        <el-cascader
          placeholder="输入学生姓名"
          v-model="form.value_1"
          :options="options1"
          @change="handleChange"
          filterable
          clearable
        ></el-cascader>
        <div class="add_ul">
          <p>学生姓名</p>
          <p>手机号</p>
          <p>操作</p>
        </div>
        <div class="add_ul_new" v-for="(item,i) in editableTabs" :key="i">
          <span style="display:none;" v-bind:id="'students'+ i">{{item.id}}</span>
          <p>{{item.name}}</p>
          <p>{{item.tel}}</p>
          <p @click=" deleteTest" style="cursor:pointer;">撤销</p>
        </div>
      </el-form-item>

      <el-form-item label="有效期限" prop="valueDate">
        <p>：{{ this.form.valueDate }}</p>

        <!-- <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期">
        </el-date-picker>-->
        <el-date-picker v-model="form.valueDate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注说明" prop="feedback">
        <el-input type="textarea" v-model="form.feedback"></el-input>
      </el-form-item>
    </el-form>

    <!-- 步骤二 -->
    <div v-if="active==2">
      <el-form ref="form2" :rules="rules" :model="form2">
        <el-form-item label="需求1" prop="need_one">
          <el-input
            type="textarea"
            v-model="form2.need_one"
            maxlength="100"
            show-word-limit
            placeholder="学生排课项目、科目、考局（A-level必写）及课时"
          ></el-input>
        </el-form-item>
        <el-form-item label="需求2" prop="need_two">
          <el-input
            type="textarea"
            v-model="form2.need_two"
            placeholder="学生学习需求是什么？（零基础先修、同步辅导、巩固复习、强化冲刺）"
          ></el-input>
        </el-form-item>
        <el-form-item label="需求3" prop="need_three">
          <el-input
            type="textarea"
            v-model="form2.need_three"
            placeholder="学生之前的学习经历和学习基础（之前在那里上的学？学习基础怎么样？）"
          ></el-input>
        </el-form-item>
        <el-form-item label="需求4" prop="need_four">
          <el-input type="textarea" v-model="form2.need_four" placeholder="学生希望跟什么样的老师学习？"></el-input>
        </el-form-item>
        <el-form-item label="需求5" prop="need_five">
          <el-input
            type="textarea"
            v-model="form2.need_five"
            placeholder="学生上课时间期限，可排课时间？（北京时间）每次课上几小时？"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 步骤三 -->
    <div v-if="active==3">
      <div class="succ_tip">
        提交成功
        <i class="el-icon-circle-check" type="success"></i>
      </div>
      <div class="succ_word">
        <el-button
          type="primary"
          style="background-color:#409eff;color:white;border:1px solid #409eff;"
          @click="toPlanClass"
        >继续添加报名需求</el-button>
        <el-button
          type="primary"
          style="background-color:#409eff;color:white;border:1px solid #409eff;"
          @click="toNeedsList"
        >查看排课需求列表</el-button>
      </div>
    </div>
    <el-button
      style="margin-top: 12px;background-color:#e6563a; border:none;color:white;"
      @click="pre"
      v-if="active==2"
    >上一步</el-button>
    <el-button
      style="margin-top: 12px;background-color:#e6563a; border:none;color:white;"
      @click="next('form')"
      v-if="active==1"
    >下一步</el-button>
    <el-button
      type="primary"
      style="background-color:#e6563a; border:none;color:white;"
      @click="onSubmit('form2')"
      v-if="active==2"
    >确 定</el-button>
    <el-button @click="goBack" v-if="active==1||active==2">取消</el-button>

    <!-- 设置充值链接 -->
    <!-- <div style="display:none" cols="20" id="biao1">{{copyurl1}}</div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import studens_url from "../../config/config";
export default {
  data() {
    return {
      show: "false",
      address_check: [], //上课地址的数据
      input: "",
      input1: "",
      input2: "",
      active: 1,
      form: {
        title: "", //标题
        value: "", //报读科目
        value_1: "", //学生姓名
        valueDate: "", //有效期限
        feedback: "", //备注说明
        radio: 1, //上课地点的选择
        address: "" //上课地址
      },
      form2: {
        need_one: "",
        need_two: "",
        need_three: "",
        need_four: "",
        need_five: ""
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        value: [
          { required: true, message: "请选择报读科目", trigger: "change" }
        ],
        value_1: [
          { required: true, message: "请选择学生姓名", trigger: "change" }
        ],
        valueDate: [
          { required: true, message: "请选择有效期限", trigger: "change" }
        ],
        feedback: [
          {
            required: true,
            required: true,
            message: "请填写备注说明",
            trigger: "blur"
          }
        ],
        radio: [
          { required: true, message: "请选择上课地点", trigger: "change" }
        ],
        address: [
          { required: true, message: "请填写上课地址", trigger: "change" }
        ],
        need_one: [
          {
            required: true,
            required: true,
            message: "请填写反馈",
            trigger: "blur"
          }
        ],
        need_two: [
          {
            required: true,
            required: true,
            message: "请填写反馈",
            trigger: "blur"
          }
        ],
        need_three: [
          {
            required: true,
            required: true,
            message: "请填写反馈",
            trigger: "blur"
          }
        ],
        need_four: [{ required: true, message: "请填写反馈", trigger: "blur" }],
        need_five: [{ required: true, message: "请填写反馈", trigger: "blur" }]
      },
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

      editableTabs_1: [],
      pushArray1: [], //线上数组
      pushArray2: [], //线下数组
      editableTabs: [
        //新增的内容的数据数组(学生)
      ],
      tabIndex: 0,
      tabIndex_1: 0,
      students_data: [], //用户id
      subjects_data: [], //学科数据
      feedback: "", //反馈
      course_address: "" //上课线上或线下
    };
  },
  created() {
    this.getdata();
    this.getStudent();
  },
  computed: {
    //     sum:function () {
    //       for(let i=0 ; i<this.editableTabsValue_1.length; i++){
    //           return $("#time"+i).val()*$("#mach"+i).val()
    //               }
    //  }
    ...mapState(["region_list"])
  },
  mounted() {},
  methods: {
    whereGo(a) {
      if (a == "2") {
        this.show = true;
        this.address_check = this.region_list;
      } else {
        this.show = false;
      }
      if (this.form.radio == 1) {
        this.editableTabs_1 = this.pushArray1;
      } else {
        this.editableTabs_1 = this.pushArray2;
      }
    },
    //生成学员编号
    writeCurrentDate() {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth(); //得到月份
      var date = now.getDate(); //得到日期
      var day = now.getDay(); //得到周几
      var hour = now.getHours(); //得到小时
      var minu = now.getMinutes(); //得到分钟
      var sec = now.getSeconds(); //得到秒
      month = month + 1;
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      if (hour < 10) hour = "0" + hour;
      if (minu < 10) minu = "0" + minu;
      if (sec < 10) sec = "0" + sec;
      var time = "";
      time = year + "" + month + date + hour + minu;
      let timer = JSON.parse(time);
      return timer;
      // //设置得到当前日期的函数的执行间隔时间，每1000毫秒刷新一次。
      // var timer = setTimeout("writeCurrentDate()", 1000);
    },

    //获取报读科目列表
    addTest() {
      // alert()
    },
    deleteTest_1() {
      this.editableTabs_1.pop(this.editableTabs_1);
      this.form.value=''
    },
    deleteTest() {
      this.editableTabs.pop(this.tabIndex);
    },
    result() {
      for (let i = 0; i < this.items_add.length; i++) {}
    },
    getdata() {
      let parms = {
        admin_id: this.getdataCookie("admin_id")
      };
      //整理获取科目的数据
      this.$apis.common.subject_list(parms).then(res => {
        if (res.data.code == 1) {
          this.msg = res.data;
          this.options_ = res.data.data;
          // console.log(this.options_)
          for (let i = 0; i < this.options_.length; i++) {
            var val = this.options_[i];
            let children = [];
            if (val.children) {
              //如果有子元素
              for (let j = 0; j < val.children.length; j++) {
                //对子元素进行遍历
                var val1 = val.children[j];
                if (val1.children) {
                  //如果子元素有子元素
                  //let children =[]
                  for (let g = 0; g < val1.children.length; g++) {
                    //对子元素进行遍历
                    var val2 = val1.children[g];
                    //console.log(val2)
                    children.push({
                      value: val1.subject_name,
                      label: val1.subject_name,
                      children: [
                        {
                          //将孙级添加到父级相对应的位置下
                          value: val2.subject_name,
                          label: val2.subject_name
                        }
                      ]
                    });
                    this.options.push({
                      value: val.subject_name,
                      label: val.subject_name,
                      children: children
                    });
                  }
                } else {
                  children.push({
                    value: val1.subject_name,
                    label: val1.subject_name
                  });
                  this.options.push({
                    value: val.subject_name,
                    label: val.subject_name,
                    children: children
                  });
                }
              }
            } else {
              this.options.push({
                value: val.subject_name,
                label: val.subject_name
              });
            }
          }
          //console.log(this.options)
        }
      });
    },
    createStudent() {
      // var checkVal=document.getElementsByClassName("checkVal")
      // console.log(checkVal)  /api_students_data
    },

    //获取学生列表
    getStudent() {
      // let parms = {
      //   admin_id: this.getdataCookie("admin_id")
      // };
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
      let ifCheck=this.editableTabs_1.filter(res=>{
       return res.title==lastName.toString()
      })
      if(ifCheck.length==0){
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
        title: needArr.label,
        subject_id: needArr.value, //科目id
        classhour: "",
        price: needArr.online_price,
        course_type: 0, //课程类型
        course_id: 0, //班课
        is_one: 1, //一对一？
        is_group: 0 //自主班课?
      });
      this.pushArray2.push({
        title: needArr.label,
        subject_id: needArr.value, //科目id
        classhour: "",
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
      }else{
        this.$message({
          type:'warning',
          message:"不可以重复选课"
        })
      }

    },
    //学生姓名选择产生的变化
    handleChange(targetName) {
      //console.log(this.writeCurrentDate());
      var checkOne = this.options_1.filter(
        item => item.username == targetName[0]
      );
      this.editableTabs.push({
        name: targetName[0],
        tel: checkOne[0].tel,
        id: checkOne[0].id
      });
    },
    toPlanClass() {
      this.$router.go(0);
    },
    toNeedsList() {
      this.$router.push({ name: "ApplyNeedsList" });
    },
    onSubmit(form2) {
      this.$refs[form2].validate(valid => {
        if (valid) {
          let parms = {
            title: this.form.title,
            expiry_date: this.form.valueDate,
            remarks: this.form.feedback,
            course_address: this.form.radio,
            address: this.form.address,
            need_one: this.form2.need_one,
            need_two: this.form2.need_two,
            need_three: this.form2.need_three,
            need_four: this.form2.need_four,
            need_five: this.form2.need_five
          };

          parms.subjects_data = this.subjects_data;
          parms.students_data = this.students_data;
          this.$apis.common.application_add(parms).then(res => {
            if (res.data.code == 1) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.active = 3;
            } else {
              this.$message({
                message: res.data.msg,
                type: "success"
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
              amount: item.amount,
              course_type: item.course_type,
              course_id: item.course_id,
              is_one: item.is_one,
              is_group: item.is_group
            });
          });
          this.editableTabs.forEach(item => {
            this.students_data.push({
              student_id: item.id
            });
          });
          this.editableTabs_1.forEach((item, i) => {
            //console.log(this.subjects_data)
            if (item.course_id == 1) {
              this.parms = {
                title: this.form.title,
                expiry_date: this.form.valueDate,
                remarks: this.form.feedback,
                course_address: this.form.radio,
                address: this.form.address,
                need_one: this.form2.need_one,
                need_two: this.form2.need_two,
                need_three: this.form2.need_three,
                need_four: this.form2.need_four,
                need_five: this.form2.need_five,
                app_id: this.$route.query.id
              };

              this.parms.subjects_data = this.subjects_data;
              this.parms.students_data = this.students_data;
             // console.log(this.parms);
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
select {
  border: none;
  width: 80%;
  height: 40px;
  text-align: center;
}
.main_head {
  margin: auto;
  width: 96%;
  height: 40px;
  font-size: 22px;
  font-weight: 900;
  margin: 0 2%;
}

option {

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
</style>

