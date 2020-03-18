<template>
  <div id="app">
    <zx-head title="业务核算"></zx-head>
    <div class="session1">
      <h3>一级科目</h3>
      <div>
        <el-date-picker
          style="margin:10px"
          @change="changeStart_3"
          v-model="begin_time_3"
          type="month"
          value-format="timestamp"
          placeholder="选择月份"
        ></el-date-picker>至
        <el-date-picker
          @change="changeEnd_3"
          v-model="end_time_3"
          value-format="timestamp"
          type="month"
          placeholder="选择月份"
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
        empty-text="正在获取数据，请稍等"
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
        <el-table-column label="	确认课程成本占比（%）" prop="ratio_amount"></el-table-column>

        <el-table-column label="确认毛利金额(￥)" prop="profit"></el-table-column>
      </el-table>
    </div>

    <div class="session1">
      <h3>一级科目分析</h3>
      <div class="echarts_1" style="margin:20px 0;">
        <div style="width:45%;height:450px;" class="bgc">
          <div class="block" style="margin: 0 auto;width:446px;">
            <el-date-picker
              style="width:42%;"
              @change="changeMouth"
              v-model="changeMouth1"
              type="month"
              placeholder="选择月份"
            ></el-date-picker>
            <el-cascader
              style="width:42%;"
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

        <div style="width:54%;height:450px;" class="bgc">
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
    <!-- 业务体系 -->
    <div class="session1">
      <h3>业务体系</h3>
      <div>
        <el-date-picker
          style="margin:10px"
          @change="changeStart_system"
          v-model="begin_time_system"
          type="month"
          value-format="timestamp"
          placeholder="选择月份"
        ></el-date-picker>至
        <el-date-picker
          @change="changeEnd_system"
          v-model="end_time_system"
          value-format="timestamp"
          type="month"
          placeholder="选择月份"
        ></el-date-picker>
        <el-select
          clearable
          v-model="params_system.student_type"
          placeholder="选择学生类型"
          @change="Change_sbuject_system"
        >
          <el-option label="全部" value="0"></el-option>
          <el-option label="VIP学生" value="3"></el-option>
          <el-option label="保读" value="2"></el-option>
          <el-option label="普通" value="1"></el-option>
        </el-select>
        <el-button type="primary" @click="recharge_export_system">导出</el-button>
      </div>
      <el-table
        :data="tableData_system"
        border
        class="table_set"
        @selection-change="handle_system"
        :header-cell-style="{background:'#f4f4f4'}"
      >
        <el-table-column type="selection" fixed="left" @click="handleClick(scope.row)" width="40"></el-table-column>

        <el-table-column label="业务体系" width="100" prop="system_name"></el-table-column>
        <el-table-column align="center" prop="student_type_name" label="学生类别" sortable></el-table-column>
        <el-table-column align="center" prop="confirm_classhour" label="确认课时消耗量(小时)" sortable></el-table-column>
        <el-table-column align="center" prop="student_amount" label="确认营业收入(￥)" sortable></el-table-column>

        <el-table-column label="	确认课程成本(￥)" prop="teacher_amount"></el-table-column>
        <el-table-column label="	确认课程成本占比(%)" prop="ratio_amount">
          <template slot-scope="scope">{{scope.row.ratio_amount+"%"}}</template>
        </el-table-column>
        <el-table-column label="确认毛利金额(￥)" prop="profit"></el-table-column>
      </el-table>
    </div>

    <div class="session1">
      <!-- <div class="echarts_1" style="margin:20px 0;"> -->
        <div style="height:450px;" class="bgc">
          <div class="block" style="margin: 0 auto;width:446px;">
            <el-date-picker
              style="width:42%;"
              @change="changeMouth_system"
              v-model="year_month_system"
              type="month"
              placeholder="选择月份"
            ></el-date-picker>
            <el-cascader
              style="width:42%;"
              placeholder="选择体系"
              v-model="system_id"
              filterable
              :options="options_subject"
              clearable
              :props="{ expandTrigger: 'hover' }"
              :show-all-levels="false"
              @change="handleChange_system"
            ></el-cascader>
          </div>
          <div id="main_system" style="width:100%;height:400px;"></div>
        </div>

        <div style="height:450px;" class="bgc">
          <div class="block" style="margin: 0 auto;width:446px;">
            <el-date-picker
              style="width:42%;"
              @change="changeMouth_student"
              v-model="year_month_student"
              type="month"
              placeholder="选择月份"
            ></el-date-picker>
            <el-select
              clearable
              v-model="main_subject_type"
              placeholder="选择学生类型"
              @change="handleChange_student"
            >
              <el-option label="全部" value="0"></el-option>
              <el-option label="VIP学生" value="3"></el-option>
              <el-option label="保读" value="2"></el-option>
              <el-option label="普通" value="1"></el-option>
            </el-select>
          </div>
          <div id="main_student" style="width:100%;height:400px;"></div>
        </div>
      </div>
    <!-- </div> -->
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
      tableData: [],
      options: [],
      top15_1: [],
      top15_3: [],
      mouthData: [], //获取上一个月和前一年上一个月的数据
      lastYear: [],
      thisTear: [],
      main_subject_id: "", //图表科目选择的
      system_id: "", //选择的体系id

      year_month_system: "", //选择的体系时间
      year_month: "",

      main_subject_type: "", //选择的学生类别
      year_month_student: "", //学生类别选择的时间

      old_student_amount: "去年的收入",
      student_amount: "	今年的收入",
      old_teacher_amount: "去年的支出",
      teacher_amount: "今年的支出",
      old_profit: "去年的毛利",
      profit: "今年的毛利",
      idArr: [],
      options_subject: [], //科目体系的数组
      idArr_system: [], //体系选择的
      params: {
        student_type: "",
        begin_time: "",
        end_time: ""
      },
      params_system: {
        student_type: "",
        begin_time: "",
        end_time: ""
      },
      options_: [], //科目的原来数据
      options: [], //我们需要的科目数据
      options_1: [], //学生的原来数据
      options1: [], //我们需要的学生数据
      classMouth: [],
      profit_math: [], //四舍五入今年的毛利
      old_profit_math: [], //四舍五入去年的毛利
      profit: [], //今年的毛利
      old_profit: [], //去年的毛利
      msg: [],
      changeMouth1: "",
      thisyear: "",
      begin_time_3: "", //总数组的绑定值
      end_time_3: "", //总数组的绑定值
      begin_time_system: "", //体系数组的开始时间绑定值
      end_time_system: "",
      hadClick: false,
      hadClick_2: false, //是否点击了今天，本周，或本月
      tableData_system: [] //业务体系数据
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
        .total_onlevel_subject({
          year_month: this.year_month,
          subject_id: this.main_subject_id
        })
        .then(res => {
          if (res.data.code == 1) {
            this.lastYear = [
              res.data.data[0].old_student_amount,
              res.data.data[1].old_teacher_amount,
              res.data.data[2].old_profit
            ];
            this.thisYear = [
              res.data.data[0].student_amount,
              res.data.data[1].teacher_amount,
              res.data.data[2].profit
            ];
          }
        });
      this.drawChart();
    },
    handleChange_system(targetName) {
      //选择科目
      var lastName = targetName[0] ? targetName[0] : "";
      this.system_id = lastName;
      this.$apis.census.system_dimension({
        year_month: this.year_month_system,
        system_id: this.system_id
      });

      this.drawChart_system();
    },
    handleChange_student(targetName) {
      //选择科目
      var lastName = targetName[0] ? targetName[0] : "";
      this.main_subject_type = lastName;

      this.$apis.census.student_dimension({
        year_month: this.year_month_student,
        student_type: this.main_subject_type
      });

      this.drawChart_student();
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
    handle_system(result) {
      this.idArr_system = [];
      for (let i = 0; i < result.length; i++) {
        this.idArr_system.push(result[i].id);
      }
      this.params_system.subject_ids = this.idArr.toString();
    },
    indexMethod(index) {},
    changeMouth(value) {
      var thisdate = new Date(this.changeMouth1);
      var month1 = thisdate.getMonth() * 1 + 1;
      var month = month1 < 10 ? "0" + month1 : month1;

      this.year_month = thisdate.getFullYear() + "-" + month;
      this.$apis.census
        .total_onlevel_subject({
          year_month: this.year_month,
          subject_id: this.main_subject_id
        })
        .then(res => {
          if (res.data.code == 1) {
            this.lastYear = [
              res.data.data[0].old_student_amount,
              res.data.data[1].old_teacher_amount,
              res.data.data[2].old_profit
            ];
            this.thisYear = [
              res.data.data[0].student_amount,
              res.data.data[1].teacher_amount,
              res.data.data[2].profit
            ];
          }
        });
      this.drawChart();
    },
    changeMouth_system() {
      var thisdate = new Date(this.year_month_system);
      var month1 = thisdate.getMonth() * 1 + 1;
      var month = month1 < 10 ? "0" + month1 : month1;

      this.year_month_system = thisdate.getFullYear() + "-" + month;
      this.$apis.census
        .system_dimension({
          year_month: this.year_month_system,
          system_id: this.system_id
        })
        .then(res => {
          if (res.data.code == 1) {
            this.lastYear = [
              res.data.data[0].old_student_amount * 1,
              res.data.data[1].old_teacher_amount * 1,
              res.data.data[2].old_profit * 1
            ];
            this.thisYear = [
              res.data.data[0].student_amount
                .toString()
                .replace(",", "")
                .toString() * 1,
              res.data.data[1].teacher_amount
                .toString()
                .replace(",", "")
                .toString() * 1,
              res.data.data[2].profit
                .toString()
                .replace(",", "")
                .toString() * 1
            ];
          }
        });
      this.drawChart_system();
    },
    changeMouth_student() {
      var thisdate = new Date(this.year_month_student);
      var month1 = thisdate.getMonth() * 1 + 1;
      var month = month1 < 10 ? "0" + month1 : month1;

      this.year_month_student = thisdate.getFullYear() + "-" + month;

      this.$apis.census
        .student_dimension({
          year_month: this.year_month_student,
          student_type: this.main_subject_type
        })
        .then(res => {
          if (res.data.code == 1) {
            this.lastYear = [
              res.data.data[0].old_student_amount * 1,
              res.data.data[1].old_teacher_amount * 1,
              res.data.data[2].old_profit * 1
            ];
            this.thisYear = [
              res.data.data[0].student_amount
                .toString()
                .replace(",", "")
                .toString() * 1,
              res.data.data[1].teacher_amount
                .toString()
                .replace(",", "")
                .toString() * 1,
              res.data.data[2].profit
                .toString()
                .replace(",", "")
                .toString() * 1
            ];
          }
        });
      this.drawChart_student();
    },
    changeMouth_1(value) {
      this.changeMouth2 = value;
      this.drawStudent();
    },

    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    dateToMs(date) {
      let result = new Date(date).getTime(); //getTime获取毫秒数
      return result;
    },

    changeStart_3(event) {
      this.params.begin_time = event ? event.toString().substr(0, 10) : "";
      this.getadata();
    },
    changeStart_system(event) {
      this.params_system.begin_time = event
        ? event.toString().substr(0, 10)
        : "";
      this.get_system();
    },
    changeEnd_3(event) {
      this.params.end_time = event ? event.toString().substr(0, 10) : "";
      this.getadata();
    },
    changeEnd_system(event) {
      this.params_system.end_time = event ? event.toString().substr(0, 10) : "";
      this.get_system();
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
    recharge_export_system() {
      this.$message({
        type: "success",
        message: "正在导出,请稍等..."
      });
      // let urls = "http://personal.test.hqjystudio.com";
      let parms = "";
      // // this.form.teacher='杨懿俊'
      for (var key in this.params_system) {
        if (key == "subject_ids" && this.params_system.subject_ids) {
          parms += key + "=" + this.params_system[key];
        } else {
          parms += key + "=" + this.params_system[key] + "&";
        }
      }

      window.location.href =
        url.urls + "/api_export_business_system" + "?" + parms;
    },
    Change_sbuject() {
      this.getadata();
    },

    Change_sbuject_system() {
      this.get_system();
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
        distance: 10
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
        title: {
          text: "毛利情况",
          lineHeight: 40,
          textStyle: {
            fontsize: "16px",
            fontWeight: "bolder"
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
            name: "金额(万)",
            type: "value",

            nameTextStyle: { fontSize: 12 }
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
          }
        ]
      });
      this.$apis.census.profit_info({ year: this.thisyear }).then(res => {
        if (res.data.code == 1) {
          this.old_profit = [];
          this.profit = [];
          for (let i = 0; i < res.data.data.length; i++) {
            // this.classMouth.push(res.data.data[i].month);
            this.profit[i] = res.data.data[i].profit;
            this.old_profit[i] = res.data.data[i].old_profit;
            this.profit_math[i] =
              Math.round((res.data.data[i].profit / 10000) * 100) / 100;
            this.old_profit_math[i] =
              Math.round((res.data.data[i].old_profit / 10000) * 100) / 100;
            //  myDraw.setOption.tooltip.formatter()
          }
          myDraw.setOption({
            legend: {
              data: ["去年", "今年"]
            },
            tooltip: {
              trigger: "axis",
              formatter: function(params) {
                // console.log(params)
                var showdata = params[0].data;
                var showdata1 = params[1].data;
                return `
                            <div>去年：${showdata * 10000}</div>
                            <div>今年：${showdata1 * 10000}</div>
                            `;
              }
            },
            xAxis: [
              {
                type: "category",
                axisTick: { show: false },
                data: [
                  "1月",
                  "2月",
                  "3月",
                  "4月",
                  "5月",
                  "6月",
                  "7月",
                  "8月",
                  "9月",
                  "10月",
                  "11月",
                  "12月"
                ]
              }
            ],
            series: [
              {
                name: "去年",
                type: "bar",
                barGap: 0,
                label: labelOption,
                data: this.old_profit_math //数据数组
              },
              {
                name: "今年",
                type: "bar",
                label: labelOption,
                data: this.profit_math
              }
            ]
          });
        }
      });
    },

    drawChart() {
      let myChart = echarts.init(document.getElementById("main"));
      var colors = ["#5793f3", "#d14a61", "#675bba"];
      // 指定图表的配置项和数据
      myChart.setOption({
        legend: {},
        title: {
          text: "月份情况",
          lineHeight: 40,
          textStyle: {
            fontsize: "16px",
            fontWeight: "bolder"
          }
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            // console.log(params)
            var showdata = params[0].data;
            var showdata1 = params[1].data;
            return `
                            <div>去年：${showdata}</div>
                            <div>今年：${showdata1}</div>
                            `;
          }
        },
        dataset: {
          source: [
            ["product", "去年", "今年"],
            ["模拟数据", 43.3, 85.8],
            ["模拟数据", 83.1, 73.4]
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "top"
            }
          },
          {
            type: "bar",
            label: {
              show: true,
              position: "top"
            }
          }
        ]
      });

      this.$apis.census
        .total_onlevel_subject({
          year_month: this.year_month,
          subject_id: this.main_subject_id
        })
        .then(res => {
          if (res.data.code == 1) {
            this.lastYear = [
              res.data.data[0].old_student_amount * 1,
              res.data.data[1].old_teacher_amount * 1,
              res.data.data[2].old_profit * 1,
              res.data.data[3].old_ratio_amount * 1
            ];
            this.thisYear = [
              res.data.data[0].student_amount
                .toString()
                .replace(",", "")
                .toString() * 1,
              res.data.data[1].teacher_amount
                .toString()
                .replace(",", "")
                .toString() * 1,
              res.data.data[2].profit
                .toString()
                .replace(",", "")
                .toString() * 1,
              res.data.data[3].ratio_amount
                .toString()
                .replace(",", "")
                .toString() * 1
            ];

            myChart.setOption({
              xAxis: [
                {
                  type: "category",
                  axisTick: {
                    alignWithLabel: true
                  },
                  data: [
                    "确认营业收入",
                    "确认课程成本",
                    "确认毛利金额",
                    "确认课程成本占比%"
                  ]
                }
              ],

              yAxis: [
                {
                  name: "金额"
                }
              ],
              series: [
                {
                  name: "今年",
                  type: "bar",
                  yAxisIndex: 0,
                  data: this.thisYear
                },
                {
                  name: "去年",
                  type: "bar",
                  data: this.lastYear
                }
              ]
            });
          }
        });
    },
    drawChart_system() {
      let myChart = echarts.init(document.getElementById("main_system"));
      var colors = [
        "rgba(22, 155, 213, 1)",
        "rgba(22, 155, 213, 1)",
        "rgba(22, 155, 213, 1)"
      ];
      // 指定图表的配置项和数据
      myChart.setOption({
        legend: {},
        title: {
          text: "体系维度分析",
          lineHeight: 40,
          textStyle: {
            fontsize: "16px",
            fontWeight: "bolder"
          }
        },
        tooltip: {},
        dataset: {
          source: [
            ["product", "去年", "今年"],
            ["模拟数据", 43.3, 85.8],
            ["模拟数据", 83.1, 73.4]
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "top"
            }
          },
          {
            type: "bar",
            label: {
              show: true,
              position: "top"
            }
          }
        ]
      });

      this.$apis.census
        .system_dimension({
          year_month: this.year_month_system,
          system_id: this.system_id
        })
        .then(res => {
          if (res.data.code == 1) {
            this.lastYear = [
              // res.data.data[0].old_student_amount * 1,
              // res.data.data[1].old_teacher_amount * 1,
              // res.data.data[2].old_profit * 1,
              323456,576765,754333
              // res.data.data[3].old_ratio_amount * 1
            ];
            this.thisYear = [
              res.data.data[0].student_amount
                .toString()
                .replace(",", "")
                .toString() * 1,
              res.data.data[1].teacher_amount
                .toString()
                .replace(",", "")
                .toString() * 1,
              res.data.data[2].profit
                .toString()
                .replace(",", "")
                .toString() * 1,
             
            ];
           this.lastYear_ratio =[0,0,0,res.data.data[3].old_ratio_amount * 1]
          //  
           this.thisYear_ratio =[0,0,0,     res.data.data[3].ratio_amount
                .toString()
                .replace(",", "")
                .toString() * 1]
       console.log(this.lastYear,this.thisYear,this.lastYear_ratio,this.thisYear_ratio )
            myChart.setOption({
              xAxis: [
                {
                  type: "category",
                  axisTick: {
                    alignWithLabel: true
                  },
                  data: [
                    "确定营业收入",
                    "确定课程成本",
                    "确认毛利金额",
                    "确认课程成本占比"
                  ]
                }
              ],

              yAxis: [
                {
                  type: "value",
                  name: "月份情况"
                },
                {
                  type: "value",
                  name: "占比",
                  axisLabel: {
                    formatter: "{value} %"
                  }
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
                  data: this.thisYear
                },
                {
                  name: "去年占比",
                   yAxisIndex: 1,
                  type: "bar",
                  data: this.lastYear_ratio
                },
                {
                  name: "今年占比",
                  yAxisIndex: 1,
                  type: "bar",
                  data: this.thisYear_ratio
                }
              ]
            });
          }
        });
    },
    drawChart_student() {
      let myChart = echarts.init(document.getElementById("main_student"));
      var colors = ["#67C23A", "#F56C6C", "#675bba"];
      // 指定图表的配置项和数据
      myChart.setOption({
        legend: {},
        title: {
          text: "学生维度分析",
          lineHeight: 40,
          textStyle: {
            fontsize: "16px",
            fontWeight: "bolder"
          }
        },
        tooltip: {},
        dataset: {
          source: [
            ["product", "去年", "今年"],
            ["模拟数据", 43.3, 85.8],
            ["模拟数据", 83.1, 73.4]
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "top"
            }
          },
          {
            type: "bar",
            label: {
              show: true,
              position: "top"
            }
          }
        ]
      });

      this.$apis.census
        .student_dimension({
          year_month: this.year_month_student,
          student_type: this.main_subject_type
        })
        .then(res => {
          if (res.data.code == 1) {
            this.lastYear = [
              res.data.data[0].old_student_amount * 1,
              res.data.data[1].old_teacher_amount * 1,
              res.data.data[2].old_profit * 1
            ];
            // console.log(res.data.data[1].teacher_amount,res.data.data[1].teacher_amount.replace(',','').toString())
            this.thisYear = [
              res.data.data[0].student_amount
                .toString()
                .replace(",", "")
                .toString() * 1,
              res.data.data[1].teacher_amount
                .toString()
                .replace(",", "")
                .toString() * 1,
              res.data.data[2].profit
                .toString()
                .replace(",", "")
                .toString() * 1
            ];

            myChart.setOption({
              xAxis: [
                {
                  type: "category",
                  axisTick: {
                    alignWithLabel: true
                  },
                  data: ["确认营业收入", "确认课程成本", "确认毛利金额"]
                }
              ],

              yAxis: [
                {
                  name: "金额"
                }
              ],
              series: [
                {
                  name: "今年",
                  type: "bar",
                  yAxisIndex: 0,
                  data: this.thisYear
                },
                {
                  name: "去年",
                  type: "bar",
                  data: this.lastYear
                }
              ]
            });
          }
        });
    },
    getadata() {
      this.$apis.census.onlevel_subject(this.params).then(res => {
        this.tableData = [];
        if (
          Object.prototype.toString.call(res.data.data).substr(8, 5) == Array
        ) {
          this.tableData = res.data.data;
        } else {
          this.tableData = [...res.data.data];
        }
      });
    },
    get_system() {
      this.$apis.census.business_system(this.params_system).then(res => {
        this.tableData_system = [];
        if (
          Object.prototype.toString.call(res.data.data).substr(8, 5) == Array
        ) {
          this.tableData_system = res.data.data;
          this.msg_system = res.data;
        } else {
          this.tableData_system = [...res.data.data];
          this.msg_system = res.data;
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
      this.drawStudent();
      this.drawChart_system();
      this.drawChart_student();
      this.$apis.common.basedata_list().then(res => {
        this.options_subject = [];
        res.data.data.subjects_system_list.forEach(item => {
          this.options_subject.push({ value: item.id, label: item.name });
        });
      });
    });
  },

  mounted() {
    this.$apis.census.onlevel_subject(this.params).then(res => {
      this.tableData = [];
      if (Object.prototype.toString.call(res.data.data).substr(8, 5) == Array) {
        this.tableData = res.data.data;
        this.msg = res.data;
      } else {
        this.tableData = [...res.data.data];
        this.msg = res.data;
      }
    });
    this.$apis.census.business_system(this.params_system).then(res => {
      this.tableData_system = [];
      if (Object.prototype.toString.call(res.data.data).substr(8, 5) == Array) {
        this.tableData_system = res.data.data;
        this.msg_system = res.data;
      } else {
        this.tableData_system = [...res.data.data];
        this.msg_system = res.data;
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
