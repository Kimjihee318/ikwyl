<template>
  <div class="lnb">
    <div class="account_info">
      <div class="user">
        <div v-if="checkBreakPoint" class="user_img">
          <image-user-image :Canvas="userImageCanvas" />
        </div>
        <div class="user_name">{{ userUpperCase }}</div>
      </div>
      <!-- <div v-if="checkBreakPoint" class="card_style">
        <div class="card_style_red"></div>
        <div class="card_style_blue"></div>
      </div> -->
      <div v-if="checkBreakPoint" class="building">
        <div class="building_name">{{ buildingName }}</div>
        <div class="building_unit">
          {{ `${buildingNo}동 ${unit}호` }}
        </div>
      </div>
    </div>
    <button class="add type_english_font" title="Add Record" @click="onAdd">
      <span v-if="checkBreakPoint">Add Record</span><span v-else><icon-add /></span>
    </button>
    <div class="wrap__shs_info">
      <div class="shs_info">
        <div class="shs_bar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.2"
            width="200"
            height="20"
          >
            <g class="info_bars">
              <g class="bars" v-for="(bar, i) in localSHSNumArr" :key="`bar_${i}`">
                <defs>
                  <linearGradient :id="`info_linear_gradient_${i}`" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#3e343f" />
                    <stop offset="1" stop-color="#ffbd71" />
                  </linearGradient>
                </defs>
                <rect y="0.5" width="8" height="25" :fill="`url(#info_linear_gradient_${i})`" :x="`${i * 17.5}`"></rect>
              </g>
            </g>
          </svg>
        </div>
        <div class="shs_num">
          <div v-for="(item, i) in localSHSNumArr" class="num_item" :key="`num_${i}`">
            <div class="num">{{ i + 1 }}</div>
            <div :class="`line_${i} ${i === 0 || i === 4 || i === 9 ? 'info_line' : ''}`"></div>
          </div>
        </div>
      </div>
    </div>
    <ui-modal v-if="modalOpened" v-model="modalOpened" :width="600" :height="580" :start="0">
      <template #slot_title>Today's secondhand smoke detection</template>
      <template #slot_contents><form-smoke-today /></template>
    </ui-modal>
    <div class="service_nav">
      <div
        class="service_nav_item"
        title="Setting of residence information"
        :class="{ active: isResidence }"
        @click="onMove"
      >
        <icon-account class="icon" />
        <span>Residence information</span>
      </div>
      <a class="service_nav_item" title="email" href="mailto: jiheekim.developer@gmail.com"
        ><icon-mail class="icon type_move2right" />
        <span>Email to administrator</span>
      </a>
      <div class="service_nav_item" @click="onSys(permission === 'SYS_ADMIN' && !isSystemMod ? 'sys' : 'svc')">
        <template v-if="permission === 'SYS_ADMIN' && !isSystemMod">
          <icon-admin class="icon type_move2right" />
          <span>admin</span>
        </template>
        <template v-if="isSystemMod">
          <icon-change class="icon" />
          <span>home</span>
        </template>
      </div>
    </div>
    <div class="sys">
      <system-navigation v-if="this.isSystemMod" class="sys_menu" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import __C from '@/primitives/_constants_.js'
import _ImageUserImage from '@/primitives/imageUserImage.js'
import IconAccount from '@/assets/icons/business-24px.svg'
import IconAdd from '@/assets/icons/add-24px.svg'
import IconAdmin from '@/assets/icons/admin_panel_settings-24px.svg'
import IconChange from '@/assets/icons/sync-24px.svg'
// import IconSend from '@/assets/icons/send-24px.svg'
import FormSmokeToday from '@/components/form/FormSmokeToday.vue'
import SystemNavigation from '@/views/system/SystemNavigation'
import UiModal from '@/components/ui/Modal.vue'
import ImageUserImage from '@/lib/d3/chart/userImage/userImage.vue'
import IconMail from '@/assets/icons/mail.svg'

export default {
  name: 'left-navigation-bar',
  components: {
    FormSmokeToday,
    IconAccount,
    IconAdd,
    IconAdmin,
    IconChange,
    IconMail,
    // IconSend,
    ImageUserImage,
    SystemNavigation,
    UiModal
  },
  data: () => ({
    localSHSNumArr: Array.from({ length: 10 }, (d, i) => i),
    localSHSBarArr: Array.from({ length: 11 }, (d, i) => i)
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['user', 'userInfo', 'permission']),
    ...mapState(__C.STORE.NAMESPACE.APPLICATION, ['window', 'isResidence']),
    ...mapState(__C.STORE.NAMESPACE.COMMON, ['lnb']),
    ...mapState(__C.STORE.NAMESPACE.SYSTEM, ['isSystemMod']),

    modalOpened: {
      get() {
        return this.lnb.modalOpened
      },
      set(val) {
        this.setModalOpened(val)
      }
    },
    buildingName() {
      return this.userInfo.buildingname
    },
    buildingNo() {
      return this.userInfo.buildingno
    },
    checkBreakPoint() {
      return this.window.width > 1439.98
    },
    unit() {
      return this.userInfo.unit
    },
    userImageCanvas() {
      return _ImageUserImage.canvas
    },
    userUpperCase() {
      return this.user.toUpperCase()
    }
  },
  mounted() {
    this.getUserInfoFromServer()
    this.getUserPermissionFromServer()
  },
  methods: {
    ...mapActions(__C.STORE.NAMESPACE.ACCOUNT, ['getUserInfoFromServer', 'getUserPermissionFromServer']),
    ...mapMutations(__C.STORE.NAMESPACE.COMMON, ['setModalOpened']),

    onAdd() {
      this.setModalOpened(true)
    },
    onSys(path) {
      if (path === 'sys' && this.permission === __C.FULL_ACCESS_PERMISSION.SYSTEM) {
        this.$store.commit(`${__C.STORE.NAMESPACE.SYSTEM}/setSysMod`, true)
        this.$router.push({ path: 'system' })
      } else {
        this.$store.commit(`${__C.STORE.NAMESPACE.SYSTEM}/setSysMod`, false)
        this.$router.push({ path: '/' })
      }
    },
    onMove() {
      if (this.$router.history.current.path === '/residenceinfo') return
      this.$router.push({ path: '/residenceinfo' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/ui/_lnb.scss';
</style>
