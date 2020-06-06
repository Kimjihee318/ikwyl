<template>
  <div class="calendar type_row">
    <div class="btn btn_svg btn_prev" @click="onPrev"><svg-prev-arrow /></div>
    <div class="wrapper_btn_date">
      <div v-for="(item, i) in reversedDateItems" class="btn btn_date" :key="`date_${i}`" @click="setFilter(item)">
        {{ getDate(item.date) }}
      </div>
      <div class="btn btn_date">ALL</div>
    </div>
    <div class="btn btn_svg btn_next" :disabled="isDisabled" @click="onNext"><svg-next-arrow /></div>
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
    datesNtoggles: [],
    selectedDate: [],
    visibleRange: null,
    activeToggles: []
  }),
  computed: {
    isDisabled() {
      return this.dateItems.length > 15 ? true : false
    },
    reversedDateItems() {
      return JSON.parse(JSON.stringify(this.visibleDateItems))
        .reverse()
        .map(d => ({ date: new Date(d.date), active: d.active }))
    },
    visibleDateItems() {
      // * 맨 뒤부터
      return this.datesNtoggles.slice(this.visibleRange - 15, this.visibleRange)
    }
  },
  created() {
    //! [FIX] Fix to DB DATA
    // this month + last month

    console.log()
    console.log()
    let dateLength = new Date().getDate() + new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate()
    this.dateItems = Array.from({ length: this.dateLength }, (d, i) => new Date())

    this.selectedDate.push(new Date())
    this.visibleRange = this.dateItems.length
    // ! [FIX] Test Data should remove
    this.selectedDate.push(new Date(new Date().setDate(new Date().getDate() - 4)))
    this.selectedDate.push(new Date(new Date().setDate(new Date().getDate() - 8)))

    this.setActiveToggles()
    this.setDatesNToggles()
  },
  methods: {
    getDate(item) {
      return new Date(item).getDate()
    },
    onPrev() {
      // ! CHECK. 데이터 값 정확하게 확인하기
      // * MODIFY TO FIXED ARR
      this.visibleRange += 1
      let addedDate = new Date().setDate(this.dateItems[this.dateItems.length - 1].getDate() - 1)
      this.dateItems.push(new Date(addedDate))
    },
    onNext() {
      if (this.visibleRange <= 15) return
      this.visibleRange -= 1
    },
    setActiveToggles() {
      // this.activeToggles =
      this.dateItems.forEach(d => {
        let innerArr = []
        this.selectedDate.forEach(_d => {
          if (d.getTime() === _d.getTime()) {
            innerArr.push(true)
          } else {
            innerArr.push(false)
          }
        })
        this.activeToggles.push(innerArr.some(d => !!d))
      })
    },
    setDatesNToggles() {
      this.datesNtoggles = this.dateItems.map((d, i) => ({ date: d, active: this.activeToggles[i] }))
    },
    setFilter(item) {
      // 1. filtering
      // * NOT YET
      // 2. toggle
      this.datesNtoggles.forEach(d => {
        // console.log('TEST', d, d.date, `[ITEM]`, item, item.date)
        if (d.date.getTime() === item.date.getTime()) {
          console.log(`[FILTER IN]`, d.active)
          d.active = !d.active
          console.log(`[FILTER IN AFTER EVENT]`, d.active)
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
    height: 5.6rem;
    display: flex;
    justify-content: space-around;
  }
  .wrapper_btn_date {
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
</style>
