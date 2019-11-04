<template>
  <div class="so_main">
    <div class="so_main_left">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-input v-if="this.url!=='StudentsList'" class="so_input" v-model="form.search" placeholder="请输入用户名"></el-input>
        <el-button
          type="primary"
          @click="getadata"
          v-if="this.url!=='StudentsList'"
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

    <div class="so_main_right">
      <!-- <el-button type="danger"  v-if="msg.data.isAdmin=='1'" @click="dialogVisible= true,form1.type=1">入款</el-button>
      <el-button type="primary"  v-if="msg.data.isAdmin=='1'" @click="dialogVisible= true,form1.type=2">扣款</el-button>-->

      <el-dialog
        :close-on-click-modal="false"
        :title="form1.type==1?'入款':'扣款'"
        :visible.sync="dialogVisible"
        width="500px"
      >
        <el-form :model="form1">
          <el-form-item label="会员名" label-width="100px">
            <el-input
              v-model="form1.uname"
              @input="ifnamemoney"
              placeholder="请输入会员名"
              style="width:200px"
            ></el-input>
            <span style="color:red">{{ifname}}</span>
          </el-form-item>

          <el-form-item label="金额" label-width="100px">
            <el-input v-model="form1.amount" style="width:200px" placeholder="请输入金额"></el-input>
          </el-form-item>

          <el-form-item label="事由" label-width="100px">
            <el-input
              type="textarea"
              style="width:300px"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入事由"
              v-model="form1.reason"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            style="background-color:#e6563a; border:none;"
            @click="dialogVisible = false,postfun()"
          >确 定</el-button>
        </div>
      </el-dialog>
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

      <el-table-column align="center" label="学员账号">
        <template slot-scope="scope">
          <span>{{ scope.row.uname }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="金额">
        <template slot-scope="scope">
          <span v-show="scope.row.type==2" style="color:green">-{{ scope.row.given_amount }}</span>
          <span v-show="scope.row.type==1" style="color:red">+{{ scope.row.given_amount }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="事由">
        <template slot-scope="scope">
          <span>{{ scope.row.given_remarks }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="下发时间">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- <p style="margin-top:30px"><span>累计金额：</span><span style="color:red">{{msg.data.givenamount}}</span></p> -->
    <!-- <el-button type="primary" @click="ifinputselect" style="margin-top:20px">审核</el-button> -->
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
export default {
  data() {
    return {
      ifname: "",
      tableData: [],
      form: {
        search: "", //搜索学员姓名条件
        page: 1, //页码
        start_time: "", //搜索开始时间
        end_time: "", //搜索结束时间
        uid: "" //如果有uid,查询该用户的记录
      },
                    formStudent:{ 
         search:'',//搜索学员姓名条件
         page:1,//页码
          start_time:'',//搜索开始时间
           end_time:'',//搜索结束时间
            uid:'',//如果有uid,查询该用户的记录
            is_by_student:1, //在详情页使用
       },
      form1: {
        // 入款和扣款
        amount: "", //金额
        reason: "", //理由
        uname: "", //学生姓名
        type: "" //入款还是扣款，1入款，2扣款
      },
      msg: {},
              url:'',//判别是否详情页

      dialogVisible: false //入扣款弹窗
    };
  },
  created() {
    this.$apis.students.getuilcode();
  },
        mounted() {
 var name=this.$route.path.substring(this.$route.path.indexOf("/")+1);
 this.url=name.substr(0,12)
          this.getadata()

  },
//       watch: {
// $route(to, from) {
//  var name=this.$route.path.substring(this.$route.path.indexOf("/")+1);
//  this.url=name.substr(0,12)
//  console.log(this.url)
// }
// },
  methods: {
    //验证姓名和学币余额
    ifnamemoney() {
      let parms = { uname: this.form1.uname };
      let parms2 = { tel: this.form1 };
      this.$apis.students.ifusername(parms).then(res => {
        if (res.data.code == -1) {
          this.$apis.students.user_learnmoney(parms2).then(res => {
            this.ifname = res.data.data.learnmoney;
          });
        } else {
          this.ifname = "用户名不存在";
        }
      });
    },
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
                if(this.url=='StudentsList'){
                        this.$apis.students.wallet_list(this.formStudent).then(res => {
        if (res.data.code == 1) {
          this.msg = res.data;
          this.tableData = res.data.data.list;
        }
      });
                }else{
                        this.$apis.students.wallet_list(this.form).then(res => {
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
.so_main_right {
  float: right;
}
</style>
