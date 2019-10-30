<template>
  <div class="main screen_he">
    <div class="data_main">
      <el-cascader
        placeholder="输入学生姓名"
        v-model="value_stu"
        :options="options1"
        clearable
        @change="handleChange(value_stu)"
        filterable
      ></el-cascader>
      <!-- 用el-autocomplete -->
      <el-cascader
        placeholder="选择科目"
        v-model="value_sub"
        clearable
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        :show-all-levels="false"
        @change="handleChange_1"
      ></el-cascader>
      <div style="height:20px"></div>
      <!-- <el-calendar v-model="value" style="height:500px;">
        <template slot="dateCell" slot-scope="{date, data}">
          <p @click="searchDay(data.day)">{{data.day.slice(8)}}</p>
        </template>
      </el-calendar> -->
      <el-calendar>
  <template
    slot="dateCell"
    slot-scope="{date, data}">
    <p :class="data.isSelected ? 'is-selected' : ''" @click="searchDay(data.day)">
           {{data.day.slice(8)}}{{ data.isSelected ? '✔️' : ''}}
    </p>
  </template>
</el-calendar>
      <!-- 待上课表 -->
      <div class="table_div data_list posi_right" v-if="change_value=='1'">
        <el-table
          class
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          :header-cell-style="{background:'#f4f4f4'}"
          :row-class-name="tableRowClassName"
          style="margin-top:20px ,"
        >
          <el-table-column prop="start_time" label="开始时间" width="140"></el-table-column>
          <el-table-column prop="classhour" label="课时"></el-table-column>
          <el-table-column prop="student_name" label="学生姓名"></el-table-column>
          <el-table-column prop="teacher_name" label="讲师姓名"></el-table-column>
          <el-table-column prop="course_address" label="地点"></el-table-column>
          <el-table-column prop="subject_name" label="科目"></el-table-column>
          <el-table-column prop="live_name" label="直播平台"></el-table-column>
          <el-table-column label="操作" width="220" @click="dialogVisible_other = true" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" v-if="scope.row.ready_txt=='准备直播'" style="color:red">
                <a @click="nowVideo(scope.row.course_id)">{{scope.row.ready_txt}}</a>
              </el-button>
              <el-button
                size="mini"
                v-if="scope.row.ready_txt=='未知状态'"
                style="color:silver"
              >{{scope.row.ready_txt}}</el-button>
              <el-button
                size="mini"
                v-if="scope.row.ready_txt=='待直播'"
                style="color:white;background-color:#409eff;"
              >{{scope.row.ready_txt}}</el-button>
              <el-button
                size="mini"
                v-if="scope.row.ready_txt=='直播中'"
                style="color:white;background-color:#409eff;"
              >
                <a @click="nowVideo(scope.row.course_id)">{{scope.row.ready_txt}}</a>
              </el-button>
              <!-- 如果有人他进入不了直播他就只能来这 -->
              <!-- <div style="width:120px; display:inline-block;">
                <el-select v-model="value_other" :change="changeSele()" placeholder="请选择">
                  <el-option
                    v-for="item in options_other"
                    :key="item.value_other"
                    :label="item.label"
                    :value="item.value_other"
                  ></el-option>
                </el-select>
              </div>-->
              <el-dropdown
                @command="changeSele(scope.row.course_id)"
                style="border:1px orange solid;cursor:pointer;"
              >
                <span class="el-dropdown-link">
                  直播备用方法
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a" style="width:100px;text-align:center;">方法一</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-button
                size="mini"
                v-if="scope.row.feedback_txt=='讲师填写反馈'"
                style="color:orange"
              >{{scope.row.feedback_txt}}</el-button>
              <el-button
                size="mini"
                v-if="scope.row.feedback_txt=='查看课堂反馈'"
                style="color:blue"
              >{{scope.row.feedback_txt}}</el-button>
              <el-button
                size="mini"
                v-if="scope.row.feedback_txt=='等待讲师填写'"
                style="color:silver"
              >{{scope.row.feedback_txt}}</el-button>
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
          :total="tableData.length"
        ></el-pagination>
        <el-dialog 
        :close-on-click-modal='false'
        title="其他方式进入教室" :visible.sync="centerDialogVisible" center>
          <el-dialog width="30%" title="使用手机扫码下载" :visible.sync="innerVisible" append-to-body>
            <div class="flex_div">
              <img :src="otherWey.mobileDownloadUrl" />
            </div>
          </el-dialog>
          <el-form
            label-width="80px"
            :model="otherWey"
            v-model="labelPosition"
            :label-position="labelPosition"
          >
            <el-form-item label="方式一：参与码进入教室" style="font-weight:700;">
              <p v-if="otherWey.code">
                你的参与码：
                <span style="color:orange;">{{otherWey.code}}</span>
              </p>
              <p v-if="!otherWey.code">
                你的参与码：
                <span style="color:orange;">暂未生成</span>
              </p>
              <p>打开“云端课堂”的PC端或者APP端，输入参与码，即可进入教室。</p>
              <p>
                <el-button @click="toPc()">Windows版下载</el-button>
                <el-button @click="toMac()">Mac版下载</el-button>
                <el-button @click="toMob()">手机版下载</el-button>（或在手机应用市场搜索“云端课堂”即可下载）
              </p>
            </el-form-item>
            <el-form-item label="方式二：网页端进入教室" style="font-weight:700;">
              <el-button @click="nowSee()">点击这里即可进入教室</el-button>
              <p>或者复制下方链接在其他浏览器打开</p>
              <p>{{otherWey.webUrl}}</p>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeDio">取 消</el-button>
            <el-button type="primary" @click="closeDio">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 已上课表 -->
      <div class="table_div data_list posi_right" v-if="change_value=='2'">
        <el-table
          class
          :data="tableData.slice((currentPage-1)*pagesize,(currentPage)*pagesize)"
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
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[6,8,10,12]"
          :page-size="8"
          layout="total, sizes, prev, pager, next"
          :total="tableData.length"
        ></el-pagination>
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
    </div>
  </div>
</template>
<script>
export default {
  props: {
    changeTab: {
      type: String
    }
  },
  data() {
    return {
      value: "",
      labelPosition: "top", //其他方法进入直播排在顶部
      innerVisible: false, //内层弹框
      form: {
        feedback_type: "1",
        details_1: "",
        details_2: "",
        details_3: "",
        details_4: "",
        details_5: "",
        details_6: "",
        details_7: "",
        details_8: "",
        details_9: ""
      }, //from提交的数据
      msg: ["2019-06-13 ", "2019-06-18", "2019-06-16"],
      options1: [
        //学生姓名的数据
        // label:"username",
      ],

      formLabelAlign: {}, //老师在这里疯狂反馈
      course: "", //课程ID
      //  radio:'1',//反馈类型
      currentPage: 1, //当前页
      pagesize: 8,
      value_stu: "",
      value_sub: "",
      options_1: [], //学生数组总数据
      options: [], //课程名称的数据
      options_: [], //总数据的数据
      tableData: [],
      tableData_1: [], //经过学科或者学生筛选的数据
      change_value: "1", //Tab的值
      dialogFromVisible: false, //弹出框的设置
      dialogVisible: false, //查看课堂反馈
      gridData: {}, //弹出框的表格数据
      centerDialogVisible: false, //其他方式打开课表
      otherWey: {}, //从其他方法进入直播
      num: 0 //次数的变化
    };
  },
  created() {
    this.$watch("value", function() {
      //this.artdata()
      let myTime = this.dateToMs(this.value);
    });
    this.getdata();
    this.getStudent();
    this.getClassList();
  },
  updated(){
  // var bodyDiv=$('.screen_he')
  //   $(bodyDiv)[0].style.height=$(window).height()*1-210+'px'
  },
  mounted(){

  },
  computed: {},
  watch: {
    changeTab: function(value) {
      this.change_value = value;
      this.getClassList();
    }
  },
  methods: {
    toPc() {
      window.open(this.otherWey.windowsDowloadUrl);
    },
    toMac() {
      window.open(this.otherWey.macDowloadUrl);
    },
    toMob() {
      this.innerVisible = true;
      // window.open(this.otherWey.mobileDownloadUrl)
    },
    nowSee() {
      window.open(this.otherWey.webUrl);
    },
    closeDio() {
      this.value_other = "";
      this.centerDialogVisible = false;
    },
    changeSele(a) {
      //这是根据选中的值变化的函数
      console.log(a);
      this.centerDialogVisible = true;
      let prams = {
        course_id: a
      };
      this.$apis.common.other_enter(prams).then(res => {
        if (res.data.code == 1) {
          this.otherWey = res.data.data;
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
          console.log(res.data.data)
        }
      });
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
    handleSizeChange(val) {
      this.pagesize = val * 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getClassList(val);
    },
    getClassList(a) {
      this.$emit("update:changeTab", this.change_value);
      let parms = {
        course_type: this.change_value,
        page: a ? a : 1
      };
      this.$apis.common.student_course(parms).then(res => {
        if (res.data.code == 1) {
          this.tableData = res.data.data.list;
        }
      });
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
    dateToMs(date) {
      let result = new Date(date).getTime();
      return result;
    },
    msToDate(msec) {
      //转化标准时间为年月日格式
      let datetime = new Date(msec);
      let year = datetime.getFullYear();
      let month = datetime.getMonth();
      let date = datetime.getDate();
      let hour = datetime.getHours();
      let minute = datetime.getMinutes();
      let second = datetime.getSeconds();
      let result1 =
        year + //带秒钟需求
        "-" +
        (month + 1 >= 10 ? month + 1 : "0" + (month + 1)) +
        "-" +
        (date + 1 < 10 ? "0" + date : date) +
        " " +
        (hour + 1 < 10 ? "0" + 0 : 0) +
        ":" +
        (minute + 1 < 10 ? "0" + minute : minute) +
        ":" +
        (second + 1 < 10 ? "0" + second : second);

      let result2 =
        year + //仅年月日需求
        "-" +
        (month + 1 >= 10 ? month + 1 : "0" + (month + 1)) +
        "-" +
        (date + 1 < 10 ? "0" + date : date);

      let result = {
        hasTime: result1,
        withoutTime: result2
      };

      return result;
    },
    handleChange_1(targetName) {
      //选择科目
      var lastName = targetName.length == 1 ? targetName[0] : targetName[1];
      let parms = {
        admin_id: this.getdataCookie("admin_id"),
        page: 1,
        subject_id: lastName.toString(),
        course_type: this.change_value
      };
      this.$apis.common.student_course(parms).then(res => {
        if (res.data.code == 1) {
          this.tableData = res.data.data.list;
        }
      });
    },
    handleChange(targetName) {
      //选择学生
      let parms = {
        admin_id: this.getdataCookie("admin_id"),
        page: 1,
        student_id: targetName.toString(),
        course_type: this.change_value
      };
      this.$apis.common.student_course(parms).then(res => {
        if (res.data.code == 1) {
          this.tableData = res.data.data.list;
        }
      });
    },
    searchDay(a) {
      let parms = {
        admin_id: this.getdataCookie("admin_id"),
        page: 1,
        course_type: this.change_value,
        start_time: a
      };
      this.$apis.common.student_course(parms).then(res => {
        if (res.data.code == 1) {
          this.tableData = res.data.data.list;
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
    getdata() {
      //获取科目的数据
            //获取科目的数据
           this.$apis.common.subject_list().then(res => {
        if (res.data.code == 1) {
          this.msg = res.data;
          this.options_ = res.data.data;
              let addWord=arr=>{
            arr.forEach(item=>{
              item.value=item.subject_name,
              item.label=item.subject_name
            if(item.children instanceof Array){
                addWord(item.children)
            }
          })
          }
          addWord(this.options_)
           this.options=this.options_  
        }
      })

    },
    //获取学生列表
    getStudent() {
      let parms = {
        is_data: 1
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
.data_main {
  width: 600px;
  float: left;
}
.data_list {
  width: 505px;
  margin-left: 10px;
  float: left;
}

.posi_right {
  position: absolute;
  width: 65%;
  left: 440px;
  top: 165px;
  border: 1px solid block;
  border: 1px solid silver;
}

.el-calendar {
  width: 400px !important;
  height: 400px !important;
}

.el-calendar-table .el-calendar-day {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 8px;
  height: 35px !important;
}

.prev .el-calendar-day {
  height: 35px !important;
}

li {
  list-style: none;
  display: inline-block;
  float: left;
  width: 32%;
  height: 30px;
  padding: 0;
  margin: 0 0 0 -1px;
}
li span{
    display: inline-block;
  float: left;
  width: 49%;
  height: 30px;
  line-height: 30px;
}
li :nth-child(1) {
   width: 30%;
   text-align: center;
   background-color: #F5F5F5;
    /* border:1px solid #F5F5F5; */
}
li :nth-child(2) {
   width: 69%;
   text-align: center;
   border:1px solid #F5F5F5;
}
.el-dialog__body{
  padding: 0px 20px;
}
/* .el-form-item__label {
background-color: silver;
} */

/* li[data-v-83bc0558]{
  width: 100px !important;
  text-align: center;
} */
.flex_div {
  width: 100%;
}
.flex_div img {
  width: 80%;
  margin: 0 10%;
}
</style>
