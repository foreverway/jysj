<template>
  <div class="so_main">
    <div class="so_main_left">
      <el-input
        class="so_input"
        v-model="form.search"
        @input="getadata"
        placeholder="请输入推广标题/学员姓名/创建人"
      ></el-input>
      <el-button type="primary" @click="getadata">搜索</el-button>

      <el-date-picker
        style="margin-left:60px"
        v-model="form.start_time"
        @change="getadata"
        type="datetime"
        clearable
        value-format="yyyy-MM-dd H:mm:ss"
        placeholder="选择日期时间"
      ></el-date-picker>至
      <el-date-picker
        @change="getadata"
        v-model="form.end_time"
        type="datetime"
        clearable
        value-format="yyyy-MM-dd H:mm:ss"
        placeholder="选择日期时间"
      ></el-date-picker>
    </div>
    <div class="so_main_right">
      <router-link to="/AddArticle">
        <el-button type="primary">配置素材</el-button>
      </router-link>
    </div>
    <!-- 表格数据 -->
    <el-table :data="tableData" :header-cell-style="{background:'#f4f4f4'}">
      <el-table-column label="序号" type="index" width="80" align="center" :index="indexMethod"></el-table-column>

      <el-table-column :show-overflow-tooltip="true" align="center" label="推广标题" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="指定转化路径" width="180">
        <template slot-scope="scope">
          <p>{{ scope.row.turn_url }}</p>
        </template>
      </el-table-column>

      <el-table-column label="推广二维码海报" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>
              <a
                :href="scope.row.src_img"
                target="_blank"
                :download="scope.row.uname+scope.row.title +'.png'"
              >
                <img class="hover_img_show" :src="scope.row.src_img" alt height="300" />
              </a>
            </p>
            <div slot="reference" class="name-wrapper">
              <img class="hover_img" :src="scope.row.src_img" alt height="50" />
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.addtime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="400">
        <template slot-scope="scope">
          <router-link :to="'/AddArticleEdit/'+scope.row.id">
            <el-button size="mini" type="success">编辑</el-button>
          </router-link>

          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="预览"
      :close-on-click-modal='false'
      :visible.sync="dialogFormVisible3"
      width="475px"
      custom-class="yulan_height"
    ></el-dialog>
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
        start_time: "",
        end_time: ""
      },
      dialogFormVisible3: false,
      tableData: ""
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
      this.$apis.common.share_config_list(this.form).then(res => {
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
  margin-bottom: 20px;
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
