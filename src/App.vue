<template>
  <v-app>
    <v-app-bar app>
      test
      <v-spacer />
      <AuthBtn />
    </v-app-bar>
    <v-main>
      <v-container>
        <TestFirestore />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AuthBtn from '@/components/AuthBtn.vue'
import TestFirestore from '@/components/TestFirestore.vue'

  @Component({ components: { AuthBtn, TestFirestore } })
export default class App extends Vue {

}
</script>

<style scoped>

</style>
