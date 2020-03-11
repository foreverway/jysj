<template>
    <div class="mian">

        <h4>进线项目配置</h4>
        <span v-if="msg.data">
        <span  class="project1 reg"  v-for="(item,index) in msg.data.inproject_list" :key="index" @click="dorp('inproject',item.id)">
            <el-badge value="x" class="item" >
            <span>{{item.name}}</span>
            </el-badge>
        </span>
        </span>
        <br><br>
         <el-input style="width:100px"
    size="mini"
    placeholder="请输入内容"
   
    v-model="inputmsg.inproject">
  </el-input>  <el-button size="mini" @click="adddata('inproject',inputmsg.inproject)"  type="primary" round>添加</el-button>
<br>

 <h4>进线渠道配置</h4>
         <span v-if="msg.data">

        <span class="project1 reg" v-for="(item,index) in msg.data.inchannel_list" :key="index" @click="dorp('inchannel',item.id)">
            <el-badge value="x" class="item" >
            <span >{{item.name}}</span>
            </el-badge>
        </span>
         </span>
        <br><br>
         <el-input style="width:100px"
    size="mini"
    placeholder="请输入内容"
   
    v-model="inputmsg.inchannel">
  </el-input>  <el-button size="mini" @click="adddata('inchannel',inputmsg.inchannel)"  type="primary" round>添加</el-button>
<br>

 <h4>接入人</h4>
         <span v-if="msg.data">

        <span class="project1 reg"  v-for="(item,index) in msg.data.inpeople_list" :key="index" @click="dorp('inpeople',item.id)">
            <el-badge value="x" class="item" >
            <span >{{item.name}}</span>
            </el-badge>
        </span>
         </span>
        <br><br>
         <el-input style="width:100px"
    size="mini"
    placeholder="请输入内容"
    v-model="inputmsg.inpeople">
  </el-input>  <el-button size="mini" @click="adddata('inpeople',inputmsg.inpeople)"  type="primary" round>添加</el-button>
<br>

 <h4>学员等级配置</h4>
         <span v-if="msg.data">

        <span class="project1 reg" v-for="(item,index) in msg.data.alevel_list" :key="index" @click="dorp('alevel',item.id)">
            <el-badge value="x" class="item" >
            <span >{{item.name}}</span>
            </el-badge>
        </span>
         </span>
        <br><br>
         <el-input style="width:100px"
    size="mini"
    placeholder="请输入内容"
    v-model="inputmsg.alevel">
  </el-input>  <el-button size="mini" @click="adddata('alevel',inputmsg.alevel)"  type="primary" round>添加</el-button>
<br>

 <h4>赠送类别配置</h4>
         <span v-if="msg.data">

        <span class="project1 reg" v-for="(item,index) in msg.data.giventype_list" :key="index" @click="dorp('giventype',item.id)">
            <el-badge value="x" class="item" >
            <span >{{item.name}}</span>
            </el-badge>
        </span>
         </span>
        <br><br>
         <el-input style="width:100px"
    size="mini"
    placeholder="请输入内容"
    v-model="inputmsg.giventype">
  </el-input>  <el-button size="mini" @click="adddata('giventype',inputmsg.giventype)"  type="primary" round>添加</el-button>
<br>

 <h4>收款类别配置</h4>
         <span v-if="msg.data">

        <span class="project1 reg" v-for="(item,index) in msg.data.collectionclass_list" :key="index" @click="dorp('collectionclass',item.id)">
            <el-badge value="x" class="item" >
            <span >{{item.name}}</span>
            </el-badge>
        </span>
         </span>
        <br><br>
         <el-input style="width:100px"
    size="mini"
    placeholder="请输入内容"
    v-model="inputmsg.collectionclass">
  </el-input>  <el-button size="mini" @click="adddata('collectionclass',inputmsg.collectionclass)"  type="primary" round>添加</el-button>
<br>
 
 <h4>收款方式配置</h4>
         <span v-if="msg.data">

        <span class="project1 reg" v-for="(item,index) in msg.data.collectiontype_list" :key="index" @click="dorp('collectiontype',item.id)">
            <el-badge value="x" class="item" >
            <span >{{item.name}}</span>
            </el-badge>
        </span>
         </span>
        <br><br>
         <el-input style="width:100px"
    size="mini"
    placeholder="请输入内容"
    v-model="inputmsg.collectiontype">
  </el-input>  <el-button size="mini" @click="adddata('collectiontype',inputmsg.collectiontype)"  type="primary" round>添加</el-button>
   <br>

 <h4>报课项目配置</h4>
         <span v-if="msg.data">

        <span class="project1 reg" v-for="(item,index) in msg.data.classproject_list" :key="index" @click="dorp('classproject',item.id)">
            <el-badge value="x" class="item" >
            <span >{{item.name}}</span>
            </el-badge>
        </span>
         </span>

        <br><br>
         <el-input style="width:100px"
    size="mini"
    placeholder="请输入内容"
    v-model="inputmsg.classproject">
  </el-input>  <el-button size="mini" @click="adddata('classproject',inputmsg.classproject)"  type="primary" round>添加</el-button>
   <br>

 <h4>课程体系配置</h4>
         <span v-if="msg.data">

        <span class="project1 reg" v-for="(item,index) in msg.data.subjects_system_list" :key="index" @click="dorp('subjects_system',item.id)">
            <el-badge value="x" class="item" >
            <span >{{item.name}}</span>
            </el-badge>
        </span>
         </span>

        <br><br>
         <el-input style="width:100px"
    size="mini"
    placeholder="请输入内容"
    v-model="inputmsg.subjects_system">
  </el-input>  <el-button size="mini" @click="adddata('subjects_system',inputmsg.subjects_system)"  type="primary" round>添加</el-button>
   <br>

    <h4>上课地址配置</h4>
         <span v-if="msg.data">

        <span class="project1 reg" v-for="(item,index) in msg.data.subjects_system_list" :key="index" @click="dorp('subjects_system',item.id)">
            <el-badge value="x" class="item" >
            <span >{{item.name}}</span>
            </el-badge>
        </span>
         </span>

        <br><br>
         <el-input style="width:100px"
    size="mini"
    placeholder="暂无接口"
    v-model="inputmsg.subjects_system">
  </el-input>  <el-button size="mini" @click="adddata('subjects_system',inputmsg.subjects_system)"  type="primary" round>添加</el-button>
   <br>
    </div>
</template>
<script>
export default {
    data () {
        return {
            msg:'', //数据
            inputmsg:{
                inproject:'', //进线项目
                inchannel:'',//进线渠道
                inpeople:'',//接入人
                alevel:'',//学员等级
                giventype:'',//赠送类别
                collectionclass:'',//收款类别
                collectiontype:'',//收款方式
                classproject:'', //报课项目
                subjects_system:'',//课程体系配置
            },
       
            form:{  //获取数据
            admin_uid:'',
            id:'',
            name:'',//字段名
            m:'',//类型参数
            a:''//执行的操作  获取数据	list  新增数据	add  删除数据	del
            },

            idata:{
             
                m:'',
                a:'' ,
            }
   
        }
    },
    created () {
    
        this.getdata()
        
    },
    methods: {

        //获取数据
        getdata(){
       
this.$apis.sys.basedata_list().then(res=>{
         this.msg=res.data
         console.log(res.data)
})
        },

        //添加数据
        adddata(type,name){
            this.form.admin_uid=this.getdataCookie('admin_id')
             this.form.m=type
             this.form.a='add'
             this.form.name=name
             this.$apis.sys.post_basedata(this.form).then(res=>{
                 if(res.data.code==1){
                       this.$message({
          message: name+'添加成功',
          type: 'success'
        });
         this.inputmsg={
              inproject:'', //进线项目
                inchannel:'',//进线渠道
                inpeople:'',//接入人
                alevel:'',//学员等级
                giventype:'',//赠送类别
                collectionclass:'',//收款类别
                collectiontype:'',//收款方式
         }
        this.getdata()
                 }else{
                      this.$message.error(name+'添加失败'+res.data.msg);
                 }
             })
        },
        //删除
        dorp(type,index){
            this.form.id=index
            this.form.m=type
            this.form.a='del'
               this.$confirm('此操作将永久删除该配置项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$apis.sys.post_basedata(this.form).then(res=>{
                 if(res.data.code==1){
                       this.$message({
          message: name+'删除成功',
          type: 'success'
        });
        this.getdata()
                 }else{
                      this.$message.error(res.data.msg);
                 }
             });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

           
        },
        //读取uid
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
   //Router.push({path:'/login'})
    // Router.push("/")
  }
    }
}
</script>

<style scoped>

.reg{
   animation:myfirst .4s infinite;
}
@keyframes myfirst
{
0% {
 transform: rotate(0deg);
    }
25% {
     transform: rotate(1deg);
    }
    50% {
     transform: rotate(0deg);
    }
75% {
     transform: rotate(-1deg);
    }
       100%{
         transform: rotate(0deg);
    }
}
h4{
   padding-top: 20px;
    border-top: 1px dotted #dddddd;
        margin-top: 10px;
}
.project1{
    display: inline-block;
     margin-top:10px;
     margin-left: 10px;
     margin-bottom: 10px;
}
.project1 span{
    color: #717171;
    display: inline-block;
    margin-left: 10px;
    background: #ffffff;
    padding: 3px 10px 3px 10px;
    border-radius: 10px;
}
.project1:hover{
    cursor: pointer;
}

</style>

