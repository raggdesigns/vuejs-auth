<template>
    <div>
        <router-view />
    </div>
</template>

<script>

export default {
  name: 'App',
  metaInfo: {
    titleTemplate: '%s'
  },
  components: {
  },
  data () {
    return {
      ready: false
    }
  }
}
</script>
<style lang="scss">
    @import '/assets/sass/style';
</style>
