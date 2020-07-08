<template>
  <div class="main">
    <div class="main_top calendar_wrapper">
      <Calendar :dateHasData="dateHasData" />
    </div>
    <div class="main_body">
      <div class="main_left">
        <template v-if="isVisible">
          <today-summary ref="td_summary" />
          <weekly-summray ref="wk_summary" />
        </template>
      </div>
      <div class="main_right">
        <div class="main_chart_surrounding">
          <surrounding-summary :dataItems="surroundingDataItems" />
        </div>
        <div class="main_chart_floor">
          <div class="main_chart_floor_chart wrap__svg" :class="{ no_data: isNoData }">
            <chart-floor
              v-for="(bgItem, key) in floorBgItems"
              :class="`key_${key}`"
              :key="`chart__${key}`"
              :Canvas="floorCanvas"
              :Rect="floorRect"
              :UserInfo="floorUserInfo"
              :Unit="floorUnit"
              :BackgroundItem="bgItem"
              :DataItems="getfloorDataItem(key)"
            ></chart-floor>
          </div>
          <div class="main_chart_floor_card wrap__card" :class="{ no_data: isNoData }">
            <ui-card
              v-for="(item, i) in floorSummary"
              class="main_chart_floor_card_item small_padding"
              :style="styleCard(item)"
              :key="`floor_summary_${i}`"
            >
              <template>
                <div class="card_contents_floor">
                  <span>{{ item.floor }} 층</span>
                  <span v-if="item.floor === userInfo.floor" class="info_my_floor">my floor</span>
                </div>
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
    isNoData: null,
    usedfloors: [],
    selectedDateSHS: [] // to FIX
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['userInfo']),
    ...mapState(__C.STORE.NAMESPACE.CALENDAR, ['selectedDates']),
    ...mapState(__C.STORE.NAMESPACE.COMMON, ['lnb']),
    ...mapState(__C.STORE.NAMESPACE.REPORT, ['dailySHS', 'joinedSHSWithUserInfo']),
    floorBgItems() {
      return this.floorBgStructure
    },
    floorDataItems() {
      let selectedDate = this.selectedDates[0]
      let propertyToday = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
      return this.formattedJoinedSHS[propertyToday]
    },
    isVisible() {
      return this.joinedSHSWithUserInfo.length > 0
    },
    surroundingDataItems() {
      return this.selectedDateSHS
    },
    dateHasData() {
      return Object.keys(this.formattedJoinedSHS).map(d => new Date(d))
    }
  },
  watch: {
    'lnb.modalOpened': {
      handler(val) {
        if (val === true) return
        if (val === false) {
          this.getJoinedSHS()
          this.$refs.td_summary.draw()
          this.$refs.wk_summary.setCumulativeSHS()
        }
      },
      deep: true
    },
    selectedDates: {
      handler(val) {
        if (!val || val.length === 0) return
        this.draw()
      },
      deep: true
    },
    userInfo: {
      handler(val) {
        console.log(`WATCH USIF`, val)
        if (!val || Object.keys(val).length === 0) return
        this.getJoinedSHS()
      },
      deep: true
    }
  },

  mounted() {
    console.log(`MOUNT MAIN`)
    this.getJoinedSHS()
  },
  methods: {
    ...mapActions(__C.STORE.NAMESPACE.REPORT, ['getJoinedSHSFromServer']),
    draw() {
      this.setSelectedDateSHS()
      this.setFloorBgStructure()
      this.setIsNodata()
      this.setSurroundingFloorSHS()
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
    getfloorDataItem(item) {
      // FLOW가 정확히 이해되지 않음
      return this.floorDataItems && Object.keys(this.floorDataItems).length > 0 ? this.floorDataItems[item] : []
    },
    setFloorBgStructure() {
      if (!this.userInfo.floor) return
      let floors = []
      switch (this.userInfo.floor) {
        case this.userInfo.maxfloor:
          floors =
            this.userInfo.floor === this.userInfo.maxfloor
              ? [this.userInfo.floor]
              : [this.userInfo.floor - 1, this.userInfo.floor]
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
        this.$set(
          this.floorBgStructure,
          f,
          Array.from({ length: this.userInfo.maxunitno }, (u, i) => {
            let idx = i + 1
            return { unit: i + 1 >= 10 ? `${f}${idx}` : `${f}0${idx}` }
          })
        )
      })
    },
    setIsNodata() {
      if (!this.selectedDateSHS || this.selectedDateSHS.length === 0 || !this.selectedDateSHS[0]) {
        this.isNoData = true
        return
      }
      let filteredFloors = Object.keys(this.selectedDateSHS[0])
        .filter(key => this.usedfloors.includes(Number(key)))
        .reduce((obj, key) => {
          obj[key] = this.selectedDateSHS[0][key]
          return obj
        }, {})
      this.isNoData = Object.keys(filteredFloors).length !== 0 ? false : true
    },
    setSelectedDateSHS() {
      this.selectedDateSHS = __F.getKeyofDateType(this.formattedJoinedSHS, this.selectedDates)
    },
    setSurroundingFloorSHS() {
      if (Object.keys(this.formattedJoinedSHS).length === 0) return
      let selectedDate = this.selectedDates[0]
      // ! FIX DATA NAME

      let filteredKeyOfSelectedDates = Object.keys(this.formattedJoinedSHS).filter(d => {
        return (
          new Date(d).getFullYear() === selectedDate.getFullYear() &&
          new Date(d).getMonth() === selectedDate.getMonth() &&
          new Date(d).getDate() === selectedDate.getDate()
        )
      })

      let result = []
      this.usedfloors.forEach(d => {
        result.push({
          floor: Number(d),
          avgQuantity: { title: '평균 간접 흡연 량', value: '' },
          noOfMembers: { title: '데이터 입력자 수', value: '' }
          // noOfTotalMembers: { title: '총 이용자 수', value: '' }
        })
      })

      this.floorSummary = result

      if (filteredKeyOfSelectedDates.length === 0) return
      let key = filteredKeyOfSelectedDates[0]
      let selected = this.formattedJoinedSHS[key]
      let floorKeys = Object.keys(this.formattedJoinedSHS[key])
      floorKeys.forEach(d => {
        this.usedfloors.forEach((_d, _i) => {
          if (Number(d) === this.floorSummary[_i].floor) {
            let item = this.floorSummary[_i]
            //!! FIXME
            item.avgQuantity.value = __F.integer(__F.propertyMean(selected[d], 'quantity'))
            item.noOfMembers.value = __F.integer([...new Set(selected[d].map(d => d.unit))].length)
            // item.noOfTotalMembers.value = __F.integer(selected[d].length)
          }
        })
      })
    },
    // [ JOINED SHS ]
    async getJoinedSHS() {
      let isData = await this.getJoinedSHSFromServer()
      if (!isData) return
      this.formatJoinedSHS()
      this.draw()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/ui/_main.scss';
</style>
