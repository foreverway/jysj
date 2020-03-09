<template>
  <div class="main">
    <el-page-header @back="goBack" content="添加科目"></el-page-header>

    <el-form ref="form" :model="form" label-width="100px" style="margin-top:20px">
      <el-form-item label="上级科目">
        <el-select v-model="form.pid" @change="select_sub" placeholder="请选择科目" clearable>
          <span v-for="item in subject" :key="item.pid">
            <el-option v-if="item.level==1" :label="'（二级科目）'+item.subject_name" :value="item.id"></el-option>
            <el-option v-if="item.level==0" :label="item.subject_name" :value="item.id"></el-option>
          </span>
        </el-select>
      </el-form-item>

      <el-form-item label="科目名称">
        <el-input v-model="form.subject_name" style="width:220px;"></el-input>
      </el-form-item>
      <el-form-item label="线上价格">
        <el-input v-model="form.online_price" style="width:220px;"></el-input>
      </el-form-item>
      <el-form-item label="线下价格">
        <el-input v-model="form.offline_price" style="width:220px;"></el-input>
      </el-form-item>

      <el-form-item label="排序">
        <el-input v-model="form.short" style="width:220px;"></el-input>
      </el-form-item>
      <el-form-item label="体系" v-if="choose_level==1">
        <el-select v-model="form.system" placeholder="请选择体系" clearable>
          <span v-for="item in system_list" :key="item.id">
            <el-option :label="item.name" :value="item.id"></el-option>
          </span>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存配置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      subject: [],
      level: "",
      form: {
        pid: "",
        subject_name: "",
        online_price: "",
        offline_price: "",
        short: "",
        system: ""
      },
      choose_level:'',
      system_list: []
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    select_sub(choose){

      let this_level=this.subject.filter(item=>
        item.id==choose
      )
      console.log(this_level[0].level)
      this.choose_level=this_level[0].level
    },
    onSubmit() {
      this.$apis.sys.subject_add(this.form).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: "配置成功,已保存",
            type: "success"
          });
          this.goBack();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getdata() {
      this.$apis.sys.subject_plist().then(res => {
        if (res.data.code == 1) {
          this.subject = res.data.data;
        }
      });
      this.$apis.sys.get_basedata_list({ a: "list" }).then(res => {
        if (res.data.code == 1) {
          this.system_list = res.data.data.subjects_system_list;
        }
      });
    },
    goBack() {
      history.back(-1);
    }
  }
};
</script>
