<template>
  <div class="so_main">
    <zx-head title="上课考勤"></zx-head>

    <div class="so_main_left">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-input
        style="width:180px;"
          class="so_input"
          clearable
          v-model="form.search"
          @change="getadata"
          placeholder="请输入搜索内容"
        ></el-input>
        <el-select style="width:180px;"   @change="getadata" @clear="clear_choose"
  clearable v-model="form.attendance_status" placeholder="选择考勤状态">
          <el-option
            v-for="item in check_status"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select    @change="getadata" style="width:180px;"
  clearable v-model="form.teaching_type" placeholder="授课类型">
          <el-option
            v-for="item in check_type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
                <el-select    @change="getadata" style="width:180px;"
  clearable v-model="form.course_address" placeholder="授课地点">
          <el-option
            v-for="item in check_address"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div style="display:inline;width:500px;height:60px;">
             <el-date-picker
          style="margin-left:20px"
          v-model="form.start_time"
          @change="getadata"
          type="datetime"
          clearable
          value-format="yyyy-MM-dd H:mm:ss"
          placeholder="选择日期时间"
        ></el-date-picker>至
        <el-date-picker
          @change="getadata"
          v-model="form.end_time"
          type="datetime"
          clearable
          value-format="yyyy-MM-dd H:mm:ss"
          placeholder="选择日期时间"
        ></el-date-picker>
        </div>
     
                  <el-button type="primary" @click="recharge_export">导出</el-button>

      </el-form>

    </div>
    <!-- 表格数据 -->
    <el-table
      :header-cell-style="{background:'#f4f4f4'}"
      ref="multipleTable"
      border
      :data="tableData"
      style="width: 100%"
    >
          <el-table-column label="序号" type="index" :index="indexMethod" width="80" align="center"></el-table-column>

      <!-- <el-table-column align="subject_name" label="授课项目" prop="course_program"></el-table-column> -->
      <el-table-column align="center" label="授课科目">
        <template slot-scope="scope">
          <span>{{ scope.row.subject_name}}</span>
          <!-- <span v-show="scope.row.type==2" style="color:green">-{{ scope.row.given_amount }}</span>
          <span v-show="scope.row.type==1" style="color:red">+{{ scope.row.given_amount }}</span>-->
        </template>
      </el-table-column>
      <el-table-column align="center" label="授课教师">
        <template slot-scope="scope">
          <span>{{ scope.row.teacher_name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="学生姓名" prop="student_name"></el-table-column>
            <el-table-column align="center" label="添加者" prop="additive"></el-table-column>
      <el-table-column align="center" label="授课类型" prop="course_txt"></el-table-column>
      <el-table-column align="center" label="授课地点" prop="course_address"></el-table-column>
      <el-table-column align="center" label="开始时间" prop="start_time"></el-table-column>
      <el-table-column align="center" label="结束时间" prop="end_time"></el-table-column>
      <el-table-column align="center" label="已排课时" prop="classhour"></el-table-column>
      <el-table-column align="center" label="实上课时" prop="true_classhour"></el-table-column>
      <el-table-column align="center" label="学生核准课时" width="120" prop="student_classhour"></el-table-column>
      <el-table-column align="center" label="试听结果"  width="120" prop="audition_status">
        <template slot-scope="scope" >
          <span v-show="scope.row.audition_status==1" style="color:green">成功</span>
          <span v-show="scope.row.audition_status==2" style="color:red">失败</span>
          <span v-show="scope.row.audition_status==3" style="color:orange" >待续费</span>

        </template>
      </el-table-column>
            <el-table-column align="center" label="试听备注"  width="120" prop="audition_remarks">
        <template slot-scope="scope" >
          <span v-show="scope.row.audition_status==1" style="color:green">{{scope.row.audition_remarks}}</span>
          <span v-show="scope.row.audition_status==2" style="color:red">{{scope.row.audition_remarks}}</span>
 <span v-show="scope.row.audition_status==3" style="color:orange">{{scope.row.audition_remarks}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" prop="attendance_status">
        <template slot-scope="scope">
          <span v-show="scope.row.attendance_status==2" style="color:red">已考勤-异常</span>
          <span v-show="scope.row.attendance_status==1" style="color:green">已考勤-正常</span>
          <span v-show="scope.row.attendance_status==0" style>待考勤</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px" fixed="right" >
        <template slot-scope="scope" class="delete_left">
  <el-button
            size="mini"
            style="background-color:#2adbcb;color:white;"
            v-show="scope.row.attendance_status!==0"
            @click="seeMore(scope)"
          >查看考勤详情</el-button>
            <el-button
            size="mini"
            style="background-color:#7571fa;color:white;"
            v-show="scope.row.attendance_status==2&&scope.row.is_forward!==1"
            @click="showEdit(scope)"
          >编辑考勤</el-button>
          <el-button
            size="mini"
            style="background-color:steelblue;color:white;"
            v-if="checkTime(scope.row)"
            @click="fillFeedback_see(scope.row.course_id)"
          >查看反馈</el-button>
                   <el-button
            size="mini"
            v-if="scope.row.course_txt=='一对一试听'&&scope.row.audition_text==''"
            style="background-color:#E6A23C;color:white;"
            @click="audition(scope.row.course_id)"
          >试听情况</el-button>
                <el-button
                size="mini"
                v-if="scope.row.ready_txt=='观看回放'"
                style="color:white;background-color:#409eff;"
              >
                <a @click="openVideo(scope.row.playback_url)">{{scope.row.ready_txt}}</a>
              </el-button>
                   <el-button
                size="mini"
                v-if="scope.row.ready_txt=='直播中'"
                style="color:white;background-color:#409eff;"
              >
                <a @click="nowVideo(scope.row.course_id)">{{scope.row.ready_txt}}</a>
              </el-button>
            <el-button   v-show="scope.row.attendance_status==2&&scope.row.is_forward!==1"
            style="color:#169BD5" type="danger" size="mini" @click="payMoney(scope.row)">结转</el-button>
<!-- is_audition为1就是考勤  role_name当前人身份 -->
            <el-button
              v-show="checkTeacher(scope.row.is_audition,role_name)"
              v-if="scope.row.is_feedback==1&&scope.row.attendance_status==0"
              size="mini"
              @click="normal(scope.row)"
              type="success"
            >正常</el-button>
            <el-button size="mini" v-if="checkTeacher(scope.row.is_audition,role_name)" v-show="scope.row.attendance_status==0" @click="unnormal(scope.row)" type="danger">
              异动</el-button>
            <el-button v-if="checkTeacher(scope.row.is_audition,role_name)" @click="payMoney(scope.row)" v-show="scope.row.is_forward==1"  type="info" disabled size="mini">
              结转</el-button>
        
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="正常页面"
      :close-on-click-modal="false"
      :visible.sync="centerDialogVisible_normal"
      width="50%"
      center
    >
      <el-form :inline="true" label-width="150px" :model="normalData">
        <el-form-item label="已排课时">
          <!-- <el-input v-model="normalData.classhour"></el-input> -->
          <p style="width:100px;">{{this.normalData.classhour}}</p>
        </el-form-item>
        <el-form-item label="实上课时">
          <!-- <el-input v-model="normalData.true_classhour"></el-input> -->
          <p style="width:100px;">{{this.normalData.classhour}}</p>
        </el-form-item>
        <el-form-item label="老师核准">
          <!-- <el-input v-model="normalData.teacher_classhour"></el-input> -->
          <p style="width:100px;">{{this.normalData.classhour}}</p>
        </el-form-item>
        <el-form-item label="学生核准">
          <!-- <el-input v-model="normalData.student_classhour"></el-input> -->
          <p style="width:100px;">{{this.normalData.classhour}}</p>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="normalData.remarks"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible_normal = false">取 消</el-button>
        <el-button type="primary" @click="normal_post">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 异动的弹出页面 -->
    <el-dialog
      :close-on-click-modal="false"
      title="异动页面"
      :visible.sync="centerDialogVisible_unnormal"
      width="800px"
      center
    >
      <div style="height:40px;width:100%;padding:10px 15px;">
        <span style="display:inline-block;width:80px;">已排课时</span>
        {{this.unnormalData.classhour}}
      </div>
      <el-form :inline="true" :model="unnormalData" class="demo-form-inline">
        <el-form-item label="实上课时" label-width="80px">
          <el-input v-model="unnormalData.true_classhour"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="80px">
          <el-input v-model="unnormalData.remarks1"></el-input>
        </el-form-item>
        <el-form-item label="老师核准" label-width="80px">
          <el-input v-model="unnormalData.teacher_classhour"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="80px">
          <el-input v-model="unnormalData.remarks2"></el-input>
        </el-form-item>
        <el-form-item label="学生核准" label-width="80px">
          <el-input v-model="unnormalData.student_classhour"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="80px">
          <el-input v-model="unnormalData.remarks3"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible_unnormal = false">取 消</el-button>
        <el-button type="primary" @click="unnormal_post()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 查看详情的弹出页面 -->
    <el-dialog
      :close-on-click-modal="false"
      title="查看详情"
      :visible.sync="centerDialogVisible_seeMore"
      width="800px"
    >
      <el-form
        :inline="true"
        :label-position="labelPosition"
        class="demo-form-inline"
        label-width="150px"
        :model="seeMoreData"
      >
        <el-form-item label="已排课时" v-show="seeMoreData.attendance_type==1">
          <p style="width:100px;">{{seeMoreData.classhour}}</p>
        </el-form-item>
        <el-form-item label="已排课时" v-show="seeMoreData.attendance_type==2">
          <p style="width:100px">{{seeMoreData.classhour}}</p>
        </el-form-item>
        <el-form-item label=" " v-show="seeMoreData.attendance_type==2">
          <p style="width:100px"></p>
        </el-form-item>
        <el-form-item label="实上课时">
          <p style="width:100px">{{seeMoreData.true_classhour}}</p>
        </el-form-item>

        <el-form-item label="异动实上课时备注" v-show="seeMoreData.attendance_type==2">
          <p style="width:150px">{{seeMoreData.remarks1}}</p>
        </el-form-item>
        <el-form-item label="老师核准">
          <p style="width:100px">{{seeMoreData.teacher_classhour }}</p>
        </el-form-item>
        <el-form-item label="异动老师核准备注" v-show="seeMoreData.attendance_type==2">
          <p style="width:150px">{{seeMoreData.remarks2}}</p>
        </el-form-item>
        <el-form-item label="学生核准">
          <p style="width:100px">{{seeMoreData.student_classhour }}</p>
        </el-form-item>
        <el-form-item label="备注" v-show="seeMoreData.attendance_type==1">
          <p style="width:100px" v-show="seeMoreData.remarks">{{seeMoreData.remarks }}</p>
          <p style="width:100px" v-show="seeMoreData.remarks==''">没有备注</p>
        </el-form-item>
        <el-form-item label="异动学生核准的备注" v-show="seeMoreData.attendance_type==2">
          <p style="width:150px">{{seeMoreData.remarks3}}</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible_seeMore = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible_seeMore = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑考勤数据的弹出页面 -->
    <el-dialog
      :close-on-click-modal="false"
      title=" 编辑考勤"
      :visible.sync="edit_check_dom"
      width="800px"
    >
      <el-form
        :inline="true"
        :label-position="labelPosition"
        class="demo-form-inline"
        label-width="150px"
        :model="seeMoreDataEdit"
      >
        <el-form-item label="已排课时" v-show="seeMoreDataEdit.attendance_type==1&&seeMoreDataEdit.attendance_type==2">
          <el-input style="width:100px;" v-model="seeMoreDataEdit.classhour"></el-input>
          <!-- <p style="width:100px;">{{seeMoreDataEdit.classhour}}</p> -->
        </el-form-item>
        <el-form-item label="已排课时" v-show="seeMoreDataEdit.attendance_type==2">
          <!-- <p style="width:100px">{{seeMoreDataEdit.classhour}}</p> -->
            <el-input style="width:100px;" v-model="seeMoreDataEdit.classhour"></el-input>
        </el-form-item>
        <el-form-item label=" " v-show="seeMoreDataEdit.attendance_type==2">
          <p style="width:100px"></p>
        </el-form-item>
        <el-form-item label="实上课时">
          <!-- <p style="width:100px">{{seeMoreDataEdit.true_classhour}}</p> -->
          <el-input style="width:100px;" v-model="seeMoreDataEdit.true_classhour"></el-input>

        </el-form-item>

        <el-form-item label="异动实上课时备注" v-show="seeMoreDataEdit.attendance_type==2">
          <!-- <p style="width:100px">{{seeMoreDataEdit.remarks1}}</p> -->
<el-input style="width:150px;" v-model="seeMoreDataEdit.remarks1"></el-input>

        </el-form-item>
        <el-form-item label="老师核准">
<el-input style="width:100px;" v-model="seeMoreDataEdit.teacher_classhour"></el-input>
          
          <!-- <p style="width:100px">{{seeMoreDataEdit.teacher_classhour }}</p> -->
        </el-form-item>
        <el-form-item label="异动老师核准备注" v-show="seeMoreDataEdit.attendance_type==2">
          <!-- <p style="width:100px">{{seeMoreDataEdit.remarks2}}</p> -->
<el-input style="width:150px;" v-model="seeMoreDataEdit.remarks2"></el-input>

        </el-form-item>
        <el-form-item label="学生核准">
          <el-input style="width:100px;" v-model="seeMoreDataEdit.student_classhour"></el-input>

          <!-- <p style="width:100px">{{seeMoreDataEdit.student_classhour }}</p> -->
        </el-form-item>
        <el-form-item label="备注" v-show="seeMoreDataEdit.attendance_type==1">
          <el-input style="width:150px;" v-model="seeMoreDataEdit.remarks"></el-input>

          <!-- <p style="width:100px" v-show="seeMoreDataEdit.remarks">{{seeMoreDataEdit.remarks }}</p> -->
          <p style="width:100px" v-show="seeMoreDataEdit.remarks==''">没有备注</p>
        </el-form-item>
        <el-form-item label="异动学生核准的备注" v-show="seeMoreDataEdit.attendance_type==2">
                    <el-input style="width:150px;" v-model="seeMoreDataEdit.remarks3"></el-input>

          <!-- <p style="width:100px">{{seeMoreDataEdit.remarks3}}</p> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edit_check_dom = false">取 消</el-button>
        <el-button type="primary" @click="edit_put">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 查看课堂反馈 -->
    <el-dialog
      :close-on-click-modal="false"
      title="查看反馈"
      :visible.sync="dialogVisible"
      width="900px"
    >
      <p style="margin-bottom:10px;">
        <span style="font-weight:900;color:orange;font-size:25px;">&nbsp;|&nbsp;</span>课程信息
      </p>

      <ul :data="formLabelAlign" class="ul_li">
        <li>
          <span>课程名称</span>
          <span>{{formLabelAlign.subject_name}}</span>
        </li>
        <li>
          <span>教师姓名</span>
          <span>{{formLabelAlign.teacher_name}}</span>
        </li>
        <li>
          <span>班主任</span>
          <span>{{formLabelAlign.banzhuren_name}}</span>
        </li>
        <li>
          <span>上课时间</span>
          <span style=" border-top-style:hidden;">{{formLabelAlign.start_time}}</span>
        </li>
        <li>
          <span>结束时间</span>
          <span style=" border-top-style:hidden;">{{formLabelAlign.end_time}}</span>
        </li>
        <li>
          <span>时长</span>
          <span style=" border-top-style:hidden;">{{formLabelAlign.classhour}}</span>
        </li>
        <li>
          <span>授课方式</span>
          <span>{{formLabelAlign.course_address}}</span>
        </li>
        <li style="width:64%;">
          <span style="width:15%;">地点</span>
          <span style="width:84%;">{{formLabelAlign.course_address}}</span>
        </li>
      </ul>
      <div style="clear:both;"></div>
      <p style="margin-bottom:10px;">
        <span style="font-weight:900;color:orange;font-size:25px;">&nbsp;|&nbsp;</span>反馈内容
      </p>
                           <el-form
            label-width="200px"
            :model="formLabelAlign"
            v-if="formLabelAlign.feedback_type==1"
          >
            <el-form-item label="反馈类型:">
              <p v-if="formLabelAlign.feedback_type==1">试听/首次课程反馈</p>
            </el-form-item>
            <el-form-item label="试听/首次课上课内容">
              <p>{{formLabelAlign.feedback1.details_1}}</p>
            </el-form-item>
            <el-form-item label="学生的课堂表现及学生学习上存在的主要问题:">
              <span>{{formLabelAlign.feedback1.details_2}}</span>
            </el-form-item>
            <el-form-item label="老师对学生此科目学习水平的评估及接下来的学习建议">
              <p>{{formLabelAlign.feedback1.details_3}}</p>
            </el-form-item>
            <el-form-item label="针对此学生的课程计划及相应的课时安排:">
              <span>{{formLabelAlign.feedback1.details_4}}</span>
            </el-form-item>
            <el-form-item label="本次课的课后作业">
              <p>{{formLabelAlign.feedback1.details_5}}</p>
            </el-form-item>
          </el-form>

          <el-form
            label-width="200px"
            :model="formLabelAlign"
            v-if="formLabelAlign.feedback_type==2"
          >
            <el-form-item label="反馈类型:">
              <p v-if="formLabelAlign.feedback_type==2">日常上课反馈</p>
            </el-form-item>
            <el-form-item label="上节课学生作业的完成情况及其知识点掌握情况:">
              <p>{{formLabelAlign.feedback2.details_1}}</p>
            </el-form-item>
            <el-form-item label="本次上课内容:">
              <span>{{formLabelAlign.feedback2.details_2}}</span>
            </el-form-item>
            <el-form-item label="学生的课堂表现及学生本次课掌握不好的地方，学生课下复习的重点有哪些:">
              <p>{{formLabelAlign.feedback2.details_3}}</p>
            </el-form-item>
            <el-form-item label="本次课的课后作业:">
              <span>{{formLabelAlign.feedback2.details_4}}</span>
            </el-form-item>
          </el-form>
          <el-form
            label-width="200px"
            :model="formLabelAlign"
            v-if="formLabelAlign.feedback_type==3"
          >
            <el-form-item label="反馈类型:">
              <p v-if="formLabelAlign.feedback_type==3">阶段性上课反馈</p>
            </el-form-item>
            <el-form-item label="总结此阶段的学习内容:">
              <p>{{formLabelAlign.feedback3.details_1}}</p>
            </el-form-item>
            <el-form-item label="总结此阶段学生作业的完成情况及其知识点掌握情况:">
              <span>{{formLabelAlign.feedback3.details_2}}</span>
            </el-form-item>
            <el-form-item label="指出学生接下来需要提升的若干点:">
              <p>{{formLabelAlign.feedback3.details_3}}</p>
            </el-form-item>
            <el-form-item label="授课老师接下来的课程计划:">
              <span>{{formLabelAlign.feedback3.details_4}}</span>
            </el-form-item>
          </el-form>
          <el-form
            label-width="200px"
            :model="formLabelAlign"
            v-if="formLabelAlign.feedback_type==4"
          >
            <el-form-item label="反馈类型:">
              <p v-if="formLabelAlign.feedback_type==4">结课总结</p>
            </el-form-item>
            <el-form-item label="总结此整个课程学习内容:">
              <p>{{formLabelAlign.feedback4.details_1}}</p>
            </el-form-item>
            <el-form-item label="总结此课程教学过程中学生作业的完成情况及其知识点掌握情况:">
              <span>{{formLabelAlign.feedback4.details_2}}</span>
            </el-form-item>
            <el-form-item label="指出学生接下来需要提升的若干点:">
              <p>{{formLabelAlign.feedback4.details_3}}</p>
            </el-form-item>
            <el-form-item label="授课老师接下来对学生后续学习此科目或课程的建议:">
              <span>{{formLabelAlign.feedback4.details_4}}</span>
            </el-form-item>
          </el-form>
               <el-form
            label-width="200px"
            :model="formLabelAlign"
            v-if="formLabelAlign.feedback_type==null"
          >
            <el-form-item label="反馈类型:">
              <p v-if="formLabelAlign.feedback_type==null">参数丢失,此课程反馈无法查看</p>
            </el-form-item>
               </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

        <!-- 试听情况的弹出页面 -->
    <el-dialog
      :close-on-click-modal="false"
      title="试听情况"
      :visible.sync="audition_show"
      center
    >
      <el-form  :model="audition_result" label-width="80px">
          <el-form-item label="试听情况">
    <el-radio-group v-model="audition_result.audition_status">
      <el-radio :label='1' >试听成功</el-radio>
      <el-radio :label='2' >试听失败</el-radio>
        <el-radio :label='3' >待续费</el-radio>
    </el-radio-group>
  </el-form-item>
        <el-form-item label="备  注" >
          <el-input style="width:50%;" v-model="audition_result.audition_remarks"></el-input>
        </el-form-item>
        
      </el-form>
   
      <span slot="footer" class="dialog-footer">
        <el-button @click="audition_show = false">取 消</el-button>
        <el-button type="primary" @click="audition_post()">确 定</el-button>
      </span>
    </el-dialog>
    <span v-if="msg.data">
      <el-pagination
        style="float:right;margin-bottom:30px"
        background
        layout="prev, pager, next"
        @prev-click="prev"
        @next-click="next"
        @current-change="current"
        :page-size="10"
        :total="msg.data.count"
      ></el-pagination>
    </span>
  </div>
</template>
<script>
import { mapState } from "vuex";
import url from "../../config/config.js";

export default {
  data() {
    return {
      ifname: "",

      tableData: [],
      form: {
         search: "", //搜索学员姓名条件
         page: 1, //页码
         attendance_status: -1 ,//考勤状态
         course_address:'',
      },
      audition_result:{
        course_id:'',
        audition_status:1,
        audition_remarks:''
      },
      check_address:[{label:'线上',value:1},{label:'线下',value:2}],
      audition_show:false,
      unnormalData: {
        //异常数据
        attendance_type: 2,
        course_id: "",
        classhour: "",
        true_classhour: "",
        remarks1: "",
        true_classhour: "",
        remarks2: "",
        student_classhour: "",
        remarks3: ""
      },
      check_status: [
            { value: -1, label: "全部" },
        { value: 0, label: "未考勤" },
          { value: 5, label: "已考勤-异常" },
        { value: 1, label: "已考勤-正常" },
        { value: 2, label: "已考勤-异常取消" },
            { value: 3, label: "已考勤-异常反馈已填" }, 
                { value: 4, label: "已考勤-异常反馈未填" },
               { value: 6, label: "已考勤-异常未结转" },
      ],
            check_type: [
              { value: 0, label: "全部" },
        { value: 1, label: "正课" },
        { value: 2, label: "试听" },
        { value: 3, label: "辅导" }
      ],
      normalData: {
        attendance_type: 1,
        classhour: "",
        course_id: "",
        true_classhour: "",
        teacher_classhour: "",
        student_classhour: "",
        remarks: ""
      }, //正常数据
      seeMoreData: {},
      msg: {},
      role_name:'',//是否课程顾问
      dialogVisible: false, //查看课堂反馈
      centerDialogVisible_normal: false, //正常
      centerDialogVisible_unnormal: false, //异动
      centerDialogVisible_seeMore: false,
      opration: "", //操作选项
      labelPosition: "left",
      formLabelAlign: {}, //查看反馈内容
      seeMoreDataEdit:{} , //编辑考勤数据
      edit_check_dom:false,
    };
  },
  computed: mapState(["rolemenu"]),
  created() {
    this.$apis.students.getuilcode();
    this.getadata();
    this.$apis.menber
        .admin_base({admin_id: this.getdataCookie("admin_id")})
        .then(res => {
          if (res.data.code == 1) {
         this.role_name=res.data.data.role_name
  
          }
        })
    this.opration = this.rolemenu[1].children[4].children;
  },
  methods: {
     getdataCookie(cname) {
      // return 1
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      this.$router.push({ path: "/login" });
    },
        nowVideo(a) {
      //观看直播
      let parms = {
        course_id: a
      };
      this.$message({
        type: "success",
        message: "正在创建链接,请稍等片刻"
      });
      this.$apis.common.enter_classroom(parms).then(res => {
        if (res.data.code == 1) {
          let client_url = res.data.data.client_url;
          var iWidth = 1000;
          var iHeight = 600;
          var iTop = (window.screen.height - 30 - iHeight) / 2; //获得窗口的垂直位置;
          var iLeft = (window.screen.width - 10 - iWidth) / 2; //获得窗口的水平位置;
          window.open(
            client_url,
            name,
            "height=" +
              iHeight +
              ",innerHeight=" +
              iHeight +
              ",width=" +
              iWidth +
              ",innerWidth=" +
              iWidth +
              ",top=" +
              iTop +
              ",left=" +
              iLeft +
              ",toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no"
          );
        } else {
          this.$message({
            type: "warnning",
            message: "数据获取出错"
          });
        }
      });
    },
    openVideo(a) {
      //观看录播
      //  var iWidth=$(window).width();                         //弹出窗口的宽度;
      if (a == "0") {
        this.$message({
          type: "warning",
          message: "我们的直播数据还在生成中,你可以稍后再来",
          duration: 4000
        });
      } else {
        var iWidth = 1000;
        var iHeight = 600;
        var iTop = (window.screen.height - 30 - iHeight) / 2; //获得窗口的垂直位置;
        var iLeft = (window.screen.width - 10 - iWidth) / 2; //获得窗口的水平位置;
        window.open(
          a,
          name,
          "height=" +
            iHeight +
            ",innerHeight=" +
            iHeight +
            ",width=" +
            iWidth +
            ",innerWidth=" +
            iWidth +
            ",top=" +
            iTop +
            ",left=" +
            iLeft +
            ",toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no"
        );
      }
    },
    recharge_export(){
            this.$message({
        type: "success",
        message: "正在导出,请稍等..."
      });
       let parms = "";
      for (var key in this.form) {
       parms += key + "=" + this.form[key] + "&";       
      };
        window.location.href = url.urls + "/api_export_attendance" + "?" + parms;
    
    },
    checkTime(a) {
      let thisTime = new Date();
      let useThisTime =
        thisTime.getFullYear() +
        "-" +
        (thisTime.getMonth() + 1) +
        "-" +
        thisTime.getDate() +
        " " +
        thisTime.getHours() +
        ":" +
        thisTime.getMinutes() +
        ":" +
        thisTime.getSeconds();
      return useThisTime > a.end_time;
    },
    normal(a) {
      let thisTime = new Date();
      let useThisTime =
        thisTime.getFullYear() +
        "-" +
        (thisTime.getMonth() + 1) +
        "-" +
        thisTime.getDate() +
        " " +
        thisTime.getHours() +
        ":" +
        thisTime.getMinutes() +
        ":" +
        thisTime.getSeconds();
      if (useThisTime > a.end_time) {
        this.normalData.true_classhour = a.true_classhour;
        this.normalData.classhour = a.classhour;
        this.normalData.true_classhour = a.true_classhour;
        this.normalData.teacher_classhour = a.teacher_classhour;
        this.normalData.student_classhour = a.student_classhour;
        this.centerDialogVisible_normal = true;
        this.normalData.course_id = a.course_id;
      } else {
        this.$message({
          type: "warning",
          message: "请等待课时结束"
        });
      }
    },
    normal_post() {
      this.$apis.common.attendance_add(this.normalData).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: "成功",
            type: "success"
          });
          this.getadata();
          this.centerDialogVisible_normal = false;
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        }
      });
    },
    edit_put(result){
              this.$apis.common.attendance_edit(this.seeMoreDataEdit).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: "成功",
            type: "success"
          });
          this.getadata();
         this.edit_check_dom = false

        } else {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        }
      });
    },
    // scope.row.is_audition!==1&&role_name!=='课程顾问'
    checkTeacher(a,b){
     
       let result =true
       if(a!==1&&b=='课程顾问'){
          //如果当前对象是课程顾问并且不是试听课程  就不显示
          result=false
       }else{
         result=true
       }
return result     },
    unnormal(a) {
      this.unnormalData = {};
      (this.unnormalData.attendance_type = 2),
        (this.unnormalData.course_id = a.course_id);
      this.unnormalData.classhour = a.classhour;
      this.centerDialogVisible_unnormal = true;
    },
    unnormal_post() {
      if (
        this.unnormalData.true_classhour >= 0 &&
        this.unnormalData.teacher_classhour >= 0 &&
        this.unnormalData.student_classhour >= 0
      ) {
        this.$message({
          message: "登记成功",
          type: "success"
        });
        this.$apis.common.attendance_add(this.unnormalData).then(res => {
          if (res.data.code == 1) {
            this.getadata();
            this.centerDialogVisible_unnormal = false;
          } else {
            this.$message({
              message: "填写的课时有误，请核对",
              type: "warning"
            });
          }
        });
      } else {
        this.$message({
          message: "填写的课时有误，请核对",
          type: "warning"
        });
      }
    },
        audition_post(result) {
          // this.audition_result.course_id= result.row.course_id
          if(this.audition_result.audition_remarks){
       this.$apis.common.audition_info(this.audition_result).then(res => {
          if (res.data.code == 1) {
            this.getadata();
            this.audition_show = false;
                      this.$message({
              message: "提交成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "填写的试听有误，请核对",
              type: "warning"
            });
          }
        });
          }else{
               this.$message({
              message: "备注不可为空，请重试",
              type: "warning"
            })
          }
 

    },
    clear_choose(){
      this.form.attendance_status=-1
    },
    // 查看详情
    seeMore(result) {
      //console.log(result)
      this.centerDialogVisible_seeMore = true;
      let params = {
        course_id: result.row.course_id
      };
      this.$apis.common.attendance_details(params).then(res => {
        if (res.data.code) {
          this.seeMoreData = res.data.data;
          this.seeMoreDataEdit=res.data.data
          this.seeMoreDataEdit.course_id=result.row.course_id
          this.seeMoreData.attendance_type = result.row.attendance_status;
        }
      });
    },
    showEdit(result){
            this.edit_check_dom = true;
      let params = {
        course_id: result.row.course_id
      };
      this.$apis.common.attendance_details(params).then(res => {
        if (res.data.code) {
          this.seeMoreData = res.data.data;
          this.seeMoreDataEdit=res.data.data
          this.seeMoreDataEdit.course_id=result.row.course_id
          this.seeMoreData.attendance_type = result.row.attendance_status;
        }
      });
    },
    payMoney(data) {
      let params = {
        course_id: data.course_id
      };
      this.$confirm("此操作将确定结转, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$apis.common.carryforward(params).then(res => {
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: "结转成功!"
              });
              this.getadata();
            }else{
                  this.$message({
                type: "warning",
                message: res.data.msg
              }); 
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消结转"
          });
        });
    },
    //序号排列
    indexMethod(index) {
      if (this.form.page == 1) {
        return index + 1;
      } else {
        let page = (this.form.page - 1) * 10 + 1;
        return index + page;
      }
    },
    current(num) {
      //当前页数
      this.form.page = num;
      this.getadata();
    },
    next() {
  
      this.form.page+1;
          console.log( this.form.page)
      this.getadata();
    },
    prev() {
      //上一页
      if (this.form.page > 1) {
        this.form.page-1;
        console.log( this.form.page)
        this.getadata();
      }
    },
    fillFeedback_see(a) {
      let parms = {
        course_id: a
      };
      this.dialogVisible = true;
      this.$apis.common.course_feedback(parms).then(res => {
        if (res.data.code == 1) {
          this.formLabelAlign = res.data.data;
          console.log(this.formLabelAlign)
        }
      });
    },
    audition(result){
this.audition_show=true
this.audition_result.course_id=result
    },
    getadata() {
      // this.form.page=1
      this.$apis.students.attendance_list(this.form).then(res => {
        if (res.data.code == 1) {
          this.msg = res.data;
          this.tableData = res.data.data.list;
        }
      });
    }
  }
};
</script>
<style scoped>
/* p{
  text-align: center;
} */
.delete_left /deep/ .el-button {
  margin-left:0;
}
.so_input {
  width: 300px;
  margin-bottom: 20px;
}
.so_main_left {
  float: left;
  margin-top: 20px;
}
.so_main_right {
  float: right;
}
.ul_li {
  background-color: #fff;
  height: 90px;
  width: calc(100% - 3px);
}
.ul_li li {
  list-style: none;
  float: left;
  width: 33%;
  height: 30px;
  font-size: 14px;
  padding: 0;
  /* margin: 0 0 0 -1px; */
}
.ul_li li:nth-child(3) {
  width: 34%;
}
.ul_li li:nth-child(6) {
  width: 34%;
}
.ul_li li:nth-child(9) {
  width: 34%;
}
.ul_li li span {
  display: inline-block;
  float: left;
  width: 49%;
  height: 30px;
  line-height: 30px;
}
.ul_li li :nth-child(1) {
  width: 30%;
  text-align: center;
  background-color: #f5f5f5;
  /* border:1px solid #F5F5F5; */
}
.ul_li li :nth-child(2) {
  width: 69%;
  text-align: center;
  box-shadow: 0 0 0 1px #f5f5f5;
}
</style>
