<template>
 <div class="main">
<el-input placeholder="请输入搜索内容" v-model="form.search" @input="getdata" clearable style="width:300px"></el-input> <el-button type="primary" >搜索</el-button>
 <router-link to="LiveList/LiveAdd">
  <el-button type="primary" style="float:right">添加直播平台</el-button>
 </router-link>


        <el-table 
        :data="tableData"
         :header-cell-style="{background:'#f4f4f4'}"
        style="margin-top:20px">
         <el-table-column
      type="index"
       label="序号"
      :index="indexMethod">
    </el-table-column>
        <el-table-column
            prop="live_name"
            label="直播平台"
           >
        </el-table-column>
        <el-table-column
            prop="live_partner_id"
            label="partner_id"
            >
        </el-table-column>
        <el-table-column
            prop="live_partner_key"
            label="partner_key">
        </el-table-column>
            <el-table-column
            prop="live_domain"
            label="个性domian域名">
        </el-table-column>
        
           <el-table-column
            prop="live_url"
            label="平台url地址">
        </el-table-column>

           <el-table-column
            prop="isdefault"
            label="是否默认">
        </el-table-column>

           <el-table-column
            prop="addtime"
            label="创建时间">
        </el-table-column>

           <el-table-column
            prop="address"
            label="操作">
             <template slot-scope="scope">
                  <router-link :to="'LiveList/LiveEdit/'+ scope.row.id">
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
            input: '',
          tableData: '',
          form:{
              page:1
          }
       
        }
      },
      created () {
        this.getdata()  
      },
      computed:{
      ...mapState(['live_list'])
      },
      methods: {
          //表格索引
              indexMethod(index) {
           if(this.form.page==1){
              return  (index+1) 
            }else{
               let page=(this.form.page-1)*10+1
            
              return index+page
            }
      },

      // 删除数据
      admin_del(row){
       //  console.log(row.admin_id)
              this.$confirm('此操作将永久删除'+row.live_name+'直播平台, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
let params={
    id:row.id
}
       this.$apis.sys.live_del(params).then(res=>{
              if(res.data.code==1){
                           this.$message({
          message: row.live_name+'删除成功',
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
          // 获取数据
          getdata(){
            console.log(this.live_list)
              // this.$apis.sys.live_list().then(res=>{
              //       if(res.data.code==1){
                        this.tableData=this.live_list
                       
                    // }
              // })
          }
      }
    }
  </script>
