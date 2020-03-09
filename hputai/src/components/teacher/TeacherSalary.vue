<template>
  <div class="so_main">
    <zx-head title="教师课酬"></zx-head>

    <div class="so_main_left">
      <el-input
        class="so_input"
        v-model="params.search"
        @change="getadata"
        clearable
        style="width:200px;"
        placeholder="请输入搜索内容"
      ></el-input>
    </div>
    <span></span>
    <el-date-picker
      style="margin-left:20px"
      v-model="params.start_time"
      @change="getadata"
      type="datetime"
      clearable
      value-format="yyyy-MM-dd H:mm:ss"
      placeholder="选择日期时间"
    ></el-date-picker>至
    <el-date-picker
      @change="getadata"
      v-model="params.end_time"
      type="datetime"
      clearable
      filterable
      value-format="yyyy-MM-dd H:mm:ss"
      placeholder="选择日期时间"
    ></el-date-picker>
    <el-select
      clearable
      v-model="params.teacher_id"
      filterable
      @input="getadata"
      placeholder="选择教师"
    >
      <el-option
        v-for="item in teacher_data"
        :key="item.id"
        :label="item.teacher_name"
        :value="item.id"
      ></el-option>
    </el-select>
    <el-button type="success" @click="getadata">搜 索</el-button>
    <el-button type="primary" @click="recharge_export">导出</el-button>

    <!-- 表格数据 -->
    <el-table :data="tableData" border :header-cell-style="{background:'#f4f4f4'}">
      <el-table-column label="序号" type="index"  align="center" :index="indexMethod"></el-table-column>
      <el-table-column label="月份" width="40" sortable prop="month"></el-table-column>

      <el-table-column :show-overflow-tooltip="true" align="center" label="教师名称" >
        <template slot-scope="scope">
          <span>{{ scope.row.teacher_name }}</span>
        </template>
      </el-table-column>
            <el-table-column label="兼职/全职" e prop="teacher_type_name"></el-table-column>

 <el-table-column label="一级科目" prop="first_subject"></el-table-column>
      <el-table-column label="二级科目" prop="second_subject"></el-table-column>
      <el-table-column label="科目"  align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.subject_name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="上课时间" e prop="start_time"></el-table-column>
      <el-table-column label="线上/线下" prop="course_address"></el-table-column>
      <el-table-column label="授课类型" prop="teaching_type"></el-table-column>
       <el-table-column label="班主任" prop="banzhuren"></el-table-column>
      <el-table-column label="学生" prop="student_name"></el-table-column>
      <el-table-column label="课程属性" prop="course_attribute"></el-table-column>
      <el-table-column label="课酬标准" prop="dollars_standar"></el-table-column>
      <el-table-column label="应上课时" prop="classhour"></el-table-column>
      <el-table-column label="教师核准课时" prop="haved_hour" width="120"></el-table-column>
            <el-table-column label="学生核准课时" prop="student_classhour" width="120"></el-table-column>
      <el-table-column label="确认课时费" prop="student_amount" width="120"></el-table-column>
      <el-table-column align="center" label="应得课酬" prop="due_to_dollars" fixed="right"></el-table-column>
    </el-table>
    <span v-if="msg.data">
      <el-pagination
        style="margin-top:30px; float: right;"
        background
        layout="prev, pager, next"
        @prev-click="prev"
        @next-click="next"
        @current-change="current"
        :total="msg.data.count"
      ></el-pagination>
    </span>
  </div>
</template>

<script>
//import urls from '../common/const_config.js'
  import url from '../../config/config.js'

import { mapState } from "vuex";
export default {
  data() {
    return {
      msg: "",
      tableData: [],
      params: {
        // teacher_id: "",
        // search: "",
        // start_time: "",
        // end_time: "",
        page: "1"
      }
    };
  },
  created() {
    this.$apis.students.getuilcode();
    this.getadata();
  },
  computed: mapState(["teacher_data"]),
  methods: {
    indexMethod(index){
           if (this.params.page == 1) {
        return index + 1;
      } else {
        let page = (this.params.page - 1) * 10 + 1;
        return index + page;
      }
    },
        //导出
    recharge_export() {
      this.$message({
        type: "success",
        message: "正在导出,请稍等..."
      });
     // let urls = "http://personal.test.hqjystudio.com";
      let parms = "";
      for (var key in this.params) {
        parms += key + "=" + this.params[key] + "&";
      }
      window.location.href = url.urls + "/api_dollars_export" + "?" + parms;
    },
    //序号排列
    // indexMethod(index) {
    //   if (this.params.page == 1) {
    //     return index + 1;
    //   } else {
    //     let page = (this.params.page - 1) * 10 + 1;
    //     return index + page;
    //   }
    // },
    current(num) {
      //当前页数
      this.params.page = num;
      this.getadata();
    },
    next() {
      this.params.page++;
      this.getadata();
    },
    prev() {
      //上一页
      if (this.params.page > 1) {
        this.params.page--;
        this.getadata();
      }
    },
    toAssess(a) {},

    getadata() {
      this.$apis.teacher.teacher_list(this.params).then(res => {
        if (res.data.code == 1) {
          this.msg = res.data;
          this.tableData = res.data.data.list;
          console.log(this.tableData)
        }
      });
    }
  }
};
</script>
<style scoped>
.so_input {
  width: 300px;
}
.so_main_left {
  float: left;
  margin: 20px;
}
.el-select {
  margin: 20px 15px;
}
.so_main_right {
  float: right;
}
.yulan_height {
  height: 50vh;
}

.hover_img_main {
  position: relative;
}
.hover_img_show {
  display: node;
  position: absolute;
}
.hover_img:hover .hover_img_show {
  display: block;
}
</style>
