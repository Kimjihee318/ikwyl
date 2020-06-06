<template>
  <div class="calendar type_row">
    <div class="calendar_title">
      <span>FROM {{ startMonth.toUpperCase() }}</span>
      <span>TODAY</span>
    </div>
    <div class="calendar_btn_wrapper">
      <div class="btn btn_svg btn_prev" @click="onPrev"><svg-prev-arrow /></div>
      <div class="calendar_btn_wrapper_date">
        <div
          v-for="(item, i) in reversedDateItems"
          class="btn btn_date"
          :class="{ active: item.selected }"
          :key="`date_${i}`"
          :title="getMonthName(item.date)"
          @click="setFilter(item)"
        >
          {{ getDate(item.date) }}
        </div>
        <div class="btn btn_date" @click="toggleSelectAll">ALL</div>
      </div>
      <div class="btn btn_svg btn_next" :disabled="isDisabled" @click="onNext"><svg-next-arrow /></div>
    </div>
  </div>
</template>

<script>
import SvgPrevArrow from '@/assets/icons/arrow_back_ios-24px.svg'
import SvgNextArrow from '@/assets/icons/arrow_forward_ios-24px.svg'
export default {
  name: 'calender',
  components: {
    SvgPrevArrow,
    SvgNextArrow
  },
  data: () => ({
    dateItems: [],
    dataItemsVisibleLength: 15,
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
    selectedDate: [],
    startMonth: null,
    visibleEndPosition: null, // ! CHECK
    visibleStandard: null
  }),
  computed: {
    isDisabled() {
      return this.dateItems.length > 15 ? true : false
    },
    reversedDateItems() {
      return JSON.parse(JSON.stringify(this.visibleDateItems))
        .reverse()
        .map(d => ({ date: new Date(d.date), selected: d.selected }))
    },
    visibleDateItems() {
      // * 맨 뒤부터
      return this.dateItems.slice(0 + this.visibleStandard, this.dataItemsVisibleLength + this.visibleStandard)
    }
  },
  created() {
    this.init()
    this.initSelectedState()
  },
  methods: {
    init() {
      //! [FIX] Fix to DB DATA
      let Today = JSON.parse(JSON.stringify(new Date()))

      let dateLength =
        new Date(Today).getDate() + new Date(new Date(Today).getFullYear(), new Date(Today).getMonth(), 0).getDate()
      this.dateItems = Array.from({ length: dateLength }, (d, i) => ({
        date: new Date(new Date(Today).setDate(new Date(Today).getDate() - i)),
        selected: false
      }))

      this.selectedDate.push(new Date(Today))
      this.visibleEndPosition = this.dateItems.length
      this.startMonth = this.monthMap[new Date(new Date(Today).getFullYear(), new Date(Today).getMonth(), 0).getMonth()]
    },
    getDate(item) {
      return new Date(item).getDate()
    },
    getMonthName(item) {
      return this.monthMap[new Date(item).getMonth()]
    },
    onPrev() {
      // ! CHECK. 데이터 값 정확하게 확인하기
      // * MODIFY TO FIXED ARR
      if (
        this.visibleDateItems[this.dataItemsVisibleLength - 1].date.getDate() === 1 &&
        this.visibleDateItems[this.dataItemsVisibleLength - 1].date.getMonth() === new Date().getMonth() - 1
      )
        return
      this.visibleStandard += 1
    },
    onNext() {
      if (
        this.visibleDateItems[0].date.getDate() === new Date().getDate() &&
        this.visibleDateItems[0].date.getMonth() === new Date().getMonth()
      )
        return
      this.visibleStandard -= 1
    },
    toggleSelectAll() {
      let allRselected = this.dateItems.every(_d => _d.selected)
      this.dateItems.forEach(d => {
        d.selected = allRselected ? false : true
      })
    },
    initSelectedState() {
      this.dateItems.forEach(d => {
        let innerArr = []
        this.selectedDate.forEach(_d => {
          if (d.date.getTime() === _d.getTime()) {
            innerArr.push(true)
          } else {
            innerArr.push(false)
          }
          // console.log(`[DATA]`, d.date, `[SELECTED]`, _d, `[COMPARE TIME]`, d.date.getTime(), _d.getTime())
        })

        d.selected = innerArr.some(d => d)
      })
    },
    setFilter(item) {
      // 1. filtering
      // * NOT YET
      // 2. toggle
      this.dateItems.forEach(d => {
        if (d.date.getTime() === item.date.getTime()) {
          // console.log(`[FILTER IN]`, d.selected)
          d.selected = !d.selected
          // console.log(`[FILTER IN AFTER EVENT]`, d.selected)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  // position: relative;
  &.type_row {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 5.6rem;
    margin-bottom: 1rem;
  }
  .calendar_title {
    display: flex;
    justify-content: space-between;
    width: 70rem;
    margin-bottom: 1rem;
  }
  .calendar_btn_wrapper {
    display: flex;
    justify-content: space-around;

    &_date {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 70rem;
    }
    .btn {
      &:hover {
        cursor: pointer;
      }

      &_svg {
        display: flex;
        align-items: center;
        fill: #516998;
        &:hover {
          fill: #c0ddf2;
        }
      }

      &_date {
        width: 3rem;
        height: 3rem;
        // background-color: #2d519f;
        background-color: transparent;
        border: 1px solid #516998;
        border-radius: 50%;
        font-weight: bold;
        line-height: 3rem;
        text-align: center;

        &.active {
          background-color: #2d519f;
        }

        &:hover {
          background-color: rgba(45, 81, 159, 0.5);
        }
      }
    }
  }
}
</style>
