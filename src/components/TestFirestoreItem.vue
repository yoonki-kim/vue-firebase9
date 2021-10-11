<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
      <v-list-item-subtitle>{{ item.body }}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-menu
        v-model="menu"
        offset-y
        :close-on-content-click="false"
      >
        <template v-slot:activator="{on}">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <v-text-field v-model="title" />
            <v-text-field v-model="body" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="update">
              update
            </v-btn>
            <v-btn @click="remove">
              delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import {
  QueryDocumentSnapshot,
  DocumentData,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'
import { db } from '@/plugins/firebase'

  @Component
export default class TestFirestoreItem extends Vue {
  @Prop({ type: Object, required: true }) snapshot!: QueryDocumentSnapshot<DocumentData>
  title = this.item.title
  body = this.item.body
  menu = false

  get item () {
    return this.snapshot.data()
  }

  get ref () {
    return doc(db, 'articles', this.snapshot.id)
  }

  update () {
    const c = { title: this.title, body: this.body }
    updateDoc(this.ref, c)
    this.menu = false
  }

  remove () {
    deleteDoc(this.ref)
  }
}
</script>

<style scoped>

</style>
