<template>
  <div class="info-index-wrapper">
    <el-row :gutter="16">
      <!-- 下拉选择器 start -->
      <el-col :span="4">
        <div class="item-wrap category">
          <label for="">分类 ：</label>
          <div class="content">
            <el-select v-model="typeSelect" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in typeOptions.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div> 
      </el-col>
      <!-- 下拉选择器 end -->

      <!-- 日期选择 start -->
      <el-col :span="7">
        <div class="item-wrap date">
          <label for="">日期：</label>
          <div class="content">
            <el-date-picker
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              v-model="dateValue"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
              style="width: 100%">
            </el-date-picker>   
          </div>
        </div>
      </el-col>
      <!-- 日期选择 end -->

      <!-- 下拉选择器 关键字 start -->
      <el-col :span="7">
        <div class="item-wrap keyword">
          <label for="">关键字：</label>
          <div class="content">
            <el-select v-model="keywordSelect" style="width: 100%">
              <el-option
                v-for="item in keywordOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <!-- 下拉选择器 关键字 end -->

      <!-- 输入框  start -->
      <el-col :span="3">
        <el-input
          placeholder="请输入内容"
          v-model="keywordInput" style="width: 100%">
        </el-input>  
      </el-col>
      <!-- 输入框  end -->

      <!-- 按钮  start -->
      <el-col :span="3">
        <el-button type="danger" size="small" style="width: 100%;" @click="handleSearch">搜索</el-button>
      </el-col>
      <!-- 按钮  start -->
    </el-row>
    <div class="black-space-30"></div>
    <!-- 表格 start -->
    <el-table
    :data="tableData.item"
    border
    style="width: 100%"
    height="300"
    v-loading="loading"
    @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="categoryId" label="类别" align="center" width="90" :formatter="toCategory"></el-table-column>
      <el-table-column prop="createDate" label="日期" align="center" width="180" :formatter="toDate"></el-table-column>
      <el-table-column prop="admin" label="管理员" align="center" width="90"></el-table-column>
      <el-table-column prop="operation" label="操作" align="center" width="240">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格  end -->
    <div class="black-space-30"></div>
    <!-- 底部分页  start -->
    <el-row>
      <el-col :span="12">
        <el-button type="medium" class="pull-left" @click="handleDeleteSelect">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull-right"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 底部分页  end -->

    <!-- 新增按钮 -->
    <div class="add-button pull-right" @click="dialogOpen">
       <svg-icons iconClass="add font22" iconName="add"/>
    </div>
    <!-- 新增弹窗 -->
    <dialog-info :flag="dialogVisible" 
    :category="typeOptions.category" 
    @closeDialog="dialogVisible = false"
    @addSucess="getList"/>
    <!-- 编辑弹窗 -->
    <dialog-info-edit :flag="dialogEditVisible" 
    :category="typeOptions.category" 
    @closeDialog="dialogEditVisible = false"
    :editId="editId"
    :editData="editData.item"
    @editSucess="getList"/>
  </div>
</template>
<script>
import { timestampToTime } from '@/utils/timeStamp';
import { common } from '@/api/common';
import DialogInfo from './dialog/index' ;
import DialogInfoEdit from './dialog/edit';
import { reactive, ref, isRef, toRefs, onMounted, computed, watch } from '@vue/composition-api';
import { getListApi, deleteInfoApi } from '@/api/news';
export default {
  name:"infoIndex",
  components: {
    DialogInfo,
    DialogInfoEdit
  },
  setup(props, {root}) {
    /**
     * 公用方法数据
     */
    const { getCategory, category } = common();
    /**
     * 数据
     */
    const typeSelect = ref('');           // 类型选中
    const keywordSelect = ref('id');      // 关键词选中       
    const dateValue = ref('');            // 日期选中值
    const keywordInput = ref('');         // 关键词输入框输入值
    const dialogVisible = ref(false);     // 弹窗是否可见
    const dialogEditVisible = ref(false); // 编辑弹窗是否可见
    const total = ref(0)                  // 统计页数
    const loading = ref(false);           // 表格加载
    const deleteInfoId = ref(0);          // 删除表格数据的ID值
    const editId = ref("");                // 编辑表格数据的ID值
    // 编辑时候的原有数据
    const editData = reactive({
      item: {}
    })
    // 页码
    const page = reactive({               
      pageNumber: 1,
      pageSize: 10
    })
    // 类型选项 
    const typeOptions = reactive({
      category: []
    });
    // 关键词选项
    const keywordOptions = reactive([{
      value: 'id',
      label: 'ID'
    }, {
      value: 'title',
      label: '标题'
    }]);
     // 表格数据
    const tableData =  reactive({
      item: []
    });
    /***********************************
     * 方法
     */
    // 更改每页多少数据
    const handleSizeChange = (val) => {
      page.pageSize = val;
      getList();
    };
    // 更改页码
    const handleCurrentChange = (val) => {
      page.pageNumber = val;
      getList();
    };
    // 打开弹窗时
    const dialogOpen = () => { 
      dialogVisible.value = true;
    }
    // 点击删除按钮
    const handleDelete = (val) => {
      deleteInfoId.value = [ val ];
      root.confirmDelete({
        content: "确认删除此信息？确认后将无法恢复！！",
        fn: deleteItem
      });
    }; 
    // 删除数据
    const deleteItem = () => {
      deleteInfoApi({id: deleteInfoId.value}).then(res => {
        getList();
      })
    }
    const handleDeleteSelect = () => {
      root.confirmDelete({
        content: "确认删除选择的信息？确认后将无法恢复！！",
        fn: deleteItem
      });
    }
    const formatData = (data) => {
      data.categoryId = typeSelect.value ? typeSelect.value : '';
      data.startTime = dateValue.value ? dateValue.value[0] : '';
      data.endTime = dateValue.value ? dateValue.value[1] : '';
      if (keywordSelect.value == 'id') {
        data.id = keywordInput.value ? keywordInput.value : '';
      } else if (keywordSelect.value == 'title') {
        data.title = keywordInput.value ? keywordInput.value : '';
      }
    }

    // 获取table数据
    const getList = () => {
      // 单独处理数据
      let data = {
        categoryId: '',
        startTime: '',
        endTime: '',
        title: '',
        id: '',
        pageNumber: page.pageNumber,
        pageSize: page.pageSize,
      }
      formatData(data);
      loading.value = true;
      getListApi(data).then(res => {
        let resData = res.data.data;
        tableData.item = resData.data;
        // 更新页码统计数量
        total.value = resData.total;
        loading.value = false;
      })
    };
    // 时间戳转为日期
    const toDate = (row) => {
      return timestampToTime(row.createDate);
    }
    // 类型ID转为类型
    const toCategory = (row) => {
      let id = row.categoryId;
      let target = typeOptions.category.filter(item => item.id == id)[0];
      return target ? target.category_name : "";
    }
    // 当按下搜索按钮的时候
    const handleSearch = () => {
      getList();
    }
    // 当选择表格上框框的时候
    const handleSelectionChange = (selections) => {
      let id = selections.map(item => item.id);
      deleteInfoId.value = id;
    }
    // 点击编辑时候
    const handleEdit = (row) => {
      dialogEditVisible.value = true;
      editId.value = row.id;
      editData.item = row;
    };
    /************************************
     * 生命周期
     */
    onMounted(() => {
      getCategory();
      getList();
    }),
    watch(() => category.item, (cur) => {
      typeOptions.category = cur;
    })
    /************************************
     * 返回
     */
    return {
      // ref  
      typeSelect, keywordSelect, dateValue, keywordInput, dialogVisible, total, loading, dialogEditVisible,
      editId,
      // reactive 
      typeOptions, keywordOptions, tableData, page, editData,
      // methods
      handleSizeChange, handleCurrentChange, dialogOpen, handleDelete, handleDeleteSelect, getList, toDate, toCategory, handleSelectionChange, handleSearch, handleEdit
    }
  }
}
</script>
<style lang="scss" scoped>
@import "styles/config.scss";
.item-wrap {
  font-size: 12px;
  &.category {
    @include labelDom(left, 40, 40, 105);
  }
  &.date {
    @include labelDom(right, 44, 40, 390);
  }
  &.keyword {
    margin-left: 150px;
    @include labelDom(right, 50, 40, 80);
  }
}
.add-button {
  position: fixed;
  right: 15px;
  bottom: 20px;
  cursor: pointer;
}
</style>