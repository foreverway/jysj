<template>
<div class="so_main">

<div class="so_main_left">
   <router-link to="/AddRules">
    <el-button type="primary">分享规则设置</el-button>
    </router-link>
 
</div>
  <!-- 表格数据 -->
 <el-table
    :data="tableData"
    style="width: 100%">
     <el-table-column
      label="序号ID"
      width="80">
      <template slot-scope="scope">
       
        <span >{{ scope.row.id }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="一级分享佣金%"
      width="180">
      <template slot-scope="scope">
        <span >{{ scope.row.first_share }}</span>
      </template>
    </el-table-column>
       <el-table-column
      label="二级分享佣金%"
      width="180">
      <template slot-scope="scope">
        <span >{{ scope.row.second_share }}</span>
      </template>
    </el-table-column>
      <el-table-column
      label="佣金冻结天数(天)"
      width="180">
      <template slot-scope="scope">
        <span >{{ scope.row.days_times }}</span>
      </template>
    </el-table-column>
        <el-table-column
      label="创建人"
      width="180">
      <template slot-scope="scope">
     
        <span >{{ scope.row.operation_users }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="创建时间"
      width="180">
      <template slot-scope="scope">
      
        <span>{{ scope.row.operation_time }}</span>
      </template>
    </el-table-column>
   
 

    <!-- <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
    
      </template>
    </el-table-column> -->
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
        page:1,
        tableData:'',
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
      handleEdit(index, row) {
      },
      handleDelete(index, row) {
      },
        getadata(){
            this.$apis.common.share_config_list(this.page).then(res => {
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
