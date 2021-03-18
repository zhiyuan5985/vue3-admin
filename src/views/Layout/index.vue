<template>
  <div id="layout" :class="[menuStatus ? 'close' : 'open']">
    <LayoutHeader></LayoutHeader>
    <LayoutMain></LayoutMain>
    <LayoutNav></LayoutNav>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import LayoutHeader from './Components/Header'
import LayoutMain from './Components/Main'
import LayoutNav from './Components/Nav'
export default {
  name: 'Layout',
  components: {
    LayoutHeader,
    LayoutMain,
    LayoutNav
  },
  setup(props, { root }) {
    const menuStatus = computed(() => root.$store.state.app.isCollapse);
    return {
      menuStatus
    }
  }
}
</script>

<style lang="scss">

</style>