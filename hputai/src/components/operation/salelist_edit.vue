<template>
    <div class="main">
                    <!-- 设置充值链接 -->
         <el-page-header @back="goBack" content="编辑销售情况表">
</el-page-header>
<!-- 
      <el-input  style="width:200px" v-model="money"  placeholder="请输入充值金额" ></el-input>
    <el-button type="primary" v-show="money>0" @click="copyUrl">生成并复制充值链接</el-button> -->
<el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="活动时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.dtime" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="周次">
    <el-input v-model="form.week"></el-input>
  </el-form-item>
  <el-form-item label="跟进人">
    <el-input v-model="form.follow_man"></el-input>
  </el-form-item>
  <el-form-item label="所属战队">
    <el-input v-model="form.team"></el-input>
  </el-form-item>
  <el-form-item label="战队负责人">
    <el-input v-model="form.team_leader"></el-input>
  </el-form-item>
  <el-form-item label="编号">
    <el-input v-model="form.data_number"></el-input>
  </el-form-item>
  <el-form-item label="学生姓名">
    <el-input v-model="form.data_student_name"></el-input>
  </el-form-item>
  <el-form-item label="数据标签">
    <el-select v-model="form.data_tag" placeholder="请选择活动区域">
      <el-option label="弱需求" value="弱需求"></el-option>
      <el-option label="中需求" value="中需求"></el-option>
       <el-option label="强需求" value="强需求"></el-option>
      <el-option label="七天跟进" value="七天跟进"></el-option>
       <el-option label="退回" value="退回"></el-option>
      <el-option label="无效" value="无效"></el-option>
    </el-select>
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
    <el-button type="primary" @click="onSubmit">编辑保存</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>


<!-- 设置充值链接 -->
         <div style="display:none" cols="20" id="biao1">{{copyurl1}}</div>
    </div>
</template>

<script>
import studens_url from '../../config/config'
export default {
    data () {
        return {
             form: {
         id:this.$route.query.id,
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
    created(){
        this.getdata()
    },
    methods: {
     onSubmit(){

     },
      getdata(){
        this.$apis.common.salepro_edit(this.form).then(res=>{
            if(res.code==1){
                this.form =res.data
                console.log(this.form )
            }
        })
    },
      goBack(){
        history.back(-1)
    }

    },
   
   
}
</script>

