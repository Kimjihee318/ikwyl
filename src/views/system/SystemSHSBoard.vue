<template>
  <div>
    <h3>Daily Second Hand Smoking Board</h3>
    <div @click="onAdd"><icon-add /></div>
    <ui-modal v-if="modalOpened" v-model="modalOpened" :width="1000" :height="500">
      <template #slot_title>Today Second Hand Smoking Upload</template>
      <template #slot_contents>
        <template>
          <div class="tab_wrapper">
            <div class="tab" :class="{ active: addMode === 'ROW' }" @click="onAddAction('ROW')">Add a Row</div>
            <div class="tab" :class="{ active: addMode === 'LIST' }" @click="onAddAction('LIST')">Add List</div>
          </div>
        </template>
        <template v-if="addMode === 'ROW'">
          <div><label>user</label><input v-model="shsData.user" type="text" /></div>
          <div><label>user email</label><input v-model="shsData.useremail" type="text" /></div>
          <div><label>date</label><input v-model="shsData.date" type="text" /></div>
          <div><label>quantity</label><input v-model="shsData.quantity" type="number" /></div>
          <button @click="onAction('ADD')">Upload</button>
        </template>
        <template v-if="addMode === 'LIST'">
          <table>
            <tr>
              <td v-for="(item, i) in addListTableHeader" :key="`sys_add_list_table_header_${i}`">{{ item.title }}</td>
            </tr>
            <tr v-for="(item, i) in addListData" :key="`system_userinfo_add_${i}`">
              <td>
                {{ item.user }}
              </td>
              <td>
                {{ item.useremail }}
              </td>
              <td>
                {{ setAddListTimeFormat(item.date) }}
              </td>
              <td>
                <input v-model="item.quantity" type="number" />
              </td>
            </tr>
          </table>

          <button @click="onAction('ADD_LIST')">Upload</button>
        </template>
      </template>
    </ui-modal>
    <table class="system_shs_table">
      <tr>
        <th v-for="(item, i) in table.headers" :key="`system_shs_header_${i}`">{{ item.title }}</th>
      </tr>
      <tr v-for="(row, i) in dailySHS" :key="`system_shs_tr_${i}`">
        <td v-for="(_item, _i) in row" :key="`system_shs_td_${_i}`">{{ _item }}</td>
        <td>
          <icon-delete />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { mapState, mapActions } from 'vuex'
import __C from '@/primitives/_constants_'
import IconAdd from '@/assets/icons/add_circle-24px.svg'
import IconDelete from '@/assets/icons/delete_forever-24px.svg'
import UiModal from '@/components/ui/Modal.vue'

export default {
  name: 'system-shs-table',
  components: { IconAdd, IconDelete, UiModal },
  data: () => ({
    addMode: 'ROW',
    addListData: [],
    localUserInfo: [],
    modalOpened: false,
    shsData: {
      user: null,
      useremail: null,
      date: null,
      quantity: null
    },
    shsListData: {},
    table: {
      headers: [
        { title: 'ID' },
        { title: 'User' },
        { title: 'Email' },
        { title: 'Time' },
        { title: 'Degree' },
        { title: 'Delete' }
      ]
    }
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.SYSTEM, ['dailySHS', 'userInfo']),
    addListTableHeader() {
      return this.table.headers.slice(1, -1)
    }
  },
  mounted() {
    this.getSHSFromServer()
  },
  methods: {
    ...mapActions(__C.STORE.NAMESPACE.SYSTEM, [
      'addSHSList2Server',
      'getSHSFromServer',
      'addSHS2Server',
      'getUserInfoFromServer'
    ]),
    addSHS() {
      let data = JSON.parse(JSON.stringify(this.shsData))
      this.addSHS2Server(data)
    },
    addSHSLIST() {
      let data = JSON.parse(JSON.stringify(this.addListData))
      data.forEach(d => (d.quantity = parseFloat(d.quantity)))

      this.addSHSList2Server(data)
    },
    onAction(mod) {
      switch (mod) {
        case __C.BUTTON.EDIT_MODE_ADD:
          this.addSHS()
          break
        case __C.BUTTON.EDIT_MODE_ADD_LIST:
          this.addSHSLIST()
          break
        case __C.FORM.EDIT_MODE_MOD:
          this.mode = __C.FORM.EDIT_MODE_MOD
          break
        case __C.BUTTON.EDIT_MODE_EDIT:
          this.upSystem2Server()
          this.mode = __C.FORM.EDIT_MODE_READ
          break
        case __C.BUTTON.EDIT_MODE_DEL:
          console.log('DELETE')
          break
      }
    },
    onAdd() {
      this.modalOpened = true
    },
    setSHSListData() {
      this.localUserInfo = JSON.parse(JSON.stringify(this.userInfo))
      this.addListData = this.localUserInfo.map(d => ({
        user: d.user,
        useremail: d.useremail,
        quantity: 0,
        date: new Date()
      }))
    },
    setAddListTimeFormat(item) {
      return d3.timeFormat('%Y년 %m월 %d일 %H:%M %p')(item)
    },
    async onAddAction(mod) {
      this.addMode = mod
      if (mod !== __C.ACTION.ADD_MODE_LIST) return
      await this.getUserInfoFromServer()
      this.setSHSListData()
    }
  }
}
</script>

<style lang="scss" scoped>
.system_shs_table {
  width: 60rem;
}
.tab {
  &_wrapper {
    display: flex;
  }
  &.active {
    background-color: #000000;
  }
}
</style>
