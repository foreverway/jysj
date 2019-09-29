 <template>
 <div class="main">
<el-input placeholder="请输入搜索内容" v-model="form.search" @input="getdata" clearable style="width:300px"></el-input> <el-button type="primary" >搜索</el-button>
 <router-link to="/RoleAdd">
  <el-button type="primary" style="float:right">创建角色</el-button>
 </router-link>


        <el-table 
        :data="tableData.list"
         :header-cell-style="{background:'#f4f4f4'}"
        style="margin-top:20px">
         <el-table-column
      type="index"
       label="序号"
      :index="indexMethod">
    </el-table-column>
        <el-table-column
            prop="role_name"
            label="角色"
           >
        </el-table-column>
  


           <el-table-column
            prop="addtime"
            label="创建时间">
        </el-table-column>


           <el-table-column
            prop="address"
            label="操作">
             <template slot-scope="scope">
                  <router-link :to="'/RoleEdit/'+ scope.row.id">
        <el-button type="text" size="small">编辑 </el-button>
                  </router-link>
         <el-button @click="admin_del(scope.row)" type="text" size="small">删除</el-button>
           </template>
        </el-table-column>
              

        </el-table>

    </div>
  </template>

  <script>
    export default {
      data() {
        return {
              input: '',
          tableData: '',
          form:{
              search:'',
              page:1
          }
        }
      },
      created () {
        this.getdata()  
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
              this.$confirm('此操作将永久删除'+row.admin_name+'用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
let params={
    role_id:row.id
}
       this.$apis.menber.role_del(params).then(res=>{
              if(res.data.code==1){
                           this.$message({
          message: row.admin_name+'用户删除成功',
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
              this.$apis.menber.role_list(this.form).then(res=>{
                    if(res.data.code==1){
                        this.tableData=res.data.data
                    }
              })
          }
      }
    }
  </script>
