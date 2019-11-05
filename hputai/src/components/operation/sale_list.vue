 <template>
  <div class="main">
    <zx-head title="销售进程管控表"></zx-head>

    <el-input
      placeholder="模糊搜索"
      v-model="parms.search"
      clearable
      @change="getdata"
      style="width:300px"
    ></el-input>
    <el-date-picker
      style="margin-left:60px"
      v-model="parms.start_time"
      @change="getdata"
      type="datetime"
      clearable
      value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="选择日期时间"
    ></el-date-picker>至
    <el-date-picker
      @change="getdata"
      v-model="parms.end_time"
      type="datetime"
      clearable
      value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="选择日期时间"
    ></el-date-picker>

    <el-button type="success" @click="getdata">搜索</el-button>
    <el-button type="primary" @click="recharge_export">导出</el-button>

    <router-link to="/SalesList/Addsalepro">
      <el-button type="primary" style="float:right;background-color:#e6563a; border:none;">新建销售情况列表</el-button>
    </router-link>

    <el-table
      :data="tableData"
      border
      :default-sort="{prop: 'week', order: 'descending'}"
      :header-cell-style="{background:'#f4f4f4'}"
      style="margin-top:20px"
    >
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column prop="dtime" width="130px" label="数据获取时间"></el-table-column>
      <el-table-column prop="week" width="130px" sortable label="数据更新时间"></el-table-column>
      <el-table-column prop="follow_man" label="跟进人"></el-table-column>
      <el-table-column prop="team" label="	所属战队"></el-table-column>
      <el-table-column prop="team_leader" label="战队负责人"></el-table-column>
      <el-table-column prop="data_number" label="编号"></el-table-column>
      <el-table-column prop="data_student_name" label="学生姓名"></el-table-column>
      <el-table-column prop="data_tag" label="数据标签"></el-table-column>
      <el-table-column prop="m1" label="建立了有效联系 "></el-table-column>
      <el-table-column prop="m2" label="了解客户情况"></el-table-column>
      <el-table-column prop="m3" label="明确数据需求"></el-table-column>
      <el-table-column prop="m4" label="建立信任"></el-table-column>
      <el-table-column prop="m5" label="规划"></el-table-column>
      <el-table-column prop="m6" label="试听"></el-table-column>
      <el-table-column prop="m7" label="缴费方案"></el-table-column>
      <el-table-column prop="advance_strategies" label="预收策略"></el-table-column>
      <el-table-column prop="advance_subject" label="预收科目"></el-table-column>
      <el-table-column prop="advance_amount" label="预收金额"></el-table-column>
      <el-table-column prop="feedback" label="客户反馈"></el-table-column>
      <el-table-column fixed="right" prop label="操作" width="140">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="pushToEdit(scope.row.id)">编辑</el-button>
          <el-button @click="salepro_del(scope.row)" type="text" size="small">删除</el-button>
          <!-- <el-button type="text" size="small"  @click="dialogFormVisible1=1">复制链接</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <span v-if="msg.data">
      <el-pagination
        style="margin-top:30px; float: right;"
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
      money: "", //设置充值金额
      dialogFormVisible1: false,
      copyurl1: "",
      msg: "",
      parms: {
        // search: "",
        // page: 1,
        // admin_id:''
      },
      tableData: [],
      // form:{
      //   start_time:null,
      //   end_time:null
      // },
      value1: ""
    };
  },
  created() {
    this.getdata();
    // console.log( this.getdata())
  },
  mounted() {},
  // watch:{
  //   form:function(before,after){
  //       if(this.form.end_time!==""){
  //             this.tableData = res.data.data.list
  //             console.log(this.tableData)
  //           }else if (this.form.start_time!==""){
  //           new_arr=res.data.data.list.filter(item=>item.dtime>this.form.start_time)
  //              this.tableData = new_arr
  //           }else{
  //           new_arr=res.data.data.list.filter(item=>item.dtime<this.form.end_time)
  //              this.tableData = new_arr
  //           }
  //   }
  // },
  methods: {
    //导出
    recharge_export() {
      this.$message({
        type: "success",
        message: "正在导出,请稍等..."
      });
      let urls = "http://personal.test.hqjystudio.com";
      let params = "";
      for (var key in this.parms) {
        params += key + "=" + this.parms[key] + "&";
      }
      window.location.href = urls + "/api_salepro_export" + "?" + params;
    },
    //用于分页的一些设置
    current(num) {
      //当前页数
      console.log(num);
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
    pushToEdit(a) {
      this.$router.push({ path: "/SalesList/SalelistEdit", query: { id: a } });
    },

    //序号排列
    // indexMethod(index) {
    //   if (this.parms.page == 1) {
    //     return index + 1;
    //   } else {
    //     let page = (this.parms.page - 1) * 10 + 1;
    //     return index + page;
    //   }
    // },
    // 复制链接
    copyUrl(data) {
      let url = data + "/" + this.money;
      let oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value);
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        message: url + "已成功复制到剪切板",
        type: "success"
      });
      this.money = "";
      oInput.remove();
    },
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
      this.parms.admin_id = this.getdataCookie("admin_id");
      this.$apis.common.salepro_list(this.parms).then(res => {
        if (res.data.code == 1) {
          this.msg = res.data;
          function compare(p) {
            return function(m, n) {
              var a = m[p];
              var b = n[p];
              return a - b;
            };
          }
          this.tableData = res.data.data.list;

          this.tableData.sort(compare("week"));
        }
      });
    }
  }
};
</script>
<style scoped>
</style>