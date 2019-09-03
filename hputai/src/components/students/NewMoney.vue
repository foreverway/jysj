<template>
<div class="so_main">
  <h3>现金钱包</h3>
<div class="so_main_left">

 <el-form :inline="true" :model="form" class="demo-form-inline">
<el-input class="so_input" v-model="form.search" @input="getadata" placeholder="请输入用户名"></el-input>
<el-button type="primary" @click="getadata" style="margin-left:5px">搜索</el-button>

 <el-date-picker style="margin-left:60px"
      v-model="form.start_time"  @change="getadata"
      type="datetime" clearable
       value-format="yyyy-MM-dd H:mm:ss"
      placeholder="选择日期时间">
    </el-date-picker>
    至
         <el-date-picker  @change="getadata"
      v-model="form.end_time"
      type="datetime" clearable
       value-format="yyyy-MM-dd H:mm:ss"
      placeholder="选择日期时间">
    </el-date-picker>
 </el-form>

  </div>


  <!-- 表格数据 -->
 <el-table  :header-cell-style="{background:'#f4f4f4'}"
   ref="multipleTable"
      border
    :data="tableData"  
    style="width: 100%">

       <el-table-column label="序号"
      type="index"  width="80" align="center"
      :index="indexMethod">
    </el-table-column>
    
         <el-table-column align="center"
      label="学员账号"
      >
      <template slot-scope="scope">
      
        <span >{{ scope.row.username }}</span>
      </template>
    </el-table-column>
   
       <el-table-column align="center" label="金额">
      <template slot-scope="scope">
        <span v-if="scope.row.type==2" style="color:green">-{{ scope.row.price }}</span>
          <span v-if="scope.row.type==1" style="color:red">+{{ scope.row.price }}</span>
      </template>
    </el-table-column>
   <el-table-column align="center" label="充值方式">
      <template slot-scope="scope">
        <span >{{ scope.row.rechargetype }}</span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="事由">
      <template slot-scope="scope">
        <span >{{ scope.row.reason }}</span>
      </template>
    </el-table-column>
       <el-table-column align="center" label="充值时间">
      <template slot-scope="scope">
        <span >{{ scope.row.addtime }}</span>
      </template>
    </el-table-column>




  </el-table>
<!-- <p style="margin-top:30px"><span>累计金额：</span><span style="color:red">{{msg.data.givenamount}}</span></p> -->
   <!-- <el-button type="primary" @click="ifinputselect" style="margin-top:20px">审核</el-button> -->

<el-pagination style="float:right;margin-top:20px;margin-bottom: 20px;"
  background
  layout="prev, pager, next"
     @prev-click="prev"
  @next-click="next"
  @current-change="current"
   page-size=10
  :total="msg.data.count">
</el-pagination>

</div>
 
</template>

<script>
  export default {
    data() {
      return {
      tableData:'',
       form:{ 
         search:'',//搜索学员姓名条件
         page:1,//页码
          start_time:'',//搜索开始时间
           end_time:'',//搜索结束时间
            uid:'',//如果有uid,查询该用户的记录
       },
       form1:{  // 入款和扣款
          amount:'' ,//金额
           reason:'', //理由
            uname:'',//学生姓名
             type:'' ,//入款还是扣款，1入款，2扣款
       },
         msg:'',
        dialogFormVisible1:false,//入扣款弹窗

      }
    },
      created () {
         this$apis.students.getuilcode()
      this.getadata()
    },
    methods: {
     //序号排列
      indexMethod(index) {
            if(this.form.page==1){
              return  (index+1) 
            }else{
                    let page=(this.form.page-1)*10+1
           
              return index+page
            }
      },

       current(num){//当前页数
this.form.page=num
this.getadata()
      },
      next(){
        this.form.page++
        this.getadata()
      },
      prev(){ //上一页
if(this.form.page>1){
  this.form.page--
  this.getadata()
}        
      },
      postfun(){
       
       this$apis.students.wallet_balance(this.form1).then(res => {
         if(res.data.code==1){
           let fuhao=this.form1.type==1?'+':'-'
 this.$message({
          message: this.form1.uname+'操作成功'+fuhao+this.form1.amount +'元',
          type: 'success'
        });
this.getadata()
         }else{
            this.$message.error(res.data.msg);      
         }
 })
                
      },
        getadata(){
            this$apis.students.cash_list(this.form).then(res => {
              if(res.data.code==1){
                   this.msg=res.data
               this.tableData = res.data.data.list
               console.log(this.tableData)
              }
              
                })
        }
    }
  }
</script>
<style scoped>
.so_input{
  width: 300px;
  margin-bottom: 20px;
}
.so_main_left{float: left;margin-top: 15px}

</style>
