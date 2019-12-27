<template>
  <div id="app">
      <div id="main" style="width:800px;height:600px;">

      </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "app",
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
    //   let myChart = this.$echarts.init(document.getElementById("main"));全局引用的用法
          let myChart = echarts.init(document.getElementById("main"));
var colors = ['#5793f3', '#d14a61', '#675bba'];

      // 指定图表的配置项和数据
  let option = {
    color: colors,

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    grid: {
        right: '20%'
    },
    toolbox: {
        feature: { //
            saveAsImage: {show: true} , //保存图片
            dataView: {show: true, readOnly: false},
            restore: {show: true},
        }
    },
    legend: {
        data:['去年','今年','去年课时','今年课时']
    },
    xAxis: [  //x轴
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        }
    ],
    yAxis: [ //y轴
        {
            type: 'value',
            name: '已排课时',
            min: 0,
            max: 250,
            axisLine: {
                lineStyle: {
                    color: colors[0]
                }
            },
            axisLabel: {
                formatter: '{value} '
            }
        }
   
    ],
    series: [
        {
            name:'去年',
            type:'bar',
            data:[2, 4, 7, 23, 25, 76, 35, 62, 32, 20, 6, 3]
        },
        {
            name:'今年',
            type:'bar',
            yAxisIndex: 0,
            data:[2, 5, 9, 26, 28, 70, 75, 82, 48, 18, 6, 2]
        },
        {
            name:'去年折线',
            type:'line',
           
            data:[2, 4, 7, 23, 25, 76, 35, 62, 32, 20, 6, 3]
        },
                {
            name:'今年折线',
            type:'line',
            lineStyle :{
                color: {
    type: 'radial',
    x: 0.5,
    y: 0.5,
    r: 0.5,
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'green' // 100% 处的颜色
    }],
    global: false // 缺省为 false
}
            },
            data:[2, 5, 9, 26, 28, 70, 75, 82, 48, 18, 6, 2]
        }

    ]
};
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    this.drawChart();
  }
};
</script>
