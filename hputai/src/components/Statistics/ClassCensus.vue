<template>
  <div id="app">
    <zx-head title="课时统计"></zx-head>
    <el-date-picker
      style="margin-left:20px"
      v-model="params.start_time"
      @change="getadata"
      type="datetime"
      clearable
      value-format="yyyy-MM-dd H:mm:ss"
      placeholder="选择日期时间"
    ></el-date-picker>至
    <el-date-picker
      @change="getadata"
      v-model="params.end_time"
      type="datetime"
      clearable
      value-format="yyyy-MM-dd H:mm:ss"
      placeholder="选择日期时间"
    ></el-date-picker>

    <el-select clearable v-model="params.is_parttime" placeholder="选择科目等级" @change="Change_sbuject">
      <el-option label="一级科目" value="2"></el-option>
      <el-option label="二级科目" value="1"></el-option>
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
      show-summary
      :header-cell-style="{background:'#f4f4f4'}"
    >
      <el-table-column label="序号" type="index"  width="80" align="center"></el-table-column>
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
      <el-table-column align="center"  prop="daishang_classhour" label="待上课时" sortable></el-table-column>
      <el-table-column align="center"  prop="online_cource" label="线上" sortable></el-table-column>
      <el-table-column align="center" prop="offline_cource" label="线下" sortable></el-table-column>
      <el-table-column label="班课" prop="class_number"></el-table-column>
      <el-table-column label="一对一" prop="yiduiyi_number"></el-table-column>
      <el-table-column align="center" label="试听"  prop="audition"></el-table-column>
      <el-table-column align="center" label="正课"  prop="just_courses"></el-table-column>
    </el-table>

    <div class="echarts_1">
      <div style="width:45%;height:450px;" class="bgc">
          <div class="block" style="margin:auto;width:200px;">
              <el-date-picker
              @change="changeMouth"
                v-model="changeMouth1"
                type="month"
                value-format="MM"
                placeholder="选择你想查看的月份">
              </el-date-picker>
            </div>
      <div id="main" style="width:100%;height:400px;"></div>
      </div>
     <div style="width:45%;height:450px;" class="bgc">
          <div class="block" style="margin:auto;width:200px;">
              <el-date-picker
              @change="changeMouth_1"
                v-model="changeMouth2"
                type="month"
                value-format="MM"
                placeholder="选择你想查看的月份">
              </el-date-picker>
            </div>
      <div id="main2" style="width:100%;height:400px;"></div>
      </div>
    </div>
    <div class="bgc">
 <div class="flex_all">
      <div>
        <el-radio-group v-model="one.status" @change="changeRadio1">
              <el-radio-button label="1" >已排</el-radio-button>
              <el-radio-button label="2">已上</el-radio-button>
              <el-radio-button label="3">待上</el-radio-button>
        </el-radio-group>
      </div>
     <div>
       <el-button size="mini" @click="showDay">今天</el-button>
       <el-button size="mini">本周</el-button>
       <el-button size="mini">本月</el-button>
      </div>
      <div >
               <!-- <el-date-picker
              @change="changeMouth"
                v-model="changeMouth1"
                type="month"
                value-format="MM"
                placeholder="选择你想查看的月份">
              </el-date-picker> -->
      </div>
    </div>
           
            <div id="main1" style="width:100%;height:400px;"></div>

    </div>
       <div class="bgc">

   <div class="flex_all">
      <div>
        <el-radio-group fill="#5CB87A"  v-model="three.status" @change="changeRadio_1">
              <el-radio-button  label="1" >已排</el-radio-button>
              <el-radio-button  label="2">已上</el-radio-button>
              <el-radio-button  label="3">待上</el-radio-button>
        </el-radio-group>
      </div>
     <div>

      </div>
      <div >
               <!-- <el-date-picker
              @change="changeMouth_1"
                v-model="changeMouth_2"
                type="month"
                value-format="MM"
                placeholder="选择你想查看的月份">
              </el-date-picker> -->
      </div>
    </div>
      <div id="main3" style="width:100%;height:400px;"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import vue from "vue";
export default {
  data() {
    return {
      params: {
        page: "1"
      },
      tableData: [],
      options: [],
      top15_1: [],
      top15_3: [],
      mouthData: [], //获取上一个月和前一年上一个月的数据
      alreadyData: [],
      willData: [],
      yearData: [],

      classMouth: [],
      yipai_classhour: [],
      yishang_classhour: [],
      daishang_classhour: [],
      changeMouth1:'',
      changeMouth2:'',
      one:{
        begin_time:'',
        end_time:'',
        status:'1'
      },
         three:{
        begin_time:'',
        end_time:'',
        status:'1'
      },
    };
  },
  methods: {
    getadata() {},
    handleChange_1() {},
    Change_sbuject() {},
    recharge_export() {},
    indexMethod(index) {

    },
    changeMouth(value){
      this.changeMouth1=value
       this.drawChart();
    },
        changeMouth_1(value){
      this.changeMouth2=value
       this.drawStudent();
    },
         changeMouth_2(value){
      // this.changeMouth2=value
      //  this.drawStudent();
    },
    changeRadio1(value){
    this.one.status=value
       this.lineChart(); //一级科目
    },
       changeRadio2(value){
    // this.one.begin_time=value
    //    this.lineChart(); //一级科目
    },
        changeRadio_1(value){
    this.three.status=value
       this.lineChart2(); //一级科目
    },
     add0(m){
    		return m<10?'0'+m:m 
    },
    dateToMs (date) {
    let result = new Date(date).getTime();
    return result;
},
    showDay(){
      	var todayDate = new Date();
   	var y = todayDate.getFullYear();  
       var m = todayDate.getMonth() + 1;
       var d = todayDate.getDate();
   	var s = y+'-'+this.add0(m)+'-'+this.add0(d)+' 00:00:00';//今日开始
     var e = y+'-'+this.add0(m)+'-'+this.add0(d)+' 23:59:59';//今日结束
    var s1=this.dateToMs(s).toString().substr(0,10)
    var e1=this.dateToMs(e).toString().substr(0,10)
   
   this.one.begin_time=s1.toString()
      this.one.end_time=e1.toString()
       console.log( this.one)
this.lineChart()
    },
    //普通学员
    drawStudent() {
      let myDraw = echarts.init(document.getElementById("main2"));

      app.config = {
        rotate: 90,
        align: "left"
      };
      var labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: "{c}  {name|{a}}",
        fontSize: 16,
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
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //         mark: {show: true},
        //         dataView: {show: true, readOnly: false},
        //         magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
        //         restore: {show: true},
        //         saveAsImage: {show: true}
        //     }
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
            name:'课时',
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
      this.$apis.census.chainratio_classhour({month:this.changeMouth2}).then(res => {
        if (res.data.code == 1) {
          this.classMouth = [];
          this.yipai_classhour = [];
          (this.yishang_classhour = []), (this.daishang_classhour = []);
          for (let i = 0; i < res.data.data.length; i++) {
            this.classMouth[i] = res.data.data[i].month + "月份";
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
          text: "",
          subtext: "三级科目Top15"
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
          for (let i = 0; i < res.data.data.length; i++) {
            this.top15_3[14 - i] = [];
            this.top15_3[14 - i].unshift(res.data.data[i].subject_name);
            this.top15_3[14 - i].unshift(res.data.data[i].classhour);
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
          text: "",
          subtext: "一级科目Top15"
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
          for (let i = 0; i < res.data.data.length; i++) {
            this.top15_1[14 - i] = [];
            this.top15_1[14 - i].unshift(res.data.data[i].subject_name);
            this.top15_1[14 - i].unshift(res.data.data[i].classhour);
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
        tooltip: {},
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
        series: [{ type: "bar" }, { type: "bar" }],
        toolbox: {
          feature: {
            myTool1: {
              show: true,
              title: "选择月份",
              icon:
                "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
              onclick: function() {
                console.log(this)
                this.showMouth1=true
              
              }
            },
            myTool2: {
              show: true,
              title: "自定义扩展方法",
              icon: "image://http://echarts.baidu.com/images/favicon.png",
              onclick: function() {
                alert("myToolHandler2");
              }
            },
            saveAsImage: { show: true } //保存图片
            // dataView: { show: true, readOnly: false },
            // restore: { show: true }
          }
        }
      });
      // 使用刚指定的配置项和数据显示图表。
      //  myChart.setOption(option);
      this.$apis.census.yearonyear_classhour({month:this.changeMouth1}).then(res => {
        if (res.data.code == 1) {
          this.alreadyData = [];
          this.willData = [];
          this.yearData = [];
          this.alreadyData[0] = res.data.data[0].yipai_classhour;
          this.alreadyData[1] = res.data.data[1].yipai_classhour;
          this.willData[0] = res.data.data[0].yishang_classhour,
            this.willData[1] = res.data.data[1].yishang_classhour;

          for (let i = 0; i < res.data.data.length; i++) {
            if (i == 0) {
              this.yearData[i] = "去年" + res.data.data[i].month + "月份";
            } else {
              this.yearData[i] = "今年" + res.data.data[i].month + "月份";
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
    }
  },
  created() {
    this.$apis.census.subject_classhour().then(res => {
      if (res) {
      }
    });
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
    this.$apis.census.subject_classhour().then(res => {
      if (res.data.code == 1) {
        this.tableData = res.data.data;
      }
    });
    this.$apis.students.students_list().then(res => {
      if (res.echarts) {
      }
    });
  }
};
</script>
<style>
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
.flex_all{
  display:flex;
  align-items:center;
  justify-content: space-around;
}
.bgc{
    background-color: #fff;
    padding:15px;
    margin:10px;
    border-radius:10px;
}
</style>
