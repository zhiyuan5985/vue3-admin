<template>
  <div id="main-wrap">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Console'
}
</script>

<style lang="scss">
@import 'styles/config.scss';
#main-wrap {
  position: fixed;
  left: $navMenu;
  top: 75px;
  right: 0;
  bottom: 0; 
  border: 30px solid #f7f7f7;
  border-right: none;
  border-bottom: none;
}
</style>