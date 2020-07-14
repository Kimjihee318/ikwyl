<template>
  <div>
    <ui-card class="wrap__card no_data">
      <div class="wrapper__chart wrapper__chart_stacked">
        <h3 class="light type_english_font ui_card_title no_margin">Weekly <br />Secondhand Smoke</h3>
        <div v-for="(item, i) in cumulativeSHS.quantity" class="report_cumulative" :key="`report_c_q${i}`">
          <div class="report_title">{{ item.title }}</div>
          <div class="report_contents">{{ item.value }}</div>
        </div>
      </div>
      <div class="wrapper__chart wrapper__chart_time">
        <h3 class="light type_english_font ui_card_title no_margin">Weekly Detection Time</h3>
      </div>
    </ui-card>
  </div>
</template>

<script>
import UiCard from '@/components/ui/Card.vue'

export default {
  name: 'weekly-empty-summary',
  components: {
    UiCard
  },
  data: () => ({
    cumulativeSHS: {
      quantity: {
        shs: {
          title: '주간 평균 간접 흡연 량',
          value: ''
        },
        shsFloor: {
          title: '주간 같은 층 간접 흡연 량',
          value: ''
        },
        shsSurround: {
          title: '주간 주위 간접 흡연 량',
          value: ''
        }
      },
      time: {
        daily: {
          title: '주간 주요 감지 시간',
          value: ''
        },
        weekend: {
          title: '주말 주요 감지 시간',
          value: ''
        }
      }
    }
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/ui/_summary.scss';
</style>
