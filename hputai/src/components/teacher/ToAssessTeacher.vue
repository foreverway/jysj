<template>
  <div>
    <div class="head_word">
      <span style="color:#e6563a;">{{this.$route.params.name}}</span>教师评价
    </div>
    <el-form
      :model="form"
      :hide-required-asterisk="true"
      :label-position="labelPosition"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="对老师评价" prop="contents">
        <el-input
          class="aa"
          type="textarea"
          width="200px"
          placeholder="内容可为：备课情况、教学态度、课堂互动、授课风格、教学设计、课后反馈及作业"
          v-model="form.contents"
        ></el-input>
      </el-form-item>
      <el-form-item label="综合打分" prop="rate">
        <el-rate v-model="form.rate" show-text :texts="['失望', '一般', '满意', '喜欢', '完美']"></el-rate>
      </el-form-item>
      <el-button type="primary" class="assess" @click="goBack">返回</el-button>
      <el-button type="success" class="assess1" @click="forAssess('form')">评价</el-button>
    </el-form>
    <p>评价列表</p>
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
      <li
        style="margin:.5rem 10%;"
        v-for="i in assessList"
        class="infinite-list-item"
        :key="i.contents"
      >
      <div class="say_flex">
        <el-image
          :src="i.head_url"
          style="width:50px;height:50px;margin-top:20px;border:1px white solid;border-radius:50%;"
        >
          <div slot="error" class="image-slot">
            <!-- //<i class="el-icon-picture-outline"></i> -->
            <img
              style="width:50px;height:50px;border:1px white solid;border-radius:50%;"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              alt
            />
          </div>
               
        </el-image>
        <div class="right_content">
            <span style="height:1rem;line-height:1rem;margin:0 .5rem;">{{i.username}}</span>
           
            <el-rate  v-model="i.rate*1" disabled></el-rate>
 <el-button size="mini" style="color:white;background-color:#409EFF;margin:0 .5rem;" v-if="i.is_evaluate">追评</el-button>
   
        <p  style="">{{i.contents}}</p>
        </div>

      </div>
<!-- <hr style="color:silver;"> -->
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        contents: "",
        rate: 5,
        teacher_id: this.$route.params.id,
        head_url:''
      },
      assessed: true, //你是否评价过
      assessList: "",
      labelPosition: "left",
      texts: ["失望", "一般", "满意", "喜欢", "完美"],
      rules: {
        contents: [
          { require: true, message: "请输入教师评价", trigger: "blur" },
          { min: 15, message: "你需要对老师有15字以上的评价", tigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getAssessList();
        this.$apis.menber
        .admin_base({admin_id: this.getdataCookie("admin_id")})
        .then(res => {
          if (res.data.code == 1) {
         this.admin_head=res.data.data.admin_head
  
   this.form.head_url= this.admin_head
   console.log(this.head_url)
          }
        })
  },
  methods: {
    load() {
      //this.count += 2
    },
        // 读取缓存
    getdataCookie(cname) {
      // return 1
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      // 路由跳转
      // window.location.href = ''
      this.$router.push({ path: "/login" });
      // Router.push("/")
    },
    goBack() {
      this.$router.go(-1);
    },
    getdataCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      this.$router.push({ path: "/login" });
    },
    getAssessList() {
      this.$apis.common
        .teacher_evaluation_get({ teacher_id: this.$route.params.id })
        .then(res => {
          if (res.data.code == 1) {
            this.assessList = res.data.data;
            if (this.$route.params.eval_status == "已评") {
              this.assessed = false;
            }
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        });
    },
    forAssess(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$apis.common.teacher_evaluation(this.form).then(res => {
            if (res.data.code == 1) {
              this.$message({
                message: "评价成功",
                type: "success"
              });
              this.form.contents = "";
              this.getAssessList();
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.head_word {
  font-size: 26px;
  font-weight: 700;
  margin: 15px;
}
.aa {
  width: 60% !important;
}
li {
  list-style: none;
}
.el-rate {
  height: 20px;
  line-height: 3;
  display: inline-block;
}
.assess {
  width: 9%;
  margin-left: 45%;
}
.assess1 {
  width: 9%;
  margin-left: 2%;
}
.say_flex{
  width:100%;
  height: 5rem;
  display:flex;
  align-items: center;
  justify-content: space-around;
}
.say_flex .right_content{
  width:85%;
    /* height: 5rem;
      display:flex;
      flex-direction: column;
  align-items: center;
  justify-content: space-around; */
}
/* .top_content{
    display:flex;
  align-items: center;
  justify-content: space-around;
} */
</style>