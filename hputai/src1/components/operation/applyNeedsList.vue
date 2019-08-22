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

    <el-button type="primary"  @click="getdata">查看所有需求表</el-button>
    <router-link to="/ApplicationAdd">
      <el-button type="primary" style="float:right">新建报名需求</el-button>
    </router-link>
    <el-table  border  align="center"
    :data="tableData" :header-cell-style="{background:'#f4f4f4'}"  style="width: 100%;margin:20px auto">
      <el-table-column label="id" prop="id"  width="50"></el-table-column>
      <el-table-column prop="number" label="编号"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="amount" label="价格"></el-table-column>
      <el-table-column prop="expiry_date" label="课程有效期"></el-table-column>
      <el-table-column prop="student_name" label="报名学员"></el-table-column>
      <el-table-column prop="admin_name" label="添加者" width="100"></el-table-column>
      <el-table-column prop="addtime" label="添加时间"></el-table-column>
      <el-table-column prop="app_status" class="status_color" label="状态" width="100"></el-table-column>

      <el-table-column fixed="right" prop label="操作"   width="300" >
          <template slot-scope="scope">
          <span v-for="(item,index) in getRolenenu()" :key="index">
      
              <!-- <router-link :to="'/SalelistEdit/'+ scope.row.id"> -->
        <el-button type="text" size="small" index=item.id  @click=mommonAction(item.menu_action,scope.row) >{{item.menu_name}}</el-button>
              <!-- </router-link> -->
   
          </span>
                </template> 
      </el-table-column>
    </el-table>
    <!-- 分页 -->

    <el-dialog
      title="设置充值金额"
      :visible.sync="dialogFormVisible1"
      width="500px"
      close-on-click-modal="false"
    >
      <el-input style="width:200px" v-model="money" placeholder="请输入充值金额"></el-input>
      <el-button
        type="primary"
        v-show="money>0"
        @click="dialogFormVisible1 = false,copyUrl( msg.data.recharge_url)"
      >复制充值链接</el-button>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible1 = false,copyUrl( msg.data.recharge_url)"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 设置充值链接 -->
    <div style="display:none" cols="20" id="biao1">{{copyurl1}}</div>
      <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[20, 40, 60, 80]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
  </div>
</template>

  <script>
  import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      money: "", //设置充值金额
      dialogFormVisible1: false,
      copyurl1: "",
      msg: "",
      parms: {
        search: "",
        page: 1
      },
        currentPage4: 4,//分页数据
      tableData: "",
    options: [],
    options_all:[],//顾问的所有数据
         value: '',//选定的顾问
         adviserList:'',//选定顾问的信息
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: ""
    };
  },
  created() {
    this.getdata();
    this.getAdviser()
    this.getRolenenu()
    //this.searchAdviser()
   
  },
  computed:{
       ...mapState(['rolemenu']),
  },
  mounted() {
     var color=
    // console.log(this.tableData);
     console.log($('.status_color').prop())
  },
  watch:{
    
  },
  methods: {
       
    mommonAction(a,b){
      switch (a) {
          case "click_edit":
              console.log(b)
              break;
          case "click_test":
              console.log(b)
              break;
          case "click_sure":
              console.log(b)
              break;
          case "click_delete":
              console.log(b)
              break;
        case "cilck_plan_class":
          // {path:'/home',query: {id:'1'}}
              this.$router.push({path:'/PlanClassAdd',query:b})
              break; 
      } 
    },
        getRolenenu(){
          return this.rolemenu[0].children[3].children
          //  console.log()
        },
           handleSizeChange(val) {   //分页设置
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //获取顾问列表adviser_list
          getAdviser(){
            let parms = {
        admin_id: this.getdataCookie("admin_id")
      };
      this.$apis.common.adviser_list(parms)
        .then(res => {
          if (res.data.code == 1) {
            this.msg = res.data;
            this.options_all = res.data.data.list;
            for (let i = 0; i < this.options_all.length; i++) {
            var val = this.options_all[i];
            this.options.push({ value: val.adviser,label: val.adviser});
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
          showAdviser(targetName){
              console.log(targetName)
            //   console.log(this.options_all)
              this.adviserList=this.options_all.filter(item=>item.adviser==targetName)
              console.log(this.adviserList[0].id)
            let parms = {
        admin_id: this.getdataCookie("admin_id"),
        add_admin_id:this.adviserList[0].id*1==""?"":this.adviserList[0].id
      };
      this.$apis.common.application_list(parms)
        .then(res => {
          if (res.data.code == 1) {
            console.log(res.data.data);
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
      let parms = {
        admin_id: this.getdataCookie("admin_id")
      };
      this.$apis.common.application_list(parms)
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