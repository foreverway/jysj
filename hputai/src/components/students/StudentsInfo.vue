<template>
  <div >
    <!-- <p><span>学员</span><span style="font-weight:700;color:orange;margin:0 5px;">{{form.username}}</span><span>的详情</span></p> -->
    <zx-head title>
      <span>学员</span>
      <span style="font-weight:700;color:orange;margin:0 5px;">{{form.username}}</span>
      <span>的详情</span>
    </zx-head>
    <div style="margin:0 50px;">
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
    <div style="clear:both;"></div>
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

    <el-table border :data="tableData">
      <el-table-column prop="title" label="报名标题" width="180"></el-table-column>
      <el-table-column prop="number" label="编号" width="180"></el-table-column>
      <el-table-column prop="subject_name" label="科目"></el-table-column>
      <el-table-column prop="course_type" label="类型" width="180"></el-table-column>
      <el-table-column prop="app_status" label="状态" width="180"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>
    <div style="clear:both;"></div>
    <p style="margin:10px;">
      <span style="font-weight:900;color:orange;font-size:25px;">&nbsp;|&nbsp;</span>学员课表
    </p>
      <div >
        <el-table
          class
          :data="classData"
          :header-cell-style="{background:'#f4f4f4'}"
          :row-class-name="tableRowClassName"
          style="margin-top:20px,"
        >
          <el-table-column prop="start_time" label="开始时间" width="140"></el-table-column>
          <el-table-column prop="classhour" label="课时" width="50"></el-table-column>
          <el-table-column prop="student_name" label="学生姓名"></el-table-column>
          <el-table-column prop="teacher_name" label="讲师姓名"></el-table-column>
          <el-table-column prop="course_address" label="地点"></el-table-column>
          <el-table-column prop="subject_name" label="科目"></el-table-column>
          <el-table-column prop="live_name" label="直播平台"></el-table-column>
          <el-table-column label="操作" width="320" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                v-if="scope.row.ready_txt=='待直播'"
                style="color:red"
              >{{scope.row.ready_txt}}</el-button>
              <el-button
                size="mini"
                v-if="scope.row.ready_txt=='未知状态'"
                style="color:silver;bcakground-color:rgb(255,208,75);"
              >{{scope.row.ready_txt}}</el-button>
              <el-button
                size="mini"
                v-if="scope.row.ready_txt=='观看回放'"
                style="color:white;background-color:#409eff;"
              >
                <a @click="openVideo(scope.row.playback_url)">{{scope.row.ready_txt}}</a>
              </el-button>
              <el-button
                size="mini"
                v-if="scope.row.feedback_txt=='讲师填写反馈'"
                @click="fillFeedback(scope.row.course_id)"
                style="color:orange"
              >{{scope.row.feedback_txt}}</el-button>
              <el-button
                size="mini"
                v-if="scope.row.feedback_txt=='查看课堂反馈'"
                @click="fillFeedback_see(scope.row.course_id)"
                style="color:blue"
              >{{scope.row.feedback_txt}}</el-button>
              <el-button
                size="mini"
                v-if="scope.row.feedback_txt=='等待讲师填写'"
                style="color:silver"
              >{{scope.row.feedback_txt}}</el-button>
              <!-- <el-button size="mini"  >观看录播</el-button > -->
            </template>
          </el-table-column>
        </el-table>
    <p style="margin:10px;">
      <span style="font-weight:900;color:orange;font-size:25px;">&nbsp;|&nbsp;</span>
学员账号明细
    </p>
     <el-container>
      <el-header>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="学习币明细" name="1"></el-tab-pane>
          <el-tab-pane label="现金钱包明细" name="2"></el-tab-pane>
          <el-tab-pane label="福利钱包明细" name="3"></el-tab-pane>
        </el-tabs>
      </el-header>
      <el-container>
        <el-main>
          <router-view />
          <!-- 主体部分在这里显示 -->
        </el-main>
      </el-container>
    </el-container>
        <!-- 填写课堂反馈 -->
        <el-dialog 
        :close-on-click-modal='false'
         title="填写课堂反馈" :visible.sync="dialogFromVisible">
          <!-- <p style="font-size:18px;height:30px;margin:10px 0;">课程信息</p> -->
          <p style="margin-bottom:10px;"><span style="font-weight:900;color:orange;font-size:25px;">&nbsp;|&nbsp;</span>课程信息</p>

          <ul :data="gridData">
            <li>
              <span>课程名称</span>
              <span>{{gridData.subject_name}}</span>
            </li>
            <li>
              <span>教师姓名</span>
              <span>{{gridData.teacher_name}}</span>
            </li>
            <li>
              <span>班主任</span>
              <span>{{gridData.banzhuren_name}}</span>
            </li>
            <li>
              <span>上课时间</span>
              <span style=" border-top-style:hidden;">{{gridData.start_time}}</span>
            </li>
            <li>
              <span>结束时间</span>
              <span style=" border-top-style:hidden;">{{gridData.end_time}}</span>
            </li>
            <li>
              <span>时长</span>
              <span style=" border-top-style:hidden;">{{gridData.classhour}}</span>
            </li>
            <li>
              <span>授课方式</span>
              <span>{{formLabelAlign.course_address}}</span>
            </li>
            <li style="width:64%;">
              <span style="width:15%;">地点</span>
              <span style="width:84%;">{{formLabelAlign.course_address}}</span>
            </li>
          </ul>
          <div style="clear:both;"></div>
          <p style="margin-bottom:10px;"><span style="font-weight:900;color:orange;font-size:25px;">&nbsp;|&nbsp;</span>反馈内容</p>
          <el-form :model="form" label-width="200px">
            <el-form-item label="类型">
              <el-radio-group v-model="form.feedback_type">
                <el-radio :label="1">试听/首次课程反馈</el-radio>
                <el-radio :label="2">日常上课反馈</el-radio>
                <el-radio :label="3">结课总结</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="本次授课内容"
              prop="desc"
              v-if="form.feedback_type=='2'||form.feedback_type=='1'"
            >
              <el-input type="textarea" v-model="form.details_1"></el-input>
            </el-form-item>
            <el-form-item
              label="课堂配合度和积极性"
              prop="desc"
              v-if="form.feedback_type=='2'||form.feedback_type=='1'"
            >
              <el-input type="textarea" v-model="form.details_2"></el-input>
            </el-form-item>
            <el-form-item label="学生的主要问题和建议" prop="desc" v-if="form.feedback_type=='1'">
              <el-input type="textarea" v-model="form.details_3"></el-input>
            </el-form-item>
            <el-form-item label="课时建议" prop="desc" v-if="form.feedback_type=='1'">
              <el-input type="textarea" v-model="form.details_4"></el-input>
            </el-form-item>
            <el-form-item label="课程阶段安排及课时建议" prop="desc" v-if="form.feedback_type=='1'">
              <el-input type="textarea" v-model="form.details_5"></el-input>
            </el-form-item>
            <el-form-item label="上次课知识点掌握情况" prop="desc" v-if="form.feedback_type=='2'">
              <el-input type="textarea" v-model="form.details_6"></el-input>
            </el-form-item>
            <el-form-item label="作业" prop="desc" v-if="form.feedback_type=='2'">
              <el-input type="textarea" v-model="form.details_7"></el-input>
            </el-form-item>
            <el-form-item label="课程期间学生总体表现" prop="desc" v-if="form.feedback_type=='3'">
              <el-input type="textarea" v-model="form.details_8"></el-input>
            </el-form-item>
            <el-form-item label="下一步学习方案建议" prop="desc" v-if="form.feedback_type=='3'">
              <el-input type="textarea" v-model="form.details_9"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button type="primary" @click="onSubmit_1">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 查看课堂反馈 -->
        <el-dialog  
        :close-on-click-modal='false'
        title="查看老师反馈" :visible.sync="dialogVisible" width="900px">
          <p style="margin-bottom:10px;"><span style="font-weight:900;color:orange;font-size:25px;">&nbsp;|&nbsp;</span>课程信息</p>

          <ul :data="formLabelAlign">
            <li>
              <span>课程名称</span>
              <span>{{formLabelAlign.subject_name}}</span>
            </li>
            <li>
              <span>教师姓名</span>
              <span>{{formLabelAlign.teacher_name}}</span>
            </li>
            <li>
              <span>班主任</span>
              <span>{{formLabelAlign.banzhuren_name}}</span>
            </li>
            <li>
              <span >上课时间</span>
              <span style=" border-top-style:hidden;">{{formLabelAlign.start_time}}</span>
            </li>
            <li>
              <span>结束时间</span>
              <span style=" border-top-style:hidden;">{{formLabelAlign.end_time}}</span>
            </li>
            <li>
              <span>时长</span>
              <span style=" border-top-style:hidden;">{{formLabelAlign.classhour}}</span>
            </li>
            <li>
              <span>授课方式</span>
              <span>{{formLabelAlign.course_address}}</span>
            </li>
            <li style="width:64%;">
              <span style="width:15%;">地点</span>
              <span style="width:84%;">{{formLabelAlign.course_address}}</span>
            </li>
       
          </ul>
          <div style="clear:both;">

          </div>
          <p style="margin-bottom:10px;"><span style="font-weight:900;color:orange;font-size:25px;">&nbsp;|&nbsp;</span>反馈内容</p>
          <el-form label-width="200px" :model="formLabelAlign">
            <el-form-item
              label="反馈类型:"
              
            >
              <p v-if='formLabelAlign.feedback_type==1'>试听/首次课程反馈</p>
              <p v-if='formLabelAlign.feedback_type==2'>日常上课反馈</p>
              <p v-if='formLabelAlign.feedback_type==3'>结课总结</p>
            </el-form-item>
            <el-form-item
              label="本次授课内容:"
              v-if="formLabelAlign.feedback_type=='2'||formLabelAlign.feedback_type=='1'"
            >
              <p>{{formLabelAlign.details_1}}</p>
            </el-form-item>
            <el-form-item
              label="课堂配合度和积极性:"
              v-if="formLabelAlign.feedback_type=='2'||formLabelAlign.feedback_type=='1'"
            >
              <span >{{formLabelAlign.details_2}}</span>
            </el-form-item>
            <el-form-item label="学生的主要问题和建议:" v-if="formLabelAlign.feedback_type=='1'">
              <span>{{formLabelAlign.details_3}}</span>
            </el-form-item>
            <el-form-item label="课时建议:" v-if="formLabelAlign.feedback_type=='1'">
              <span>{{formLabelAlign.details_4}}</span>
            </el-form-item>
            <el-form-item label="课程阶段安排及课时建议:" v-if="formLabelAlign.feedback_type=='1'">
              <span>{{formLabelAlign.details_5}}</span>
            </el-form-item>
            <el-form-item label="上次课知识点掌握情况:" v-if="formLabelAlign.feedback_type=='2'">
              <span>{{formLabelAlign.details_6}}</span>
            </el-form-item>
            <el-form-item label="作业:" v-if="formLabelAlign.feedback_type=='2'">
              <span>{{formLabelAlign.details_7}}</span>
            </el-form-item>
            <el-form-item label="课程期间学生总体表现:" v-if="formLabelAlign.feedback_type=='3'">
              <span>{{formLabelAlign.details_8}}</span>
            </el-form-item>
            <el-form-item label="下一步学习方案建议:" v-if="formLabelAlign.feedback_type=='3'">
              <span>{{formLabelAlign.details_9}}</span>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 其他方式进入课表 other_enter -->
      </div>
      <el-pagination
        style="float:right;margin-top:20px;margin-bottom: 20px;"
        background
        layout="prev, pager, next"
        @prev-click="prev"
        @next-click="next"
        @current-change="current"
        :page-size="5"
        :total="classData.length"
      ></el-pagination>
    <el-button type="primary" style="margin:10px;" @click="goBack">确定</el-button>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ["1"],
      tableData: [], //表格数据
      form: {},
            currentPage: 1, //当前页

      postFrom: {
        value: "",
        student_id: "",
        subject_id: "",
        start_time: "",
        end_time: ""
      },
      classData: [], //学生课表数据
      options: [], //课程名称的数据
      options_: [], //总数据的数据
      pagesize: 5,
      dialogFromVisible: false, //弹出框的设置
      dialogVisible: false, //查看课堂反馈
      gridData: {}, //弹出框的表格数据
      centerDialogVisible: false, //其他方式打开课表
      otherWey: {}, //从其他方法进入直播
      num: 0, //次数的变化
            formLabelAlign: {}, //老师在这里疯狂反馈
      activeName: "1",
      activeIndex: "1",
      thisurl:''
    };
  },
  created() {
    this.getData();
    this.getClassList();
        this.$nextTick(function() {
         this.$router.push({path:"/StudentsList/StudentsInfo/VirtualMonney",
          query:{id:this.$route.query.id}});
    });
  },
  methods: {
    handleChange(val) {},
    goBack() {
      this.$router.go(-1);
    },
        handleClick(tab, event) {
      switch (tab.name) {
        case "1":
          this.$router.push({path:"/StudentsList/StudentsInfo/VirtualMonney",
          query:{id:this.$route.query.id}});
          break;
        case "2":
          this.$router.push({path:"/StudentsList/StudentsInfo/NewMoney",
          query:{id:this.$route.query.id}});
          break;
        case "3":
          this.$router.push({path:"/StudentsList/StudentsInfo/LearningMoney",
          query:{id:this.$route.query.id}});
          break;
      }
    },
    getData() {
      let params={
        is_by_student:1,
        student_id:this.$route.query.id
      }
      this.$apis.students //获取学生信息
        .students_edit({ id: this.$route.query.id })
        .then(res => {
          if (res.data.code == 1) {
            this.form = res.data.data;
          }
        });
      this.$apis.students //获取学生课表
        .student_arranging_course(params)
        .then(res => {
          if (res.data.code == 1) {

            if (res.data.data.count.length==0 ) {
              this.tableData = [];
            } else {
              this.tableData = res.data.data.list;
            }
             console.log(this.tableData);
          }
        });
      //整理获取科目的数据
      this.$apis.common.subject_list().then(res => {
        if (res.data.code == 1) {
          this.msg = res.data;
          this.options_ = res.data.data;
          let addWord = arr => {
            arr.forEach(item => {
              (item.value = item.id), (item.label = item.subject_name);
              if (item.children instanceof Array) {
                addWord(item.children);
              }
            });
          };
          addWord(this.options_);
          this.options = this.options_;
        }
      });
    },
    nowVideo(a) {
      //观看直播
      let parms = {
        course_id: a
      };
      this.$message({
        type: "success",
        message: "正在创建链接,请稍等片刻"
      });
      this.$apis.common.enter_classroom(parms).then(res => {
        if (res.data.code == 1) {
          let client_url = res.data.data.client_url;
          var iWidth = 1000;
          var iHeight = 600;
          var iTop = (window.screen.height - 30 - iHeight) / 2; //获得窗口的垂直位置;
          var iLeft = (window.screen.width - 10 - iWidth) / 2; //获得窗口的水平位置;
          window.open(
            client_url,
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
        } else {
          this.$message({
            type: "warnning",
            message: "数据获取出错"
          });
        }
      });
    },
        current(num) {
      //当前页数
      this.form.page = num;
      this.getadata();
    },
    next() {
      this.form.page++;
      this.getadata();
    },
    prev() {
      //上一页
      if (this.form.page > 1) {
        this.form.page--;
        this.getadata();
      }
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
        tableRowClassName({ row, rowIndex }) {//行变色的问题
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    fillFeedback(a) {
      this.dialogFromVisible = true;
      this.course = a;
      let parms = {
        course_id: a
      };
      this.$apis.common.feedback_add(parms).then(res => {
        if (res.data.code == 1) {
          this.gridData = res.data.data;
        }
      });
    },
        onSubmit() {
      this.form.course_id = this.course;
      this.$apis.common.post_feedback_add(this.form).then(res => {
        if (res.data.code == 1) {
          (this.dialogFromVisible = false),
            this.$message({
              type: "success",
              message: "提交成功"
            });
        }
      });
    },
    onSubmit_1() {
      this.dialogFromVisible = false;
    },
    fillFeedback_see(a) {
      let parms = {
        course_id: a
      };
      this.dialogVisible = true;
      this.$apis.common.course_feedback(parms).then(res => {
        if (res.data.code == 1) {
          this.formLabelAlign = res.data.data;
          console.log(res.data.data);
        }
      });
    },
    getClassList(a) {
      let parms = {
        course_type: 1,
        page: a ? a : 1,
        is_by_student: 1
      };
      this.$apis.common.student_course(parms).then(res => {
        if (res.data.code == 1) {
          this.classData = res.data.data.list;
        }
      });
    },
    handleSizeChange(val) {
      this.pagesize = val * 1;
    },

  },

  mounted() {
 var name=this.$route.path.substring(this.$route.path.indexOf("/")+1);
 this.url=name.substr(0,12)
    
  }
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
ul li:nth-child(3) {
  width: 34%;
}
ul li:nth-child(6) {
  width: 34%;
}
ul li:nth-child(9) {
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
  width: 69%;
  text-align: center;
  box-shadow: 0 0 0 1px #f5f5f5;
}
</style>