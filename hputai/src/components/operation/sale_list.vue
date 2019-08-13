 <template>
 <div class="main">
  
 <div class="main_head">|&nbsp;销售进程管控表</div> 
<el-input placeholder="模糊搜索" v-model="parms.search" @input="getdata" clearable style="width:300px"></el-input> 

  
    <el-date-picker
      v-model="value2"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
  
  <el-button type="primary" >搜索</el-button>
 <router-link to="/Addsalepro">
  <el-button type="primary" style="float:right">新建销售情况列表</el-button>
 </router-link>

        <el-table 
        :data="tableData"
         :header-cell-style="{background:'#f4f4f4'}"
        style="margin-top:20px">
          <el-table-column label="序号"
      type="index"
      :index="indexMethod">
    </el-table-column>
        <el-table-column
            prop="dtime"
            label="日期"
           >
        </el-table-column>
        <el-table-column
            prop="week"
            label="周次"
           >
        </el-table-column>
        <el-table-column
            prop="follow_man"
            label="跟进人">
        </el-table-column>
           <el-table-column
            prop="team"
            label="	所属战队">
        </el-table-column>
           <el-table-column
            prop="team_leader"
            label="战队负责人">
        </el-table-column>
           <el-table-column
            prop="consultant"
            label="顾问">
        </el-table-column>
           <el-table-column
            prop="data_number"
            label="编号">
        </el-table-column>
           <el-table-column
            prop="data_student_name"
            label="学生姓名">
        </el-table-column>
           <el-table-column
            prop="data_tag"
            label="数据标签">
        </el-table-column>
           <el-table-column
            prop="m1"
            label="建立了有效联系 ">
        </el-table-column>
        <el-table-column
            prop="m2"
            label="了解客户情况">
        </el-table-column>
           <el-table-column
            prop="m3"
            label="明确数据需求">
        </el-table-column>
           <el-table-column
            prop="m4"
            label="建立信任">
        </el-table-column>
           <el-table-column
            prop="m5"
            label="规划">
        </el-table-column>
           <el-table-column
            prop="m6"
            label="试听">
        </el-table-column>
           <el-table-column
            prop="m7"
            label="缴费方案">
        </el-table-column>
           <el-table-column
            prop="advance_strategies"
            label="预收策略">
        </el-table-column>
           <el-table-column
            prop="advance_subject"
            label="预收科目">
              </el-table-column>
               <el-table-column
            prop="advance_amount"
            label="预收金额">
        </el-table-column>
           <el-table-column
            prop="feedback"
            label="客户反馈">
        </el-table-column>
           <el-table-column
            fixed="right"
            prop=""
            label="操作" width="140">
               <template slot-scope="scope">
                  <router-link :to="'/SalelistEdit/'+ scope.row.id">
        <el-button type="text" size="small">编辑 </el-button>
                  </router-link>
         <el-button @click="salepro_del(scope.row)" type="text" size="small">删除</el-button>
           <!-- <el-button type="text" size="small"  @click="dialogFormVisible1=1">复制链接</el-button> -->
           </template>
        </el-table-column>


        </el-table>
        <!-- 分页 -->
         <!-- <el-pagination style="margin-top:30px; float: right;margin-bottom: 30px;"
  background
  layout="prev, pager, next"
  @prev-click="prev"
  @next-click="next"
  @current-change="current"
  page-size=10
  :total="msg.data.count">
</el-pagination> -->
        <!-- 设置充值链接 -->
<el-dialog title="设置充值金额" :visible.sync="dialogFormVisible1" width="500px" close-on-click-modal="false" >


      <el-input  style="width:200px" v-model="money"  placeholder="请输入充值金额" ></el-input>
 <el-button type="primary" v-show="money>0" @click="dialogFormVisible1 = false,copyUrl( msg.data.recharge_url)">复制充值链接</el-button>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible1 = false,copyUrl( msg.data.recharge_url)">确 定</el-button>
  </div>
</el-dialog>
<!-- 设置充值链接 -->
         <div style="display:none" cols="20" id="biao1">{{copyurl1}}</div>
    </div>
  </template>

  <script>
    export default {
      data() {
        return {
           money:'',//设置充值金额
            dialogFormVisible1:false,
           copyurl1:'',
          msg:'',
          parms:{
            search:'',
            page:1,
          },
            tableData: '',
               pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: ''
        };
      },
      created () {
        this.getdata()
        // console.log( this.getdata())
      },
        mounted(){
          console.log(this.tableData)
      },
      methods: {
            //序号排列
      indexMethod(index) {
            if(this.parms.page==1){
              return  (index+1) 
            }else{
              let page=(this.parms.page-1)*10+1
              return index+page
            }
      },
      // 复制链接
      copyUrl(data){
 let url = data+'/'+this.money;
        let oInput = document.createElement('input');
        oInput.value = url;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象;
        console.log(oInput.value)
        document.execCommand("Copy"); // 执行浏览器复制命令
        this.$message({
          message: url +'已成功复制到剪切板',
          type: 'success'
        });
        this.money=''
        oInput.remove()
      },

      //删除用户
       salepro_del(row){
     this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let parms={
            id:row.id
          }
          this.$apis.common.salepro_del(parms).then(res => {
       
               if(res.data.code==1){
                  this.$message({
            type: 'success',
            message: row.username +' 已删除成功' 
          })
          this.getdata()
               }else{
                     this.$message.error( res.data.msg);
               }
                })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },

    getdataCookie (cname) {
    // return 1
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
    }
    this.$router.push({path:'/login'})
  },
  getdata(){
      let parms={
    admin_id:this.getdataCookie('admin_id')
  }
  this.$apis.common.salepro_list(parms).then(res=>{
    if(res.data.code==1){
      console.log(res.data.data)
     this.msg=res.data
      this.tableData=res.data.data.list
    }
  }).catch(() => {
          this.$message({
            type: 'info',
            message: '请求失败'
          });          
        });
},
      }
    }
  </script>
<style scoped>
     .main_head{
       margin:0 2;
       /* width: 1200px; */
       width: 96%;
       height:40px;
       font-size: 22px;
       font-weight: 900;
       /* line-height: 30px; */
     }
</style>