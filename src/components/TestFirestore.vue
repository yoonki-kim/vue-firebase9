<template>
  <v-card>
    <v-subheader>firestore</v-subheader>
    <v-card-text>
      <v-text-field v-model="title" />
      <v-text-field v-model="body" />
    </v-card-text>
    <v-card-actions>
      <v-btn @click="create">
        create
      </v-btn>
      <v-btn @click="read">
        read
      </v-btn>
      <v-switch
        v-model="auto"
        class="ml-2"
        label="auto"
        @change="onChange"
      />
    </v-card-actions>
    <v-list>
      <TestFirestoreItem
        v-for="snapshot in snapshots"
        :key="snapshot.id"
        :snapshot="snapshot"
      />
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore'
import { db } from '@/plugins/firebase'
import { Unsubscribe } from '@firebase/util'
import TestFirestoreItem from '@/components/TestFirestoreItem.vue'

const col = collection(db, 'articles')

  @Component({ components: { TestFirestoreItem } })
export default class TestFirestore extends Vue {
  title = ''
  body = ''
  auto = false
  unsubscribe: Unsubscribe | null = null
  snapshots: QueryDocumentSnapshot<DocumentData>[] = []

  async create () {
    try {
      const docRef = await addDoc(col, {
        title: this.title, body: this.body
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  async read () {
    const snapshot = await getDocs(col)
    this.snapshots = snapshot.docs
  }

  subscribe () {
    this.unsubscribe = onSnapshot(col, snapshot => {
      this.snapshots = snapshot.docs
    })
  }

  releaseSub () {
    this.snapshots = []
    if (this.unsubscribe) this.unsubscribe()
  }

  onChange (auto: boolean) {
    if (auto) {
      this.subscribe()
    } else {
      this.releaseSub()
    }
  }

  mounted () {
    console.log('mounted...')
    this.auto = true
    this.subscribe()
  }

  destroyed () {
    this.releaseSub()
  }
}
</script>

<style scoped>

</style>
