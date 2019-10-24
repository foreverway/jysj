<template>
     <div class="main">
<el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="直播平台名称">
    <el-input v-model="form.live_name"></el-input>
  </el-form-item>
  <el-form-item label="partner_id">
    <el-input v-model="form.live_partner_id"></el-input>
  </el-form-item>
  <el-form-item label="partner_key">
    <el-input v-model="form.live_partner_key"></el-input>
  </el-form-item>
    <el-form-item label="个性domian域名">
    <el-input v-model="form.live_domain"></el-input>
  </el-form-item>
     <el-form-item label="平台url地址">
    <el-input v-model="form.live_url"></el-input>
  </el-form-item>
     <el-form-item label="默认的直播平台">
  
     <el-radio-group v-model="form.isdefault">
      <el-radio label="1">是</el-radio>
      <el-radio label="0">否</el-radio>
    </el-radio-group>
  </el-form-item>
 

  <el-form-item>
    <el-button type="primary" @click="onSubmit">保存配置</el-button>
      <el-button @click="goBack">取消</el-button>
  
  </el-form-item>
</el-form>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          live_name:'',
          live_partner_id: '',
          live_partner_key: '',
          live_domain: '',
          live_url:'' ,
          isdefault:'',      
  
        }
      }
    },
    created () {
 
    },
    methods: {

      onSubmit() {
         
     this.$apis.sys.live_add(this.form).then(res=>{


         if(res.data.code==1){
                       this.$message({
          message: '编辑成功,已添加',
          type: 'success'
        });
           this.goBack()
         }else{
               this.$message.error(res.data.msg);
         }
     })
      },
        goBack() {
        history.back(-1)
      }
    }
  }
</script>
