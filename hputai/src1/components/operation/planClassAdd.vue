<template>
  <div class="main">
    <!-- 设置充值链接 -->
    <!-- <el-page-header content="添加销售进程管控">
    </el-page-header>-->
    <!-- <el-row>
  <el-button type="primary">添加销售进程管控</el-button>
    </el-row>-->
    <div class="main_head">|&nbsp;添加排课信息</div>
    <!--  <el-input  style="width:200px" v-model="money"  placeholder="请输入充值金额" ></el-input>
    <el-button type="primary" v-show="money>0" @click="copyUrl">生成并复制充值链接</el-button>-->

    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="标题">
        <!-- 标题是从上一个页面拉去过来的信息 -->
        <p>{{this.$route.query.title}}</p>
      </el-form-item>
      <el-form-item :inline="true" label="直播平台">
        <el-cascader
          v-model="value_live"
          :options="this.live_list_new"
          :props="{ expandTrigger: 'hover' }"
          :show-all-levels="false"
          @change="handleChange_live"
        ></el-cascader>
      </el-form-item>
      <el-form-item :inline="true" label="讲师">
        <el-cascader
          v-model="teacher_live"
          :options="this.teacher_list_new"
          :props="{ expandTrigger: 'hover' }"
          :show-all-levels="false"
          @change="handleChange_teacher"
        ></el-cascader>
      </el-form-item>
      <el-form-item :inline="true" label="班主任">
        <el-cascader
          v-model="banzhuren_live"
          :options="this.banzhuren_list_new"
          :props="{ expandTrigger: 'hover' }"
          :show-all-levels="false"
          @change="handleChange_banzhuren"
        ></el-cascader>
      </el-form-item>
      <el-form-item :inline="true" label="助教">
        <el-cascader
          v-model="helpTeacher_live"
          :options="this.helpTeacher_list_new"
          :props="{ expandTrigger: 'hover' }"
          :show-all-levels="false"
          @change="handleChange_help"
        ></el-cascader>
      </el-form-item>
      <el-form-item :inline="true" label="财务专员">
        <!-- <span class="demonstration">hover 触发子菜单</span> -->
        <!-- 用el-autocomplete -->
        <el-cascader
          v-model="moneymen_live"
          :options="this.moneymen_list_new"
          :props="{ expandTrigger: 'hover' }"
          :show-all-levels="false"
          @change="handleChange_money"
        ></el-cascader>
      </el-form-item>
      <el-form-item :inline="true" label="课时">
        <el-input v-model="input_class_time" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="上课地点" v-model="radio">
        <el-radio v-model="radio" label="线上">线上</el-radio>
        <el-radio v-model="radio" label="线下">线下</el-radio>
      </el-form-item>

      <el-form-item label="学生姓名">
        <div class="add_ul">
          <p>学生姓名</p>
          <p>课表</p>
        </div>
        <div class="add_ul">
          <p>{{this.$route.query.student_name}}</p>
          <p>
            <el-button type="text" @click="stu_centerDialogVisible = true">查看课表</el-button>
          </p>
        </div>
        <!-- <div class="add_ul_new" v-for="(item,i) in editableTabs_1" :key="i">
          <span style="display:none;" v-bind:id="'students'+ i">{{item.id}}</span>
          <p>{{item.name}}</p>
          <p>{{item.tel}}</p>
          <p @click=" deleteTest" style="cursor:pointer;">撤销</p>
        </div>-->
      </el-form-item>

      <el-form-item :inline="true" label="已选科目">
        <div class="add_ul">
          <p id="sss">课时</p>
          <p width="250px">开始时间</p>
          <p>星期</p>
          <p>直播类型</p>
          <p>观看端</p>
          <p>操作</p>
          <p style="border:none;background-color:rgba(0,0,0,0);">
            <el-button type="primary" @click="handleChange_1">新增</el-button>
          </p>
        </div>
        <div class="add_ul">
          <p>{{this.$route.query.title}}</p>
          <p>
            <el-date-picker v-model="value_data" type="date" placeholder="选择日期"></el-date-picker>
          </p>
          <p><el-input v-model="input_week" placeholder="是周几呢?"></el-input></p>
          <!-- <p @click="milti">总额</p> -->
          <p>    
            <el-select v-model="live_type" placeholder="直播类型是什么">
              <el-option
                v-for="item in options_type"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </p>
          <p>
           <el-select v-model="study_wey" placeholder="在哪看呢">
              <el-option
                v-for="item in options_wey"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </p>
          <!-- <p></p> -->
        </div>
        <div class="add_ul_new" v-for="(item,i) in editableTabs_1" :key="i">
          <span style="display:none;" v-bind:id="'course_id'+ i">{{item.course_id}}</span>
          <p>
            <el-input v-model.number="item.times" v-bind:id="'time' + i" placeholder="课时">{{}}</el-input>
          </p>
          <p>
            <!-- <el-input v-model.number="item.price" v-bind:id="'mach' + i" placeholder="单价(元)"></el-input> -->
            <span class="demonstration">{{value_time}}</span>
            <el-date-picker v-model="value_time" type="date" placeholder="选择日期"></el-date-picker>
          </p>
          <p>
            <select v-model="item.course_type" v-bind:id="'attr' + i" placeholder="课程性质">
              <option label="试听" :value="2"></option>
              <option label="正课" value="1"></option>
              <option label="辅导" value="3"></option>
            </select>
          </p>
          <p>
            <select v-model="item.m1" v-bind:id="'clas' + i" placeholder="班课">
              <option label="否" value="0">否</option>
              <option label="是" value="1">是</option>
            </select>
          </p>
           <p>
            <select v-model="item.m1" v-bind:id="'clas' + i" placeholder="班课">
              <option label="否" value="0">否</option>
              <option label="是" value="1">是</option>
            </select>
          </p>
          <p @click="deleteTest_1" style="cursor:pointer;">撤销</p>
        </div>
      </el-form-item>
    </el-form>

    <el-button @click="goBack">取消</el-button>
    <el-dialog title="提示" :visible.sync="stu_centerDialogVisible" width="30%" center>
      <span>这里查看的课表，是大于等于当前时间的课表</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="stu_centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="stu_centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置充值链接 -->
    <!-- <div style="display:none" cols="20" id="biao1">{{copyurl1}}</div> -->
  </div>
</template>

<script>
import studens_url from "../../config/config";
import { mapState, mapActions, mapGetters } from "vuex";
// import
export default {
  data() {
    return {
      value_time: "", //选择日期
      live_list_new: [], //直播数据
      value_live: "",
      teacher_list_new: [
        { value: 10911, label: "飞扬", id: 1 },
        { value: 10811, label: "朝夕", id: 4 }
      ], //讲师数据
      teacher_live: "",
      banzhuren_list_new: [], //班主任数据
      banzhuren_live: "",
      helpTeacher_list_new: [
        { value: 10141, label: "飞扬", id: 1 },
        { value: 1011, label: "朝夕", id: 2 }
      ], //助教数据
      helpTeacher_live: "",
      moneymen_list_new: [
        { value: 10141, label: "飞扬", id: 1 },
        { value: 10511, label: "朝夕", id: 7 }
      ], //财务专员
      moneymen_live: "",
      input_class_time: "", //课时
      stu_centerDialogVisible: false, //学生课表的弹出层
      apply_centerDialogVisible: false, //查看报名表的弹出层
      classplan_stu_centerDialogVisible: false, //查看排课需求的弹出层
      teacher_centerDialogVisible: false, //查看老师课表的弹出层
      input: "",
      input1: "",
      input2: "",
      value_1: "",
      valueDate: "",
      active: 1,
      form: {},
      money: "",
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
      radio: "", //上课地点的选择
      editableTabsValue_1: [],
      editableTabs_1: [],
      tabIndex: 1,
      subjects_data: [], //学科数据
      title: "", //标题
      value_data: "", //排课的日期
      input_week:'',  //排课的星期数
      live_type:"",//直播类型
      study_wey:'' , //观看端
      options_type:[{
          value: '11',
          label: '大班课'
        }, {
          value: '2',
          label: '小班课'
        }, {
          value: '3',
          label: '一对一'
        }],  //直播数组
      options_wey:[{
          value: '1',
          label: 'WEB端'
        }, {
          value: '2',
          label: '服务端'
        }],   //观看数组
    };
  },
  created() {
    let params = {
      admin_id: this.getdataCookie("admin_id")
    };
    this.get_live_list({
      //获取直播列表
      url: "/api/api_live_list",
      params
    });
    this.get_banzhuren_list({
      //获取班主任列表
      url: "/api/api_banzhuren_list",
      params
    });
    this.get_teacher_data({
      //获取讲师列表
      url: "/api/api_teacher_data",
      params
    });
    this.get_zhujiao_data({
      //获取助教列表
      url: "/api/api_zhujiao_data",
      params
    });
    this.get_jiaowu_data({
      //获取教务专员列表
      url: "/api/api_jiaowu_data",
      params
    });
  },
  computed: {
    ...mapState([
      "live_list",
      "banzhuren_list",
      "teacher_data",
      "zhujiao_data",
      "jiaowu_data"
    ]),
    ...mapGetters(["doneTodos"])
  },
  updated() {
    //  this.getLiveName();
    //   this.getbanzhurenName();
  },
  mounted() {
    this.getbanzhurenName();
    this.getLiveName();
  },

  methods: {
    ...mapActions([
      "get_live_list",
      "get_banzhuren_list",
      "get_teacher_data",
      "get_zhujiao_data",
      "get_jiaowu_data"
    ]), //获取直播列表发送actions this.store.dispatch
    //获取直播列表
    getLiveName() {
      //筛选直播列表
      for (let i = 0; i < this.live_list.length; i++) {
        var val = this.live_list[i];
        this.live_list_new.push({ value: val.id, label: val.live_name });
      }
    },
    getbanzhurenName() {
      //筛选班主任列表
      // if(this.banzhuren_list.length>0){
      for (let i = 0; i < this.banzhuren_list.length; i++) {
        var val = this.banzhuren_list[i];
        this.banzhuren_list_new.push({ value: val.id, label: val.banzhuren });
        console.log(this.banzhuren_list_new);
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
      // for (let i = 0; i < this.options_.length; i++) {
      // var val = this.options_[i];
      let newTabName = ++this.tabIndex_1 + "";
      this.editableTabs_1.push({
        times: 10,
        price: 1000,
        course_type: "", //课程类型
        course_id: 100, //课程id
        is_one: "", //一对一？
        is_group: "" //班课?
      });
      this.editableTabsValue_1 = newTabName;
      // }
    },
    onSubmit() {
      for (let i = 0; i < this.editableTabsValue_1.length; i++) {}
      let parms = {
        title: this.title,
        expiry_date: this.valueDate,
        remarks: this.feedback,
        course_address: this.radio,
        need_one: this.need_one,
        need_two: this.need_two,
        need_three: this.need_three,
        need_four: this.need_four,
        need_five: this.need_five
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
        }
      });
    },
    deleteTest_1() {
      this.editableTabs_1.pop(this.editableTabsValue_1);
    },
    next() {
      for (let i = 0; i < this.editableTabsValue.length; i++) {
        this.students_data.push({
          student_id: $("#students" + i).html()
        });
      }
      for (let i = 0; i < this.editableTabsValue_1.length; i++) {
        this.subjects_data.push({
          subject_id: $("#course_id" + i).html() * 1,
          classhour: $("#time" + i).val() * 1,
          price: $("#mach" + i).val() * 1,
          amount: $("#time" + i).val() * $("#mach" + i).val(),
          course_type: $("#attr" + i).val(),
          course_id: $("#course_id" + i).html() * 1,
          is_one: $("#one" + i).val() * 1,
          is_group: $("#self" + i).val() * 1
        });
        if ($("#clas" + i).val() == 1) {
          // console.log($("#time"+i).val() + "  " + $("#mach"+i).val() + "  " + $("#sex"+i).val())
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
  width: 10%;
  border: 1px solid silver;
  text-align: center;
  overflow: hidden;
}

.add_ul_new p {
  list-style: none;
  display: inline-block;
  background-color: #fff;
  padding: 0;
  margin-right: -5px;
  width: 10%;
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

