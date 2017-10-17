<!--
  Heading atom component
  //
  manages all level of heading and offers the following props
  //
  classes: String
  content: String (you can pipe html)
  fake: String one-of ['p', 'span']
  type: String one-of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
 -->

 <template>
   <p v-if="fake === 'p'" :class="'heading-'+type + ' ' + classes" v-html="content"></p>
   <span v-else-if="fake === 'span'" :class="'heading-'+type + ' ' + classes" v-html="content"></span>
   <h1 v-else-if="type === 'h1'" :class="'heading-h1 ' + classes" v-html="content"></h1>
   <h2 v-else-if="type === 'h2'" :class="'heading-h2' + classes" v-html="content"></h2>
   <h3 v-else-if="type === 'h3'" :class="'heading-h3 ' + classes" v-html="content"></h3>
   <h4 v-else-if="type === 'h4'" :class="'heading-h4 ' + classes" v-html="content"></h4>
   <h5 v-else-if="type === 'h5'" :class="'heading-h5 ' + classes" v-html="content"></h5>
   <h6 v-else-if="type === 'h6'" :class="'heading-h6 ' + classes" v-html="content"></h6>
 </template>


<script>
export default {
  name: 'heading',
  props: {
    classes: {
      type: String, default: ''
    },
    content: {
      type: String, default: ''
    },
    fake: {
      type: [String, Boolean], default: false
    },
    type: {
      type: String, required: true
    }
  }
}
</script>

<style lang="sass">
// configuration file with scss map
@import "./_heading-vars.scss"
// ixin to generate the styles
@import "./_heading-builder.sass"
// ship it
@include heading-builder($headings)
</style>
