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

    <el-button type="primary" @click="getdata">查看所有需求表</el-button>
    <router-link to="/ApplicationAdd">
      <el-button type="primary" style="float:right">新建报名需求</el-button>
    </router-link>
    <el-table
      border
      align="center"
      :cell-class-name="tableRowClassName"
      :data="tableData"
      :header-cell-style="{background:'#f4f4f4'}"
      style="width: 100%;margin:20px auto"
    >
      <el-table-column label="id" prop="id" width="50"></el-table-column>
      <el-table-column prop="number" label="编号"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="amount" label="价格"></el-table-column>
      <el-table-column prop="expiry_date" label="课程有效期"></el-table-column>
      <el-table-column prop="student_name" label="报名学员"></el-table-column>
      <el-table-column prop="admin_name" label="添加者" width="100"></el-table-column>
      <el-table-column prop="addtime" label="添加时间"></el-table-column>
      <el-table-column prop="app_status" class="status_color" label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.app_status== '待审核'" style="color:rgb(245, 108, 108)">待审核</span>
          <span v-else-if="scope.row.app_status== '待排课'" style="color:rgb(230, 162, 60)">待排课</span>
          <span v-if="scope.row.app_status== '待确认排课中'" style="color:#009688">待确认排课中</span>
          <span v-else-if="scope.row.app_status== '已确认'" style="color:#303133">已确认</span>
          <span v-if="scope.row.app_status== '授课考勤'" style="color:#409EFF">授课考勤</span>
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
            <!-- </router-link> -->
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
  <!-- 审核意见 -->
 <el-dialog    
  title="提示"
  :visible.sync="centerDialogVisible_shenghe"
  width="30%"
  center>
   <el-form ref="form" :model="shenghe">
    <el-form-item label="上课地点" v-model="radio">
        <el-radio v-model="radio" label="线上">线上</el-radio>
        <el-radio v-model="radio" label="线下">线下</el-radio>
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
      <el-form-item :inline="true" label="财务专员">
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
        <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
      </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible_shenghe = false">取 消</el-button>
    <el-button type="primary" @click="submit_think">提交意见</el-button>
  </span>
</el-dialog>
    
    <!-- 设置充值链接 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[20, 40, 60, 80]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>



  </div>
</template>

  <script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      tip_banzhuren:[],//弹出层班主任
      money: "", //设置充值金额
      dialogFormVisible1: false,
      centerDialogVisible_shenghe:false,
      textarea:"", //审核的输入框
      msg: "",
      radio:"", //上课地点
          banzhuren_list_new: [], //班主任数据
      banzhuren_live: "",
        moneymen_list_new: [
        { value: 10141, label: "飞扬", id: 1 },
        { value: 10511, label: "朝夕", id: 7 }
      ], //财务专员
      moneymen_live: "",
      helpTeacher_list_new: [
        { value: 10141, label: "飞扬", id: 1 },
        { value: 1011, label: "朝夕", id: 2 }
      ], //助教数据
      helpTeacher_live: "",
      parms: {
        search: "",
        page: 1
      },
      currentPage4: 4, //分页数据
      tableData: [],
      options: [],
      options_all: [], //顾问的所有数据
      value: "", //选定的顾问
      adviserList: "", //选定顾问的信息
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
      shenghe:{   //审核的弹出层
        app_id:16,
        banzhuren_id:1,
        jiaowu_id:1,
        zhujiao_id:1,
        is_pass	:1,
        remarks:'nini'
      },
    };
  },
  created() {
    this.getdata();
    this.getAdviser();
    this.getRolenenu();
      let params = {
      admin_id: this.getdataCookie("admin_id")
    };//
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
  computed: 
       mapState([
      "live_list",
      "banzhuren_list",
      "teacher_data",
      "zhujiao_data",
      "jiaowu_data",
      "rolemenu"
    ]),
    // ...mapState()
  updated(){
    mapState(["banzhuren_list"])
    // this.getbanzhurenName();
  },
  mounted() {
        this.getbanzhurenName();
        // this.tip_banzhuren=JSON.stringfy(this.banzhuren_list)
    console.log($(".status_color").prop());
  },
  watch: {},
  methods: {
     ...mapActions(["get_mune_list" ,"get_banzhuren_list",
      "get_live_list",
      "get_teacher_data",
      "get_zhujiao_data",
      "get_jiaowu_data"]),
        //获取直播列表发送actions this.store.dispatch
    tableRowClassName({ row, rowIndex, columnIndex, column }) {   //改变数组的颜色
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
        console.log(this.banzhuren_list_new);
      }
    },
    mommonAction(a, b) {
      switch (a) {
        case "click_edit":
           console.log(this.tableData)
          break;
        case "click_test":
      this.centerDialogVisible_shenghe= true
      this.getbanzhurenName();
      console.log(this.banzhuren_list)
      console.log(this.banzhuren_list_new)
          break;
        case "click_sure":
          break;
        case "click_delete":
          break;
        case "cilck_plan_class":
          // {path:'/home',query: {id:'1'}}
          this.$router.push({ path: "/PlanClassAdd", query: b });
          break;
      }
    },
    getRolenenu() {
      return this.rolemenu[0].children[3].children;
      //  console.log()
    },
    submit_think(){   //提交审核意见
        this.$apis.common.application_audit(this.shenghe).then(res=>{
          if(res.data.code==1){
            alert(11)
          }
        })
        this.centerDialogVisible_shenghe = false
       
    },
    handleSizeChange(val) {
      //分页设置
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
      //   console.log(this.options_all)
      this.adviserList = this.options_all.filter(
        item => item.adviser == targetName
      );
      console.log(this.adviserList[0].id);
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
      let parms = {
        admin_id: this.getdataCookie("admin_id")
      };
      this.$apis.common
        .application_list(parms)
        .then(res => {
          if (res.data.code == 1) {
            //console.log(res.data.data);
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