<template>
<div class="main">
     <div class="head_word">科目配置</div>
<el-input placeholder="请输入搜索内容"  @change="getdata_1" v-model="search_value" clearable style="width:300px"></el-input> <el-button type="primary" >搜索</el-button>
 <router-link to="/SubjectList/SubjectAdd">
  <el-button type="primary" style="float:right">添加科目</el-button>
 </router-link>
  <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;margin-top:20px;"
    row-key="id"
    border
   
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="subject_name"
      label="科目名称"
 
      width="180">
    </el-table-column>
    <el-table-column
      prop="online_price"
      label="线上价格(元)"

      width="180">
    </el-table-column>
    <el-table-column
      prop="offline_price"
      label="线下价格(元)">
    </el-table-column>
      <el-table-column
      prop="short"
      label="排序">
    </el-table-column>
      <el-table-column
      prop=""
      label="操作">
        <template slot-scope="scope">
                  <router-link :to="'/SubjectList/SubjectEdit/'+ scope.row.id">
        <el-button type="text" size="small">编辑 </el-button>
                  </router-link>
         <el-button @click="admin_del(scope.row)" type="text" size="small">删除</el-button>
           </template>
    </el-table-column>
  </el-table>


</div>
</template>
<script>
  import {mapState}  from 'vuex'
  export default {
    data() {
      return {
        tableData: [],
        search_value:''
      }
    },
    created () {
      this.getdata()
    },
    methods: {
   getdataCookie (cname) {
    // return 1
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
    }
    // 路由跳转
   // window.location.href = ''
    this.$router.push({path:'/login'})
    // Router.push("/")
  },
getdata(){
      let parms={
    // admin_id:this.getdataCookie('admin_id')
  }
  
this.$apis.common.subject_list(parms).then(res=>{
  if(res.data.code==1){
        this.tableData=res.data.data
  }
  else{
     this.$router.push({path:'/login'})
  }
})
},
getdata_1(){
      let parms={
    admin_id:this.getdataCookie('admin_id')
  }
  
this.$apis.common.subject_list(parms).then(res=>{
  if(res.data.code==1){
        this.tableData=res.data.data
  }
  else{
     this.$router.push({path:'/login'})
  }
})
},

   // 删除数据
      admin_del(row){
   
       //  console.log(row.admin_id)
              this.$confirm('此操作将永久删除'+row.subject_name+'用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
let params={
    id:row.id
}
       this.$apis.sys.subject_del(params).then(res=>{
              if(res.data.code==1){
                           this.$message({
          message: row.subject_name+'用户删除成功',
          type: 'success'
        })
        this.getdata()
              }else{
                     this.$message.error(res.data.msg);
              }
          })

        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   
      },

    },
    
  }
</script>
<style  scoped>
.head_word {
  font-size: 26px;
  margin:15px 0;
  font-weight: 700;
}
</style>