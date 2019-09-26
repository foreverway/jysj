<template>
  <div id="app">
  
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 表格颜色 */
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
/* 表格颜色 */

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
*{
   margin: 0px;
  padding: 0px;
}

	/*谷歌、safari、qq浏览器、360浏览器滚动条样式*/
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
::-webkit-scrollbar  
{  
    width: 0px;  
    height: 10px;  
    background-color: #F5F5F5;  
}  
/*定义滚动条轨道 内阴影+圆角*/  
::-webkit-scrollbar-track  
{  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px;  
    background-color: #F5F5F5;  
}    
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb  
{  
    border-radius: 10px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color: #bdbdbd;  
}  
/*滑块效果*/
::-webkit-scrollbar-thumb:hover
{
border-radius: 5px;
-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
background: #fe6637;
}
/*IE滚动条颜色*/
html {
    scrollbar-face-color:#bfbfbf;/*滚动条颜色*/
    scrollbar-highlight-color:#000;
    scrollbar-3dlight-color:#000;
    scrollbar-darkshadow-color:#000;
    scrollbar-Shadow-color:#adadad;/*滑块边色*/
    scrollbar-arrow-color:rgba(0,0,0,0.4);/*箭头颜色*/
    scrollbar-track-color:#eeeeee;/*背景颜色*/
}

</style>
