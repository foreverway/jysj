<template>
  <div class="so_main">
    <div class="so_main_left">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-input
          v-if="this.url!=='StudentsList'"
          class="so_input"
          v-model="form.search"
          @input="getadata"
          placeholder="请输入搜索内容"
        ></el-input>
        <el-button
          v-if="this.url!=='StudentsList'"
          type="primary"
          @click="getadata"
          style="margin-left:5px;background-color:#e6563a; border:none;"
        >搜索</el-button>

        <div v-if="this.url=='StudentsList'" style="float:right; margin:0 0 15px 17px;">
          <el-date-picker
            @change="getadata"
            v-model="formStudent.start_time"
            clearable
            type="datetime"
            value-format="yyyy-MM-dd H:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>至
          <el-date-picker
            @change="getadata"
            v-model="formStudent.end_time"
            clearable
            type="datetime"
            value-format="yyyy-MM-dd H:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
        <div v-if="this.url!=='StudentsList'" style="float:right; margin:0 0 15px 17px;">
          <el-date-picker
            @change="getadata"
            v-model="form.start_time"
            clearable
            type="datetime"
            value-format="yyyy-MM-dd H:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>至
          <el-date-picker
            @change="getadata"
            v-model="form.end_time"
            clearable
            type="datetime"
            value-format="yyyy-MM-dd H:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
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
   <el-table-column label="序号" type="index" width="80" align="center" v-if="this.url!=='StudentsList'" :index="indexMethod"></el-table-column>
      <el-table-column label="序号" type="index" width="80" align="center" v-if="this.url=='StudentsList'" :index="index_stu"></el-table-column>

      <el-table-column align="center" label="学员账号">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="金额">
        <template slot-scope="scope">
          <span v-if="scope.row.type==2" style="color:green">-{{ scope.row.price }}</span>
          <span v-if="scope.row.type==1" style="color:red">+{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="充值方式">
        <template slot-scope="scope">
          <span>{{ scope.row.rechargetype }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="事由">
        <template slot-scope="scope">
          <span>{{ scope.row.reason }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="充值时间">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- <p style="margin-top:30px"><span>累计金额：</span><span style="color:red">{{msg.data.givenamount}}</span></p> -->
    <!-- <el-button type="primary" @click="ifinputselect" style="margin-top:20px">审核</el-button> -->
    <span v-if="msg.data&&this.url!=='StudentsList'">
      <el-pagination
        style="float:right;"
        background
        layout="prev, pager, next,total"
        @prev-click="prev"
        @next-click="next"
        @current-change="current"
        :page-size="10"
        :total="msg.data.count"
      ></el-pagination>
    </span>
        <span v-if="msg.data&&this.url=='StudentsList'">
      <el-pagination
        style="float:right;"
        background
        layout="prev, pager, next,total"
        @prev-click="prev_stu"
        @next-click="next_stu"
        @current-change="current_stu"
        :page-size="10"
        :total="msg.data.count"
      ></el-pagination>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      form: {
        search: "", //搜索学员姓名条件
        page: 1, //页码
        start_time: "", //搜索开始时间
        end_time: "", //搜索结束时间
        uid: "" //如果有uid,查询该用户的记录
      },
      formStudent: {
        search: this.$route.query.search, //搜索学员姓名条件

        page: 1, //页码
        start_time: "", //搜索开始时间
        end_time: "", //搜索结束时间
        uid: "", //如果有uid,查询该用户的记录
        is_by_student: 1 //在详情页使用
      },
      form1: {
        // 入款和扣款
        amount: "", //金额
        reason: "", //理由
        uname: "", //学生姓名
        type: "" //入款还是扣款，1入款，2扣款
      },
      msg: {},
      dialogFormVisible1: false, //入扣款弹窗
      url: ""
    };
  },
  created() {
    this.$apis.students.getuilcode();
  },
  mounted() {
    var name = this.$route.path.substring(this.$route.path.indexOf("/") + 1);
    this.url = name.substr(0, 12);
    this.getadata();
  },
  //       watch: {
  // $route(to, from) {
  //  var name=this.$route.path.substring(this.$route.path.indexOf("/")+1);
  //  this.url=name.substr(0,12)
  // }
  // },
  methods: {
    //序号排列
 indexMethod(index) {
      if (this.form.page == 1) {
        return index + 1;
      } else {
        let page = (this.form.page - 1) * 10 + 1;

        return index + page;
      }
    },
index_stu(index){
       if (this.formStudent.page == 1) {
        return index + 1;
      } else {
        let page = (this.formStudent.page - 1) * 10 + 1;

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
          current_stu(num) {
      //当前页数
      this.formStudent.page = num;
      this.getadata();
    },
    next_stu() {
      this.formStudent.page++;
      this.getadata();
    },
    prev_stu() {
      //上一页
      if (this.formStudent.page > 1) {
        this.formStudent.page--;
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
      if (this.url == "StudentsList") {
        this.$apis.students.cash_list(this.formStudent).then(res => {
          if (res.data.code == 1) {
            this.msg = res.data;
            this.tableData = res.data.data.list;
          }
        });
      } else {
        this.$apis.students.cash_list(this.form).then(res => {
          if (res.data.code == 1) {
            this.msg = res.data;
            this.tableData = res.data.data.list;
          }
        });
      }
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
  margin-top: 5px;
}
</style>
