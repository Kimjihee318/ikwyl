<template>
  <div class="form_sh">
    <div class="form_sh_contents">
      <div class="date_picker_wrapper">
        <date-picker v-model="date" :inputType="false" />
      </div>
      <div class="board_wrapper">
        <div class="form_sh_contents_card_wrapper type_today">
          <div class="form_sh_contents_card type_today">
            <div class="form_sh_contents_card_contents">
              <div class="time">{{ stringDate }}</div>
              <div class="input_type_between">
                <label>간접 흡연 정도</label>
                <input v-model="quantity" type="number" />
              </div>
            </div>
            <button class="form_sh_contents_card_button" @click="onUpload('add')">Upload</button>
          </div>
        </div>
        <div class="form_sh_contents_card_wrapper type_board">
          <div v-for="(item, i) in selectedDates" class="form_sh_contents_card" :key="`daily_sh_${i}`">
            <div class="form_sh_contents_card_contents">
              <div>{{ timeFormat(item.date) }}</div>
              <div v-if="mode === 'READ'" class="input_type_between">
                <label>간접 흡연 정도</label>
                <span>{{ item.quantity }}</span>
              </div>
              <input
                v-else-if="mode === 'MOD'"
                :value="item.quantity"
                @input="
                  e => {
                    updateAttr(i, 'quantity', e.target.value)
                  }
                "
                type="number"
              />
            </div>
            <div class="form_sh_contents_card_buttons">
              <button v-if="mode === 'READ'" @click="onEdit()">Edit</button>
              <button v-if="mode === 'MOD'" @click="onUpload('edit')">Upload</button>
              <button @click="onDelte('delete')">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { mapState, mapActions, mapMutations } from 'vuex'
import __C from '@/primitives/_constants_'
import DatePicker from '@/components/ui/DatePicker.vue'
export default {
  name: 'form-sh-smoke',
  components: {
    DatePicker
  },
  data: () => ({
    date: new Date(),
    mode: __C.FORM.EDIT_MODE_READ,
    quantity: 0,
    blockTimeWidth: null,
    selectedDates: null
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['user', 'email']),
    ...mapState(__C.STORE.NAMESPACE.REPORT, ['dailySHS']),
    stringDate() {
      return d3.timeFormat('%Y년 %m월 %d일 %H:%M %p')(this.date)
    }
    // selectedDateSHS() {
    //   console.log(`[DATA]`, this.dailySHS)
    //   Object.keys(this.dailySHS).forEach(d => {
    //     console.log(`[FOREACH PARAMETER]`, d)
    //     console.log(this.date.getTime() - d.getTime() < 86400)
    //   })
    //   return this.dailySHS
    // }
  },
  watch: {
    date: function() {
      this.selectedDateSHS()
    },
    dailySHS: function() {
      this.selectedDateSHS()
    }
  },
  mounted() {
    this.getReportFromServer()
    // this.getBlockRectWidth()
  },
  methods: {
    ...mapMutations(__C.STORE.NAMESPACE.REPORT, ['setDailySHSItem']),
    ...mapActions(__C.STORE.NAMESPACE.REPORT, [
      'getReportFromServer',
      'putReport2Server',
      'upReport2Server',
      'delReport2Server'
    ]),
    getBlockRectWidth() {
      this.blockTimeWidth = document.querySelector('.time').getClientRects()[0].width
    },
    onUpload(mod) {
      // upload logic
      switch (mod) {
        case 'add':
          this.putReport()
          break
        case 'edit':
          this.upReport()
          break
        case 'del':
          this.delReport()
          break
      }
    },
    selectedDateSHS() {
      let selectedKey = Object.keys(this.dailySHS).filter(
        d =>
          (this.date.getTime() - new Date(d).getTime()) / (60 * 60 * 1000) < 24 &&
          (this.date.getTime() - new Date(d).getTime()) / (60 * 60 * 1000) >= 0
      )
      // console.log(selectedKey)
      this.selectedDates = this.dailySHS[selectedKey]
    },
    timeFormat(item) {
      return d3.timeFormat('%Y년 %m월 %d일 %H:%M %p')(item)
    },
    updateAttr(i, prop, val) {
      let updata = { idx: i, property: prop, value: parseFloat(val) }
      this.setDailySHSItem(updata)
    },
    async putReport() {
      let data = {
        user: this.user,
        useremail: this.email,
        date: this.date,
        quantity: parseFloat(this.quantity)
      }
      await this.putReport2Server(data)
    },
    async upReport() {
      let data = {
        date: this.date,
        quantity: parseFloat(this.quantity)
      }
      await this.putReport2Server(data)
    },
    async delReport() {
      let id
      // * ADD ID VALUE
      await this.putReport2Server(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.form_sh {
  color: #000000;
  button {
    border: 1px solid #ddd;
    padding: 0.5rem;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
  }
  &_contents {
    .board_wrapper {
      display: flex;
      justify-content: space-between;
    }
    .date_picker_wrapper {
      display: flex;
      justify-content: center;
    }
    &_card {
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 7rem;
      justify-content: center;
      &_buttons {
        display: flex;
        justify-content: space-around;
        width: 100%;
      }
      &_contents {
        margin-bottom: 1rem;
        > div {
          margin-bottom: 0.4rem;
        }
        > .input_type_between {
          display: flex;
          justify-content: space-between;

          input {
            width: 4rem;
          }
        }
      }
      &.type_today {
        align-items: center;
        border: 1px solid #ddd;
        display: flex;
        flex-direction: column;
        height: 10rem;
        justify-content: space-around;
        padding: 1rem;
      }
    }
    &_card_wrapper {
      width: 50%;
      &.type_board {
        height: 14rem;
        overflow-y: scroll;
      }
      &.type_today {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
}
</style>
