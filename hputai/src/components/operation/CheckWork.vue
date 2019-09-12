<template>
  <div class="so_main">
    <div class="head_word">考勤与课时统计</div>

    <div class="so_main_left">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-input class="so_input" v-model="form.search" placeholder="请输入用户名"></el-input>
        <el-button type="primary"  @click="getadata" style="margin-left:5px;background-color:#e6563a; border:none;">搜索</el-button>

        <el-date-picker
          style="margin-left:60px"
          v-model="form.start_time"
          @change="getadata"
          type="datetime"
          clearable
          value-format="yyyy-MM-dd H:mm:ss"
          placeholder="选择日期时间"
        ></el-date-picker>至
        <el-date-picker
          @change="getadata"
          v-model="form.end_time"
          type="datetime"
          clearable
          value-format="yyyy-MM-dd H:mm:ss"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-form>
    </div>


    <!-- 表格数据 -->
    <el-table
      :header-cell-style="{background:'#f4f4f4'}"
      ref="multipleTable"
      border
      :data="tableData"
      style="width: 100%"
    >

      <el-table-column align="subject_name" label="授课项目" prop="course_program">
      </el-table-column>
      <el-table-column align="center" label="授课科目" >
        <template slot-scope="scope">
            <span  >{{ scope.row.subject_name}}</span>
          <!-- <span v-show="scope.row.type==2" style="color:green">-{{ scope.row.given_amount }}</span>
          <span v-show="scope.row.type==1" style="color:red">+{{ scope.row.given_amount }}</span> -->
        </template>
      </el-table-column>
      <el-table-column align="center" label="授课教师" >
        <template slot-scope="scope">
          <span>{{ scope.row.teacher_name }}</span>
        </template>
      </el-table-column>
<el-table-column align="center" label="授课类型" prop="course_txt"></el-table-column>
<el-table-column align="center" label="授课地点" prop="course_address"></el-table-column>
<el-table-column align="center" label="开始时间" prop="start_time"></el-table-column>
<el-table-column align="center" label="结束时间" prop="end_time"></el-table-column>
<el-table-column align="center" label="已排课时" prop="classhour"></el-table-column>
<el-table-column align="center" label="实上课时" prop="true_classhour"></el-table-column>
<el-table-column align="center" label="状态" prop="attendance_status">
       <template slot-scope="scope">
          <span v-show="scope.row.attendance_status==2" style="color:blue">已考勤-异常</span>
          <span v-show="scope.row.attendance_status==1" style="color:green">已考勤-正常</span>
         <span v-show="scope.row.attendance_status==0" style="color:red">未考勤</span>
        </template>
</el-table-column>
<el-table-column align="center" label="操作" >
     <template slot-scope="scope">
          <div v-show="scope.row.attendance_status==2" style="color:blue"><span style="cursor:pointer;" @click="seeMore(scope.row)">查看详情</span><span  @click="payMoney(scope.row)" style="cursor:pointer;display:inline-block;border:1px solid blue;width:45px;border-radius:5px;margin:0 3px;color:blue;">{{opration[2].menu_name}}</span></div>
          <div v-show="scope.row.attendance_status==1" style="color:green"><span style="cursor:pointer;" @click="seeMore(scope.row)">查看详情</span></div>
         <div v-show="scope.row.attendance_status==0" style="color:red"><span  @click="normal(scope.row)" style="cursor:pointer;display:inline-block;border:1px solid green;width:45px;border-radius:5px;margin:0 3px;color:green;">{{opration[0].menu_name}}</span><span  @click="unnormal(scope.row)" style="cursor:pointer;display:inline-block;border:1px solid orange;width:45px;border-radius:5px;margin:0 3px;">{{opration[1].menu_name}}</span></div>
      </template>
</el-table-column>

    </el-table>
    <!-- <p style="margin-top:30px"><span>累计金额：</span><span style="color:red">{{msg.data.givenamount}}</span></p> -->
    <!-- <el-button type="primary" @click="ifinputselect" style="margin-top:20px">审核</el-button> -->
<!-- 正常的弹出页面 -->
<el-dialog
  title="正常页面"
  :visible.sync="centerDialogVisible_normal"
  width="30%"
  center>
  <el-form  label-width="80px" :model="normalData">
  <el-form-item label="已排课时">
    <el-input v-model="normalData.classhour"></el-input>
  </el-form-item>
  <el-form-item label="实上课时">
    <el-input v-model="normalData.true_classhour"></el-input>
  </el-form-item>
  <el-form-item label="老师核准">
    <el-input v-model="normalData.teacher_classhour"></el-input>
  </el-form-item>
  <el-form-item label="学生核准">
    <el-input v-model="normalData.student_classhour"></el-input>
  </el-form-item>
  <el-form-item label="备注">
    <el-input v-model="normalData.remarks"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">  
    <el-button @click="normal_post()">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible_normal = false">确 定</el-button>
  </span>
</el-dialog>
<!-- 异动的弹出页面 -->
<el-dialog
  title="异动页面"
  :visible.sync="centerDialogVisible_unnormal"
  width="40%"
  center>
  <el-form :inline="true" :model="unnormalData" class="demo-form-inline">
  <el-form-item label="已排课时">
    <el-input v-model="unnormalData.classhour"></el-input>
  </el-form-item>
   <el-form-item label="">
       <el-input v-model="unnormalData.none" disabled></el-input>
  </el-form-item>
  <el-form-item label="实上课时">
    <el-input v-model="unnormalData.true_classhour"></el-input>
  </el-form-item>
   <el-form-item label="备注">
    <el-input v-model="unnormalData.remarks1"></el-input>
  </el-form-item>
  <el-form-item label="老师核准">
    <el-input v-model="unnormalData.teacher_classhour"></el-input>
  </el-form-item>
   <el-form-item label="备注">
    <el-input v-model="unnormalData.remarks2"></el-input>
  </el-form-item>
  <el-form-item label="学生核准">
    <el-input v-model="unnormalData.student_classhour"></el-input>
  </el-form-item>
  <el-form-item label="备注">
    <el-input v-model="unnormalData.remarks3"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible_unnormal = false">取 消</el-button>
    <el-button type="primary" @click="unnormal_post()" >确 定</el-button>
  </span>
</el-dialog>
<!-- 查看详情 -->
<el-dialog
  title="考勤详情"
  :visible.sync="centerDialogVisible_normal"
  width="30%"
  center>
  <el-form  label-width="80px" :model="normalData">
  <el-form-item label="已排课时">
    <el-input v-model="normalData.classhour"></el-input>
  </el-form-item>
  <el-form-item label="实上课时">
    <el-input v-model="normalData.true_classhour"></el-input>
  </el-form-item>
  <el-form-item label="老师核准">
    <el-input v-model="normalData.teacher_classhour"></el-input>
  </el-form-item>
  <el-form-item label="学生核准">
    <el-input v-model="normalData.student_classhour"></el-input>
  </el-form-item>
  <el-form-item label="备注">
    <el-input v-model="normalData.remarks"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">  
    <el-button @click="normal_post()">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible_seeMore = false">确 定</el-button>
  </span>
</el-dialog>
<!-- 结账的弹出页面 -->
<el-dialog
  title="结账页面"
  :visible.sync="centerDialogVisible_paymoney"
  width="30%"
  center>
  <span>需要注意的是内容是默认不居中的</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible_paymoney = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible_paymoney = false">确 定</el-button>
  </span>
</el-dialog>
    <el-pagination
      style="float:right;margin-bottom:30px"
      background
      layout="prev, pager, next"
      @prev-click="prev"
      @next-click="next"
      @current-change="current"
      :page-size="10"
      :total="msg.data.count"
    ></el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      ifname: "",
      tableData: "",
      form: {
        search: "", //搜索学员姓名条件
        page: 1, //页码
        attendance_status: "" //考勤状态
      },
         unnormalData: { //异常数据
          attendance_type:2,
          course_id:'',
          classhour:'',
          true_classhour:'',
          remarks1:'',
          teacher_classhour:'',
          remarks2:'',
          student_classhour:'',
          remarks3:''
        },
      normalData:{
        attendance_type:1,
        classhour:'',
        course_id:'',
        true_classhour:'',
        teacher_classhour:'',
        student_classhour:'',
        remarks:''
      }, //正常数据
      seeMoreData:{},
      msg: {},
      centerDialogVisible_normal: false,  //正常
      centerDialogVisible_unnormal: false,  //异动
      centerDialogVisible_paymoney: false,  //结账
      centerDialogVisible_seeMore:false,
      opration:"",//操作选项
    };
  },
       computed:mapState([ "rolemenu"]),
  created() {
    this.$apis.students.getuilcode();
    this.getadata();
    this.opration=this.rolemenu[1].children[4].children
    console.log(this.opration)
  },
  methods: {
    normal(a){
      this.normalData.true_classhour=a.true_classhour
      this.normalData.classhour=a.classhour
      this.centerDialogVisible_normal = true
      this.normalData.course_id=a.course_id
     
    },
    normal_post(){
 this.$apis.common.attendance_add(this.normalData).then(res=>{
        if(res.data.code==1){
             this.centerDialogVisible_normal = false
        }
      })
    },
    unnormal(a){
      this.unnormalData.course_id=a.course_id
      this.centerDialogVisible_unnormal = true
    },
    unnormal_post(){
       this.$apis.common.attendance_add(this.unnormalData).then(res=>{
        if(res.data.code==1){
             this.centerDialogVisible_unnormal = false
        }
      })
    },
    // 查看详情
    seeMore(){  

    },
    payMoney(){},
    //序号排列
    indexMethod(index) {
      if (this.form.page == 1) {
        return index + 1;
      } else {
        let page = (this.form.page - 1) * 10 + 1;
        return index + page;
      }
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
 
    getadata() {
      this.$apis.students.attendance_list(this.form).then(res => {
        if (res.data.code == 1) {
          this.msg = res.data;
          this.tableData = res.data.data.list;
        }
      });
    }
  }
};
</script>
<style scoped>
.so_input {
  width: 300px;
  margin-bottom: 20px;
}
.so_main_left {
  float: left;
  margin-top: 20px;
}
.so_main_right {
  float: right;
}
.head_word {
  font-size: 26px;
  font-weight: 700;
}
</style>
