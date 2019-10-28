<template>
  <div>
    <!-- <p><span>学员</span><span style="font-weight:700;color:orange;margin:0 5px;">{{form.username}}</span><span>的详情</span></p> -->
    <zx-head title>
      <span>学员</span>
      <span style="font-weight:700;color:orange;margin:0 5px;">{{form.username}}</span>
      <span>的详情</span>
    </zx-head>
    <p style="margin:10px;">
      <span style="font-weight:900;color:orange;font-size:25px;">&nbsp;|&nbsp;</span>基本信息
    </p>
    <ul :data="form">
      <li>
        <span>地区</span>
        <span>{{form.subject_name}}</span>
      </li>
      <li>
        <span>手机号</span>
        <span>{{form.tel}}</span>
      </li>
      <li>
        <span>学员等级</span>
        <span>{{form.alevel}}</span>
      </li>
      <li>
        <span>性别</span>
        <span style=" border-top-style:hidden;">{{form.sex}}</span>
      </li>
      <li>
        <span>年龄</span>
        <span style=" border-top-style:hidden;">{{form.age}}</span>
      </li>
      <li>
        <span>学校</span>
        <span style=" border-top-style:hidden;">{{form.school}}</span>
      </li>
      <li>
        <span>年级</span>
        <span>{{form.grade}}</span>
      </li>
      <li>
        <span>微信/QQ</span>
        <span>{{form.weixin_qq}}</span>
      </li>
      <li>
        <span>监护人</span>
        <span>{{form.guardian}}</span>
      </li>
    </ul>
    <ul :data="form">
      <li>
        <span>监护人联系方式</span>
        <span>{{form.guardian_phone}}</span>
      </li>
      <li>
        <span>通讯地址</span>
        <span>{{form.always_address}}</span>
      </li>
      <li>
        <span>进线编号</span>
        <span>{{form.in_number}}</span>
      </li>
      <li>
        <span>进线项目</span>
        <span style=" border-top-style:hidden;">{{form.inproject}}</span>
      </li>
      <li>
        <span>进线渠道</span>
        <span style=" border-top-style:hidden;">{{form.end_time}}</span>
      </li>
      <li>
        <span>接入人</span>
        <span style=" border-top-style:hidden;">{{form.inchannel}}</span>
      </li>
      <li>
        <span>班主任</span>
        <span>{{form.banzhuren_id}}</span>
      </li>
      <li>
        <span>顾问</span>
        <span></span>
      </li>
      <li>
        <span>升学指导</span>
        <span></span>
      </li>
      <li>
        <span>教学主管</span>
        <span></span>
      </li>
    </ul>
<div style="clear:both;">

</div>
    <p style="margin:10px;">
      <span style="font-weight:900;color:orange;font-size:25px;">&nbsp;|&nbsp;</span>排课列表
    </p>
     <el-cascader
          v-model="postFrom.value"
          :options="options"
          filterable
          :props="{ expandTrigger: 'hover' }"
          :show-all-levels="false"
          @change="getData"
          clearable
        ></el-cascader>
     <el-date-picker
          style="margin-left:60px"
          v-model="postFrom.start_time"
          @change="getData"
          type="datetime"
          clearable
          value-format="yyyy-MM-dd H:mm:ss"
          placeholder="选择日期时间"
        ></el-date-picker>至
        <el-date-picker
          @change="getData"
          v-model="postFrom.end_time"
          type="datetime"
          clearable
          value-format="yyyy-MM-dd H:mm:ss"
          placeholder="选择日期时间"
        ></el-date-picker>
            <div style="margin:10px"></div>

    <el-table border :data="tableData" >
      <el-table-column prop="title" label="报名标题" width="180"></el-table-column>
      <el-table-column prop="number" label="编号" width="180"></el-table-column>
      <el-table-column prop="subject_name" label="科目"></el-table-column>
            <el-table-column prop="course_type" label="类型" width="180"></el-table-column>
      <el-table-column prop="app_status" label="状态" width="180"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>
    <el-button type="primary" style="margin:10px;" @click="goBack">确定</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ["1"],
      tableData:[],//表格数据
      form:{

      },
      postFrom:{
        value:"",
        student_id:'',
        subject_id:'',
        start_time:'',
        end_time:''
      },
      options: [], //课程名称的数据
      options_: [], //总数据的数据
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleChange(val) {},
    goBack() {
      this.$router.go(-1);
    },
    getData() {
      this.$apis.students  //获取学生信息
        .students_edit({ id: this.$route.query.id })
        .then(res => {
          if (res.data.code == 1) {
            this.form = res.data.data;
          }
        });
          this.$apis.students  //获取学生课表
    .student_arranging_course({ student_id: this.$route.query.id })
    .then(res => {
      if (res.data.code == 1) {
      if(Object.prototype.toString.call(res.data.data).substr(8,5)=="Objec"){
        this.tableData = [];
      }else{
        this.tableData = res.data.data;
      }
        // console.log(this.tableData);
      }
    });
          //整理获取科目的数据
      this.$apis.common.subject_list().then(res => {
        if (res.data.code == 1) {
          this.msg = res.data;
          this.options_ = res.data.data;
    let addWord=arr=>{
            arr.forEach(item=>{
              item.value=item.id,
              item.label=item.subject_name
            if(item.children instanceof Array){
                addWord(item.children)
            }
          })
          }
          addWord(this.options_)
           this.options=this.options_  
 
        }
      });
    }
  },

  mounted() {}
};
</script>
<style scoped>
ul {
  background-color: #fff;
  height: 90px;
  width: calc(100% - 3px);
}
li {
  list-style: none;
  float: left;
  width: 33%;
  height: 30px;
  font-size: 14px;
  padding: 0;
  /* margin: 0 0 0 -1px; */
}
ul li:nth-child(3){
  width: 34%;
}
ul li:nth-child(6){
  width: 34%;
}
ul li:nth-child(9){
  width: 34%;
}
li span {
  display: inline-block;
  float: left;
  width: 49%;
  height: 30px;
  line-height: 30px;
}
li :nth-child(1) {
  width: 30%;
  text-align: center;
  background-color: #f5f5f5;
  /* border:1px solid #F5F5F5; */
}
li :nth-child(2) {
  width:  69% ;
  text-align: center;
box-shadow: 0 0 0 1px #f5f5f5 }
</style>