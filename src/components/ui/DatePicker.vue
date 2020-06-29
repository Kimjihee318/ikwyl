<template>
  <div class="date_picker">
    <!-- 
      // * 인자로 이벤트를 넣을때 $event를 넣는다. 
      // * key가 눌러질 때는 key event, input박스안에 포인터 있을때 focus event, 포인터 뗏을땐 blur event
    -->
    <input v-if="inputType" v-model="stringDate" type="text" @click="init4Input" @blur="isBlurred = true" />
    <div class="date_picker_modal_wrapper">
      <div class="date_picker_modal">
        <div class="date_picker_modal_box">
          <div class="month_name">
            <div class="prev" @click="prev"><svg-prev-arrow /></div>
            <div class="header">{{ monthlyTitle }}</div>
            <div class="next" @click="next"><svg-next-arrow /></div>
          </div>
          <div class="week_row">
            <div class="week_cell" v-for="(item, i) in weekMap" :key="`week_${i}`">
              {{ item }}
            </div>
          </div>
          <div class="date_rowNcol">
            <div v-for="(items, i) in month" class="date_week_row" :key="`week__${i}`">
              <div
                v-for="(_item, _i) in items"
                class="date_date_cell"
                :class="cellStyle(_item)"
                :key="`day_${_i}`"
                @click="select(_item, [i, _i])"
              >
                {{ formatDate(_item.date) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import SvgPrevArrow from '@/assets/icons/arrow_back_ios-24px.svg'
import SvgNextArrow from '@/assets/icons/arrow_forward_ios-24px.svg'
export default {
  name: 'date-picker',
  components: {
    SvgPrevArrow,
    SvgNextArrow
  },
  props: {
    value: {
      type: Date
    },
    formOpend: {
      type: Boolean
    },
    inputType: {
      type: Boolean
    }
  },
  data: () => ({
    date: null,
    datesOfMonth: [],
    daysOfMonth: [],
    firstDayOfMonth: null,
    formattedMonth: [],
    isActive: false,
    isBlurred: false,
    monthMap: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    weekMap: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  }),
  computed: {
    month() {
      return this.formattedMonth
    },
    formattedDate: {
      get() {
        return this.date ? d3.timeFormat('%Y-%m-%d')(this.date) : ''
      },
      set(val) {
        if (val.length < 10 || isNaN(new Date(val)) || new Date(val) < 0) return
        this.date = new Date(val)
      }
    },
    monthlyTitle() {
      return `${this.firstDayOfMonth.getFullYear()}-${
        ('0' + (this.firstDayOfMonth.getMonth() + 1)).slice(-2)
        // 음수 인덱스는 배열의 끝에서부터의 길이를 나타냅니다. slice(-2) 는 배열에서 마지막 두 개의 엘리먼트를 추출합니다.
      }`
    },
    stringDate: {
      get() {
        return this.formattedDate
      },
      set(val) {
        // switch
        this.formattedDate = val
      }
    }
  },
  watch: {
    // formattedMonth: {
    //   handler(val) {
    //     if (!val || val.length === 0) return
    //     console.log(val)
    //   },
    //   deep: true
    // },
    date: function(val) {
      // ! 예외 전부 파악하지 못함
      if (!val) return
      // this.initDate()
    },
    // * 정체를 알아보자
    formOpend: function(val) {
      if (!val) return
      this.initDate()
      this.initMonthFormat()
    },
    // ! watch에서는 화살표 함수 사용하면 안된다. 화살표 함수가 부모 컨텍스트를 바인딩하기 때문에
    firstDayOfMonth: function() {
      // console.log(`WATCH: new: ${val}, old: ${old}`)
      this.set()
    }
  },
  created() {
    this.initDate()
    this.set()
  },
  methods: {
    cellStyle(item) {
      if (!item.date) return
      let today = new Date()
      let hasData = true
      // console.log('TEST noData', item.date, noData)
      return {
        today:
          item.date.getFullYear() === today.getFullYear() &&
          item.date.getMonth() === today.getMonth() &&
          item.date.getDate() === today.getDate()
            ? true
            : false,
        active: item.selected,
        has_data: hasData
      }
    },
    set() {
      this.initMonthFormat()
      this.setRoughMonth()
      this.setFormattedMonth(this.datesOfMonth)
      this.filterFormattedMonth()
    },
    filterFormattedMonth() {
      this.formattedMonth.forEach((d, i) => {
        d.forEach((_d, _i) => {
          if (typeof this.formattedMonth[i][_i] === 'string') {
            this.formattedMonth[i][_i] = { date: '', selected: '' }
          }
        })
      })
    },
    formatDate(item) {
      return item instanceof Date ? item.getDate() : null
    },
    getWeekNumOfMonth(date) {
      let day = date.getDate()

      //get weekend date
      day += date.getDay() == 0 ? 7 : 7 - date.getDay()

      return Math.ceil(parseFloat(day) / 7) - 1
    },
    init4Input() {
      this.isBlurred = false
      this.date = ''
    },
    initDate() {
      this.date = this.date ? this.date : new Date()
      this.firstDayOfMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1)
    },
    initMonthFormat() {
      let daysOfWeek = 7
      let weeksOfMonth = 6
      let weeksOfMonthForm = Array.from({ length: weeksOfMonth }, () => null)

      // TODO https://stackoverflow.com/questions/12482961/is-it-possible-to-change-values-of-the-array-when-doing-foreach-in-javascript
      this.formattedMonth = weeksOfMonthForm.map((_d, _i) =>
        Array.from({ length: daysOfWeek }, (__d, __i) => `week_${_i}__day_${__i}`)
      )
    },
    initSelected() {
      this.formattedMonth.forEach((d, i) => {
        d.forEach((_d, _i) => {
          this.formattedMonth[i][_i].selected = false
        })
      })
    },
    next() {
      this.firstDayOfMonth = new Date(this.firstDayOfMonth.getFullYear(), this.firstDayOfMonth.getMonth() + 1, 1)
    },
    prev() {
      this.firstDayOfMonth = new Date(this.firstDayOfMonth.getFullYear(), this.firstDayOfMonth.getMonth() - 1, 1)
    },
    select(item, idx) {
      if (item.date === '') return
      this.initSelected()
      this.formattedMonth[idx[0]][idx[1]].selected = !this.formattedMonth[idx[0]][idx[1]].selected
      this.$emit('input', item.date)
      this.date = item.date
    },
    setRoughMonth() {
      let firstDay = this.firstDayOfMonth
      let lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0)
      let diff = Math.abs(lastDay - firstDay)
      this.daysOfMonth = parseInt(Math.floor(diff / (24 * 60 * 60 * 1000))) + 1 // add first day

      this.datesOfMonth = Array.from(
        { length: this.daysOfMonth },
        (d, i) => new Date(firstDay.getFullYear(), firstDay.getMonth(), 1 + i)
      )
    },
    setFormattedMonth(monthArr) {
      monthArr.forEach(date => {
        let row = this.getWeekNumOfMonth(date)
        let col = date.getDay()
        const newRow = this.formattedMonth[row].slice(0)
        newRow[col] = { date: date, selected: false }

        this.$set(this.formattedMonth, row, newRow)
        // * Set 사용법 참고
        // https://stackoverflow.com/questions/45644781/update-value-in-multidimensional-array-in-vue
        // * 2 STEP | 왜 안되는지 알아낸다.
        // this.formattedMonth.map(row => {
        // 	row.map(cell => (!(cell instanceof Date) ? null : date.getDate()))
        // })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/ui/_datePicker.scss';
</style>
