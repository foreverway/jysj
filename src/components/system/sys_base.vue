<template>
    <div class="main">
<el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="系统全称">
    <el-input v-model="form.sys_name"></el-input>
  </el-form-item>
  <el-form-item label="系统简称">
    <el-input v-model="form.sys_short_name"></el-input>
  </el-form-item>
  <el-form-item label="系统域名">
    <el-input v-model="form.sys_url"></el-input>
  </el-form-item>
<el-form-item label="系统LOGO">
 <el-upload
  class="upload-demo"
  action=""
  :on-change="handlePreview"
  :file-list="form.sys_logo"
   :auto-upload="false"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  
</el-upload>
  <img :src="form.sys_logo" alt="" height="100">
</el-form-item>
  <el-form-item label="关于我们">
    <el-input type="textarea" autosize v-model="form.sys_about"></el-input>
  </el-form-item>
    <el-form-item label="联系方式">
    <el-input v-model="form.sys_contact"></el-input>
  </el-form-item>
  
  <el-form-item label="联系地址">
    <el-input v-model="form.sys_address"></el-input>
  </el-form-item>
  <el-form-item label="关键词">
    <el-input v-model="form.sys_key_words"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
  
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
          sys_name: '',
          sys_short_name: '',
          sys_url: '',
          sys_logo:'' ,
          sys_about: '',
          sys_contact: '',
          sys_address: '',
          sys_key_words: ''
        }
      }
    },
    created () {
      this.getdata()  
    },
    methods: {

      handlePreview(file) {
          console.log(file)
           let reader = new FileReader()
           reader.readAsDataURL(file.raw)
            reader.onload = () => {
                let _base64 = reader.result
                let  ba=_base64.split(",")
       this.form.sys_logo=_base64
            }
      },
      onSubmit() {
         
     this.$apis.sys.post_sys_base(this.form).then(res=>{
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
          this.$apis.sys.sys_base().then(res=>{
              if(res.data.code==1){
                  this.form=res.data.data
              }
          })
      }
    }
  }
</script>