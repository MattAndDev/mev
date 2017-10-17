<template>
  <svg ref="icon" :viewBox="this.icon.viewBox" :class="'icon ' + classes" >
    <use :xlink:href="'#' + this.icon.id"></use>
  </svg>
</template>

<script>
export default {
  name: 'icon',
  data () {
    return {
      icon: Object
    }
  },
  props: {
    classes: {
      type: String, default: ''
    },
    guessSize: {
      type: Boolean, default: true
    },
    iconName: {
      type: String, required: true
    }
  },
  mounted () {
    this.icon = require(`@/assets/svg-icons/${this.iconName}.svg`).default
    if (this.guessSize) {
      let viewBoxArray = this.icon.viewBox.split(' ')
      this.$refs.icon.style.width = `${viewBoxArray[2]}px`
      this.$refs.icon.style.height = `${viewBoxArray[3]}px`
    }
  }
}
</script>

<style lang="sass">
.icon
  width: 50px
  height: 50px
  vertical-align: middle
</style>
