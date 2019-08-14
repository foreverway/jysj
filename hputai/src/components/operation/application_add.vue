<template>
    <div class="main">
                    <!-- 设置充值链接 -->
         <!-- <el-page-header content="添加销售进程管控">
</el-page-header> -->
<!-- <el-row>
  <el-button type="primary">添加销售进程管控</el-button>
</el-row> -->
        <div class="main_head">|&nbsp;添加报名需求</div> 
<!--  <el-input  style="width:200px" v-model="money"  placeholder="请输入充值金额" ></el-input>
    <el-button type="primary" v-show="money>0" @click="copyUrl">生成并复制充值链接</el-button> -->
    <el-steps :active="active" finish-status="success" >
        <el-step title="填写报名情况" ></el-step>
        <el-step title="填写需求情况" ></el-step>
        <el-step title="填写完成" ></el-step>
    </el-steps>
<el-form ref="form" :model="form" label-width="120px" v-if="active==1">
 <el-form-item label="报名编号">
   <!-- 报名编号每次从后台拉取+1 -->
    <el-input v-model="form.data_number" ></el-input>
  </el-form-item>
  <el-form-item label="报名标题">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  
  <el-form-item :inline="true" label="报读科目">
   <!-- <span class="demonstration">hover 触发子菜单</span> -->
   <!-- 用el-autocomplete -->
  <el-cascader
    v-model="value"
    :options="options"
    :props="{ expandTrigger: 'hover' }"
    @change="handleChange1"></el-cascader>
  </el-form-item>
 

   <el-form-item :inline="true" label="已选科目">
     <div class="add_ul_div" id="div2">
        <div class="add_ul">
          <p id="sss">科目</p>
          <p>课时</p>
          <p>单价(元)</p>
          <p>总额</p>
          <p>课程性质</p>
          <p>班课</p>
          <p>一对一</p>
          <p>自组班课</p>
          <p>操作</p>
        </div>
     </div>
    <div class="add_ul_new" id="b2">
     <p><el-input v-model="input" placeholder="请输入内容"></el-input></p>
     <p><el-input v-model="input1" placeholder="请输入内容"></el-input></p>
     <p><el-input v-model="input2" placeholder="请输入内容"></el-input></p>
     <p>总额</p>
     <p> 
       <el-select v-model="form.m1" placeholder="课程性质">
          <el-option label="试听" value="试听"></el-option>
          <el-option label="正课" value="正课"></el-option>
           <el-option label="辅导" value="辅导"></el-option>
       </el-select>
    </p>
     <p>
       <el-select v-model="form.m1" placeholder="班课">
          <el-option label="待补充" value="已建立"></el-option>
          <el-option label="未建立" value="未建立"></el-option>
       </el-select>
     </p>
     <p>
       <el-select v-model="form.m1" placeholder="一对一">
          <el-option label="否" value="否"></el-option>
          <el-option label="是" value="是"></el-option>
       </el-select>
     </p>
     <p>
       <el-select v-model="form.m1" placeholder="自组班课">
          <el-option label="否" value="否"></el-option>
          <el-option label="是" value="是"></el-option>
       </el-select>
     </p>
     <p>操作</p>
   </div>
  </el-form-item>
  <el-form-item label="学生姓名">
    <el-cascader
    v-model="value_1"
    :options="options1"
    @change="handleChange"></el-cascader>
    <!-- <el-button type="primary" @click="createStudent">查询</el-button> -->
   <el-tabs 
       tab-position="left"
   v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
  <el-tab-pane
    v-for="(item, index) in editableTabs"
    type="border"

    :key="item.name"
    :label="item.title"
    :name="item.name"
  >
    {{"手机号"}}
  </el-tab-pane>
</el-tabs>
  </el-form-item>

  <el-form-item label="有效期限">
     <div class="block">
    <el-date-picker
      v-model="value3"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
  </el-form-item>
  <el-form-item label="备注说明">
    <el-input type="textarea" v-model="form.feedback"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button @click="goBack">取消</el-button>
  </el-form-item>

			<!--item是值，index是下标，从0开始计数-->
			<div v-for="(item,i) in items_add" class="add_ul_new">
         <p><el-input v-model="input" placeholder="请输入内容"></el-input></p>
     <p><el-input v-model="input1" placeholder="请输入内容"></el-input></p>
     <p><el-input v-model="input2" placeholder="请输入内容"></el-input></p>
     <p><el-button>总额</el-button></p>
     <p> 
       <el-select v-model="form.m1" placeholder="课程性质">
          <el-option label="试听" value="试听"></el-option>
          <el-option label="正课" value="正课"></el-option>
           <el-option label="辅导" value="辅导"></el-option>
       </el-select>
    </p>
     <p>
       <el-select v-model="form.m1" placeholder="班课">
          <el-option label="待补充" value="已建立"></el-option>
          <el-option label="未建立" value="未建立"></el-option>
       </el-select>
     </p>
     <p>
       <el-select v-model="form.m1" placeholder="一对一">
          <el-option label="否" value="否"></el-option>
          <el-option label="是" value="是"></el-option>
       </el-select>
     </p>
     <p>
       <el-select v-model="form.m1" placeholder="自组班课">
          <el-option label="否" value="否"></el-option>
          <el-option label="是" value="是"></el-option>
       </el-select>
     </p>
     <p><el-button>操作</el-button></p>
				    <!-- <label for="">姓名</label>
			     <input type="text"  v-bind:id="'name' + i" />
            <p><el-input v-model="input" placeholder="请输入内容"></el-input></p>
			     <label for="">年龄</label>
			     <input type="text" v-bind:id="'age' + i"/>
			     <label for="">性别</label>
			     <select name="" :id="'sex' + i">
			     	<option value="">请选择性别</option>
			     	<option value="男">男</option>
			     	<option value="女">女</option>
			     </select>
			     <button @click="deleteTest">删除</button> -->
			</div>
			<button @click="addTest">新增</button>
			<br /><br />
			<button @click="result">提交</button>
	
</el-form>
<!-- 步骤二 -->
<div v-if="active==2">
  <el-form>
    <el-form-item label="上课地点">
           <el-radio v-model="radio" label="线上">线上</el-radio>
           <el-radio v-model="radio" label="线下">线下</el-radio>
    </el-form-item>
     <el-form-item label="需求1">
          <el-input type="textarea" v-model="form"   maxlength="100"
  show-word-limit placeholder="学生排课项目、科目、考局（A-level必写）及课时"></el-input>
    </el-form-item>
    <el-form-item label="需求2">
          <el-input type="textarea" v-model="form.feedback" placeholder="学生学习需求是什么？（零基础先修、同步辅导、巩固复习、强化冲刺）" ></el-input>
    </el-form-item>
    <el-form-item label="需求3">
          <el-input type="textarea" v-model="form.feedback" placeholder="学生之前的学习经历和学习基础（之前在那里上的学？学习基础怎么样？）"></el-input>
    </el-form-item>
    <el-form-item label="需求4">
          <el-input type="textarea" v-model="form.feedback" placeholder="学生希望跟什么样的老师学习？"></el-input>
    </el-form-item>
    <el-form-item label="需求5">
          <el-input type="textarea" v-model="form.feedback" placeholder="学生上课时间期限，可排课时间？（北京时间）每次课上几小时？"></el-input>
    </el-form-item>
  </el-form>
</div>
<!-- 步骤三 -->
<div v-if="active==3" >
      <div class="succ_tip">
    提交成功<i class="el-icon-circle-check" type="success"></i>
      </div>
      <div class="succ_word">
      <el-link icon="el-icon-edit" type="primary">继续添加排课需求</el-link>
      <el-link type="primary">查看排课需求列表<i class="el-icon-view el-icon--right" ></i> </el-link>
     </div>
     
</div>
<el-button style="margin-top: 12px;" @click="pre" v-if="active==2||active==3">上一步</el-button>

<el-button style="margin-top: 12px;" @click="next" v-if="active==1||active==2">下一步</el-button>
<!-- 设置充值链接 -->
         <div style="display:none" cols="20" id="biao1">{{copyurl1}}</div>
    </div>
</template>

<script>
import studens_url from '../../config/config'
export default {
    data () {
        return {
          items_add : [],//增添的项
				text: 0,
           input: '',
            input1: '',
            input2: '',
            value_1:"",
            value3:"",
           tableData: [{
          id: '12987122',
          name: '',
          amount1: '',
          amount2: '3.2',
          amount3: 10
        }],
          active: 1,
        form: {
        },
        form1:{
        },
              money:'',
              parms:{
                search:"",
                page:1,
              },
          options1: [
            // label:"username",
          ],
          options:[],
            radio: '1',//上课地点的选择
         editableTabsValue: '1',
         editableTabsValue_1: '1',
          editableTabs_1: [{ //新增的内容的数据数组(上)
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }],
        editableTabs: [{//新增的内容的数据数组
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }],
        tabIndex: 1 
        }
    },
    created(){
        this.getdata()
       this.getStudent()
       
    },
    mounted(){
//alert($('#sss'))
    },
    methods: {
      //      $("#sss").click(function(){
      //   alert(411)
      // }),
  
      //获取报读科目列表
      addTest(){
        // alert()
				
        },
        deleteTest(){
					this.items_add.pop(this.text)
				},
        result(){
					for(let i=0 ; i<this.items_add.length; i++){
						console.log($("#name"+i).val() + "  " + $("#age"+i).val() + "  " + $("#sex"+i).val())
					}
				},
     getdata(){
        let parms={
          admin_id:this.getdataCookie('admin_id')
        }
    this.$apis.common.subject_list(parms).then(res=>{
          if(res.data.code==1){
     this.msg=res.data
      let options_=res.data.data
      for(let i=0;i<options_.length;i++){
              var val=options_[i]
               var  children=[]
               if(val.children){
                  for(let j=0;j<val.children.length;j++){
                  var val1= val.children[j]
                 children.push({value:val1.subject_name,label:val1.subject_name})
              }
               this.options.push({value:val.subject_name,label:val.subject_name,children:children})
               }else{
                   this.options.push({value:val.subject_name,label:val.subject_name})
               }
            }
    }
  })
      },
      createStudent(){
        // var checkVal=document.getElementsByClassName("checkVal")
        // console.log(checkVal)
      },
      //步骤3成功提示
      // openHTML() {
      //   this.$message({
      //     dangerouslyUseHTMLString: true,
      //        type: 'success',
      //        duration:0,
      //        center:"true",
      //     message: '<strong>这是 <i>HTML</i> 片段</strong>'
      //   });
      // },
      //获取学生列表
      getStudent(){
        let parms={
          admin_id:this.getdataCookie('admin_id')
        }
        this.$apis.students.students_list(parms).then(res=>{
          if(res.data.code==1){
           // console.log(res.data.data.list)
            // this.msg=res.data
             let options_1=res.data.data.list
             for(let i=0;i<options_1.length;i++){
               var val=options_1[i]
              this.options1.push({value:val.username,label:val.username})
             }
          }
        })
      },
      //选择报读科目的函数
       handleChange1(targetName) {
      	this.items_add.push(this.text++)
      },
      //学生姓名选择产生的变化
       handleChange(targetName) {
       // alert(value);
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue = newTabName;
      },
      
       
       next() {
         this.active++
        // if (this.active++ >1){
        //    this.active = 2;
        // }
       
      },
        pre() {
        // if (
          this.active--
        //    < 2) 
        // this.active = 1
        },
        //提交表单
         onSubmit(formName) {
        //        this.$refs[formName].validate((valid) => {
        //   if (valid) {
                this.$apis.common.salepro_add(this.form).then(res=>{
            if(res.data.code==1){
    this.$message({
          message: '添加成功',
          type: 'success'
        })
       this.$router.push({path:'/ApplicationAdd'})
            }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '添加失败'
          });          
        });},
          goBack() {
         history.back(-1)
      } ,                  // 复制链接
      copyUrl(){ 
 let url = studens_url.student_url+'login/1/'+this.money;
        let oInput = document.createElement('input');
        oInput.value = url;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象;
        console.log(oInput.value)
        document.execCommand("Copy"); // 执行浏览器复制命令
        this.$message({
          message: url +'已成功复制到剪切板',
          type: 'success'
        });
        this.money=''
        oInput.remove()
      },
     getdataCookie (cname) {
    // return 1
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
    }
    // this.$router.push({path:'/login'})
  },
    }
}
</script>
<style scoped>
     .main_head{
       margin:auto;
       width: 96%;
       height:40px;
       font-size: 22px;
       font-weight: 900;
       margin:0 2%;
       /* line-height: 30px; */
     }
     /* *{
       padding:0;
       margin:0;
     } */
     .add_ul p{
       list-style: none;
       display:inline-block;
       background-color: #fff;
       padding:0;
       margin-right:-5px;
       width:8%;
       border:1px solid silver;
       text-align: center;
     }
     .add_ul_2 p{
       list-style: none;
       display:inline-block;
       background-color: #fff;
       padding:0;
       margin-right:-5px;
       width:12%;
       border:1px solid silver;
       text-align: center;
     }
       .add_ul_new p{
       list-style: none;
       display:inline-block;
       background-color: #fff;
       padding:0;
       margin-right:-5px;
       width:8%;
       border:1px solid silver;
       text-align: center;
     }
     .stap_3{
     
    width: 100%;
     }
     .succ_tip{
     width: 80%;
        margin:30px auto;
        text-align: center;
        font-size: 40px;
        color:green;
        height: 80px;
     }
     .succ_word{
       display:flex;
       justify-content:space-around;
       align-items: center;
       font-size: 25px;
     }
</style>

