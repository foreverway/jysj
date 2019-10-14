<template>
  <div class="so_main">
    <div class="head_word">授课数据</div>
     <div class="so_main_left"> 
       <el-input
        class="so_input"
        v-model="params.search"
        @input="getadata"
        clearable
        placeholder="搜索教师名称，授课科目"
      ></el-input>
    </div>
    <el-select clearable filterable v-model="params.teacher_id"  @change="getadata" placeholder="选择讲师">
      <el-option v-for="item in teacher_data" :key="item.id" :label="item.teacher_name" :value="item.id"></el-option>
    </el-select> 
          <el-cascader
        placeholder="选择科目"
        v-model="params.subject_id"
        clearable
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        :show-all-levels="false"
        @change="handleChange_1"
      ></el-cascader>
    <!-- <el-select clearable v-model="params.subject_id" @input="getadata" placeholder="选择科目">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>  -->
    <span></span>
            <el-date-picker
          style="margin-left:60px"
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
    <el-button type="primary" @click="getadata">搜索</el-button>
    <!-- 表格数据 -->
    <el-table :data="tableData" border :header-cell-style="{background:'#f4f4f4'}">
      <el-table-column label="序号" type="index" width="80" align="center" :index="indexMethod"></el-table-column>

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

      <el-table-column align="center" width="200" label="时间">
        <template slot-scope="scope">
          <p>{{scope.row.start_time}}</p>
        </template>
      </el-table-column>
      <el-table-column label="授课类型" prop="course_type"></el-table-column>
       <el-table-column label="已上/待上" prop="course_status"></el-table-column>
      <el-table-column align="center" label="操作" width="280px" fixed="right">
        <template slot-scope="scope">
              <el-button size='mini' type="primary" @click="openVideo(scope.row.playback_url)">录播</el-button>
              <el-button size='mini' type="primary" @click="checkWork(scope.row)">考勤数据</el-button>
              <el-button size='mini' type="primary" @click="feedback(scope.row)">查看反馈</el-button>
          <!-- <el-button size="mini" type="success" @click="toAssess(scope.row.teacher_id)">进行评价</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 看录播 -->
    <!-- 查看数据 -->
    <el-dialog
  title="考勤信息"
  :visible.sync="checkopen"
  width="50%"
  >
  <el-form :label-position="labelPosition" label-width="80px" :model="check_data">
  <el-form-item label="课时">
    <p>{{check_data.classhour}}</p>
  </el-form-item>
 <el-form-item label="反馈一">
        <p>{{check_data.remarks}}</p>
  </el-form-item>
  <el-form-item label="反馈二">
        <p>{{check_data.remarks1}}</p>
  </el-form-item>
  <el-form-item label="反馈三">
        <p>{{check_data.remarks2}}</p>
  </el-form-item>
  <el-form-item label="反馈四">
        <p>{{check_data.remarks3}}</p>
  </el-form-item>
  <el-form-item label="学生课时">
        <p>{{check_data.student_classhour}}</p>
  </el-form-item>
  <el-form-item label="老师课时">
        <p>{{check_data.teacher_classhour}}</p>
  </el-form-item>
  <el-form-item label="实上课时">
        <p>{{check_data.true_classhour}}</p>
  </el-form-item>

</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="checkopen = false">取 消</el-button>
    <el-button type="primary" @click="checkopen = false">确 定</el-button>
  </span>
</el-dialog>
    <!-- 查看反馈 -->
    <el-dialog
  title="反馈信息"
  :visible.sync="feedopen"
  width="50%"
  >
  <el-form :label-position="labelPosition" label-width="80px" :model="feed_data">
  <el-form-item label="班主任">
    <p>{{feed_data.banzhuren_name}}</p>
  </el-form-item>
 <el-form-item label="课时">
        <p>{{feed_data.classhour}}</p>
  </el-form-item>
   <el-form-item label="课程地址">
        <p>{{feed_data.course_address}}</p>
  </el-form-item>
   <el-form-item label="细节一">
        <p>{{feed_data.details_1}}</p>
  </el-form-item>
  <el-form-item label="细节二">
        <p>{{feed_data.details_2}}</p>
  </el-form-item>
 <el-form-item label="细节三">
        <p>{{feed_data.details_3}}</p>
  </el-form-item>
   <el-form-item label="细节四">
        <p>{{feed_data.details_4}}</p>
  </el-form-item>
   <el-form-item label="细节五">
        <p>{{feed_data.details_5}}</p>
  </el-form-item>
  <el-form-item label="细节六">
        <p>{{feed_data.details_6}}</p>
  </el-form-item>
 <el-form-item label="细节七">
        <p>{{feed_data.details_7}}</p>
  </el-form-item>
   <el-form-item label="细节八">
        <p>{{feed_data.details_8}}</p>
  </el-form-item>
   <el-form-item label="细节九">
        <p>{{feed_data.details_9}}</p>
  </el-form-item>
  <el-form-item label="结束时间">
        <p>{{feed_data.end_time}}</p>
  </el-form-item>
 <el-form-item label="反馈类型">
        <p>{{feed_data.feedback_type}}</p>
  </el-form-item>
   <el-form-item label="开始时间">
        <p>{{feed_data.start_time}}</p>
  </el-form-item>
   <el-form-item label="学生姓名">
        <p>{{feed_data.student_name}}</p>
  </el-form-item>
  <el-form-item label="学科姓名">
        <p>{{feed_data.subject_name}}</p>
  </el-form-item>
 <el-form-item label="老师姓名">
        <p>{{feed_data.teacher_name}}</p>
  </el-form-item>

</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="feedopen = false">取 消</el-button>
    <el-button type="primary" @click="feedopen = false">确 定</el-button>
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
import {mapState} from 'vuex'
export default {
  data() {
    return {
      msg: "",
      tableData: [],
      labelPosition:'right',
      //teacher_data:[],  //老师列表数据
      check_data:{},//考勤数据
      feed_data:{}, //反馈数据
      params: {
        teacher_id: "",
        subject_id: "",
        search: "",
        start_time: "",
        end_time: "",
        page: "1"
      },
      checkopen:false, //考勤的弹出
      feedopen:false  , //反馈的弹出
      options_:[],
      options:[],

    };
  },
  created() {
    this.$apis.students.getuilcode();
    this.getadata();
   // mapState['teacher_data']
  },
  computed:{
    ...mapState(['teacher_data'])
  },
  methods: {
    //序号排列
    indexMethod(index) {
      if (this.params.page == 1) {
        return index + 1;
      } else {
        let page = (this.params.page - 1) * 10 + 1;
        return index + page;
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
    checkWork(result){  //考勤数据
     
        if(result.course_id!==null){
             this.checkopen=true
      this.$apis.common.attendance_details({course_id:result.course_id}).then(res=>{
        if(res.data.code==1){
              this.check_data=res.data.data
              console.log(this.teacher_data)
        }
      }) 
        }else{
          this.$message({
            type:"warning",
            message:"参数丢失，请咨询研发部"
          })
        }
 
    },
    feedback(result){  //反馈数据
            if(result.course_id!==null){
      this.$apis.common.course_feedback({course_id:result.course_id}).then(res=>{
        if(res.data.code==1){
            this.feed_data=res.data.data
        }
      })
      this.feedopen=true}else{
                  this.$message({
            type:"warning",
            message:"参数丢失，请咨询研发部"
          })
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
    toAssess(a) {
      console.log(a);
    },
    handleChange_1(targetName) {
      //选择科目
      var lastName = targetName.length == 1 ? targetName[0] : targetName[1];
 if(lastName!==undefined){
this.params.subject_id= lastName.toString()
 }
        
 
      this.$apis.teacher.teaching_data(this.params).then(res => {
        this.msg = res.data;
        this.tableData = res.data.data.list;
      })
    },
    getadata() {

      this.$apis.teacher.teaching_data(this.params).then(res => {
        this.msg = res.data;
        this.tableData = res.data.data.list;
      })
      //获取科目的数据
     this.$apis.common.subject_list().then(res => {
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
}
}
</script>
<style scoped>
.so_input {
  width: 300px;
}
.so_main_left {
  float: left;
  margin: 20px;
}
.el-select {
  margin: 20px 15px;
}
.so_main_right {
  float: right;
}
.yulan_height {
  height: 50vh;
}
.head_word {
  font-size: 26px;
  font-weight: 700;
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
</style>
