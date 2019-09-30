<template>
  <div class="so_main">
         <div class="head_word">教师评价</div>
    <div class="so_main_left">
      <el-input
        class="so_input"
        v-model="form.search"
        @input="getadata"
        clearable
        placeholder="搜索教师名称，授课科目"
      ></el-input>
     
    </div>
    <span> </span>
    <el-select
    clearable
    v-model='form.search'
    @input="getadata"
    placeholder="请选择状态"
    >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">

    </el-option>
    </el-select>
    <span> </span>
     <el-button type="primary" @click="getadata">搜索</el-button>
    <!-- 表格数据 -->
    <el-table :data="tableData" :header-cell-style="{background:'#f4f4f4'}">
      <el-table-column label="序号" type="index" width="80" align="center" :index="indexMethod"></el-table-column>

      <el-table-column :show-overflow-tooltip="true" align="center" label="教师名称" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.teacher_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="可授科目" width="180">
        <template slot-scope="scope">
          <p>{{ scope.row.teach_subjects }}</p>
        </template>
      </el-table-column>

      <el-table-column label="收到评价数" width="180" prop='eval_count'>

      </el-table-column>

      <el-table-column align="center" label="综合评分" >
            <template slot-scope="scope">
       <el-rate
  v-model="scope.row.eval_average"
  disabled
  show-score
  text-color="#ff9900"
  score-template="{scope.row.eval_average}">
</el-rate>
 </template>
      </el-table-column>
      <el-table-column label="状态"  prop='eval_status'>

      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right">
           <template slot-scope="scope">
          <router-link :to="{path:'/ToAssessTeacher',query:{id:scope.row.id}}">
              <el-button size="mini" type="success">进行评价</el-button>
          </router-link>
           </template>
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
export default {
  data() {
    return {
      msg: "",
      form: {
        page: 1,
        search: "",
        is_ping:''
      },
      options:[{value:'已评',label:'已评'},{value:'未评',label:'未评'}],
      dialogFormVisible3: false,
      tableData: [],
    };
  },
  created() {
    this.$apis.students.getuilcode();
    this.getadata();
  },
  methods: {
    //序号排列
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

    // 编辑
    handleEdit(index, row) {
      // 行号信息
      this.$router.push("/AddArticle1/" + row.id);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$apis.common.del_share_config(row.id).then(res => {
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: row.title + " 删除成功"
              });
              this.getadata();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getadata() {
      this.$apis.common.evaluation_list(this.form).then(res => {
        this.msg = res.data;
        this.tableData = res.data.data.list;
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
.el-select{
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
