<template>
  <div class="main">
                <zx-head title="编辑排课需求" ></zx-head>

    <el-steps :active="active" finish-status="success">
      <el-step title="填写报名情况"></el-step>
      <el-step title="填写需求情况"></el-step>
      <el-step title="填写完成"></el-step>
    </el-steps>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px" v-if="active==1">
      <el-form-item label="报名编号">
        <!-- 报名编号每次从后台拉取+1 -->
        <p>{{this.edit_data.number}}</p>
        <!-- <el-input v-model="form.data_number" ></el-input> -->
      </el-form-item>
      <el-form-item label="报名标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
        <el-form-item label="上课地点" prop="radio">
          <el-radio-group v-model="form.radio" @change="whereGo(form.radio)">
            <el-radio  :label="1">线上</el-radio>
            <el-radio  :label="2">线下</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上课地址" width="200px" v-if="form.radio==2" prop="address">
          <!-- <el-cascader placeholder="支持到地级市" v-model="form.address" :options="address_check" filterable></el-cascader> -->
      <el-input v-model="form.address"></el-input>
        </el-form-item>
      <el-form-item :inline="true" label="报读科目" prop="value">
        <el-cascader
          v-model="form.value"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          :show-all-levels="false"
          @change="handleChange_1"
          
          filterable
        ></el-cascader>
      </el-form-item>

      <el-form-item :inline="true" label="已排课时">
        <div class="add_ul">
          <p id="sss">科目</p>
          <p>课时</p>
          <p>单价(元)</p>
          <p >总额</p>
          <p>课程性质</p>
          <p>班课</p>
          <p>一对一</p>
          <p>自组班课</p>
          <p>操作</p>
        </div>
        <div class="add_ul_new" v-for="(item,i) in editableTabs_1" :key="i">
          <p>{{item.subject_name}}</p>
          <span style="display:none;" v-bind:id="'course_id'+ i">{{item.course_id}}</span>
          <p>
            <el-input v-model="item.classhour" v-bind:id="'time' + i" placeholder="课时"></el-input>
          </p>
          <p>
            <el-input v-model.number="item.price" v-bind:id="'mach' + i" placeholder="单价(元)"></el-input>
          </p>
              <p v-if="item.price&&item.classhour">
            {{item.price*item.classhour}}
          </p>
           <p v-if="item.price==''||item.classhour==''">
            待填充
          </p>
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
          <p  ><el-button @click="deleteTest_1(i)" size='mini' style="color:white;background-color:#e6563a;">撤销</el-button></p>
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
        <div class="add_ul_2">
          <p>学生姓名</p>
          <p>手机号</p>
          <p>操作</p>
        </div>
        <div class="add_ul_2" v-for="(item,i) in editableTabs" :key="i">
          <span style="display:none;" v-bind:id="'students'+ i">{{item.id}}</span>
          <p>{{ item.student_name}}</p>
          <p>{{item.tel}}</p>
           <p  ><el-button @click="deleteTest(i)" size='mini' style="color:white;background-color:#e6563a;">撤销</el-button></p>

          <!-- <p @click=" deleteTest" style="cursor:pointer;color:white;background-color:#e6563a;">撤销</p> -->
        </div>
      </el-form-item>

      <el-form-item label="有效期限">
        <p>：{{ this.form.valueDate }}</p>
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

      </el-form>
    </div>
    <!-- 步骤三 -->
    <div v-if="active==3">
      <div class="succ_tip">
        提交成功
        <i class="el-icon-circle-check" type="success"></i>
      </div>
      <div class="succ_word">
        <el-button type="primary" style="background-color:#409eff;color:white;border:1px solid #409eff;" @click="toPlanClass">继续添加报名需求</el-button>
        <el-button type="primary" style="background-color:#409eff;color:white;border:1px solid #409eff;" @click="toNeedsList">查看排课需求列表</el-button>
      </div>
    </div>

    <el-button style="margin-top: 12px;" @click="pre" v-if="active==2">上一步</el-button>
    <el-button style="margin-top: 12px;" @click="next('form')" v-if="active==1">下一步</el-button>
    <el-button type="primary" @click="onSubmit('form2')"  v-if="active==2"> 确 定 </el-button>
        <el-button @click="goBack" v-if="active==1||active==2">取消</el-button>

    <!-- 设置充值链接 -->
    <!-- <div style="display:none" cols="20" id="biao1">{{copyurl1}}</div> -->
  </div>
</template>

<script>
import studens_url from "../../config/config";
import { mapState } from 'vuex'
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
      address_check:[], //上课地址数组
      form: {
        title: "", //标题
        value: "",  //报读科目
        value_1: "", //学生姓名
        valueDate: "", //有效期限
        feedback:"", //备注说明
        radio: "", //上课地点的选择
        address: "", //上课地址
      },
      form2:{
        need_one: "",
        need_two: "",
        need_three: "",
        need_four: "",

      },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
 
          valueDate: [
            { required: true, message: '请选择有效期限', trigger: 'change' }
          ],
          feedback: [
            { required: true, required: true, message: '请填写备注说明', trigger: 'blur' }
          ],
          radio: [
            { required: true, message: '请选择上课地点', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请填写上课地址', trigger: 'change' }
          ],
          need_one: [
            { required: true, required: true, message: '请填写反馈', trigger: 'blur' }
          ],
          need_two: [
            { required: true, required: true, message: '请填写反馈', trigger: 'blur' }
          ],
          need_three: [
            { required: true, required: true, message: '请填写反馈', trigger: 'blur' }
          ],
          need_four: [
            { required: true, message: '请填写反馈', trigger: 'blur' }
          ],

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
    ...mapState(['region_list'])
  },
  mounted() {
      let getId = arr => {
    arr.forEach(v => {
              v.value=v.label
        if (v.children instanceof Array) {
            getId(v.children)
        }
    });
}
getId(this.region_list);
        this.address_check = this.region_list;
  },
  methods: {
    //生成学员编号
    deleteTest_1(index) {
      this.editableTabs_1.splice(index,1);
      this.form.value=[]
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
          this.form.radio=this.edit_data.needs_data.course_address;
          this.form.address=this.edit_data.needs_data.address;

          this.form2.need_one = this.edit_data.needs_data.need_one;
          this.form2.need_two = this.edit_data.needs_data.need_two;
          this.form2.need_three = this.edit_data.needs_data.need_three;
          this.form2.need_four = this.edit_data.needs_data.need_four;
          // this.radio=this.edit_data.needs_data.course_address  这里是用户在线上还是线下
          this.editableTabs_1 = this.edit_data.subjects_data; //学科数据
          this.editableTabs = this.edit_data.students_data; //学生数据
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
              let addWord=arr=>{
            arr.forEach(item=>{
              item.value=item.subject_name,
              item.label=item.subject_name
            if(item.children instanceof Array){
                addWord(item.children)
            }
          })
          }
          addWord(this.options_)
           this.options=this.options_  
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
        return (res.label == lastName);
      });
            if(this.editableTabs_1.length<1){

        this.pushArray1.push({
          subject_name: needArr.label,
          subject_id: needArr.value, //科目id
          classhour: "",
          amount:'',
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
        amount:'',
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
          message:"你只能选择一种科目"
        })
      }
            }else{
                this.$message({
          type:'warning',
          message:"不可以重复选课"
        })
      }
    },
            whereGo(a) {
      if (a == "2") {
        this.form.radio = 2;


      } else {
       this.form.radio==1
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
      checkOne[0]&&this.editableTabs.push({
        student_name: checkOne[0].username,
        tel: checkOne[0].tel,
        student_id: checkOne[0].id
      });
      // this.student_data.push({student_id:checkOne[0].id})//注入学生id
    },
    toPlanClass(){
      this.$router.push({name:'ApplicationAdd'})
    },
    toNeedsList(){
      this.$router.push({name:'ApplyNeedsList'})
    },
    onSubmit(form2) {
                 this.$refs[form2].validate((valid) => {
          if (valid) {
      this.parms = {
        title: this.student_name+this.subject_name,
        expiry_date: this.form.valueDate,
        remarks: this.form.feedback,
        course_address: this.form.radio,
        address: this.form.address.toString(),
        need_one: this.form2.need_one,
        need_two: this.form2.need_two,
        need_three: this.form2.need_three,
        need_four: this.form2.need_four,
        app_id: this.$route.query.id,
        students_data: [],
        subjects_data: [],
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
        }else{
            this.$message({
            message:res.data.msg,
            type: "warning"
          });
        }
      });
        } else {
                 this.$message({
                message:'请按提示填写内容',
                type: "warning"
              });
            return false;
          }
        });
    },
  next(form) {
            this.$refs[form].validate((valid) => {
          if (valid) {
      this.editableTabs_1.forEach(item => {
        this.subjects_data.push({
          subject_id: item.subject_id,
          classhour: item.classhour,
          price: item.price,
          amount: item.classhour*item.price,
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
   this.editableTabs_1.forEach((item,i) => {
        if (item.course_id==1) {
          this.parms = {
         title: this.student_name+this.subject_name,
        expiry_date: this.form.valueDate,
        remarks: this.form.feedback,
        course_address: this.form.radio,
        address: this.form.address.toString(),
        need_one: this.form2.need_one,
        need_two: this.form2.need_two,
        need_three: this.form2.need_three,
        need_four: this.form2.need_four,
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
            }else{
                this.$message({
                message:res.data.msg,
                type: "warning"
              });
            }
          });
        } 
      })
      this.active++;
      } else {
       this.$message({
         type:"warning",
         message:'请按照提示进行完善'
       })           
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
p{
  cursor:pointer;
}
</style>

