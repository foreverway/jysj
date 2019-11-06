<template>
  <div class="main">
                <zx-head title="编辑排课信息" ></zx-head>

    <!--  <el-input  style="width:200px" v-model="money"  placeholder="请输入充值金额" ></el-input>
    <el-button type="primary" v-show="money>0" @click="copyUrl">生成并复制充值链接</el-button>-->

    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题">
        <!-- 标题是从上一个页面拉去过来的信息 -->
        <p style="width:200px;display:inline-block;">{{this.form.title}}</p>
        <el-button type="primary" plain @click="seeApplyTable(2)">查看报名表</el-button>
        <el-button type="primary" plain @click="seeClassNeeds(2)">查看排课需求</el-button>
      </el-form-item>
      <el-form-item :inline="true" label="直播平台">
        <el-select v-model="form.live_id" clearable filterable placeholder="请选择">
          <el-option
            v-for="item in this.live_list_new"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @change="handleChange_live"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :inline="true" label="讲师">
        <el-select v-model="form.teacher_id" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in this.teacher_data_new"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @change="handleChange_teacher"
          ></el-option>
        </el-select>
        <el-button type="primary" plain @click="seeTeacherClass(2)">查看老师课表</el-button>
      </el-form-item>
      <el-form-item :inline="true" label="班主任">
        <el-select v-model="form.banzhuren_id" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in this.banzhuren_list_new"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @change="handleChange_banzhuren"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :inline="true" label="助教">
        <el-select v-model="form.zhujiao_id" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in this.zhujiao_data_new"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @change="handleChange_help"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :inline="true" label="教务专员">
        <!-- <span class="demonstration">hover 触发子菜单</span> -->
        <!-- 用el-autocomplete -->
        <el-select v-model="form.jiaowu_id" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in this.jiaowu_data_new"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @change="handleChange_money"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :inline="true" label="课时">
        <p>{{this.form.classhour}}</p>
      </el-form-item>
      <!-- <el-form-item label="上课地点">
        <el-radio-group v-model="form.course_address" @change="whereGo(form.course_address)">
          <el-radio :label="1">线上</el-radio>
          <el-radio :label="2">线下</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上课地址" v-if="show==true">
        <el-cascader placeholder="支持到地级市" :options="address_check" filterable></el-cascader>
      </el-form-item> -->
      <el-form-item label="学生姓名">
        <div class="add_ul">
          <p>学生姓名</p>
          <p>课表</p>
        </div>
        <!-- 学生在这里刷新 -->
        <div class="add_ul" v-for="(item,index) in this.apply_data.students" :key="index">
          <p>{{item.student_name?item.student_name:"姓名未登记"}}</p>
          <p>
            <el-button type="text" @click="seeStudentClass(item.student_id,item.student_name)">查看课表</el-button>
          </p>
        </div>
      </el-form-item>

      <el-form-item :inline="true" label="已排课时">
        <div class="add_ul">
          <p id="sss">课时</p>
          <p >开始时间</p>
          <p >星期</p>
          <p>直播类型</p>
          <p>观看端</p>
          <p>操作</p>
          <p style="border:none;background-color:rgba(0,0,0,0);">
            <el-button type="primary" @click="handleChange_1">新增</el-button>
          </p>
        </div>
        <template></template>
        <div class="add_ul_new" v-for="(item,i) in editableTabs_1" :key="i">
          <span style="display:none;" v-bind:id="''+ i">{{item.course_id}}</span>
          <p>
            <el-input
              v-model.number="item.classhour"
              v-bind:id="'classhour' + i"
              placeholder="排几节课?"
            ></el-input>
          </p>
          <p>
            <!-- <el-input v-model.number="item.price" v-bind:id="'mach' + i" placeholder="单价(元)"></el-input> -->
            <el-date-picker
              v-model="item.start_time"
              v-bind:id="'start_time' + i"
              type="datetime"
              placeholder="开始日期"
            ></el-date-picker>
          </p>
          <p>

            <el-input v-model.number="item.week"  v-bind:id="'end_time' + i" placeholder="星期"></el-input>
          </p>
          <p>
            <select
              v-model="item.course_type"
              v-bind:id="'course_type' + i"
              placeholder="班课"
              style="height:36px;border:none;"
            >
              <option label="直播类型是什么" value="8"></option>
              <option label="大班课" value="2">否</option>
              <option label="小班课" value="3">是</option>
              <option label="一对一" value="1">是</option>
            </select>
          </p>
          <p>
            <select
              v-model="item.play_type"
              v-bind:id="'play_type' + i"
              placeholder="班课"
              style="height:36px;border:none;"
            >
              <option label="在哪里观看" value="8"></option>
              <option label="WEB端" value="2">否</option>
              <option label="客户端" value="1">是</option>
            </select>
          </p>
          <p  ><el-button @click="deleteTest_1" size='mini' style="color:white;background-color:#e6563a;">撤销</el-button></p>
        </div>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="onSubmit">确认</el-button>

    <el-button @click="goBack">取消</el-button>
    <!-- 查看学生课表 -->
    <el-dialog title="提示" 
    :close-on-click-modal='false'
    :visible.sync="stu_centerDialogVisible" width="60%" center>
      <span>{{this.seestudentname}}学生课表</span>
      <el-table :data="seestudentclass" border>
        <el-table-column property="subject_name" label="科目"></el-table-column>
        <el-table-column property="course_address" label="类型"></el-table-column>
        <el-table-column property="address" label="省"></el-table-column>
        <el-table-column property="address" label="市"></el-table-column>
        <el-table-column property="address" label="区"></el-table-column>
        <el-table-column property="start_time" label="开始时间"></el-table-column>
        <el-table-column property="end_time" label="结束时间"></el-table-column>
        <el-table-column property="teacher_name" label="老师"></el-table-column>
        <el-table-column property="banzhuren_name" label="班主任"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 查看报名表 -->
    <el-dialog title="查看报名表" 
    :close-on-click-modal='false'
    :visible.sync="dialogTableVisible_seeapplytable">
      <el-form ref="form" label-width="120px">
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="参数:">
          <p>内容</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="编号:">
          <p>{{seeapplytable.number}}</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="报名表标题:">
          <p>{{seeapplytable.title?seeapplytable.title:"未安排"}}</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="栏目:">
          <p>{{seeapplytable.live_name?seeapplytable.live_name:"未安排"}}</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="科目:">
          <el-table
            :data="seeapplytable.subjects_data"
            style="border:1px solid silver;margin: 0; border-bottom:none;"
          >
            <el-table-column property="subject_name" label="科目"></el-table-column>
            <el-table-column property="classhour" label="课时"></el-table-column>
            <el-table-column property="amount" label="金额"></el-table-column>
            <el-table-column property="course_id" label="班课"></el-table-column>
            <el-table-column property="is_one" label="一对一"></el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="学生:">
          <el-table
            :data="seeapplytable.students_data"
            style="border:1px solid silver;margin: 0; border-bottom:none;"
          >
            <el-table-column property="student_name" label="学生姓名" width="100"></el-table-column>
            <el-table-column property="tel" label="手机" width="100"></el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="课程顾问:">
          <p>{{seeapplytable.guwen_name}}</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="课程有效期:">
          <p>{{seeapplytable.expiry_date}}</p>
        </el-form-item>
        <el-form-item
          style="border:1px solid silver;margin: 0; border-bottom:none;"
          label="优惠说明及备注:"
        >
          <p>{{seeapplytable.remarks}}</p>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 查看排课需求的弹框 -->
    <el-dialog 
    :close-on-click-modal='false'
    title="查看排课需求" :visible.sync="dialogTableVisible_seeClassNeeds">
      <el-form label-width="120px">
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="需求:">
          <p>内容</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="上课地点:">
          <p>{{seeclassneeds.course_address}}</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="上课地址:">
          <p>{{seeclassneeds.address?seeclassneeds.address:"未安排"}}</p>
        </el-form-item>
        <el-form-item
          style="border:1px solid silver;margin: 0; border-bottom:none;background-color:silver;"
          label="需求一:"
        >
          <p>学生排课项目、科目、考局（A-level必写）及课时</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label>
          <p>{{seeclassneeds.need_one}}</p>
        </el-form-item>
        <el-form-item
          style="border:1px solid silver;margin: 0; border-bottom:none;background-color:silver;"
          label="需求二:"
        >
          <p>学生学习需求是什么？（零基础先修、同步辅导、巩固复习、强化冲刺）</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label>
          <p>{{seeclassneeds.need_two}}</p>
        </el-form-item>
        <el-form-item
          style="border:1px solid silver;margin: 0; border-bottom:none;background-color:silver;"
          label="需求三:"
        >
          <p>学生目前学习情况(几年级?在哪里上学?之前考过的成绩怎么样?希望达到什么目标成绩）</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label>
          <p>{{seeclassneeds.need_three}}</p>
        </el-form-item>

        <el-form-item
          style="border:1px solid silver;margin: 0; border-bottom:none;background-color:silver;"
          label="需求四:"
        >
          <p>学生之前的学习经历和学习基础（之前在那里上的学？学习基础怎么样？）</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label>
          <p>{{seeclassneeds.need_three}}</p>
        </el-form-item>
        <!-- <el-form-item
          style="border:1px solid silver;margin: 0; border-bottom:none;background-color:silver;"
          label="需求五:"
        >
          <p>学生希望跟什么样的老师学习？</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label>
          <p>{{seeclassneeds.need_four}}</p>
        </el-form-item>
        <el-form-item
          style="border:1px solid silver;margin: 0; border-bottom:none;background-color:silver;"
          label="需求六:"
        >
          <p>学生上课时间期限，可排课时间？（北京时间）每次课上几小时？</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label>
          <p>{{seeclassneeds.need_five}}</p>
        </el-form-item> -->
      </el-form>
    </el-dialog>
    <!-- 查看老师课表 -->
    <el-dialog 
    :close-on-click-modal='false'
    :visible.sync="dialogTableVisible_seeTeacherClass">
      <span>查看老师课表</span>
      <el-table :data="seeteacherclass_data" border>
        <el-table-column property="course_address" label="上课地点"></el-table-column>
        <el-table-column property="address" label="线下上课地址"></el-table-column>
        <el-table-column property="subject_name" label="科目"></el-table-column>
        <el-table-column property="start_time" label="开始时间"></el-table-column>
        <el-table-column property="end_time" label="结束时间"></el-table-column>
        <el-table-column property="banzhuren_name" label="班主任"></el-table-column>
        <el-table-column property="student_name" label="学生"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import studens_url from "../../config/config";
import { mapState, mapActions, mapGetters } from "vuex";
// import
export default {
  data() {
    return {
      show: "false",
      address_check: [], //上课地址的数据
      seeapplytable: {}, //弹出报名表数据
      seeclassneeds: {}, //弹出排课需求数据
      seeteacherclass_data: [], //弹出老师课表数据
      stu_centerDialogVisible: false, //学生课表的弹出层
      seestudentclass: [], //学生课表的弹出层数据
      seestudentname: [], //学生课表的弹出层学生名
      dialogTableVisible_seeapplytable: false, //报名表弹出控制
      dialogTableVisible_seeClassNeeds: false, //排课需求弹出
      dialogTableVisible_seeTeacherClass: false, //弹出老师课表
      value_data_start: "", //默认form开始日期
      value_data_end: "", //结束时间
      input_twice: "", //排几节课?
      live_type: "1", //直播类型
      study_wey: "1", //观看端
      live_list_new: [], //直播数据
      value_live: "", //
      radio: "1", //上课地点的选择
      teacher_data_new: [], //讲师数据
      banzhuren_list_new: [], //班主任数据
      banzhuren_live: "",
      zhujiao_data_new: [], //助教数据
      jiaowu_data_new: [], //财务专员
      input_class_time: "", //课时
      input: "",
      input1: "",
      input2: "",
      value_1: "",
      valueDate: "",
      parms: {
        search: "",
        page: 1
      },
      options1: [
        //学生姓名的数据
        // label:"username",
      ],
      options: [], //课程名称的数据
      options_: [], //总数据的数据
      editableTabs_1: [], //课程详情数组
      tabIndex: 0,
      tabIndex_1: 0,
      subjects_data: [], //学科数据
      title: "", //标题
      value_data: "", //排课的日期
      form: {
        //总表格
        live_id: "",
        teacher_id: "", //选择的讲师的id
        banzhuren_id: "",
        zhujiao_id: "",
        jiaowu_id: "",
        course_address: "",
        title: "",
        classhour: ""
      },
      apply_data: {}, //根据报名表id获取的数据
      options_type: [
        {
          value: "2",
          label: "大班课"
        },
        {
          value: "3",
          label: "小班课"
        },
        {
          value: "1",
          label: "一对一"
        }
      ], //直播数组
      options_wey: [
        {
          value: "2",
          label: "WEB端"
        },
        {
          value: "1",
          label: "服务端"
        }
      ] //观看数组.
    };
  },
  updated() {
    // mapState(["banzhuren_list",'region_list']);
  },
  created() {
    let params = {
      admin_id: this.getdataCookie("admin_id")
    }; //
    this.get_banzhuren_list({
      //获取班主任列表
      url: "/api/api_banzhuren_list"
    });
    this.get_live_list({
      //获取直播列表
      url: "/api/api_live_list"
    });
    this.get_region_list({
      //查看学生课表
      url: "/api/api_region_list"
    });
    // this.get_look_arrange({  //查看排课
    //   url:'/api/api_look_arrange'
    // })/api_teacher_data
    this.get_teacher_data({
      //获取讲师数据
      url: "/api/api_teacher_data"
    });
    this.get_apply_data();
  },
  computed: mapState([
    "rolemenu",
    "live_list",
    "banzhuren_list",
    "teacher_data",
    "zhujiao_data",
    "jiaowu_data",
    "region_list",
    "application",
    "needs",
    "teacher_course",
    "student_course",
    "look_arrange"
  ]),
  mounted() {
    //优化数据结构
    this.getbanzhurenName();
    this.getTeacherName();
    this.gezhujiaoName();
    this.getjiaowuName();
    this.getLiveName();
  },

  methods: {
    whereGo(a) {
      //上课地址的选择
      if (a == "2") {
        this.show = true;
        this.address_check = this.region_list;
      } else {
        this.show = false;
      }
    },
    ...mapActions([
      "get_mune_list",
      "get_banzhuren_list",
      "get_live_list",
      "get_teacher_data",
      "get_zhujiao_data",
      "get_jiaowu_data",
      "get_needs",
      "get_region_list",
      "get_teacher_course",
      "get_student_course",
      "get_look_arrange"
    ]),
    seeApplyTable(a) {
      //查看报名表的弹框
      this.dialogTableVisible_seeapplytable = true;
      let params = {
        // app_id: this.apply_data.app_id
        app_id: this.$route.query.id
      };

      this.$apis.common.get_application(params).then(res => {
        if (res.data.code == 1) {
          this.seeapplytable = res.data.data;
        }
      });
      // this.seeapplytable = this.application;
    },

    seeClassNeeds(a) {
      //查看排课需求的弹框
      let params = {
        app_id: this.$route.query.id
      };
      this.dialogTableVisible_seeClassNeeds = true;
      this.get_needs({
        //查看排课需求
        params,
        url: "/api/api_get_needs"
      });
      this.seeclassneeds = this.needs;
    }, //查看老师课表的弹框
    seeTeacherClass() {
      let params = {
        teacher_id: this.form.teacher_id * 1
      };
      if (!this.form.teacher_id * 1 == "") {
        this.$apis.operation.teacher_course(params).then(res=>{
          if(res&&res.data.code==1){
             if(Object.prototype.toString.call(res.data.data).split(7,6)==Array){
              this.seeteacherclass_data=res.data.data
              this.dialogTableVisible_seeTeacherClass=true
            }else{
             this.seeteacherclass_data=[]
                           this.dialogTableVisible_seeTeacherClass=true

            }
          }else{
                    this.$message({
          type: "worning",
          message: "此老师暂没有数据可查看"
        });
          }
        });
      } else {
        this.$message({
          type: "worning",
          message: "此老师暂没有数据可查看"
        });
      }
    },
    seeStudentClass(a, b) {
      //查看学生课表
      let params = {
        student_id: a
      };

      this.stu_centerDialogVisible = true;
      this.$apis.students.see_students_class(params).then(res=>{
        if(res.data.code==1){
         // console.log(res.data.data)
         // console.log(Object.prototype.toString.call(res.data.data).substr(8,5))
      if(Object.prototype.toString.call(res.data.data).substr(8,5)=="Objec"){
        this.seestudentclass=[]
      }else{
     this.seestudentclass = res.data.data;
      }
        }
      })
      this.seestudentname = b;
    },
    getLiveName() {
      //筛选直播列表
      for (let i = 0; i < this.live_list.length; i++) {
        var val = this.live_list[i];
        this.live_list_new.push({ value: val.id, label: val.live_name });
      }
    },
    getTeacherName() {
      //筛选讲师列表
      for (let i = 0; i < this.teacher_data.length; i++) {
        var val = this.teacher_data[i];
        this.teacher_data_new.push({ value: val.id, label: val.teacher_name });
      }
      // console.log(this.teacher_data_new)
    },
    gezhujiaoName() {
      //筛选助教列表
      for (let i = 0; i < this.zhujiao_data.length; i++) {
        var val = this.zhujiao_data[i];
        this.zhujiao_data_new.push({ value: val.id, label: val.zhujiao_name });
      }
    },
    getjiaowuName() {
      //筛选教务专员列表
      for (let i = 0; i < this.jiaowu_data.length; i++) {
        var val = this.jiaowu_data[i];
        this.jiaowu_data_new.push({ value: val.id, label: val.jiaowu_name });
      }
    },
    getbanzhurenName() {
      //筛选班主任列表

      for (let i = 0; i < this.banzhuren_list.length; i++) {
        var val = this.banzhuren_list[i];
        this.banzhuren_list_new.push({ value: val.id, label: val.banzhuren });
      }
    },
    getdataCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      this.$router.push({ path: "/login" });
    },
    //获取报读科目列表
    addTest() {
      // alert()
    },
    handleChange_live() {},
    handleChange_teacher() {},
    handleChange_banzhuren() {},
    handleChange_help() {},
    handleChange_money() {},

    handleChange_1(targetName) {
      var all_hour = 0;
      for (let i = 0; i < this.editableTabs_1.length; i++) {
        all_hour += $("#classhour" + i).val() * 1;
      }
      if (all_hour < this.form.classhour * 1) {
        this.editableTabs_1.push({
          classhour: "",
          start_time: "", //选择开始日期
          week: "", //星期
          // course_id: "", //周几
          course_type: "1", //课程类型
          play_type: "1"
        });
      } else {
        this.$message({
          type: "warning",
          message: "请核对剩余课时"
        });
      }

      // this.editableTabs_1 = newTabName;
      // }
    },
    onSubmit() {
      this.subjects_data = [];
      var all_hour = 0;
      for (let i = 0; i < this.editableTabs_1.length; i++) {
        all_hour += $("#classhour" + i).val() * 1;
      }
      for (let i = 0; i < this.editableTabs_1.length; i++) {
        function dateToMs(date) {
          let result = new Date(date).getTime();
          return result.toString().slice(0, 10);
        }
        this.subjects_data.push({
          classhour: $("#classhour" + i).val() * 1,
          start_time: dateToMs($("#start_time" + i).val()),
          // week: $("#end_time" + i).val(),
          // course_id: $("#course_id" + i).html(),
          course_type: $("#course_type" + i).val(),
          play_type: $("#play_type" + i).val()
        });
      }
      console.log(this.form);
      let parms = {
        app_id: this.$route.query.id * 1, //报名表id
        live_id: this.form.live_id, //直播平台id
        teacher_id: this.form.teacher_id, //讲师id
        banzhuren_id: this.form.banzhuren_id, //班主任id
        zhujiao_id: this.form.zhujiao_id, //助教id
        jiaowu_id: this.form.jiaowu_id, //教务id
        // students_id: this.apply_data.students,  //学生id  string
        classhour: this.form.classhour * 1, //课时
        course_address: this.form.course_address * 1 //1线上，2线下
      };
      var studentStr = this.apply_data.students.map((item, index, arr) => {
        return item.student_id;
      });
      parms.students_id = studentStr.join();
      parms.course_data = this.subjects_data;
      // console.log(all_hour*1,'填入时间')
      // console.log(this.$route.query.classhour*1,'总时间')
      if (all_hour * 1 <= this.form.classhour * 1) {
        //console.log(parms)
        //console.log(this.form)
        this.$apis.common.application_arrange_put(parms).then(res => {
          if (res.data.code == 1) {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.$router.go(-1);
          } else {

            this.$message({
              type: "warning",
              message: res.data.msg
            });
          }
        });
      } else {
        this.$message({
          type: "warning",
          message: "排课时间不足"
        });
      }
    },
    open4() {
      this.$notify({
        title: "忘记说了",
        message: "最少要有一个排课计划",
        position: "top-left",
        type: "warning"
      });
    },
    deleteTest_1() {
      this.editableTabs_1.pop(this.editableTabs_1);
      if (this.editableTabs_1.length == 0) {
        this.open4();
      }
    },

    goBack() {
      history.back(-1);
    }, // 复制链接

    get_apply_data() {
      //获取排课的信息
      let parms = {
        app_id: this.$route.query.id
      };
      this.$apis.common
        .arrange_edit(parms)
        .then(res => {
          if (res.data.code == 1) {
            this.form = res.data.data;
            console.log(this.form);
            this.form.teacher_id = res.data.data.teacher_id;
            this.editableTabs_1 = res.data.data.course_data;
            this.apply_data.students = res.data.data.students;
          } else {
            this.$message({
              type: "info",
              message: res.data.msg
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "请求失败"
          });
        });
    },
    getdataCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
    }
  }
};
</script>
<style scoped>
/* .main_head {
  margin: auto;
  width: 96%;
  height: 40px;
  font-size: 22px;
  font-weight: 900;
  margin: 0 2%;
  /* line-height: 30px; */

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
.add_ul {
  height: 40px;
}
.add_ul_new {
  height: 40px;
}
.add_ul p {
  list-style: none;
  display: inline-block;
  background-color: #fff;
  padding: 0;
  margin-right: -5px;
  width: 11%;
  border: 1px solid silver;
  text-align: center;
  overflow: hidden;
}
.add_ul :nth-child(2){
  width: 17%;
}
.add_ul_new :nth-child(3){
  width: 17%;
}
.add_ul_new p {
  list-style: none;
  display: inline-block;
  background-color: #fff;
  padding: 0;
  margin-right: -5px;
  width: 11%;
  border: 1px solid silver;
  text-align: center;
  overflow: hidden;
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

