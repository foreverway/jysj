<template>
    <div class="main">
                    <!-- 设置充值链接 -->
         <!-- <el-page-header content="添加销售进程管控">
</el-page-header> -->
<!-- <el-row>
  <el-button type="primary">添加销售进程管控</el-button>
</el-row> -->
        <div class="main_head">|&nbsp;添加报名需求</div> 
<!--  <el-input  style="width:200px" v-model="money"  placeholder="请输入充值金额" ></el-input>
    <el-button type="primary" v-show="money>0" @click="copyUrl">生成并复制充值链接</el-button> -->
    <el-steps :active="active" finish-status="success" >
        <el-step title="填写报名情况" ></el-step>
        <el-step title="填写需求情况" ></el-step>
        <el-step title="填写完成" ></el-step>
    </el-steps>
<el-form ref="form" :model="form" label-width="120px" v-if="active==1">

 <el-form-item label="报名编号">
   <!-- 报名编号每次从后台拉取+1 -->
    <el-input v-model="form.data_number"></el-input>
  </el-form-item>
  <el-form-item label="报名标题">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="学生姓名">
    <el-input v-model="form.data_student_name"></el-input>
  </el-form-item>
  <el-form-item :inline="true" label="报读科目">
    <el-select v-model="form.data_tag" placeholder="请选择活动区域" :inline="true" >
      <el-option label="弱需求" value="弱需求"></el-option>
      <el-option label="中需求" value="中需求"></el-option>
       <el-option label="强需求" value="强需求"></el-option>
      <el-option label="七天跟进" value="七天跟进"></el-option>
       <el-option label="退回" value="退回"></el-option>
      <el-option label="无效" value="无效"></el-option>
    </el-select>
     <el-select v-model="form.data_tag" placeholder="请选择活动区域" :inline="true" >
      <el-option label="弱需求" value="弱需求"></el-option>
      <el-option label="中需求" value="中需求"></el-option>
       <el-option label="强需求" value="强需求"></el-option>
      <el-option label="七天跟进" value="七天跟进"></el-option>
       <el-option label="退回" value="退回"></el-option>
      <el-option label="无效" value="无效"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item :inline="true" label="已选科目">
     <el-table
    :data="tableData"
    border
    show-summary
    size="mini"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="amount1"
      sortable
      label="数值 1">
    </el-table-column>
    <el-table-column
      prop="amount2"
      sortable
      label="数值 2">
    </el-table-column>
    <el-table-column
      prop="amount3"
      sortable
      label="数值 3">
    </el-table-column>
  </el-table>
  </el-form-item>
<el-form-item label="建立了有效联系">
    <el-select v-model="form.m1" placeholder="请选择活动区域">
      <el-option label="已建立" value="已建立"></el-option>
      <el-option label="未建立" value="未建立"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="了解客户情况">
    <el-select v-model="form.m2" placeholder="请选择活动区域">
      <el-option label="全面了解" value="全面了解"></el-option>
     <el-option label="部分了解" value="部分了解"></el-option>
      <el-option label="很少了解" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="明确数据需求">
    <el-select v-model="form.m3" placeholder="请选择活动区域">
      <el-option label="已明确" value="已明确"></el-option>
      <el-option label="确认中" value="确认中"></el-option>
          <el-option label="客户需求模糊" value="客户需求模糊"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="建立信任">
    <el-select v-model="form.m4" placeholder="请选择活动区域">
      <el-option label="信任度高" value="信任度高"></el-option>
      <el-option label="初步建立" value="初步建立"></el-option>
      <el-option label="未建立" value="未建立"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="规划">
    <el-select v-model="form.m5" placeholder="请选择活动区域">
      <el-option label="无需规划" value="无需规划"></el-option>
      <el-option label="商讨规划" value="商讨规划"></el-option>
      <el-option label="已发生规划" value="已发生规划"></el-option>

    </el-select>
  </el-form-item>
  <el-form-item label="试听">
    <el-select v-model="form.m6" placeholder="请选择活动区域">
      <el-option label="推进中" value="推进中"></el-option>
      <el-option label="已缴费" value="已缴费"></el-option>
       <el-option label="已试听" value="已试听"></el-option>
      <el-option label="已反馈" value="已反馈"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="缴费方案">
    <el-select v-model="form.m7" placeholder="请选择活动区域">
      <el-option label="已发送" value="已发送"></el-option>
      <el-option label="家长商讨中" value="家长商讨中"></el-option>
       <el-option label="已确定" value="已确定"></el-option>

    </el-select>
  </el-form-item>
  <el-form-item label="预收策略">
    <el-select v-model="form.advance_strategies" placeholder="请选择活动区域">
      <el-option label="快收" value="快收"></el-option>
      <el-option label="需养" value="需养"></el-option>
       <el-option label="多科规划VIP" value="多科规划VIP"></el-option>

    </el-select>
  </el-form-item>
     <el-form-item label="预收科目">
    <el-input v-model="form.advance_subject"></el-input>
  </el-form-item>
  <el-form-item label="预收金额">
    <el-input v-model="form.advance_amount"></el-input>
  </el-form-item>
  <el-form-item label="客户反馈">
    <el-input type="textarea" v-model="form.feedback"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button @click="goBack">取消</el-button>
  </el-form-item>
</el-form>

<el-button style="margin-top: 12px;" @click="next" v-if="active==1">下一步</el-button>
<el-button style="margin-top: 12px;" @click="pre" v-if="active==2">上一步</el-button>
<!-- 设置充值链接 -->
         <div style="display:none" cols="20" id="biao1">{{copyurl1}}</div>
    </div>
</template>

<script>
import studens_url from '../../config/config'
export default {
    data () {
        return {
          active: 1,
             form: {
          dtime: '',
          week: '',
          follow_man: '',
          team: '',
          team_leader: "",
          data_number: '',
          data_student_name: '',
          data_tag: '',
          m1: '',
          m2: '',
          m3: '',
          m4: '',
          m5: "",
          m6: '',
          m7: '',
          advance_strategies: '',
          advance_subject: '',
          advance_amount: '',
          feedback: '',
        },
              money:'',
        }
    },
    methods: {
       next() {
        if (this.active++ > 2) this.active = 0;
      },
        pre() {
        if (this.active-- < 2) this.active = 1},

         onSubmit(formName) {
        console.log('submit!');
        //        this.$refs[formName].validate((valid) => {
        //   if (valid) {
                this.$apis.common.salepro_add(this.form).then(res=>{
            if(res.data.code==1){
    this.$message({
          message: '添加成功',
          type: 'success'
        })
       this.$router.push({path:'/ApplicationAdd'})
            }
            // else{
            //       this.$message.error(res.data.msg);
            // }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '添加失败'
          });          
        });},
          goBack() {
         history.back(-1)
      }
         
    ,                  // 复制链接
      copyUrl(){
       
 let url = studens_url.student_url+'login/1/'+this.money;
        let oInput = document.createElement('input');
        oInput.value = url;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象;
        console.log(oInput.value)
        document.execCommand("Copy"); // 执行浏览器复制命令
        this.$message({
          message: url +'已成功复制到剪切板',
          type: 'success'
        });
        this.money=''
        oInput.remove()
      },
    }
}
</script>
<style scoped>
     .main_head{
       margin:auto;
       width: 96%;
       height:40px;
       font-size: 22px;
       font-weight: 900;
       margin:0 2%;
       /* line-height: 30px; */
     }
</style>

