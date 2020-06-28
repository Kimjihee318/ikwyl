<template>
  <div class="form_sh">
    <div class="form_sh_contents">
      <div class="wrap__date_picker">
        <date-picker v-model="date" :inputType="false" />
      </div>
      <div class="wrap__board">
        <div class="form_sh_contents_card_wrapper type_today">
          <div class="title">간접 흡연 감지량 기록 하기</div>
          <div class="form_sh_contents_card type_today">
            <div class="form_sh_contents_card_contents">
              <div class="header_time">{{ formattedDate }}</div>
              <div class="input_type_between">
                <label
                  >간접 흡연 감지량<span class="icon color_white"
                    ><icon-help title="간접 흡연의 정도를 1부터 10 사이의 숫자로 기록합니다."/></span
                ></label>
                <input v-model="quantity" max="10" type="number" />
              </div>
            </div>
            <button class="form_sh_contents_card_button" @click="onUpload('add')">Upload</button>
          </div>
        </div>
        <div class="form_sh_contents_card_wrapper type_board">
          <div class="title">{{ selectedDate }}</div>
          <div v-if="hasNoData" class="msg_no_data">
            데이터가 입력되지 않았습니다.
          </div>
          <div v-for="(item, i) in selectedDateItems" class="form_sh_contents_card type_board" :key="`daily_sh_${i}`">
            <div class="form_sh_contents_card_contents">
              <div>{{ timeFormat(item.date) }}</div>
              <div v-if="mode === 'READ'" class="input_type_between">
                <label>간접 흡연 감지량</label>
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
import IconHelp from '@/assets/icons/help-24px.svg'

export default {
  name: 'form-sh-smoke',
  components: {
    DatePicker,
    IconHelp
  },
  data: () => ({
    date: new Date(),
    mode: __C.FORM.EDIT_MODE_READ,
    quantity: 0,
    blockTimeWidth: null,
    selectedDateItems: null
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['user', 'email']),
    ...mapState(__C.STORE.NAMESPACE.REPORT, ['dailySHS']),
    hasNoData() {
      return !this.selectedDateItems || this.selectedDateItems.length === 0 ? true : false
    },
    formattedDate() {
      return d3.timeFormat('%Y년 %m월 %d일')(this.date)
      // return d3.timeFormat('%Y년 %m월 %d일 %H:%M %p')(this.date)
    },
    selectedDate() {
      return d3.timeFormat('%Y년 %m월 %d일')(this.date)
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

      this.selectedDateItems = this.dailySHS[selectedKey] ? this.dailySHS[selectedKey] : []
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
@import '@/assets/style/ui/_formTodaySmoke.scss';
</style>
