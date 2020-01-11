<template>
<div class="so_main">
<div class="so_main_left">
 <el-input class="so_input" v-model="search" placeholder="请输入分享者姓名或手机号"></el-input>
<el-button type="primary" @click="searchs">搜索</el-button>
  </div>

  <!-- 表格数据 -->
 <el-table
    :data="tableData"
    style="width: 100%">
     <el-table-column
      label="序号ID"
      width="80">
      <template slot-scope="scope">
       
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>
      <el-table-column
      label="分享者姓名"
      width="180">
      <template slot-scope="scope">
     
        <span>{{ scope.row.username }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="手机号"
      width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.tel }}</span>
      </template>
    </el-table-column>
  
    <el-table-column
      label="成为分销时间"
      width="180">
      <template slot-scope="scope">
      
        <span>{{ scope.row.create_time}}</span>
      </template>
    </el-table-column>
   
   
    <el-table-column
      label="一级下线数量（人）"
      width="180">
      <template slot-scope="scope">
      
        <span>{{ scope.row.first_num }}</span>
      </template>
    </el-table-column>
      <el-table-column
      label="二级下线数量（人）"
      width="180">
      <template slot-scope="scope">
      
        <span>{{ scope.row.second_num }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">拉入黑名单</el-button>
      </template>
    </el-table-column>
  </el-table>

<el-pagination style="margin-top:30px"
  background
  layout="prev, pager, next"
   @prev-click="prev"
  @next-click="next"
  @current-change="current"
  :total="msg.data.count">
</el-pagination>

</div>
 
</template>

<script>
  export default {
    data() {
      return {
        msg:'',
        search:'',
        page:1,
        tableData: '',
      }
    },
    created () {
      this.getadata()
    },
    methods: {
        current(num){//当前页数
this.page=num
this.getadata()
      },
      next(){
        this.page++
        this.getadata()
      },
      prev(){ //上一页
if(this.page>1){
  this.page--
  this.getadata()
}        
      },
      handleDelete(index, row) {//拉入黑名单
       
    this.$prompt('请输入理由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
       
        }).then(({ value }) => {

   this.$common.pc_black_name(row.id,value).then(res => {  
       
if(res.data.code==1){
    this.$message({
            type: 'success',
            message: row.username +'已成功加入黑名单! ' 
          })
}else{
    this.$message({
            type: 'info',
            message: row.username +'操作失败! ' 
     })
}
})
  
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });       
        });
      },
      searchs(){
        this.getadata()
      },
       getadata(){
            this.$common.share_users_list(this.search,this.page).then(res => {
               this.msg= res.data
               this.tableData = res.data.data.list
          

                })
        }
       
    }
  }
</script>
<style scoped>
.so_input{
  width: 300px;
}
.so_main_left{float: left;}
.so_main_right{float: right;}
</style>
