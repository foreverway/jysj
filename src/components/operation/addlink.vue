<template>
    <div class="main">
                    <!-- 设置充值链接 -->


      <el-input  style="width:200px" v-model="money"  placeholder="请输入充值金额" ></el-input>


  
    <el-button type="primary" v-show="money>0" @click="copyUrl">生成并复制充值链接</el-button>



<!-- 设置充值链接 -->
         <div style="display:none" cols="20" id="biao1">{{copyurl1}}</div>
    </div>
</template>

<script>
import studens_url from '../../config/config'
export default {
    data () {
        return {
            
              money:'',
        }
    },
    methods: {
                          // 复制链接
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
    }
}
</script>

