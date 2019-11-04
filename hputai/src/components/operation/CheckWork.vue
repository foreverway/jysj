<template>
  <div class="so_main">
        <zx-head title="考勤与课时统计" ></zx-head>

    <div class="so_main_left">
      <el-form :inline="true" :model="form"  class="demo-form-inline">
        <el-input class="so_input" clearable v-model="form.search" @change="getadata" placeholder="搜索授课老师"></el-input>
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
<el-table-column align="center" label="学生姓名" prop="student_name"></el-table-column>
<el-table-column align="center" label="授课类型" prop="course_txt"></el-table-column>
<el-table-column align="center" label="授课地点" prop="course_address"></el-table-column>
<el-table-column align="center" label="开始时间" prop="start_time"></el-table-column>
<el-table-column align="center" label="结束时间" prop="end_time"></el-table-column>
<el-table-column align="center" label="已排课时" prop="classhour"></el-table-column>
<el-table-column align="center" label="实上课时" prop="true_classhour"></el-table-column>
<el-table-column align="center" label="状态" prop="attendance_status">
      <template slot-scope="scope">
          <span v-show="scope.row.attendance_status==2" style="color:red">已考勤-异常</span>
          <span v-show="scope.row.attendance_status==1" style="color:green">已考勤-正常</span>
         <span v-show="scope.row.attendance_status==0" style="">待考勤</span>
      </template>
</el-table-column>
<el-table-column align="center" label="操作" width="200px" fixed="right">
     <template slot-scope="scope">
          <div v-show="scope.row.attendance_status==2&&scope.row.is_forward!==1" style="color:#169BD5"><span style="cursor:pointer;" @click="seeMore(scope)">查看考勤详情</span><el-button type="danger" size="mini"  @click="payMoney(scope.row)" >结转</el-button></div>
          <div v-show="scope.row.attendance_status==1" style="color:#169BD5"><span style="cursor:pointer;" @click="seeMore(scope)">查看考勤详情</span></div>
         <div v-show="scope.row.attendance_status==0" ><el-button size="mini" @click="normal(scope.row)" type="success">正常</el-button><el-button size="mini" @click="unnormal(scope.row)" type="danger">异动</el-button></div>
         <div v-show="scope.row.is_forward==1" style="color:#169BD5"><span style="cursor:pointer;" @click="seeMore(scope)">查看考勤详情</span><el-button  @click="payMoney(scope.row)" type="info" disabled size="mini">结转</el-button></div>

      </template>
</el-table-column>

    </el-table>
    <!-- <p style="margin-top:30px"><span>累计金额：</span><span style="color:red">{{msg.data.givenamount}}</span></p> -->
    <!-- <el-button type="primary" @click="ifinputselect" style="margin-top:20px">审核</el-button> -->
<!-- 正常的弹出页面 -->
<el-dialog
  title="正常页面"
  :close-on-click-modal='false'
  :visible.sync="centerDialogVisible_normal"
  width="50%"
  center>
  <el-form   :inline="true" label-width="150px" :model="normalData">
  <el-form-item label="已排课时">
    <!-- <el-input v-model="normalData.classhour"></el-input> -->
    <p style="width:100px;">{{this.normalData.classhour}}</p>
  </el-form-item>
  <el-form-item label="实上课时">
    <!-- <el-input v-model="normalData.true_classhour"></el-input> -->
        <p style="width:100px;">{{this.normalData.classhour}}</p>
  </el-form-item>
  <el-form-item label="老师核准">
    <!-- <el-input v-model="normalData.teacher_classhour"></el-input> -->
            <p style="width:100px;">{{this.normalData.classhour}}</p>
  </el-form-item>
  <el-form-item label="学生核准">
    <!-- <el-input v-model="normalData.student_classhour"></el-input> -->
    <p style="width:100px;">{{this.normalData.classhour}}</p>
  </el-form-item>
  <el-form-item label="备注">
    <el-input v-model="normalData.remarks"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">  
    <el-button @click="centerDialogVisible_normal = false">取 消</el-button>
    <el-button type="primary" @click="normal_post">确 定</el-button>
  </span>
</el-dialog>
<!-- 异动的弹出页面 -->
<el-dialog
:close-on-click-modal='false'
  title="异动页面"
  :visible.sync="centerDialogVisible_unnormal"
 width="800px"
  center>

  <div style="height:40px;width:100%;padding:10px 15px;"><span style="display:inline-block;width:80px;">已排课时</span>{{this.unnormalData.classhour}}</div>
  <el-form :inline="true"  :model="unnormalData" class="demo-form-inline">

  <el-form-item label="实上课时" label-width="80px">
    <el-input v-model="unnormalData.true_classhour"></el-input>
  </el-form-item>
   <el-form-item label="备注" label-width="80px">
    <el-input v-model="unnormalData.remarks1"></el-input>
  </el-form-item>
  <el-form-item label="老师核准" label-width="80px">
    <el-input v-model="unnormalData.teacher_classhour"></el-input>
  </el-form-item>
   <el-form-item label="备注" label-width="80px">
    <el-input v-model="unnormalData.remarks2"></el-input>
  </el-form-item>
  <el-form-item label="学生核准" label-width="80px">
    <el-input v-model="unnormalData.student_classhour"></el-input>
  </el-form-item>
  <el-form-item label="备注" label-width="80px">
    <el-input v-model="unnormalData.remarks3"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible_unnormal = false">取 消</el-button>
    <el-button type="primary" @click="unnormal_post()" >确 定</el-button>
  </span>
</el-dialog>

<!-- 查看详情的弹出页面 -->
<el-dialog
:close-on-click-modal='false'
  title="查看详情"
  :visible.sync="centerDialogVisible_seeMore"
  width="50%"
>
  <el-form :inline="true" :label-position="labelPosition"  class="demo-form-inline" label-width="150px" :model="seeMoreData">
  <el-form-item label="已排课时" v-show="seeMoreData.attendance_type==1">
    <p style="width:100px;">{{seeMoreData.classhour}}</p>
  </el-form-item>
      <el-form-item label="已排课时"  v-show="seeMoreData.attendance_type==2">
    <p style="width:100px" >{{seeMoreData.classhour}}</p>
  </el-form-item>
   <el-form-item label=" " v-show="seeMoreData.attendance_type==2">
    <p style="width:100px"></p>
  </el-form-item>
  <el-form-item label="实上课时">
    <p style="width:100px">{{seeMoreData.true_classhour}}</p>
  </el-form-item>

  <el-form-item label="异动实上课时备注" v-show="seeMoreData.attendance_type==2">
    <p style="width:100px" >{{seeMoreData.remarks1}}</p>
  </el-form-item>
  <el-form-item label="老师核准" >
    <p style="width:100px">{{seeMoreData.teacher_classhour	}}</p>
  </el-form-item>
   <el-form-item label="异动老师核准备注" v-show="seeMoreData.attendance_type==2">
     <p style="width:100px" >{{seeMoreData.remarks2}}</p>
  </el-form-item>
   <el-form-item label="学生核准" >
     <p style="width:100px">{{seeMoreData.student_classhour	}}</p>
  </el-form-item>
     <el-form-item label="备注" v-show="seeMoreData.attendance_type==1">
     <p style="width:100px" v-show='seeMoreData.remarks'>{{seeMoreData.remarks	}}</p>
     <p style="width:100px" v-show='seeMoreData.remarks==""'>没有备注</p>
  </el-form-item>
   <el-form-item label="异动学生核准的备注"  v-show="seeMoreData.attendance_type==2">
     <p style="width:100px">{{seeMoreData.remarks3}}</p>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible_seeMore = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible_seeMore = false">确 定</el-button>
  </span>
</el-dialog>
<span v-if="msg.data">
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
</span>

  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      ifname: "",
      tableData: [],
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
          true_classhour:'',
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
      centerDialogVisible_seeMore:false,
      opration:"",//操作选项
      labelPosition: 'left',
    };
  },
       computed:mapState([ "rolemenu"]),
  created() {
    this.$apis.students.getuilcode();
    this.getadata();
    this.opration=this.rolemenu[1].children[4].children
  },
  methods: {
    normal(a){
      this.normalData.true_classhour=a.true_classhour
      this.normalData.classhour=a.classhour
      this.normalData.true_classhour=a.true_classhour
      this.normalData.teacher_classhour=a.teacher_classhour
      this.normalData.student_classhour=a.student_classhour
      this.centerDialogVisible_normal = true
      this.normalData.course_id=a.course_id
     
    },
    normal_post(){
 this.$apis.common.attendance_add(this.normalData).then(res=>{
        if(res.data.code==1){
               this.$message({
          message:'成功',
          type:"success"
        })
        this.getadata();
             this.centerDialogVisible_normal = false
        }
      })
    },
    unnormal(a){
      this.unnormalData.course_id=a.course_id
      this.unnormalData.classhour=a.classhour
      this.centerDialogVisible_unnormal = true
    },
    unnormal_post(){
      if( parseFloat(this.unnormalData.classhour)>=this.unnormalData.true_classhour*1&&parseFloat(this.unnormalData.classhour)==this.unnormalData.true_classhour*1 &&parseFloat(this.unnormalData.classhour)==this.unnormalData.student_classhour*1){
        this.$message({
          message:'请填写关于异动的情况',
          type:"warning"
        })
      }else{
              this.$message({
          message:'登记成功',
          type:"success"
        })
       this.$apis.common.attendance_add(this.unnormalData).then(res=>{
        if(res.data.code==1){
          this.getadata();
             this.centerDialogVisible_unnormal = false
        }
      })
      }
    },
    // 查看详情
    seeMore(result){  
      //console.log(result)
      this.centerDialogVisible_seeMore = true
      let params={
        course_id:result.row.course_id
      }
      this.$apis.common.attendance_details(params).then(res=>{
        if(res.data.code){
          this.seeMoreData=res.data.data
          this.seeMoreData.attendance_type=result.row.attendance_status
        }
      })
    },

    payMoney(data){
       let params={
        course_id:data.course_id
      }
        this.$confirm('此操作将确定结转, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                this.$apis.common.carryforward(params).then(res=>{
        if(res.data.code==1){
           this.$message({
            type: 'success',
            message: '结转成功!'
          });
          this.getadata()
        }
      })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消结转'
          });          
        });


    }
    ,
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
p{
  text-align: center;
}
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

</style>
