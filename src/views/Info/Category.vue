<template>
  <div id="category">
    <el-button type="danger" @click="addFirstCategory">添加一级分类</el-button>
    <el-row :gutter="20">
      <el-col :span="10">
        <div
          class="category"
          v-for="firstItem in categoryData.item"
          :key="firstItem.id">
          <h4>
            <svg-icons
              iconClass="minus_square font15"
              iconName="minus_square"/>
            {{ firstItem.category_name }}
            <div class="button-group">
              <el-button type="danger" size="mini" round 
              @click="editFirstCategory(firstItem)">
                编辑
              </el-button>
              <el-button type="success" size="mini" @click="handleAddChild(firstItem)" round>添加子级</el-button>
              <el-button size="mini" @click="deleteCategoryConfirm(firstItem.id)" round>删除</el-button>
            </div>
          </h4>
          <ul v-if="firstItem.children">
            <li v-for="secondItem in firstItem.children" :key="secondItem.id">
              {{ secondItem.category_name }}
              <div class="button-group">
                <el-button type="danger" size="mini" round>编辑</el-button>
                <el-button size="mini" round>删除</el-button>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="14">
        <h4 class="menu-title">一级分类编辑</h4>
        <div class="form-wrap">
          <el-form ref="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="一级分类名称:" label-width="110px" class="w410" v-if="firstCategoryVisible">
              <el-input v-model="form.categoryName" :disabled="firstCategoryDisable"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称:" label-width="110px" class="w410" v-if="secondCategoryVisible">
              <el-input v-model="form.secondCategoryName" :disabled="secondCategoryDisable"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" size="mini" @click="submit" :loading="submitLoading">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { reactive, ref, onMounted, watch, computed } from "@vue/composition-api";
import { addFirstCategoryApi, deleteCategoryApi, editCategoryApi, addSecondCategoryApi } from "@/api/news";
import { common } from '@/api/common';
export default {
  name: "infoIndex",
  setup(props, { root }) {
    /**
     * 公用方法和数据
     */
    const { getCategory, category } = common();
    /**
     * data
     */
    // ref
    const firstCategoryVisible = ref(true);
    const secondCategoryVisible = ref(true);
    const submitLoading = ref(false);
    const deleteId = ref('');
    const firstCategoryDisable = ref(true);
    const secondCategoryDisable = ref(true);
    const submitType = ref('');
    // reactive
    const form = reactive({
      categoryName: "",
      secondCategoryName: "",
    });
    const categoryData = reactive({
      item: [],
      current: {}
    });
    const editParams = reactive({});
    /**
     * methods
     */
    // 提交
    const submit = () => {
      if (!form.categoryName) {
        root.$message({
          message: "分类名称不能为空",
          type: "warning",
        });
        return false;
      }
      submitLoading.value = true;
      // 添加一级分类时调用的接口
      if (submitType.value === 'addFirstCategory') {
        submitAddCategory();
      } else if (submitType.value === 'editFirstCategory') {
        submitEditCategory();
      } else if (submitType.value === 'addSecondCategory') {
        submitAddSecondCategory();
      }
    };
    // 添加一级目录
    const submitAddCategory = () => {
      addFirstCategoryApi({
        categoryName: form.categoryName,
        secondCategoryName: form.secondCategoryName,
      })
      .then((res) => {
        root.$message({
          message: res.data.message,
          type: "success",
        });
        categoryData.item.push(res.data.data);
        submitLoading.value = false;
      })
      .catch((err) => {
        root.$message({
          message: res.data.message,
          type: "error",
        });
        submitLoading.value = false;
      });
    }

    const addFirstCategory = () => {
      submitType.value = 'addFirstCategory';
      firstCategoryDisable.value = false;
      firstCategoryVisible.value = true;
      secondCategoryVisible.value = false;
      form.categoryName = '';
    };

    // 编辑一级目录
    const submitEditCategory = () => {
      editCategoryApi({id: editParams.id, categoryName: form.categoryName}).then(res => {
        root.$message({
          message: res.data.message,
          type: "success",
        });
        let index = categoryData.item.findIndex(item => item.id === editParams.id);
        categoryData.item[index].category_name = form.categoryName;
        submitLoading.value = false;
      })
    }
    const editFirstCategory = (params) => {
      submitType.value = 'editFirstCategory';
      firstCategoryDisable.value = false;
      secondCategoryVisible.value = false;
      firstCategoryVisible.value = true;
      form.categoryName = params.category_name;
      editParams.category_name = params.category_name;
      editParams.id = params.id;
    }
    // 删除一级目录
    const deleteCategoryConfirm = (id) => {
      deleteId.value = id;
      root.confirmDelete({
        id: id,
        content: "确认删除此信息？确认后将无法恢复！！",
        fn: deleteCategory
      });
    }
    const deleteCategory = () => {
      let data = {categoryId: deleteId.value};
      deleteCategoryApi(data);
      let index = categoryData.item.findIndex(item => item.id === deleteId.value);
      categoryData.item.splice(index, 1);
    }

    // 添加二级目录
    const submitAddSecondCategory = () => {
      if (! form.secondCategoryName) {
        root.$message({
          message: "子级分类不能为空！",
          type: "error"
        });
      }
      const data = 	{
        categoryName: form.secondCategoryName,
        parentId: categoryData.current.id
      };
      submitLoading.value = true;
      addSecondCategoryApi(data).then(res => {
        root.$message({
          message: res.data.message,
          type: "success",
        });
        submitLoading.value = false;
        getCategory();
      }).catch(err => {
        root.$message({
          message: res.data.message,
          type: "warning",
        });
        submitLoading.value = false;
      })
    }
  
    const handleAddChild = (firstItem) => {
      // 对话框的禁用和显示
      firstCategoryDisable.value = true;
      firstCategoryVisible.value = true;
      secondCategoryDisable.value = false;
      secondCategoryVisible.value = true;
      // 保留原有的一级目录名称
      form.categoryName = firstItem.category_name;
      categoryData.current = firstItem;
      // 提交模式
      submitType.value = 'addSecondCategory';
    }

    /**
     * 生命周期
     */
    onMounted(() => {
      getCategory();
    });
    watch(() => category.item, (val) => {
      categoryData.item = val;
    })
    return {
      // ref
      firstCategoryVisible, secondCategoryVisible, submitLoading, firstCategoryDisable, secondCategoryDisable,
      // reactive
      form, categoryData,
      // methods
      submit, addFirstCategory, deleteCategory, deleteCategoryConfirm, editFirstCategory, handleAddChild, 
      submitAddSecondCategory
    };
  },
};
</script>
<style lang="scss" scoped>
#category {
  text-align: left;
}
.category {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 21px;
    }
  }
}
.menu-title {
  line-height: 44px;
  padding-left: 22px;
  background-color: #f3f3f3;
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  width: 100%;
  &:before {
    content: "";
    position: absolute;
    left: 23px;
    top: 30px;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
    height: 12px;
  }
  h4 {
    position: relative;
    padding-left: 40px;
  }
  svg {
    position: absolute;
    left: 14px;
    top: 15px;
    background-color: #fff;
    font-size: 17px;
  }
  ul {
    padding-left: 23px;
  }
  li {
    position: relative;
    list-style: none;
    padding-left: 35px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: -23px;
      width: 32px;
      height: 43px;
      border-bottom: 1px dotted #000;
      border-left: 1px dotted #000;
    }
  }
  li,h4 {
    @include webkit(transition, all 0.5s ease 0s);
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
.button-group {
  display: none;
  position: absolute;
  z-index: 2;
  right: 11px;
  top: -1px;
  button {
    font-size: 12px;
    height: 35px;
    line-height: 15px;
  }
}
.form-wrap {
  width: 410px;
  padding-top: 26px;
}
</style>