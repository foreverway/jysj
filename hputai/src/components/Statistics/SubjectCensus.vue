<template>
  <div id="app">
    <zx-head title="业务核算"></zx-head>
    <div class="session1">
      <h3>一级科目</h3>
      <div>
 <el-date-picker
      style="margin:10px"
      v-model="begin_time_3"
      @change="changeStart_3"
      value-format="timestamp"
      clearable
      placeholder="选择日期时间"
    ></el-date-picker>至
    <el-date-picker
      @change="changeEnd_3"
      v-model="end_time_3"
      value-format="timestamp"
      clearable
      placeholder="选择日期时间"
    ></el-date-picker>


    <el-select
      clearable
      v-model="params.student_type"
      placeholder="选择学生类型"
      @change="Change_sbuject"
    >
    <el-option label="全部" value="0"></el-option>
      <el-option label="VIP学生" value="3"></el-option>
      <el-option label="保读" value="2"></el-option>
        <el-option label="普通" value="1"></el-option>
    </el-select>


    <el-button type="primary" @click="recharge_export">导出</el-button>
      </div>


    <el-table
      :data="tableData"
      height="500px"
      border
      class="table_set"
      @selection-change="handleSelectionChange"
      :header-cell-style="{background:'#f4f4f4'}"
    >
      
      <el-table-column type="selection" fixed="left" @click="handleClick(scope.row)" width="40"></el-table-column>
  
      <el-table-column label="科目名称" width="100" prop="subject_name"></el-table-column>
      <el-table-column align="center" prop="student_type_name" label="学生类别" sortable></el-table-column>
      <el-table-column align="center" prop="confirm_classhour" label="确认课时消耗量(小时)" sortable></el-table-column>
      <el-table-column align="center" prop="student_amount" label="确认营业收入(￥)" sortable></el-table-column>
      <el-table-column label="	确认课程成本(￥)" prop="teacher_amount"></el-table-column>
      <el-table-column label="确认毛利金额(￥)" prop="profit"></el-table-column>

    </el-table>
    </div>
   
    <div class="session1">
     <h3>一级科目分析</h3>
    <div class="echarts_1"  style='margin:20px 0;'>
      <div style="width:44%;height:450px;" class="bgc">
        <div class="block" style="margin: 0 auto;width:446px;">
          <el-date-picker
            @change="changeMouth"
            v-model="changeMouth1"
            type="month"
            placeholder="选择你想查看的月份"
          ></el-date-picker>
             <el-cascader
      placeholder="选择科目"
      v-model="main_subject_id"
      filterable
      :options="options"
      clearable
      :props="{ expandTrigger: 'hover' }"
      :show-all-levels="false"
      @change="handleChange_1"
    ></el-cascader>
        </div>
        <div id="main" style="width:100%;height:400px;"></div>
      </div>

      <div style="width:55%;height:450px;" class="bgc">
        <div class="block" style="margin:auto;width:200px;">
          <el-date-picker
            @change="changeMouth_1"
            v-model="thisyear"
            type="year"
            value-format="yyyy"
            placeholder="选择你想查看的年份"
          ></el-date-picker>
        </div>
        <div id="main2" style="width:100%;height:400px;"></div>
      </div>
    </div>
   </div>
    
    <div class="bgc" >
      <div class="flex_all">
        <div>
          <el-radio-group v-model="one.status" @change="changeRadio1">
            <el-radio-button label="1">已排</el-radio-button>
            <el-radio-button label="2">已上</el-radio-button>
            <el-radio-button label="3">待上</el-radio-button>
          </el-radio-group>
        </div>
        <div>
          <el-button
            class="near"
            style="margin:0 -2px ;border-radius:5px 0 0  5px;"
            @click="showDay"
          >今天</el-button>
          <el-button class="near" style="margin:0 -3px ;border-radius:0;" @click="showWeek">本周</el-button>
          <el-button
            class="near"
            style="margin:0 -2px ;border-radius:0 5px 5px  0;"
            @click="showMouth"
          >本月</el-button>
        </div>
        <div>
          <el-date-picker
            v-model="begin_time_1"
            type="date"
            value-format="timestamp"
            @change="changeStart"
            placeholder="选择你想查看的初始日期"
          ></el-date-picker>至
          <el-date-picker
            v-model="end_time_1"
            @change="changeEnd"
            value-format="timestamp"
            type="date"
            placeholder="选择你想查看的截止日期"
          ></el-date-picker>
        </div>
      </div>

      <div id="main1" style="width:100%;height:400px;"></div>
    </div> 
     <div class="bgc " >
      <div class="flex_all">
        <div>
          <el-radio-group fill="#5CB87A" v-model="three.status" @change="changeRadio_1">
            <el-radio-button label="1">已排</el-radio-button>
            <el-radio-button label="2">已上</el-radio-button>
            <el-radio-button label="3">待上</el-radio-button>
          </el-radio-group>
        </div>
        <div></div>
        <div>
          <el-button
            class="near"
            style="margin:0 -2px ;border-radius:5px 0 0  5px;"
            @click="showDay_2"
          >今天</el-button>
          <el-button class="near" style="margin:0 -3px ;border-radius:0;" @click="showWeek_2">本周</el-button>
          <el-button
            class="near"
            style="margin:0 -2px ;border-radius:0 5px 5px  0;"
            @click="showMouth_2"
          >本月</el-button>
        </div>
        <div>
          <el-date-picker
            v-model="begin_time_2"
            type="date"
            value-format="timestamp"
            @change="changeStart_2"
            placeholder="选择你想查看的初始日期"
          ></el-date-picker>至
          <el-date-picker
            v-model="end_time_2"
            @change="changeEnd_2"
            value-format="timestamp"
            type="date"
            placeholder="选择你想查看的截止日期"
          ></el-date-picker>
        </div>
      </div>
      <div id="main3" style="width:100%;height:400px;"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import vue from "vue";
import url from "../../config/config.js";
import shuju from "../../api/axios";

export default {
  data() {
    return {
      // params: {
      //   page: "1"
      // },
      tableData: [],
      options: [],
      top15_1: [],
      top15_3: [],
      mouthData: [], //获取上一个月和前一年上一个月的数据
      lastYear:[],
      thisTear:[],
      main_subject_id:'',//图表科目选择的
      year_month:'',
      // yearData: [],
      // ordinary_stu: [],
      // keepreading_stu: [],
      // vip_stu: [],
      old_student_amount:"去年的收入",
      student_amount:"	今年的收入",
      old_teacher_amount:"去年的支出",
      teacher_amount:"今年的支出",
      old_profit:"去年的毛利",
      profit:"今年的毛利",
      idArr: [],
      params: {
         student_type:'',
         begin_time:'',
         end_time:'',
    
      },
      options_: [], //科目的原来数据
      options: [], //我们需要的科目数据
            options_1: [], //学生的原来数据
      options1: [], //我们需要的学生数据
      classMouth: [],
      // ordinary_classhour: [],
      // keepreading_classhour: [],
      // vip_classhour: [],
      profit	: [],//今年的毛利
old_profit: [],//去年的毛利
      msg: [],
      changeMouth1: "",
      thisyear: "",
      begin_time_1: "", //自由选择时间的绑定值1
      end_time_1: "", //自由选择时间的绑定值1
      begin_time_2: "", //自由选择时间的绑定值1
      end_time_2: "", //自由选择时间的绑定值1
      begin_time_3: "", //总数组的绑定值
      end_time_3: "", //总数组的绑定值
      one: {
        begin_time: "",
        end_time: "",
        status: "1"
      },
      three: {
        begin_time: "",
        end_time: "",
        status: "1"
      },
      hadClick: false,
      hadClick_2: false //是否点击了今天，本周，或本月
    };
  },
  watch: {
    begin_time_1: function(newVal, oldVal) {
      if (newVal == null) {
        this.one.begin_time = "";
        this.begin_time_1 = "";
      } else {
        this.one.begin_time = newVal.toString().substr(0, 10);
      }
    },
    end_time_1: function(newVal, oldVal) {
      if (newVal == null) {
        this.one.begin_time = "";
        this.end_time_1 = "";
      } else {
        this.one.end_time = newVal.toString().substr(0, 10);
      }
    }
  },
  methods: {
        handleChange_1(targetName) {
      //选择科目
      var lastName = targetName[0] ? targetName[0] : "";
      this.main_subject_id = lastName;

       this.$apis.census
        .total_onlevel_subject({ year_month: this.year_month,subject_id: this.main_subject_id})
        .then(res => {
          if (res.data.code == 1) {
         this.lastYear=[res.data.data[0].old_student_amount,res.data.data[1].old_teacher_amount,res.data.data[2].old_profit]
        this.thisYear=[res.data.data[0].student_amount,res.data.data[1].teacher_amount,res.data.data[2].profit]
        }
        })
              this.drawChart();
    },
        getdata() {
      //获取科目的数据
      this.$apis.census
        .get_parent_info({
          subject_level: this.params.subject_level
            ? this.params.subject_level
            : 1
        })
        .then(res => {
          if (res.data.code == 1) {
            this.options_ = [];

            for (let i = 0; i < res.data.data.length; i++) {
              this.options_.push({
                value: res.data.data[i].id,
                label: res.data.data[i].subject_name
              });
            }
            this.options = this.options_;
          }
        });
    },
    handleSelectionChange(result) {
      this.idArr = [];
      for (let i = 0; i < result.length; i++) {
        this.idArr.push(result[i].id);
      }
      this.params.subject_ids = this.idArr.toString();
    },
    indexMethod(index) {},
    changeMouth(value) {
      var thisdate=new Date(this.changeMouth1)
     var month1 =thisdate.getMonth()*1+1
   var month =month1<10 ? "0"+month1:month1
   
      this.year_month =  thisdate.getFullYear()+"-"+month
   console.log(this.year_month, thisdate.getFullYear(),month)
             this.$apis.census
        .total_onlevel_subject({ year_month: this.year_month,subject_id: this.main_subject_id})
        .then(res => {
          if (res.data.code == 1) {
         this.lastYear=[res.data.data[0].old_student_amount,res.data.data[1].old_teacher_amount,res.data.data[2].old_profit]
        this.thisYear=[res.data.data[0].student_amount,res.data.data[1].teacher_amount,res.data.data[2].profit]
        }
        })
      this.drawChart();
    },
    changeMouth_1(value) {
            console.log(this.thisyear)

      this.changeMouth2 = value;
      this.drawStudent();
    },
    changeMouth_2(value) {
      // this.changeMouth2=value
      //  this.drawStudent();
    },
    changeRadio1(value) {
      this.one.status = value;
      this.lineChart(); //一级科目
    },
    changeRadio2(value) {
      // this.one.begin_time=value
      //    this.lineChart(); //一级科目
    },
    changeRadio_1(value) {
      this.three.status = value;
      this.lineChart2(); //一级科目
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    dateToMs(date) {
      let result = new Date(date).getTime(); //getTime获取毫秒数
      return result;
    },
    showDay() {
      var todayDate = new Date();
      var y = todayDate.getFullYear();
      var m = todayDate.getMonth() + 1;
      var d = todayDate.getDate();
      var s = y + "-" + this.add0(m) + "-" + this.add0(d) + " 00:00:00"; //今日开始
      var e = y + "-" + this.add0(m) + "-" + this.add0(d) + " 23:59:59"; //今日结束
      var s1 = this.dateToMs(s)
        .toString()
        .substr(0, 10);
      var e1 = this.dateToMs(e)
        .toString()
        .substr(0, 10);

      this.one.begin_time = s1.toString();
      this.one.end_time = e1.toString();
      this.lineChart();
      this.hadClick = true;
    },
    showDay_2() {
      var todayDate = new Date();
      var y = todayDate.getFullYear();
      var m = todayDate.getMonth() + 1;
      var d = todayDate.getDate();
      var s = y + "-" + this.add0(m) + "-" + this.add0(d) + " 00:00:00"; //今日开始
      var e = y + "-" + this.add0(m) + "-" + this.add0(d) + " 23:59:59"; //今日结束
      var s1 = this.dateToMs(s)
        .toString()
        .substr(0, 10);
      var e1 = this.dateToMs(e)
        .toString()
        .substr(0, 10);

      this.three.begin_time = s1.toString();
      this.three.end_time = e1.toString();
      this.lineChart2();
      this.hadClick_2 = true;
    },
    showWeek() {
      var startStop = new Array();
      //获取当前时间
      var currentDate = new Date();
      //返回date是一周中的某一天
      var week = currentDate.getDay();
      //返回date是一个月中的某一天
      var month = currentDate.getDate();
      //一天的毫秒数
      var millisecond = 1000 * 60 * 60 * 24;
      //减去的天数
      var minusDay = week != 0 ? week - 1 : 6;
      //alert(minusDay);
      //本周 周一
      var monday = new Date(currentDate.getTime() - minusDay * millisecond);
      //本周 周日
      var sunday = new Date(monday.getTime() + 6 * millisecond);
      var sy = monday.getFullYear();
      var sm = monday.getMonth() + 1;
      var sd = monday.getDate();
      var ey = sunday.getFullYear();
      var em = sunday.getMonth() + 1;
      var ed = sunday.getDate();
      var s = sy + "-" + this.add0(sm) + "-" + this.add0(sd) + " 00:00:00"; //开始
      var e = ey + "-" + this.add0(em) + "-" + this.add0(ed) + " 23:59:59"; //结束
      var s1 = this.dateToMs(s)
        .toString()
        .substr(0, 10);
      var e1 = this.dateToMs(e)
        .toString()
        .substr(0, 10);
      this.one.begin_time = s1.toString();
      this.one.end_time = e1.toString();
      this.lineChart();
      this.hadClick = true;
    },
    showWeek_2() {
      var startStop = new Array();
      //获取当前时间
      var currentDate = new Date();
      //返回date是一周中的某一天
      var week = currentDate.getDay();
      //返回date是一个月中的某一天
      var month = currentDate.getDate();
      //一天的毫秒数
      var millisecond = 1000 * 60 * 60 * 24;
      //减去的天数
      var minusDay = week != 0 ? week - 1 : 6;
      //alert(minusDay);
      //本周 周一
      var monday = new Date(currentDate.getTime() - minusDay * millisecond);
      //本周 周日
      var sunday = new Date(monday.getTime() + 6 * millisecond);
      var sy = monday.getFullYear();
      var sm = monday.getMonth() + 1;
      var sd = monday.getDate();
      var ey = sunday.getFullYear();
      var em = sunday.getMonth() + 1;
      var ed = sunday.getDate();
      var s = sy + "-" + this.add0(sm) + "-" + this.add0(sd) + " 00:00:00"; //开始
      var e = ey + "-" + this.add0(em) + "-" + this.add0(ed) + " 23:59:59"; //结束
      var s1 = this.dateToMs(s)
        .toString()
        .substr(0, 10);
      var e1 = this.dateToMs(e)
        .toString()
        .substr(0, 10);
      this.three.begin_time = s1.toString();
      this.three.end_time = e1.toString();
      this.lineChart2();
      this.hadClick_2 = true;
    },
    showMouth() {
      //起止日期数组
      var startStop = new Array();
      //获取当前时间
      var currentDate = new Date();
      //获得当前月份0-11
      var currentMonth = currentDate.getMonth();
      //获得当前年份4位年
      var currentYear = currentDate.getFullYear();
      //求出本月第一天
      var firstDay = new Date(currentYear, currentMonth, 1);

      //当为12月的时候年份需要加1
      //月份需要更新为0 也就是下一年的第一个月
      if (currentMonth == 11) {
        currentYear++;
        currentMonth = 0; //就为
      } else {
        //否则只是月份增加,以便求的下一月的第一天
        currentMonth++;
      }
      //一天的毫秒数
      var millisecond = 1000 * 60 * 60 * 24;
      //下月的第一天
      var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
      //求出上月的最后一天
      var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);
      var sy = firstDay.getFullYear();
      var sm = firstDay.getMonth() + 1;
      var sd = firstDay.getDate();
      var ey = lastDay.getFullYear();
      var em = lastDay.getMonth() + 1;
      var ed = lastDay.getDate();
      var s = sy + "-" + this.add0(sm) + "-" + this.add0(sd) + " 00:00:00"; //开始
      var e = ey + "-" + this.add0(em) + "-" + this.add0(ed) + " 23:59:59"; //结束
      var s1 = this.dateToMs(s)
        .toString()
        .substr(0, 10);
      var e1 = this.dateToMs(e)
        .toString()
        .substr(0, 10);
      this.one.begin_time = s1.toString();
      this.one.end_time = e1.toString();
      this.lineChart();
      this.hadClick = true;
    },
    showMouth_2() {
      //起止日期数组
      var startStop = new Array();
      //获取当前时间
      var currentDate = new Date();
      //获得当前月份0-11
      var currentMonth = currentDate.getMonth();
      //获得当前年份4位年
      var currentYear = currentDate.getFullYear();
      //求出本月第一天
      var firstDay = new Date(currentYear, currentMonth, 1);

      //当为12月的时候年份需要加1
      //月份需要更新为0 也就是下一年的第一个月
      if (currentMonth == 11) {
        currentYear++;
        currentMonth = 0; //就为
      } else {
        //否则只是月份增加,以便求的下一月的第一天
        currentMonth++;
      }
      //一天的毫秒数
      var millisecond = 1000 * 60 * 60 * 24;
      //下月的第一天
      var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
      //求出上月的最后一天
      var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);
      var sy = firstDay.getFullYear();
      var sm = firstDay.getMonth() + 1;
      var sd = firstDay.getDate();
      var ey = lastDay.getFullYear();
      var em = lastDay.getMonth() + 1;
      var ed = lastDay.getDate();
      var s = sy + "-" + this.add0(sm) + "-" + this.add0(sd) + " 00:00:00"; //开始
      var e = ey + "-" + this.add0(em) + "-" + this.add0(ed) + " 23:59:59"; //结束
      var s1 = this.dateToMs(s)
        .toString()
        .substr(0, 10);
      var e1 = this.dateToMs(e)
        .toString()
        .substr(0, 10);
      this.three.begin_time = s1.toString();
      this.three.end_time = e1.toString();
      this.lineChart2();
      this.hadClick_2 = true;
    },
    changeStart(event) {
      if (this.hadClick == true) {
        this.one.end_time = "";
        this.one.begin_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart();
        this.hadClick = false;
      } else {
        this.one.begin_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart();
      }
    },
    changeStart_3(event) {
      this.params.begin_time = event ? event.toString().substr(0, 10) : "";
      this.getadata();
    },
    changeEnd_3(event) {
      this.params.end_time = event ? event.toString().substr(0, 10) : "";
      this.getadata();
      //  this.params.subject_ids=[]
    },
    changeStart_2(event) {
      if (this.hadClick_2 == true) {
        this.three.end_time = "";
        this.three.begin_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart();
        this.hadClick_2 = false;
      } else {
        this.three.begin_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart2();
      }
    },

    //导出
    recharge_export() {
      this.$message({
        type: "success",
        message: "正在导出,请稍等..."
      });
      // let urls = "http://personal.test.hqjystudio.com";
      let parms = "";
      // // this.form.teacher='杨懿俊'
      console.log(this.params);
      for (var key in this.params) {
        if (key == "subject_ids" && this.params.subject_ids) {
          parms += key + "=" + this.params[key];
        } else {
          parms += key + "=" + this.params[key] + "&";
        }
      }

      window.location.href =
        url.urls + "/api_export_onlevel_subject" + "?" + parms;
    },
    changeEnd(event) {
      if (this.hadClick == true) {
        this.one.begin_time = "";
        this.one.end_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart();
        this.hadClick = false;
      } else {
        this.one.end_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart();
      }
    },
    Change_sbuject() {
      this.getadata();
      // delete this.params.subject_ids;
    },

    changeEnd_2(event) {
      if (this.hadClick_2 == true) {
        this.three.begin_time = "";
        this.three.end_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart2();
        this.hadClick = false;
      } else {
        this.three.end_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart2();
      }
    },
    getdata() {
      //获取科目的数据
      this.$apis.census
        .get_parent_info({
          subject_level: this.params.subject_level
            ? this.params.subject_level
            : 1
        })
        .then(res => {
          if (res.data.code == 1) {
            this.options_ = [];

            for (let i = 0; i < res.data.data.length; i++) {
              this.options_.push({
                value: res.data.data[i].id,
                label: res.data.data[i].subject_name
              });
            }
            this.options = this.options_;
          }
        });
    },
    //普通学员
    drawStudent() {
      let myDraw = echarts.init(document.getElementById("main2"));
      app.config = {
  rotate: 0,
    align: 'center',
    verticalAlign: 'middle',
    position: 'top',
    distance: 15,
      };
      var labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: "{c}  ",
        fontSize: 12,
        rich: {
          name: {
            textBorderColor: "#fff"
          }
        }
      };
      myDraw.setOption({
        color: ["#5CBB7A", "#409EFF", "#F56C6C", "#e5323e"],
        tooltip: {
          trigger: "axis",
          // text: "月份情况",
          axisPointer: {
            type: "shadow"
          }
        },
          title: {
          text: "毛利情况",
          lineHeight: 40,
          textStyle:{
fontsize:'16px',
 fontWeight : 'bolder'
          }
        },
        legend: {
          data: ["请等待", "请等待"]
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["正在加载", "正在加载"]
          }
        ],
        yAxis: [
          {
            name: "课时",
            type: "value"
          }
        ],
        
        series: [
          {
            name: "已排",
            type: "bar",
            barGap: 0,
            label: labelOption,
            data: [320, 332, 301],
 
          },
          {
            name: "已上",
            type: "bar",
            label: labelOption,
            data: [220, 182, 191],
    
          },

        ]
      });
      this.$apis.census
        .profit_info({ year: this.thisyear })
        .then(res => {
          if (res.data.code == 1) {
            this.old_profit = [];
            (this.profit = []);
            for (let i = 0; i < res.data.data.length; i++) {
              // this.classMouth.push(res.data.data[i].month);
              this.profit[i] = res.data.data[i].profit;
              this.old_profit[i] = res.data.data[i].old_profit;
            }

            myDraw.setOption({
              legend: {
                data: ["去年", "今年"]
              },
   
              xAxis: [
                {
                  type: "category",
                  axisTick: { show: false },
                  data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',]
                }
              ],
              series: [
                {
                  name: "去年",
                  type: "bar",
                  barGap: 0,
                      label: {
              show: true,
              position: "right",
                      },
                  data: this.profit
                },
                {
                  name: "今年",
                  type: "bar",
                  label: labelOption,
                  data: this.old_profit
                },

              ]
            });
          }
        });
    },
    lineChart2() {
      let myLine2 = echarts.init(document.getElementById("main3"));
      myLine2.setOption({
        color: ["#5CBB7A"],

        title: {
          text: "学生课时T15排行",
          lineHeight: 40,
          // left: 'center',
          //  subtext: "三级科目Top15",
          textStyle: {
            fontsize: "16px",
            fontWeight: "bolder"
          }
        },
        dataset: {
          source: []
        },
        series: [
          {
            type: "bar",
            encode: {
              // Map the "amount" column to X axis.
              x: "课时",
              // Map the "product" column to Y axis
              y: "product"
            },
            label: {
              show: true,
              position: "right"
            }
          }
        ],
        grid: { containLabel: true },
        xAxis: { name: "课时" },
        yAxis: { type: "category" }
      });
      this.$apis.census.student_classhour_ranking(this.three).then(res => {
        if (res.data.code == 1) {
          for (let i = 0; i < res.data.data.length; i++) {
            this.top15_3[i] = [];
            this.top15_3[i].unshift(res.data.data[i].username);
            this.top15_3[i].unshift(res.data.data[i].classhour);
          }
          myLine2.setOption({
            dataset: {
              source: this.top15_3
            }
          });
        }
      });
    },
    lineChart() {
      let myLine = echarts.init(document.getElementById("main1"));
      myLine.setOption({
        title: {
          text: "班主任课时T15排行",
          lineHeight: 40,
          // left: 'center',
          //  subtext: "三级科目Top15",
          textStyle: {
            fontsize: "16px",
            fontWeight: "bolder"
          }
        },
        dataset: {
          source: []
        },
        series: [
          {
            type: "bar",
            encode: {
              x: "课时",
              y: "product"
            },
            label: {
              show: true,
              position: "right"
            }
          }
        ],
        grid: { containLabel: true },
        xAxis: { name: "课时" },
        yAxis: { type: "category" }
      });
      this.$apis.census.classteacher_classhour_ranking(this.one).then(res => {
        if (res.data.code == 1) {
          this.top15_1 = [];
          for (let i = 0; i < res.data.data.length; i++) {
            this.top15_1[i] = [];
            this.top15_1[i].push(res.data.data[i].classhour);
            this.top15_1[i].push(res.data.data[i].username);
          }
          myLine.setOption({
            dataset: {
              source: this.top15_1
            }
          });
        }
      });
    },

    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      //   let myChart = this.$echarts.init(document.getElementById("main"));全局引用的用法
      let myChart = echarts.init(document.getElementById("main"));
      var colors = ["#5793f3", "#d14a61", "#675bba"];
      // 指定图表的配置项和数据
      myChart.setOption({
        legend: {},
                             title: {
          text: "月份情况",
          lineHeight: 40,
          textStyle:{
fontsize:'16px',
 fontWeight : 'bolder'
          }
        },
        tooltip: {},
        dataset: {
          source: [
            ["product", "今年", "去年"],
            ["模拟数据", 43.3, 85.8],
            ["模拟数据", 83.1, 73.4]
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar", label: {
              show: true,
              position: "top"
            } }, { type: "bar", label: {
              show: true,
              position: "top"
            } }],
        // toolbox: {
        //   feature: {

        //     myTool2: {
        //       show: true,
        //       title: "自定义扩展方法",
        //       icon: "image://http://echarts.baidu.com/images/favicon.png",
        //       onclick: function() {
        //         alert("myToolHandler2");
        //       }
        //     },
        //     saveAsImage: { show: true } //保存图片
 
        //   }
        // }
      });

      this.$apis.census
        .total_onlevel_subject({ year_month: this.year_month,subject_id: this.main_subject_id})
        .then(res => {
          if (res.data.code == 1) {
         this.lastYear=[res.data.data[0].old_student_amount,res.data.data[1].old_teacher_amount,res.data.data[2].old_profit]
        this.thisYear=[res.data.data[0].student_amount,res.data.data[1].teacher_amount,res.data.data[2].profit]

            myChart.setOption({
              xAxis: [
                {
                  type: "category",
                  axisTick: {
                    alignWithLabel: true
                  },
                  data:['确认营业收入','确认课程成本','确认毛利金额']
                }
              ],

              yAxis: [
                {
                  name: "金额"
                }
              ],
              series: [
                {
                  name: "去年",
                  type: "bar",
                  data: this.lastYear
                },
                {
                  name: "今年",
                  type: "bar",
                  yAxisIndex: 0,
                  data: this.thisYear
                },

              ]
            });
          }
        });
    },
    getadata() {
      this.$apis.census.onlevel_subject(this.params).then(res => {
        this.tableData = [];
        if (
          Object.prototype.toString.call(res.data.data).substr(8, 5) ==
          Array
        ) {
          this.tableData = res.data.data;
        } else {
          this.tableData = [...res.data.data];
        }
      });
    },
    next() {
      this.params.page++;
      this.getadata();
    },
       current(num) {
      //当前页数
      this.params.page = num;
      this.getadata();
    },
    prev() {
      //上一页
      if (this.params.page > 1) {
        this.params.page--;
        this.getadata();
      }
    }
  },
  
  created() {
    this.getdata();
    this.$nextTick(function() {
      this.drawChart();
      this.lineChart();
      this.drawStudent();
      this.lineChart2();
    });
  },

  mounted() {
    this.$apis.census.onlevel_subject(this.params).then(res => {
      this.tableData = [];
      if (
        Object.prototype.toString.call(res.data.data).substr(8, 5) == Array
      ) {
        this.tableData = res.data.data;
        this.msg = res.data;
        
      } else {
        this.tableData = [...res.data.data];
        this.msg = res.data;
      }
    });
          this.$apis.students.students_list().then(res => {
        if (res.data.code == 1) {
          this.options_1 = res.data.data.list;
          for (let i = 0; i < this.options_1.length; i++) {
            var val = this.options_1[i];
            this.options1.push({ value: val.id, label: val.username });
          }
        }
      });
  }
};
</script>
<style scoped>
.echarts_1 {
  display: flex;
  align-items: space-around;
  justify-content: center;
  height: 500px;
  width: 100%;
}
.table_set {
  overflow-y: scroll;
}
.flex_all {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
}

.bgc {
  background-color: #fff;
  padding: 15px;
  margin: 10px;
  border-radius: 10px;
}
.session1 {
  background-color: #ddd;
  padding: 15px;
  margin: 10px 10px 40px 10px;
  border-radius: 10px;
}
</style>
