<template>
  <div>
    <el-input placeholder="模糊搜索" v-model="parms.search" clearable style="width:300px"></el-input>

    <el-date-picker
      value-format="yyyy-MM-dd HH:mm:ss"
      v-model="value2"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
    ></el-date-picker>
    <el-button type="primary" @click="searchdata">搜索</el-button>

    <el-table  v-if="this.changeIndex==1"
      :data="tableData" :header-cell-style="{background:'#f4f4f4'}" style="margin-top:20px" size="medium" fit border
    >  
    <!-- 表格一 -->
      <el-table-column label="序号" type="index" width="100px" :index="indexMethod"></el-table-column>
      <el-table-column prop="uname" width="120px" label="学员姓名"></el-table-column>
      <el-table-column prop="amount" width="120px" label="金额"></el-table-column>
      <el-table-column prop="balance" width="120px" label="账户余额"></el-table-column>
      <el-table-column prop="remarks" label="事由"></el-table-column>
      <el-table-column prop="create_time" label="时间"></el-table-column>
    </el-table>
        <el-table  v-if="this.changeIndex==2"
      :data="tableData_2" :header-cell-style="{background:'#f4f4f4'}" style="margin-top:20px" size="medium" fit border
    > <!-- 表格二 -->
      <el-table-column label="序号" type="index" width="100px" :index="indexMethod"></el-table-column>
      <el-table-column prop="username" width="120px" label="学员姓名"></el-table-column>
      <el-table-column prop="price" width="120px" label="金额"></el-table-column>
      <el-table-column prop="rechargetype" width="120px" label="账户余额"></el-table-column>
      <el-table-column prop="reason" label="事由"></el-table-column>
      <el-table-column prop="addtime" label="时间"></el-table-column>
    </el-table>
        <el-table  v-if="this.changeIndex==3"
      :data="tableData_3" :header-cell-style="{background:'#f4f4f4'}" style="margin-top:20px" size="medium" fit border
    > <!-- 表格三 -->
      <el-table-column label="序号" type="index" width="100px" :index="indexMethod"></el-table-column>
      <el-table-column prop="username" width="120px" label="学员姓名"></el-table-column>
      <el-table-column prop="price" width="120px" label="金额"></el-table-column>
      <el-table-column prop="balance"  label="账户余额"></el-table-column>
      <el-table-column prop="reason" label="事由"></el-table-column>
      <el-table-column prop="addtime" label="时间"></el-table-column>
    </el-table>
    <el-row :gutter="12" style="margin:20px 5px;" v-show="this.changeIndex==1">
      <el-col :span="6">
        <el-card shadow="always">累计入款(元):</el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always">累计消耗(元):</el-card>
      </el-col>
    </el-row>
    <div v-show="this.changeIndex==1">孩纸们的钱包1</div>
    <div v-show="this.changeIndex==2">孩纸们的钱包2</div>
    <div v-show="this.changeIndex==3">孩纸们的钱包3</div>
  </div>
</template>


<script>
export default {
  props: {
    activeIndex: {
      type: String
    }
  },
  data() {
    return {
      changeIndex: "1",
      parms: {
        search: "",
        page: 1
      },
      value2: "", //搜索的时间
      tableData: [] ,//表格的数据
      tableData_2: [], //表格2的数据
      tableData_3: [] ,//表格3的数据
    };
  },
  created() {
    this.getmoneydata();
    // console.log( this.getdata())
  },
  methods: {
    searchdata() {
      //搜索的方法
      this.$apis.common
        .salepro_list(this.parms)
        .then(res => {
          if (res.data.code == 1) {
            this.msg = res.data.msg;
            let new_arr = [];
            if (this.value2.length == 0) {
              this.tableData = res.data.data.list;
            } else {
              new_arr = res.data.data.list.filter(
                item =>
                  item.dtime > this.value2[0] && item.dtime < this.value2[1]
              );
              this.tableData = new_arr;
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
    //序号排列
    indexMethod(index) {
      if (this.parms.page == 1) {
        return index + 1;
      } else {
        let page = (this.parms.page - 1) * 10 + 1;
        return index + page;
      }
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
    getmoneydata() {    //关于莫名其妙的学习币的设置
      let parms = {};
      this.$apis.students
        .learnmoney_list(parms)
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data);
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
        welfare_wallet_list() {    //关于福利钱包明细列表
      let parms = {};
      this.$apis.students
        .welfare_wallet_list(parms)
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data);
            this.msg = res.data;
            this.tableData_2 = res.data.data.list;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "请求失败"
          });
        });
    },
        cash_list() {    //关于现金钱包明细列表
      let parms = {};
      this.$apis.students
        .cash_list(parms)
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data);
            this.msg = res.data;
            this.tableData_3 = res.data.data.list;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "请求失败"
          });
        });
    },
  },
  watch: {
    activeIndex: function(value) {
      this.changeIndex = value;
      switch (value) {
        case "1":
          this.getmoneydata();
          break;
        case "2":
                this.cash_list();
          break;
        case "3":
              this.welfare_wallet_list();
   
          break;
      }
    }
  }
};
</script>