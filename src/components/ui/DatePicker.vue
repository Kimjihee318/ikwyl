<template>
  <div class="date_picker">
    <!-- // TODO slot으로 수정 -->
    <!-- 
      // * 인자로 이벤트를 넣을때 $event를 넣는다. 
      // * key가 눌러질 때는 key event, input박스안에 포인터 있을때 focus event, 포인터 뗏을땐 blur event
    -->
    <input v-model="date" type="text" @focus="onOpen()" />
    <div v-if="dateModalOpend" class="date_picker_modal_wrapper">
      <div class="date_picker_modal">
        <div class="date_picker_modal_box">
          <div class="month">
            <button class="prev" @click="prev">{{ '>' }}</button>
            <div class="header">{{ monthData }}</div>
            <button class="next" @click="next">{{ '>' }}></button>
          </div>
          <div class="week">
            <div v-for="(date, i) in weekMap" :key="`week_${i}`">
              {{ date }}
            </div>
          </div>
          <div class="date">
            <div v-for="(items, i) in formattedMonth" class="date_week_row" :key="`week__${i}`">
              <div v-for="(_item, _i) in items" class="date_date_cell" :key="`day_${_i}`" @click="select(_item)">
                {{ filteredFormattedMonth(_item) }}
              </div>
            </div>
          </div>
          <div class="buttons">
            <button @click="onClose">close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'date-picker',
  props: {
    formOpend: {
      type: Boolean
    }
  },
  data: () => ({
    date: null,
    firstDayOfMonth: null,
    datesOfMonth: [],
    daysOfMonth: [],
    formattedMonth: [],
    dateModalOpend: false,
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
    }
  },
  watch: {
    formOpend: val => {
      console.log(val)
      if (!val) return
      this.initDate()
      this.initMonthFormat()
    },
    // *watch에서는 화살표 함수 사용하면 안된다.
    firstDayOfMonth: function() {
      // console.log(`WATCH: new: ${val}, old: ${old}`)
      this.initMonthFormat()
      this.setRoughMonth()
      this.setFormattedMonth(this.datesOfMonth)
    }
  },
  created() {
    console.log('CREATE')
    this.initDate()
    this.initMonthFormat()
    this.setRoughMonth()
    this.setFormattedMonth(this.datesOfMonth)
  },
  methods: {
    initDate() {
      this.date = new Date()
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
    onOpen() {
      this.dateModalOpend = true
    },
    onClose() {
      this.dateModalOpend = false
    },
    prev() {
      this.firstDayOfMonth = new Date(this.firstDayOfMonth.getFullYear(), this.firstDayOfMonth.getMonth() - 1, 1)
    },
    next() {
      this.firstDayOfMonth = new Date(this.firstDayOfMonth.getFullYear(), this.firstDayOfMonth.getMonth() + 1, 1)
    },
    select(item) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.date_picker {
  &_modal_wrapper {
    position: relative;
    top: -1.3rem;
    left: 11rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }
  &_modal {
    width: 16rem;
    height: 16rem;
    padding: 1rem;
    background-color: #ffffff;
    border: 1px solid #ddd;

    div.month {
      display: flex;
      justify-content: space-around;
      margin-bottom: 1rem;
    }
    div.week {
      display: flex;
      justify-content: space-between;
    }
    div.date {
      margin-bottom: 1rem;
      .date_week_row {
        display: flex;
        justify-content: space-between;
        .date_date_cell {
          width: calc(100% / 7);
          cursor: pointer;
          outline: 1px solid #ddd;
          text-align: center;
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
