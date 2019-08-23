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
        <p>{{parseInt(this.$route.query.classhour)}}</p>
      </el-form-item>
      <el-form-item label="上课地点" v-model="radio">
        <el-radio v-model="radio"  label="1">线上</el-radio>
        <el-radio v-model="radio"  label="2">线下</el-radio>
      </el-form-item>

      <el-form-item label="学生姓名">
        <div class="add_ul">
          <p>学生姓名</p>
          <p>课表</p>
        </div>
        <div class="add_ul" v-for="(item,i) in " :key="index">
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
          <p width="250px">结束时间</p>
          <p>直播类型</p>
          <p>观看端</p>
          <p>操作</p>
          <p style="border:none;background-color:rgba(0,0,0,0);">
            <el-button type="primary" @click="handleChange_1">新增</el-button>
          </p>
        </div>
        <div class="add_ul">
          <p><el-input v-model="input_twice" placeholder="排几节课?"></el-input></p>
          <p>
            <el-date-picker v-model.number="value_data_start" value-format="timestamp" type="date" placeholder="开始日期"></el-date-picker>
          </p>
          <p>
            <el-date-picker v-model.number="value_data_end" value-format="timestamp" type="date" placeholder="结束日期"></el-date-picker>
          </p>
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
           <p @click="deleteTest_1" style="cursor:pointer;">撤销</p>
        </div>
        <template>

        </template>
        <div class="add_ul_new" v-for="(item,i) in editableTabs_1" :key="i">
          <span style="display:none;" v-bind:id="'course_id'+ i">{{item.course_id}}</span>
          <p>
            <el-input v-model.number="item.times" v-bind:id="'classhour' + i" placeholder="排几节课?"></el-input>
          </p>
          <p>
            <!-- <el-input v-model.number="item.price" v-bind:id="'mach' + i" placeholder="单价(元)"></el-input> -->
            <el-date-picker v-model="item.start_time" v-bind:id="'start_time' + i" type="date" placeholder="开始日期"></el-date-picker>
          </p>
         <p><el-date-picker v-model="item.end_time" v-bind:id="'end_time' + i" type="date" placeholder="结束日期"></el-date-picker></p>
          <p>
            <select v-model="item.course_type" v-bind:id="'course_type' + i" placeholder="班课" style="height:36px;border:none;">
                <option label="直播类型是什么" value="8"></option>
              <option label="大班课" value="2">否</option>
              <option label="小班课" value="3">是</option>
              <option label="一对一" value="1">是</option>
            </select>
          </p>
           <p>
            <select v-model="item.play_type" v-bind:id="'play_type' + i" placeholder="班课" style="height:36px;border:none;">
              <option label="在哪里观看" value="8"></option>
              <option label="WEB端" value="2">否</option>
              <option label="客户端" value="1">是</option>
            </select>
          </p>
          <p @click="deleteTest_1" style="cursor:pointer;">撤销</p>
        </div>
      </el-form-item>
    </el-form>

    <el-button @click="goBack">取消</el-button>
    <el-button type="primary" @click="onSubmit" >就这样吧</el-button>
    <el-dialog title="提示" :visible.sync="stu_centerDialogVisible" width="30%" center>
      <span>这里查看的课表，是大于等于当前时间的课表</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="stu_centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="stu_centerDialogVisible = false">确 定</el-button>
      </span>
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
      value_data_start: "", //默认form开始日期
      value_data_end:'',    //结束时间
      input_twice:"",   //排几节课?
      live_type:"",//直播类型
      study_wey:'' , //观看端
      live_list_new: [], //直播数据
      value_live: "",   //
       radio: "", //上课地点的选择
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
      editableTabsValue_1: [],
      editableTabs_1: [],
      tabIndex: 1,
      subjects_data: [], //学科数据
      title: "", //标题
      value_data: "", //排课的日期

      form:{     //总表格
          value_live:'',
          teacher_live:'',
          banzhuren_live:'',
          helpTeacher_live:'',
          moneymen_live:'',
          radio:'',

      },   
      apply_data:{},  //根据报名表id获取的数据
      options_type:[{
          value: '2',
          label: '大班课'
        }, {
          value: '3',
          label: '小班课'
        }, {
          value: '1',
          label: '一对一'
        }],  //直播数组
      options_wey:[{
          value: '2',
          label: 'WEB端'
        }, {
          value: '1',
          label: '服务端'
        }],   //观看数组
    };
  },
  created() {
    let params = {
      admin_id: this.getdataCookie("admin_id")
    };//
   this.get_apply_data();
  },
  computed: {
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
        classhour:"",
        start_time: "",  //选择开始日期
        end_time: "",  //选择结束日期
       input_week: "",   //周几
        course_type: "", //课程类型
        play_type:''
      });
      this.editableTabsValue_1 = newTabName;
      // }
    },
    onSubmit() {
      // if(this.input_twice*1==this.$route.query.classhour*1){
      //     alert(66)
      // }else{
      //   alert("dd")
      // }
         this.subjects_data.push({
     start_time: this.value_data_start, //默认form开始日期
      end_time:this.value_data_end,    //结束时间
      classhour:this.input_twice,   //排几节课?
      course_type:this.live_type,//直播类型
      play_type:this.study_wey, //观看端
         })
            for (let i = 0; i < this.editableTabsValue_1.length; i++) {
        this.subjects_data.push({
          classhour: $("#classhour" + i).val() * 1,
          start_time: $("#start_time" + i).val(),
          end_time: $("#end_time" + i).val(),
          course_type: $("#course_type" + i).val() ,
          play_type: $("#play_type" + i).val(),
        });   
     
            }
           let parms = {
        app_id:this.$route.query.id,  //报名表id
        live_id: 1,  //直播平台id
        teacher_id: 1,  //讲师id
        banzhuren_id:1,   //班主任id
        zhujiao_id:1,   //助教id
        jiaowu_id: 1,   //教务id
        students_id: "this.need_three",  //学生id  string
        classhour:this.$route.query.classhour*1,     //课时
        course_address: this.radio*1   //1线上，2线下
                   
      };
      //course_data:[]   // {"classhour":2,"start_time":1564560000,"end_time":1564567200,"course_type":1,"play_type":1},
       parms.course_data = this.subjects_data;
         console.log(parms)
      this.$apis.common.application_arrange_post(parms).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.$router.go(-1)
        }
      });
    },
     open4() {
        this.$notify({
          title: '忘记说了',
          message: '最少要有一个排课计划',
          position: 'top-left',
           type: 'warning'
        })
      },
    deleteTest_1() {
      this.editableTabs_1.pop(this.editableTabsValue_1);
      if(this.editableTabs_1.length==0){
               this.open4() 
      }
      

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

    goBack() {
      history.back(-1);
    }, // 复制链接
    get_apply_data(){
      let parms={
        app_id:this.$route.query.id
      }
      this.$apis.common.application_arrange(parms).then(res=>{
        if(res.data.code==1){
          this.apply_data=res.data.data
        }
      })
    },
    getdataCookie(cname) {
      // return 1
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

