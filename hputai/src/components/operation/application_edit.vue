<template>
  <div class="main">
    <div class="main_head">|&nbsp;编辑报名需求</div>
    <el-steps :active="active" finish-status="success">
      <el-step title="填写报名情况"></el-step>
      <el-step title="填写需求情况"></el-step>
      <el-step title="填写完成"></el-step>
    </el-steps>
    <el-form  label-width="120px" v-if="active==1">
      <el-form-item label="报名编号">
        <!-- 报名编号每次从后台拉取+1 -->
        <p>{{this.edit_data.number}}</p>
        <!-- <el-input v-model="form.data_number" ></el-input> -->
      </el-form-item>
      <el-form-item label="报名标题">
        <el-input v-model="title"></el-input>
      </el-form-item>

      <el-form-item :inline="true" label="报读科目">
        <!-- <span class="demonstration">hover 触发子菜单</span> -->
        <!-- 用el-autocomplete -->
        <el-cascader
          v-model="value"
          :options="options"
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
          <!-- <p @click="milti">总额</p> -->
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
          <p @click=" deleteTest_1" style="cursor:pointer;">撤销</p>
        </div>
      </el-form-item>
      <el-form-item label="学生姓名">
        <el-cascader
          placeholder="输入学生姓名"
          v-model="value_1"
          :options="options1"
          @change="handleChange"
          filterable
        ></el-cascader>
        <div class="add_ul">
          <p>学生姓名</p>
          <p>手机号</p>
          <p>操作</p>
        </div>
        <div class="add_ul_new" v-for="(item,i) in editableTabs" :key="i">
          <span style="display:none;" v-bind:id="'students'+ i">{{item.id}}</span>
          <p>{{ item.student_name}}</p>
          <p>{{item.tel}}</p>
          <p @click=" deleteTest" style="cursor:pointer;">撤销</p>
        </div>
      </el-form-item>

      <el-form-item label="有效期限">
        <p>：{{ this.valueDate }}</p>
        <el-date-picker v-model="valueDate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="备注说明">
        <el-input type="textarea" v-model="feedback"></el-input>
      </el-form-item>
    </el-form>
    <!-- 步骤二 -->
    <div v-if="active==2">
      <el-form>
        <el-form-item label="上课地点" >
          <el-radio v-model="radio" label="1">线上</el-radio>
          <el-radio v-model="radio" label="2">线下</el-radio>
        </el-form-item>
        <el-form-item label="需求1">
          <el-input
            type="textarea"
            v-model="need_one"
            maxlength="100"
            show-word-limit
            placeholder="学生排课项目、科目、考局（A-level必写）及课时"
          ></el-input>
        </el-form-item>
        <el-form-item label="需求2">
          <el-input
            type="textarea"
            v-model="need_two"
            placeholder="学生学习需求是什么？（零基础先修、同步辅导、巩固复习、强化冲刺）"
          ></el-input>
        </el-form-item>
        <el-form-item label="需求3">
          <el-input
            type="textarea"
            v-model="need_three"
            placeholder="学生之前的学习经历和学习基础（之前在那里上的学？学习基础怎么样？）"
          ></el-input>
        </el-form-item>
        <el-form-item label="需求4">
          <el-input type="textarea" v-model="need_four" placeholder="学生希望跟什么样的老师学习？"></el-input>
        </el-form-item>
        <el-form-item label="需求5">
          <el-input type="textarea" v-model="need_five" placeholder="学生上课时间期限，可排课时间？（北京时间）每次课上几小时？"></el-input>
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
        <el-link icon="el-icon-edit" type="primary" href="./ApplicationAdd">继续添加排课需求</el-link>
        <el-link type="primary" href="./ApplicationAdd">
          查看排课需求列表
          <i class="el-icon-view el-icon--right"></i>
        </el-link>
      </div>
    </div>

    <el-button @click="goBack" v-if="active==1||active==2">取消</el-button>
    <el-button style="margin-top: 12px;" @click="pre" v-if="active==2||active==3">上一步</el-button>
    <el-button style="margin-top: 12px;" @click="next" v-if="active==1">下一步</el-button>
    <el-button type="primary" @click="onSubmit" style="" v-if="active==2">立即创建</el-button>
    <!-- 设置充值链接 -->
    <!-- <div style="display:none" cols="20" id="biao1">{{copyurl1}}</div> -->
  </div>
</template>

<script>
import studens_url from "../../config/config";
export default {
  data() {
    return {
      input: "",
      input1: "",
      input2: "",
      value:"", //选择科目的值
      value_1: "",
      valueDate: "",
      active: 1,
      edit_data:{},  //从编辑得来的数据
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
      radio: '1', //上课地点的选择
      editableTabs_1: [],
      editableTabs: [
        //新增的内容的数据数组(学生)
      ],
      tabIndex: 0,
      tabIndex_1: 0,
      students_data: [], //用户id
      subjects_data: [], //学科数据
      feedback: "", //反馈
      course_address: "", //上课地址
      title: "", //标题
      need_one: "",
      need_two: "",
      need_three: "",
      need_four: "",
      need_five: ""
    };
  },
  created() {
    this.getdata();
    // this.getStudent();
  },
  computed: {

  },
  mounted() {},
  methods: {
    //生成学员编号

    deleteTest_1() {
      this.editableTabs_1.pop(this.editableTabs_1);
    },
    deleteTest() {
      this.editableTabs.pop(this.tabIndex);
    },
    getdata() {
      let parms = {
        admin_id: this.getdataCookie("admin_id")
      };
        let parms1 = {
       id:this.$route.query.id
      };
      this.$apis.menber.application_edit(parms1).then(res=>{
        if(res.data.code==1){   //从编辑的位置获取之前的信息
            this.edit_data=res.data.data
            this.title=this.edit_data.title
            this.feedback=this.edit_data.remarks
              console.log(res.data.data)
              this.valueDate=res.data.data.expiry_date
              this.need_one=this.edit_data.needs_data.need_one
              this.need_two=this.edit_data.needs_data.need_two
              this.need_three=this.edit_data.needs_data.need_three
              this.need_four=this.edit_data.needs_data.need_four
              this.need_five=this.edit_data.needs_data.need_five
            // this.radio=this.edit_data.needs_data.course_address  这里是用户在线上还是线下
               this.editableTabs_1=this.edit_data.subjects_data  //学科数据
            this.editableTabs=this.edit_data.students_data    //学生数据
            let subArr =this.edit_data.subjects_data  //原学科数据的数组
                // console.log(subArr)   //需要用户科目  手机号  学生姓名的id
                // console.log(this.editableTabs)//在这里循环得到想要的数据
        }
      })
      //获取科目的数据
      this.$apis.common.subject_list(parms).then(res => {
        if (res.data.code == 1) {
          this.msg = res.data;
          this.options_ = res.data.data;
          for (let i = 0; i < this.options_.length; i++) {
            var val = this.options_[i];
            var children = [];
            if (val.children) {
              for (let j = 0; j < val.children.length; j++) {
                var val1 = val.children[j];
                children.push({
                  value: val1.subject_name,
                  label: val1.subject_name
                });
              }
              this.options.push({
                value: val.subject_name,
                label: val.subject_name,
                children: children
              });
            } else {
              this.options.push({
                value: val.subject_name,
                label: val.subject_name
              });
            }
          }
        }
      });
    },
    createStudent() {
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
      var lastName = targetName.length == 1 ? targetName[0] : targetName[1];
      let oneArr = this.options_.filter(item => item.subject_name == lastName);
      if (oneArr.length == 0) {
        for (let i = 0; i < this.options_.length; i++) {
          var val = this.options_[i];
          if (val.children) {
            //如果有子元素
            var val_1 = val.children.filter(item => item);
            // if(val_1.length==1){
            let oneArr_1 = val_1.filter(item => item.subject_name == lastName); //对子元素进行赛选
            if (oneArr_1.length > 0) {
              this.editableTabs_1.push({
                subject_name: oneArr_1[0].subject_name,
                subject_id: oneArr_1[0].id, //科目id
                classhour: 10,
                price: 1000,
                course_type: 0, //课程类型
                 course_id:0, //班课
                is_one: 1, //一对一？
                is_group: 0 //班课?
              });
            }
          }
        }
      } else {
        //没有子元素
        this.editableTabs_1.push({
                subject_name: oneArr[0].subject_name,
                subject_id: oneArr[0].id, //科目id
                classhour: 10,
                price: 1000,
                course_type: 0, //课程类型
                course_id:0, //班课
                is_one: 1, //一对一？
                is_group: 0 //自主班课?
        });
        // this.subject_id.push({student_id:checkOne[0].id})
      }
    },
    //学生姓名选择产生的变化
    handleChange(targetName) {
      console.log(this.writeCurrentDate());
      var checkOne = this.options_1.filter(
        item => item.username == targetName[0]
      );
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        student_name: targetName[0],
        tel: checkOne[0].tel,
        id: checkOne[0].id
      });
      // this.student_data.push({student_id:checkOne[0].id})//注入学生id
      this.editableTabsValue = newTabName;
    },

    onSubmit() {
      // for (let i = 0; i < this.editableTabs_1.length; i++) {}
      let parms = {
        title: this.title,
        expiry_date: this.valueDate,
        remarks: this.feedback,
        course_address: this.radio,
        need_one: this.need_one,
        need_two: this.need_two,
        need_three: this.need_three,
        need_four: this.need_four,
        need_five: this.need_five,
        app_id:this.$route.query.id
      };

      parms.subjects_data = this.subjects_data;
      parms.students_data = this.students_data;
      this.$apis.common.application_edit_put(parms).then(res => {
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
    },
    next() {
      for (let i = 0; i < this.editableTabs.length; i++) {
        this.students_data.push({
          student_id: $("#students" + i).html()
        });
      }
      for (let i = 0; i < this.editableTabs_1.length; i++) {
        this.subjects_data.push({
          subject_id: $("#course_id" + i).html() * 1,
          classhour: $("#time" + i).val() * 1,
          price: $("#mach" + i).val() * 1,
          amount: $("#time" + i).val() * $("#mach" + i).val(),
          course_type: $("#attr" + i).val()*1,
          course_id: $("#clas" + i).val()*1 ,
          is_one: $("#one" + i).val() * 1,
          is_group: $("#self" + i).val() * 1
        });
        console.log(this.subjects_data)
        if ($("#clas" + i).val() == 1) {
          // console.log($("#time"+i).val() + "  " + $("#mach"+i).val() + "  " + $("#sex"+i).val())
               let parms = {
        title: this.title,
        expiry_date: this.valueDate,
        remarks: this.feedback,
        course_address: this.radio,
        need_one: this.need_one,
        need_two: this.need_two,
        need_three: this.need_three,
        need_four: this.need_four,
        need_five: this.need_five,
        app_id:this.$route.query.id
      };

      parms.subjects_data = this.subjects_data;
      parms.students_data = this.students_data;
      this.$apis.common.application_edit_put(parms).then(res => {
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
          this.active = 3;
        } else {
          this.active++;
        }
      }
    },
    pre() {
      // if (
      this.active--;
      //    < 2)
      // this.active = 1
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
.main_head {
  margin: auto;
  width: 96%;
  height: 40px;
  font-size: 22px;
  font-weight: 900;
  margin: 0 2%;
  /* line-height: 30px; */
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

