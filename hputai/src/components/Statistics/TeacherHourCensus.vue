<template>
  <div id="app">
    <zx-head title="教师课时统计"></zx-head>
    <div class="session1">
      <el-input
        style="width:150px;"
        placeholder="搜索老师姓名"
        @input="getadata"
        v-model="params.keywords"
      ></el-input>

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
        v-model="params.teacher_type"
        placeholder="教师属性"
        @change="Change_sbuject"
      >
        <el-option label="兼职" value="2"></el-option>
        <el-option label="全职" value="1"></el-option>
      </el-select>

      <el-select
        clearable
        v-model="params.teacher_rate"
        placeholder="教师星级"
        @change="Change_sbuject"
      >
        <el-option
          v-for="item in rateArr"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-button type="primary" @click="recharge_export">导出</el-button>

      <el-table
        :data="tableData"
        empty-text="正在获取数据，请稍等"
        height="500px"
        style="margin:15px 0;"
        border
        class="table_set"
        @selection-change="handleSelectionChange"
        :header-cell-style="{background:'#f4f4f4'}"
      >
        <el-table-column type="selection" fixed="left" @click="handleClick(scope.row)" width="55"></el-table-column>
        <el-table-column type="index" :index="indexMethod" width="50" label="序号"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" align="center" label="教师名称" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.teacher_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="教师类型" width="80">
          <template slot-scope="scope">
            <p>{{ scope.row.teacher_type }}</p>
          </template>
        </el-table-column>
        <el-table-column label="教师星级" width="100" prop="teacher_rate"></el-table-column>
        <el-table-column align="center" prop="yipai_classhour" label="已排课时" sortable></el-table-column>
        <el-table-column align="center" prop="yishang_classhour" label="已上课时" sortable></el-table-column>
        <el-table-column align="center" prop="daishang_classhour" label="待上课时" sortable></el-table-column>
        <el-table-column label="	班课已上" prop="class_number"></el-table-column>
        <el-table-column label="一对一已上" prop="yiduiyi_number"></el-table-column>
        <el-table-column align="center" label="课酬" prop="amount"></el-table-column>
        <el-table-column align="center" label="累计已上" prop="total_yishang_classhour"></el-table-column>
        <el-table-column label="累计课酬" prop="total_amount"></el-table-column>
        <el-table-column align="center" label="	平均单课时成本" prop="average_price"></el-table-column>
      </el-table>
      <span v-if="msg.data">
        <el-pagination
          style="float:right;margin-top:20px;margin-bottom: 20px;"
          background
          layout="prev, pager, next"
          @prev-click="prev"
          @next-click="next"
          @current-change="current"
          :page-size="10"
          :total="msg.data.total"
        ></el-pagination>
      </span>
    </div>
    <div class="session1">
      <div style="width:100%;" class="flex_div">
        <div style="font-weight:900;">全职与兼职的课时占比情况(%)</div>
        <div>
          <el-button
            class="near"
            style="margin:0 -2px ;border-radius:5px 0 0  5px;"
            @click="showDay"
          >上月</el-button>
          <el-button class="near" style="margin:0 -3px ;border-radius:0;" @click="showMouth">本月</el-button>
          <el-button
            class="near"
            style="margin:0 -2px ;border-radius:0 5px 5px  0;"
            @click="showWeek"
          >下月</el-button>
        </div>
        <el-date-picker
          @change="changeMouth"
          v-model="changeMouth1"
          type="month"
          value-format="MM"
          placeholder="选择你想查看的月份"
        ></el-date-picker>
        <el-button type="primary" @click="recharge_export_2">导出</el-button>
      </div>
      <!-- 全职与兼职的课时占比情况 -->
      <el-table
        empty-text="正在获取数据，请稍等"
        :data="tableData_1"
        style="margin:15px 0;"
        border
        class="table_set table1"
        @selection-change="handleSelectionChange"
        :header-cell-style="{background:'#f4f4f4'}"
      >
        <el-table-column :show-overflow-tooltip="true" align="center" label="一级科目">
          <template slot-scope="scope">
            <span>{{ scope.row.subject_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="已排课时" v-if="params_1.is_today!==-1">
          <template slot-scope="scope">
            <p>{{ scope.row.total_yipai }}</p>
          </template>
        </el-table-column>
        <el-table-column label="已上课时" v-if="params_1.is_today!==2" prop="total_yishang"></el-table-column>
        <!-- <el-table-column align="center" prop="total_daishang" label="总的待上课时" sortable></el-table-column> -->
        <el-table-column
          align="center"
          prop="total_amount"
          label="课酬金额"
          sortable
          v-if="params_1.is_today==-1"
        ></el-table-column>
        <!-- <el-table-column align="center" prop="total_amount" label="待上课时" sortable></el-table-column> -->
        <el-table-column label="全职已排" prop="quan_yipai_classhour" v-if="params_1.is_today!==-1"></el-table-column>
        <el-table-column label="兼职已排" prop="jian_yipai_classhour" v-if="params_1.is_today!==-1"></el-table-column>
        <el-table-column
          align="center"
          label="全职已上"
          v-if="params_1.is_today!==2"
          prop="quan_yishang_classhour"
        ></el-table-column>
        <el-table-column
          align="center"
          label="兼职已上"
          v-if="params_1.is_today!==2"
          prop="jian_yishang_classhour"
        ></el-table-column>

        <!-- <el-table-column align="center" label="全职待上占比" prop="quan_daishang_classhour"></el-table-column> -->
        <!-- <el-table-column label="兼职待上占比" prop="jian_daishang_classhour"></el-table-column> -->
        <el-table-column
          align="center"
          label="已上课酬金额"
          prop="total_amount"
          v-if="params_1.is_today==1"
        ></el-table-column>
        <el-table-column
          align="center"
          label="全职课酬占比"
          prop="quan_amount"
          v-if="params_1.is_today!==2"
        ></el-table-column>
        <el-table-column label="兼职课酬占比" prop="jian_amount" v-if="params_1.is_today!==2"></el-table-column>
        <el-table-column
          align="center"
          label="全职平均课酬"
          prop="quan_average_amount"
          v-if="params_1.is_today==1"
        ></el-table-column>
        <el-table-column
          align="center"
          label="兼职平均课酬"
          prop="jian_average_amount"
          v-if="params_1.is_today==1"
        ></el-table-column>
        <el-table-column
          align="center"
          label="全职平均课时成本"
          v-if="params_1.is_today==-1"
          prop="quan_average_amount"
        ></el-table-column>
        <el-table-column
          align="center"
          label="兼职平均课时成本"
          prop="jian_average_amount"
          v-if="params_1.is_today==-1"
        ></el-table-column>
      </el-table>
      <div v-if="msg1.data" style="display:block;width:100%;">
        <el-pagination
          style="float:right;margin-top:20px;"
          background
          layout="prev, pager, next"
          @prev-click="prev_1"
          @next-click="next_1"
          @current-change="current_1"
          :page-size="10"
          :total="msg1.data.total"
        ></el-pagination>
      </div>
    </div>

    <div class="bgc">
      <div class="flex_all">
        <el-date-picker
          @change="change_Start(1)"
          v-model="year_month"
          type="month"
          placeholder="选择你想查看的月份"
        ></el-date-picker>
      </div>

      <div id="main1" style="width:100%;height:500px;"></div>
    </div>

    <div class="bgc">
      <div class="flex_all">
        <el-date-picker
          @change="change_Start(2)"
          v-model="year_month1"
          type="month"
          placeholder="选择你想查看的月份"
        ></el-date-picker>
      </div>

      <div id="main2" style="width:100%;height:500px;"></div>
    </div>
    <div class="bgc">
      <div class="flex_all">
        <el-date-picker
          @change="change_Start(3)"
          v-model="year_month2"
          type="month"
          placeholder="选择你想查看的月份"
        ></el-date-picker>
      </div>

      <div id="main3" style="width:100%;height:500px;"></div>
    </div>
    <div class="bgc">
      <div class="flex_all">
        <el-date-picker
          @change="change_Start(4)"
          v-model="year_month3"
          type="month"
          placeholder="选择你想查看的月份"
        ></el-date-picker>
      </div>

      <div id="main4" style="width:100%;height:500px;"></div>
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
      tableData_1: [], //全职兼职列表
      tableData_2: [], //
      options: [],
      top15_1: [],
      top15_3: [],
      top15_2: [],
      top15_4: [],
      mouthData: [], //获取上一个月和前一年上一个月的数据

      yearData: [],
      ordinary_stu: [],
      keepreading_stu: [],
      vip_stu: [],
      idArr: [],
      params: {
        // keywords: "", //	老师名字搜索
        page: 1 //	页码
        // begin_time: "", //	开始时间
        // end_time: "", //	结束时间
        // teacher_type: "", //	教师类型1全职，2兼职
        // teacher_rate: "" //	教师星级1，2，3，4，5
      },
      params_1: {
        page: "", //	页码
        begin_time: "", //	开始时间
        end_time: "", //	结束时间
        is_today: 1 //默认是当月，1当月，-1上月，2下月
      },
      params_2: {
        // keywords: "", //	老师名字搜索
        page: "", //	页码
        begin_time: "", //	开始时间
        end_time: "" //	结束时间
        // teacher_type: "", //	教师类型1全职，2兼职
        // teacher_rate: "" //	教师星级1，2，3，4，5
      },
      rateArr: [
        { value: 1, label: "一星级" },
        { value: 2, label: "二星级" },
        { value: 3, label: "三星级" },
        { value: 4, label: "四星级" },
        { value: 5, label: "五星级" }
      ],
      options_: [], //科目的原来数据
      options: [], //我们需要的科目数据
      options_1: [], //学生的原来数据
      options1: [], //我们需要的学生数据
      classMouth: [],
      ordinary_classhour: [],
      keepreading_classhour: [],
      vip_classhour: [],
      msg: [],
      msg1: [],
      msg2: [],
      changeMouth1: "",
      changeMouth2: "",
      begin_time_1: "", //自由选择时间的绑定值1
      end_time_1: "", //自由选择时间的绑定值1
      begin_time_2: "", //自由选择时间的绑定值1
      end_time_2: "", //自由选择时间的绑定值1
      begin_time_3: "", //总数组的绑定值
      end_time_3: "", //总数组的绑定值
      begin_time_main1: "",
      begin_time_main2: "",
      begin_time_main3: "",
      begin_time_main4: "",
      end_time_main1: "",
      end_time_main2: "",
      end_time_main3: "",
      end_time_main4: "",
      year_month: "",
      year_month1: "",
      year_month2: "",
      year_month3: "",
      one: {
        begin_time: "",
        end_time: "",
        year_month: ""
      },
      two: {
        begin_time: "",
        end_time: "",
        year_month: ""
      },
      three: {
        begin_time: "",
        end_time: "",
        year_month: ""
      },
      four: {
        begin_time: "",
        end_time: "",
        year_month: ""
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
    // 全职老师已排课时统计1
    lineChart() {
      let myLine = echarts.init(document.getElementById("main1"));
      myLine.setOption({
        title: {
          text: "全职老师已排课时统计",
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
        xAxis: { name: "课时", nameTextStyle: { fontSize: 16 } },
        yAxis: { type: "category", name: "教师姓名" }
      });
      this.$apis.census.fulltime_yipai_classhour(this.one).then(res => {
        if (res.data.code == 1) {
          this.top15_1 = [];
          for (let i = 0; i < res.data.data.length; i++) {
            this.top15_1[i] = [];
            this.top15_1[i].push(res.data.data[i].yipai_classhour);
            this.top15_1[i].push(res.data.data[i].teacher_name);
          }
          myLine.setOption({
            dataset: {
              source: this.top15_1
            }
          });
        }
      });
    },
    // 全职老师已上课时统计2
    lineChart_1() {
      let myLine = echarts.init(document.getElementById("main2"));
      myLine.setOption({
        title: {
          text: "全职老师已上课时统计",
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
              position: "right",
            }
          },
          // label: {
          //   normal: {
          //     show: true,
          //     position: "top",
          //     formatter: "{c} ℃"
          //   }
          // }
        ],
        grid: { containLabel: true },
        xAxis: { name: "课时" },
        yAxis: { type: "category", name: "教师姓名" }
      });
      this.$apis.census.fulltime_upper_classhour(this.two).then(res => {
        if (res.data.code == 1) {
          this.top15_2 = [];
          for (let i = 0; i < res.data.data.length; i++) {
            this.top15_2[i] = [];
            this.top15_2[i].push(res.data.data[i].yishang_classhour);
            this.top15_2[i].push(res.data.data[i].teacher_name);
          }
          myLine.setOption({
            dataset: {
              source: this.top15_2
            }
          });
        }
      });
    },
    lineChart_2() {
      let myLine = echarts.init(document.getElementById("main3"));
      myLine.setOption({
        title: {
          text: "全职教师已排课时目标完成度",
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
              position: "right",
              formatter: '{c}%'
            }
          }
        ],
        grid: { containLabel: true },
        xAxis: { name: "%" },
        yAxis: { type: "category", name: "老师姓名" }
      });
      this.$apis.census.fulltime_yipai_complete(this.three).then(res => {
        if (res.data.code == 1) {
          this.top15_3 = [];
          for (let i = 0; i < res.data.data.length; i++) {
            this.top15_3[i] = [];
            
            this.top15_3[i].push(res.data.data[i].complete_classhour );
            this.top15_3[i].push(res.data.data[i].teacher_name);
          }
          myLine.setOption({
            dataset: {
              source: this.top15_3
            }
          });
        }
      });
    },
    lineChart_3() {
      let myLine = echarts.init(document.getElementById("main4"));
      myLine.setOption({
        title: {
          text: "全职教师已上课时目标完成度",
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
        xAxis: { name: "%" },
        yAxis: { type: "category", name: "老师姓名" }
      });
      this.$apis.census.fulltime_upper_complete(this.four).then(res => {
        if (res.data.code == 1) {
          this.top15_4 = [];
          for (let i = 0; i < res.data.data.length; i++) {
            this.top15_4[i] = [];
            this.top15_4[i].push(res.data.data[i].complete_classhour);
            this.top15_4[i].push(res.data.data[i].teacher_name);
          }
          myLine.setOption({
            dataset: {
              source: this.top15_4
            }
          });
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
      this.changeMouth1 = value;
      //起止日期数组
      var startStop = new Array();
      //获取当前时间
      var currentDate = new Date();
      //获得当前月份0-11
      var changeMouth = value.split("")[0] == 0 ? value.split("")[1] : value;
      var currentMonth = value - 1;
      //获得当前年份4位年
      var currentYear = currentDate.getFullYear();
      //求出本月第一天
      var firstDay = new Date(currentYear, currentMonth, 1); //本年月的第一天

      //　month的值域为0～11，0代表1月，11表代表12月；
      if (currentMonth == 11) {
        //月份需要更新为0 也就是下一年的第一个月
        currentYear++;
        currentMonth = 0; //就为
      } else {
        //否则只是月份增加,以便求的下一月的第一天
        currentMonth++;
      }
      //一天的毫秒数
      var millisecond = 1000 * 60 * 60 * 24; //一天
      //-
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
      this.params_1.begin_time = s1.toString();
      this.params_1.end_time = e1.toString();
      this.getadata_1();
    },
    changeMouth_1(value) {
      this.changeMouth2 = value;
      //起止日期数组
      var startStop = new Array();
      //获取当前时间
      var currentDate = new Date();
      //获得当前月份0-11
      var changeMouth = value.split("")[0] == 0 ? value.split("")[1] : value;
      var currentMonth = value - 1;
      //获得当前年份4位年
      var currentYear = currentDate.getFullYear();
      //求出本月第一天
      var firstDay = new Date(currentYear, currentMonth, 1); //本年月的第一天

      //　month的值域为0～11，0代表1月，11表代表12月；
      if (currentMonth == 11) {
        //月份需要更新为0 也就是下一年的第一个月
        currentYear++;
        currentMonth = 0; //就为
      } else {
        //否则只是月份增加,以便求的下一月的第一天
        currentMonth++;
      }
      //一天的毫秒数
      var millisecond = 1000 * 60 * 60 * 24; //一天
      //-
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
      this.params_2.begin_time = s1.toString();
      this.params_2.end_time = e1.toString();
      this.getadata_2();
    },
    changeMouth_2(value) {
      //  this.changeMouth2=value
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
      this.tableData_1 = [];
      var startStop = new Array();

      //返回上一个月的第一天Date类型
      this.getPriorMonthFirstDay = function(year, month) {
        //年份为0代表,是本年的第一月,所以不能减
        if (month == 0) {
          month = 11; //月份为上年的最后月份
          year--; //年份减1
          return new Date(year, month, 1);
        }
        //否则,只减去月份
        month--;
        return new Date(year, month, 1);
      };

      //获得某年月的天数
      this.getMonthDays = function(year, month) {
        //本月第一天 1-31
        var relativeDate = new Date(year, month, 1);
        //获得当前月份0-11
        var relativeMonth = relativeDate.getMonth();
        //获得当前年份4位年
        var relativeYear = relativeDate.getFullYear();

        //当为12月的时候年份需要加1
        //月份需要更新为0 也就是下一年的第一个月
        if (relativeMonth == 11) {
          relativeYear++;
          relativeMonth = 0;
        } else {
          //否则只是月份增加,以便求的下一月的第一天
          relativeMonth++;
        }
        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天
        var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
        //返回得到上月的最后一天,也就是本月总天数
        return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
      };
      //获取当前时间
      var currentDate = new Date();
      //获得当前月份0-11
      var currentMonth = currentDate.getMonth();
      //获得当前年份4位年
      var currentYear = currentDate.getFullYear();
      //获得上一个月的第一天
      var priorMonthFirstDay = this.getPriorMonthFirstDay(
        currentYear,
        currentMonth
      );
      //获得上一月的最后一天
      var priorMonthLastDay = new Date(
        priorMonthFirstDay.getFullYear(),
        priorMonthFirstDay.getMonth(),
        this.getMonthDays(
          priorMonthFirstDay.getFullYear(),
          priorMonthFirstDay.getMonth()
        )
      );

      var sy = priorMonthFirstDay.getFullYear();
      var sm = priorMonthFirstDay.getMonth() + 1;
      var sd = priorMonthFirstDay.getDate();
      var ey = priorMonthLastDay.getFullYear();
      var em = priorMonthLastDay.getMonth() + 1;
      var ed = priorMonthLastDay.getDate();
      var s = sy + "-" + this.add0(sm) + "-" + this.add0(sd) + " 00:00:00"; //开始
      var e = ey + "-" + this.add0(em) + "-" + this.add0(ed) + " 23:59:59"; //结束
      var s1 = this.dateToMs(s)
        .toString()
        .substr(0, 10);
      var e1 = this.dateToMs(e)
        .toString()
        .substr(0, 10);
      this.params_1.begin_time = s1.toString();
      this.params_1.end_time = e1.toString();
      this.params_1.is_today = -1;
      this.getadata_1();
    },
    showDay_2() {
      var startStop = new Array();

      //返回上一个月的第一天Date类型
      this.getPriorMonthFirstDay = function(year, month) {
        //年份为0代表,是本年的第一月,所以不能减
        if (month == 0) {
          month = 11; //月份为上年的最后月份
          year--; //年份减1
          return new Date(year, month, 1);
        }
        //否则,只减去月份
        month--;
        return new Date(year, month, 1);
      };

      //获得某年月的天数
      this.getMonthDays = function(year, month) {
        //本月第一天 1-31
        var relativeDate = new Date(year, month, 1);
        //获得当前月份0-11
        var relativeMonth = relativeDate.getMonth();
        //获得当前年份4位年
        var relativeYear = relativeDate.getFullYear();

        //当为12月的时候年份需要加1
        //月份需要更新为0 也就是下一年的第一个月
        if (relativeMonth == 11) {
          relativeYear++;
          relativeMonth = 0;
        } else {
          //否则只是月份增加,以便求的下一月的第一天
          relativeMonth++;
        }
        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天
        var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
        //返回得到上月的最后一天,也就是本月总天数
        return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
      };
      //获取当前时间
      var currentDate = new Date();
      //获得当前月份0-11
      var currentMonth = currentDate.getMonth();
      //获得当前年份4位年
      var currentYear = currentDate.getFullYear();
      //获得上一个月的第一天
      var priorMonthFirstDay = this.getPriorMonthFirstDay(
        currentYear,
        currentMonth
      );
      //获得上一月的最后一天
      var priorMonthLastDay = new Date(
        priorMonthFirstDay.getFullYear(),
        priorMonthFirstDay.getMonth(),
        this.getMonthDays(
          priorMonthFirstDay.getFullYear(),
          priorMonthFirstDay.getMonth()
        )
      );

      var sy = priorMonthFirstDay.getFullYear();
      var sm = priorMonthFirstDay.getMonth() + 1;
      var sd = priorMonthFirstDay.getDate();
      var ey = priorMonthLastDay.getFullYear();
      var em = priorMonthLastDay.getMonth() + 1;
      var ed = priorMonthLastDay.getDate();
      var s = sy + "-" + this.add0(sm) + "-" + this.add0(sd) + " 00:00:00"; //开始
      var e = ey + "-" + this.add0(em) + "-" + this.add0(ed) + " 23:59:59"; //结束
      var s1 = this.dateToMs(s)
        .toString()
        .substr(0, 10);
      var e1 = this.dateToMs(e)
        .toString()
        .substr(0, 10);
      this.params_2.begin_time = s1.toString();
      this.params_2.end_time = e1.toString();
      this.getadata_2();
    },
    showWeek() {
      // $(bodyDiv)[0].style.height = $(window).height() * 1 - 50 + "px";
      let beforeHeight = $(".table1").height();
      this.tableData_1 = [];
      console.log($(".table1").height());
      $(".table1 tbody")[0].style.height = beforeHeight;
      console.log($(".table1").height());
      var startStop = new Array();

      //返回下个月的第一天Date类型
      this.getNextMonthFirstDay = function(year, month) {
        //年份为0代表,是本年的第一月,所以不能减
        if (month == 11) {
          month = 0; //月份为上年的最后月份
          year++; //年份减1
          return new Date(year, month, 1);
        }
        //否则,只减去月份
        month++;
        return new Date(year, month, 1);
      };
      //获得某年月的天数
      this.getMonthDays = function(year, month) {
        //本月第一天 1-31
        var relativeDate = new Date(year, month, 1);
        //获得当前月份0-11
        var relativeMonth = relativeDate.getMonth();
        //获得当前年份4位年
        var relativeYear = relativeDate.getFullYear();

        //当为12月的时候年份需要加1
        //月份需要更新为0 也就是下一年的第一个月
        if (relativeMonth == 11) {
          relativeYear++;
          relativeMonth = 0;
        } else {
          //否则只是月份增加,以便求的下一月的第一天
          relativeMonth++;
        }
        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天
        var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
        //返回得到上月的最后一天,也就是本月总天数
        return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
      };
      //获取当前时间
      var currentDate = new Date();
      //获得当前月份0-11
      var currentMonth = currentDate.getMonth();
      //获得当前年份4位年
      var currentYear = currentDate.getFullYear();
      //获得上一个月的第一天
      var priorMonthFirstDay = this.getNextMonthFirstDay(
        currentYear,
        currentMonth
      );
      //获得上一月的最后一天
      var priorMonthLastDay = new Date(
        priorMonthFirstDay.getFullYear(),
        priorMonthFirstDay.getMonth(),
        this.getMonthDays(
          priorMonthFirstDay.getFullYear(),
          priorMonthFirstDay.getMonth()
        )
      );

      var sy = priorMonthFirstDay.getFullYear();
      var sm = priorMonthFirstDay.getMonth() + 1;
      var sd = priorMonthFirstDay.getDate();
      var ey = priorMonthLastDay.getFullYear();
      var em = priorMonthLastDay.getMonth() + 1;
      var ed = priorMonthLastDay.getDate();
      var s = sy + "-" + this.add0(sm) + "-" + this.add0(sd) + " 00:00:00"; //开始
      var e = ey + "-" + this.add0(em) + "-" + this.add0(ed) + " 23:59:59"; //结束
      var s1 = this.dateToMs(s)
        .toString()
        .substr(0, 10);
      var e1 = this.dateToMs(e)
        .toString()
        .substr(0, 10);
      this.params_1.begin_time = s1.toString();
      this.params_1.end_time = e1.toString();
      this.params_1.is_today = 2;
      this.getadata_1();
    },
    showWeek_2() {
      var startStop = new Array();

      //返回下个月的第一天Date类型
      this.getNextMonthFirstDay = function(year, month) {
        //年份为0代表,是本年的第一月,所以不能减
        if (month == 11) {
          month = 0; //月份为上年的最后月份
          year++; //年份减1
          return new Date(year, month, 1);
        }
        //否则,只减去月份
        month++;
        return new Date(year, month, 1);
      };
      //获得某年月的天数
      this.getMonthDays = function(year, month) {
        //本月第一天 1-31
        var relativeDate = new Date(year, month, 1);
        //获得当前月份0-11
        var relativeMonth = relativeDate.getMonth();
        //获得当前年份4位年
        var relativeYear = relativeDate.getFullYear();

        //当为12月的时候年份需要加1
        //月份需要更新为0 也就是下一年的第一个月
        if (relativeMonth == 11) {
          relativeYear++;
          relativeMonth = 0;
        } else {
          //否则只是月份增加,以便求的下一月的第一天
          relativeMonth++;
        }
        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天
        var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
        //返回得到上月的最后一天,也就是本月总天数
        return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
      };
      //获取当前时间
      var currentDate = new Date();
      //获得当前月份0-11
      var currentMonth = currentDate.getMonth();
      //获得当前年份4位年
      var currentYear = currentDate.getFullYear();
      //获得上一个月的第一天
      var priorMonthFirstDay = this.getNextMonthFirstDay(
        currentYear,
        currentMonth
      );
      //获得上一月的最后一天
      var priorMonthLastDay = new Date(
        priorMonthFirstDay.getFullYear(),
        priorMonthFirstDay.getMonth(),
        this.getMonthDays(
          priorMonthFirstDay.getFullYear(),
          priorMonthFirstDay.getMonth()
        )
      );

      var sy = priorMonthFirstDay.getFullYear();
      var sm = priorMonthFirstDay.getMonth() + 1;
      var sd = priorMonthFirstDay.getDate();
      var ey = priorMonthLastDay.getFullYear();
      var em = priorMonthLastDay.getMonth() + 1;
      var ed = priorMonthLastDay.getDate();
      var s = sy + "-" + this.add0(sm) + "-" + this.add0(sd) + " 00:00:00"; //开始
      var e = ey + "-" + this.add0(em) + "-" + this.add0(ed) + " 23:59:59"; //结束
      var s1 = this.dateToMs(s)
        .toString()
        .substr(0, 10);
      var e1 = this.dateToMs(e)
        .toString()
        .substr(0, 10);
      this.params_2.begin_time = s1.toString();
      this.params_2.end_time = e1.toString();
      this.getadata_2();
    },
    showMouth() {
      this.tableData_1 = [];
      //起止日期数组
      var startStop = new Array();
      //获取当前时间
      var currentDate = new Date();
      //获得当前月份0-11
      var currentMonth = currentDate.getMonth();
      //获得当前年份4位年
      var currentYear = currentDate.getFullYear();
      //求出本月第一天
      var firstDay = new Date(currentYear, currentMonth, 1); //本年月的第一天

      //　month的值域为0～11，0代表1月，11表代表12月；
      if (currentMonth == 11) {
        //月份需要更新为0 也就是下一年的第一个月
        currentYear++;
        currentMonth = 0; //就为
      } else {
        //否则只是月份增加,以便求的下一月的第一天
        currentMonth++;
      }
      //一天的毫秒数
      var millisecond = 1000 * 60 * 60 * 24; //一天
      //-
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
      this.params_1.begin_time = s1.toString();
      this.params_1.end_time = e1.toString();
      this.params_1.is_today = 1;
      this.getadata_1();
    },
    handleClick(result) {},
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
      var firstDay = new Date(currentYear, currentMonth, 1); //本年月的第一天

      //　month的值域为0～11，0代表1月，11表代表12月；
      if (currentMonth == 11) {
        //月份需要更新为0 也就是下一年的第一个月
        currentYear++;
        currentMonth = 0; //就为
      } else {
        //否则只是月份增加,以便求的下一月的第一天
        currentMonth++;
      }
      //一天的毫秒数
      var millisecond = 1000 * 60 * 60 * 24; //一天
      //-
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
      this.params_2.begin_time = s1.toString();
      this.params_2.end_time = e1.toString();
      this.getadata_2();
    },
    // changeStart(event) {
    //   if (this.hadClick == true) {
    //     this.one.end_time = "";
    //     this.one.begin_time = event ? event.toString().substr(0, 10) : "";
    //     this.lineChart();
    //     this.hadClick = false;
    //   } else {
    //     this.one.begin_time = event ? event.toString().substr(0, 10) : "";
    //     this.lineChart();
    //   }
    // },
    change_Start(value) {
      let newTime = new Date();
      switch (value) {
        case 1:
          var thisdate = new Date(this.year_month ? this.year_month : newTime);
          var month1 = thisdate.getMonth() * 1 + 1;
          var month = month1 < 10 ? "0" + month1 : month1;

          this.year_month = thisdate.getFullYear() + "-" + month;
          this.one.year_month = this.year_month;
          console.log(this.one.year_month);
          this.lineChart();
          break;
        case 2:
          var thisdate = new Date(
            this.year_month1 ? this.year_month1 : newTime
          );
          // var thisdate = new Date(this.year_month1);
          var month1 = thisdate.getMonth() * 1 + 1;
          var month = month1 < 10 ? "0" + month1 : month1;

          this.year_month1 = thisdate.getFullYear() + "-" + month;
          this.two.year_month = this.year_month1;
          this.lineChart_1();
          break;
        case 3:
          var thisdate = new Date(
            this.year_month2 ? this.year_month2 : newTime
          );
          var month1 = thisdate.getMonth() * 1 + 1;
          var month = month1 < 10 ? "0" + month1 : month1;

          this.year_month2 = thisdate.getFullYear() + "-" + month;
          this.three.year_month = this.year_month2;
          this.lineChart_2();
          break;
        case 4:
          var thisdate = new Date(
            this.year_month3 ? this.year_month3 : newTime
          );
          var month1 = thisdate.getMonth() * 1 + 1;
          var month = month1 < 10 ? "0" + month1 : month1;

          this.year_month3 = thisdate.getFullYear() + "-" + month;
          this.four.year_month = this.year_month3;
          this.lineChart_3();
          break;
        default:
          break;
      }

      // this.$apis.census
      //   .total_onlevel_subject({
      //     year_month: this.year_month,
      //     subject_id: this.main_subject_id
      //   })
      //   .then(res => {
      //     if (res.data.code == 1) {
      //       this.lastYear = [
      //         res.data.data[0].old_student_amount,
      //         res.data.data[1].old_teacher_amount,
      //         res.data.data[2].old_profit
      //       ];
      //       this.thisYear = [
      //         res.data.data[0].student_amount,
      //         res.data.data[1].teacher_amount,
      //         res.data.data[2].profit
      //       ];
      //     }
      //   });
    },
    //     change_Start(event) {
    //   if (this.hadClick == true) {
    //     this.one.end_time = "";
    //     this.one.begin_time = event ? event.toString().substr(0, 10) : "";
    //     this.lineChart();
    //     this.hadClick = false;
    //   } else {
    //     this.one.begin_time = event ? event.toString().substr(0, 10) : "";
    //     this.lineChart();
    //   }
    // },
    //序号排列
    indexMethod(index) {
      if (this.params.page == 1) {
        return index + 1;
      } else {
        let page = (this.params.page - 1) * 10 + 1;
        return index + page;
      }
    },
    change_Start_1(event) {
      if (this.hadClick == true) {
        this.two.end_time = "";
        this.two.begin_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart_1();
        this.hadClick = false;
      } else {
        this.two.begin_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart_1();
      }
    },
    change_Start_2(event) {
      if (this.hadClick == true) {
        this.three.end_time = "";
        this.three.begin_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart_2();
        this.hadClick = false;
      } else {
        this.three.begin_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart_2();
      }
    },
    change_Start_3(event) {
      if (this.hadClick == true) {
        this.four.end_time = "";
        this.four.begin_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart_3();
        this.hadClick = false;
      } else {
        this.four.begin_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart_3();
      }
    },
    changeStart_3(event) {
      this.params.begin_time = event ? event.toString().substr(0, 10) : "";
      this.getadata();
      delete this.params.subject_ids;
    },
    changeEnd_3(event) {
      this.params.end_time = event ? event.toString().substr(0, 10) : "";
      this.tableData = [];
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
        if (key == "subject_ids" && this.params.index_ids) {
          parms += key + "=" + this.params[key];
        } else {
          parms += key + "=" + this.params[key] + "&";
        }
      }

      window.location.href =
        url.urls + "/api_export_teacher_classhour" + "?" + parms;
    },
    //导出2
    recharge_export_2() {
      this.$message({
        type: "success",
        message: "正在导出,请稍等..."
      });
      // let urls = "http://personal.test.hqjystudio.com";
      let parms = "";
      // // this.form.teacher='杨懿俊'
      for (var key in this.params1) {
        if (this.params[key] && this.params !== "page") {
          parms += key + "=" + this.params[key] + "&";
        }
      }
      window.location.href =
        url.urls + "/api_export_teacher_proportion" + "?" + parms;
    },

    change_End(event) {
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
    change_End_1(event) {
      if (this.hadClick == true) {
        this.two.begin_time = "";
        this.two.end_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart_1();
        this.hadClick = false;
      } else {
        this.two.end_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart_1();
      }
    },
    change_End_2(event) {
      if (this.hadClick == true) {
        this.three.begin_time = "";
        this.three.end_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart_2();
        this.hadClick = false;
      } else {
        this.three.end_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart_2();
      }
    },
    change_End_3(event) {
      if (this.hadClick == true) {
        this.four.begin_time = "";
        this.four.end_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart_3();
        this.hadClick = false;
      } else {
        this.four.end_time = event ? event.toString().substr(0, 10) : "";
        this.lineChart_3();
      }
    },
    Change_sbuject() {
      // this.getdata();
      this.tableData = [];
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
    handleChange(targetName) {
      //选择学生
      this.params.student_id = targetName.toString();
      this.getadata();
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

    getadata() {
      this.$apis.census.teacher_classhour(this.params).then(res => {
        this.tableData = [];
        if (
          Object.prototype.toString.call(res.data.data.data).substr(8, 5) ==
          Array
        ) {
          this.tableData = res.data.data.data;
          this.msg = res.data;
        } else {
          this.tableData = [...res.data.data.data];
          this.msg = res.data;
        }
      });
    },
    getadata_1() {
      this.$apis.census
        .teacher_classhour_proportion(this.params_1)
        .then(res => {
          this.tableData_1 = [];
          if (
            Object.prototype.toString.call(res.data.data.data).substr(8, 5) ==
            Array
          ) {
            this.tableData_1 = res.data.data.data;
            this.msg1 = res.data;
          } else {
            this.tableData_1 = [...res.data.data.data];
            this.msg1 = res.data;
          }
        });
    },
    getadata_2() {
      this.$apis.census.screen_teacher_classhour(this.params_2).then(res => {
        this.tableData_2 = [];
        if (
          Object.prototype.toString.call(res.data.data.data).substr(8, 5) ==
          Array
        ) {
          this.tableData_2 = res.data.data.data;
        } else {
          this.tableData_2 = [...res.data.data.data];
        }
      });
    },
    next_1() {
      this.params_1.page++;
      this.getadata_1();
    },
    current_1(num) {
      //当前页数
      this.params_1.page = num;
      this.getadata_1();
    },
    prev_1() {
      //上一页
      if (this.params_1.page > 1) {
        this.params_1.page--;
        this.tableData = [];
        this.getadata_1();
      }
    },
    next_2() {
      this.params_2.page++;
      this.getadata_2();
    },
    current_2(num) {
      //当前页数
      this.params_2.page = num;
      this.getadata_2();
    },
    prev_2() {
      //上一页
      if (this.params_2.page > 1) {
        this.params_2.page--;
        this.tableData = [];
        this.getadata_2();
      }
    },
    next() {
      this.params.page++;
      this.tableData = [];
      this.getadata();
    },
    current(num) {
      //当前页数
      this.params.page = num;
      this.tableData = [];
      this.getadata();
    },
    prev() {
      //上一页
      if (this.params.page > 1) {
        this.params.page--;
        this.tableData = [];
        this.getadata();
      }
    }
  },
  created() {
    this.getdata();
  },

  mounted() {
    this.lineChart();
    this.lineChart_1();
    this.lineChart_2();
    this.lineChart_3();
    this.$apis.census.teacher_classhour(this.params).then(res => {
      this.tableData = [];
      if (
        Object.prototype.toString.call(res.data.data.data).substr(8, 5) == Array
      ) {
        this.tableData = res.data.data.data;
        this.msg = res.data;
      } else {
        this.tableData = [...res.data.data.data];
        this.msg = res.data;
      }
    });
    this.$apis.census.teacher_classhour_proportion(this.params_1).then(res => {
      this.tableData_1 = [];
      if (
        Object.prototype.toString.call(res.data.data.data).substr(8, 5) == Array
      ) {
        this.tableData_1 = res.data.data.data;
        this.msg1 = res.data;
      } else {
        this.tableData_1 = [...res.data.data.data];
        this.msg1 = res.data;
      }
    });
    this.$apis.census.screen_teacher_classhour(this.params_2).then(res => {
      this.tableData_2 = [];
      if (
        Object.prototype.toString.call(res.data.data.data).substr(8, 5) == Array
      ) {
        this.tableData_2 = res.data.data.data;
        this.msg2 = res.data;
      } else {
        this.tableData_2 = [...res.data.data.data];
        // this.msg = res.data;
        this.msg2 = res.data;
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
  display: inline-block;
  width: 44.5%;
  padding: 1%;
  margin: 1%;
  border-radius: 10px;
}
.flex_div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.session1 {
  background-color: #fff;
  padding: 15px;
  margin: 10px 10px 40px 10px;
  border-radius: 10px;
}
.near {
  padding: 0 -16px!;
}
</style>
