<template>
  <div>
    <h3>User Information Board</h3>
    <button @click="onAdd">Add</button>
    <ui-modal v-if="modalOpened" v-model="modalOpened" :width="300" :height="300">
      <template #slot_title>User</template>
      <template #slot_contents>
        <div><label>user</label><input v-model="shsData.user" type="text" /></div>
        <div><label>user email</label><input v-model="shsData.useremail" type="text" /></div>
        <div><label>date</label><input v-model="shsData.date" type="text" /></div>
        <div><label>quantity</label><input v-model="shsData.quantity" type="number" /></div>
        <button @click="onAction('ADD')">Upload</button>
      </template>
    </ui-modal>
    <table class="system_shs_table">
      <tr>
        <th v-for="(item, i) in table.headers" :key="`system_shs_header_${i}`">{{ item.title }}</th>
      </tr>
      <tr v-for="(row, i) in userInfoList" :key="`system_shs_tr_${i}`">
        <td v-for="(_item, _i) in row" :key="`system_shs_td_${_i}`">{{ _item }}</td>
        <td><button>Delete</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import __C from '@/primitives/_constants_'
import UiModal from '@/components/ui/Modal.vue'

export default {
  name: 'system-shs-table',
  components: { UiModal },
  data: () => ({
    modalOpened: false,
    table: {
      headers: [
        { title: 'ID' },
        { title: 'User' },
        { title: 'Email' },
        { title: 'Address' },
        { title: 'Builing Name' },
        { title: 'Builing No' },
        { title: 'Floor' },
        { title: 'Unit' },
        { title: 'Max Floor' }
      ]
    },
    shsData: {
      user: null,
      useremail: null,
      date: null,
      quantity: null
    }
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.SYSTEM, ['userInfoList'])
  },
  mounted() {
    this.getUserInfoListFromServer()
  },
  methods: {
    ...mapActions(__C.STORE.NAMESPACE.SYSTEM, ['addUserInfo2Server', 'getUserInfoListFromServer']),
    onAdd() {
      this.modalOpened = true
    },
    onAction(mod) {
      switch (mod) {
        case __C.BUTTON.EDIT_MODE_ADD:
          this.mode = __C.FORM.EDIT_MODE_READ
          this.addUserInfo()
          break
        case __C.FORM.EDIT_MODE_MOD:
          this.mode = __C.FORM.EDIT_MODE_MOD
          break
        case __C.BUTTON.EDIT_MODE_EDIT:
          this.upSHS2Server()
          this.mode = __C.FORM.EDIT_MODE_READ
          break
        case __C.BUTTON.EDIT_MODE_DEL:
          break
      }
    },
    addUserInfo() {
      let data = JSON.parse(JSON.stringify(this.shsData))
      this.addUserInfo2Server(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.system_shs_table {
  width: 60rem;
}
</style>
