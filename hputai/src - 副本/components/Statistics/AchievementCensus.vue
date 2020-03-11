<template>
    <div class="mainAch">

             <zx-head title="业绩统计" ></zx-head>
<iframe id="other-iframe" frameborder="0"  width="100%"  height="100%" src="http://api.hqjystudio.com/adminapi/commonlist/yeji_view"></iframe>
    <!-- 显示子组件studencClass -->
    </div>
</template>

<script>
  export default {
      data(){
          return{

          }
      },
      mounted(){
      var bodyDiv=$('.mainAch')
    $(bodyDiv)[0].style.height=$(window).height()*1-50+'px'
      }
  }
</script>