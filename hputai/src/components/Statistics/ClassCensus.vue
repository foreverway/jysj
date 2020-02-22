<template>
  <div id="app">
    <zx-head title="课时统计"></zx-head>
    <el-date-picker
      style="margin-left:20px"
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
      v-model="params.subject_level"
      placeholder="选择科目等级"
      @change="Change_sbuject"
    >
      <el-option label="一级科目" value="1"></el-option>
      <el-option label="二级科目" value="2"></el-option>
    </el-select>

    <el-cascader
      placeholder="选择科目"
      v-model="params.subject_id"
      filterable
      :options="options"
      clearable
      :props="{ expandTrigger: 'hover' }"
      :show-all-levels="false"
      @change="handleChange_1"
    ></el-cascader>
    <el-button type="primary" @click="recharge_export">导出</el-button>

    <el-table
      :data="tableData"
      height="500px"
      style="margin:15px 0;"
      border
      class="table_set"
      @selection-change="handleSelectionChange"
      :header-cell-style="{background:'#f4f4f4'}"
    >
      <el-table-column type="selection" fixed="left" @click="handleClick(scope.row)" width="55"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" align="center" label="科目名称" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.subject_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已排课时" width="80">
        <template slot-scope="scope">
          <p>{{ scope.row.yipai_classhour }}</p>
        </template>
      </el-table-column>
      <el-table-column label="已上课时" width="100" prop="yishang_classhour"></el-table-column>
      <el-table-column align="center" prop="daishang_classhour" label="待上课时" sortable></el-table-column>
      <el-table-column align="center" prop="online_cource" label="线上已上" sortable></el-table-column>
      <el-table-column align="center" prop="offline_cource" label="线下已上" sortable></el-table-column>
      <el-table-column label="已上班课" prop="class_number"></el-table-column>
      <el-table-column label="一对一已上" prop="yiduiyi_number"></el-table-column>
      <el-table-column align="center" label="试听已上" prop="audition"></el-table-column>
      <el-table-column align="center" label="正课已上" prop="just_courses"></el-table-column>
    </el-table>

    <div class="echarts_1">
      <div style="width:45%;height:450px;" class="bgc">
        <div class="block line_style">
            <h4>科目课时同比条形图</h4>
          <el-date-picker
            @change="changeMouth"
            v-model="changeMouth1"
            type="month"
            value-format="MM"
            placeholder="选择你想查看的月份"
          ></el-date-picker>
        </div>
        <div id="main" style="width:100%;height:400px;"></div>
      </div>
      <div style="width:45%;height:450px;" class="bgc">
        <div class="block line_style">
          <h4>科目课时环比条形图</h4>
          <el-date-picker
            @change="changeMouth_1"
            v-model="changeMouth2"
            type="month"
            value-format="MM"
            placeholder="选择你想查看的月份"
          ></el-date-picker>
        </div>
        <div id="main2" style="width:100%;height:400px;"></div>
      </div>
    </div>
    <div class="bgc">
      <div class="flex_all">
        <div style="">
     
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

      <div id="main1" style="width:100%;height:600px;"></div>
    </div>
    <div class="bgc">
      <div class="flex_all">
        <div>
          <el-radio-group fill="#5CB87A" v-model="three.status" @change="changeRadio_1">
            <el-radio-button label="1">已排</el-radio-button>
            <el-radio-button label="2">已上</el-radio-button>
            <el-radio-button label="3">待上</el-radio-button>
          </el-radio-group>
          <el-cascader
            placeholder="选择一级科目"
            v-model="subject_id2"
            filterable
            :options="options"
            clearable
            :props="{ expandTrigger: 'hover' }"
            :show-all-levels="false"
            @change="handleChange_2"
          ></el-cascader>
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
      <div id="main3" style="width:100%;height:500px;"></div>
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
      alreadyData: [],
      willData: [],
      yearData: [],
      idArr: [],
      params: {
        // begin_time:'',
        // end_time:'',
        // subject_level:'',
        // subject_id:'',
        // subject_ids:[]
      },
      options_: [], //科目的原来数据
      options: [], //我们需要的科目数据
      options_11: [], //科目的原来数据
      options11: [], //我们需要的科目数据
      classMouth: [],
      yipai_classhour: [],
      yishang_classhour: [],
      daishang_classhour: [],
      changeMouth1: "",
      changeMouth2: "",
      begin_time_1: "", //自由选择时间的绑定值1
      end_time_1: "", //自由选择时间的绑定值1
      begin_time_2: "", //自由选择时间的绑定值1
      end_time_2: "", //自由选择时间的绑定值1
      subject_id2: "", //科目一的选择
      begin_time_3: "", //总数组的绑定值
      end_time_3: "", //总数组的绑定值
      one: {
        begin_time: "",
        end_time: "",
        status: "1"
        // subject_id:''
      },
      three: {
        begin_time: "",
        end_time: "",
        status: "1",
        subject_id: ""
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
    handleSelectionChange(result) {
      this.idArr = [];
      for (let i = 0; i < result.length; i++) {
        this.idArr.push(result[i].id);
      }
      this.params.subject_ids = this.idArr.toString();
    },
    indexMethod(index) {},
    changeMouth(value) {
      this.changeMouth1 = value;
      this.drawChart();
    },
    changeMouth_1(value) {
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
      delete this.params.subject_ids;
    },
    changeEnd_3(event) {
      this.params.end_time = event ? event.toString().substr(0, 10) : "";
      this.getadata();
      //  this.params.subject_ids=[]
      delete this.params.subject_ids;
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
      for (var key in this.params) {
        if (key == "subject_ids" && this.params.subject_ids) {
          parms += key + "=" + this.params[key];
        } else {
          parms += key + "=" + this.params[key] + "&";
        }
      }

      window.location.href =
        url.urls + "/api_export_subject_classhour" + "?" + parms;
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
      this.getdata();
      this.getadata();
      delete this.params.subject_ids;
    },
    handleChange_1(targetName) {
      //选择科目
      var lastName = targetName[0] ? targetName[0] : "";
      this.params.subject_id = lastName;
      this.getadata();
      delete this.params.subject_ids;
    },
    handleChange_2(targetName) {
      //选择科目
      var lastName = targetName[0] ? targetName[0] : "";
      this.three.subject_id = lastName;
      this.lineChart2();
      // delete  this.params.subject_ids
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
        align: "center",
        verticalAlign: "middle",
        position: "top",
        distance: 15
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
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["请等待", "请等待", "请等待"]
        },
        // title: {
        //   text: "科目课时环比条形图",
        //   lineHeight: 40,
        //   textStyle: {
        //     fontsize: "16px",
        //     fontWeight: "bolder"
        //   }
        // },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["2012", "2013", "2014"]
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
            data: [320, 332, 301]
          },
          {
            name: "已上",
            type: "bar",
            label: labelOption,
            data: [220, 182, 191]
          },
          {
            name: "待上",
            type: "bar",
            label: labelOption,
            data: [150, 232, 201]
          }
        ]
      });
      this.$apis.census
        .chainratio_classhour({ month: this.changeMouth2 })
        .then(res => {
          if (res.data.code == 1) {
            this.classMouth = [];
            this.yipai_classhour = [];
            (this.yishang_classhour = []), (this.daishang_classhour = []);
            for (let i = 0; i < res.data.data.length; i++) {
              this.classMouth[i] = res.data.data[i].month;
              this.yipai_classhour[i] = res.data.data[i].yipai_classhour;
              this.yishang_classhour[i] = res.data.data[i].yishang_classhour;
              this.daishang_classhour[i] = res.data.data[i].daishang_classhour;
            }
            myDraw.setOption({
              legend: {
                data: ["已排", "已上", "待上"]
              },
              xAxis: [
                {
                  type: "category",
                  axisTick: { show: false },
                  data: this.classMouth
                }
              ],
              series: [
                {
                  name: "已排",
                  type: "bar",
                  barGap: 0,
                  label: labelOption,
                  data: this.yipai_classhour
                },
                {
                  name: "已上",
                  type: "bar",
                  label: labelOption,
                  data: this.yishang_classhour
                },
                {
                  name: "待上",
                  type: "bar",
                  label: labelOption,
                  data: this.daishang_classhour
                }
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
          text: "科目Top20",
          lineHeight: 40,
          // left: 'center',
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
      this.$apis.census.subjects_ranking(this.three).then(res => {
        if (res.data.code == 1) {
          this.top15_3 = [];
          for (let i = 0; i < res.data.data.length; i++) {
            this.top15_3[i] = [];
            this.top15_3[i].unshift(res.data.data[i].subject_name);
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
          text: "一级科目",
          lineHeight: 40,
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
      this.$apis.census.one_subjects_ranking(this.one).then(res => {
        if (res.data.code == 1) {
          this.top15_1 = [];
          for (let i = 0; i < res.data.data.length; i++) {
            this.top15_1[i] = [];
            this.top15_1[i].push(res.data.data[i].classhour);
            this.top15_1[i].push(res.data.data[i].subject_name);
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
      app.config = {
        rotate: 0,
        align: "center",
        verticalAlign: "middle",
        position: "top",
        distance: 15
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
      // 指定图表的配置项和数据
      myChart.setOption({
        legend: {},
        tooltip: {},
        // title: {
        //   text: "科目课时同比条形图",
        //   lineHeight: 40,
        //   textStyle: {
        //     fontsize: "16px",
        //     fontWeight: "bolder"
        //   }
        // },
        dataset: {
          source: [
            ["product", "2015", "2016"],
            ["模拟数据", 43.3, 85.8],
            ["模拟数据", 83.1, 73.4]
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: "bar", label: labelOption },
          { type: "bar", label: labelOption }
        ],
        // toolbox: {
        //   feature: {
        //     myTool1: {
        //       show: true,
        //       title: "选择月份",
        //       icon:
        //         "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
        //       onclick: function() {
        //         this.showMouth1 = true;
        //       }
        //     },
        //     myTool2: {
        //       show: true,
        //       title: "自定义扩展方法",
        //       icon: "image://http://echarts.baidu.com/images/favicon.png",
        //       onclick: function() {
        //         alert("myToolHandler2");
        //       }
        //     },
        //     saveAsImage: { show: true } //保存图片
        //     // dataView: { show: true, readOnly: false },
        //     // restore: { show: true }
        //   }
        // }
      });
      // 使用刚指定的配置项和数据显示图表。
      //  myChart.setOption(option);
      this.$apis.census
        .yearonyear_classhour({ month: this.changeMouth1 })
        .then(res => {
          if (res.data.code == 1) {
            this.alreadyData = [];
            this.willData = [];
            this.yearData = [];
            this.alreadyData[0] = res.data.data[0].yipai_classhour;
            this.alreadyData[1] = res.data.data[1].yipai_classhour;
            (this.willData[0] = res.data.data[0].yishang_classhour),
              (this.willData[1] = res.data.data[1].yishang_classhour);

            for (let i = 0; i < res.data.data.length; i++) {
              if (i == 0) {
                this.yearData[i] = res.data.data[i].month;
              } else {
                this.yearData[i] = res.data.data[i].month;
              }
            }
            myChart.setOption({
              xAxis: [
                {
                  type: "category",
                  axisTick: {
                    alignWithLabel: true
                  },
                  data: this.yearData
                }
              ],
              //                       title: {
              //           text: "三级科目Top15",
              //           lineHeight: 30,

              //           t0extStyle:{
              // fontsize:'16px',
              //  fontWeight : 'bolder'
              //           }
              //         },
              yAxis: [
                {
                  name: "课时"
                }
              ],
              series: [
                {
                  name: "已排",
                  type: "bar",
                  data: this.alreadyData
                },
                {
                  name: "已上",
                  type: "bar",
                  yAxisIndex: 0,
                  data: this.willData
                }
              ]
            });
          }
        });
    },
    getadata() {
      this.$apis.census.subject_classhour(this.params).then(res => {
        this.tableData = [];
        if (
          Object.prototype.toString.call(res.data.data).substr(8, 5) == Array
        ) {
          this.tableData = res.data.data;
        } else {
          this.tableData = [...res.data.data];
        }
      });
    }
  },
  created() {
    this.getdata();
    this.$nextTick(function() {
      this.drawChart();
      this.lineChart();
      this.drawStudent();
      this.lineChart2();
      this.$apis.census.subject_classhour().then(res => {
        if (res.data.code == 200) {
        }
      });
    });
  },

  mounted() {
    this.$apis.census.subject_classhour(this.params).then(res => {
      if (res.data.code == 1) {
        this.tableData = res.data.data;
      }
    });

    //获取科目的数据
    this.$apis.census.get_parent_info({ subject_level: 1 }).then(res => {
      if (res.data.code == 1) {
        this.options_11 = [];

        for (let i = 0; i < res.data.data.length; i++) {
          this.options_.push({
            value: res.data.data[i].id,
            label: res.data.data[i].subject_name
          });
        }
        this.options11 = this.options_11;
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
.line_style{
display:flex;
align-items: center;
justify-content: space-around;
}
.bgc {
  background-color: #fff;
  padding: 15px;
  margin: 10px;
  border-radius: 10px;
}
.near {
  padding: 0 -16px!;
}
</style>
