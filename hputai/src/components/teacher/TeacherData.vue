<template>
  <div class="so_main">
    <zx-head title="教师课表"></zx-head>

    <div class="so_main_left">
      <el-input
        style="width:150px;"
        class="so_input"
        v-model="params.search"
        @input="getadata"
        clearable
        placeholder="请输入搜索内容"
      ></el-input>

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

      <el-select v-model="params.course_type" placeholder="选择授课类型" @change="getadata"  filterable clearable>
        <el-option
          v-for="item in options_type"
          clearable
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="params.teacher_id" placeholder="选择老师"    filterable clearable @change="getadata_teacher">
        <el-option
          v-for="item in teacher_options"
       
          :key="item.id"
       
          :label="item.teacher_name"
          :value="item.id"
        ></el-option>
      </el-select>
       <el-button style="background-color:#409EFF;color:white;" v-if="params.teacher_id" @click="dis_class = true">查看{{this.show_teacher}}</el-button>
      <br>
      <el-date-picker
        
        v-model="params.start_time"
        @change="getadata"
        type="datetime"
        clearable
        value-format="yyyy-MM-dd H:mm:ss"
        placeholder="选择日期时间"
      ></el-date-picker>至
      <el-date-picker
      style="margin:0 0 20px 10px"
        @change="getadata"
        v-model="params.end_time"
        type="datetime"
        clearable
        value-format="yyyy-MM-dd H:mm:ss"
        placeholder="选择日期时间"
      ></el-date-picker>
      <!-- <el-button type="primary" @click="getadata">搜索</el-button> -->
      <el-button type="primary" v-if="ifTeacher()" @click="recharge_export">导出</el-button>
    </div>
    <!-- 表格数据 -->
    <el-table
      :data="tableData"
      style="margin-top:10px;"
      border
      :header-cell-style="{background:'#f4f4f4'}"
    >
      <el-table-column label="序号" type="index" :index="indexMethod" width="80" align="center"></el-table-column>

      <el-table-column :show-overflow-tooltip="true" align="center" label="科目" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.subject_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="学员" width="80">
        <template slot-scope="scope">
          <p>{{ scope.row.student_name }}</p>
        </template>
      </el-table-column>

      <el-table-column label="讲师" width="100" prop="teacher_name"></el-table-column>

      <el-table-column align="center" width="200" prop="start_time" label="上课时间" sortable></el-table-column>
      <el-table-column align="center" width="200" prop="end_time" label="下课时间" sortable></el-table-column>
      <el-table-column align="center" prop="classhour" label="课时" sortable></el-table-column>

      <el-table-column label="授课类型" prop="course_type"></el-table-column>
      <el-table-column label="已上/待上" prop="course_status"></el-table-column>
      <el-table-column align="center" label="操作" width="280px" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="openVideo(scope.row.playback_url)">录播</el-button>
          <el-button size="mini" type="primary" @click="checkWork(scope.row)">考勤数据</el-button>
          <el-button size="mini" type="primary" @click="feedback(scope.row)">查看反馈</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 看录播 -->
    <!-- 查看数据 -->
    <el-dialog title="考勤信息" :visible.sync="checkopen" width="600px">
      <!-- <p style="margin-bottom:10px;"><span style="font-weight:900;color:orange;font-size:25px;">&nbsp;|&nbsp;</span>课程信息</p> -->

      <el-form
        id="form_style"
        :label-position="labelPosition"
        :inline="true"
        label-width="120px"
        :model="check_data"
      >
        <el-form-item label="课时">
          <p>{{check_data.classhour}}</p>
        </el-form-item>
        <el-form-item label="备注">
          <p>{{check_data.remarks?check_data.remarks:'没有填写'}}</p>
        </el-form-item>
        <el-form-item label="实上课时" v-if="ifTeacher()">
          <p>{{check_data.true_classhour}}</p>
        </el-form-item>

        <el-form-item label="备注" v-if="ifTeacher()">
          <p>{{check_data.remarks1}}</p>
        </el-form-item>
        <el-form-item label="学生课时" v-if="ifTeacher()">
          <p>{{check_data.student_classhour}}</p>
        </el-form-item>
        <el-form-item label="备注" v-if="ifTeacher()">
          <p>{{check_data.remarks2}}</p>
        </el-form-item>
        <el-form-item label="教师课时">
          <p>{{check_data.teacher_classhour}}</p>
        </el-form-item>
        <el-form-item label="备注">
          <p>{{check_data.remarks3}}</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkopen = false">取 消</el-button>
        <el-button type="primary" @click="checkopen = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看反馈 -->
    <el-dialog title="反馈信息" :close-on-click-modal="false" :visible.sync="feedopen" width="900px">
      <p style="margin-bottom:10px;">
        <span style="font-weight:900;color:orange;font-size:25px;">&nbsp;|&nbsp;</span>课程信息
      </p>

      <ul :data="feed_data" id="teacherUl">
        <li>
          <span>学科姓名</span>
          <span>{{feed_data.subject_name}}</span>
        </li>
        <li>
          <span>教师姓名</span>
          <span>{{feed_data.teacher_name}}</span>
        </li>
        <li>
          <span>班主任</span>
          <span>{{feed_data.banzhuren_name}}</span>
        </li>
        <li>
          <span>上课时间</span>
          <span style=" border-top-style:hidden;">{{feed_data.start_time}}</span>
        </li>
        <li>
          <span>结束时间</span>
          <span style=" border-top-style:hidden;">{{feed_data.end_time}}</span>
        </li>
        <li>
          <span>时长</span>
          <span style=" border-top-style:hidden;">{{feed_data.classhour}}</span>
        </li>
        <li>
          <span>学生姓名</span>
          <span>{{feed_data.student_name}}</span>
        </li>
        <li>
          <span>反馈类型</span>
          <span>{{feed_data.feedback_type==1?'试听/首次课程反馈':feed_data.feedback_type==2?'日常上课反馈':feed_data.feedback_type==3?'结课总结':'未定义'}}</span>
        </li>
        <li>
          <span>课程地址</span>
          <span>{{feed_data.course_address}}</span>
        </li>
      </ul>
      <div style="clear:both;"></div>
      <p style="margin-bottom:10px;">
        <span style="font-weight:900;color:orange;font-size:25px;">&nbsp;|&nbsp;</span>反馈内容
      </p>
      <el-form label-width="200px" :model="feed_data" v-if="feed_data.feedback_type==1">
        <el-form-item label="反馈类型:">
          <p v-if="feed_data.feedback_type==1">试听/首次课程反馈</p>
        </el-form-item>
        <el-form-item label="试听/首次课上课内容">
          <p>{{feed_data.feedback1.details_1}}</p>
        </el-form-item>
        <el-form-item label="学生的课堂表现及学生学习上存在的主要问题:">
          <span>{{feed_data.feedback1.details_2}}</span>
        </el-form-item>
        <el-form-item label="老师对学生此科目学习水平的评估及接下来的学习建议">
          <p>{{feed_data.feedback1.details_3}}</p>
        </el-form-item>
        <el-form-item label="针对此学生的课程计划及相应的课时安排:">
          <span>{{feed_data.feedback1.details_4}}</span>
        </el-form-item>
        <el-form-item label="本次课的课后作业">
          <p>{{feed_data.feedback1.details_5}}</p>
        </el-form-item>
      </el-form>

      <el-form label-width="200px" :model="feed_data" v-if="feed_data.feedback_type==2">
        <el-form-item label="反馈类型:">
          <p v-if="feed_data.feedback_type==2">日常上课反馈</p>
        </el-form-item>
        <el-form-item label="上节课学生作业的完成情况及其知识点掌握情况">
          <p>{{feed_data.feedback2.details_1}}</p>
        </el-form-item>
        <el-form-item label="本次上课内容:">
          <span>{{feed_data.feedback2.details_2}}</span>
        </el-form-item>
        <el-form-item label="学生的课堂表现及学生本次课掌握不好的地方，学生课下复习的重点有哪些">
          <p>{{feed_data.feedback2.details_3}}</p>
        </el-form-item>
        <el-form-item label="本次课的课后作业:">
          <span>{{feed_data.feedback2.details_4}}</span>
        </el-form-item>
      </el-form>
      <el-form label-width="200px" :model="feed_data" v-if="feed_data.feedback_type==3">
        <el-form-item label="反馈类型:">
          <p v-if="feed_data.feedback_type==3">阶段性上课反馈</p>
        </el-form-item>
        <el-form-item label="总结此阶段的学习内容">
          <p>{{feed_data.feedback3.details_1}}</p>
        </el-form-item>
        <el-form-item label="总结此阶段学生作业的完成情况及其知识点掌握情况:">
          <span>{{feed_data.feedback3.details_2}}</span>
        </el-form-item>
        <el-form-item label="指出学生接下来需要提升的若干点">
          <p>{{feed_data.feedback3.details_3}}</p>
        </el-form-item>
        <el-form-item label="授课老师接下来的课程计划:">
          <span>{{feed_data.feedback3.details_4}}</span>
        </el-form-item>
      </el-form>
      <el-form label-width="200px" :model="feed_data" v-if="feed_data.feedback_type==4">
        <el-form-item label="反馈类型:">
          <p v-if="feed_data.feedback_type==4">结课总结</p>
        </el-form-item>
        <el-form-item label="总结此整个课程学习内容">
          <p>{{feed_data.feedback4.details_1}}</p>
        </el-form-item>
        <el-form-item label="总结此课程教学过程中学生作业的完成情况及其知识点掌握情况:">
          <span>{{feed_data.feedback4.details_2}}</span>
        </el-form-item>
        <el-form-item label="指出学生接下来需要提升的若干点">
          <p>{{feed_data.feedback4.details_3}}</p>
        </el-form-item>
        <el-form-item label="授课老师接下来对学生后续学习此科目或课程的建议:">
          <span>{{feed_data.feedback4.details_4}}</span>
        </el-form-item>
      </el-form>
      <el-form label-width="200px" :model="feed_data" v-if="feed_data.feedback_type==null">
        <el-form-item label="反馈类型:">
          <p v-if="feed_data.feedback_type==null">参数丢失,此课程反馈无法查看</p>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close_feed">取 消</el-button>
        <el-button type="primary" @click="close_feed">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
  :title=this.show_teacher
  :visible.sync="dis_class"
  width="800px"
  :close-on-click-modal="false"
>
<div class="class_dia">
  <el-calendar >
  <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
  <template
    slot="dateCell"
    slot-scope="{date, data}">
    <p :class="data.isSelected ? 'is-selected' : ''">
      {{ data.day.split('-').slice(2).join('-') }} {{ data.isSelected ? '✔️' : ''}}
    </p>
    <p>{{}}节课</p>
  </template>
</el-calendar>

<div class="class_dia_div">
  <h3>{{}}课程安排</h3>
    <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :icon="activity.icon"
      :type="activity.type"
      :color="activity.color"
      :size="activity.size"
      :timestamp="activity.timestamp">
      {{activity.content}}
    </el-timeline-item>
  </el-timeline>
</div>
</div>
  
  <span slot="footer" class="dialog-footer">
    <el-button @click="dis_class = false">取 消</el-button>
    <el-button type="primary" @click="dis_class = false">确 定</el-button>
  </span>
</el-dialog>
    <span v-if="msg.data">
      <el-pagination
        style="margin-top:30px; float: right;"
        background
        layout="prev, pager, next"
        @prev-click="prev"
        @next-click="next"
        @current-change="current"
        :total="msg.data.count"
      ></el-pagination>
    </span>
  </div>
</template>

<script>
//import urls from '../common/const_config.js'
import url from "../../config/config.js";

import { mapState } from "vuex";
export default {
  data() {
    return {
      msg: "",
      tableData: [],
      labelPosition: "right",
      //teacher_data:[],  //老师列表数据
      check_data: {}, //考勤数据
      feed_data: {}, //反馈数据
      value_sub: "",
      dis_class:false,//课表弹出框
      params: {
        teacher_id: "",
        subject_id: "",
        search: "",
        course_type: "",
        start_time: "",
        end_time: "",
        page: "1"
      },
      options_type: [
        { value: 1, label: "正课" },
        { value: 2, label: "试听" }
      ],
      checkopen: false, //考勤的弹出
      feedopen: false, //反馈的弹出
      options_: [],
      options: [],
      show_teacher:'',
      teacher_options: [] ,//老师数组
       activities: [{
          content: '测试数据',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-video-camera-solid'
        }, {
          content: '测试数据',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        }, {
          content: '测试数据',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }, {
          content: '测试数据',
          timestamp: '2018-04-03 20:46'
        },{
          content: '测试数据',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '测试数据',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        }, {
          content: '测试数据',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }, {
          content: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: '支持自定义颜色',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87'
        }, {
          content: '支持自定义尺寸',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }, ]
    };
  },
  created() {
    this.$apis.students.getuilcode();
    this.getadata();
    // mapState("teacher_data");
  },

  computed: mapState(["teacher_data"])
  ,
  mounted(){
        this.teacher_options=this.teacher_data
  },
  methods: {
    ifTeacher() {
      return localStorage.getItem("ifTeacher") == 0;
    },
    indexMethod(index) {
      if (this.params.page == 1) {
        return index + 1;
      } else {
        let page = (this.params.page - 1) * 10 + 1;
        return index + page;
      }
    },
    change_teacher() {
      console.log(this.teacher_data);
    },
    //导出
    recharge_export() {
      this.$message({
        type: "success",
        message: "正在导出,请稍等..."
      });
      // let urls = "http://personal.test.hqjystudio.com";
      let parms = "";
      for (var key in this.params) {
        if(this.params[key]){
parms += key + "=" + this.params[key] + "&";
        }
        
      }
      window.location.href = url.urls + "/teaching_data_export" + "?" + parms;
    },
    //序号排列
    indexMethod(index) {
      if (this.params.page == 1) {
        return index + 1;
      } else {
        let page = (this.params.page - 1) * 10 + 1;
        return index + page;
      }
    },
    close_feed() {
      this.feedopen = false;
      this.feed_data = {};
    },
    openVideo(a) {
      //观看录播
      //  var iWidth=$(window).width();                         //弹出窗口的宽度;
      if (a == "0") {
        this.$message({
          type: "warning",
          message: "我们的直播数据还在生成中,你可以稍后再来",
          duration: 4000
        });
      } else {
        var iWidth = 1000;
        var iHeight = 600;
        var iTop = (window.screen.height - 30 - iHeight) / 2; //获得窗口的垂直位置;
        var iLeft = (window.screen.width - 10 - iWidth) / 2; //获得窗口的水平位置;
        window.open(
          a,
          name,
          "height=" +
            iHeight +
            ",innerHeight=" +
            iHeight +
            ",width=" +
            iWidth +
            ",innerWidth=" +
            iWidth +
            ",top=" +
            iTop +
            ",left=" +
            iLeft +
            ",toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no"
        );
      }
    },
    checkWork(result) {
      //考勤数据

      if (result.course_id !== null) {
        this.checkopen = true;
        this.$apis.common
          .attendance_details({ course_id: result.course_id })
          .then(res => {
            if (res.data.code == 1) {
              this.check_data = res.data.data;
            }
          });
      } else {
        this.$message({
          type: "warning",
          message: "参数丢失，请咨询研发部"
        });
      }
    },
    feedback(result) {
      //反馈数据
      if (result.course_id !== null) {
        this.$apis.common
          .course_feedback({ course_id: result.course_id })
          .then(res => {
            if (res.data.code == 1 && res.data.data.feedback_type) {
              this.feed_data = res.data.data;
            } else {
              this.$message({
                type: "warning",
                message: "无法读取的不标准反馈"
              });
            }
          });
        this.feedopen = true;
      } else {
        this.$message({
          type: "warning",
          message: "参数丢失，请咨询研发部"
        });
      }
    },
    current(num) {
      //当前页数
      this.params.page = num;
      this.getadata();
    },
    next() {
      this.params.page++;
      this.getadata();
    },
    prev() {
      //上一页
      if (this.params.page > 1) {
        this.params.page--;
        this.getadata();
      }
    },
    toAssess(a) {},
    handleChange_1(targetName) {
      //选择科目
      var lastName =
        targetName.length == 1
          ? targetName[0]
          : targetName.length == 2
          ? targetName[1]
          : targetName[2];
      if (lastName !== undefined) {
        this.params.subject_id = lastName;
        // this.value_sub=lastName
      }
      // this.params.subject_id=this.value_sub
      // console.log(this.params)
      this.getadata();
    },
    getadata_teacher(a){
  let teacher_name = this.teacher_options.filter(item=>
  
  
    item.id==a)
    
    if(teacher_name.length!==0){
this.show_teacher=teacher_name[0].teacher_name?teacher_name[0].teacher_name+"老师的课表":""
    }else{
      this.show_teacher=''
    }
    
this.getadata()
    },
    getadata() {
      this.$apis.teacher.teaching_data(this.params).then(res => {
        this.tableData = res.data.data.list;
        this.msg = res.data;
      });
      //获取科目的数据
      this.$apis.common.subject_list().then(res => {
        if (res.data.code == 1) {
          this.options_ = res.data.data;
          this.options = [];
          let addWord = arr => {
            arr.forEach(item => {
              (item.value = item.id), (item.label = item.subject_name);
              // this.options.push({value:item.id,label:item.subject_name})
              if (item.children instanceof Array) {
                addWord(item.children);
              }
            });
          };
          addWord(this.options_);
          this.options = this.options_;
        }
      });
    }
  }
};
</script>
<style scoped>
/* .so_input {
  width: 300px;
} */
.el-calendar {
  width: 500px !important;
  height: 450px !important;
  border:1px silver solid;
}

.class_dia /deep/ .el-calendar-table .el-calendar-day {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 8px;
  height: 52px ;
}

.prev .el-calendar-day {
  height: 35px !important;
}
#beauty_p p {
  margin-left: 20px;
}
.so_main_left {
  float: left;
  margin: 0 10px;
}
.el-select {
  margin: 20px 5px;
}
.so_main_right {
  float: right;
}
.yulan_height {
  height: 50vh;
}

.hover_img_main {
  position: relative;
}
.hover_img_show {
  display: node;
  position: absolute;
}
.hover_img:hover .hover_img_show {
  display: block;
}
#form_style p {
  width: 100px;
}
#teacherUl li {
  list-style: none;
  display: inline-block;
  float: left;
  width: 32%;
  height: 30px;
  padding: 0;
  margin: 0 0 0 -1px;
}
#teacherUl li span {
  display: inline-block;
  float: left;
  width: 49%;
  height: 30px;
  line-height: 30px;
}
#teacherUl li :nth-child(1) {
  width: 30%;
  text-align: center;
  background-color: #f5f5f5;
  /* border:1px solid #F5F5F5; */
}
#teacherUl li :nth-child(2) {
  width: 69%;
  text-align: center;
  border: 1px solid #f5f5f5;
}
.class_dia{
  width:100%;
  display: grid;
  grid-template-columns: 68% 32%;
  align-items: center;
  justify-content: space-around;
}
.class_dia_div{
  width:220px;
  margin-left: 10px;
  height: 400px;
  overflow-y: auto;
  /* scroll-y:auto; */
}
.class_dia_div /deep/ .el-timeline-item__node--large{
  left:2px;
  height:20px;
  width:20px;
}
.class_dia_div /deep/ .el-timeline-item__tail{
  left:10px;
}
.class_dia_div /deep/ .el-timeline-item__node--normal{
  left:5px;
}
</style>
