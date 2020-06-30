<template>
  <div class="calendar type_row">
    <div class="calendar_title">
      <span class="type_english_font">FROM {{ startMonth.toUpperCase() }}</span>
      <span class="type_english_font">{{ `${thisMonth.toUpperCase()}  TODAY` }}</span>
    </div>
    <div class="calendar_btn_wrapper">
      <div class="btn btn_svg btn_prev" @click="onPrev"><svg-prev-arrow /></div>
      <div class="calendar_btn_wrapper_date">
        <div
          v-for="(item, i) in reversedDateItems"
          class="btn btn_date"
          :class="getClass(item)"
          :key="`date_${i}`"
          :title="getMonthName(item.date)"
          @click="setFilter(item)"
        >
          {{ getDate(item.date) }}
        </div>
        <!-- <div class="btn btn_date" @click="toggleSelectAll">ALL</div> -->
      </div>
      <div class="btn btn_svg btn_next" :disabled="isDisabled" @click="onNext"><svg-next-arrow /></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import __C from '@/primitives/_constants_'
import SvgPrevArrow from '@/assets/icons/arrow_back_ios-24px.svg'
import SvgNextArrow from '@/assets/icons/arrow_forward_ios-24px.svg'
export default {
  name: 'calender',
  components: {
    SvgPrevArrow,
    SvgNextArrow
  },
  props: {
    dateHasData: { type: Array, default: () => [] }
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
    localSelectedDates: [],
    startMonth: '',
    thisMonth: '',
    visibleEndPosition: null, // ! CHECK
    visibleStandard: null
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.CALENDAR, ['selectedDates']),

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
    ...mapMutations(__C.STORE.NAMESPACE.CALENDAR, ['setSelectedDates']),
    init() {
      //! [FIX] Fix to DB DATA
      let Today = JSON.parse(JSON.stringify(new Date(new Date().setHours(0, 0, 0, 0))))
      let dateLength =
        new Date(Today).getDate() + new Date(new Date(Today).getFullYear(), new Date(Today).getMonth(), 0).getDate()
      this.dateItems = Array.from({ length: dateLength }, (d, i) => ({
        date: new Date(new Date(Today).setDate(new Date(Today).getDate() - i)),
        selected: false
      }))

      this.setSelectedDates([{ date: new Date(Today), selected: null }])
      this.visibleEndPosition = this.dateItems.length
      this.startMonth = this.monthMap[new Date(new Date(Today).getFullYear(), new Date(Today).getMonth(), 0).getMonth()]
      this.thisMonth = this.monthMap[new Date(new Date(Today).getFullYear(), new Date(Today).getMonth(), 1).getMonth()]
    },
    getClass(item) {
      let hasDatas = []
      this.dateHasData.forEach(d => {
        hasDatas.push(d.getTime() === item.date.getTime() ? true : false)
      })

      return { active: item.selected, has_data: hasDatas.includes(true) }
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
      this.localSelectedDates = this.dateItems.filter(d => d.selected)
      this.setSelectedDates(this.localSelectedDates)
    },
    initSelectedState() {
      this.dateItems.forEach(d => {
        let innerArr = []
        this.selectedDates.forEach(_d => {
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
          d.selected = !d.selected
        } else {
          d.selected = false
        }
      })

      this.localSelectedDates = this.dateItems.filter(d => d.selected)
      this.setSelectedDates(this.localSelectedDates)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/ui/_calendar.scss';
</style>
