<template>
  <div ref='app' class="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  mounted () {
    console.log('erere');
    console.log(this.$route);

  }
}
</script>
