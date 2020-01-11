<template>
<div class="add_main">
<h1>分享规则设置</h1>
<el-form ref="form" :model="form" label-width="180px">
  <el-form-item label="一级分享佣金设置：">
    <el-radio-group v-model="form.one">
       <el-radio label="1">学习币</el-radio>
     <el-radio label="0">无</el-radio>
     
    </el-radio-group>
  </el-form-item>
<el-form-item label="一级分享佣金百分比：">
    <el-input class="num_input" v-model="form.first_share" placeholder="%"></el-input>
  </el-form-item>

<el-form-item label="二级分享佣金设置：">
   <el-radio-group v-model="form.two">
       <el-radio label="1">学习币</el-radio>
     <el-radio label="0">无</el-radio>
    </el-radio-group>
  </el-form-item>
<el-form-item label="二级分享佣金百分比：">
    <el-input class="num_input" v-model="form.second_share" placeholder="%"></el-input>
  </el-form-item>
<h1>分享规则说明文档</h1>
 
    <el-input type="textarea" v-model="form.share_rule"></el-input>
 <el-form-item label="佣金冻结天数：">
     <el-radio-group  v-model="form.account_times">
       <el-radio label="1" name="type">数天后到账</el-radio >
      <el-radio label="0"  name="type">直接到账</el-radio >
    </el-radio-group >
  </el-form-item>
<el-form-item label="冻结天数：">
    <el-input class="num_input" v-model="form.days_times" placeholder="天"></el-input>
  </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="submitForm">立即创建</el-button>
    <el-button @click="resetForm('form')">重置</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
  export default {
    data() {
      return {
        msg:'',
        form: {
          one: '',
          two: '',
          first_share: '',
          second_share: '',
          share_rule: '',
          account_times: '',
          days_times: '',
        }
      }
    },
      methods: {
      submitForm() {
          this.$common.share_config(this.form.one,this.form.two,
          this.form.first_share,this.form.second_share,this.form.share_rule,
          this.form.account_times,this.form.days_times
          ).then(res => {
               this.msg= res.data
              if(this.msg.code==1){
              this.$message({
            type: 'success',
            message: '规则已成功添加! ' 
          })
 this.$router.push("/ShareRules")
              }
              

                })
      },
      resetForm(form) {
        this.$refs[this.form].resetFields();
      }
    }
  }
</script>
<style scoped>

.num_input{width: 200px;}

</style>
