<template>
<div class="main">
  <marquee class="marquee_top"> 公告: 天气炎热,大家注意防暑</marquee >

<div class="header-num">

<div class="num" style="background:#5ab1ef">
  <div>
    <h1>77</h1>
     <p>我的学员</p>
  </div>
     
     <i class="el-icon-s-custom"></i>
</div>

<div class="num"  style="background:#fa6e86">
  <div>
     <h1>99</h1>
     <p>新增学员</p>
  </div>
     <i class="el-icon-circle-plus-outline"></i>
</div>

<div class="num"  style="background:#ffb980">
  <div>
     <h1>66</h1>
     <p>保读学员</p>
  </div>
    <i class="el-icon-view"></i>
</div>

<div class="num"  style="background:#19d4ae">
  <div>
    <h1>89</h1>
     <p>vip学员</p>
  </div>
    <i class="el-icon-medal-1"></i>
</div>

</div>
<div class="f11">
<el-card class="box-card fl box-card1">
  <div slot="header" class="clearfix">
    <span>消息列表</span>
    <el-radio-group v-model="reverse" style="float:right;font-size:20px">
      <el-radio :label="true">倒序</el-radio>
      <el-radio :label="false">正序</el-radio>
    </el-radio-group>
  </div>
  <div class="block">


  <el-timeline :reverse="reverse">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp">
      {{activity.content}}
    </el-timeline-item>
  </el-timeline>
</div>

</el-card>
<!-- 公告 -->
<div class="block_main fl ">
    <el-carousel height="380px" >
      <el-carousel-item  style="background:#5ab1ef">
      你所追忆的那些事,他们不发生在现在,不是未来,也不是过去,他们是记忆里的一些残影,你每想到一次,就多了一次记忆的渲染.他从来没有发生过,但你却固执的相信,并怀念
      </el-carousel-item >
       <el-carousel-item style="background:#fa6e86">
      夜晚。街上熙熙攘攘的很是热闹，穿着时尚的小伙子在走他的很酷的路，女孩子们也在很用心的打扮自己。我左边的呆子问我:我们算是这城市的观众吗?我不知道答案，我只感觉这晚风吹在身上真是舒服极了
      </el-carousel-item>
       <el-carousel-item style="background:#ffb980">
      
      </el-carousel-item>
    </el-carousel>

</div>
</div>
<el-card class="box-card card2">
  <div slot="header" class="clearfix">
    <span>关于我们</span>
    <el-button style="float: right; padding: 3px 0" type="text">了解更多</el-button>
  </div>
  <div class="text item">
    精英世家（深圳）教育科技有限责任公司是国内最早、规模最大的专注中学生（13-18岁）英美学术课程及出国英语培训的机构，业务覆盖全国多个城市，服务全国及在英美澳等国读中学的中国学生。

自2015年11月起，精英世家教育集团成功转型为互联网＋企业，建立了独家国际课程在线直播平台。使全国中学生轻松实现英美中学课程在家上。

精英世家教育集团主营业务包含－出国英语课程（托福、雅思等），国际初中学历课程 -IGCSE，美国高考课程－SAT、ACT, 英国高考课程－A-Level，美国大学预科课程－AP，美国高中同步课程，IB同步课程及

英美澳等国家高中及本科升学指导服务等。
  </div>
</el-card>
<!-- 统计图 -->
<div class="main1 fl f11">
  <ve-line  width="700px" :data="chartData" ></ve-line>   
</div> 

   
  
</div>
 
</template>

<script>
  export default {
   data () {
     this.chartSettings = {
        axisSite: { right: ['成功率'] },
        yAxisType: ['KMB', 'percent'],
        yAxisName: ['数值', '比率']
      }
  
  
      return {
         count: 10,
        chartData: {
         columns: ['日期', 'VIP学员', '我的学员', '新增学员'],
          rows: [
            { '日期': '1月', 'VIP学员': 1393, '我的学员': 1093, '新增学员': 1000 },
            { '日期': '2月', 'VIP学员': 3530, '我的学员': 3230, '新增学员': 2000 },
            { '日期': '3月', 'VIP学员': 2923, '我的学员': 2623, '新增学员': 1500 },
            { '日期': '4月', 'VIP学员': 1723, '我的学员': 1423, '新增学员': 4200 },
            { '日期': '5月', 'VIP学员': 3792, '我的学员': 3492, '新增学员': 2500 },
            { '日期': '6月', 'VIP学员': 4593, '我的学员': 4293, '新增学员': 3600 }
          ]
        },

//消息列表
           reverse: true,
        activities: [
          {
          content: '活动按期开始',
          timestamp: '2018-04-15'
        }, {
          content: '通过审核',
          timestamp: '2018-04-13'
        }, {
          content: '创建成功',
          timestamp: '2018-04-11'
        },
               {
          content: '活动按期开始',
          timestamp: '2018-04-15'
        }, {
          content: '通过审核',
          timestamp: '2018-04-13'
        }, 
             
        ]

         
      }
    },
    methods: {
        load () {
          alert(this.count)
        this.count+=2
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  /* .wordbox{
    width: 100%;
    position: relative;
  } */
  .card2{
    width: 90%;
    margin:2% auto;
  }
.block_main{
box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
width: 50%;
margin-left: 20px;
padding: 10px
}
.marquee_top{
 
  background: #dddddd;
  color: red;
}
.box-card1 {

    width: 30%;
  }
.main{
min-width: 1100px;
}
i{
  width: 51px;
  height: 50px;
  font-size: 40px;
  line-height: 90px;
}
.header-num{
  width: 100%;
  height: 140px;
   display: -webkit-flex; /* Safari */
  display: flex;
justify-content:space-around
}
.f11{
  display: -webkit-flex; /* Safari */
  display: flex;
justify-content:space-around
}
.num{
   display: flex;
justify-content:space-around;
  margin-top: 10px;
  height: 85px;
  padding-top: 5px;
  width: 18%;
  text-align: center;
color: #ffffff;
  border-radius: 5px;
  font-size: 20px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.num h1{
  font-size: 40px
}
.main1{
  width: 700px;
  padding-top: 20px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.fl{
  float: left;
  margin-top: 10px;
}
</style>
