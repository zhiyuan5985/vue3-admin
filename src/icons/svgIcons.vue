<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="svgName"></use>
  </svg>
</template>
<script>
import { ref, computed } from '@vue/composition-api'
export default {
  name: "svgIcons",
  props: {
    iconClass: {
      type: String,
      default: ''
    },
    iconName: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const svgName = computed(() => `#icon-${props.iconName}`);
    const svgClass = computed(() => {
      if (props.iconClass) {
        return `svg-icon ${props.iconClass}`
      } else {
        return `svg-icon`
      }
    })
    return {
      svgName,
      svgClass
    } 
  }
}
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  &.font15 {
    font-size: 15px;
  }
  &.font22 {
    font-size: 24px;
  }
  &.font20 {
    font-size: 20px;
  }
  &.font50 {
    font-size: 50px;
  }
  &.nav {
    fill: currentColor;
    color: #ffffff;
  }
}
</style>