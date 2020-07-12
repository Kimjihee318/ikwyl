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
                  >간접 흡연 감지량<span class="icon color_white has_tooltip"
                    ><icon-help class="icon_help" :class="{ warning: isDisabled }"/></span
                ></label>
                <input v-model="quantity" max="10" type="number" />
              </div>
            </div>
            <button
              class="form_sh_contents_card_button"
              :disabled="modeDate === 'FUTURE' || isDisabled"
              @click="onUpload('add')"
            >
              Upload
            </button>
          </div>
        </div>
        <div class="form_sh_contents_card_wrapper type_board">
          <div class="title">{{ selectedDate }}</div>
          <div v-if="hasNoData && modeDate !== 'FUTURE'" class="msg_no_data">
            데이터가 입력되지 않았습니다.
          </div>
          <div v-if="modeDate === 'FUTURE'" class="msg_no_data">
            오늘 이후의 데이터는 입력할 수 없습니다.
          </div>
          <div v-for="(item, i) in selectedDateItems" class="form_sh_contents_card type_board" :key="`daily_sh_${i}`">
            <div class="form_sh_contents_card_contents">
              <div>{{ timeFormat(item.date) }}</div>
              <div class="input_type_between">
                <label>간접 흡연 감지량</label>
                <input
                  v-if="mode === 'MOD' && i === selected4EditIdx"
                  max="10"
                  type="number"
                  :value="item.quantity"
                  @input="
                    e => {
                      updateAttr(item.formateddate, i, 'quantity', e.target.value)
                    }
                  "
                />
                <span v-else>{{ item.quantity }}</span>
                <!-- //? STUDY -->
                <!-- // * v-for안에서 v-model 사용할때 @input="@ => {}" 사용 -->
                <!-- <input v-else v-model="item.quantity" max="10" type="number" /> -->
              </div>
            </div>
            <div class="form_sh_contents_card_buttons">
              <button v-if="mode === 'READ' || (mode === 'MOD' && i !== selected4EditIdx)" @click="onEdit(i)">
                Edit
              </button>
              <button
                v-else-if="mode === 'MOD' && i === selected4EditIdx"
                @click="onUpload('edit', { key: item.formateddate, idx: i })"
              >
                Upload
              </button>
              <button @click="onUpload('del', { key: item.formateddate, idx: i })">Delete</button>
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
import __F from '@/primitives/_function_'
import DatePicker from '@/components/ui/DatePicker.vue'
import IconHelp from '@/assets/icons/help-24px.svg'

export default {
  name: 'form-sh-smoke',
  components: {
    DatePicker,
    IconHelp
  },
  data: () => ({
    blockTimeWidth: null,
    date: new Date(),
    isValid: true,
    isDisabled: false,
    mode: __C.FORM.EDIT_MODE_READ,
    modeDate: '',
    quantity: 0,
    selectedDateItems: null,
    selected4EditIdx: null
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
    // setSelectedDateSHS() {
    //   Object.keys(this.dailySHS).forEach(d => {
    //   })
    //   return this.dailySHS
    // }
  },

  watch: {
    date: {
      handler(val) {
        this.setSelectedDateSHS()
        if (val.getTime() > new Date().getTime()) {
          this.modeDate = 'FUTURE'
        }
      },
      deep: true
    },
    dailySHS: {
      handler(val) {
        if (!val || val.length === 0) return
        this.setSelectedDateSHS()
      },
      deep: true
    },
    quantity: {
      handler(val) {
        if (val > 11 || val <= -1) {
          this.isValid = false
          this.isDisabled = true
        } else {
          this.isValid = true
          this.isDisabled = false
        }
      },
      deep: true
    }
  },
  mounted() {
    this.init()
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
    init() {
      this.date = new Date()
    },
    onEdit(idx) {
      this.mode = __C.FORM.EDIT_MODE_MOD
      this.selected4EditIdx = idx
    },
    onUpload(mod, payload) {
      // upload logic
      switch (mod) {
        case 'add':
          this.putReport()
          break
        case 'edit':
          this.mode = __C.FORM.EDIT_MODE_READ
          this.upReport(payload)
          break
        case 'del':
          this.delReport(payload)
          break
      }
    },
    setSelectedDateSHS() {
      let selectedKey = Object.keys(this.dailySHS).filter(d => __F.isSelectedDate(new Date(d), this.date))
      this.selectedDateItems = this.dailySHS[selectedKey] ? this.dailySHS[selectedKey] : []
    },
    timeFormat(item) {
      return d3.timeFormat('%Y년 %m월 %d일 %H:%M %p')(item)
    },
    updateAttr(key, idx, prop, val) {
      let updata = { key: key.toString(), idx: idx, property: prop, value: parseFloat(val) }
      this.setDailySHSItem(updata)
    },
    async putReport() {
      if (this.date.getTime() > new Date()) {
        this.modeDate = 'FUTURE'
        return
      }
      let data = {
        user: this.user,
        useremail: this.email,
        date: this.date,
        quantity: parseFloat(this.quantity)
      }
      let res = await this.putReport2Server(data)
      if (res) this.getReportFromServer()
    },
    async upReport(payload) {
      let res = await this.upReport2Server(payload)
      if (res) this.getReportFromServer()
    },
    async delReport(payload) {
      let res = await this.delReport2Server(payload)
      if (res) this.getReportFromServer()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/ui/_formTodaySmoke.scss';
</style>
