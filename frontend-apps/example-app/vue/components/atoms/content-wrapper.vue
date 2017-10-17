<!--
  Content wrapper atom component
  //
  serves as general purpose wrapper
  //
  classes: String
  content: String (you can pipe html)
  fake: String one-of ['p', 'span']
  type: String one-of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
 -->

 <template>
   <div :class="'content-wrapper'+ classes + modifiers">
    <slot></slot>
  </div>
 </template>


<script>
export default {
  name: 'content-wrapper',
  props: {
    classes: {
      type: String, default: ' '
    },
    until: {
      type: [String, Boolean], default: false
    },
    above: {
      type: [String, Boolean], default: false
    }
  },
  data () {
    return {
      modifiers: String
    }
  },
  mounted () {
    let modifiers = []
    if (this.until) {
      modifiers.push(`until-${this.until}`)
    }
    if (this.above) {
      modifiers.push(`above-${this.above}`)
    }
    this.modifiers = modifiers.toString().replace(',', ' ')
  }

}
</script>

<style lang="sass">
</style>
