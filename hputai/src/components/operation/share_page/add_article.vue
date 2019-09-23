<template>
  <div class="add_main" v-loading="loading" element-loading-text="数据提交中,请稍等">
    <h1>推广素材配置</h1>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="标题:" prop="title">
        <el-input v-model="form.title" style="width:450px"></el-input>
      </el-form-item>
      <el-form-item label="转化路径:" prop="turn_url">
        <el-input v-model="form.turn_url" style="width:450px"></el-input>
      </el-form-item>
      <el-form-item label="海报:" style="width:500px">
        <el-upload
          class="upload-demo"
          ref="upload"
          action
          :on-change="handlePreview"
          :file-list="form.src_img"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <img :src="form.src_img" alt />
          <div slot="tip" class="el-upload__tip">用户素材列表显示,只能上传jpg/png文件</div>
        </el-upload>
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
      loading: false, //加载遮罩层
      msg: "",
      students: "",
      form: {
        title: "",
        src_img: "",
        turn_url: ""
      },
      rules: {
        title: [{ required: true, message: "请输入标题名称", trigger: "blur" }],
        turn_url: [{ required: true, message: "请输链接地址", trigger: "blur" }]
      }
    };
  },
  created() {},

  methods: {
    // 返回上一页
    goback() {
      javascript: history.back(-1);
    },

    handlePreview(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        let _base64 = reader.result;
        let ba = _base64.split(",");
        this.form.src_img = _base64;
      };
    },

    onSubmit() {
      this.$apis.common.add_share_config(this.form).then(res => {
        if (res.data.code == 1) {
          this.loading = false;
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.$router.push("/ShareArticleConfig");
        } else {
          this.loading = false;
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>

<style scoped>
.edit_container {
  width: 483px;
  height: 730px;
}
</style>
