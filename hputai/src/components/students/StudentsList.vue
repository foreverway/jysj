 <template>
  <div class="main">
    <zx-head title="我的学员"></zx-head>
    <el-input
      placeholder="请输入搜索内容"
      v-model="parms.search"
      @input="getdata"
      clearable
      style="width:300px"
    ></el-input>
    <el-select
      v-model="parms.student_status"
      placeholder="选择学生状态"
      filterable
      clearable
      @change="getdata"
    >
      <el-option
        v-for="item in student_status"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-select v-model="parms.alevel" placeholder="选择学生等级" filterable clearable @change="getdata">
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
      value-format="timestamp"
      placeholder="选择日期时间"
    ></el-date-picker>至
    <el-date-picker
      @change="getdata"
      v-model="change_end_time"
      type="datetime"
      clearable
      value-format="timestamp"
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
    <el-dialog
      :close-on-click-modal="false"
      :title="this.show_student"
      :visible.sync="dis_class"
      width="850px"
    >
      <div class="class_dia">
        <el-calendar v-model="value">
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template slot="dateCell" slot-scope="{date, data}">
            <p
              :class="data.isSelected ? 'is-selected' : ''"
            >{{ data.day.split('-').slice(2).join('-') }} {{ data.isSelected ? '✔️' : ''}}</p>

            <p
              @click="click_daily( data.day)"
              :class="data.isSelected ? 'is-change' : ''"
              style=" border-radius:5px;border:1px solid silver;font-size:12px;text-align:center;line-height:20px;"
            >
              <span
                v-if="handleSelected(data.day)>0"
                style="color:red;"
              >{{handleSelected(data.day)}}</span>
              <span v-if="handleSelected(data.day)==0">{{handleSelected(data.day)}}</span>
              课时
            </p>
          </template>
        </el-calendar>

        <div class="class_dia_div">
          <h3>当日课程安排</h3>
          <h2 v-if="info_data.length<1">今天暂没有安排课程</h2>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in info_data"
              :key="index"
              icon="el-icon-video-camera"
              type="primary"
              color="#e6563a"
              size="20px"
            >
              <ul>
                <li style="color:orange;">{{activity.subject_name}}</li>
                <li>开始:{{activity.start_time}}</li>
                <li>结束:{{activity.end_time}}</li>
                <li>课时:{{activity.classhour}}</li>
                <li>学生:{{activity.username}}</li>
                <li>讲师:{{activity.teacher_name}}</li>
                <li>班主任:{{activity.banzhuren_name}}</li>
                <li>类型:{{activity.course_txt}}</li>
                <li>地点:{{activity.course_address}}</li>
                <li>直播平台:{{activity.live_name}}</li>
              </ul>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dis_class = false">取 消</el-button>
        <el-button type="primary" @click="dis_class = false">确 定</el-button>
      </span>
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
      value: "",
      count_data1: [],
      dis_class: false, //课表弹出框
      change_end_time: "",
      change_start_time: "",
      show_student: "",

      parms_daily: {
        //日历课时
        student_id: "", //	学生id
        is_today: "" //	月份，不传默认是当月，当月1，上月是-1，下月是2
      },
      count_data: [],
      info_data: [],
      parms_info: {
        //日历详情
        student_id: "", //	学生id
        begin_time: "", //	开始时间，不传默认是当然的开始时间
        end_time: "" //	结束时间，不传默认是当然的结束时间
      },
      parms: {
        search: "",
        page: 1,
        is_data: "", //	int	此参数用来表示获取的数据是否是下拉列表的学生数据，1表示是
        student_status: "", //	int	学员状态，1在读，2已升学
        alevel: "", //学员等级：普通学员，保读学员，VIP学员，潜在VIP，试听学员
        start_time: "", //	int	时间戳，首次缴费开始时间
        end_time: "" //	int	时间戳，首次缴费结束时间
      },
      student_status: [
        { value: 1, label: "在读" },
        { value: 2, label: "升学" }
      ],
      student_alevel: [
        { value: "普通学员", label: "普通学员" },
        { value: "保读学员", label: "保读学员" },
        { value: "VIP学员", label: "VIP学员" },
        { value: "潜在VIP", label: "潜在VIP" },
        { value: "试听学员", label: "试听学员" }
      ],
      this_data: "",
      tableData: [],
      thisMenu: []
    };
  },
  created() {
    this.getdata();
    this.getStuList();
  },

  computed: mapState(["rolemenu"]),
      watch:{
            value: function(n_val,b_val) {
              // console.log(b_val)
              let this_time  = new Date()
              let before_time=b_val?b_val!=='':this_time
    console.log(before_time.getTime(),this.value.getTime())
               switch (before_time.getTime(),this.value.getTime()) {
                 case this.value.getTime()>this_time.getTime(): //如果这一次比本月份月份靠后
                   console.log(2)
                   break;
                      case this.value.getTime()<this_time.getTime(): //如果上一次比这一次月份靠前
                   console.log(-1)
                   break;
                 default:
                   break;
               }
                // var year = this.value.getFullYear();
                // var month = this.value.getMonth() + 1;
                // if (month >= 1 && month <= 9) {
                //     month = "0" + month;
                // }
                // console.log(year + '-' + month) // 打印出日历选中了哪年哪月
          
            }
        },
  methods: {
    //获取学生id
      // $('.el-button-group .el-button:first-child').click(function(){

      // })
    getadata_student(a) {
      let student_name = this.tableData.filter(item => item.id == a);
      if (student_name.length !== 0) {
        this.show_student = student_name[0].username
          ? student_name[0].username + "的课表"
          : "";
      } else {
        this.show_student = "";
      }
      this.parms_daily.student_id = a;
      this.parms_info.student_id = a;
      //课堂日历
      this.$apis.students.student_course_count(this.parms_daily).then(res => {
        if (res.data.code == 1) {
          this.count_data = res.data.data;
        }
      });
      //课时详情
      this.$apis.students.student_course_info(this.parms_info).then(res => {
        if (res.data.code == 1) {
          this.info_data = res.data.data;
        }
      });
    },
    click_daily(a) {
      //点击日历之后
      this.this_data = a;

      this.parms_info.begin_time = startTime(a);
      function startTime(time) {
        const nowTimeDate = new Date(time);
        let start_time = nowTimeDate.setHours(0, 0, 0, 0);
        return start_time.toString().slice(0, 10);
      }

      this.parms_info.end_time = endTime(a);
      function endTime(time) {
        const nowTimeDate = new Date(time);
        let end_time = nowTimeDate.setHours(23, 59, 59, 999);
        return end_time.toString().slice(0, 10);
      }
      //课时详情
      this.$apis.students.student_course_info(this.parms_info).then(res => {
        if (res.data.code == 1) {
          this.info_data = res.data.data;
        }
      });
      // console.log(a)
    },

    handleSelected(day) {
      // this.parms_daily1.filter(item=>
      //   item.day==day*1
      // )
      let flag = 0; //默认显示为0
      if (this.count_data.length > 0) {
        this.count_data.forEach(item => {
          if (item.day == day) {
            flag = item.number;
            return;
          }
        });
      }

      return flag;
    },
    get_starttime() {
      this.parms.start_time =
        this.change_start_time.toString().slice(0, 10) * 1;
      this.getdata();
    },
    get_endtime() {
      this.parms.end_time = this.change_end_time.toString().slice(0, 9) * 1;
      this.getdata();
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
      var menu = this.rolemenu.forEach((item, index, array) => {
        //遍历菜单
        if (item.menu_name == "学员管理") {
          //有子集
          for (let j = 0; j < item.children.length; j++) {
            //遍历子集
            var a = item.children.filter(function(item) {
              return item.menu_url == "/StudentsList";
            });
            this.thisMenu = a[0].children;

            return a;
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
            query: { search: b.username, id: b.id }
          });

          break;
        case "copy_url": //复制链接
          this.dialogFormVisible1 = true;
          break;
        case "outDialog": //查看排课
          this.getadata_student(b.id);
          this.dis_class = true;
          break;
        case "plan_class": //跳转排课
          if (b.learnmoney > 0) {
            this.$router.push({
              path: "/StudentsList/ApplicationAdd",
              query: { username: b.username, allMoney: b.learnmoney }
            });
          } else {
            this.$message({
              type: "warning",
              message: "账户余额不足"
            });
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
  background-color: #8896b5 !important;
  color: white;
}
#outDialog {
  background-color: #607d8b;
  color: white;
}
#plan_class {
  background-color: #7571fa !important;
  color: white;
}
.class_dia {
  width: 100%;
  display: grid;
  grid-template-columns: 68% 32%;
  align-items: center;
  justify-content: space-around;
}
.class_dia_div {
  width: 220px;
  margin-left: 20px;
  height: 400px;
  overflow-y: auto;
  /* scroll-y:auto; */
}
.is-change {
  background-color: orange;
  color: white;
}
.class_dia_div /deep/ .el-timeline-item__node--large {
  left: 6px;
  height: 20px;
  width: 20px;
}
.class_dia_div /deep/ .el-timeline-item__tail {
  left: 10px;
}
.class_dia_div /deep/ .el-timeline-item__icon {
  font-size: 20px;
}
.class_dia_div /deep/ .el-timeline-item__node--normal {
  left: 5px;
}
.class_dia /deep/ .el-calendar-table .el-calendar-day {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 8px;
  height: 52px;
}
.el-calendar {
  width: 550px !important;
  height: 450px !important;
  border: 1px silver solid;
}
li {
  list-style: none;
}
.class_dia_div h3 {
  position: absolute;
  top: 75px;
  right: 100px;
}
</style>