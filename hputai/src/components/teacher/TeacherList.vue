<template>
  <div class="so_main">
    <h3>教师列表</h3>
    <div class="so_main_left">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-input class="so_input" v-model="form.search" @input="getadata" placeholder="请输入用户名"></el-input>
        <el-button
          type="primary"
          @click="getadata"
          style="margin-left:5px;background-color:#e6563a; border:none;"
        >搜索</el-button>

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
      <el-table-column label="序号" type="index" width="80" align="center" :index="indexMethod"></el-table-column>
      <el-table-column align="center" width="120" prop="teacher_name" label="教师姓名">
      </el-table-column>
      <el-table-column align="center" width="150" prop="tel" label="联系电话">
      </el-table-column>
      <el-table-column align="center" width="100" prop="part_time" label="类型">
      </el-table-column>
      <el-table-column align="center" width="200" prop="teach_subjects" label="科目">
      </el-table-column>
      <el-table-column align="center" width="150" prop="studying" label="在读学员">
      </el-table-column>
       <el-table-column align="center" width="100" prop="haved_hour" label="已上课时">
      </el-table-column>
      <el-table-column align="center" width="100" prop="waiting_hour" label="待上课时">
      </el-table-column>
          <el-table-column align="center" label="操作">
           <template slot-scope="scope">
          <span v-for="(item,index) in rolemenu[2].children[0].children" :key="index"
          style="display:inline-block;border:1px orange solid;margin:0 8px;border-radius:5px;padding:0 5px;"
          >
             <el-button
              type="text"
              size="medium"
              index="item.id"
              @click="teacherAction(item.menu_action,scope.row)"
            >{{item.menu_name}}</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- <p style="margin-top:30px"><span>累计金额：</span><span style="color:red">{{msg.data.givenamount}}</span></p> -->
    <!-- <el-button type="primary" @click="ifinputselect" style="margin-top:20px">审核</el-button> -->
    <el-dialog
    title="教师课酬设置"
    :visible.sync="centerDialogVisible_salary"
    width="50%"
>
   <el-form  label-width="100px" :model="teacher_salary_data">
  <el-form-item label="讲师姓名">
    <p>{{teacher_name}}</p>
  </el-form-item>
 
  <el-form-item label="选择科目">
    <p>{{teacher_salary.attendance_type}}</p>
  </el-form-item>
  <el-form-item label="课酬标准">
    <p>{{teacher_salary.true_classhour}}</p>
  </el-form-item>
</el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible_salary = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible_salary = false">确 定</el-button>
    </span>
    </el-dialog>
    <el-pagination
      style="float:right;margin-top:20px;margin-bottom: 20px;"
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
import {mapState} from 'vuex'
export default {
  data() {
    return {
      tableData: "",
      form: {
        search: "", //搜索老师条件
        page: 1, //页码
        teacher_id: "", //教师id
      },

      msg: {},
      centerDialogVisible_salary: false ,//入扣款弹窗,
      teacher_salary:{},
      teacher_name:'',
      teacher_salary_data:{
      }, //教师课酬
    };
  },
  created() {
    this.$apis.students.getuilcode();
    this.getadata();
  },
 computed:mapState([ "rolemenu"]),
  methods: {
    //序号排列
    teacherAction(a,b){
        switch (a) {
            case 'teacher_edit' :
                console.log(b)
            break
            case 'teacher_info' :
                console.log(b)
            break
            case 'teacher_salary' :
                let params={
                teacher_id:b.teacher_id
                }
                this.centerDialogVisible_salary=true
                this.$apis.common.teacher_dollars_get(params).then(res=>{
                    if(res.data.code==1){
                       this.teacher_name= b.teacher_name
                   this.teacher_salary=res.data.data
                    }
                })
            break
            case 'teacher_delete' :
                console.log(b)
            break
        }
    },
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
    postfun() {
      this.$apis.students.wallet_balance(this.form1).then(res => {
        if (res.data.code == 1) {
          let fuhao = this.form1.type == 1 ? "+" : "-";
          this.$message({
            message:
              this.form1.uname + "操作成功" + fuhao + this.form1.amount + "元",
            type: "success"
          });
          this.getadata();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getadata() {
      this.$apis.common.teacher_list_only(this.form).then(res => {
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
  margin-top: 15px;
}
</style>
