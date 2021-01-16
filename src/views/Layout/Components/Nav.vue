<template>
  <div id="nav-wrap">
    <!-- 侧边栏 start -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#344a5f"
      text-color="#fff"
      active-text-color="#fff"
      router>
      <template v-for="(item, i) in routers">
        <el-submenu  v-if="! item.hidden" :key="item.id" :index="i.toString()">
        <!-- 一级菜单 -->
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.meta.name }}</span>
          </template>
          <!-- 子级菜单 -->
          <el-menu-item-group v-for="subItem in item.children" :key="subItem.id">
            <el-menu-item :index="subItem.path">{{ subItem.meta.name }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
      
    </el-menu>
    <!-- 侧边栏 end -->
  </div>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted } from '@vue/composition-api';
export default {
  name: 'NavMenu',
  setup(props, {root}) {
    /**
     * data数据
     */
    const routers = reactive(root.$router.options.routes);
     /***********************************
      * 方法函数
      */
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      routers,
      handleOpen,
      handleClose
    }
  }
}
</script>

<style lang="scss" scoped>
#nav-wrap {
  position: fixed;
  width: 250px;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #344a5f;
  text-align: left;
  font-size: 14px;
}

</style>