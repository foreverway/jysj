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
   <p>{{this.writeCurrentDate()}}</p>
    <!-- <el-input v-model="form.data_number" ></el-input> -->
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
    :show-all-levels="false"
    @change="handleChange_1"></el-cascader>
  </el-form-item>
 

   <el-form-item :inline="true" label="已选科目">
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
    <div class="add_ul_new"  v-for="(item,i) in editableTabs_1" :key="i">
     <p>{{item.title}}</p><span style="display:none;"  v-bind:id="'course_id'+ i">{{item.course_id}}</span>
     <p><el-input v-model=item.times  v-bind:id="'time' + i" placeholder="课时"></el-input></p>
     <p><el-input v-model=item.price  v-bind:id="'mach' + i" placeholder="单价(元)"></el-input></p>
     <p  v-bind:id="'all_mach' + i" placeholder="单价(元)">单价(元</p>
     <p> 
       <select v-model="item.course_type"  v-bind:id="'attr' + i" placeholder="课程性质">
          <option label="试听" :value="2"></option>
          <option label="正课" value="1"></option>
           <option label="辅导" value="3"></option>
       </select>
    </p>
     <p>
       <select v-model="item.m1" v-bind:id="'clas' + i" placeholder="班课">
          <option label="否"  value="0">否</option>
          <option  label="是" value="1">是</option>
       </select>
     </p>
     <p>
       <select v-model="item.is_one"   v-bind:id="'one' + i" placeholder="一对一">
          <option label="否" value="0"></option>
          <option label="是" value="1"></option>
       </select>
     </p>
     <p>
       <select v-model="item.is_group"  v-bind:id="'self' + i" placeholder="自组班课">
          <option label="否" value="0"></option>
          <option label="是" value="1"></option>
       </select>
     </p>
     <p @click=" deleteTest_1">撤销</p>
   </div>
  </el-form-item>
  <el-form-item label="学生姓名">
    <el-cascader
    v-model="value_1"
    :options="options1"
    @change="handleChange">
      
    </el-cascader>
    <!-- <el-button type="primary" @click="createStudent">查询</el-button> -->
   <!-- <el-tabs 
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
</el-tabs> -->
 <div class="add_ul">
          <p >学生姓名</p>
          <p>手机号</p>
           <p >操作</p>
        </div>
          <div class="add_ul_new"  v-for="(item,i) in editableTabs" :key="i">
            <span style="display:none;">{{item.id}}</span>
              <p>{{item.name}}</p>
               <p>{{item.tel}}</p>
                <p @click=" deleteTest">撤销</p>
          </div>
  </el-form-item>

  <el-form-item label="有效期限">
     <div class="block">
       <p>：{{ value }}</p>
    <el-date-picker
      v-model="value"
      type="daterange"
       value-format="yyyy-MM-dd"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </div>
  </el-form-item>
  <el-form-item label="备注说明">
    <el-input type="textarea" v-model="form.feedback"></el-input>
  </el-form-item>
 
			<!--item是值，index是下标，从0开始计数-->
			<!-- <div v-for="(item,i) in items_add">
				    <label for="">姓名</label>
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
			     <button @click="deleteTest">删除</button>
			</div> -->
			<!-- <button @click="addTest">新增</button>
			<br /><br />
			<button @click="result">撤销</button> -->
</el-form>
<!-- 步骤二 -->
<div v-if="active==2">
  <el-form>
    <el-form-item label="上课地点">
           <el-radio v-model="radio" label="线上">线上</el-radio>
           <el-radio v-model="radio" label="线下">线下</el-radio>
    </el-form-item>
     <el-form-item label="需求1">
          <el-input type="textarea" v-model="this.need_one"   maxlength="100"
  show-word-limit placeholder="学生排课项目、科目、考局（A-level必写）及课时"></el-input>
    </el-form-item>
    <el-form-item label="需求2">
          <el-input type="textarea" v-model="this.need_two" placeholder="学生学习需求是什么？（零基础先修、同步辅导、巩固复习、强化冲刺）" ></el-input>
    </el-form-item>
    <el-form-item label="需求3">
          <el-input type="textarea" v-model="this.need_three" placeholder="学生之前的学习经历和学习基础（之前在那里上的学？学习基础怎么样？）"></el-input>
    </el-form-item>
    <el-form-item label="需求4">
          <el-input type="textarea" v-model="this.need_four" placeholder="学生希望跟什么样的老师学习？"></el-input>
    </el-form-item>
    <el-form-item label="需求5">
          <el-input type="textarea" v-model="this.need_five" placeholder="学生上课时间期限，可排课时间？（北京时间）每次课上几小时？"></el-input>
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
 
    <el-button @click="goBack" v-if="active==1||active==2">取消</el-button>
<el-button style="margin-top: 12px;" @click="pre" v-if="active==2||active==3">上一步</el-button>
<el-button style="margin-top: 12px;" @click="next" v-if="active==1||active==2">下一步</el-button>
   <el-button type="primary" @click="onSubmit" v-if="active==2">立即创建</el-button>
<!-- 设置充值链接 -->
         <!-- <div style="display:none" cols="20" id="biao1">{{copyurl1}}</div> -->
    </div>
</template>

<script>
import studens_url from '../../config/config'
export default {
    data () {
        return {
           input: '',
            input1: '',
            input2: '',
            value_1:"",
            value:"",
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
          options1: [//学生姓名的数据
            // label:"username",
          ],
          options_1:[],//学生数组总数据
          options:[],//课程名称的数据
          options_:[],//总数据的数据
            radio: '1',//上课地点的选择
         editableTabsValue: '0',
         editableTabsValue_1: '0',//增添项的长度
          editableTabs_1: [],
        editableTabs: [//新增的内容的数据数组(学生)
        ],
        tabIndex: 0 ,
        tabIndex_1: 0 ,
        student_data:[]  ,//用户id
        subjects_data:[]  , //学科数据
          course_address: '',
          need_one: "",
          need_two: "",
          need_three: "",
          need_four: "",
          need_five: "",
        }
        
    },
    created(){
        this.getdata()
       this.getStudent()
    },
   computed:{

      //   all_mony(){
      //         	for(let i=0 ; i<this.editableTabsValue_1.length; i++){
    	// console.log($("#time"+i).val() + "  " + $("#mach"+i).val() + "  " + $("#sex"+i).val())
      //    return  $("#time"+i).val() * $("#mach"+i).val()
      //           }
      //   }
   },
    mounted(){
//alert($('#sss'))
    },
    methods: {
        //生成学员编号
        writeCurrentDate() {
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth();//得到月份
        var date = now.getDate();//得到日期
        var day = now.getDay();//得到周几
        var hour = now.getHours();//得到小时
        var minu = now.getMinutes();//得到分钟
        var sec = now.getSeconds();//得到秒
        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        if (hour < 10) hour = "0" + hour;
        if (minu < 10) minu = "0" + minu;
        if (sec < 10) sec = "0" + sec;
        var time = "";
        time = year + "" + month  + hour  + minu  + sec 
      return time
        // //设置得到当前日期的函数的执行间隔时间，每1000毫秒刷新一次。
        // var timer = setTimeout("writeCurrentDate()", 1000);
      },
  
      //获取报读科目列表
      addTest(){
        // alert()
        },
        deleteTest_1(){
					this.editableTabs_1.pop(this.editableTabsValue_1)
        },
          deleteTest(){
					this.editableTabs.pop(this.tabIndex)
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
        //获取科目的数据
    this.$apis.common.subject_list(parms).then(res=>{
          if(res.data.code==1){
     this.msg=res.data
      this.options_=res.data.data
      for(let i=0;i<this.options_.length;i++){
              var val=this.options_[i]
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

      //获取学生列表
      getStudent(){
        let parms={
          admin_id:this.getdataCookie('admin_id')
        }
        this.$apis.students.students_list(parms).then(res=>{
          if(res.data.code==1){
             this.options_1=res.data.data.list
             for(let i=0;i<this.options_1.length;i++){
               var val=this.options_1[i]
              this.options1.push({value:val.username,label:val.username})
             }
          }
        })
      },
      //选择报读科目的函数
       handleChange_1(targetName) {
         var lastName=targetName.length==1?targetName[0]:targetName[1]   
          let oneArr = this.options_.filter(item=>item.subject_name==lastName)
          if(oneArr.length==0){
            for(let i=0;i<this.options_.length;i++){
              var val=this.options_[i]
               if(val.children){//如果有子元素
                var val_1=val.children.filter(item=>item)
                // if(val_1.length==1){
             let oneArr_1 = val_1.filter(item=>item.subject_name==lastName)//对子元素进行赛选
          if(oneArr_1.length>0){
               let newTabName = ++this.tabIndex_1 + '';
                    console.log(oneArr_1[0].id)
              this.editableTabs_1.push({
              title:oneArr_1[0].subject_name,
              times: 10,
              price:1000,
              course_type:"",  //课程类型
              course_id:oneArr_1[0].id,    //课程id
              is_one:"",       //一对一？
              is_group:""      //班课?
            });
            this.editableTabsValue_1 = newTabName;
          } 
               }
            }  
          }else{  //没有子元素
          console.log(oneArr[0].id)
          let newTabName = ++this.tabIndex_1 + '';
           this.editableTabs_1.push({
          title:lastName,
          times: 10,
          price:1000,
          course_type:"",  //课程类型
          course_id:oneArr[0].id,    //课程id
          is_one:"",       //一对一？
          is_group:""      //班课?
        });
        this.editableTabsValue_1 = newTabName;
        // this.subject_id.push({student_id:checkOne[0].id})
          }
        
      },
      //学生姓名选择产生的变化
       handleChange(targetName) {
         
        console.log(this.writeCurrentDate())
       // alert(value);
     var checkOne = this.options_1.filter(item=>item.username==targetName[0])
    //  console.log(checkOne)
    //   console.log(this.options_1)
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          name:targetName[0],
           tel: checkOne[0].tel,
          id:checkOne[0].id,
        });
        this.student_data.push({student_id:checkOne[0].id})//注入学生id
        this.editableTabsValue = newTabName;
      },
      
       
       next() {
         let parms={
             title:this.form.title,
           expiry_date:this.value,
           remarks:this.form.feedback,
             course_address: this.course_address,
           need_one: this.need_one,
           need_two: this.need_two,
           need_three: this.need_three,
           need_four: this.need_four,
           need_five: this.need_five,
         }
        	for(let i=0 ; i<this.editableTabsValue_1.length; i++){
            this.subjects_data.push({
              "subject_id":$("#course_id"+i).html(),
              "times": $("#time"+i).val(),
              "price": $("#mach"+i).val(),
              "amount":100,
              "course_type":$("#attr"+i).val(),
              "course_id":$("#course_id"+i).html(),
              "is_one":$("#one"+i).val(),
              "is_group":$("#self"+i).val(),
            })

            if($("#clas"+i).val()==1){
						console.log($("#time"+i).val() + "  " + $("#mach"+i).val() + "  " + $("#sex"+i).val())
                this.active=3
            }else{
               this.active++
            }
          }
          
          parms.subjects_data= this.subjects_data
          parms.students_data= this.students_data
          console.log()
       console.log(parms)
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

