<template>
  <div class="main">
    <h3>编辑充值记录单</h3>
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="学员姓名：" style="width:1000px" prop="uname">
        <el-input v-model="form.uname" style="width:200px" @input="ifname"></el-input>
      </el-form-item>

      <el-form-item label="实收金额：" prop="in_amount">
        <el-input v-model="form.in_amount" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="赠送金额：">
        <el-input v-model="form.given_amount" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="赠送类别：">
        <el-select clearable v-model="form.given_type">
          <el-option
            v-for="item in msg.data.giventype_list"
            :key="item.value"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="赠送说明：">
        <el-input v-model="form.given_remarks" style="width:300px" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="收款类别：" prop="collection_class">
        <el-select clearable v-model="form.collection_class" placeholder="请选择">
          <el-option
            v-for="item in msg.data.collectionclass_list"
            :key="item.value"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收款方式：" style="width:1000px" prop="collection_type">
        <el-select
          clearable
          v-model="form.collection_type"
          placeholder="请选择支付方式"
          @input="getfinanceid"
        >
          <el-option
            v-for="item in msg.data.collectiontype_list"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
        <span style="color:red">(自行充值:学员主动去前端充值,非扫码转账.若选择自行充值收款方式请选对应的充值订单)</span>
      </el-form-item>
      <el-form-item label="充值订单：" prop="collection_type" v-show="form.collection_type=='用户自行充值'">
        <el-select clearable v-model="form.financeId" filterable multiple placeholder="请选择关联的订单">
          <el-option
            v-for="item in financeId"
            :key="item.id"
            :label="+item.price+'元'+'   '+item.addtime"
            :value="item.id"
          ></el-option>
        </el-select>
        <span style="color:red" v-show="form.collection_type==4">请选择充值订单</span>
      </el-form-item>
      <el-form-item label="实收人：" prop="in_people">
        <el-select
          clearable
          style="width:200px"
          class="so_input"
          v-model="form.in_people"
          filterable
          placeholder="请输入"
        >
          <el-option v-for="item in people" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="第二收款人">
        <el-select clearable v-model="form.consultant1" filterable placeholder="搜索选择">
          <el-option v-for="item in adviser" :key="item.id" :label="item.adviser" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="报课项目：" prop="classproject">
        <el-select clearable v-model="form.classproject" placeholder="请选择">
          <el-option
            v-for="item in msg.data.classproject_list"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item style="width:100%;margin-left:30px">
        <el-button type="primary" @click="add">提交</el-button>
        <el-button @click="goback">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    var YanuUname = (rules, value, callback) => {
      if (!value) {
        return callback(new Error("姓名不能为空"));
      }
      this.$apis.common.recharge_check(this.form.uname).then(res => {
        if (res.data.code == 1) {
          callback();
        } else {
          if (res.data.msg == "") {
            callback(new Error("学生姓名不存在"));
          } else {
            callback(new Error(res.data.msg));
          }
        }
      });
    };
    var YanuIn_amount = (rules, value, callback) => {
      if (!value) {
        return callback(new Error("金额不能为空"));
      }
      if (value < 0) {
        return callback(new Error("金额不能小于0"));
      } else {
        callback();
      }
    };
    return {
      msg: "", //获取基础选择数据
      id: this.$route.query.id, //编辑单id
      people: "", //实收人数据
      adviser: "", //顾问数据
      teacher: "", //班主任数据
      financeId: "", //关联充值id
      form: {
        uname: "", //用户名
        in_amount: "", //实收金额
        given_amount: "", //赠送金额
        given_type: "", //赠送类别
        given_remarks: "", //赠送备注说明
        collection_class: "", //收款类别
        collection_type: "", //收款方式
        financeId: "", //关联用户充值的记录id
        financeData: "", //关联订单数据
        in_people: "", //实收人
        consultant1: "", //顾问1
        consultant2: "", //顾问2
        classproject: "", //报课项目
        teacher: "" //班主任
      },
      rules: {
        uname: [{ required: true, validator: YanuUname, trigger: "blur" }],
        in_amount: [
          { required: true, validator: YanuIn_amount, trigger: "blur" }
        ],
        collection_class: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        collection_type: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        in_people: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        consultant1: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        classproject: [
          { required: true, message: "此项不能为空", trigger: "blur" }
        ],
        teacher: [{ required: true, message: "此项不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getdata();
  },
  computed: mapState(["banzhuren_list"]),
  methods: {
    getfinanceid() {
      let params={
        uname:this.form.uname
      }
      //获取历史订单
      this.$apis.common.user_recharge_list(params).then(res => {
        if (res.data.code == 1) {
          this.financeId = res.data.data.list;
        }
      });
    },
    //获取数据
    getdata() {
      this.$apis.common.basedata_list().then(res => {
        this.msg = res.data;
      });
      this.$apis.common.inpeople_list().then(res => {
        // 实收人数据
        if (res.data.code == 1) {
          this.people = res.data.data.list;
          this.teacher = this.banzhuren_list;
        }
      });
      this.$apis.common.adviser_list().then(res => {
        //获取顾问数据
        if (res.data.code == 1) {
          this.adviser = res.data.data.list;
          // this.people
        }
      });
      let prams = {
        id: this.id
      };
      this.$apis.common.recharge_edit(prams).then(res => {
        if (res.data.code == 1) {
          this.form = res.data.data;
          let item = [];
          for (var i = 0; i < this.form.financeId.length; i++) {
            let tt = parseInt(this.form.financeId[i]);
            item.push(tt);
          }
          this.form.financeId = item;
          this.financeId = res.data.data.financeData;
          this.$apis.common.recharge_list(res.data.data.uname).then(res => {
            if (res.data.code == 1) {
              for (var i = 0; i < res.data.data.list.length; i++) {
                this.financeId.push(res.data.data.list[i]);
              }
            }
          });
        }
      });
      //       this.$apis.common.teacher_list().then(res=>{ // 获取班主任数据
      //   if(res.data.code==1){
      //  // this.teacher=res.data.data.list
      //   }
      // })
      //
    },
    ifname() {
      this.$apis.common.recharge_check(this.form.uname).then(res => {
        if (res.data.code == 1) {
          this.tipname = "";
                   let banzhuren = this.banzhuren_list.find(item=>{
            return item.id=res.data.data.banzhuren_id
          })
          let num = parseInt(res.data.data.banzhuren_id);
          this.form.teacher = banzhuren.banzhuren;
          // let num = parseInt(res.data.data.banzhuren_id);
          // for (var i = 0; i < this.teacher.length; i++) {
          //   if (this.teacher[i].id == num) {
          //     this.form.teacher = num;
          //   }
          // }
        }
      });
    },
    // 返回上一页
    goback() {
      javascript: history.back(-1);
    },
    add() {
      this.$apis.common.recharge_update(this.form).then(res => {
        if (res.data.code == 1) {
          this.loading = false;
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.goback();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>
<style scoped>
.main {
  width: 500px;
}
h3 {
  margin-bottom: 20px;
}
</style>
