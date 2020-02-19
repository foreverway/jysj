 <template>
  <div class="main">
    <zx-head title="我的学员" ></zx-head>
    <el-input
      placeholder="请输入搜索内容"
      v-model="parms.search"
      @input="getdata"
      clearable
      style="width:300px"
    ></el-input>
          <el-select v-model="parms.student_status" placeholder="选择学生状态"    filterable clearable @change="getdata">
        <el-option
          v-for="item in student_status"
       
          :key="item.value"
       
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
         <el-select v-model="parms.alevel" placeholder="选择学生等级"    filterable clearable @change="getdata">
        <el-option
          v-for="item in student_alevel"
       
          :key="item.value"
       
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
          <el-date-picker
        style="margin-left:20px"
        v-model="change_start_time"
        @change="get_starttime"
        type="datetime"
        clearable
        value-format='timestamp'
        placeholder="选择日期时间"
      ></el-date-picker>至
      <el-date-picker
        @change="getdata"
        v-model="change_end_time"
        type="datetime"
        clearable
        value-format='timestamp'
        placeholder="选择日期时间"
      ></el-date-picker>
    <router-link to="/StudentsList/StudentsAdd">
      <el-button type="primary" style="float:right;">新建学员账户</el-button>
    </router-link>

    <el-table :data="tableData" :header-cell-style="{background:'#f4f4f4'}" style="margin-top:20px">
      <el-table-column label="序号" type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="student_id" label="学号"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="tel" label="手机号"></el-table-column>
      <el-table-column prop="alevel" label="用户等级"></el-table-column>
      <el-table-column prop="banzhuren" label="班主任"></el-table-column>
      <el-table-column prop="consultant" label="顾问"></el-table-column>
      <el-table-column prop="amount" label="总学习币金额"></el-table-column>
      <el-table-column prop="student_status" label="状态"></el-table-column>
      <el-table-column prop="learnmoney" label="账户余额"></el-table-column>
      <el-table-column prop="first_time" label="首次缴费时间"></el-table-column>
      <el-table-column fixed="right" prop label="操作" width="220px">
        <template slot-scope="scope">
          <span v-for="(item,index) in thisMenu" :key="index">
            <el-button
              type="button"
              size="mini"
              index="item.id"
              v-bind:id="item.menu_action"
              @click="trueAction(item.menu_action,scope.row)"
            >{{item.menu_name}}</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <span v-if="msg.data">
      <el-pagination
        style="margin-top:30px; float: right;margin-bottom: 30px;"
        background
        layout="prev, pager, next"
        @prev-click="prev"
        @next-click="next"
        @current-change="current"
        :page-size="10"
        :total="msg.data.count"
      ></el-pagination>
    </span>
    <!-- 设置充值链接 -->
    <el-dialog
      title="设置充值金额"
      :visible.sync="dialogFormVisible1"
      width="500px"
      :close-on-click-modal="false"
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
  </div>
</template>

  <script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      money: "", //设置充值金额
      dialogFormVisible1: false,
      copyurl1: "",
      msg: "",
      change_end_time:'',
      change_start_time:'',
      parms: {
        search: "",
        page: 1,
        is_data:'',//	int	此参数用来表示获取的数据是否是下拉列表的学生数据，1表示是
student_status	:'',//	int	学员状态，1在读，2已升学
alevel	:'',//学员等级：普通学员，保读学员，VIP学员，潜在VIP，试听学员
start_time	:'',//	int	时间戳，首次缴费开始时间
end_time	:'',//	int	时间戳，首次缴费结束时间
      },
student_status:[{value:1,label:'在读'},{value:2,label:'升学'}],
student_alevel:[{value:'普通学员',label:'普通学员'},{value:'保读学员',label:'保读学员'},{value:'VIP学员',label:'VIP学员'},{value:'潜在VIP',label:'潜在VIP'},{value:'试听学员',label:'试听学员'}],
      tableData: [],
      thisMenu:[]
    };
  },
  created() {
    this.getdata();
    this.getStuList();
  },

  computed: mapState(["rolemenu"]),
  methods: {
    get_starttime(){
this.parms.start_time=this.change_start_time.toString().slice(0,10)*1
this.getdata()
    },
    get_endtime(){
this.parms.end_time=this.change_end_time.toString().slice(0,9)*1
this.getdata()
    },
    current(num) {
      this.parms.page = num;
      this.getdata();
    },
    next() {
      this.parms.page++;
      this.getadata();
    },
    prev() {
      //上一页
      if (this.parms.page > 1) {
        this.parms.page--;
        this.getadata();
      }
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
    getStuList() {
      // return this.rolemenu[0].children[0].children;
                 var menu= this.rolemenu.forEach((item, index, array) => {
        //遍历菜单
        if (item.menu_name=="学员管理") {
          //有子集
          for (let j = 0; j < item.children.length; j++) {
            //遍历子集
            var a = item.children.filter(function(item) {
              return item.menu_url == "/StudentsList";
            });
          this.thisMenu=a[0].children   
            
          return a

          }
        } 
      });
    },
    trueAction(a, b) {
      switch (a) {
        case "del_this": //删除学生列表
          this.admin_del(b);
          break;
        case "edit_list": //编辑学生列表
          this.$router.push({
            path: "/StudentsList/StudentsEdit",
            query: { id: b.id }
          });
          break;
        case "see_info": //查看学生列表详情
          this.$router.push({
            path: "/StudentsList/StudentsInfo/",
            query: { search:b.username,id: b.id }
          });


          break;
        case "copy_url": //复制链接
          this.dialogFormVisible1 = true;
          break;
        case "plan_class": //跳转排课
                if(b.learnmoney>0){
          this.$router.push({
            path: "/StudentsList/ApplicationAdd",
            query: { username: b.username,allMoney:b.learnmoney }
          });
        }else{
          this.$message({
            type:"warning",
            message:'账户余额不足'
          })
        }

          break;
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
    admin_del(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let parms = {
            id: row.id
          };
          this.$apis.students.students_del(parms).then(res => {
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
    getdata() {
      this.$apis.students.students_list(this.parms).then(res => {
        if (res.data.code == 1) {
          this.msg = res.data;
          //console.log(this.msg)
          this.tableData = res.data.data.list;
        }
      });

    }
  }
};
</script>
<style  scoped>

#del_this {
  background-color: #fe6249 !important;
  color: white;
}
#edit_list {
  background-color: #3a8eff !important;
  color: white;
}
#see_info {
  background-color: #05d294 !important;
  color: white;
}
#copy_url {
    background-color: #8896B5 !important;
  color: white;
}
#plan_class{
      background-color: #7571fa !important;
  color: white;
}
</style>