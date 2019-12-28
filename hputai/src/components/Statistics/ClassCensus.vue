<template>
  <div id="app">
       <div>
    <span>模拟效果</span>
    <el-divider direction="vertical"></el-divider>
    <span>不作为参考</span>
   
  </div>
    <div id="main" style="width:1000px;height:500px;" ></div>
    <div id="main1" style="width:500px;height:400px;"></div>
     <div id="main2" style="width:700px;height:400px;"></div>

  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "app",
  methods: {
      drawStudent(){
      let myDraw = echarts.init(document.getElementById("main2"));
    var  option = {
                 title: {
        text: '',
        subtext: '普通学员'
    },
    legend: {},
    tooltip: {},
    dataset: {
        source: [
            ['product', '已排', '已上', '待上'],
            ['11月', 43.3, 85.8, 93.7],
            ['12月', 83.1, 73.4, 55.1],
            ['1月', 86.4, 65.2, 82.5],
        ]
    },
    xAxis: {type: 'category'},
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'}
    ]
};
       myDraw.setOption(option);

      },
    lineChart() {
      let myLine = echarts.init(document.getElementById("main1"));
      var option = {
          title: {
        text: '',
        subtext: '一级科目Top15'
    },
        dataset: {
          source: [
            ["score", "课时", "product"],
            [89.3, 58212, "商科-经济"],
            [57.1, 78254, "数学-决策"],
            [74.4, 41032, "物理"],
            [50.1, 12755, "数学-纯数"],
            [89.7, 20145, "数学-力学"],
            [68.1, 79146, "数学-统计"],
            [19.6, 91852, "英语"],
            [10.6, 101852, "学科练习课"],
            [32.7, 20112, "商科-商务"],
             [68.1, 79146, "数学-统计"],
            [12, 91852, "英语1"],
             [15, 101852, "学习课1"],
             [33, 20112, "商务1"]
          ]
        },
        grid: { containLabel: true },
        xAxis: { name: "课时" },
        yAxis: { type: "category" },
        visualMap: {
          orient: "horizontal",
          left: "center",
          min: 10,
          max: 100,
          text: ["High Score", "Low Score"],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ["#D7DA8B", "#E15457"]
          }
        },
        series: [
          {
            type: "bar",
            encode: {
              // Map the "amount" column to X axis.
              x: "课时",
              // Map the "product" column to Y axis
              y: "product"
            }
          }
        ],

      };
       myLine.setOption(option);

    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      //   let myChart = this.$echarts.init(document.getElementById("main"));全局引用的用法
      let myChart = echarts.init(document.getElementById("main"));
      var colors = ["#5793f3", "#d14a61", "#675bba"];

      // 指定图表的配置项和数据
      let option = {
        color: colors,

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        grid: {
          right: "20%"
        },
        toolbox: {
          feature: {
            //
            saveAsImage: { show: true }, //保存图片
            // dataView: { show: true, readOnly: false },
            // restore: { show: true }
          }
        },
        legend: {
          data: ["去年", "今年", "去年课时", "今年课时"]
        },
        xAxis: [
          //x轴
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
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
        yAxis: [
          //y轴
          {
            type: "value",
            name: "已排课时",
            min: 0,
            max: 100,
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: "{value} "
            }
          }
        ],
        series: [
          {
            name: "去年",
            type: "bar",
            data: [2, 4, 7, 23, 25, 76, 35, 62, 32, 20, 6, 3]
          },
          {
            name: "今年",
            type: "bar",
            yAxisIndex: 0,
            data: [2, 5, 9, 26, 28, 70, 75, 82, 48, 18, 6, 2]
          },
          {
            name: "去年折线",
            type: "line",
            lineStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: "#d14a61" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#d14a61" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            data: [2, 4, 7, 23, 25, 76, 35, 62, 32, 20, 6, 3]
          },
          {
            name: "今年折线",
            type: "line",
            lineStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: "#5793f3" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#5793f3" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            data: [2, 5, 9, 26, 28, 70, 75, 82, 48, 18, 6, 2]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    this.drawChart();
    this.lineChart();
    this.drawStudent();
  }
};
</script>
