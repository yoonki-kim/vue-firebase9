<template>
  <div>
    <v-btn
      v-if="!user"
      icon
      @click="signIn"
    >
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn
      v-else
      @click="logOut"
    >
      <v-icon>mdi-logout</v-icon>{{ user.displayName }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { auth } from '@/plugins/firebase'

const provider = new GoogleAuthProvider()

  @Component
export default class AuthBtn extends Vue {
  user: User | null = null

  signIn () {
    signInWithPopup(auth, provider)
  }

  logOut () {
    signOut(auth)
  }

  mounted () {
    this.init()
  }

  init () {
    onAuthStateChanged(auth, user => {
      console.log(user)
      this.user = user
    })
  }
}
</script>

<style scoped>

</style>
