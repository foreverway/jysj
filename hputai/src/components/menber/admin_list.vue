 <template>
  <div class="main">
    <el-input
      placeholder="请输入搜索内容"
      v-model="form.search"
      @input="getdata"
      clearable
      style="width:300px"
    ></el-input>
    <el-button type="primary">搜索</el-button>
    <router-link to="/AdminAdd">
      <el-button type="primary" style="float:right">新建账户</el-button>
    </router-link>

    <el-table
      :data="tableData.list"
      :header-cell-style="{background:'#f4f4f4'}"
      style="margin-top:20px"
    >
      <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column>
      <el-table-column prop="admin_name" label="账户名"></el-table-column>
      <el-table-column prop="admin_tel" label="手机"></el-table-column>
      <el-table-column prop="role_name" label="账户角色"></el-table-column>

      <el-table-column prop="admin_login" label="登陆次数"></el-table-column>

      <el-table-column prop="admin_login_time" label="最后登陆时间"></el-table-column>

      <el-table-column prop="admin_modify_ip" label="最后登陆IP"></el-table-column>

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <router-link :to="'/AdminEdit/'+ scope.row.admin_id">
            <el-button type="text" size="small">编辑</el-button>
          </router-link>
          <el-button @click="admin_del(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style=" float: right;margin-top: 30px;"
      background
      layout="prev, pager, next"
      @prev-click="prev"
      @next-click="next"
      @current-change="current"
      :page-size="10"
      :total="tableData.count"
    ></el-pagination>
  </div>
</template>

  <script>
export default {
  data() {
    return {
      input: "",
      tableData: [],
      form: {
        search: "",
        page: 1
      }
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    //表格索引
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
      this.getdata();
    },
    next() {
      this.form.page++;
      this.getdata();
    },
    prev() {
      //上一页
      if (this.form.page > 1) {
        this.form.page--;
        this.getdata();
      }
    },
    // 删除数据
    admin_del(row) {
      //  console.log(row.admin_id)
      this.$confirm(
        "此操作将永久删除" + row.admin_name + "用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          let params = {
            admin_id: row.admin_id
          };
          this.$apis.menber.admin_del(params).then(res => {
            if (res.data.code == 1) {
              this.$message({
                message: row.admin_name + "用户删除成功",
                type: "success"
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
      // 路由跳转
      // window.location.href = ''
      this.$router.push({ path: "/login" });
      // Router.push("/")
    },
    // 获取数据
    getdata() {
      this.$apis.menber.admin_list(this.form).then(res => {
        if (res.data.code == 1) {
          this.tableData = res.data.data;
        }
      });
 
    }
  }
};
</script>
