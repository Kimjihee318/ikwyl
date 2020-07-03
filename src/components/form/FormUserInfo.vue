<template>
  <div class="user_info">
    <div class="user_info_form_wrapper">
      <h4>User Information</h4>
      <template v-if="mode === 'READ'">
        <div><label>주소</label>{{ address }}</div>
        <div><label>빌딩 명</label>{{ buildingName }}</div>
        <div><label>동</label>{{ buildingNo }}</div>
        <div><label>층수</label>{{ floor }}</div>
        <div><label>호수</label>{{ unit }}</div>
        <div><label>최고층</label>{{ maxFloor }}</div>
        <div><label>층 별 총 호수</label>{{ maxUnitNo }}</div>
        <div class="btn_wrapper">
          <div class="btn_user_info" @click="onAction('MOD')">수정</div>
        </div>
      </template>
      <template v-else>
        <div><label>주소</label><input v-model="address" type="text" /></div>
        <div><label>빌딩 명</label><input v-model="buildingName" type="text" /></div>
        <div><label>동</label><input v-model="buildingNo" type="text" /></div>
        <div><label>층수</label><input v-model="floor" type="text" /></div>
        <div><label>호수</label><input v-model="unit" type="text" /></div>
        <div><label>최고층</label><input v-model="maxFloor" type="text" /></div>
        <div><label>층 별 총 호수</label><input v-model="maxUnitNo" type="text" /></div>
        <div class="btn_wrapper">
          <div v-if="mode === 'NEW'" class="btn_user_info" @click="onAction('ADD')">확인</div>
          <div v-else-if="mode === 'MOD'" class="btn_user_info" @click="onAction('EDIT')">확인</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import __C from '@/primitives/_constants_'
export default {
  name: 'form-user-info',
  data: () => ({
    mode: '',
    isAddSuccess: ''
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['userInfo']),
    address: {
      get() {
        return this.userInfo.address
      },
      set(val) {
        this.setUserInfo({ key: 'address', value: val })
      }
    },
    buildingName: {
      get() {
        return this.userInfo.buildingname
      },
      set(val) {
        this.setUserInfo({ key: 'buildingname', value: val })
      }
    },
    buildingNo: {
      get() {
        return this.userInfo.buildingno
      },
      set(val) {
        this.setUserInfo({ key: 'buildingno', value: parseFloat(val) })
      }
    },
    floor: {
      get() {
        return this.userInfo.floor
      },
      set(val) {
        this.setUserInfo({ key: 'floor', value: parseFloat(val) })
      }
    },
    maxFloor: {
      get() {
        return this.userInfo.maxfloor
      },
      set(val) {
        this.setUserInfo({ key: 'maxfloor', value: parseFloat(val) })
      }
    },
    maxUnitNo: {
      get() {
        return this.userInfo.maxunitno
      },
      set(val) {
        this.setUserInfo({ key: 'maxunitno', value: parseFloat(val) })
      }
    },
    unit: {
      get() {
        return this.userInfo.unit
      },
      set(val) {
        this.setUserInfo({ key: 'unit', value: parseFloat(val) })
      }
    }
  },
  mounted() {
    this.getUserInfoFromServer(mode => {
      console.log(mode)
      this.mode = mode
    })
  },
  methods: {
    ...mapMutations(__C.STORE.NAMESPACE.ACCOUNT, ['setUserInfo']),
    ...mapActions(__C.STORE.NAMESPACE.ACCOUNT, ['addUserInfo2Server', 'getUserInfoFromServer', 'upUserInfo2Server']),
    onAction(mod) {
      switch (mod) {
        case __C.BUTTON.EDIT_MODE_ADD:
          console.log('ADD IN')

          this.addUserInfo2Server()
          this.mode = __C.FORM.EDIT_MODE_READ
          break
        case __C.FORM.EDIT_MODE_MOD:
          this.mode = __C.FORM.EDIT_MODE_MOD
          break
        case __C.BUTTON.EDIT_MODE_EDIT:
          this.upUserInfo2Server()
          this.mode = __C.FORM.EDIT_MODE_READ
          break
        case __C.BUTTON.EDIT_MODE_DEL:
          console.log('DELETE')
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/ui/userInfo.scss';
</style>
