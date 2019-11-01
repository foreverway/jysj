<template>
  <div class="main">
    <!-- 设置充值链接 -->
    <el-page-header @back="goBack" content="添加销售进程管控"></el-page-header>
    <!-- 
      <el-input  style="width:200px" v-model="money"  placeholder="请输入充值金额" ></el-input>
    <el-button type="primary" v-show="money>0" @click="copyUrl">生成并复制充值链接</el-button>-->
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="数据获取时间" style="width:335px">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.dtime"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="数据更新时间
      " style="width:335px">
        <el-input v-model="form.week"></el-input>
      </el-form-item>
      <el-form-item label="跟进人" style="width:335px">
        <el-input v-model="form.follow_man"></el-input>
      </el-form-item>
      <el-form-item label="所属战队" style="width:335px">
        <el-input v-model="form.team"></el-input>
      </el-form-item>
      <el-form-item label="战队负责人" style="width:335px">
        <el-input v-model="form.team_leader"></el-input>
      </el-form-item>
      <el-form-item label="编号" style="width:335px">
        <el-input v-model="form.data_number"></el-input>
      </el-form-item>
      <el-form-item label="学生姓名" style="width:335px">
        <el-input v-model="form.data_student_name"></el-input>
      </el-form-item>
      <el-form-item label="数据标签">
        <el-select v-model="form.data_tag" placeholder="请选择数据标签">
          <el-option label="弱需求" value="弱需求"></el-option>
          <el-option label="中需求" value="中需求"></el-option>
          <el-option label="强需求" value="强需求"></el-option>
          <el-option label="七天跟进" value="七天跟进"></el-option>
          <el-option label="退回" value="退回"></el-option>
          <el-option label="无效" value="无效"></el-option>
         <el-option label="已报名" value="已报名"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="建立了有效联系">
        <el-select v-model="form.m1" placeholder="是否建立了有效联系">
          <el-option label="已建立" value="已建立"></el-option>
          <el-option label="未建立" value="未建立"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="了解客户情况">
        <el-select v-model="form.m2" placeholder="对客户的了解情况">
          <el-option label="全面了解" value="全面了解"></el-option>
          <el-option label="部分了解" value="部分了解"></el-option>
          <el-option label="很少了解" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="明确数据需求">
        <el-select v-model="form.m3" placeholder="是否明确客户需求">
          <el-option label="已明确" value="已明确"></el-option>
          <el-option label="确认中" value="确认中"></el-option>
          <el-option label="客户需求模糊" value="客户需求模糊"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="建立信任">
        <el-select v-model="form.m4" placeholder="是否建立信任感">
          <el-option label="信任度高" value="信任度高"></el-option>
          <el-option label="初步建立" value="初步建立"></el-option>
          <el-option label="未建立" value="未建立"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规划">
        <el-select v-model="form.m5" placeholder="有何规划">
          <el-option label="无需规划" value="无需规划"></el-option>
          <el-option label="商讨规划" value="商讨规划"></el-option>
          <el-option label="已发生规划" value="已发生规划"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="试听">
        <el-select v-model="form.m6" placeholder="试听进程">
          <el-option label="推进中" value="推进中"></el-option>
          <el-option label="已缴费" value="已缴费"></el-option>
          <el-option label="已试听" value="已试听"></el-option>
          <el-option label="已反馈" value="已反馈"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="缴费方案">
        <el-select v-model="form.m7" placeholder="缴费方案">
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
      <el-form-item label="预收科目" style="width:50%;">
        <el-input v-model="form.advance_subject"></el-input>
      </el-form-item>
      <el-form-item label="预收金额" style="width:50%;">
        <el-input v-model="form.advance_amount"></el-input>
      </el-form-item>
      <el-form-item label="实际跟进情况" style="width:50%;">
        <el-input type="textarea" v-model="form.feedback"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="background-color:#e6563a; border:none;"
          @click="onSubmit"
        >确定</el-button>
        <el-button @click="aaa">取消</el-button>
      </el-form-item>
    </el-form>

    <!-- 设置充值链接 -->
    <!-- <div style="display:none" cols="20" id="biao1">{{copyurl1}}</div> -->
  </div>
</template>

<script>
import studens_url from "../../config/config";
export default {
  data() {
    return {
      form: {
        dtime: "",
        week: "",
        follow_man: "",
        team: "",
        team_leader: "",
        data_number: "",
        data_student_name: "",
        data_tag: "",
        m1: "",
        m2: "",
        m3: "",
        m4: "",
        m5: "",
        m6: "",
        m7: "",
        advance_strategies: "",
        advance_subject: "",
        advance_amount: "",
        feedback: ""
      },
      money: ""
    };
  },
  methods: {
    aaa() {
      //  history.back(-1)
      this.$router.go(-1);
    },
    onSubmit(formName) {
      this.$apis.common
        .salepro_add(this.form)
        .then(res => {
          if (res.data.code == 1) {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.$router.push({ path: "/SalesList" });
          }else{
             this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "添加失败"
          });
        });
    },
    goBack() {
      history.back(-1);
    }
    // // 复制链接
    //       copyUrl(){

    //  let url = studens_url.student_url+'login/1/'+this.money;
    //         let oInput = document.createElement('input');
    //         oInput.value = url;
    //         document.body.appendChild(oInput);
    //         oInput.select(); // 选择对象;
    //         console.log(oInput.value)
    //         document.execCommand("Copy"); // 执行浏览器复制命令
    //         this.$message({
    //           message: url +'已成功复制到剪切板',
    //           type: 'success'
    //         });
    //         this.money=''
    //         oInput.remove()
    //       },
  }
};
</script>

