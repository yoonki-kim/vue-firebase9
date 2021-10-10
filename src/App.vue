<template>
  <v-app>
    <v-app-bar app>
      test
      <v-spacer />
      <AuthBtn />
    </v-app-bar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AuthBtn from '@/components/AuthBtn.vue'

  @Component({ components: { AuthBtn } })
export default class App extends Vue {

}
</script>

<style scoped>

</style>
