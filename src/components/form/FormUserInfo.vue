<template>
  <div class="user_info">
    <div class="user_info_form_wrapper">
      <div class="title">User Information</div>
      <template v-if="mode === 'READ'">
        <div class="wrap__info">
          <div class="group group_building">
            <div class="title type_sub">Building Information</div>
            <div class="wrap__input"><label>동네</label>{{ address }}</div>
            <div class="wrap__input"><label>빌딩</label>{{ buildingName }}</div>
            <div class="wrap__input"><label>최고 층</label>{{ maxFloor }}층</div>
            <div class="wrap__input"><label>층 별 총 호 수</label>{{ maxUnitNo }}호</div>
          </div>
          <div class="group group_user_info">
            <div class="title type_sub">Unit Information</div>
            <div class="wrap__input"><label>동</label>{{ buildingNo }}동</div>
            <div class="wrap__input"><label>호</label>{{ unit }}호</div>
            <div class="wrap__input"><label>층</label>{{ floor }}층</div>
          </div>
        </div>
        <div class="wrap__btn">
          <div class="btn_user_info" @click="onAction('MOD')">Edit</div>
        </div>
      </template>
      <template v-else>
        <div class="wrap__info">
          <div class="group group_building">
            <div class="title type_sub">Building Information</div>
            <div class="wrap__input"><label>동네</label><input v-model="address" type="text" /></div>
            <div class="wrap__input">
              <label>빌딩</label>
              <div class="form_has_add">
                <select v-model="buildingName">
                  <option v-for="(option, i) in buildingOptions" :value="option.value" :key="`building_${i}`">{{
                    option.text
                  }}</option>
                </select>
                <icon-add class="icon" />
              </div>
            </div>
            <div class="wrap__input">
              <label data-label-has-icon="max_floor"><icon-help class="icon" />최고 층 </label
              ><input v-model="maxFloor" min="1" type="number" />
            </div>
            <div class="wrap__input">
              <label data-label-has-icon="max_unit_no"><icon-help class="icon" />층 별 총 호 수</label
              ><input v-model="maxUnitNo" min="1" type="number" />
            </div>
          </div>
          <div class="group group_user_info">
            <div class="title type_sub">Unit Information</div>
            <div class="wrap__input">
              <label>동</label>
              <div class="form_has_add">
                <input v-model="buildingNo" min="1" type="number" /> <icon-add class="icon" />
              </div>
            </div>
            <div class="wrap__input">
              <label data-label-has-icon="unit"><icon-help class="icon" />호</label>
              <input v-model="unit" minlength="3" min="1" type="number" />
            </div>
            <div class="wrap__input">
              <label data-label-has-icon="floor"><icon-help class="icon" />층</label>
              <input v-model="floor" min="1" type="number" />
            </div>
          </div>
        </div>
        <div class="wrap__btn">
          <div v-if="mode === 'NEW'" class="btn_user_info" @click="onAction('ADD')">Update</div>
          <div v-else-if="mode === 'MOD'" class="btn_user_info" @click="onAction('EDIT')">Update</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import __C from '@/primitives/_constants_'
import IconAdd from '@/assets/icons/add_box-24px.svg'
import IconHelp from '@/assets/icons/help-24px.svg'
// D:\Workspace\project\vue\ikwyl\src\assets\icons\help_outline-24px.svg

export default {
  name: 'form-user-info',
  components: {
    IconAdd,
    IconHelp
  },
  data: () => ({
    buildingOptions: [
      { text: '경동 미르웰', value: '경동 미르웰' },
      { text: '경동 미르웰 플러스', value: '경동 미르웰 플러스' }
    ],
    isAddSuccess: '',
    mode: ''
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
        console.log(`TEST SELECT`, val)
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
