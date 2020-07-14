<template>
  <div class="comp_td_summary wrap__card no_data">
    <ui-card>
      <h3 class="light title type_english_font ui_card_title">Daily <br />Secondhand Smoke</h3>
      <div v-if="isNoData" class="msg_nodata"></div>
      <div v-for="(item, key) in todaySHS.quantity" class="report_today" :key="`report_t_q${key}`">
        <div class="report_title" :class="{ type_surrounding: key === 'shsSurround' }">
          {{ item.title }}<span><icon-help v-if="key === 'shsSurround'" class="icon"/></span>
        </div>
        <div class="report_contents">{{ item.value }}</div>
      </div>
      <div v-for="(item, i) in todaySHS.time" class="report_today type_time" :key="`report_t_t${i}`">
        <div class="report_title">{{ item.title }}</div>
        <div class="report_contents">
          <span v-for="(_item, _i) in item.value" class="time_item" :key="`shs_time_${_i}`">{{ _item }}</span>
        </div>
      </div>
    </ui-card>
  </div>
</template>

<script>
import UiCard from '@/components/ui/Card.vue'
import IconHelp from '@/assets/icons/help-24px.svg'

export default {
  name: 'today-empty-summary',
  components: {
    IconHelp,
    UiCard
  },
  data: () => ({
    isNoData: null,
    todaySHS: {
      quantity: {
        shs: {
          title: '평균 간접 흡연 량',
          value: ''
        },
        shsFloor: {
          title: '같은 층 간접 흡연 량',
          value: ''
        },
        shsSurround: {
          title: '주위 간접 흡연 량',
          value: ''
        }
      },
      time: {
        dailyAvg: {
          title: '감지 시간',
          value: []
        }
      }
    },
    todaySHSInfo: '',
    todaySHSMode: '',
    todayUserFloorSHS: []
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/ui/_summary.scss';
</style>
