<template>
  <div class="so_main">
    <h3>学习币总额明细</h3>
    <div class="so_main_left">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-input class="so_input" v-model="form.search" @input="getadata" placeholder="请输入用户名"></el-input>
        <el-button type="primary" @click="getadata" style="margin-left:5px">搜索</el-button>

        <el-date-picker
          style="margin-left:60px"
          @change="getadata"
          v-model="form.start_time"
          clearable
          type="datetime"
          value-format="yyyy-MM-dd H:mm:ss"
          placeholder="选择日期时间"
        ></el-date-picker>至
        <el-date-picker
          @change="getadata"
          v-model="form.end_time"
          clearable
          type="datetime"
          value-format="yyyy-MM-dd H:mm:ss"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-form>
    </div>

    <div class="so_main_right"></div>
    <!-- 表格数据 -->
    <el-table
      :header-cell-style="{background:'#f4f4f4'}"
      ref="multipleTable"
      border
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="序号" type="index" width="80" align="center" :index="indexMethod"></el-table-column>

      <el-table-column align="center" label="学员姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.uname }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="金额">
        <template slot-scope="scope">
          <span v-if="scope.row.type==2" style="color:green">-{{ scope.row.amount }}</span>
          <span v-if="scope.row.type==1" style="color:red">+{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账户余额">
        <template slot-scope="scope">
          <span>{{ scope.row.balance }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="事由">
        <template slot-scope="scope">
          <span>{{ scope.row.remarks }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <p style="margin-top:30px">
      <span>累计入款：</span>
      <span style="color:red">{{msg.data.inamount}}</span>
      <span>元</span>
      <span style="margin-left:30px">累计消耗：</span>
      <span style="color:red">{{msg.data.outamount}}</span>
      <span>元</span>
    </p>
    <!-- <el-button type="primary" @click="ifinputselect" style="margin-top:20px">审核</el-button> -->

    <el-pagination
      style="float:right;"
      background
      layout="prev, pager, next"
      @prev-click="prev"
      @next-click="next"
      @current-change="current"
      page-size="10"
      :total="msg.data.count"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: "",
      form: {
        search: "", //搜索学员姓名条件
        page: 1, //页码
        start_time: "", //搜索开始时间
        end_time: "", //搜索结束时间
        uid: "" //如果有uid,查询该用户的记录
      },
      form1: {
        // 入款和扣款
        amount: "", //金额
        reason: "", //理由
        uname: "", //学生姓名
        type: "" //入款还是扣款，1入款，2扣款
      },
      msg: "",
      dialogFormVisible1: false //入扣款弹窗
    };
  },

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
.so_main_right {
  float: right;
}
</style>
