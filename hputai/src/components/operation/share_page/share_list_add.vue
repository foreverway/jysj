<template>
  <div class="main">
    <el-form :inline="true" :model="form1" label-width="90px">
      <el-form-item label="学生姓名：">
        <el-transfer
          filterable
          :titles="['选择学员', '已选学员']"
          filter-placeholder="请输入学员姓名"
          v-model="form1.uid"
          :data="data"
        ></el-transfer>
      </el-form-item>
      <el-form-item label="选择素材：">
        <el-select
          clearable
          style="width:180px"
          class="so_input"
          v-model="form1.share_config_id"
          filterable
          placeholder="选择素材"
        >
          <el-option
            v-for="item in shar_config"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="goback">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      msg: "",
      students: "",
      shar_config: "",
      form1: {
        uid: [],
        share_config_id: ""
      }
    };
  },
  created() {
    this.getadata();
  },

  methods: {
    onSubmit() {
      this.$apis.common.add_share(this.form1).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          javascript: history.back(-1);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    // 返回上一页
    goback() {
     history.back(-1);
    },
    getadata() {
      this.$apis.common.user_list().then(res => {
        if (res.data.code == 1) {
          this.students = res.data.data.list;
          this.students.forEach(element => {
            this.data.push({
              key: element.id,
              label: element.username
            });
          });
        }
      });

      this.$apis.common.share_config_list().then(res => {
        this.shar_config = res.data.data.list;
      });
    }
  }
};
</script>



