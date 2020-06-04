<template>
  <div class="calendar type_row">
    <div class="btn btn_prev"><svg-prev-arrow /></div>
    <div class="btn_date_wrapper">
      <div v-for="(item, i) in dataItems" class="btn_date" :key="`date_${i}`" @click="setFilter">
        {{ getDate(item.date) }}
      </div>
      <div class="btn_date">ALL</div>
    </div>
    <div class="btn btn_next"><svg-next-arrow /></div>
  </div>
</template>

<script>
import SvgPrevArrow from '@/assets/icons/arrow_back_ios-24px.svg'
import SvgNextArrow from '@/assets/icons/arrow_forward_ios-24px.svg'
import _UiCalendarData from '@/primitives/ui/calendar'
export default {
  name: 'calender',
  components: {
    SvgPrevArrow,
    SvgNextArrow
  },
  computed: {
    dataItems() {
      return _UiCalendarData.dataItems
    }
  },
  methods: {
    getDate(d) {
      return d.getDate()
    },
    setFilter() {}
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
  .btn {
    display: flex;
    align-items: center;
    fill: #516998;
  }
  .btn_date_wrapper {
    display: flex;
    align-items: center;
  }
  .btn_date {
    width: 3rem;
    height: 3rem;
    // background-color: #2d519f;
    background-color: transparent;
    border: 1px solid #516998;
    border-radius: 50%;
    font-weight: bold;
    line-height: 3rem;
    text-align: center;
  }
}
</style>
