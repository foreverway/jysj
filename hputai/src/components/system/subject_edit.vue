<template>
     <div class="main">
         <el-page-header @back="goBack" content="编辑科目" >
</el-page-header>

<el-form ref="form" :model="form" label-width="100px" style="margin-top:20px">
<el-form-item label="上级科目">
  <el-select v-model="form.pid" placeholder="请选择" clearable filterable>
      <span   v-for="item in subject"  :key="item.pid">
  <el-option v-if="item.level==1"
      :label="'_____'+item.subject_name"
      :value="item.id">
    </el-option>
      <el-option v-if="item.level==0"
      :label="item.subject_name"
      :value="item.id">
    </el-option>
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
    <el-form-item label="排序" >
    <el-input v-model="form.short" style="width:220px;"></el-input>
  </el-form-item>
   <el-form-item label="体系" v-if="form.pid==0">
     <el-select v-model="form.system" placeholder="请选择体系" clearable >
      <span   v-for="item in system_list"  :key="item.id">

      <el-option 
      :label="item.name"
      :value="item.id">
    </el-option>
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
          subject:'',
          system_list:[],
        form: {
          id:this.$route.params.id,//用户id
          pid:'',
          subject_name: '',
          online_price: '',
          offline_price: '',
          short:'',
          system:''
        }
      }
    },
    created () {
      this.getdata()  
    },
    methods: {

      onSubmit() {
         
     this.$apis.sys.put_subject_edit(this.form).then(res=>{
         if(res.data.code==1){
                       this.$message({
          message: '配置成功,已保存',
          type: 'success'
        });
        this.goBack()
         }else{
               this.$message.error(res.data.msg);
         }
     })
      },
      getdata(){
          this.$apis.sys.subject_plist().then(res=>{
              if(res.data.code==1){
                  this.subject=res.data.data
              }
          })
      this.$apis.sys.get_basedata_list({a:'list'}).then(res=>{
              if(res.data.code==1){
                this.system_list=res.data.data.subjects_system_list
                console.log(this.system_list)
              }
          })
             this.$apis.sys.subject_edit(this.form).then(res=>{
              if(res.data.code==1){
                  this.form=res.data.data
                this.form.system=res.data.data.system*1
              }
          })
      },
        goBack() {
        history.back(-1)
      }
    }
  }
</script>
