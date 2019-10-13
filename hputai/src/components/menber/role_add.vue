<template>
<div class="main">


   <span>角色名称:</span> <el-input v-model="form.role_name" style="width:200px"></el-input> <br><br><br>



 <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全部选择</el-checkbox>
 <div style="margin: 15px 0;"></div>
 
<span v-for="(item,index) in cityOptions" :key="index">
    <el-checkbox-group v-model="form.menu_id">
<el-checkbox :label="item.id">{{item.menu_name}}</el-checkbox>
  </el-checkbox-group>
  <div style="margin: 10px 0;"></div>
  <el-checkbox-group style="margin-left:15px" v-model="form.menu_id">
  <span v-for="(item1,index1)  in item.children"  :key="index1">
    <el-checkbox  :label="item1.id">{{item1.menu_name}}</el-checkbox>
  <br>
    <span style="margin-left:20px"></span> <el-checkbox v-for="(item2,index2) in item1.children" :label="item2.id" :key="index2">{{item2.menu_name}}</el-checkbox>
 <div style="margin: 10px 0;"></div>
 </span>

  </el-checkbox-group>

 
   <el-divider></el-divider>

</span>


        <p style="margin-top:40px">
        <el-button type="primary" @click="postdata">确定</el-button>
            <el-button @click="goBack">取消</el-button>
        </p>

</div>

</template>
<script>

  export default {
    data() {
      return {
          form:{
              role_name:'',
              menu_id:[],
          },
              checkAll:true,//全选
          allinputid:[],// 全部id
      cityOptions:'',//全部菜单数据
      isIndeterminate: true
      };
    },
    created () {
      this.getdata()
    },
    methods: {
        handleCheckAllChange(val) {
       this.form.menu_id = val ? this.allinputid : [];
        this.isIndeterminate = false;
      },  
  getdata(){
    this.$apis.common.menu_list().then(res=>{
          if(res.data.code==1){
            this.cityOptions=res.data.data
                   for(var i=0;i<this.cityOptions.length;i++){
                    this.allinputid.push(this.cityOptions[i].id)
                      for(var z=0;z<this.cityOptions[i].children.length;z++){
                        this.allinputid.push(this.cityOptions[i].children[z].id)
                        if(this.cityOptions[i].children[z].children){
                          
                            for(var y=0;y<this.cityOptions[i].children[z].children.length;y++){
                               this.allinputid.push(this.cityOptions[i].children[z].children[y].id)
                            }
                        }
                        
                      } 
                   }
            
          }
    })
  },
  postdata(){
    this.$apis.menber.role_add(this.form).then(res=>{
        if(res.data.code==1){
           this.$message({
          message: '添加成功',
          type: 'success'
        })
        history.back(-1)
                }else{
                    this.$message.error(res.data.msg);
            return false;
                }
    })
  },
     goBack() {
        history.back(-1)
      },
      
    }
  };
</script>