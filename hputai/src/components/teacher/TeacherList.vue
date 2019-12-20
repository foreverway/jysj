` <template>
  <div class="so_main">
    <zx-head title="教师列表"></zx-head>

    <div class="so_main_left">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-input
          class="so_input"
          clearable
          v-model="form.search"
          @input="getadata"
          placeholder="请输入搜索内容"
        ></el-input>

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
      <el-table-column align="center" prop="part_time" label="类型"></el-table-column>

      <el-table-column align="center" label="推荐等级" prop="teacher_rate" width="180px" sortable>
        <template slot-scope="scope" >
          <el-rate v-model="scope.row.teacher_rate*1" disabled text-color="#ff9900"></el-rate>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="eval_average" label="综合评分"  width="180px" sortable>
        <template slot-scope="scope">
          <el-rate v-model="scope.row.eval_average*1"  disabled text-color="#ff9900"></el-rate>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="teach_subjects" label="科目"></el-table-column>
      <el-table-column align="center" prop="studying" label="在读学员"></el-table-column>
      <el-table-column align="center" prop="haved_hour" label="已上课时"></el-table-column>
      <el-table-column align="center" prop="waiting_hour" label="待上课时"></el-table-column>
      <el-table-column align="center" label="操作" fixed="right" width="350px">
        <template slot-scope="scope">
          <span
            v-for="(item,index) in rolemenu[2].children[0].children"
            style="margin:0 5px;"
            :key="index"
          >
            <el-button
              size="mini"
              index="item.id"
              @click="teacherAction(item.menu_action,scope.row,scope.$index,tableData)"
            >{{item.menu_name}}</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 老师信息的详情 -->
    <el-dialog title="老师详情" :close-on-click-modal="false" :visible.sync="teacher_info" width="50%">
      <el-form label-width="100px" :model="editTeacher">
        <el-form-item label="讲师姓名">
          <p>{{editTeacher.id?editTeacher.id:'暂无记录'}}</p>
        </el-form-item>
        <el-form-item label="上课记录">
          <p>{{editTeacher.id?editTeacher.id:'暂无记录'}}</p>
        </el-form-item>
        <el-form-item label="课酬发放记录">
          <p>{{editTeacher.id?editTeacher.id:'暂无记录'}}</p>
        </el-form-item>
        <el-form-item label="教授学生">
          <p>{{editTeacher.id?editTeacher.id:'暂无记录'}}</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="teacher_info = false">取 消</el-button>
        <el-button type="primary" @click="teacher_info = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <p style="margin-top:30px"><span>累计金额：</span><span style="color:red">{{msg.data.givenamount}}</span></p> -->
    <!-- <el-button type="primary" @click="ifinputselect" style="margin-top:20px">审核</el-button> -->
    <!-- 教师课酬设置 -->
    <el-dialog
      :close-on-click-modal="false"
      title="教师课酬设置"
      :visible.sync="centerDialogVisible_salary"
      width="70%"
    >
      <el-form label-width="100px" :model="teacher_salary_data">
        <el-form-item label="讲师姓名">
          <p>{{teacher_name}}</p>
        </el-form-item>
        <el-form-item label="选择科目">
          <el-cascader
            ref="cascader"
            v-model="value_suj"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            :show-all-levels="false"
            filterable
            clearable
            @change="handleChange_1"
            @getCheckedNodes="getMore()"
          ></el-cascader>
        </el-form-item>
        <el-form-item :inline="true" label="课酬标准">
          <el-table :data="table.tableData" style="width: 100%">
            <el-table-column
              v-for="(col,colIndex) in table.tableHead"
              :prop="col.name"
              :label="col.label"
              :key="colIndex"
            >
              <template slot-scope="scope">
                <el-input v-if="col.type == 'input'" v-model="scope.row[col.name]"></el-input>
                <el-select
                  v-if="col.type == 'select'"
                  v-model="scope.row[col.name]"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options_line"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <span v-if="col.type == 'string'">{{scope.row[col.name]}}</span>
                <el-button
                  v-if="col.type == 'button'"
                  @click.native.prevent="deleteRow(scope.$index, table.tableData)"
                  type="text"
                  size="small"
                >移除</el-button>
                <!-- 如果是button或者select就再判断 -->
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible_salary = false">取 消</el-button>
        <el-button type="primary" @click="postSalary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <el-dialog :close-on-click-modal="false" title="编辑教师" :visible.sync="editDialog" width="50%">
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
          <el-input v-if="editTeacher.teach_subjects" v-model="editTeacher.teach_subjects"></el-input>
          <p v-if="!editTeacher.teach_subjects">请选择科目</p>
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
          <el-radio-group v-model="editTeacher.part_time">
            <el-radio :label="1">全职</el-radio>
            <el-radio :label="2">兼职</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排课时间">
          <el-input type="textarea" v-model="editTeacher.can_class"></el-input>
        </el-form-item>
        <el-form-item label="合同到期">
          <el-date-picker
            v-model="editTeacher.expiredate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择你的时间"
          ></el-date-picker>
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
            ref="upload"
            action
            multiple
            accept=".pdf, .PDF, .doc, .dot, .docx, .dotx, .xls, .ppt, .png, .jpg"
            :on-change="handlePreview"
            :file-list="editTeacher.files"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <img :src="form.src_img" alt />
            <div slot="tip" class="el-upload__tip">用户素材列表显示,只能上传jpg/png文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="推荐等级">
          <el-rate v-model="editTeacher.teacher_rate" show-text></el-rate>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">提交</el-button>
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
      ></el-pagination>
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      value_suj: [], //选择科目
      value_line: "", //选择线上线下
      options_line: [{ value: 1, label: "线上" }, { value: 2, label: "线下" }],
      tableData: [],
      editableTabs_1: "", //添加科目的详情
      form: {
        search: "", //搜索老师条件
        page: 1, //页码
        teacher_id: "", //教师id,
        start_time: "",
        end_time: ""
      },
      options: [], //课程名称的数据
      options_: [], //总数据的数据
      // address:this.region_list,//地址的数据
      region: [], //改造后的城市列表
      msg: {},
      centerDialogVisible_salary: false, //入扣款弹窗
      editDialog: false, //编辑教师弹窗
      teacher_info: false,
      // teacher: [
      editTeacher: {
        //编辑老师的信息
        part_time: "", //类型,
        teach_subjects: "", //所授科目
        can_class: "", //排课时间
        address: "", //城市
        expiredate: "", //	合同到期
        introduction: "", //	教育简介
        bank_number: "",
        bank_name: "",
        bank_open: "",
        files: [],
        teacher_id: "",
        teacher_rate: 5
      },
      // ],//根据科目生成的教师数据
      table: {
        tableData: [],
        tableHead: [
          {
            name: "subject_name",
            label: "科目",
            type: "string"
          },
          {
            name: "online_type",
            label: "线上/线下",
            type: "select"
          },
          {
            name: "one_to_one",
            label: "一对一",
            type: "input"
          },
          {
            name: "small_class",
            label: "小班",
            type: "input"
          },
          {
            name: "big_class",
            label: "大班",
            type: "input"
          },
          {
            name: "address",
            label: "操作",
            type: "button"
          }
        ]
      },
      this_subject: "", //当前选择的科目
      fileList: [], //上传文件所需
      arr: [], //选择科目的数组
      // temp:null, //上传文件所需
      teacher_name: "",
      teacher_salary_data: {}, //教师课酬
      rules: {
        title: [{ required: true, message: "请输入标题名称", trigger: "blur" }],
        turn_url: [{ required: true, message: "请输链接地址", trigger: "blur" }]
      },
      fileName: "",
      teacher_id: "" //当前老师的id
    };
  },
  created() {
    this.$apis.students.getuilcode();
    this.getadata();
    this.getSubjectList();
  },
  computed: mapState(["rolemenu", "region_list"]),
  methods: {
    //序号排列
    teacherAction(a, b, c, d) {
      switch (a) {
        case "teacher_edit":
          this.editDialog = true;
          this.this_subject = "";
          this.$apis.common
            .teacher_edit_get({ teacher_id: b.teacher_id })
            .then(res => {
              if (res.data.code == 1) {
                this.editTeacher = res.data.data;
                if (this.editTeacher.address) {
                  this.editTeacher.address = res.data.data.address.split(",");
                }

                this.editTeacher.teacher_id = b.teacher_id * 1;
                //  this.editTeacher.part_time=res.data.data.part_time

                this.teacher_id = b.teacher_id;

                this.editTeacher.files = [];
              }
            });
          this.teacher_name = b.teacher_name;
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
        case "teacher_info": //查看老师信息
          this.teacher_info = true;
          break;
        case "teacher_salary":
          this.teacher_id = b.teacher_id;
          let params = {
            teacher_id: b.teacher_id
          };
          this.centerDialogVisible_salary = true;
          this.$apis.common.teacher_dollars_get(params).then(res => {
            if (res.data.code == 1) {
  
              this.teacher_name = b.teacher_name;
              if (
                Object.prototype.toString.call(res.data.data).substr(8, 5) ==
                "Objec"
              ) {
                this.table.tableData = [];
              } else {
                this.table.tableData = res.data.data;
              }
            }
          });
          break;
        case "teacher_delete":
          this.$confirm("此记录将会永久删除, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              d.splice(c, 1);
              this.$message({
                message: "删除成功",
                type: "success"
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });

          break;
      }
    },
    deleteName(arr) {
      //选我需要的数组
      let dollars_arr = [];
      arr.forEach(function(item, index, arr) {
        dollars_arr.push({
          big_class: item.big_class,
          one_to_one: item.one_to_one,
          online_type: item.online_type,
          small_class: item.small_class,
          subject_id: item.subject_id
        });
      });
      return dollars_arr;
    },
    postSalary() {
      //dollars_arr

      let params = {
        teacher_id: this.teacher_id,
        dollars_arr: this.deleteName(this.table.tableData)
      };
      this.$apis.common.teacher_dollars_post(params).then(res => {
        if (res.data && res.data.code == 1) {
          this.centerDialogVisible_salary = false;
          this.$message({
            message: "操作成功",
            type: "success"
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    handlePreview(file) {
      //选择提交文件的函数
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        let _base64 = reader.result;
        let ba = _base64.split(",");
        //  this.form.src_img=_base64
        this.editTeacher.files.push(_base64);
      };
    },
    submitUpload() {
      this.$apis.common.teacher_edit_put(this.editTeacher).then(res => {
        //debugger
        if (res.data && res.data.code == 1) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1500
          });
          this.editDialog = false;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // submitEdit() {  //提交编辑
    //   console.log(this.editTeacher);
    //   this.$apis.common.teacher_edit_put(this.editTeacher).then(res => {
    //     if (res.data.code == 1) {
    //       this.editDialog = false;
    //       this.$message({
    //         type: "success",
    //         message: "上传成功"
    //       });
    //       this.editDialog = true
    //     } else {
    //       this.$message({
    //         type: "success",
    //         message: res.data.msg
    //       });
    //     }
    //   });
    // },
    deleteRow(index, rows) {
      //删除那一列
      rows.splice(index, 1);
    },
    getSubjectList() {
      let parms = {
        admin_id: this.getdataCookie("admin_id")
      };
      //获取科目的数据
      this.$apis.common.subject_list().then(res => {
        if (res.data.code == 1) {
          this.msg = res.data;
          this.options_ = res.data.data;
          let addWord = arr => {
            arr.forEach(item => {
              (item.value = item.subject_name),
                (item.label = item.subject_name);
              if (item.children instanceof Array) {
                addWord(item.children);
              }
            });
          };
          addWord(this.options_);
          this.options = this.options_;
        }
      });
    },
    choose_suj(targetName) {
      //科目赋值
      var lastName =
        targetName.length == 1
          ? targetName[0]
          : targetName.length == 2
          ? targetName[1]
          : targetName[2];

      this.arr = this.editTeacher.teach_subjects
        ? this.editTeacher.teach_subjects.split(",")
        : [];
      this.arr.push(lastName);
      this.editTeacher.teach_subjects = this.arr.toString();
    },
    choose_city(targetName) {
      //城市赋值
      if (targetName) {
        this.editTeacher.address = targetName.toString();
      }
    },
    getMore(result) {
      console.log(result);
    },
    //选择报读科目的函数
    handleChange_1(targetName) {
      //      var obj = {}
      //      //此处为借鉴源码里面的方法，执行清除
      // obj.stopPropagation = () =>{}
      // try{
      //     this.$refs.cascader.clearValue(obj)//旧方法
      // }catch(err){
      //     this.$refs.cascader.handleClear(obj)//新版本
      // }
      //this.$refs.cascader.clearValue(obj)

      var lastName =
        targetName.length == 1
          ? targetName[0]
          : targetName.length == 2
          ? targetName[1]
          : targetName[2];
      //判断标题
      let result = [];
      let oneArr = arr => {
        arr.forEach(item => {
          result.push({ value: item.id, label: item.subject_name });
          if (item.children instanceof Array) {
            oneArr(item.children);
          }
        });
      };
      oneArr(this.options_);
      var needArr = result.find((item, index, arr) => {
        return item.label == lastName;
      });
      this.table.tableData.push({
        subject_id: needArr.value,
        subject_name: needArr.label,
        online_type: 1,
        one_to_one: 0,
        small_class: 0, //课程类型
        big_class: 0 //课程id
      });
      this.value_suj = [];
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
          console.log(this.tableData);
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
p {
  padding: 0 10px;
}
</style>
