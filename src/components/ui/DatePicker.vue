<template>
  <div class="date_picker">
    <!-- // TODO slot으로 수정 -->
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
            <div class="header">{{ monthData }}</div>
            <div class="next" @click="next"><svg-next-arrow /></div>
          </div>
          <div class="week_row">
            <div v-for="(item, i) in weekMap" :key="`week_${i}`">
              {{ item }}
            </div>
          </div>
          <div class="date_rowNcol">
            <div v-for="(items, i) in formattedMonth" class="date_week_row" :key="`week__${i}`">
              <div
                v-for="(_item, _i) in items"
                class="date_date_cell"
                :class="today_pointer(_item)"
                :key="`day_${_i}`"
                @click="select(_item)"
              >
                {{ filteredFormattedMonth(_item) }}
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
    monthData() {
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
    },
    formattedDate: {
      get() {
        return this.date ? d3.timeFormat('%Y-%m-%d')(this.date) : ''
      },
      set(val) {
        if (val.length < 10 || isNaN(new Date(val)) || new Date(val) < 0) return
        this.date = new Date(val)
      }
    }
  },
  watch: {
    date: function(val) {
      // ! 예외 전부 파악하지 못함
      if (!val) return
      this.initDate()
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
      this.initMonthFormat()
      this.setRoughMonth()
      this.setFormattedMonth(this.datesOfMonth)
    }
  },
  created() {
    this.initDate()
    this.initMonthFormat()
    this.setRoughMonth()
    this.setFormattedMonth(this.datesOfMonth)
  },
  methods: {
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
    filteredFormattedMonth(item) {
      return item instanceof Date ? item.getDate() : null
    },
    getWeekNumOfMonth(date) {
      let day = date.getDate()

      //get weekend date
      day += date.getDay() == 0 ? 7 : 7 - date.getDay()

      return Math.ceil(parseFloat(day) / 7) - 1
    },
    prev() {
      this.firstDayOfMonth = new Date(this.firstDayOfMonth.getFullYear(), this.firstDayOfMonth.getMonth() - 1, 1)
    },
    next() {
      this.firstDayOfMonth = new Date(this.firstDayOfMonth.getFullYear(), this.firstDayOfMonth.getMonth() + 1, 1)
    },
    select(item) {
      this.$emit('input', item)
      this.date = item
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
        let w = this.getWeekNumOfMonth(date)
        let d = date.getDay()
        // console.log(`FILTER: (${w}, ${d}) | 2DEP: ${this.formattedMonth[w][d]}`)
        // * 1 STEP
        this.formattedMonth[w][d] = date
        // //* 2 STEP | 왜 안되는지 알아낸다.
        // this.formattedMonth.map(row => {
        // 	row.map(cell => (!(cell instanceof Date) ? null : date.getDate()))
        // })
      })
    },
    today_pointer(item) {
      if (typeof item === 'string') return
      let today = new Date()
      return {
        point:
          item.getFullYear() === today.getFullYear() &&
          item.getMonth() === today.getMonth() &&
          item.getDate() === today.getDate()
            ? true
            : false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.date_picker {
  display: flex;
  flex-direction: column;
  justify-content: center;
  input[type='text'] {
    height: 1rem;
  }
  &_modal_wrapper {
    // position: relative;
    // top: -1.3rem;
    // left: 11rem;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // z-index: 2;
  }
  &_modal {
    width: 16rem;
    height: 14rem;
    padding: 1rem;
    color: #000000;
    div.month_name {
      display: flex;
      justify-content: space-around;
      margin-bottom: 1rem;
    }
    div.week_row {
      display: flex;
      justify-content: space-between;
    }
    div.date_rowNcol {
      margin-bottom: 1rem;
      .date_week_row {
        display: flex;
        justify-content: space-between;
        .date_date_cell {
          width: calc(100% / 7);
          cursor: pointer;
          text-align: center;

          &.point {
            border: 1px solid #ff1232;
          }
        }
      }
    }
    div.buttons {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
