<template>
  <div class="main">
    <div class="main_head">|&nbsp;报名需求列表</div>
    <el-input
      placeholder="随便搜点什么,自动匹配结果"
      v-model="parms.search"
      @input="getdata"
      clearable
      style="width:300px"
    ></el-input>

    <el-cascader
      placeholder="输入顾问姓名"
      v-model="value"
      :options="options"
      clearable
      filterable
      @change="showAdviser"
    ></el-cascader>

    <el-button type="primary" style="background-color:#e6563a; border:none;" @click="getdata">查看所有需求表</el-button>
    <router-link to="/ApplicationAdd">
      <el-button type="primary"  style="float:right;background-color:#e6563a; border:none;">新建报名需求</el-button>
    </router-link>
    <el-table
      border
      align="center"
      :cell-class-name="tableRowClassName"
      :data="tableData"
      :header-cell-style="{background:'#f4f4f4'}"
      style="width: 100%;margin:20px auto"
    >
      <el-table-column
      type="index"
      label="序号"
      width="50">
    </el-table-column>
      <!-- <el-table-column label="序号" prop="index" width="50"></el-table-column> -->
      <el-table-column prop="number" label="编号"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="amount" label="价格"></el-table-column>
      <el-table-column prop="expiry_date" label="课程有效期"></el-table-column>
      <el-table-column prop="student_name" label="报名学员" width="100"></el-table-column>
      <el-table-column prop="admin_name" label="添加者" width="100"></el-table-column>
      <el-table-column prop="addtime" label="添加时间"></el-table-column>
      <el-table-column prop="app_status" class="status_color" label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.app_status== '待审核'" style="color:rgb(245, 108, 108)">待审核</span>
          <span v-else-if="scope.row.app_status== '待排课'" style="color:rgb(230, 162, 60)">待排课</span>
          <span v-if="scope.row.app_status== '已排课待确认'" style="color:#009688">已排课待确认</span>
          <span v-else-if="scope.row.app_status== '已确认'" style="color:#303133">已确认</span>
          <span v-if="scope.row.app_status== '授课考勤中'" style="color:#409EFF">授课考勤中</span>
          <span v-else-if="scope.row.app_status== '已结课'" style="color:#67C23A">已结课</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" prop label="操作" width="300">
        <template slot-scope="scope">
          <span v-for="(item,index) in getRolenenu()" :key="index">
            <!-- <router-link :to="'/SalelistEdit/'+ scope.row.id"> -->
            <el-button
              type="text"
              size="medium"
              index="item.id"
              @click="mommonAction(item.menu_action,scope.row)"
            >{{item.menu_name}}</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- 审核意见 -->
    <el-dialog title="审核意见" :visible.sync="centerDialogVisible_shenghe" width="30%" center>
      <el-form ref="form" >
        <el-form-item label="审核意见" v-model="is_pass">
          <el-radio v-model="is_pass" label=1>同意</el-radio>
          <el-radio v-model="is_pass" label=2>不同意</el-radio>
        </el-form-item>
        <el-form-item :inline="true" label="班主任 ">
          <!-- <p>{{this.banzhuren_list_new}}</p> -->
          <!-- this.tip_banzhuren -->
          <el-cascader
            v-model="banzhuren_live"
            :options="this.banzhuren_list_new"
            :props="{ expandTrigger: 'hover' }"
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item>
        <el-form-item :inline="true" label=" 助教 ">
          <el-cascader
            v-model="helpTeacher_live"
            :options="this.helpTeacher_list_new"
            :props="{ expandTrigger: 'hover' }"
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item>
        <el-form-item :inline="true" label="教务专员">
          <!-- <span class="demonstration">hover 触发子菜单</span> -->
          <!-- 用el-autocomplete -->
          <el-cascader
            v-model="moneymen_live"
            :options="this.moneymen_list_new"
            :props="{ expandTrigger: 'hover' }"
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item>
        <el-form-item :inline="true" label=" 意见 ">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible_shenghe = false">取 消</el-button>
        <el-button type="primary" @click="submit_think">提交意见</el-button>
      </span>
    </el-dialog>

    <!-- 分页的设置 -->
    <span  v-if="msg.data">
      <el-pagination
      style=" float: right;margin-bottom: 30px;"
      background
      layout="prev, pager, next"
      @prev-click="prev"
      @next-click="next"
      @current-change="current"
      :page-size="10"
      :total='msg.data.count'
      ></el-pagination>
    </span>
<el-dialog title="查看排课" :visible.sync="dialogTableVisible_table">
    <el-form ref="form"  label-width="80px">
      <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;"  label="标题:">
        <p>{{gridData.title}}</p>
      </el-form-item>
       <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="讲师:">
        <p>{{gridData.teacher_name?gridData.teacher_name:"未安排"}}</p>
      </el-form-item>
       <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;"  label="直播平台:">
        <p>{{gridData.live_name?gridData.live_name:"未安排"}}</p>
      </el-form-item>
       <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="班主任:">
        <p>{{gridData.banzhuren_name?gridData.banzhuren_name:"未安排"}}</p>
      </el-form-item>
       <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="助教老师:">
        <p>{{gridData.zhujiao_name?gridData.zhujiao_name:"未安排"}}</p>
      </el-form-item>
       <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="教务专员:">
        <p>无数据</p>
      </el-form-item>
       <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="课时:">
        <p>{{gridData.classhour}}</p>
      </el-form-item>
       <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="线上/线下:">
        <p>{{gridData.course_address}}</p>
      </el-form-item>
       <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="上课地址:">
        <p>无数据</p>
      </el-form-item>
       <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="学生:">
       <el-table :data="gridData.students" style="border:1px solid silver;margin: 0; border-bottom:none;" >
         <el-table-column property="student_name" label="学生姓名"></el-table-column>

       </el-table>
      </el-form-item>
      <el-form-item style="border:1px solid silver;border:1px solid silver;margin: 0; border-bottom:none;" label="排课">
          <el-table :data="gridData_class" style="border:1px solid silver;margin: 0; border-bottom:none;">
          <el-table-column property="classhour" label="课时" width="150"></el-table-column>
          <el-table-column property="start_time" label="开始时间" width="200"></el-table-column>
          <el-table-column property="week" label="星期"></el-table-column>
           <el-table-column property="live_type" label="直播类型"></el-table-column>
               <el-table-column property="play_type" label="观看端"></el-table-column>
        </el-table>
      </el-form-item>
    </el-form>

</el-dialog>
  </div>
</template>

  <script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
     app_id:"",//维持一个点击表的id
      tip_banzhuren: [], //弹出层班主任
      money: "", //设置充值金额
      dialogFormVisible1: false,
      centerDialogVisible_shenghe: false,
      textarea: "", //审核的输入框
      msg: "",
      is_pass: "", //审核意见
      banzhuren_list_new: [], //班主任数据
      banzhuren_live: "",
      moneymen_list_new: [
      ], //教务专员
      moneymen_live: "",
      helpTeacher_list_new: [
      ], //助教数据
      helpTeacher_live: "",
      parms: {
        search: "",
        page: 1,
        admin_id:'' //选择的
      },
      tableData: [],
      options: [],
      options_all: [], //顾问的所有数据
      value: "", //选定的顾问
      adviserList: "", //选定顾问的信息
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
      dialogTableVisible_table:'',  //点击查看排课
      gridData:{
    
      },  //查看排课的数据
      gridData_class:[],//排课的数组

      dialogTableVisible_table: false,
    };
  },
  created() {
    this.getdata();
    this.getAdviser();
    this.getRolenenu();
    let params = {
      admin_id: this.getdataCookie("admin_id")
    }; //
    this.get_banzhuren_list({
      //获取班主任列表
      url: "/api/api_banzhuren_list",
      params
    });
    this.get_live_list({
      //获取直播列表
      url: "/api/api_live_list",
      params
    });
    //this.searchAdviser()
  },
  computed: mapState([
    "live_list",
    "banzhuren_list",
    "teacher_data",
    "zhujiao_data",
    "jiaowu_data",
    "rolemenu"
  ]),
  // ...mapState()
  updated() {
    mapState(["banzhuren_list"]);
    // this.getbanzhurenName();
  },
  mounted() {
    // this.getbanzhurenName();       
    // this.tip_banzhuren=JSON.stringfy(this.banzhuren_list)
  },
  watch: {},
  methods: {
    //用于分页的一些设置
        current(num) {
      //当前页数
      console.log(num)
      this.parms.page = num;
      this.getdata();
    },
    next() {
      this.parms.page++;
      this.getdata();
    },
    prev() {
      //上一页
      if (this.parms.page > 1) {
        this.parms.page--;
        this.getdata();
      }
    },
    ...mapActions([
      "get_mune_list",
      "get_banzhuren_list",
      "get_live_list",
      "get_teacher_data",
      "get_zhujiao_data",
      "get_jiaowu_data"
    ]),
    //获取直播列表发送actions this.store.dispatch
    tableRowClassName({ row, rowIndex, columnIndex, column }) {
      //改变数组的颜色
      if (columnIndex === 8) {
        if (row.app_status == "待审核") {
          return "warning-row";
        }
        return "";
      }
    },
    getbanzhurenName() {
      //筛选班主任列表
      // if(this.banzhuren_list.length>0){
      for (let i = 0; i < this.banzhuren_list.length; i++) {
        var val = this.banzhuren_list[i];
        this.banzhuren_list_new.push({ value: val.id, label: val.banzhuren });
      }
         for (let i = 0; i < this.zhujiao_data.length; i++) {
        var val = this.zhujiao_data[i];
        this.helpTeacher_list_new.push({ value: val.id, label: val.zhujiao_name });
      }
         for (let i = 0; i < this.jiaowu_data.length; i++) {
        var val = this.jiaowu_data[i];
        this.moneymen_list_new.push({ value: val.id, label: val.jiaowu_name });
      }
    },
   
    mommonAction(a, b) {
      switch (a) {
        case "click_edit":
    this.$router.push({ path: "/ApplicationEdit", query:{id: b.id }});
           this.$message({
            message:"确定成功",
            type:"success"
          })
          break;
        case "click_test": //审核
         if (b.app_status == "待审核") {
          this.centerDialogVisible_shenghe = true;
          mapState(["banzhuren_list",'zhujiao_data','jiaowu_data']);
          this.app_id=b.id
          this.getbanzhurenName();}else{
                this.$message({
            message:"请按流程操作",
            type:"warning"
          })
          }
          break;
        case "click_sure":
         this.$confirm('确认课表后无法更改课表的信息, 是否确定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                  let parms = {
            app_id:b.id
          };
          this.$apis.menber.application_operate(parms).then(res => {
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: b.student_name + " 的报名表已确定成功"
              });
              this.getdata();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消确定'
          });          
        });
          break;
        case "click_delete":
        this.$confirm('此操作将永久删除该需求, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             let parms = {
            id: b.id
          };
          this.$apis.menber.application_del(parms).then(res => {
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: b.student_name + " 的报名表已删除成功"
              });
              this.getdata();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }).catch(() => {
          this.$message({ 
            type: 'info',
            message: '已取消删除'
          });          
        });
          break;
        case "cilck_plan_class":
          // 排课
          if (b.app_status == "待排课") {
            this.$router.push({ path: "/PlanClassAdd", query: b });
          } else {
            this.$message({
              type: "warning",
              message: "不是排课的时候"
            });
          }
          break;
          case 'click_see_plan':  //查看排课
           this.dialogTableVisible_table = true
               let parms = {
            app_id: b.id
          };
           this.$apis.menber.look_arrange(parms).then(res=>{
             if(res.data.code==1){
              this.gridData=res.data.data
               this.gridData_class=res.data.data.course_data
             }
           })
          break;
      }
    },
    getRolenenu() {
      return this.rolemenu[1].children[2].children;
      //  console.log()
    },
    submit_think() {
      //提交审核意见
           let shenghe={
                 app_id: this.app_id,
                  banzhuren_id:this.banzhuren_live,
                  jiaowu_id: this.moneymen_live,
                  zhujiao_id: this.helpTeacher_live,
                  is_pass: this.is_pass,
                  remarks:this.textarea
           }
      this.$apis.common.application_audit(shenghe).then(res => {
        if (res.data.code == 1) {
          location.reload() 
          this.$message({
            message:"审核成功",
            type:"success"
          })
        }
      });
      this.centerDialogVisible_shenghe = false;
    },
    handleSizeChange(val) {    //分页每页多少条
         let parms = {
        admin_id: this.getdataCookie("admin_id"),
        page:val*1
      };
      this.$apis.common
        .application_list(parms)
        .then(res => {
          if (res.data.code == 1) {
            this.msg = res.data;
            this.tableData = res.data.data.list;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "请求失败"
          });
        });
    },
    handleCurrentChange(val) {     //当前多少页
      console.log(`当前页: ${val}`,this.tableData.length);
    },
    //获取顾问列表adviser_list
    getAdviser() {
      let parms = {
        admin_id: this.getdataCookie("admin_id")
      };
      this.$apis.common
        .adviser_list(parms)
        .then(res => {
          if (res.data.code == 1) {
            this.msg = res.data;
            this.options_all = res.data.data.list;
            for (let i = 0; i < this.options_all.length; i++) {
              var val = this.options_all[i];
              this.options.push({ value: val.adviser, label: val.adviser });
            }
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "请求失败"
          });
        });
    },
    //根据顾问老师生成列表
    showAdviser(targetName) {
      this.adviserList = this.options_all.filter(
        item => item.adviser == targetName
      );
      let parms = {
        admin_id: this.getdataCookie("admin_id"),
        add_admin_id:
          this.adviserList[0].id * 1 == "" ? "" : this.adviserList[0].id
      };
      this.$apis.common
        .application_list(parms)
        .then(res => {
          if (res.data.code == 1) {
            this.msg = res.data;
            this.tableData = res.data.data.list;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "请求失败"
          });
        });
    },
    //序号排列

    //删除用户
    salepro_del(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parms = {
            id: row.id
          };
          this.$apis.common.salepro_del(parms).then(res => {
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: row.username + " 已删除成功"
              });
              this.getdata();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
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
      this.$router.push({ path: "/login" });
    },
    getdata() {
      this.parms.admin_id=this.getdataCookie("admin_id")
      this.$apis.common
        .application_list(this.parms)
        .then(res => {
          if (res.data.code == 1) {
         
            this.msg = res.data;
               console.log(this.msg)
            this.tableData = res.data.data.list;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "请求失败"
          });
        });
    }
  }
};
</script>
<style scoped>
.el-table .warning-row {
  color: oldlace !important;
  font-weight: 999;
}

.el-table .success-row {
  color: #f0f9eb;
  font-weight: 999;
}
.el-table .success_row1 {
  color: #f0f9eb;
  font-weight: 999;
}
.main_head {
  margin: 0 2;
  /* width: 1200px; */
  width: 96%;
  height: 40px;
  font-size: 22px;
  font-weight: 900;
  /* line-height: 30px; */
}
</style>