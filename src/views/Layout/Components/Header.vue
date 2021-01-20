<template>
  <div id="header-wrap">
    <div class="pull-left">
      <div class="header-icons">
        <svg-icons iconClass="menu font22" iconName="menu"/>
      </div>
    </div>
    <div class="pull-right">
      <div class="photo pull-left"></div>
      <div class="user-info pull-left">
        管理员
      </div>
      <div class="header-icons pull-left">
        <svg-icons iconClass="power font20" iconName="power"/>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'Console'
}
</script>

<style lang="scss" scoped>
#header-wrap {
  position:fixed;
  left: 250px;
  right : 0;
  top: 0;
  height: 75px;
  background-color: #ffffff;
  -webkit-box-shadow:0 3px 16px 0 rgba(0,0,0,0.1);
  line-height: 75px;
  .header-icons {
    padding:0 30px;
    svg {
      margin-bottom: -5px;
      cursor: pointer;
    }
  }
  .photo {
    background-image: url('./user.jpg');
    width: 36px;
    height: 36px;
    border-radius: 18px;
    margin-top: 20px;
    margin-right: -12px;
  }
  .user-info {
    border-right: 1px solid #ededed;
    padding: 0 30px;
  }
}
</style>