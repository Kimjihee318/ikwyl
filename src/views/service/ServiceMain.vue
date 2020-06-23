<template>
  <div class="main">
    <div class="main_top calendar_wrapper">
      <Calendar />
    </div>
    <div class="main_body">
      <div class="main_left">
        <today-summary />
        <weekly-summray />
      </div>
      <div class="main_right">
        <div class="main_chart_surrounding">
          <surrounding-summary :dataItems="surroundingDataItems" />
        </div>
        <div class="main_chart_floor">
          <div class="main_chart_floor_chart">
            <chart-floor
              v-for="(bgItem, key) in floorBgItems"
              :class="`key_${key}`"
              :key="`chart__${key}`"
              :Canvas="floorCanvas"
              :FloorInfo="floorFloorInfo"
              :BackgroundItem="bgItem"
              :Unit="floorUnit"
              :User="user"
              :DataItems="getfloorDataItem(key)"
            ></chart-floor>
          </div>
          <div class="main_chart_floor_card">
            <ui-card
              v-for="(item, i) in floorSummary"
              class="main_chart_floor_card_item small_padding"
              :card-style="propStyle"
              :style="styleCard(item)"
              :key="`floor_summary_${i}`"
            >
              <template>
                <div class="card_contents_floor">{{ item.floor }} 층</div>
                <div>
                  <div v-for="(_item, _i) in item" class="card_contents_report" :key="`rep_${_i}`">
                    <div class="card_contents_report_title">{{ _item.title }}</div>
                    <div class="card_contents_report_val">{{ _item.value }}</div>
                  </div>
                </div>
              </template>
            </ui-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import __C from '@/primitives/_constants_'
import __F from '@/primitives/_function_'
import mainMixin from '@/mixins/main.mixins'
import WeeklySummray from '@/components/WeeklySummary.vue'
import SurroundingSummary from '@/components/SurroundingSummary.vue'
import TodaySummary from '@/components/TodaySummary.vue'

export default {
  name: 'main-page',
  mixins: [mainMixin],
  components: { SurroundingSummary, TodaySummary, WeeklySummray },
  data: () => ({
    floorBgStructure: {},
    floorSummary: [],
    formattedJoinedSHS: {},
    usedfloors: [],
    selectedDates: [new Date(2020, 5, 21)],
    selectedDateSHS: [] // to FIX
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['userInfo']),
    ...mapState(__C.STORE.NAMESPACE.REPORT, ['dailySHS', 'joinedSHSWithUserInfo']),
    surroundingDataItems() {
      return this.selectedDateSHS
    },
    floorBgItems() {
      return this.floorBgStructure
    },
    floorDataItems() {
      let today = new Date()
      let propertyToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      return this.formattedJoinedSHS[propertyToday]
    }
  },
  mounted() {
    this.getJoinedSHS()
  },
  methods: {
    ...mapActions(__C.STORE.NAMESPACE.REPORT, ['getJoinedSHSFromServer']),
    // [ JOINED SHS ]
    async getJoinedSHS() {
      console.log(`[SET JOINED]`)
      let isData = await this.getJoinedSHSFromServer()
      if (!isData) return
      this.formatJoinedSHS()
      this.setSelectedDateSHS()
      this.setFloorBgStructure()
      this.setSurroundingFloorSHS(new Date())
    },
    formatJoinedSHS() {
      let copied = JSON.parse(JSON.stringify(this.joinedSHSWithUserInfo))

      copied.forEach(d => {
        let date = new Date(d.date)
        Object.assign(d, {
          ['formatedDate']: new Date(date.getFullYear(), date.getMonth(), date.getDate())
        })
      })
      let result = copied.reduce((c, v) => {
        c[v.formatedDate] = c[v.formatedDate] || {} //Init if company property does not exist
        c[v.formatedDate][v.floor] = c[v.formatedDate][v.floor] || [] //Add employee property with null value
        c[v.formatedDate][v.floor].push(v)
        return c
      }, {})

      this.formattedJoinedSHS = result
    },
    setSelectedDateSHS() {
      this.selectedDateSHS = __F.getKeyofDateType(this.formattedJoinedSHS, this.selectedDates)
    },
    getfloorDataItem(item) {
      // FLOW가 정확히 이해되지 않음
      return this.floorDataItems && Object.keys(this.floorDataItems).length > 0 ? this.floorDataItems[item] : []
    },
    setFloorBgStructure() {
      let floors = []
      switch (this.userInfo.floor) {
        case this.userInfo.maxfloor:
          floors = [this.userInfo.floor - 1, this.userInfo.floor]
          break
        case 1:
          floors = [this.userInfo.floor, this.userInfo.floor + 1]
          break
        default:
          floors = [this.userInfo.floor - 1, this.userInfo.floor, this.userInfo.floor + 1]
          break
      }

      this.usedfloors = floors

      floors.forEach(f => {
        Object.assign(this.floorBgStructure, {
          [f]: Array.from({ length: this.userInfo.maxunitno }, (u, i) => {
            let idx = i + 1
            return { unit: i + 1 >= 10 ? `${f}${idx}` : `${f}0${idx}` }
          })
        })
      })
    },
    setSurroundingFloorSHS(date) {
      // ! FIX DATA NAME
      let filteredDateKey = Object.keys(this.formattedJoinedSHS).filter(d => {
        return (
          new Date(d).getFullYear() === date.getFullYear() &&
          new Date(d).getMonth() === date.getMonth() &&
          new Date(d).getDate() === date.getDate()
        )
      })[0]

      if (!filteredDateKey) {
        let result = []
        this.usedfloors.forEach(d => {
          result.push({
            floor: Number(d),
            avgQuantity: { title: '층 평균 간접 흡연 량', value: '' },
            noOfMembers: { title: '층 별 데이터 입력자 수', value: '' },
            noOfTotalMembers: { title: '층 별 총 이용자 수', value: '' }
          })
        })

        this.floorSummary = result
        return
      }
      // ! TEST WHEN IS DATA
      let selected = this.formattedJoinedSHS[filteredDateKey]
      let floorKeys = Object.keys(this.formattedJoinedSHS[filteredDateKey])
      let result = []
      floorKeys.forEach(d => {
        result.push({
          floor: Number(d),
          avgQuantity: { title: '층 평균 간접 흡연 량', value: __F.propertyMean(selected[d], 'quantity') },
          noOfMembers: { title: '층 별 데이터 입력자 수', value: selected[d].length },
          noOfTotalMembers: { title: '층 별 총 이용자 수', value: selected[d].length }
        })
      })

      this.floorSummary = result
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/ui/_main.scss';
</style>
