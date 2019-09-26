<template>
  <div class="so_main">
    <h3>教师列表</h3>
    <div class="so_main_left">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-input class="so_input" v-model="form.search" @input="getadata" placeholder="请输入用户名"></el-input>
        <el-button
          type="primary"
          @click="getadata"
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

    <!-- 表格数据 -->
    <el-table
      :header-cell-style="{background:'#f4f4f4'}"
      ref="multipleTable"
      border
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="序号" type="index" width="80" align="center" :index="indexMethod"></el-table-column>
      <el-table-column align="center" width="120" prop="teacher_name" label="教师姓名"></el-table-column>
      <el-table-column align="center" width="150" prop="tel" label="联系电话"></el-table-column>
      <el-table-column align="center"  prop="part_time" label="类型"></el-table-column>
      <el-table-column align="center" prop="teach_subjects" label="科目"></el-table-column>
      <el-table-column align="center"  prop="studying" label="在读学员"></el-table-column>
      <el-table-column align="center"  prop="haved_hour" label="已上课时"></el-table-column>
      <el-table-column align="center"  prop="waiting_hour" label="待上课时"></el-table-column>
      <el-table-column align="center" label="操作" fixed="right">
        <template slot-scope="scope">
          <span
            v-for="(item,index) in rolemenu[2].children[0].children"
            :key="index"
            style="display:inline-block;border:1px orange solid;margin:0 8px;border-radius:5px;padding:0 5px;"
          >
            <el-button
              type="text"
              size="medium"
              index="item.id"
              @click="teacherAction(item.menu_action,scope.row)"
            >{{item.menu_name}}</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- <p style="margin-top:30px"><span>累计金额：</span><span style="color:red">{{msg.data.givenamount}}</span></p> -->
    <!-- <el-button type="primary" @click="ifinputselect" style="margin-top:20px">审核</el-button> -->
    <!-- 教师课酬设置 -->
    <el-dialog title="教师课酬设置" :visible.sync="centerDialogVisible_salary" width="50%">
      <el-form label-width="100px" :model="teacher_salary_data">
        <el-form-item label="讲师姓名">
          <p>{{teacher_name}}</p>
        </el-form-item>
        <el-form-item label="选择科目">
          <el-cascader
            v-model="value_suj"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            :show-all-levels="false"
            @change="handleChange_1"
          ></el-cascader>
        </el-form-item>
        <el-form-item :inline="true" label="课酬标准">
    <el-table :data="table.tableData" style="width: 100%">
      <el-table-column v-for="(col,colIndex) in table.tableHead"  :prop="col.name" :label="col.label" :key="colIndex">
        <template slot-scope="scope">
          <el-input v-if="col.type == 'input'" v-model="scope.row[col.name]"></el-input>
          <template v-else>{{scope.row[col.name]}}</template>
          <!-- 如果是button或者select就再判断 -->
        </template>
      </el-table-column>
    </el-table>
          <!-- <el-table :data="teacher" style="width:100%">
            <el-table-column prop="subject_id" label="科目" ></el-table-column>
            <el-table-column prop="online_type" label="线上/线下">
               <el-cascader
            v-model="value_line"
            :options="options_line"
            :props="{ expandTrigger: 'hover' }"
            :show-all-levels="false"
            @change="handleChange_1"
          ></el-cascader>
            </el-table-column>
            <el-table-column prop="one_to_one" label="一对一" >
            </el-table-column>
            <el-table-column prop="small_class" label="小班" >
            </el-table-column>
            <el-table-column  label="大班" >
            </el-table-column>
            <el-table-column  label="操作">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, teacher)"
                  type="text"
                  size="small"
                >移除</el-button>
              </template>
            </el-table-column>
          </el-table> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible_salary = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible_salary = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹窗 -->
     <el-dialog title="教师信息" :visible.sync="editDialog" width="50%">
      <el-form label-width="100px" :model="editTeacher">
        <el-form-item label="讲师姓名">
          <p v-if="teacher_name">{{teacher_name}}</p>
          <p v-if="!teacher_name">暂无数据</p>
        </el-form-item>
        <el-form-item label="选择科目">
          <el-cascader
            v-model="this_subject"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            :show-all-levels="false"
            @change="choose_suj"

          ></el-cascader>
        </el-form-item>
          <el-form-item label="已选科目">
          <p  v-if="editTeacher.teach_subjects">{{editTeacher.teach_subjects.toString()}}</p>
           <p v-if="!editTeacher.teach_subjects">待选择..</p>
        </el-form-item>
         <el-form-item label="城市">
          <el-cascader
            v-model="editTeacher.address"
            :options="this.region"
            :props="{ expandTrigger: 'hover' }"
            :show-all-levels="false"
             @change="choose_city"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="类型">
            <el-radio v-model="editTeacher.part_time" label="1">全职</el-radio>
            <el-radio v-model="editTeacher.part_time" label="2">兼职</el-radio>
        </el-form-item>
        <el-form-item label="排课时间">
             <el-input type="textarea" v-model="editTeacher.can_class"></el-input>
        </el-form-item>
        <el-form-item label="合同到期">
          <el-date-picker
            v-model="editTeacher.expiredate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择你的时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="教育简介">
             <el-input type="textarea" v-model="editTeacher.introduction"></el-input>
        </el-form-item>
            <el-form-item label="银行账户">
              <el-input v-model="editTeacher.bank_number"></el-input>
            </el-form-item>
              <el-form-item label="银行户名">
              <el-input v-model="editTeacher.bank_name"></el-input>
            </el-form-item>
              <el-form-item label="开户行">
              <el-input v-model="editTeacher.bank_open"></el-input>
            </el-form-item>
              <el-form-item label="讲师简历">
              <el-upload 
                  class="upload-demo" 
                  action="www.anywey.com"    
                  :http-request="requestFile" 
                  accept=".pdf,.PDF,.doc,.dot,.docx,.dotx,.xls,.ppt,.png,.jpg" 
                  :limit="1"
                  list-type="picture"
                  :on-change="handlePreview"
                  :file-list="fileList"
                  :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              </el-upload>
            </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">提交</el-button>
      </span>
    </el-dialog>
    <span v-if="msg.data">
    <el-pagination
      style="float:right;margin-top:20px;margin-bottom: 20px;"
      background
      layout="prev, pager, next"
      @prev-click="prev"
      @next-click="next"
      @current-change="current"
      :page-size="10"
      :total="msg.data.count"
    ></el-pagination></span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
     value_suj:'', //选择科目
      value_line:'', //选择线上线下
      options_line:[{ value: 1, label: '线上' },{value: 2, label: '线下' }],
      tableData: [],
      editableTabs_1: "", //添加科目的详情
      form: {
        search: "", //搜索老师条件
        page: 1, //页码
        teacher_id: "" //教师id
      },
      options: [], //课程名称的数据
      options_: [], //总数据的数据
     // address:this.region_list,//地址的数据
      region:[],//改造后的城市列表
      msg: {},
      centerDialogVisible_salary: false, //入扣款弹窗
      editDialog: false, //编辑教师弹窗
      // teacher: [
        editTeacher:{      //编辑老师的信息
          part_time: '',//类型,
          teach_subjects: '',//所授科目
          can_class: '',  //排课时间
          address: '', //城市
          expiredate: "", //	合同到期
          introduction: "", //	教育简介
          bank_number:'',
          bank_name: "",
          bank_open: '',
          resume:'',
          teacher_id:'',

        },
      // ],//根据科目生成的教师数据
        	table: {
          	tableData: [
            //   {
            //   subject_id: '2016-05-02',
            //   online_type: '王小虎',
            //   one_to_one: '上海市普陀区金沙江路 1518 弄',
            //   small_class: '王小虎',
            //    big_class: '王小虎',
            //     address: '王小虎',
            // }
            ],
            tableHead: [{
            	name: 'subject_id',
              label: '科目',
              type: 'string'
            },{
            	name: 'online_type',
              label: '线上/线下',
              type: 'input'
            },{
            	name: 'one_to_one',
              label: '一对一',
              type: 'input'
            },{
            	name: 'small_class',
              label: '小班',
              type: 'input'
            },{
            	name: 'big_class',
              label: '大班',
              type: 'input'
            }
            ,{
            	name: 'address',
              label: '操作',
              type: 'button'
            }]
          },
          this_subject:"",//当前选择的科目
          fileList:[], //上传文件所需
          arr:[],//选择科目的数组
         // temp:null, //上传文件所需
      teacher_name: "",
      teacher_salary_data: {} ,//教师课酬
            rules: {
        title: [{ required: true, message: "请输入标题名称", trigger: "blur" }],
        turn_url: [{ required: true, message: "请输链接地址", trigger: "blur" }]
      }
    };
  },
  created() {
    this.$apis.students.getuilcode();
    this.getadata();
    this.getSubjectList();
  },
  computed: mapState(["rolemenu","region_list"]),
  methods: {
    //序号排列
    teacherAction(a, b) {
      switch (a) {
        case "teacher_edit":
          this.editDialog=true
          this.$apis.common.teacher_edit_get({teacher_id:b.teacher_id}).then(res=>{
            if(res.data.code==1){
              this.editTeacher=res.data.data
              this.editTeacher.teacher_id=b.teacher_id
              console.log(res.data.data)
            }
          })
         // console.log(b.teacher_id)
          
          console.log(this.editTeacher.teacher_id)
          this.teacher_name=b.teacher_name
          //console.log(b)
          //改造城市列表
                        for (let i = 0; i < this.region_list.length; i++) {
                var val = this.region_list[i];
                var children = [];
                if (val.children) {
                  for (let j = 0; j < val.children.length; j++) {
                    var val1 = val.children[j];
                    children.push({
                      value: val1.label,
                      label: val1.label
                    });
                  }
                  this.region.push({
                    value: val.label,
                    label: val.label,
                    children: children
                  });
                } else {
                  this.region.push({
                    value: val.label,
                    label: val.label
                  });
                }
              }
          break;
        case "teacher_info":
          //console.log(b);
          break;
        case "teacher_salary":
          let params = {
            teacher_id: b.teacher_id
          };
          this.centerDialogVisible_salary = true;
          this.$apis.common.teacher_dollars_get(params).then(res => {
            if (res.data.code == 1) {
              this.teacher_name = b.teacher_name;
              if(res.data.data instanceof Object){
                this.teacher = []
              }else{
                this.teacher=res.data.data
              }
            }
          });

          break;
        case "teacher_delete":
          console.log(b);
          break;
      }
    },
    //     handlePreview(file) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(file.raw);
    //   reader.onload = () => {
    //     let _base64 = reader.result;
    //     let ba = _base64.split(",");
    //     this.form.src_img = _base64;
    //   };
    // },
     handlePreview(file) {
          // this.temp.pdf_file = file.raw
          this.editTeacher.resume = file.raw

        },
        requestFile(param) {
          var fileObj = param.file
          //console.log(fileObj)
          this.file = fileObj
          var FileController = this.uploadUrl    // 接收上传文件的后台地址
          var form = new FormData()    // FormData 对象
          form.append('pdf_file', fileObj)    // 文件对象
          // form.append('xxx', 'xxx')    // 其他参数
          var xhr = new XMLHttpRequest()    // XMLHttpRequest 对象
          xhr.open('post', FileController, true)
          xhr.send(form)
          // console.log(form)
          // console.log(this.fileList)
        },
        submitEdit(){
          console.log(this.editTeacher)
          this.$apis.common.teacher_edit_put(this.editTeacher).then(res=>{
            if(res.data.code==1){
              this.editDialog = false
              this.$message({
                type:'success',
                message:"上传成功"
              })
            }else{
                this.$message({
                type:'success',
                message:res.data.msg
              })
            }
          })
        },
    deleteRow(index, rows) {
      //删除那一列
      rows.splice(index, 1);
    },
    getSubjectList(){
          let parms = {
            admin_id: this.getdataCookie("admin_id")
          };
          //获取科目的数据
          this.$apis.common.subject_list(parms).then(res => {
            if (res.data.code == 1) {
              this.msg = res.data;
              this.options_ = res.data.data;
              for (let i = 0; i < this.options_.length; i++) {
                var val = this.options_[i];
                var children = [];
                if (val.children) {
                  for (let j = 0; j < val.children.length; j++) {
                    var val1 = val.children[j];
                    children.push({
                      value: val1.subject_name,
                      label: val1.subject_name
                    });
                  }
                  this.options.push({
                    value: val.subject_name,
                    label: val.subject_name,
                    children: children
                  });
                } else {
                  this.options.push({
                    value: val.subject_name,
                    label: val.subject_name
                  });
                }
              }
            }
          });
    },
    choose_suj(targetName){
      var lastName = targetName.length == 1 ? targetName[0] : targetName[1];
      this.arr.push(lastName)
      this.editTeacher.teach_subjects=this.arr.toString()
      //科目赋值
    },
    choose_city(targetName){
      //城市赋值
      this.editTeacher.address=targetName.toString()
    },
    //选择报读科目的函数
    handleChange_1(targetName) {
      var lastName = targetName.length == 1 ? targetName[0] : targetName[1];
      //判断标题
      let oneArr = this.options_.filter(item => item.subject_name == lastName);
      if (oneArr.length == 0) {
        for (let i = 0; i < this.options_.length; i++) {
          var val = this.options_[i];
          if (val.children) {
            //如果有子元素
            var val_1 = val.children.filter(item => item);
            // if(val_1.length==1){
            let oneArr_1 = val_1.filter(item => item.subject_name == lastName); //对子元素进行赛选
            if (oneArr_1.length > 0) {
              //let newTabName = ++this.tabIndex_1 + "";
              this.table.tableData.push({
                subject_id: oneArr_1[0].subject_id,
                online_type: 1,
                one_to_one: 1000,
                small_class: "", //课程类型
                big_class: oneArr_1[0].id //课程id
              });
              // this.editableTabsValue_1 = newTabName;
            }
          }
        }
      } else {
        //没有子元素
        //let newTabName = ++this.tabIndex_1 + "";
        this.teacher.push({
          subject_id: lastName,
          online_type: 1,
          one_to_one: 1000,
          small_class: "", //课程类型
          big_class: oneArr[0].id //课程id
        });
        // this.editableTabsValue_1 = newTabName;
        // this.subject_id.push({student_id:checkOne[0].id})
      }
    },
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
      this.$apis.common.teacher_list_only(this.form).then(res => {
        if (res.data.code == 1) {
          this.msg = res.data;
          this.tableData = res.data.data.list;
        }
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
      // this.$router.push({path:'/login'})
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
  margin-top: 15px;
}
.add_ul p {
  list-style: none;
  display: inline-block;
  background-color: #fff;
  padding: 0;
  margin-right: -5px;
  width: 8%;
  border: 1px solid silver;
  text-align: center;
}
.add_ul_new p {
  list-style: none;
  display: inline-block;
  background-color: #fff;
  padding: 0;
  margin-right: -5px;
  width: 8%;
  border: 1px solid silver;
  text-align: center;
}
</style>
