<template>
  <div class="main">
    <zx-head title="排课需求"></zx-head>

    <el-input
      placeholder="请输入搜索内容"
      v-model="parms.search"
      @input="getdata"
      clearable
      style="width:300px"
    ></el-input>

    <el-cascader
      placeholder="输入添加人姓名"
      v-model="value"
      :options="options"
      clearable
      filterable
      @change="showAdviser"
    ></el-cascader>
    <el-select v-model="parms.app_status" clearable @change="getdata" placeholder="请选择状态">
      <el-option
        v-for="item in options_status"
        :key="item.value_status"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-select v-model="parms.curriculum_type" clearable @change="getdata" placeholder="课程性质">
      <el-option
        v-for="item in options_type"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
        <el-select v-model="parms.examine_id" clearable @change="getdata" placeholder="选择审核人">
      <el-option
        v-for="item in jiaowu_list"
        :key="item.id"
        :label="item.jiaowu_name"
        :value="item.id"
      ></el-option>
    </el-select>
    <el-button type="primary" style="background-color:#e6563a; border:none;" @click="getdata">搜索</el-button>
    <router-link to="/StudentsList/ApplicationAdd">
      <!-- <el-button type="primary" style="float:right;background-color:#e6563a; border:none;">新建报名需求</el-button> -->
    </router-link>
    <el-table
      border
      align="center"
      :cell-class-name="tableRowClassName"
      :data="tableData"
      :header-cell-style="{background:'#f4f4f4'}"
      style="width: 100%;margin:20px auto"
    >
      <el-table-column type="index" label="序号" width="50" :index="indexMethod"></el-table-column>
      <!-- <el-table-column label="序号" prop="index" width="50"></el-table-column> -->
      <el-table-column prop="number" label="编号"></el-table-column>
      <el-table-column prop="title" label="排课需求"></el-table-column>
       <el-table-column prop="curriculum_type_name" label="课程性质"></el-table-column>
      <el-table-column prop="amount" label="金额"></el-table-column>
       <el-table-column prop="classhour" label="课时"></el-table-column>
      <!-- <el-table-column prop="expiry_date" label="课程有效期"></el-table-column> -->
      <el-table-column prop="student_name" label="报名学员" width="100"></el-table-column>
            <el-table-column prop="teacher_name" label="讲师" width="100"></el-table-column>

      <el-table-column prop="admin_name" label="添加者" width="100"></el-table-column>
      <el-table-column prop="examine_name" label="审核人"></el-table-column>
            <el-table-column prop="remarks" label="审核备注"></el-table-column>

      <el-table-column prop="addtime" label="添加时间"></el-table-column>
      <el-table-column prop="app_status" class="status_color" label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.app_status== '待审核'" style="color:rgb(245, 108, 108)">待审核</span>
          <span v-else-if="scope.row.app_status== '待排课'" style="color:rgb(230, 162, 60)">待排课</span>
          <span v-if="scope.row.app_status== '已排课待确认'" style="color:#009688">已排课待确认</span>
          <span v-else-if="scope.row.app_status== '已确认'" style="color:#303133">已确认</span>
          <span v-if="scope.row.app_status== '授课考勤中'" style="color:#409EFF">授课考勤中</span>
          <span v-else-if="scope.row.app_status== '已结课'" style="color:#67C23A">已结课</span>
          <el-popover
            placement="top-start"
            title="未通过原因:"
            width="200"
            trigger="hover"
            :content="scope.row.nopass_reasons"
          >
            <span
              v-if="scope.row.app_status== '审核不通过'"
              slot="reference"
              style="color:#f00;cursor:help;"
            >审核不通过</span>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column fixed="right" prop label="操作" width="220">
        <template slot-scope="scope">
          <!-- <span v-for="(item,index) in getRolenenu()" :key="index">
            <el-button
              type="button"
              size="mini"
              index="item.id"
              v-bind:id="item.menu_action"
              @click="mommonAction(item.menu_action,scope.row)"
            >{{item.menu_name}}</el-button>
          </span>-->
          <el-button
            id="click_edit"
            size="mini"
            v-show="checkMenu('click_edit')"
            @click="mommonAction('click_edit',scope.row)"
          >查看排课需求</el-button>
          <el-button
            id="click_test"
            v-show="checkMenu('click_test')"
            v-if="scope.row.app_status == '待审核' "
            size="mini"
            @click="mommonAction('click_test',scope.row)"
          >审核</el-button>
          <el-button
            id="click_sure"
            v-show="checkMenu('click_sure')"
            v-if="scope.row.app_status == '已排课待确认' &&scope.row.is_youConfirm==1"
            size="mini"
            @click="mommonAction('click_sure',scope.row)"
          >确认</el-button>
          <el-button
            id="click_delete"
            v-show="checkMenu('click_delete')"
            v-if="scope.row.app_status == '已排课待确认'||scope.row.app_status == '待排课'||scope.row.app_status == '待审核'||scope.row.app_status == '审核不通过'"
            size="mini"
            @click="mommonAction('click_delete',scope.row)"
          >删除</el-button>
          <el-button
            id="cilck_plan_class"
            v-show="checkMenu('cilck_plan_class')"
            v-if="scope.row.app_status == '待排课'"
            size="mini"
            @click="mommonAction('cilck_plan_class',scope.row)"
          >排课</el-button>
          <el-button
            id="click_fail_test"
            v-show="checkMenu('click_fail_test')"
            v-if="scope.row.app_status == '审核不通过'"
            size="mini"
            @click="mommonAction('click_fail_test',scope.row)"
          >编辑排课需求</el-button>
          <el-button
            id="click_plan_edit"
            v-show="checkMenu('click_plan_edit')"
            v-if="scope.row.app_status == '已排课待确认'"
            size="mini"
            @click="mommonAction('click_plan_edit',scope.row)"
          >编辑排课</el-button>
          <el-button
            id="click_see_plan"
            v-show="checkMenu('click_see_plan')"
            v-if="scope.row.app_status == '已结课'||scope.row.app_status == '授课考勤中'||scope.row.app_status == '已确认'||scope.row.app_status == '已排课待确认'"
            size="mini"
            @click="mommonAction('click_see_plan',scope.row)"
          >查看排课</el-button>
        </template>
        <!-- <router-link :to="'/SalelistEdit/'+ scope.row.id"> -->
        <!-- <template slot-scope="scope">
                <span  v-for="(item,index) in scope.row.btn" :key="index">
            {{scope.row.btn}}  
           <span  id="addBtn" v-html="item" ></span>
          </span>
        </template>-->
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- 审核意见 -->
    <el-dialog
      :close-on-click-modal="false"
      title="审核意见"
      :visible.sync="centerDialogVisible_shenghe"
      width="60%"
      center
    >
      <p>报名表详情</p>
      <el-form ref="form" label-width="120px">
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="参数:">
          <p>内容</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="编号:">
          <p>{{seeapplytable.number}}</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="报名表标题:">
          <p>{{seeapplytable.title?seeapplytable.title:"未安排"}}</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="栏目:">
          <p>{{seeapplytable.live_name?seeapplytable.live_name:"未安排"}}</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="科目:">
          <el-table
            :data="seeapplytable.subjects_data"
            style="border:1px solid silver;margin: 0; border-bottom:none;"
          >
            <el-table-column property="subject_name" label="科目"></el-table-column>
            <el-table-column property="classhour" label="课时"></el-table-column>
            <el-table-column property="amount" label="金额"></el-table-column>
            <el-table-column property="course_id" label="班课"></el-table-column>
            <el-table-column property="is_one" label="一对一"></el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="学生:">
          <el-table
            :data="seeapplytable.students_data"
            style="border:1px solid silver;margin: 0; border-bottom:none;"
          >
            <el-table-column property="student_name" label="学生姓名" width="100"></el-table-column>
            <el-table-column property="tel" label="手机" width="100"></el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="课程顾问:">
          <p>{{seeapplytable.guwen_name}}</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="课程有效期:">
          <p>{{seeapplytable.expiry_date}}</p>
        </el-form-item>
        <el-form-item
          style="border:1px solid silver;margin: 0; border-bottom:none;"
          label="优惠说明及备注:"
        >
          <p>{{seeapplytable.remarks}}</p>
        </el-form-item>
      </el-form>
      <!-- <p>排课需求详情</p> -->
      <el-form label-width="120px">
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="需求:">
          <p>无参数</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="上课地点:">
          <p>{{seeclassneeds.course_address}}</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="上课地址:">
          <p>{{seeclassneeds.address?seeclassneeds.address:"未安排"}}</p>
        </el-form-item>

        <!-- <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label>
          <p>{{seeclassneeds.need_one}}</p>
        </el-form-item>-->
        <el-form-item
          style="border:1px solid silver;margin: 0; border-bottom:none;background-color:silver;"
          label="需求一:"
        >
          <p>学生学习需求是什么？（零基础先修、同步辅导、巩固复习、强化冲刺）</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label>
          <p>{{seeclassneeds.need_two}}</p>
        </el-form-item>

        <el-form-item
          style="border:1px solid silver;margin: 0; border-bottom:none;background-color:silver;"
          label="需求二:"
        >
          <p>学生之前的学习经历和学习基础（之前在那里上的学？学习基础怎么样？）</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label>
          <p>{{seeclassneeds.need_one?seeclassneeds.need_one:'这里没有填写需求'}}</p>
        </el-form-item>
        <el-form-item
          style="border:1px solid silver;margin: 0; border-bottom:none;background-color:silver;"
          label="需求三:"
        >
          <p>学生希望跟什么样的老师学习？</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label>
          <p>{{seeclassneeds.need_three}}</p>
        </el-form-item>
        <el-form-item
          style="border:1px solid silver;margin: 0; border-bottom:none;background-color:silver;"
          label="需求四:"
        >
          <p>学生上课时间期限，可排课时间？（北京时间）每次课上几小时？</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; " label>
          <p >{{seeclassneeds.need_four}}</p>

        </el-form-item>
      </el-form>
      <div style="margin-top:10px;">
        <span style="display:inline-block;width:100px;">审核备注:</span>
        <el-input style="width:80%;" v-model="shenghe_value" placeholder="审核备注"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible_shenghe = false">取 消</el-button>
        <el-button type="primary" @click="tongguo(2)">审核不通过</el-button>
        <el-button type="success" @click="tongguo(1)">审核通过</el-button>
      </span>
    </el-dialog>

    <!-- 分页的设置 -->
    <span v-if="msg">
      <el-pagination
        style=" float: right;margin-bottom: 30px;"
        background
        layout="prev, pager, next"
        @prev-click="prev"
        @next-click="next"
        @current-change="current"
        :page-size="10"
        :total="msg.data.count"
      ></el-pagination>
    </span>
    <!-- 查看排课 -->
    <el-dialog
      :close-on-click-modal="false"
      title="查看排课"
      :visible.sync="dialogTableVisible_table"
      width="60%"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="标题:">
          <p>{{gridData.title}}</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="讲师:">
          <p>{{gridData.teacher_name?gridData.teacher_name:"未安排"}}</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="直播平台:">
          <p>{{gridData.live_name?gridData.live_name:"未安排"}}</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="班主任:">
          <p>{{gridData.banzhuren_name?gridData.banzhuren_name:"未安排"}}</p>
        </el-form-item>
        <!-- <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="助教老师:">
          <p>{{gridData.zhujiao_name?gridData.zhujiao_name:"未安排"}}</p>
        </el-form-item> -->
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="教务专员:">
          <p>{{gridData.jiaowu_name?gridData.jiaowu_name:"未安排"}}</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="课时:">
          <p>{{gridData.classhour}}</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="线上/线下:">
          <p>{{gridData.course_address}}</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="上课地址:">
          <p>{{gridData.address}}</p>
        </el-form-item>
        <el-form-item style="border:1px solid silver;margin: 0; border-bottom:none;" label="学生:">
          <el-table
            :data="gridData.students"
            style="border:1px solid silver;margin: 0; border-bottom:none;"
          >
            <el-table-column property="student_name" label="学生姓名"></el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item
          style="border:1px solid silver;border:1px solid silver;margin: 0; border-bottom:none;"
          label="排课"
        >
          <el-table
            :data="gridData_class"
            style="border:1px solid silver;margin: 0; border-bottom:none;"
          >
            <el-table-column property="classhour" label="课时"></el-table-column>
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
      app_id: "", //维持一个点击表的id
      tip_banzhuren: [], //弹出层班主任
      money: "", //设置充值金额
      dialogFormVisible1: false,
      centerDialogVisible_shenghe: false,
      // textarea: "", //审核的输入框
      // msg: "",
      thisMenu:[],
      is_pass: "", //审核意见
      banzhuren_list_new: [], //班主任数据
      banzhuren_live: "",
      moneymen_list_new: [], //教务专员
      moneymen_live: "",
      helpTeacher_list_new: [], //助教数据
      helpTeacher_live: "",
      parms: {
        search: "",
        examine_id:'',
        page: 1,
        app_status: "",
        add_admin_id: "" ,//选择的
        curriculum_type:'',//课程性质
      },
      tableData: [],
      options: [],
      options_all: [], //顾问的所有数据
      value: "", //选定的顾问
      adviserList: "", //选定顾问的信息
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
      dialogTableVisible_table: "", //点击查看排课
      gridData: {}, //查看排课的数据
      gridData_class: [], //排课的数组
      seeapplytable: {}, //报名表数据
      seeclassneeds: {}, //弹出排课需求数据
jiaowu_list:[],
      dialogTableVisible_table: false,
      shenghe_value: "", //审核的输入框
      msg: "",
      options_type:[
             {
          value: 0,
          label: "全部"
        },     {
          value: 1,
          label: "正课"
        },     {
          value: 2,
          label: "试听"
        },
      ],
      options_status: [
        {
          value: 0,
          label: "待审核"
        },
        {
          value: 1,
          label: "待排课"
        },
        {
          value: 2,
          label: "已排课待确认"
        },
        {
          value: 3,
          label: "已确认"
        },
        {
          value: 4,
          label: "已授课考勤中"
        },
        {
          value: 5,
          label: "已结课"
        },
        {
          value: -1,
          label: "审核不通过"
        }
      ]
    };
  },
  created() {
    this.getdata();
    this.getAdviser();
    this.getRolenenu();
    this.getShenghe()
    let params = {
      admin_id: this.getdataCookie("admin_id")
    }; //
    this.get_banzhuren_list({
      //获取班主任列表
      url: "/api/api_banzhuren_list",
      params
    });
    //     this.get_banzhuren_list({
    //   //获取审核人列表
    //   url: "/api/api_banzhuren_list",
    //   params
    // });
    this.get_live_list({
      //获取直播列表
      url: "/api/api_live_list",
      params
    });
    //this.searchAdviser()
  },
  // computed: mapState([
  //   "live_list",
  //   "banzhuren_list",
  //   "teacher_data",
  //   "zhujiao_data",
  //   "jiaowu_data",
  //   "rolemenu",
  //   "application",
  //   "needs"
  // ]),
  // ...mapState()
  updated() {
    mapState(["banzhuren_list"]);
    // this.getbanzhurenName();
  },
  computed: {
    html() {
      return "<button></button >";
    },
    ...mapState([
      "live_list",
      "banzhuren_list",
      "teacher_data",
      "zhujiao_data",
      "jiaowu_data",
      "rolemenu",
      "application",
      "needs"
    ])
  },
  mounted() {},
  watch: {},
  methods: {
       //序号排列
    indexMethod(index) {
      if (this.parms.page == 1) {
        return index + 1;
      } else {
        let page = (this.parms.page - 1) * 10 + 1;
        return index + page;
      }
    },
    getShenghe(){
       this.$apis.common.jiaowu_data().then(res => {
         this.jiaowu_list=res.data.data.list
       })
    },
    tongguo(num) {
      let shenghe = {
        app_id: this.app_id,
        banzhuren_id: this.banzhuren_live[0],
        jiaowu_id: this.moneymen_live[0],
        zhujiao_id: this.helpTeacher_live[0],
        is_pass: num,
        remarks: this.shenghe_value
      };
      this.$apis.common.application_audit(shenghe).then(res => {
        if (res.data.code == 1) {
          if (num == 1) {
            this.$message({
              type: "success",
              message: "已通过审核"
            });
            this.centerDialogVisible_shenghe = false;
            this.getdata();
          } else {
            this.$message({
              type: "warning",
              message: " 已审核为不通过"
            });
            this.centerDialogVisible_shenghe = false;

            this.getdata();
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //用于分页的一些设置
    current(num) {
      //当前页数
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
      "get_application",
      "get_needs",
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
        this.helpTeacher_list_new.push({
          value: val.id,
          label: val.zhujiao_name
        });
      }
      for (let i = 0; i < this.jiaowu_data.length; i++) {
        var val = this.jiaowu_data[i];
        this.moneymen_list_new.push({ value: val.id, label: val.jiaowu_name });
      }
    },

    mommonAction(a, b) {
      switch (
        a //查看排课需求
      ) {
        case "click_edit":
          this.$router.push({
            path: "/ApplyNeedsList/ApplicationEdit",
            query: { id: b.id }
          });
          break;
        case "click_test": //审核
          if (b.app_status == "待审核") {
            this.centerDialogVisible_shenghe = true;
            let params = {
              app_id: b.id
            };
            // this.get_application({
            //   //查看报名表数据
            //   params,
            //   url: "/api/api_get_application"
            // });
            this.$apis.common.get_application(params).then(res=>{
              if(res.data.code==1){
this.seeapplytable =res.data.data
              }
            })
                        this.$apis.common.get_needs(params).then(res=>{
              if(res.data.code==1){
  this.seeclassneeds =res.data.data
              }
            })
            // this.get_needs({
            //   //查看排课需求
            //   params,
            //   url: "/api/api_get_needs"
            // });
            // mapState([
            //   "needs",
            //   "banzhuren_list",
            //   "zhujiao_data",
            //   "jiaowu_data",
            //   "application"
            // ]);
            // this.form1.app_id= b.id
            // this.seeclassneeds = this.needs;
            this.app_id = b.id;
            // this.seeapplytable = this.application;
            this.getbanzhurenName();
          } else {
            this.$message({
              message: "待审核状态时方可以审核",
              type: "warning"
            });
          }
          break;
        case "click_sure":
          if (b.app_status == "已排课待确认") {
            this.$confirm("确认课表后无法更改课表的信息, 是否确定?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                let parms = {
                  app_id: b.id
                };
    this.fullscreenLoading = true;
      const loading = this.$loading({
          lock: true,
          text: '稍等片刻，正在获取确认结果',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
            loading.close();
        }, 2000);
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
              })

              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消确定"
                });
              });
          } else {
            this.$message({
              message: "请按流程操作",
              type: "warning"
            });
          }
          break;

        case "click_delete":
          if (
            b.app_status == "待审核" ||
            b.app_status == "待排课" ||
            b.app_status == "已排课待确认"
          ) {
            this.$confirm("此操作将永久删除该需求, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
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
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消删除"
                });
              });
          } else {
            this.$message({
              message: "此时不能删除",
              type: "warning"
            });
          }
          break;

        case "cilck_plan_class":
          // 排课
          if (b.app_status == "待排课") {
            this.$router.push({
              path: "ApplyNeedsList/PlanClassAdd",
              query: { id: b.id }
            });
          } else {
            this.$message({
              type: "warning",
              message: "尚未审核，不能排课"
            });
          }
          break;
        case "click_fail_test":
          // 审核不通过
          if (b.app_status == "审核不通过") {
            this.$router.push({
              path: "/StudentsList/application_edit_copy",
              query: { id: b.id }
            });
          } else {
            this.$message({
              type: "warning",
              message: "只有审核不通过时才可编辑"
            });
          }
          break;

        case "click_plan_edit": //编辑排课
          if (b.app_status == "已排课待确认") {
            this.$router.push({
              path: "ApplyNeedsList/ClassEdit",
              query: { id: b.id }
            });
          } else {
            this.$message({
              message: "只有已排课待确认时才可以操作",
              type: "warning"
            });
          }
          break;

        case "click_see_plan": //查看排课
          if (
            b.app_status == "已排课待确认" ||
            b.app_status == "已确认" ||
            b.app_status == "授课考勤中" ||
            b.app_status == "已结课"
          ) {
            this.dialogTableVisible_table = true;
            let parms = {
              app_id: b.id
            };
            this.$apis.menber.look_arrange(parms).then(res => {
              if (res.data.code == 1) {
                this.gridData = res.data.data;
                this.gridData_class = res.data.data.course_data;
              }
            });
          } else {
            this.$message({
              message: "还不能查看",
              type: "warning"
            });
          }

          break;
      }
    },
    getRolenenu() {
           var menu= this.rolemenu.forEach((item, index, array) => {
        //遍历菜单
        if (item.menu_name=="操作管理") {
          //有子集
          for (let j = 0; j < item.children.length; j++) {
            //遍历子集
            var a = item.children.filter(function(item) {
              return item.menu_url == "/ApplyNeedsList";
            });
          this.thisMenu=a[0].children        
          return a

          }
        } 
      });

    },
    checkMenu(a) {
      let hereObj = this.thisMenu.find(item => {
        return item.menu_action == a;
      });
      if (hereObj) {
        return true;
      } else {
        return false;
      }
    },
    // submit_think() {
    //   //提交审核意见
    // let shenghe = {
    //   app_id: this.app_id,
    //   banzhuren_id: this.banzhuren_live[0],
    //   jiaowu_id: this.moneymen_live[0],
    //   zhujiao_id: this.helpTeacher_live[0],
    //   is_pass: this.is_pass,
    //   remarks: this.textarea
    // };
    //   this.$apis.common.application_audit(shenghe).then(res => {
    //     if (res.data.code == 1) {
    //       location.reload();
    //       this.$message({
    //         message: "审核成功",
    //         type: "success"
    //       });
    //     }
    //   });
    //   this.centerDialogVisible_shenghe = false;
    // },
    handleSizeChange(val) {
      //分页每页多少条
      let parms = {
        admin_id: this.getdataCookie("admin_id"),
        page: val * 1
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
    handleCurrentChange(val) {
      //当前多少页
      console.log(`当前页: ${val}`, this.tableData.length);
    },
    //获取实收人adviser_list
    getAdviser() {
      let parms = {
        admin_id: this.getdataCookie("admin_id")
      };
      this.$apis.common
        .inpeople_list(parms)
        .then(res => {
          if (res.data.code == 1) {
            this.options_all = res.data.data.list;
            for (let i = 0; i < this.options_all.length; i++) {
              var val = this.options_all[i];
              this.options.push({ value: val.name, label: val.name });
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
        item => item.name == targetName
      );
      if (targetName.length == 0) {
        var parms = {
          // admin_id: this.getdataCookie("admin_id"),
          add_admin_id: ""
          //this.adviserList[0].id * 1 == "" ? "" : this.adviserList[0].id
        };
      } else {
        var parms = {
          add_admin_id: this.adviserList[0].id * 1
        };
      }
      this.$apis.common
        .application_list(parms)
        .then(res => {
          if (res.data.code == 1) {
            //this.msg = res.data;
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
      this.parms.admin_id = this.getdataCookie("admin_id");
      this.$apis.common
        .application_list(this.parms)
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

#click_edit {
  /* //编辑 */
  background-color: #3a8eff !important;
  color: white;
}
#click_test {
  /* //审核 */
  background-color: #ff8500 !important;
  color: white;
}
#click_plan_edit {
  /* //编辑排课 */
  background-color: #05d294 !important;
  color: white;
}
#click_sure {
  /* //确定 */
  background-color: #fe6249 !important;
  color: white;
}
#click_delete {
  /* //删除 */
  background-color: #e95150 !important;
  color: white;
}
#cilck_plan_class {
  /* //排课 */
  background-color: #2adbcb !important;
  color: white;
}
#click_see_plan {
  /* //查看排课 */
  background-color: #7571fa !important;
  color: white;
}
#click_fail_test {
  /* //查看排课 */
  background-color: #ecd81c !important;
  color: white;
}
</style>