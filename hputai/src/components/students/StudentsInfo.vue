<template>
    <div>
        <p><span>学员</span><span style="font-weight:700;color:orange;margin:0 5px;">{{form.username}}</span><span>的详情</span></p>
         <p style="margin:10px;"><span style="font-weight:900;color:orange;font-size:25px;">&nbsp;|&nbsp;</span>基本信息</p>
 
          <ul :data="form">
            <li>
              <span>地区</span>
              <span>{{form.subject_name}}</span>
            </li>
            <li>
              <span>手机号</span>
              <span>{{form.tel}}</span>
            </li>
            <li>
              <span>学员等级</span>
              <span>{{form.alevel}}</span>
            </li>
            <li>
              <span >性别</span>
              <span style=" border-top-style:hidden;">{{form.sex}}</span>
            </li>
            <li>
              <span>年龄</span>
              <span style=" border-top-style:hidden;">{{form.age}}</span>
            </li>
            <li>
              <span>学校</span>
              <span style=" border-top-style:hidden;">{{form.school}}</span>
            </li>
            <li>
              <span>年级</span>
              <span>{{form.grade}}</span>
            </li>
             <li>
              <span>微信/QQ</span>
              <span>{{form.weixin_qq}}</span>
            </li>
            <li >
              <span >监护人</span>
              <span >{{form.guardian}}</span>
            </li>
          </ul>
                   <ul :data="form">
            <li>
              <span>监护人联系方式</span>
              <span>{{form.guardian_phone}}</span>
            </li>
            <li>
              <span>通讯地址</span>
              <span>{{form.always_address}}</span>
            </li>
            <li>
              <span>进线编号</span>
              <span>{{form.in_number}}</span>
            </li>
            <li>
              <span >进线项目</span>
              <span style=" border-top-style:hidden;">{{form.inproject}}</span>
            </li>
            <li>
              <span>进线渠道</span>
              <span style=" border-top-style:hidden;">{{form.end_time}}</span>
            </li>
            <li>
              <span>接入人</span>
              <span style=" border-top-style:hidden;">{{form.inchannel}}</span>
            </li>
            <li>
              <span>班主任</span>
              <span>{{form.banzhuren_id}}</span>
            </li>
             <li>
              <span>顾问</span>
              <span></span>
            </li>
            <li >
              <span >升学指导</span>
              <span ></span>
            </li>
             <li >
              <span >教学主管</span>
              <span ></span>
            </li>
          </ul>
                    <div style="clear:both;">
          </div>
     <p style="margin:10px;"><span style="font-weight:900;color:orange;font-size:25px;">&nbsp;|&nbsp;</span>排课列表</p>
           <el-table
               border
      :data="tableData"
      style="width: 50%">
      <el-table-column
        prop="date"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="报名表标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="编号">
      </el-table-column>
    </el-table>
    <el-button type="primary" style="margin:10px;" @click="goBack">确定</el-button>
    </div>
</template>
<script>
   export default {
       data() {
           return {
               form:'',
                activeNames: ['1']
           }
       },
        created(){
           this.getData()
       },
       methods:{
                 handleChange(val) {
        console.log(val);
      },
      goBack(){
          this.$router.go(-1)
      },
            getData(){
            this.$apis.students.students_edit({id:this.$route.query.id}).then(res=>{
                if(res.data.code==1){
                    this.form=res.data.data
                }
            })
           },
       },

       mounted(){

       },
   }
</script>
<style scoped>
ul{
    background-color: #fff;
    height: 90px;
    width: 98%;
}
li {
  list-style: none;
  display: inline-block;
  float: left;
  width: 32%;
  height: 30px;
  padding: 0;
  margin: 0 0 0 -1px;
}
li span{
    display: inline-block;
  float: left;
  width: 49%;
  height: 30px;
  line-height: 30px;
}
li :nth-child(1) {
   width: 30%;
   text-align: center;
   background-color: #F5F5F5;
    /* border:1px solid #F5F5F5; */
}
li :nth-child(2) {
   width: 69%;
   text-align: center;
   border:1px solid #F5F5F5;
}
</style>