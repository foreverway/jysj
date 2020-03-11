

<template>
<!-- https://blog.csdn.net/qq_39562867/article/details/81906319 -->
<!-- https://www.cnblogs.com/muzishijie/p/11291295.html -->
    <button :class="type == 'Default'?'btn default':type == 'primary'?'btn primary':type == 'danger'?'btn danger':'btn default' ">
        <slot></slot>
        <!-- 通过对传入prop  type的嵌套三元判断 给buttom加上相应的类名 
        再通过一个匿名插槽 再父级调用的时候传入默认值  就会显示在slot里面
        -->
    </button>
</template>
<script>
    export default {
        name:'zxbutton',
        props:{
            type:{ //定义type的默认值
                type:String,
                default:"default"
            }
        }
    }
</script>

<style scoped>
     .btn{
          width: 100px;
          height: 40px;
          color:#fff;
          text-align: center;
          line-height:40px;
     }
     .default{
        
         background: red;
        
     }
 
      .primary{
       
         background: yellow;
     }
 
      .danger{
      
         background: #ccc;
     }
</style>