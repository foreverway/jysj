
 <template>
  <div class="main">
    <zx-head title="销售跟进"></zx-head>

    <div class="so_main_left">
      <el-form :inline="true" :model="parms" label-width="120px">
        <el-form-item label="模糊搜索：">
          <el-input
            placeholder="模糊搜索"
            v-model="parms.search"
            clearable
            @change="getdata_change"
            style="width:150px;"
          ></el-input>
        </el-form-item>
      

        <el-form-item label="跟进人：">
          <el-select
            clearable
            style="width:150px"
            v-model="parms.follow_man"
            filterable
            placeholder="搜索选择"
            @change="getdata_change"
          >
            <el-option
              v-for="item in follow_man_list"
              :key="item.index"
              :label="item.admin_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属战队：">
          <el-select
            clearable
            style="width:150px"
            v-model="parms.team"
            @change="getdata_change"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in team_list"
              :key="item.index"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="建立有效联系：">
          <el-select
            clearable
            style="width:150px"
            v-model="parms.m1"
            placeholder="请选择"
            @change="getdata_change"
          >
            <el-option
              v-for="item in m1_list"
              :key="item.index"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="明确数据需求：">
          <el-select
            clearable
            style="width:150px"
            v-model="parms.m3"
            placeholder="请选择"
            @change="getdata_change"
          >
            <el-option
              v-for="item in m3_list"
              :key="item.index"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="建立信任：">
          <el-select
            clearable
            style="width:150px"
            v-model="parms.m4"
            placeholder="请选择"
            @change="getdata_change"
          >
            <el-option
              v-for="item in m4_list"
              :key="item.index"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试听：">
          <el-select
            clearable
            style="width:150px"
            v-model="parms.m6"
            placeholder="请选择"
            @change="getdata_change"
          >
            <el-option
              v-for="item in m6_list"
              :key="item.index"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
    
  <el-form-item label="数据获取时间">
          <el-date-picker
            style="margin: 0 5px;width:150px"
            v-model="parms.start_time"
            @change="getdata_change"
            type="date"
            clearable
            value-format="yyyy-MM-dd "
            placeholder="选择日期时间"
          ></el-date-picker>至
          <el-date-picker
            @change="getdata_change"
            v-model="parms.end_time"
            style="margin: 0 5px;width:150px"
              type="date"
            clearable
            value-format="yyyy-MM-dd "
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="最近更新时间">
          <el-date-picker
   style="margin: 0 5px;width:150px"
               v-model="parms.update_start_time"
            @change="getdata_change"
              type="date"
            clearable
            value-format="yyyy-MM-dd "
            placeholder="选择日期时间"
          ></el-date-picker>至
          <el-date-picker
            @change="getdata_change"
               style="margin: 0 5px;width:150px"
            v-model="parms.update_end_time"
         type="date"
            clearable
            value-format="yyyy-MM-dd "
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
          <div class="flex_button">
     <el-button type="success" @click="show_sale">查看销售跟进统计表</el-button>
    <el-button type="primary" @click="recharge_export">导出</el-button>
    <router-link to="/SalesList/Addsalepro">
      <el-button type="primary" style="background-color:#409EFF; margin: 0 10px;border:none;">新建销售情况列表</el-button>
    </router-link>
</div>
      </el-form>

    </div>


   <el-dialog
  title="提示"
  :visible.sync="show_list"
  width="50%"
>
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="show_list = false">取 消</el-button>
    <el-button type="primary" @click="show_list = false">确 定</el-button>
  </span>
</el-dialog>



    <el-table
      :data="tableData"
      border
      :default-sort="{prop: 'week', order: 'descending'}"
      :header-cell-style="{background:'#f4f4f4'}"
      style="margin-top:20px"
    >
      <el-table-column label="序号" type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="follow_man" label="跟进人"></el-table-column>
      <el-table-column prop="data_number" label="数据编号"></el-table-column>
      <el-table-column prop="data_student_name" label="学生姓名"></el-table-column>
      <el-table-column prop="data_tag" label="数据标签"></el-table-column>
      <el-table-column prop="m1" label="建立了有效联系 "></el-table-column>
      <el-table-column prop="m3" label="明确数据需求"></el-table-column>
      <el-table-column prop="m6" label="试听"></el-table-column>
      <el-table-column prop="m7" label="缴费方案"></el-table-column>
      <el-table-column fixed="right" prop label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="pushToEdit(scope.row.id)">编辑</el-button>
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
import url from "../../config/config.js";

export default {
  data() {
    return {
      money: "", //设置充值金额
      dialogFormVisible1: false,
      copyurl1: "",
      msg: "",
      parms: {
        search: "", //		搜索条件
        start_time: "", //	获取数据开始时间
        end_time: "", //	获取数据结束时间
        update_start_time: "", //	数据更新开始时间
        update_end_time: "", //	数据更新结束时间
        follow_man: "", //	跟进人
        team: "", //	所属战队
        m1: "", //	建立了有效联系
        m3: "", //	明确数据需求
        m4: "", //	建立信任
        m6: "", //	试听
        page: "" //页码
      },
      show_list:false,//是否显示dialog
      tableData: [],
      showData: {},
      follow_man_list: [],
      m1_list: [
        { value: "已建立", label: "已建立" },
        { value: "未建立", label: "未建立" }
      ],
      m3_list: [
        { value: "客户需求模糊", label: "客户需求模糊" },
        { value: "确认中", label: "确认中" },
        { value: "哆啦A梦战队", label: "哆啦A梦战队" }
      ],
      m4_list: [
        { value: "未建立", label: "未建立" },
        { value: "初步建立", label: "初步建立" },
        { value: "信任度高", label: "信任度高" }
      ],
      m6_list: [
        { value: "推进中", label: "推进中" },
        { value: "已缴费", label: "已缴费" },
        { value: "已试听", label: "已试听" },
        { value: "已反馈", label: "已反馈" }
      ],
      team_list: [
        { value: "柠檬战队", label: "柠檬战队" },
        { value: "车厘子战队", label: "车厘子战队" },
        { value: "哆啦A梦战队", label: "哆啦A梦战队" }
      ],

      value1: ""
    };
  },
  created() {
    this.getdata();
    this.$apis.menber
      .admin_base({ admin_id: this.getdataCookie("admin_id") })
      .then(res => {
        if (res.data.code == 1) {
          this.showData.role_name = res.data.data.role_name;
          this.showData.is_captain = res.data.data.is_captain;
          this.showData.admin_name = res.data.data.admin_name;
        }
      });
        this.$apis.operation.banzhuren_list().then(res => {
      if (res.data.code == 1) {
        this.follow_man_list = [];
        this.follow_man_list = res.data.data;
       
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    });
  },
  mounted() {},

  methods: {
    //显示销售跟进人数据
    show_sale(){
      this.show_list=true
      
                this.$apis.common.sale_statistics().then(res => {
            if (res.data.code == 1) {
              // this.$message({
              //   type: "success",
              //   message:  " 已删除成功"
              // });
              console.log(res.data.data)
            } else {
              this.$message.error(res.data.msg);
            }
          });
    },
    //导出
    recharge_export() {
      this.$message({
        type: "success",
        message: "正在导出,请稍等..."
      });

      let params = "";

      for (var key in this.showData) {
        params += key + "=" + this.showData[key] + "&";
      }
      for (var key in this.parms) {
        if (this.parms[key] !== null) {
          params += key + "=" + this.parms[key] + "&";
        } else {
        }
      }
      window.location.href = url.urls + "/api_salepro_export" + "?" + params;
    },
    //用于分页的一些设置
    current(num) {
      //当前页数
      this.parms.page = num;
      this.getdata_change();
    },
    next() {
      this.parms.page++;
      this.getdata_change();
    },
    prev() {
      //上一页
      if (this.parms.page > 1) {
        this.parms.page--;
        this.getdata_change();
      }
    },
    pushToEdit(a) {
      this.$router.push({ path: "/SalesList/SalelistEdit", query: { id: a } });
    },

    //序号排列
    indexMethod(index) {
      if (this.parms.page == 1) {
        return index + 1;
      } else {
        let page = (this.parms.page - 1) * 10 + 1;
        return index + page;
      }
    },
    // 复制链接
    copyUrl(data) {
      let url = data + "/" + this.money;
      let oInput = document.createElement("input");
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
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
    getdata_change() {
      localStorage.setItem("parms", JSON.stringify(this.parms));
      this.getdata();
    },

    getdata() {
      this.parms.admin_id = this.getdataCookie("admin_id");
      this.parms = JSON.parse(localStorage.getItem("parms"))
        ? JSON.parse(localStorage.getItem("parms"))
        : this.parms;
      this.$apis.common.salepro_list(this.parms).then(res => {
        if (res.data.code == 1) {
          // if(res.data.data.count*1<11){
          //   this.parms.page=1
          //   localStorage.setItem('parms',JSON.stringify(this.parms));
          // }
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
.flex_button{
  float: right;
  width: 420px;
  margin:10px 0;
  display:flex;
  align-items: center;
  justify-content:space-around;
}
</style>