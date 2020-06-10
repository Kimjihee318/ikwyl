<template>
  <div class="form_sh">
    <div class="form_sh_contents">
      <date-picker v-model="Cdate" />
      <div>
        <input v-model="Cquantity" type="number" />
      </div>
    </div>
    <div class="form_sh_buttons">
      <button @click="onUpload('add')">Add</button>
      <button @click="onUpload('edit')">Edit</button>
      <button @click="onUpload('delete')">Delete</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import __C from '@/primitives/_constants_'
import DatePicker from '@/components/ui/DatePicker.vue'
export default {
  name: 'form-sh-smoke',
  components: {
    DatePicker
  },
  data: () => ({
    date: null,
    quantity: 0
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['user']),
    // ! FIX COMPUTED NAME
    Cdate: {
      get() {
        return this.date || new Date()
      },
      set(val) {
        this.date = val
      }
    },
    Cquantity: {
      get() {
        return this.quantity
      },
      set(val) {
        this.quantity = val
      }
    }
  },
  methods: {
    async put2TodayReport() {
      // let date = {
      //   user: this.user,
      //   date: this.date,
      //   quantity: this.quantity
      // }
    },
    onUpload() {
      // upload logic
      this.put2TodayReport()
    },
    putUpload() {}
  }
}
</script>

<style lang="scss" scoped>
.form_sh {
  &_contents {
    display: flex;
    justify-content: space-around;
  }

  &_buttons {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
}
</style>
