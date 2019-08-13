<template>
    <div class="main">
            <div class="data_main">
                <el-calendar v-model="value" >
                     <template
                            slot="dateCell"
                            slot-scope="{date, data}">
                            <p :class="msg.indexOf(data.day)!=-1? 'is-selected' : ''">
                            {{ data.day.slice(8)}}
                         
                         {{ msg.indexOf(data.day)!=-1 ? '✔️' : ''}}
                            </p>
  </template>
                </el-calendar>
            </div>
            <div class="data_list">
                   <el-table 
        :data="tableData"
         :header-cell-style="{background:'#f4f4f4'}"
         :row-class-name="tableRowClassName"
        style="margin-top:20px">
        <el-table-column
            prop="date"
            label="日期"
            width="100">
        </el-table-column>
           <el-table-column
            prop="name"
            label="时长"
            >
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            >
        </el-table-column>
        <el-table-column
            prop="address"
            label="地点">
        </el-table-column>
           
             <el-table-column
            prop="name"
            label="科目"
            >
        </el-table-column>
             <el-table-column
            prop="name"
            label="反馈"
           >
        </el-table-column>
        </el-table>
            </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {

        value: '',
        msg:['2019-06-13','2019-06-18','2019-06-16'],
                tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '线上'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '线上'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '线上'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '线上'
          }]
      }
    },
    created () {
        this.$watch("value", function ( ) {
 //this.artdata()
    })  
    },

    methods: {
        tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
        artdata(){
        
                alert(this.value)
          
          
        }
    }
  }
</script>
<style scoped>

.data_main{
    width: 600px;
  
    float: left;
}
.data_list{
  width: 505px;
  margin-left: 10px;
  float: left;
}

</style>
