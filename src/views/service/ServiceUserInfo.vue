<template>
  <div class="user_info">
    <div class="user_info_form_wrapper">
      <h4>USER INFO</h4>
      <template v-if="mode === 'READ'">
        <div><label>주소</label>{{ address }}</div>
        <div><label>빌딩 명</label>{{ buildingName }}</div>
        <div><label>동</label>{{ buildingNo }}</div>
        <div><label>층수</label>{{ floor }}</div>
        <div><label>호수</label>{{ maxFloor }}</div>
        <div><label>최고층</label>{{ unit }}</div>
        <div class="btn_wrapper">
          <div class="btn_user_info" @click="onAction('MOD')">수정</div>
          <div class="btn_user_info" @click="onAction('DEL')">삭제</div>
        </div>
      </template>
      <template v-else>
        <div><label>주소</label><input v-model="address" type="text" /></div>
        <div><label>빌딩 명</label><input v-model="buildingName" type="text" /></div>
        <div><label>동</label><input v-model="buildingNo" type="text" /></div>
        <div><label>층수</label><input v-model="floor" type="text" /></div>
        <div><label>호수</label><input v-model="unit" type="text" /></div>
        <div><label>최고층</label><input v-model="maxFloor" type="text" /></div>
        <div class="btn_wrapper">
          <div v-if="mode === 'NEW'" class="btn_user_info" @click="onAction('ADD')">확인</div>
          <div v-else-if="mode === 'MOD'" class="btn_user_info" @click="onAction('EDIT')">확인</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
        this.userInfo.address = val
      }
    },
    buildingName: {
      get() {
        return this.userInfo.buildingname
      },
      set(val) {
        this.userInfo.buildingname = val
      }
    },
    buildingNo: {
      get() {
        return this.userInfo.buildingno
      },
      set(val) {
        this.userInfo.buildingno = val
      }
    },
    floor: {
      get() {
        return this.userInfo.floor
      },
      set(val) {
        this.userInfo.floor = val
      }
    },
    maxFloor: {
      get() {
        return this.userInfo.maxfloor
      },
      set(val) {
        this.userInfo.maxfloor = val
      }
    },
    unit: {
      get() {
        return this.userInfo.unit
      },
      set(val) {
        this.userInfo.unit = val
      }
    }
  },
  mounted() {
    this.getUserInfoFromServer(res => {
      this.mode = res.length !== 0 ? __C.FORM.EDIT_MODE_READ : __C.FORM.EDIT_MODE_NEW
    })
  },
  methods: {
    ...mapActions(__C.STORE.NAMESPACE.ACCOUNT, [
      'getUserInfoFromServer',
      'insertedUserInfoIndex',
      'upUserInfo2Server',
      'addUserInfo2Server'
    ]),
    onAction(mod) {
      switch (mod) {
        case __C.BUTTON.EDIT_MODE_ADD:
          // * ACTIONS 인자 하나만 받음. callback을 인자로 넘겨줄 수 없음
          this.addUserInfo2Server()
          this.mode = __C.FORM.EDIT_MODE_READ
          break
        case __C.FORM.EDIT_MODE_MOD:
          this.mode = __C.FORM.EDIT_MODE_MOD
          console.log(`[TEMPLATE]`, this.insertedUserInfoIndex)
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
.user_info {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  &_form_wrapper {
    h4 {
      margin: 0;
      margin-bottom: 1rem;
    }
    width: 20rem;
    background-color: #ffffff;
    color: #000000;
    padding: 0.5rem;

    > div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      &.btn_wrapper {
        justify-content: center;
        margin-top: 1rem;
        margin-bottom: 0;
      }
    }

    .btn_user_info {
      border: 1px solid #000000;
      padding-right: 1rem;
      padding-left: 1rem;
    }
  }
}
</style>
