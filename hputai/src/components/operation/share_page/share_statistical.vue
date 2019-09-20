<template>
<div class="so_main">
<div class="so_main_left">

 <el-form :inline="true" :model="formInline" class="demo-form-inline">
<el-input class="so_input" v-model="form.uname" @input="getadata" placeholder="请输入学员姓名"></el-input>
<el-input class="so_input" v-model="form.admin_username" @input="getadata" placeholder="请输入创建者姓名"></el-input>
 <el-select  clearable style="width:180px"  class="so_input" v-model="form.share_config_id" filterable placeholder="请选择素材标题" @change="getadata">
                    <el-option
                            v-for="item in sharelist"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id">
                            </el-option>
                </el-select>
   <el-date-picker style="margin-left:60px"
      v-model="form.start_time"  @change="getadata"
      type="datetime" clearable
       value-format="yyyy-MM-dd H:mm:ss"
      placeholder="选择日期时间">
    </el-date-picker>
    至
         <el-date-picker  @change="getadata"
      v-model="form.end_time"
      type="datetime" clearable
       value-format="yyyy-MM-dd H:mm:ss"
      placeholder="选择日期时间">
    </el-date-picker>

  <el-button type="primary" @click="exportExcel" v-if="isExport">导出</el-button>
 </el-form>

  </div>



  <!-- 表格数据 -->
 <el-table  id="out-table"
    :data="tableData"
     :header-cell-style="{background:'#f4f4f4'}"
       border
    style="width: 100%">
   <el-table-column label="序号"
      type="index"  width="80" align="center"
      :index="indexMethod">
    </el-table-column>

   <el-table-column align="center"
      label="创建人"
     >
      <template slot-scope="scope">
     
        <span >{{ scope.row.admin_name }}</span>
      </template>
    </el-table-column>

     <el-table-column :show-overflow-tooltip="true" align="center"
      label="推广标题"
      width="200">
      <template slot-scope="scope">
        <span >{{ scope.row.title }}</span>
      </template>
    </el-table-column>
   
      <el-table-column align="center" label="指定学员账户名" >
      <template slot-scope="scope">
        <span >{{ scope.row.uname }}</span>
      </template>
    </el-table-column>

          <el-table-column align="center" label="查看人微信昵称" >
      <template slot-scope="scope">
        <span >{{ scope.row.look_weixin_name }}</span>
      </template>
    </el-table-column>

      <el-table-column align="center" label="查看人微信头像" >
      <template slot-scope="scope">
        <img :src=" scope.row.look_weixin_avatar" height="50" alt="">
      
      </template>
    </el-table-column>

           <el-table-column align="center" label="查看人微信id" >
      <template slot-scope="scope">
        <span >{{ scope.row.look_weixin_openid }}</span>
      </template>
    </el-table-column>

     <el-table-column align="center"
      label="查看时间"
     >
      <template slot-scope="scope">
      
        <span >{{ scope.row.look_time }}</span>
      </template>
    </el-table-column>


   
  </el-table>

<el-pagination style="margin-top:30px;float: right;"
  background
  layout="prev, pager, next"
     @prev-click="prev"
  @next-click="next"
  @current-change="current"
  :total="msg.data.count">
</el-pagination>
       
</div>
 
</template>

<script>
//import glbol from '../common/const_config.js'

  export default {
    data() {
      return {
        isExport:'',//是否有导出权限
     sharelist:'',//选择素材
       form:{
         uname:'',
         admin_username:'',
         share_config_id:'',
          page:1,
          start_time:'',
          end_time:''
       },
        msg:'',
        tableData:'',
      
      }
    },
    created () {
      this.getadata()
    },
    methods: {
      //导出功能
      exportExcel(){ 

           let urls=glbol.post_url_s
      let parms=''

       for(var key in this.form){
         
         parms+=key+'='+ this.form[key]+'&'
       }
        window.location.href=urls+'/pc_share_export'+'?'+parms

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
        getadata(){
            this.$apis.common.share_record_list(this.form).then(res => {
               this.msg= res.data
               this.tableData = res.data.data.list
              this.isShowConfig=res.data.data.permissions.isShowConfig
              this.isExport=res.data.data.permissions.isExport
                })
                this.$apis.common.share_config_list().then(res => {
            this.sharelist=res.data.data.list
            console.log(this.sharelist)
                })
        }
    }
  }
</script>
<style scoped>
.so_input{
  width: 150px;
  margin-bottom: 20px;
}
.so_main_left{float: left;}
.so_main_right{float: right;}
</style>
