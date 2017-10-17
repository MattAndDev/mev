<template>
  <div ref='home' class="home">
    <content-wrapper above="sm" until="md" >
      <heading type="h1" fake="p" content="Heading test"></heading>
      <icon icon-name="unicorn" classes="my_unicorn_icon"></icon>
      <img src="~@/assets/images/paint-wars.jpg" alt="">
    </content-wrapper>
  </div>
</template>
<script>

import Vue from 'vue'
import Settings from '@/inc/utils/settings'
import Icon from '@/vue/components/atoms/icon.vue'
import Heading from '@/vue/components/atoms/heading/heading.vue'
import ContentWrapper from '@/vue/components/atoms/content-wrapper.vue'
export default {
  name: 'home',
  components: {
    Icon,
    Heading,
    ContentWrapper
  },
  mounted () {
    console.log(this.$route);
  }
}
</script>


<style lang="sass">

</style>
