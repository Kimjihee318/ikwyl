<template>
  <div class="wrap__residence">
    <h3>Residence info</h3>
    <div class="wrap__tables">
      <div class="wrap__building_name">
        <div>Building Name</div>
        <table class="system_builing_name_table">
          <tr>
            <th v-for="(item, i) in table.headers" :key="`system_name_header_${i}`">{{ item.title }}</th>
          </tr>
          <tr v-for="(row, i) in buidingNames" :key="`system_name_tr_${i}`">
            <td v-for="(_item, _i) in row" :key="`system_name_td_${_i}`">{{ _item }}</td>
            <td>
              {{ row.id }}
              <icon-delete class="icon" @click="onRemove('name', row.id)" />
            </td>
          </tr>
        </table>
      </div>
      <div class="wrap__building_no">
        <div>Building No</div>
        <table class="system_builing_no_table">
          <tr>
            <th v-for="(item, i) in table.headers" :key="`system_no_header_${i}`">{{ item.title }}</th>
          </tr>
          <tr v-for="(row, i) in buidingNums" :key="`system_no_tr_${i}`">
            <td v-for="(_item, _i) in row" :key="`system_no_td_${_i}`">{{ _item }}</td>
            <td>
              {{ row.id }}
              <icon-delete class="icon" @click="onRemove('no', row.id)" />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import __C from '@/primitives/_constants_'
import IconDelete from '@/assets/icons/delete_forever-24px.svg'

export default {
  name: 'system-residence-info-table',
  components: { IconDelete },
  data: () => ({
    table: {
      headers: [{ title: 'id' }, { title: 'title' }, { title: 'value' }]
    }
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['buidingNames', 'buidingNums'])
  },
  mounted() {
    this.getBuildingNamesFromserver()
    this.getBuildingNoFromserver()
  },
  methods: {
    ...mapActions(__C.STORE.NAMESPACE.ACCOUNT, [
      'getBuildingNamesFromserver',
      'getBuildingNoFromserver',
      'delBuildingNames2Server',
      'delBuildingNums2Server'
    ]),
    onRemove(type, id) {
      if (type === 'name') {
        this.delBuildingNames2Server(id)
      } else {
        this.delBuildingNums2Server(id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap__residence {
  padding: 1rem;
}
.wrap__tables {
  display: flex;
  justify-content: space-between;
  width: 50rem;
}
.icon {
  fill: $blue_lightest;
}
</style>
