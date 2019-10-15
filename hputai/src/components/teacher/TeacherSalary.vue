<template>
  <div class="so_main">
    <div class="head_word">教师课酬</div>
     <div class="so_main_left"> 
       <el-input
        class="so_input"
        v-model="params.search"
        @input="getadata"
        clearable
        placeholder="搜索教师名称，授课科目"
      ></el-input>
    </div>
    <span></span>
            <el-date-picker
          style="margin-left:60px"
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
          value-format="yyyy-MM-dd H:mm:ss"
          placeholder="选择日期时间"
        ></el-date-picker>
            <el-select clearable v-model="params.search" @input="getadata" placeholder="选择教师">
      <el-option v-for="item in teacher_data" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select> 
    <el-button type="primary" @click="getadata">搜索</el-button>
    <!-- 表格数据 -->
    <el-table :data="tableData" border :header-cell-style="{background:'#f4f4f4'}">
      <el-table-column label="序号" type="index" width="80" align="center" :index="indexMethod"></el-table-column>

      <el-table-column :show-overflow-tooltip="true" align="center" label="教师名称" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.teacher_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="科目" width="180" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.subject_name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="上课时间" width="180" prop="start_time"></el-table-column>
      <el-table-column label="线上/线下"  prop="course_address"></el-table-column>
      <el-table-column label="授课类型" prop="teaching_type"></el-table-column>
       <el-table-column label="课酬标准" prop="dollars_standar"></el-table-column>
       <el-table-column label="应上课时" prop="classhour"></el-table-column>
       <el-table-column label="已上课时" prop="haved_hour"></el-table-column>
      <el-table-column align="center" label="应得课酬" prop="due_to_dollars" fixed="right">
      </el-table-column>
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
import {mapState} from 'vuex'
export default {
  data() {
    return {
      msg: "",
      tableData: [],
      teacher_data:[],
      params: {
        teacher_id: "",
        subject_id: "",
        search: "",
        start_time: "",
        end_time: "",
        page: "1"
      }
    };
  },
  created() {
    this.$apis.students.getuilcode();
    this.getadata();
  },
  computed:mapState['teacher_data'],
  methods: {
    //序号排列
    indexMethod(index) {
      if (this.params.page == 1) {
        return index + 1;
      } else {
        let page = (this.params.page - 1) * 10 + 1;
        return index + page;
      }
    },

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
    toAssess(a) {
      console.log(a);
    },

    getadata() {
      this.$apis.teacher.teacher_list(this.params).then(res => {
                //console.log(res)

        this.msg = res.data;
        this.tableData = res.data.data.list;
       // console.log(this.tableData)
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
.head_word {
  font-size: 26px;
  font-weight: 700;
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
