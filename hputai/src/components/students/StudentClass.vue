<template>
  <div class="main screen_he">
    <div class="data_main">
      <el-cascader
        placeholder="输入学生姓名"
        v-model="value_stu"
        :options="options1"
        clearable
        @change="handleChange(value_stu)"
        filterable
      ></el-cascader>
      <el-cascader
        placeholder="选择科目"
        v-model="value_sub"
        clearable
        filterable
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        :show-all-levels="false"
        @change="handleChange_1"
      ></el-cascader>
      <el-select clearable v-model="is_parttime" placeholder="请选择老师类型" @change="Change_teacher">
        <el-option label="兼职老师" value="2"></el-option>
        <el-option label="全职老师" value="1"></el-option>
      </el-select>
      <el-button type="primary" @click="recharge_export">导出</el-button>

      <div style="height:20px"></div>

      <el-calendar>
        <template slot="dateCell" slot-scope="{date, data}">
          <p
            :class="data.isSelected ? 'is-selected' : ''"
            @click="searchDay(data.day)"
          >{{data.day.slice(8)}}{{ data.isSelected ? '✔️' : ''}}</p>
        </template>
      </el-calendar>
      <!-- 待上课表 -->
      <div class="table_div data_list posi_right" v-if="change_value=='1'">
        <el-table
          class
          :data="tableData"
          :header-cell-style="{background:'#f4f4f4'}"
          :row-class-name="tableRowClassName"
          style="margin-top:20px ,"
        >
          <el-table-column prop="start_time" sortable label="开始时间" width="140"></el-table-column>
          <el-table-column label="星期">
            <template slot-scope="scope">{{scope.row.week?scope.row.week:'未定义'}}</template>
          </el-table-column>

          <el-table-column prop="classhour" label="课时"></el-table-column>
          <el-table-column prop="student_name" label="学生姓名"></el-table-column>
          <el-table-column prop="teacher_name" label="讲师姓名"></el-table-column>
          <el-table-column prop="course_address" label="地点"></el-table-column>
          <el-table-column prop="subject_name" label="科目"></el-table-column>
          <el-table-column prop="live_name" label="直播平台"></el-table-column>
          <el-table-column label="操作" width="150" @click="dialogVisible_other = true" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" v-if="scope.row.ready_txt=='准备直播'" style="color:red">
                <a @click="nowVideo(scope.row.course_id)">{{scope.row.ready_txt}}</a>
              </el-button>
              <el-button
                size="mini"
                v-if="scope.row.ready_txt=='未知状态'"
                style="color:silver"
              >{{scope.row.ready_txt}}</el-button>
              <el-button
                size="mini"
                v-if="scope.row.ready_status==5"
                style="color:silver"
                disabled
              >{{scope.row.ready_txt}}</el-button>
              <el-button
                size="mini"
                v-if="scope.row.ready_txt=='待直播'"
                style="color:white;background-color:#409eff;"
              >{{scope.row.ready_txt}}</el-button>
              <el-button
                size="mini"
                v-if="scope.row.ready_txt=='待直播'"
                style="color:white;background-color:#2adbcb;"
                @click="changeClass(scope.row)"
              >调课</el-button>
              <el-button
                size="mini"
                v-if="scope.row.ready_txt=='直播中'"
                style="color:white;background-color:#409eff;"
              >
                <a @click="nowVideo(scope.row.course_id)">{{scope.row.ready_txt}}</a>
              </el-button>

              <el-dropdown
                @command="changeSele(scope.row.course_id)"
                style="border:1px orange solid;cursor:pointer;"
              >
                <span class="el-dropdown-link">
                  备用直播
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a" style="width:100px;text-align:center;">方法一</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-button
                size="mini"
                v-if="scope.row.feedback_txt=='讲师填写反馈'"
                style="color:orange"
              >{{scope.row.feedback_txt}}</el-button>
              <el-button
                size="mini"
                v-if="scope.row.feedback_txt=='查看课堂反馈'"
                style="color:blue"
              >{{scope.row.feedback_txt}}</el-button>
              <el-button
                size="mini"
                v-if="scope.row.feedback_txt=='等待讲师填写'"
                style="color:silver"
              >{{scope.row.feedback_txt}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <span v-if="tableDataNum">
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="10"
            @prev-click="prev"
            @next-click="next"
            @current-change="current"
            layout="total,  prev, pager, next"
            :total="tableDataNum.count"
          ></el-pagination>
        </span>
        <el-dialog
          :close-on-click-modal="false"
          title="其他方式进入教室"
          :visible.sync="centerDialogVisible"
          center
        >
          <el-dialog width="30%" title="使用手机扫码下载" :visible.sync="innerVisible" append-to-body>
            <div class="flex_div">
              <img :src="otherWey.mobileDownloadUrl" />
            </div>
          </el-dialog>
          <el-form
            label-width="80px"
            :model="otherWey"
            v-model="labelPosition"
            :label-position="labelPosition"
          >
            <el-form-item label="方式一：参与码进入教室" style="font-weight:700;">
              <p style="display:inline-block;margin:0 20px;">
                你的参与码：
                <span style="color:orange;">{{otherWey.code?otherWey.code:'暂未生成'}}</span>
              </p>
              <p style="display:inline-block;margin:0 20px;">
                学生的参与码：
                <span
                  style="color:orange;"
                >{{otherWey.student_code?otherWey.student_code:'暂未生成'}}</span>
              </p>
              <p>打开“云端课堂”的PC端或者APP端，输入参与码，即可进入教室。</p>
              <p>
                <el-button @click="toPc()">Windows版下载</el-button>
                <el-button @click="toMac()">Mac版下载</el-button>
                <el-button @click="toMob()">手机版下载</el-button>（或在手机应用市场搜索“云端课堂”即可下载）
              </p>
            </el-form-item>
            <el-form-item label="方式二：网页端进入教室" style="font-weight:700;">
              <el-button @click="nowSee()">点击这里即可进入教室</el-button>
              <p>或者复制下方链接在其他浏览器打开</p>
              <p>{{otherWey.webUrl}}</p>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeDio">取 消</el-button>
            <el-button type="primary" @click="closeDio">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 调课你调不调 -->
      <el-dialog title="调课" :close-on-click-modal="false" :visible.sync="showclass" width="800px">
        <div class="changeC">
          <div>
            <el-form label-width="120px" :model="thisClass">
              <el-form-item label="当前上课时间" style="font-weight:700;">
                <p>
                  <span style="color:orange;">{{thisClass.start_time?thisClass.start_time:'暂未生成'}}</span>
                </p>
              </el-form-item>
              <el-form-item label="当前下课时间" style="font-weight:700;">
                <p>{{thisClass.end_time?thisClass.end_time:'暂未生成'}}</p>
              </el-form-item>
              <el-form-item label="时长" style="font-weight:700;">
                <p>{{thisClass.classhour?thisClass.classhour:'暂未生成'}}</p>
              </el-form-item>
              <el-form-item label="科目" style="font-weight:700;">
                <p>{{thisClass.subject_name?thisClass.subject_name:'暂未生成'}}</p>
              </el-form-item>
              <el-form-item label="学生" style="font-weight:700;">
                <p>{{thisClass.student_name?thisClass.student_name:'暂未生成'}}</p>
              </el-form-item>
              <el-form-item label="讲师" style="font-weight:700;">
                <p>{{thisClass.teacher_name?thisClass.teacher_name:'暂未生成'}}</p>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <el-form label-width="120px" :rules="rules" :model="newClass">
              <el-form-item label="新的上课时间" style="font-weight:700;">
                <div class="block">
                  <span class="demonstration"></span>
                  <el-date-picker
                    v-model="choose_start_time"
                    type="datetime"
                    value-format="timestamp"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </div>
              </el-form-item>
                    <el-form-item :inline="true" label="直播平台">
        <el-select v-model="newClass.live_id" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in this.live_list_new"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
                    <el-form-item label="上课地点" prop="radio">
          <el-radio-group v-model="newClass.course_address" @change="whereGo(newClass.course_address)">
            <el-radio  :label="1">线上</el-radio>
            <el-radio  :label="2">线下</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上课地址" width="200px" v-if="newClass.course_address==2" required prop="address">
      <el-input v-model="newClass.address"></el-input>
        </el-form-item>
              <el-form-item label="调课原因" style="font-weight:700;height:290px;" required>
                <el-input type="textarea" v-model="newClass.remarks" style></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="notClass">取 消</el-button>
          <el-button type="primary" @click="handleClose">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 已上课表 -->
      <div class="table_div data_list posi_right" v-if="change_value=='2'">
        <el-table
          class
          :data="tableData"
          :header-cell-style="{background:'#f4f4f4'}"
          :row-class-name="tableRowClassName"
          style="margin-top:20px,">
          <el-table-column prop="start_time" sortable label="开始时间" width="140"></el-table-column>
          <el-table-column label="星期">
            <template slot-scope="scope">{{scope.row.week?scope.row.week:'未定义'}}</template>
          </el-table-column>
          <el-table-column prop="classhour" label="课时" width="50"></el-table-column>
          <el-table-column prop="student_name" label="学生姓名"></el-table-column>
          <el-table-column prop="teacher_name" label="讲师姓名"></el-table-column>
          <el-table-column prop="course_address" label="地点"></el-table-column>
          <el-table-column prop="subject_name" label="科目"></el-table-column>
          <el-table-column prop="live_name" label="直播平台"></el-table-column>
          <el-table-column label="操作" width="170" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                v-if="scope.row.ready_txt=='待直播'"
                style="color:red"
              >{{scope.row.ready_txt}}</el-button>
              <el-button
                size="mini"
                v-if="scope.row.ready_status==5"
                style="color:silver"
                disabled
              >{{scope.row.ready_txt}}</el-button>
              <el-button
                size="mini"
                v-if="scope.row.ready_txt=='未知状态'"
                style="color:silver;bcakground-color:rgb(255,208,75);"
              >{{scope.row.ready_txt}}</el-button>
              <el-button
                size="mini"
                v-if="scope.row.ready_txt=='观看回放'"
                style="color:white;background-color:#409eff;"
              >
                <a @click="openVideo(scope.row.playback_url)">{{scope.row.ready_txt}}</a>
              </el-button>

              <el-button
                size="mini"
                v-if="scope.row.feedback_txt=='讲师填写反馈'"
                @click="fillFeedback(scope.row.course_id)"
                style="color:orange"
              >{{scope.row.feedback_txt}}</el-button>
              <el-button
                size="mini"
                v-if="scope.row.feedback_txt=='查看课堂反馈'"
                @click="fillFeedback_see(scope.row.course_id,scope.row)"
                style="color:white;background-color:#5CB87A"
              >{{scope.row.feedback_txt}}</el-button>
                           <el-button
                size="mini"
                v-if="scope.row.feedback_txt=='查看课堂反馈'&&scope.row.is_teacher==1"
                @click="fillFeedback_edit(scope.row.course_id,scope.row)"
                style="color:white;background-color:#F56C6C"
              >编辑反馈</el-button>
              <el-button
                size="mini"
                v-if="scope.row.feedback_txt=='等待讲师填写'"
                style="color:white;background-color:#8896B3"

              >{{scope.row.feedback_txt}}</el-button>
              <!-- <el-button size="mini"  >观看录播</el-button > -->
            </template>
          </el-table-column>
        </el-table>
        <span v-if="tableDataNum">
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="10"
            @prev-click="prev"
            @next-click="next"
            @current-change="current"
            layout="total,  prev, pager, next"
            :total="tableDataNum.count"
          ></el-pagination>
        </span>

        <!-- 填写课堂反馈 -->
        <el-dialog :close-on-click-modal="false" title="填写课堂反馈" :visible.sync="dialogFromVisible">
          <p style="margin-bottom:10px;">
            <span style="font-weight:900;color:orange;font-size:25px;">&nbsp;|&nbsp;</span>课程信息
          </p>

          <ul :data="gridData" class="ul_li">
            <li>
              <span>课程名称</span>
              <span>{{gridData.subject_name}}</span>
            </li>
            <li>
              <span>教师姓名</span>
              <span>{{gridData.teacher_name}}</span>
            </li>
            <li>
              <span>班主任</span>
              <span>{{gridData.banzhuren_name}}</span>
            </li>
            <li>
              <span>上课时间</span>
              <span style=" border-top-style:hidden;">{{gridData.start_time}}</span>
            </li>
            <li>
              <span>结束时间</span>
              <span style=" border-top-style:hidden;">{{gridData.end_time}}</span>
            </li>
            <li>
              <span>时长</span>
              <span style=" border-top-style:hidden;">{{gridData.classhour}}</span>
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
          <el-form :model="form" class="form_all" :rules="rules" ref="ruleForm" label-width="200px">
            <el-form-item label="类型">
              <el-radio-group v-model="form.feedback_type" @change='changeRadio'>
                <el-radio :label="1" >试听/首次课程反馈</el-radio>
                <el-radio :label="2" >日常上课反馈</el-radio>
                <el-radio :label="3" >阶段性上课反馈</el-radio>
                <el-radio :label="4" >结课总结</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="试听/首次课上课内容" prop="name" v-if="form.feedback_type=='1'">
              <el-input
                type="textarea"
                value=''
                name='details_1'
                v-model="form.feedback1.details_1"
                placeholder="(1).科目，课程名称，章节名称
(2).简述首次课讲授的具体内容"
                @input="minLen"
              ></el-input>
            </el-form-item>
            <el-form-item label="学生的课堂表现及学生学习上存在的主要问题" prop="name" v-if="form.feedback_type=='1'">
              <el-input
                type="textarea"
                value=''
                name='details_2'
             
                v-model="form.feedback1.details_2"
                placeholder="学生的课堂表现及学生学习上存在的主要问题"
              ></el-input>
            </el-form-item>
            <el-form-item label="老师对学生此科目学习水平的评估及接下来的学习建议" prop="name" v-if="form.feedback_type=='1'">
              <el-input
                type="textarea"
                    value=''
                name='details_3'
                v-model="form.feedback1.details_3"
                placeholder="老师对学生此科目学习水平的评估及接下来的学习建议
"
              ></el-input>
            </el-form-item>
            <el-form-item label="针对此学生的课程计划及相应的课时安排" prop="name" v-if="form.feedback_type=='1'">
              <el-input
                type="textarea"
                value=''
                name='details_4'
                v-model="form.feedback1.details_4"
                placeholder="针对此学生的课程计划及相应的课时安排"
              ></el-input>
            </el-form-item>
            <el-form-item label="本次课的课后作业" prop="name" v-if="form.feedback_type=='1'">
              <el-input
                type="textarea"
                 value=''
                name='details_5'
                v-model="form.feedback1.details_5"
                placeholder="	本次课的课后作业"
              ></el-input>
            </el-form-item>

            <el-form-item label="上节课学生作业的完成情况及其知识点掌握情况" prop="name" v-if="form.feedback_type=='2'">
              <el-input
                type="textarea"
                 value=''
                name='details_1'
                v-model="form.feedback2.details_1"
                placeholder="	上节课学生作业的完成情况及其知识点掌握情况，学生掌握不好的地方有哪些"
              ></el-input>
            </el-form-item>
            <el-form-item label="本次上课内容" prop="name" v-if="form.feedback_type=='2'">
              <el-input type="textarea" 
               value=''
                name='details_2'
              v-model="form.feedback2.details_2" placeholder="(1).章节名称
(2).简述本次课讲授的具体内容"></el-input>
            </el-form-item>
            <el-form-item label="学生的课堂表现及学生本次课掌握不好的地方，学生课下复习的重点有哪些" prop="name" v-if="form.feedback_type=='2'">
              <el-input
                type="textarea"
                 value=''
                name='details_3'
                v-model="form.feedback2.details_3"
                placeholder="	学生的课堂表现及学生本次课掌握不好的地方，学生课下复习的重点有哪些"
              ></el-input>
            </el-form-item>
            <el-form-item label="本次课的课后作业" prop="name" v-if="form.feedback_type=='2'">
              <el-input
                type="textarea"
                 value=''
                name='details_4'
                v-model="form.feedback2.details_4"
                placeholder="	本次课的课后作业"
              ></el-input>
            </el-form-item>

            <el-form-item label="总结此阶段的学习内容" prop="name" v-if="form.feedback_type=='3'">
              <el-input
                type="textarea"
                 value=''
                name='details_1'
                v-model="form.feedback3.details_1"
                placeholder="(1)注明此阶段的日期范围
(2)完整地简述此阶段已经讲授的内容板块
(3)指出目前的课程进度（在整个课程中的占比）"
              ></el-input>
            </el-form-item>
            <el-form-item label="总结此阶段学生作业的完成情况及其知识点掌握情况" prop="name" v-if="form.feedback_type=='3'">
              <el-input
                type="textarea"
                 value=''
                name='details_2'
                v-model="form.feedback3.details_2"
                placeholder="	总结此阶段学生作业的完成情况及其知识点掌握情况"
              ></el-input>
            </el-form-item>
            <el-form-item label="指出学生接下来需要提升的若干点" prop="name" v-if="form.feedback_type=='3'">
              <el-input
                type="textarea"
                 value=''
                name='details_3'
                v-model="form.feedback3.details_3"
                placeholder="	指出学生接下来需要提升的若干点"
              ></el-input>
            </el-form-item>
            <el-form-item label="授课老师接下来的课程计划" prop="name" v-if="form.feedback_type=='3'">
              <el-input
                type="textarea"
                 value=''
                name='details_4'
                v-model="form.feedback3.details_4"
                placeholder="	授课老师接下来的课程计划"
              ></el-input>
            </el-form-item>

            <el-form-item label="总结此整个课程学习内容" prop="name" v-if="form.feedback_type=='4'">
              <el-input
                type="textarea"
                 value=''
                name='details_1'
                v-model="form.feedback4.details_1"
                placeholder="	(1)完整地简述此课程已经讲授的内容板块
(2)指出课程到目前为止的完成度（已完成内容在整个课程中的占比）"
              ></el-input>
            </el-form-item>
            <el-form-item label="总结此课程教学过程中学生作业的完成情况及其知识点掌握情况" prop="name" v-if="form.feedback_type=='4'">
              <el-input
                type="textarea"
                 value=''
                name='details_2'
                v-model="form.feedback4.details_2"
                placeholder="	总结此课程教学过程中学生作业的完成情况及其知识点掌握情况
"
              ></el-input>
            </el-form-item>
            <el-form-item label="指出学生接下来需要提升的若干点" prop="name" v-if="form.feedback_type=='4'">
              <el-input
                type="textarea"
                 value=''
                name='details_3'
                v-model="form.feedback4.details_3"
                placeholder="	指出学生接下来需要提升的若干点"
              ></el-input>
            </el-form-item>
            <el-form-item label="授课老师接下来对学生后续学习此科目或课程的建议" prop="name" v-if="form.feedback_type=='4'">
              <el-input
                type="textarea"
                 value=''
                name='details_4'
                v-model="form.feedback4.details_4"
                placeholder="	授课老师接对学生后续学习此科目或课程的建议"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">确定</el-button>
              <el-button type="primary" @click="onSubmit_1">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

         <!-- 编辑课堂反馈 -->
        <el-dialog :close-on-click-modal="false" title="编辑课堂反馈" :visible.sync="editOpen">
          <p style="margin-bottom:10px;">
            <span style="font-weight:900;color:orange;font-size:25px;">&nbsp;|&nbsp;</span>课程信息
          </p>

          <ul :data="gridData" class="ul_li">
            <li>
              <span>课程名称</span>
              <span>{{gridData.subject_name}}</span>
            </li>
            <li>
              <span>教师姓名</span>
              <span>{{gridData.teacher_name}}</span>
            </li>
            <li>
              <span>班主任</span>
              <span>{{gridData.banzhuren_name}}</span>
            </li>
            <li>
              <span>上课时间</span>
              <span style=" border-top-style:hidden;">{{gridData.start_time}}</span>
            </li>
            <li>
              <span>结束时间</span>
              <span style=" border-top-style:hidden;">{{gridData.end_time}}</span>
            </li>
            <li>
              <span>时长</span>
              <span style=" border-top-style:hidden;">{{gridData.classhour}}</span>
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
          <el-form :model="form" class="form_all" :rules="rules" ref="ruleForm" label-width="200px">
      
                       <el-form-item label="类型" >
              <el-radio-group v-model="form.feedback_type" @change='changeRadio'>
                <el-radio :label="1">试听/首次课程反馈</el-radio>
                <el-radio :label="2">日常上课反馈</el-radio>
                <el-radio :label="3">阶段性上课反馈</el-radio>
                <el-radio :label="4">结课总结</el-radio>
              </el-radio-group>
            </el-form-item>
         <el-form-item label="试听/首次课上课内容" prop="name" v-if="form.feedback_type=='1'">
              <el-input
              minlength="20"
                type="textarea"
                value=''
                name='details_1'
                v-model="form.feedback1.details_1"
                placeholder="(1).科目，课程名称，章节名称
(2).简述首次课讲授的具体内容"
                @input="item=>{handleSelect(item, index)}"
              ></el-input>
            </el-form-item>
            <el-form-item label="学生的课堂表现及学生学习上存在的主要问题" prop="name" v-if="form.feedback_type=='1'">
              <el-input
                type="textarea"
                value=''
                name='details_2'
             
                v-model="form.feedback1.details_2"
                 @input="((item)=>{howLength(item,index)})"
                placeholder="学生的课堂表现及学生学习上存在的主要问题"
              ></el-input>
            </el-form-item>
            <el-form-item label="老师对学生此科目学习水平的评估及接下来的学习建议" prop="name" v-if="form.feedback_type=='1'">
              <el-input
                type="textarea"
                    value=''
                name='details_3'
                v-model="form.feedback1.details_3"
                placeholder="老师对学生此科目学习水平的评估及接下来的学习建议
"
              ></el-input>
            </el-form-item>
            <el-form-item label="针对此学生的课程计划及相应的课时安排" prop="name" v-if="form.feedback_type=='1'">
              <el-input
                type="textarea"
                value=''
                name='details_4'
                v-model="form.feedback1.details_4"
                placeholder="针对此学生的课程计划及相应的课时安排"
              ></el-input>
            </el-form-item>
            <el-form-item label="本次课的课后作业" prop="name" v-if="form.feedback_type=='1'">
              <el-input
                type="textarea"
                 value=''
                name='details_5'
                v-model="form.feedback1.details_5"
                placeholder="	本次课的课后作业"
              ></el-input>
            </el-form-item>

            <el-form-item label="上节课学生作业的完成情况及其知识点掌握情况" prop="name" v-if="form.feedback_type=='2'">
              <el-input
                type="textarea"
                 value=''
                name='details_1'
                v-model="form.feedback2.details_1"
                placeholder="	上节课学生作业的完成情况及其知识点掌握情况，学生掌握不好的地方有哪些"
              ></el-input>
            </el-form-item>
            <el-form-item label="本次上课内容" prop="name" v-if="form.feedback_type=='2'">
              <el-input type="textarea" 
               value=''
                name='details_2'
              v-model="form.feedback2.details_2" placeholder="(1).章节名称
(2).简述本次课讲授的具体内容"></el-input>
            </el-form-item>
            <el-form-item label="学生的课堂表现及学生本次课掌握不好的地方，学生课下复习的重点有哪些" prop="name" v-if="form.feedback_type=='2'">
              <el-input
                type="textarea"
                 value=''
                name='details_3'
                v-model="form.feedback2.details_3"
                placeholder="	学生的课堂表现及学生本次课掌握不好的地方，学生课下复习的重点有哪些"
              ></el-input>
            </el-form-item>
            <el-form-item label="本次课的课后作业" prop="name" v-if="form.feedback_type=='2'">
              <el-input
                type="textarea"
                 value=''
                name='details_4'
                v-model="form.feedback2.details_4"
                placeholder="	本次课的课后作业"
              ></el-input>
            </el-form-item>

            <el-form-item label="总结此阶段的学习内容" prop="name" v-if="form.feedback_type=='3'">
              <el-input
                type="textarea"
                 value=''
                name='details_1'
                v-model="form.feedback3.details_1"
                placeholder="(1)注明此阶段的日期范围
(2)完整地简述此阶段已经讲授的内容板块
(3)指出目前的课程进度（在整个课程中的占比）"
              ></el-input>
            </el-form-item>
            <el-form-item label="总结此阶段学生作业的完成情况及其知识点掌握情况" prop="name" v-if="form.feedback_type=='3'">
              <el-input
                type="textarea"
                 value=''
                name='details_2'
                v-model="form.feedback3.details_2"
                placeholder="	总结此阶段学生作业的完成情况及其知识点掌握情况"
              ></el-input>
            </el-form-item>
            <el-form-item label="指出学生接下来需要提升的若干点" prop="name" v-if="form.feedback_type=='3'">
              <el-input
                type="textarea"
                 value=''
                name='details_3'
                v-model="form.feedback3.details_3"
                placeholder="	指出学生接下来需要提升的若干点"
              ></el-input>
            </el-form-item>
            <el-form-item label="授课老师接下来的课程计划" prop="name" v-if="form.feedback_type=='3'">
              <el-input
                type="textarea"
                 value=''
                name='details_4'
                v-model="form.feedback3.details_4"
                placeholder="	授课老师接下来的课程计划"
              ></el-input>
            </el-form-item>

            <el-form-item label="总结此整个课程学习内容" prop="name" v-if="form.feedback_type=='4'">
              <el-input
                type="textarea"
                 value=''
                name='details_1'
                v-model="form.feedback4.details_1"
                placeholder="	(1)完整地简述此课程已经讲授的内容板块
(2)指出课程到目前为止的完成度（已完成内容在整个课程中的占比）"
              ></el-input>
            </el-form-item>
            <el-form-item label="总结此课程教学过程中学生作业的完成情况及其知识点掌握情况" prop="name" v-if="form.feedback_type=='4'">
              <el-input
                type="textarea"
                 value=''
                name='details_2'
                v-model="form.feedback4.details_2"
                placeholder="	总结此课程教学过程中学生作业的完成情况及其知识点掌握情况
"
              ></el-input>
            </el-form-item>
            <el-form-item label="指出学生接下来需要提升的若干点" prop="name" v-if="form.feedback_type=='4'">
              <el-input
                type="textarea"
                 value=''
                name='details_3'
                v-model="form.feedback4.details_3"
                placeholder="	指出学生接下来需要提升的若干点"
              ></el-input>
            </el-form-item>
            <el-form-item label="授课老师接下来对学生后续学习此科目或课程的建议" prop="name" v-if="form.feedback_type=='4'">
              <el-input
                type="textarea"
                 value=''
                name='details_4'
                v-model="form.feedback4.details_4"
                placeholder="	授课老师接对学生后续学习此科目或课程的建议"
              ></el-input>
            </el-form-item>
  
            <el-form-item>
              <el-button type="primary" @click="onSubmit_edit">确定</el-button>
              <el-button type="primary" @click="onSubmit_def">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 查看课堂反馈 -->
        <el-dialog
          :close-on-click-modal="false"
          title="查看课堂反馈"
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
            <el-form-item label="上节课学生作业的完成情况及其知识点掌握情况">
              <p>{{formLabelAlign.feedback2.details_1}}</p>
            </el-form-item>
            <el-form-item label="本次上课内容:">
              <span>{{formLabelAlign.feedback2.details_2}}</span>
            </el-form-item>
            <el-form-item label="学生的课堂表现及学生本次课掌握不好的地方，学生课下复习的重点有哪些">
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
            <el-form-item label="总结此阶段的学习内容">
              <p>{{formLabelAlign.feedback3.details_1}}</p>
            </el-form-item>
            <el-form-item label="总结此阶段学生作业的完成情况及其知识点掌握情况:">
              <span>{{formLabelAlign.feedback3.details_2}}</span>
            </el-form-item>
            <el-form-item label="指出学生接下来需要提升的若干点">
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
            <el-form-item label="总结此整个课程学习内容">
              <p>{{formLabelAlign.feedback4.details_1}}</p>
            </el-form-item>
            <el-form-item label="总结此课程教学过程中学生作业的完成情况及其知识点掌握情况:">
              <span>{{formLabelAlign.feedback4.details_2}}</span>
            </el-form-item>
            <el-form-item label="指出学生接下来需要提升的若干点">
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
      </div>
    </div>
  </div>
</template>
<script>
import url from "../../config/config.js";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  props: {
    changeTab: {
      type: String
    }
  },
  data() {
    return {
      rules: {
          address: [
            { required: true, message: '请输入上课地址', trigger: 'blur' },
          ],
      },
      value: "",
      labelPosition: "top", //其他方法进入直播排在顶部
      innerVisible: false, //内层弹框
      form: {
        feedback_type: 1,
        course_id: "",
        feedback1: {
          details_1:'',
        },
        feedback2:{},
        feedback3:{},
        feedback4: {}
      }, //from提交的数据
      form_add:{
    feedback_type: 1,
        course_id: "",
        feedback1: {
          details_1:'',
        },
        feedback2:{},
        feedback3:{},
        feedback4: {}
      },
      form_2:{

      },
      student_form: {
        course_type: "",
        start_time: "",
        search: "",
        page: "",
        student_id: "",
        page: ""
      },
      msg: ["2019-06-13 ", "2019-06-18", "2019-06-16"],
      options1: [
        //学生姓名的数据
        // label:"username",
      ],

      formLabelAlign: {}, //老师在这里疯狂反馈
      course: "", //课程ID
      currentPage: 1, //当前页
      pagesize: 10,
      thisDay: "", //当天
      value_stu: "",
      value_sub: "",
      options_1: [], //学生数组总数据
      options: [], //课程名称的数据
      options_: [], //总数据的数据
      tableData: [],
      tableData_1: [], //经过学科或者学生筛选的数据
      change_value: "1", //Tab的值
      dialogFromVisible: false, //弹出框的设置
      dialogVisible: false, //查看课堂反馈
      gridData: {}, //弹出框的表格数据
      centerDialogVisible: false, //其他方式打开课表
      showclass: false, //调课的弹窗

      otherWey: {}, //从其他方法进入直播
      num: 0, //次数的变化
      tableDataNum: "", //总页数,
      sub_secrch: "", //学科搜索
      stu_secrch: "", //学生搜索
      is_parttime: "", //选择老师类型
      parms: {
        // start_time:this.thisDay,
      }, //总参数
      thisClass: {}, //调课前的信息
      choose_start_time: "",
      newClass: {
        start_time: "",
        remarks: "",
        course_id: "",
        course_address:'1',
        address:'',
        live_id:''

      },
      live_list_new:[],//直播平台的数组
      editOpen:false,  //调课之后的提交
      resData:{},//以前的课程和现在的区别
    };
  },
  created() {
  
    this.$watch("value", function() {
      //this.artdata()
      let myTime = this.dateToMs(this.value);
    });
    this.getdata();
    this.getStudent();
    this.getClassList();
 
  },
  updated() {
    // var bodyDiv=$('.screen_he')
    //   $(bodyDiv).style.height=$(window).height()*1-210+'px'
  },
  mounted() {},

  watch: {
    changeTab: function(value) {
      this.change_value = value;
      this.getClassList();
    }
  },
  methods: {

        whereGo(a) {
      if (a == "2") {
        this.show = true;
        this.$apis.common.region_list().then(res => {
          if (res.data.code == 1) {
            getId(res.data.options);
          }
        });
        let getId = arr => {
          arr.forEach(v => {
            v.value = v.label;
            if (v.children instanceof Array) {
              getId(v.children);
            }
          });
          this.address_check = arr;
        };
        // getId(this.region_list);
        // this.address_check = this.region_list;
      } else {
        this.show = false;
      }

    },
    //     getLiveName() {
    //   //筛选直播列表
   
    // },
    changeClass(result) {
      this.showclass = true;
        this.live_list_new=[]
      this.thisClass = result;
   
        this.$apis.common.get_live_list().then(res => {
          if (res.data.code == 1) {
               for (let i = 0; i < res.data.data.length; i++) {
        var val = res.data.data[i];
        this.live_list_new.push({ value: val.id, label: val.live_name });
      }
          }
        });
                this.$apis.common.class_transfer_info({course_id:result.course_id}).then(res => {
          if (res.data.code == 1) {
              this.resData=res.data.data
                // this.choose_start_time=Number(this.resData.start_time+'000')
                this.newClass.address=this.resData.address
                this.newClass.live_id=this.resData.live_id
                this.newClass.course_address=this.resData.course_address
                console.log(this.newClass)
          }
        });
        
      this.newClass.course_id = result.course_id;
    },
    notClass() {
      this.newClass.remarks = "";
      this.newClass.start_time = "";
      this.showclass = false;
      this.choose_start_time = "";
    },
    handleClose() {
      if (this.newClass.remarks == "" ||this.newClass.course_address==2&&this.newClass.address=='') {
        this.$message({
          type: "warning",
          message: "请将标注*处填写完整"
        });
      } else {
        if(this.choose_start_time!==Number(this.resData.start_time+'000')||
           this.newClass.address!==this.resData.address||
          this.newClass.live_id!==this.resData.live_id||
          this.newClass.course_address!==this.resData.course_address
        ){
        this.$confirm("此操作将修改课程, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.newClass.start_time = this.choose_start_time
            .toString()
            .substr(0, 10);
          this.$apis.common
            .course_transfer(this.newClass)
            .then(res => {
              if (res.data.code == 1) {
                this.showclass = false;
                this.getClassList();
                this.choose_start_time = "";
                this.newClass.remarks = "";
                this.newClass.start_time = "";
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
              } else {
                this.newClass.remarks = "";
                this.choose_start_time = "";
                this.newClass.start_time = "";
                this.$message({
                  type: "warning",
                  message: res.data.msg
                });
              }
            })
            .catch(() => {
              this.$message({
                type: "warning",
                message: "已取消修改"
              });
            });
        });
        }else{
                 this.$message({
                  type: "warning",
                  message: '你还没有改变任何一项，不能提交'
                });
        }

      }
    },
    recharge_export() {
      this.$message({
        type: "success",
        message: "正在导出,请稍等..."
      });
      // let urls = "http://personal.test.hqjystudio.com";
      let params = "";
      for (var key in this.parms) {
        params += key + "=" + this.parms[key] + "&";
      }
      window.location.href = url.urls + "/api_course_export" + "?" + params;
    },
    toPc() {
      window.open(this.otherWey.windowsDowloadUrl);
    },
    toMac() {
      window.open(this.otherWey.macDowloadUrl);
    },
    toMob() {
      this.innerVisible = true;
      // window.open(this.otherWey.mobileDownloadUrl)
    },
    nowSee() {
      window.open(this.otherWey.webUrl);
    },
    closeDio() {
      this.value_other = "";
      this.centerDialogVisible = false;
    },
    changeSele(a) {
      //这是根据选中的值变化的函数
      this.centerDialogVisible = true;
      let prams = {
        course_id: a
      };
      this.$apis.common.other_enter(prams).then(res => {
        if (res.data.code == 1) {
          this.otherWey = res.data.data;
        }
      });
    },

    onSubmit() {
      this.form_add.course_id = this.course;
       this.form_add.feedback_type = this.form.feedback_type;
    var fields = $(".form_all").serializeArray();
    switch (this.form.feedback_type) {
    case 1:
        this.form_add.feedback1=fields
        break;
    case 2:
        this.form_add.feedback2=fields
         break;
    case 3:
        this.form_add.feedback3=fields
         break;
    case 4:
        this.form_add.feedback4=fields
         break;
} 

      this.$apis.common.post_feedback_add(this.form_add).then(res => {
        if (res.data.code == 1) {
          this.dialogFromVisible = false;
         this.form.feedback1 = {};
          this.form.feedback2 = {};
          this.form.feedback3 = {};
          this.form.feedback4 = {};
          this.searchDay(this.thisDay);
          this.$message({
            type: "success",
            message: "提交成功"
          });
        }else{
               this.$message({
            type: "warning",
            message: res.data.msg
          });
        }
      });
    },
    onSubmit_def(){
       this.editOpen = false;
    },
    changeRadio(){  //清除前一项的残留，避免提交多余数据
          this.form.feedback1 = {};
          this.form.feedback2 = {};
          this.form.feedback3 = {};
          this.form.feedback4 = {};
    },
        onSubmit_edit() {
          var fields = $(".form_all").serializeArray();
    switch (this.form.feedback_type) {
    case 1:
        this.form.feedback1=fields
        break;
    case 2:
        this.form.feedback2=fields
         break;
    case 3:
        this.form.feedback3=fields
         break;
    case 4:
        this.form.feedback4=fields
         break;
} 
      this.$apis.common.edit_feedback_add(this.form).then(res => {
        if (res.data.code == 1) {
                this.editOpen = false;
          this.form.feedback1 = {};
          this.form.feedback2 = {};
          this.form.feedback3 = {};
          this.form.feedback4 = {};
          this.searchDay(this.thisDay);
          this.$message({
            type: "success",
            message: "提交成功"
          });
        }else{
            this.$message({
            type: "success",
            message: "每一项字数都必须在20字以上"
          });
        }
      });
    },
    onSubmit_1() {
      this.dialogFromVisible = false;
      this.form.feedback1 = {};
      this.form.feedback2 = {};
      this.form.feedback3 = {};
      this.form.feedback4 = {};
    },
    fillFeedback_see(a) {
      let parms = {
        course_id: a
      };
      this.dialogVisible = true;
      this.$apis.common.course_feedback(parms).then(res => {
        if (res.data.code == 1) {
          this.formLabelAlign = res.data.data;
          this.gridData = this.formLabelAlign;
        }
      });
    },
        fillFeedback_edit(a) {
      let parms = {
        course_id: a
      };
      this.editOpen = true;
      this.$apis.common.course_feedback(parms).then(res => {
        if (res.data.code == 1) {
           this.form=res.data.data
           this.form.course_id=res.data.data.course_id
           console.log(this.form)
          this.gridData = res.data.data;
        }
      });
    },
    fillFeedback(a, b) {
      this.dialogFromVisible = true;
      let parms = {
        course_id: a
      };
      this.$apis.common.course_feedback(parms).then(res => {
        if (res.data.code == 1) {
          this.formLabelAlign = res.data.data;
          this.gridData = this.formLabelAlign;
        }
      });
      this.course = a;

    },
    handleSizeChange(val) {
      this.pagesize = val * 1;
      this.getClassList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getClassList();
    },
    current(num) {
      //当前页数
      this.currentPage = num;
      this.getClassList();
    },
    next() {
      this.currentPage++;
      this.getClassList();
    },
    prev() {
      //上一页
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getClassList();
      }
    },
    getClassList() {
      this.$emit("update:changeTab", this.change_value);
      //这里的this是父级的作用域  也就是执行父级的该函数
      let parms = {
        course_type: this.change_value,
        page: this.currentPage,
        start_time: this.thisDay,
        student_id: this.stu_secrch.toString(),
        subject_id: this.sub_secrch,
        is_parttime: this.is_parttime
        // attendance_status:null
      };
      this.parms = parms;
      this.$apis.common.student_course(parms).then(res => {
        if (res.data.code == 1) {
          this.tableData = res.data.data.list;
          this.tableDataNum = res.data.data;
          // console.log(this.tableData)
        }
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },

    artdata() {
      // alert(this.value);
    },
    dateToMs(date) {
      let result = new Date(date).getTime();
      return result;
    },
    msToDate(msec) {
      //转化标准时间为年月日格式
      let datetime = new Date(msec);
      let year = datetime.getFullYear();
      let month = datetime.getMonth();
      let date = datetime.getDate();
      let hour = datetime.getHours();
      let minute = datetime.getMinutes();
      let second = datetime.getSeconds();
      let result1 =
        year + //带秒钟需求
        "-" +
        (month + 1 >= 10 ? month + 1 : "0" + (month + 1)) +
        "-" +
        (date + 1 < 10 ? "0" + date : date) +
        " " +
        (hour + 1 < 10 ? "0" + 0 : 0) +
        ":" +
        (minute + 1 < 10 ? "0" + minute : minute) +
        ":" +
        (second + 1 < 10 ? "0" + second : second);

      let result2 =
        year + //仅年月日需求
        "-" +
        (month + 1 >= 10 ? month + 1 : "0" + (month + 1)) +
        "-" +
        (date + 1 < 10 ? "0" + date : date);
      let result = result2;

      return result;
    },
    handleChange_1(targetName) {
      //选择科目
      var lastName =
        targetName.length == 1
          ? targetName
          : targetName.length == 2
          ? targetName[1]
          : targetName[2];
      this.sub_secrch = lastName;
      this.getClassList();
    },
minLen(value,a){
  if(value.split('').length*1<20){
  console.log(value.split('').length)
  }
 
},
handleSelect(item,index){
    console.log(item,index)
},
    handleChange(targetName) {
      //选择学生
      this.stu_secrch = targetName;
      this.getClassList();
    },
    Change_teacher(value) {
      this.is_parttime = value;
      this.getClassList();
    },
    searchDay(a) {
      this.thisDay = a;
      this.getClassList();
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
    getdata() {
      //获取科目的数据
      this.$apis.common.subject_list().then(res => {
        if (res.data.code == 1) {
          this.msg = res.data;
          this.options_ = res.data.data;
          let addWord = arr => {
            arr.forEach(item => {
              (item.value = item.id), (item.label = item.subject_name);
              if (item.children instanceof Array) {
                addWord(item.children);
              }
            });
          };
          addWord(this.options_);
          this.options = this.options_;
        }
      });
    },
    //获取学生列表
    getStudent() {
      let parms = {
        is_data: 1
      };
      this.$apis.students.students_list(parms).then(res => {
        if (res.data.code == 1) {
          this.options_1 = res.data.data.list;
          for (let i = 0; i < this.options_1.length; i++) {
            var val = this.options_1[i];
            this.options1.push({ value: val.id, label: val.username });
          }
        }
      });
    },
    getdataCookie(cname) {
      // return 1
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      // this.$router.push({path:'/login'})
    }
  }
};
</script>
<style scoped>
.data_main {
  width: 80%;
  float: left;
}
.data_list {
  width: 505px;
  margin-left: 10px;
  float: left;
}

.posi_right {
  position: absolute;
  width: 65%;
  left: 440px;
  top: 165px;
  border: 1px solid block;
  border: 1px solid silver;
}

.el-calendar {
  width: 400px !important;
  height: 400px !important;
}

.el-calendar-table .el-calendar-day {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 8px;
  height: 35px !important;
}

.prev .el-calendar-day {
  height: 35px !important;
}

.ul_li li {
  list-style: none;
  display: inline-block;
  float: left;
  width: 32%;
  height: 30px;
  padding: 0;
  margin: 0 0 0 -1px;
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
  border: 1px solid #f5f5f5;
}
.el-dialog__body {
  padding: 0px 20px;
}
/* .el-form-item__label {
background-color: silver;
} */

/* li[data-v-83bc0558]{
  width: 100px !important;
  text-align: center;
} */
.flex_div {
  width: 100%;
}
.flex_div img {
  width: 80%;
  margin: 0 10%;
}
.changeC {
  display: flex;
  align-items:flex-start;
  justify-content: space-around;
  height: 420px;
}
.changeC /deep/ textarea {
  height: 170px;
}
</style>
