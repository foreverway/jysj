<template>
     <div class="main">
<el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="短信平台">
    <el-input v-model="form.sms_platform"></el-input>
  </el-form-item>
  <el-form-item label="AccessKeyID">
    <el-input v-model="form.AccessKeyID"></el-input>
  </el-form-item>
  <el-form-item label="AccessKeySecret">
    <el-input v-model="form.AccessKeySecret"></el-input>
  </el-form-item>
    <el-form-item label="模板">
    <el-input v-model="form.model"></el-input>
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
        form: {
            id:'',
          sms_platform: '',
          AccessKeyID: '',
          model: '',
          AccessKeySecret:'' ,
        
  
        }
      }
    },
    created () {
      this.getdata()  
    },
    methods: {

      onSubmit() {
         
     this.$apis.sys.post_sys_sms(this.form).then(res=>{
         if(res.data.code==1){
                       this.$message({
          message: '编辑成功,已保存',
          type: 'success'
        });
        this.getdata()
         }else{
               this.$message.error(res.data.msg);
         }
     })
      },
      getdata(){
          this.$apis.sys.sys_sms().then(res=>{
              if(res.data.code==1){
                  this.form=res.data.data
              }
          })
      }
    }
  }
</script>
