<template>
  <div class="comp_lnb">
    <div class="logo"></div>
    <div class="account_info">
      <div class="user">
        <div v-if="checkBreakPoint" class="user_img">
          <!-- <img src="@/assets/images/woman-raising-hand_1f64b-200d-2640-fe0f.png" alt="user_image" class="clip-circle" /> -->
        </div>
        <div class="user_name">{{ userUpperCase }}</div>
      </div>
      <div v-if="checkBreakPoint" class="card_style">
        <div class="card_style_red"></div>
        <div class="card_style_blue"></div>
      </div>
      <div v-if="checkBreakPoint" class="building">
        <div class="building_name">{{ userInfo.buildingname }}</div>
        <div class="building_unit">
          {{ `${userInfo.buildingno}동 ${userInfo.unit}호` }}
        </div>
      </div>
    </div>

    <button class="add type_english_font" title="Add Record" @click="onAdd">
      <span v-if="checkBreakPoint">Add Record</span><span v-else><icon-add /></span>
    </button>
    <ui-modal v-if="modalOpened" v-model="modalOpened" :width="600" :height="580">
      <template #slot_title>Today's secondhand smoke detection</template>
      <template #slot_contents><form-smoke-today /></template>
    </ui-modal>

    <div class="service_nav">
      <div class="service_nav_item sys_button" title="admin page">
        <button v-if="permission === 'SYS_ADMIN' && !isSystemMod" class="btn btn_circle" @click="onSys">
          <icon-admin class="type_move2right" />
        </button>
        <button v-if="isSystemMod" class="btn btn_circle" @click="onSvc">
          <icon-change />
        </button>
      </div>
      <div class="service_nav_item" title="user information" @click="onMove">
        <button class="btn btn_circle"><icon-account /></button>
      </div>
      <div class="service_nav_item" title="link">
        <button class="btn btn_circle"><icon-send class="type_move2right" /></button>
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
import IconAccount from '@/assets/icons/account_circle-24px.svg'
import IconAdd from '@/assets/icons/add-24px.svg'
import IconAdmin from '@/assets/icons/admin_panel_settings-24px.svg'
import IconChange from '@/assets/icons/sync-24px.svg'
import IconSend from '@/assets/icons/send-24px.svg'
import FormSmokeToday from '@/components/form/FormSmokeToday.vue'
import SystemNavigation from '@/views/system/SystemNavigation'
import UiModal from '@/components/ui/Modal.vue'

export default {
  name: 'left-navigation-bar',
  components: {
    IconAccount,
    IconAdd,
    IconAdmin,
    IconChange,
    IconSend,
    FormSmokeToday,
    SystemNavigation,
    UiModal
  },
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['user', 'userInfo', 'permission']),
    ...mapState(__C.STORE.NAMESPACE.APPLICATION, ['window']),
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
    userUpperCase() {
      return this.user.toUpperCase()
    },
    checkBreakPoint() {
      return this.window.width > 1439.98
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
    onSvc() {
      this.$store.commit(`${__C.STORE.NAMESPACE.SYSTEM}/setSysMod`, false)
      this.$router.push({ path: '/' })
    },
    onSys() {
      if (this.permission === __C.FULL_ACCESS_PERMISSION.SYSTEM)
        this.$store.commit(`${__C.STORE.NAMESPACE.SYSTEM}/setSysMod`, true)
      this.$router.push({ path: 'system' })
    },
    onMove() {
      this.$router.push({ path: '/userinfo' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/ui/_lnb.scss';
</style>
