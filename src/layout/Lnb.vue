<template>
  <div>
    <div class="logo"></div>
    <div class="account_info">
      <div class="user">
        <div class="user_img"></div>
        <div class="user_name">{{ userUpperCase }}</div>
      </div>
      <div class="card_style">
        <div class="card_style_red"></div>
        <div class="card_style_blue"></div>
      </div>
      <div class="building">
        <div class="building_name">{{ userInfo.buildingname }}</div>
        <div class="building_unit">
          {{ `${userInfo.buildingno}동 ${userInfo.unit}호` }}
        </div>
      </div>
    </div>
    <button v-if="permission === 'SYS_ADMIN' && !isSystemMod" class="btn type_nav" @click="onSys">System</button>
    <button v-if="isSystemMod" class="btn type_nav" @click="onSvc">
      Main
    </button>
    <system-navigation v-if="this.isSystemMod" />
    <button class="add" @click="onAdd">Add Record</button>
    <ui-modal v-if="modalOpened" v-model="modalOpened">
      <template #slot_title>Today Second Hand Smoking Upload</template>
      <template #slot_contents><form-smoke-today /></template>
    </ui-modal>
    <div class="summary">
      <today-summary />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import __C from '@/primitives/_constants_.js'
import FormSmokeToday from '@/components/form/FormSmokeToday.vue'
import SystemNavigation from '@/views/system/SystemNavigation'
import UiModal from '@/components/ui/Modal.vue'
import TodaySummary from '@/components/TodaySummary.vue'

export default {
  name: 'left-navigation-bar',
  components: {
    FormSmokeToday,
    SystemNavigation,
    TodaySummary,
    UiModal
  },
  data: () => ({
    modalOpened: false
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['user', 'userInfo', 'permission']),
    ...mapState(__C.STORE.NAMESPACE.SYSTEM, ['isSystemMod']),
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

    onAdd() {
      this.modalOpened = true
    },
    onSvc() {
      this.$store.commit(`${__C.STORE.NAMESPACE.SYSTEM}/setSysMod`, false)
      this.$router.push({ path: '/' })
    },
    onSys() {
      if (this.permission === __C.FULL_ACCESS_PERMISSION.SYSTEM)
        this.$store.commit(`${__C.STORE.NAMESPACE.SYSTEM}/setSysMod`, true)
      this.$router.push({ path: 'system' })
    }
  }
}
</script>
<style lang="scss" scoped>
.logo {
  height: 3rem;
}
.account_info {
  position: relative;
  display: flex;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #2d519f;
  border: 1px solid #81a8e3;
  color: #ffffff;

  .user {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 0.4rem;
    padding-right: 0.8rem;
    border-right: 1px solid #8ea3ea;
    &_img {
      width: 2rem;
      height: 2rem;
      margin-bottom: 0.2rem;
      border: 2px solid #8ea3ea;
      border-radius: 50%;
    }
    &_name {
      width: 4rem;
      overflow: hidden;
      text-align: center;
      word-wrap: break-word;
    }
  }
  .card_style {
    position: absolute;
    top: 1.2rem;
    left: 0.8rem;
    > div {
      width: 0.6rem;
      height: 0.6rem;
    }

    &_red {
      margin-bottom: 0.3rem;
      background-color: #b6b6dc;
    }

    &_blue {
      background-color: #7dafee;
    }
  }
  .building {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 1rem;
    > div {
      width: 8rem;
      overflow: hidden;
      word-wrap: break-word;
    }

    &_name {
      margin-bottom: 0.5rem;
    }
  }
}
.add {
  width: 100%;
  margin-bottom: 1.5rem;
  padding: 0.4rem;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 0.2rem;
  color: #1a2157;
  font-weight: bold;
}
.btn {
  &.type_nav {
    border: 1px solid #ddd;
  }
}
</style>
