<template>
    <div class="main">
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
      label="分享者姓名"
      width="180">
      <template slot-scope="scope">
     
        <span >{{ scope.row.username }}</span>
      </template>
    </el-table-column>
      <el-table-column
      label="学习币详细"
      width="180">
      <template slot-scope="scope">
     
        <span >{{ scope.row.price }}</span>
      </template>
    </el-table-column>
    
  
    <el-table-column
      label="学习币总额（元）"
      width="180">
      <template slot-scope="scope">
      
        <span >{{ scope.row.balance }}</span>
      </template>
    </el-table-column>
   
   
    <el-table-column
      label="事由"
      width="180">
      <template slot-scope="scope">
      
        <span >{{ scope.row.reason }}</span>
      </template>
    </el-table-column>
    
     <el-table-column
      label="触发时间"
      width="180">
      <template slot-scope="scope">
      
        <span >{{ scope.row.create_time }}</span>
      </template>
    </el-table-column>

   <el-table-column
      label="操作人"
      width="180">
      <template slot-scope="scope">
     
        <span >{{ scope.row.operation_user }}</span>
      </template>
    </el-table-column>

     <el-table-column
      label="学习币状态"
      width="180">
      <template slot-scope="scope">
      
        <span>{{ scope.row.to_view }}</span>
      </template>
    </el-table-column>
  </el-table>
    </div>
</template>
