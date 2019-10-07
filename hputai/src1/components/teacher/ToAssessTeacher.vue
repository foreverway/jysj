<template>
    <div>
      <div class="head_word">教师评价</div>
<el-form :model="form" :hide-required-asterisk='true' :label-position="labelPosition" :rules="rules" ref="form"  label-width="100px" class="demo-ruleForm">
  <el-form-item label="对老师评价" prop="contents">
    <el-input class="aa" type="textarea" width="200px" placeholder="内容可为：备课情况、教学态度、课堂互动、授课风格、教学设计、课后反馈及作业" v-model="form.contents"></el-input>
  </el-form-item>
    <el-form-item label="综合打分" prop="rate">
  <el-rate v-model="form.rate"  show-text></el-rate>
  
  </el-form-item>
  <el-button type="primary" class='assess' @click="goBack">返回</el-button>
    <el-button type="success" class='assess1' @click="forAssess('form')">评价</el-button>

      </el-form>
<p>评价列表</p>
  <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
    <li style="margin:0 10%;" v-for="i in assessList" class="infinite-list-item" :key="i.username">
         <el-image :src="head_url" style="width:50px;height:50px;margin-top:20px;border:1px white solid;border-radius:50%;">
                 <div slot="error" class="image-slot">
        <!-- //<i class="el-icon-picture-outline"></i> -->
        <img style="width:50px;height:50px;border:1px white solid;border-radius:50%;" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
      </div>
         </el-image>
        <span>{{i.username}}</span><el-rate v-model='i.rate'  ></el-rate>
        <p style="margin-left:60px;">{{i.contents}}</p>
    </li>
  </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return{
               form:{
                   contents:'',
                   rate:5,
                   teacher_id:this.$route.query.id
               },
               assessList:'',
               labelPosition: 'left',
                texts:[ '失望', '一般', '满意', '喜欢','完美'],
                rules:{
                    contents:[
                        {require:true,message:'请输入教师评价',trigger:'blur'},
                        {min:15,message:'你需要对老师有15字以上的评价',tigger:"blur"}
                    ]
              }
            }
        },
        created(){
            this.getAssessList()
        },
        methods:{
               load () {
        //this.count += 2
      },
      goBack(){
          this.$router.go(-1)
      },
            getAssessList(){
                     this.$apis.common.teacher_evaluation_get({teacher_id:this.$route.query.id}).then(res=>{
                if(res.data.code==1){
                    console.log(res.data.data)
                    this.assessList=res.data.data
                    console.log(typeof this.assessList[0].rate)
                }else{
                     this.$message({
                        message:res.data.msg,
                        type:"warning"
                    })
                }
            })
            },
              forAssess(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$apis.common.teacher_evaluation(this.form).then(res=>{
                if(res.data.code==1){
                    this.$message({
                        message:"评价成功",
                        type:"success"
                    })
                }else{
                     this.$message({
                        message:res.data.msg,
                        type:"warning"
                    })
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
        }
    }
</script>
<style scoped>
    .head_word {
  font-size: 26px;
  font-weight: 700;
  margin:15px;
}
.aa{
    width: 60% !important;
    
}
li{
    list-style: none;
}
.el-rate{
    height: 20px;
    line-height: 3;
    display:inline-block;
}
.assess{
    width: 9%;
    margin-left:45%;
}
.assess1{
    width: 9%;
    margin-left:2%;
}
</style>