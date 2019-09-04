<template>
  <div class="main" >
    <div class="data_main" >
       <el-cascader
          placeholder="输入学生姓名"
          v-model="value_stu"
          :options="options1"
          @change="handleChange(value_stu)"
          filterable
          clearable
        ></el-cascader>
           <!-- 用el-autocomplete -->
        <el-cascader
         placeholder="选择科目"
          v-model="value_sub"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          :show-all-levels="false"
          filterable
          clearable
          @change="handleChange_1"
        ></el-cascader>
        <div  style="height:50px"></div>
   <el-calendar v-model="value"   style="height:500px;">
        <template slot="dateCell" slot-scope="{date, data}" >
          <p >
            {{data.day.slice(8)}}
          </p>
           <!-- <p :class="msg.indexOf(data.day)!=-1? 'is-selected' : ''">
            {{ data.day.slice(8)}}
            <!-- 显示当天 -->
            <!-- {{ msg.indexOf(data.day)!=-1 ? '✔️' : ''}}
          </p> --> 
        </template>
      </el-calendar>
      <!-- 待上课表 -->
      <div class="table_div data_list posi_right" v-if="change_value=='1'">
      <el-table class=""
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :header-cell-style="{background:'#f4f4f4'}"
        :row-class-name="tableRowClassName"
        style="margin-top:20px ,"
      >
        <el-table-column prop="start_time" label="开始时间" width="100"></el-table-column>
        <el-table-column prop="classhour" label="课时" ></el-table-column>
        <el-table-column prop="student_name" label="学生姓名"></el-table-column>
        <el-table-column prop="course_address"  label="地点"></el-table-column>
        <el-table-column prop="subject_name"  label="科目"></el-table-column>
        <el-table-column prop="live_name" label="直播平台"></el-table-column>
        <el-table-column  label="操作" width="320">
          <template slot-scope="scope">
            <p size="mini"  v-if="scope.row.ready_txt=='待直播'" style="color:red;margin:0 10px;display:inline-block;" >{{scope.row.ready_txt}}</p >
            <el-button size="mini" v-if="scope.row.ready_txt=='未知状态'" style="color:silver" >{{scope.row.ready_txt}}</el-button >
            <el-button size="mini" v-if="scope.row.feedback_txt=='等待讲师填写'" @click="teacher_wey" style="color:silver" >{{scope.row.feedback_txt}}</el-button >

          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[6,8,10,12]"
      :page-size="8"
      layout="total, sizes, prev, pager, next"
      :total='tableData.length'>
    </el-pagination>
      </div>
       <!-- 已上课表 -->
           <div class="table_div data_list posi_right" v-if="change_value=='2'">
      <el-table class=""
        :data="tableData.slice((currentPage-1)*pagesize,(currentPage)*pagesize)"
        :header-cell-style="{background:'#f4f4f4'}"
        :row-class-name="tableRowClassName"
        style="margin-top:20px,"
      >
        <el-table-column prop="start_time" label="开始时间" width="100"></el-table-column>
        <el-table-column prop="classhour" label="课时" width="50"></el-table-column>
        <el-table-column prop="student_name" label="学生姓名"></el-table-column>
        <el-table-column prop="course_address" label="地点"></el-table-column>
        <el-table-column prop="subject_name" label="科目"></el-table-column>
        <el-table-column prop="live_name" label="直播平台"></el-table-column>
         <el-table-column  label="操作" width="320">
          <template slot-scope="scope">
            <el-button size="mini" v-if="scope.row.ready_txt=='待直播'" style="color:red" >{{scope.row.ready_txt}}</el-button >
            <el-button size="mini" v-if="scope.row.ready_txt=='未知状态'" style="color:silver;bcakground-color:rgb(255,208,75);" >{{scope.row.ready_txt}}</el-button >
            <el-button size="mini"  v-if="scope.row.ready_txt=='观看回放'" style="color:white;background-color:#409eff;" >
              
              <a @click="openVideo(scope.row.playback_url)">{{scope.row.ready_txt}}</a>
              </el-button >
            <el-button size="mini" v-if="scope.row.feedback_txt=='讲师填写反馈'" style="color:orange" >{{scope.row.feedback_txt}}</el-button >
            <el-button size="mini" v-if="scope.row.feedback_txt=='查看课堂反馈'" style="color:blue" >{{scope.row.feedback_txt}}</el-button >
            <el-button size="mini" v-if="scope.row.feedback_txt=='等待讲师填写'" style="color:silver" >{{scope.row.feedback_txt}}</el-button >

             <!-- <el-button size="mini"  >观看录播</el-button > -->

          </template>
        </el-table-column>
      </el-table>
         <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[6,8,10,12]"
      :page-size="8"
      layout="total, sizes, prev, pager, next"
      :total='tableData.length'>
    </el-pagination>
    <div class="indexVedio"></div>
      </div>
        </div>
  </div>
</template>
<script>
export default {
  props:{
   changeTab:{
     type:String
   } 
  },
  data() {
    return {
      value: "",
      msg: ["2019-06-13 ", "2019-06-18", "2019-06-16"],
      options1: [
        //学生姓名的数据
        // label:"username",
      ],
      currentPage: 1, //当前页
      pagesize:8,
      value_stu:'',
      value_sub:'',
      options_1: [], //学生数组总数据
      options: [], //课程名称的数据
      options_: [], //总数据的数据
      tableData: [],
      tableData_1:[], //经过学科或者学生筛选的数据
      change_value:'1',  //Tab的值  
    };
  },
  created() {
    this.$watch("value", function() {
      //this.artdata()
      let myTime = this.dateToMs(this.value);
    });
    this.getdata();
    this.getStudent();
    this.getClassList()
  },
  computed:{  

  },
    watch:{
    changeTab:function(value){
      this.change_value=value
      this.getClassList()
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize=val*1
      },
      handleCurrentChange(val) {
         this.currentPage = val;
        this.getClassList(val)
      },
    getClassList(a){
 let parms = {
        course_type:this.change_value,
        page:a?a:1,
      };
        this.$apis.common.student_course(parms).then(res => {
    if (res.data.code == 1) {
        this.tableData=res.data.data.list
    }
    })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    artdata() {
      // alert(this.value);
    },
    dateToMs (date) {
    let result = new Date(date).getTime();
    return result;
},
     msToDate (msec) {  //转化标准时间为年月日格式
    let datetime = new Date(msec);
    let year = datetime.getFullYear();
    let month = datetime.getMonth();
    let date = datetime.getDate();
    let hour = datetime.getHours();
    let minute = datetime.getMinutes();
    let second = datetime.getSeconds();
    let result1 = year +   //带秒钟需求
                 '-' + 
                 ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + 
                 '-' + 
                 ((date + 1) < 10 ? '0' + date : date) + 
                 ' ' + 
                 ((hour + 1) < 10 ? '0' +0 : 0) +
                 ':' + 
                 ((minute + 1) < 10 ? '0' + minute : minute) + 
                 ':' + 
                 ((second + 1) < 10 ? '0' + second : second);

    let result2 = year +  //仅年月日需求
                 '-' + 
                 ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) + 
                 '-' + 
                 ((date + 1) < 10 ? '0' + date : date);

    let result = {
        hasTime: result1,
        withoutTime: result2
    };

    return result;
},
teacher_wey(){   //待上课表老师操作
alert(33)
},
    handleChange_1(targetName) { //选择科目
      var lastName = targetName.length == 1 ? targetName[0] : targetName[1];

       let parms = {
        admin_id: this.getdataCookie("admin_id"),
        page:1,
        subject_id:lastName.toString(),
        course_type:this.change_value
      };
        this.$apis.common.student_course(parms).then(res => {
    if (res.data.code == 1) {
        this.tableData=res.data.data.list
    }
    })
    },
     handleChange(targetName) {  //选择学生
      let parms = {
        admin_id: this.getdataCookie("admin_id"),
        page:5,
        student_id:targetName.toString(),
         course_type:this.change_value
      };
        this.$apis.common.student_course(parms).then(res => {
    if (res.data.code == 1) {
        this.tableData=res.data.data.list
    }
    })
    console.log(this.tableData_1)
     },
     openVideo(a){
       //window.location.href=a;
   var iWidth=$(window).width();                         //弹出窗口的宽度;
  var iHeight=600;
  var iTop = (window.screen.height-30-iHeight)/2;       //获得窗口的垂直位置;
  var iLeft = (window.screen.width-10-iWidth)/2;        //获得窗口的水平位置;
 window.open(a,name,'height='+iHeight+',innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');

       },
   getdata() {//获取科目的数据
   if(this.change_value=='1'){
        let parms = {
        admin_id: this.getdataCookie("admin_id")
      };
      this.$apis.common.subject_list(parms).then(res => {
        if (res.data.code == 1) {
          this.msg = res.data;
          this.options_ = res.data.data;
          for (let i = 0; i < this.options_.length; i++) {
            var val = this.options_[i];
            var children = [];
            if (val.children) {
              for (let j = 0; j < val.children.length; j++) {
                var val1 = val.children[j];
                children.push({
                  value: val1.id,
                  label: val1.subject_name
                });
              }
              this.options.push({
                value: val.id,
                label: val.subject_name,
                children: children
              });
            } else {
              this.options.push({
                value: val.id,
                label: val.subject_name
              });
            }
          }
        }
      });
   }
   
    },
    //获取学生列表
    getStudent() {
      let parms = {
        admin_id: this.getdataCookie("admin_id")
      };
      this.$apis.students.students_list(parms).then(res => {
        if (res.data.code == 1) {
          this.options_1 = res.data.data.list;
          for (let i = 0; i < this.options_1.length; i++) {
            var val = this.options_1[i];
            this.options1.push({ value: val.id, label: val.username });
          }
        }
      });
    },
        getdataCookie(cname) {
      // return 1
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      // this.$router.push({path:'/login'})
    }
  }
};
</script>
<style scoped>
html {
  overflow-y: scroll;
}

:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  width: 100vw;
  overflow: hidden;
}
.data_main {
  width: 600px;
  float: left;
}
.data_list {
  width: 505px;
  margin-left: 10px;
  float: left;
}
/* .flex_div{
  width:100%;
  height: 600px;
  display:flex;
  justify-content:space-around;
  align-items: center;
} */
.posi_right{
  position: absolute;
  width: 50%;
  left:640px;
  top:225px; border:1px solid block ;
    border:1px solid silver;
}

 .el-calendar{
  width: 400px !important;
   height: 400px !important;
}

.el-calendar-table .el-calendar-day {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 8px;
  height: 35px !important;
}

 .prev .el-calendar-day{
   height: 35px !important;
}
/* .data_main[data-v-83bc0558]{
  width: 300px !important;
    float: left;
    height: 600px !important;
} */
</style>
