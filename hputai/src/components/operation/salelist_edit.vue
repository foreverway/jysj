<template>
  <div class="main">
    <!-- 设置充值链接 -->
    <el-page-header @back="goBack" style="margin:15px 0 ;" content="编辑销售情况表"></el-page-header>
    <!-- <div >

    </div>-->
    <!-- 
      <el-input  style="width:200px" v-model="money"  placeholder="请输入充值金额" ></el-input>
    <el-button type="primary" v-show="money>0" @click="copyUrl">生成并复制充值链接</el-button>-->
       <el-form ref="form" :model="form" label-width="120px" :rules="rules" class="demo-ruleForm">
      <el-form-item label="数据获取时间" style="width:335px" prop="dtime">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.dtime"></el-date-picker>
      </el-form-item>

      <el-form-item label="跟进人" style="width:335px" prop="follow_man">


        <el-select
          v-model="form.follow_man"
          placeholder="请选择"
          filterable
          clearable
        >
          <el-option
            v-for="item in options_follow_man"
            :key="item.id"
            :label="item.admin_name"
            :value="item.admin_name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="所属战队" style="width:335px" prop="team">

        <el-select v-model="form.team"   filterable
          clearable placeholder="请选择" >
          <el-option
            v-for="item in options_team"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="战队负责人" style="width:335px" prop="team_leader">
        <el-select
          v-model="form.team_leader"
          placeholder="请选择"
          filterable
          clearable
        >
          <el-option
            v-for="item in options_team_leader"
            :key="item.id"
            :label="item.admin_name"
            :value="item.admin_name"
          ></el-option>
        </el-select>

      </el-form-item>

      <el-form-item label="编号" style="width:335px" prop="data_number">
        <el-input v-model="form.data_number"></el-input>
      </el-form-item>
      <el-form-item label="学生姓名" style="width:335px" prop="data_student_name">
        <el-input v-model="form.data_student_name"></el-input>
      </el-form-item>
      <el-form-item label="数据标签" prop="data_tag">
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
      <el-form-item label="建立了有效联系" prop="m1">
        <el-select v-model="form.m1" placeholder="是否建立了有效联系">
          <el-option label="已建立" value="已建立"></el-option>
          <el-option label="未建立" value="未建立"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="了解客户情况" prop="m2">
        <el-select v-model="form.m2" placeholder="对客户的了解情况">
          <el-option label="全面了解" value="全面了解"></el-option>
          <el-option label="部分了解" value="部分了解"></el-option>
          <el-option label="很少了解" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="明确数据需求" prop="m3">
        <el-select v-model="form.m3" placeholder="是否明确客户需求">
          <el-option label="已明确" value="已明确"></el-option>
          <el-option label="确认中" value="确认中"></el-option>
          <el-option label="客户需求模糊" value="客户需求模糊"></el-option>
        </el-select>
      </el-form-item>
            <el-form-item label="进线渠道" prop="incoming_line">
        <el-select
          v-model="form.incoming_line"
          placeholder="请选择"
          filterable
          clearable
        >
          <el-option
            v-for="item in incoming_line_list"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="建立信任" prop="m4">
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
      <el-form-item label="情况及客户反馈" style="width:50%;">
        <el-input type="textarea" v-model="form.feedback"></el-input>
      </el-form-item>
            <el-form-item label="一周内收单重点" style="width:335px">
<el-radio v-model="form.is_stress" :label="1" >是</el-radio>   
<el-radio v-model="form.is_stress" :label="0">否</el-radio>  
   </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="background-color:#e6563a; border:none;"
          @click="onSubmit('form')"
        >确定</el-button>
        <el-button @click="aaa">取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 设置充值链接 -->
  </div>
</template>

<script>
import studens_url from "../../config/config";
export default {
  data() {
    return {
      form: {
        id: this.$route.query.id * 1,
        dtime: "", //日期
        // week: '',//周次
        follow_man: "", //跟进人
        team: "", //所属战队
        team_leader: "", //战队负责人
        data_number: "", //数据信息
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
        feedback: "",
             incoming_line:'',
        is_stress:'',
      },
      options_follow_man: [], //战队负责人
      options_team_leader: [], //跟进人
            incoming_line_list:[],//进线渠道列表

      options_team: [
        {
          value: "柠檬战队",
          label: "柠檬战队"
        },
        {
          value: "车厘子战队",
          label: "车厘子战队"
        },
        {
          value: "哆啦A梦战队",
          label: "哆啦A梦战队"
        },
        {
          value: "其他",
          label: "其他"
        },
        {
          value: "无",
          label: "无"
        }
      ],
         rules: {
        dtime: [
          {
            required: true,
            message: "数据获取时间",
            trigger: "change"
          }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        follow_man: [
          { required: true, message: "请选择跟进人", trigger: "change" }
        ],
        team: [
          { required: true, message: "请选择所属战队", trigger: "change" }
        ],
        team_leader: [
          { required: true, message: "请选择战队负责人", trigger: "change" }
        ],
        data_number: [
          { required: true, message: "请填写编号", trigger: "blur" }
        ],
        data_student_name: [
          { required: true, message: "请填写学生姓名", trigger: "blur" }
        ],
        data_tag: [
          { required: true, message: "请选择数据标签", trigger: "change" }
        ],
        m1: [
          { required: true, message: "是否建立了有效联系", trigger: "blur" }
        ],
        m2: [{ required: true, message: "是否了解客户情况", trigger: "blur" }],
        m3: [{ required: true, message: "是否明确数据需求", trigger: "blur" }],
        m4: [{ required: true, message: "是否建立信任", trigger: "blur" }]
      },
      money: ""
    };
  },
  created() {
    this.getdata();
    this.$apis.operation.team_leader().then(res => {
      if (res.data.code == 1) {
        // this.form.options_team_leader=[]
        this.options_team_leader = res.data.data;
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    });
    this.$apis.operation.banzhuren_list().then(res => {
      if (res.data.code == 1) {
        this.options_follow_man = [];
        this.options_follow_man = res.data.data;
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning"
        });
      }
    });
        this.$apis.menber
      .admin_base({ admin_id: this.getdataCookie("admin_id") })
      .then(res => {
        if (res.data.code == 1) {

          this.ifTeam = res.data.data.team;
          this.form.team_leader = res.data.data.captain_name;
          this.form.team = res.data.data.team;
          this.form.follow_man = res.data.data.admin_name;
           this.form.is_stress = res.data.data.is_stress*1;
        }
      });
        this.$apis.common
      .basedata_list({ admin_id: this.getdataCookie("admin_id") })
      .then(res => {
        if (res.data.code == 1) {

       this.incoming_line_list=res.data.data.inproject_list
        }
      });
  },
  mounted() {},
  methods: {
        getdataCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      // 路由跳转
      this.$router.push({ path: "/login" });
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
      this.$apis.common.salepro_edit_put(this.form).then(res => {
        if (res.data.code == 1) {
          this.$router.push({ path: "/SalesList" });
        }
      });
  
     } else {
               this.$message({
          message: '请补全提示内容',
          type: "warning"
        });
          return false;
        }
      });
        },
            aaa() {
      //  history.back(-1)
      this.$router.go(-1);
    },
    getdata() {
      let params = {
        id: this.$route.query.id
      };
      this.$apis.common.salepro_edit(params).then(res => {
        if (res.data.code == 1) {
          this.form = res.data.data;
        }
      });
    },
    goBack() {
      history.back(-1);
    }
  }
}
  
</script>
<style scoped>
.main_head {
  margin: auto;
  width: 96%;
  height: 40px;
  font-size: 22px;
  font-weight: 900;
  margin: 0 2%;
  /* line-height: 30px; */
}
</style>
