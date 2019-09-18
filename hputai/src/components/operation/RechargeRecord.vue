<template>
    <div class="main"  title="充值记录单">
      <h3>充值记录单</h3>
        <div class="so_main_left">
           <el-form :inline="true" :model="form" label-width="90px">
             <el-form-item label="学生姓名：">
 <el-input  clearable style="width:180px" class="so_input" v-model="form.search" @input="getadata" placeholder="请输入用户名"></el-input>
            

             </el-form-item>
           
               
            <el-form-item label="实收人：">
                <el-select  clearable style="width:180px"  class="so_input" v-model="form.in_people" filterable placeholder="请输入" @change="getadata">
                    <el-option
                            v-for="item in people"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                            </el-option>
                </el-select>
            </el-form-item>
                 <el-form-item label="顾问1：">
                <el-select clearable  style="width:180px"  v-model="form.consultant1" filterable placeholder="搜索选择" @change="getadata">
                   <el-option
                            v-for="item in adviser"
                            :key="item.id"
                            :label="item.adviser+item.id"
                            :value="item.id">
                            </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="班主任：">
                <el-select clearable style="width:180px"  v-model="form.teacher" filterable placeholder="搜索选择" @change="getadata">
              <el-option
                            v-for="item in teacher"
                            :key="item.id"
                            :label="item.teacher_name"
                            :value="item.id">
                            </el-option>
                </el-select>
            </el-form-item>
<br>
             <el-form-item label="进线项目：">
                 <el-select clearable style="width:180px" v-model="form.inproject" @change="getadata" filterable placeholder="请选择">
                            <el-option
                            v-for="item in base_selct.data.inproject_list"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                            </el-option>
                        </el-select>
            </el-form-item>

             <el-form-item label="进线渠道：">
                <el-select clearable style="width:180px" v-model="form.inchannel" placeholder="请选择" @change="getadata">
              <el-option
                            v-for="item in base_selct.data.inchannel_list"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                            </el-option>
                </el-select>
            </el-form-item>

       <el-form-item label="收款类别：">
                <el-select clearable style="width:140px" v-model="form.collection_class" placeholder="请选择" @change="getadata">
               
               <el-option
                            v-for="item in base_selct.data.collectionclass_list"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                            </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="收款方式：">
                <el-select clearable style="width:140px" v-model="form.collection_type" placeholder="请选择" @change="getadata">
               
               <el-option
                            v-for="item in base_selct.data.collectiontype_list"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                            </el-option>
                </el-select>
            </el-form-item>
<br>
            <el-form-item label="审核状态：">
                <el-select clearable style="width:120px" v-model="form.status" placeholder="请选择" @change="getadata">
                <el-option label="待审核" value="0"></el-option>
                <el-option label="审核通过" value="1"></el-option>
                <el-option label="审核不通过" value="2"></el-option>
                </el-select>
            </el-form-item>
       
 <el-date-picker style="width:200px" @change="getadata"
      v-model="form.start_time" clearable
      type="datetime"
       value-format="yyyy-MM-dd H:mm:ss"
      placeholder="开始时间">
    </el-date-picker>
    至
         <el-date-picker  @change="getadata" style="width:200px"
      v-model="form.end_time" clearable
      type="datetime"
       value-format="yyyy-MM-dd H:mm:ss"
      placeholder="结束时间">
    </el-date-picker>
    <router-link to="/Rechargecreate"> <el-button v-if="msg.data.permissions.isAdd==1" type="primary" >新增充值记录单</el-button></router-link>

 <el-button v-if="msg.data.permissions.isExport==1" type="primary" @click="recharge_export" >导出</el-button>
 
 </el-form>
        </div>

 <!-- 表格开始 -->
 <el-table  
    :data="tableData"
   :header-cell-style="{background:'#f4f4f4'}"
   >
      <el-table-column label="序号"
      type="index"
      :index="indexMethod">
    </el-table-column>
     <el-table-column :show-overflow-tooltip="true"  align="center"
      label="学生姓名"
     >
      <template slot-scope="scope">
        <span>{{ scope.row.uname }}</span>
      </template>
    </el-table-column>
  
    <el-table-column align="center"
      label="收款类别"
     >
      <template slot-scope="scope">
      
        <span >{{ scope.row.collection_class }}</span>
      </template>
    </el-table-column>

     <el-table-column align="center"
      label="收款方式"
    >
      <template slot-scope="scope">
     
        <span >{{ scope.row.collection_type }}</span>
      </template>
    </el-table-column>
       <el-table-column align="center"
      label="进线编号"
     >
      <template slot-scope="scope">
        <span >{{ scope.row.in_number }}</span>
      </template>
    </el-table-column>
    <el-table-column align="center"
      label="进线项目"
     >
      <template slot-scope="scope">
        <span >{{ scope.row.inproject }}</span>
      </template>
    </el-table-column>
     <el-table-column align="center"
      label="进线渠道" 
     >
      <template slot-scope="scope">
        <span> {{ scope.row.inchannel }}</span>
      </template>
    </el-table-column>
     <el-table-column align="center"
      label="实收金额（元）"
     >
      <template slot-scope="scope">
      <span >{{ scope.row.in_amount }}</span>
      </template>
    </el-table-column>
      <el-table-column align="center"
      label="赠送金额（元）"
     >
      <template slot-scope="scope">
      
        <span >{{ scope.row.given_amount }}</span>
      </template>
    </el-table-column>
 
    <el-table-column align="center" label="赠送类别">
      <template slot-scope="scope">
            <span >{{ scope.row.given_type }}</span>
      </template>
    </el-table-column>

   <el-table-column align="center" label="赠送备注说明">
      <template slot-scope="scope">
            <span >{{ scope.row.given_remarks }}</span>
      </template>
    </el-table-column>

       <el-table-column align="center" label="实收人">
      <template slot-scope="scope">
            <span >{{ scope.row.in_people }}</span>
      </template>
    </el-table-column>

       <el-table-column align="center" label="顾问1">
      <template slot-scope="scope">
            <span >{{ scope.row.consultant1 }}</span>
      </template>
    </el-table-column>

       <el-table-column align="center" label="顾问2">
      <template slot-scope="scope">
            <span >{{ scope.row.consultant2 }}</span>
      </template>
    </el-table-column>

           <el-table-column align="center" label="报课项目">
      <template slot-scope="scope">
            <span >{{ scope.row.classproject }}</span>
      </template>
    </el-table-column>

       <el-table-column align="center" label="班主任">
      <template slot-scope="scope">
            <span >{{ scope.row.teacher }}</span>
      </template>
    </el-table-column>

       <el-table-column align="center" label="创建时间">
      <template slot-scope="scope">
            <span >{{ scope.row.create_time }}</span>
      </template>
    </el-table-column>

       <el-table-column align="center" label="审核状态">
      <template slot-scope="scope">
            <span v-if="scope.row.status==0" >待审核</span>
             <span v-if="scope.row.status==1" style="color:#67c23a;">审核通过</span>
              <span v-if="scope.row.status==2" style="color:red;">审核不通过</span>
      </template>
    </el-table-column>

       <el-table-column align="center" label="操作" width="200">
      <template slot-scope="scope">
        <router-link :to="'/EditRecharge/'+scope.row.id" v-if="scope.row.status==0||scope.row.status==2" v-show="msg.data.permissions.isEdit==1" >
        <el-button size="mini" type="success" >编辑</el-button>
          
        </router-link>
        <el-button size="mini" type="info" disabled v-if="scope.row.status==1">编辑</el-button>
        <span v-if="scope.row.isZhuan">
         
            <el-button v-if="scope.row.isZhuanAudit" v-show="scope.row.status==0||scope.row.status==2" size="mini" @click="dialogFormVisible4=true,shenhe( scope.row.id)" type="primary" >审核</el-button>
        
            

        </span>
         <span v-else>
               <el-button  v-if="scope.row.status==0||scope.row.status==2" v-show="msg.data.permissions.isAudit==1" size="mini" @click="dialogFormVisible4=true,shenhe( scope.row.id)" type="primary" >审核</el-button>
         </span>
      <el-button  v-if="scope.row.status==1" size="mini"  type="info" disabled >已审核</el-button>
      </template>
    </el-table-column>


  </el-table>
 <!-- 表格结束 -->
<el-dialog title="审核" :visible.sync="dialogFormVisible4" width="300px"  close-on-click-modal=false>
     <el-input   type="textarea" v-model="form1.audit_content"  placeholder="请输入理由"></el-input>
   
    <p style="margin-bottom:10px"></p>
    <el-button type="primary" @click="dialogFormVisible4 = false,tongguo(1)">通过</el-button>
    <el-button type="danger" @click="dialogFormVisible4= false,tongguo(2)">不通过</el-button>
</el-dialog>


 <p style="margin-top: 30px;"><span class="mg_left">实收金额(元) :</span><span class="monney">{{msg.data.inamount}}</span> <span class="mg_left">赠送金额(元)：</span> <span class="monney">{{msg.data.givenamount}}</span> </p>
 <el-pagination style=" float: right;margin-bottom: 30px;"
  background
  layout="prev, pager, next"
  @prev-click="prev"
  @next-click="next"
  @current-change="current"
  :page-size="10"
  :total="msg.data.count">
</el-pagination>

    </div>
</template>

<script>
// import glbol from '../common/const_config.js'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      base_selct:'',//基础选择数据
      adminid:'',//管理员id
       dialogFormVisible4:false,//审核弹出框
      people:'',//实收人=顾问数据+班主任数据
      classs:'',// 进项线目数据
      adviser:'',//顾问数据
      teacher:'',//班主任数据
      form:{
        search:'', //搜索学员姓名条件
        page:1,
        in_people:'',//实收人
        inproject:'',//进线项目,课程id
         inchannel:'',//进线渠道 ,进线渠道,1百度SEM,2转介绍
          consultant1:'',//顾问1
           teacher:'',//班主任
           collection_class:'',//收款类别
            collection_type:'',//收款方式，1微信，2支付宝，3银联转账，4用户自行充值
             status:'',//审核状态，0待审核，1审核通过，2审核不通过
              start_time:'',//搜索开始时间
               end_time:'',//搜索结束时间
                uid:'',//如果有uid,查询该用户的记录
      },
      tableData:'',
      msg:'',
      form1:{
          id:'', // 审核主键id
          status:'',//审核通过状态，1通过，2不通过
          audit_content:'',//审核理由内容
      }
     
    }
  },
  computed:mapState["banzhuren_list"],
  created () {
      //this.$apis.common.getuilcode()
    this.getadata()
    this.adminid=this.getdataCookie('admin_uid')
  },
  methods: {
    //审核
shenhe(id){
 this.form1.id=id
},


       current(num){//当前页数
this.form.page=num
this.getadata()
      },
      next(){
        this.form.page++
        this.getadata()
      },
      prev(){ //上一页
if(this.form.page>1){
  this.form.page--
  this.getadata()
}        
      },

tongguo(num){
  this.form1.status=num
   this.$apis.common.recharge_audit(this.form1).then(res=>{
     if(res.data.code==1){
       if(this.form1.status==1){
       this.$message({
            type: 'success',
            message: this.form1.id +' 已通过审核' 
          })
          this.getadata()
       }else{
this.$message({
            type: 'success',
            message: this.form1.id +' 已审核为不通过' 
          })
          this.getadata()
       }
                  
   }else{
      this.$message.error(res.data.msg);
   }
})
},
    //导出
    recharge_export(){
      let urls=glbol.post_url_s
      let parms=''

       for(var key in this.form){
         
         parms+=key+'='+ this.form[key]+'&'
       }
        window.location.href=urls+'/pc_recharge_export'+'?'+parms
    },

     //序号排列
      indexMethod(index) {
            if(this.form.page==1){
              return  (index+1) 
            }else{
               let page=(this.form.page-1)*10+1
            
              return index+page
            }
      },
    getadata(){
        //总数据
                  this.$apis.common.recharge_list(this.form).then(res => {   
                     if(res.data.code==1){
                       this.msg=res.data
             this.tableData=res.data.data.list
             console.log(this.tableData)
        }
    })
      this.$apis.common.inpeople_list().then(res=>{ // 实收人数据
              if(res.data.code==1){
                this.people=res.data.data.list
              }
      })
      this.$apis.common.basedata_list().then(res=>{ //获取基础数据
    if(res.data.code==1){
        this.base_selct=res.data
    }
})
this.$apis.common.teacher_list_only().then(res=>{ // 获取班主任数据
  if(res.data.code==1){
  this.teacher=res.data.data.list

  }
})
this.$apis.common.adviser_list().then(res=>{ //获取顾问数据
   if(res.data.code==1){
  this.adviser=res.data.data.list
  console.log(this.banzhuren_list)
//   this.people
  }
})


    },
      // 读取缓存
  getdataCookie (cname) {
    // return 1
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
    }
    // 路由跳转
    //window.location.href = 'http://testadmin.test.hqjystudio.com/admin/login/login.php'
    // Router.push("/")
  }
  }
}
</script>

<style scoped>
.mg_left{
  margin-left: 30px;
  
}
.monney{
  color: red;
}
.so_input{
  width: 300px;
}
.so_main_left{float: left;    margin-bottom: 20px;margin-top: 20px;}
.so_main_right{float: right;}
.yulan_height{height: 50vh;}
</style>
