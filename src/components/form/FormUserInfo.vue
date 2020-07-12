<template>
  <div class="user_info">
    <ui-modal v-if="addModalOpened" v-model="addModalOpened" :width="300" :height="120" :start="lnbWidth">
      <template #slot_title>
        <div v-if="modalMode === 'type_name'">빌딩 추가</div>
        <div v-else>동 추가</div>
      </template>
      <template #slot_contents>
        <div class="modal_wrap__content ">
          <div class="content_user_info">
            <div v-if="modalMode === 'type_name'">
              <label>빌딩</label>
              <input v-model="buildingName2Add" type="text" />
            </div>
            <div v-else>
              <label>동</label>
              <input v-model="buildingNo2Add" type="Number" />
            </div>
            <button @click="onAction4AddProperty(modalMode)">Add</button>
          </div>
          <div
            v-if="!isValid2Add"
            class="msg__error"
            :class="{ type_no: modalMode === 'type_no', type_name: modalMode === 'type_name' }"
          >
            <icon-error class="icon" />입력 값이 올바르지 않습니다.
          </div>
        </div>
      </template>
    </ui-modal>
    <div class="user_info_form_wrapper">
      <div class="title">
        Residence information
        <div><icon-home @click="home()" /></div>
      </div>
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
          </div>
        </div>
        <div class="wrap__btn">
          <button class="btn btn_user_info" @click="onModeEdit()">Edit</button>
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
                  <option v-for="(option, i) in buildingNameOptions" :value="option.value" :key="`building_${i}`">{{
                    option.title
                  }}</option>
                </select>
                <icon-add class="icon" @click="onAddProperty('type_name')" />
              </div>
            </div>
            <div class="wrap__input">
              <label data-label-has-icon="max_floor"><icon-help class="icon" />최고 층</label>
              <input v-model="maxFloor" min="1" type="number" required />
              <div v-if="!isValid.maxFloor && isChecking" class="msg__error">
                <icon-error class="icon" />0보다 큰 수를 입력해주세요.
              </div>
            </div>
            <div class="wrap__input">
              <label data-label-has-icon="max_unit_no"><icon-help class="icon" />층 별 총 호 수</label
              ><input v-model="maxUnitNo" min="1" type="number" />
              <div v-if="!isValid.maxUnitNo && isChecking" class="msg__error">
                <icon-error class="icon" />0보다 크고 13보다 작은 수를 입력해주세요.
              </div>
            </div>
          </div>
          <div class="group group_user_info">
            <div class="title type_sub">Unit Information</div>
            <div class="wrap__input">
              <label>동</label>
              <div class="form_has_add">
                <select v-model="buildingNo">
                  <option v-for="(option, i) in buildingNoOptions" :key="`bdoption_${i}`" :value="option.value">{{
                    option.title
                  }}</option>
                </select>
                <icon-add class="icon" @click="onAddProperty('type_no')" />
              </div>
            </div>
            <div class="wrap__input">
              <label data-label-has-icon="unit"><icon-help class="icon" />호</label>
              <input v-model="unit" minlength="3" min="1" type="number" />
              <div v-if="!isValid.unit && isChecking" class="msg__error type_unit">
                <icon-error class="icon " />100 이상의 수를 입력해주세요.
              </div>
            </div>
          </div>
        </div>
        <div class="wrap__btn">
          <!-- <input type="submit" /> -->
          <button v-if="mode === 'NEW'" class="btn btn_user_info" :disabled="isDisabled" @click="onAction('ADD')">
            Update
          </button>
          <button v-else-if="mode === 'MOD'" class="btn_user_info" :disabled="isDisabled" @click="onAction('EDIT')">
            Update
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import __C from '@/primitives/_constants_'
import IconAdd from '@/assets/icons/add_box-24px.svg'
import IconError from '@/assets/icons/error_outline-24px.svg'
import IconHelp from '@/assets/icons/help-24px.svg'
import IconHome from '@/assets/icons/home.svg'
import UiModal from '@/components/ui/Modal.vue'
// D:\Workspace\project\vue\ikwyl\src\assets\icons\help_outline-24px.svg

export default {
  name: 'form-user-info',
  components: {
    IconAdd,
    IconError,
    IconHelp,
    UiModal,
    IconHome
  },
  data: () => ({
    addModalOpened: false,
    buildingName2Add: '',
    buildingNo2Add: '',
    disabled: false,
    isAddSuccess: '',
    mode: '',
    modalMode: '',
    isChecking: false,
    isValid: {
      unit: true,
      maxFloor: true,
      maxUnitNo: true
    },
    isValid2Add: true
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['userInfo', 'buidingNames', 'buidingNums']),
    ...mapState(__C.STORE.NAMESPACE.APPLICATION, ['window']),
    buildingNameOptions() {
      return this.buidingNames
    },
    buildingNoOptions() {
      return this.buidingNums
    },
    isDisabled() {
      return this.userInfo.address == '' ||
        this.userInfo.buildingname == '' ||
        isNaN(this.userInfo.buildingno) ||
        isNaN(this.userInfo.floor) ||
        isNaN(this.userInfo.maxunitno) ||
        isNaN(this.userInfo.maxfloor) ||
        isNaN(this.userInfo.unit)
        ? true
        : false
    },
    isVisible() {
      return this.buidingNames.length !== 0 && this.buidingNums.length !== 0
    },
    lnbWidth() {
      return this.window.width > 1439.98 ? 144 : 48
    },
    unitFloor() {
      return Math.floor(this.unit / 100)
    },
    address: {
      get() {
        return this.userInfo.address
      },
      set(val) {
        this.setUserInfo({ key: 'address', value: val })
      }
    },
    buildingName: {
      //* TEXT
      get() {
        return this.userInfo.buildingname
      },
      set(val) {
        this.setUserInfo({ key: 'buildingname', value: val })
      }
    },
    buildingNo: {
      //* NUM
      get() {
        return this.userInfo.buildingno
      },
      set(val) {
        this.setUserInfo({ key: 'buildingno', value: parseFloat(val) })
      }
    },
    maxFloor: {
      //* NUM
      get() {
        return this.userInfo.maxfloor
      },
      set(val) {
        this.isValid.maxFloor = val <= 0 || typeof Number(val) !== 'number' ? false : true
        this.setUserInfo({ key: 'maxfloor', value: parseFloat(val) })
      }
    },
    maxUnitNo: {
      //* NUM _DONE
      get() {
        return this.userInfo.maxunitno
      },
      set(val) {
        this.isValid.maxUnitNo = val <= 0 || val > 12 || typeof Number(val) !== 'number' ? false : true
        this.setUserInfo({ key: 'maxunitno', value: parseFloat(val) })
      }
    },
    unit: {
      //* NUM _DONE
      get() {
        return this.userInfo.unit
      },
      set(val) {
        this.isValid.unit = val < 100 || val.length < 3 || typeof Number(val) !== 'number' ? false : true
        this.setUserInfo({ key: 'unit', value: parseFloat(val) })
        this.setUserInfo({ key: 'floor', value: this.unitFloor })
      }
    }
  },
  watch: {
    // addModalOpened: {
    //   handler(val) {
    //     if (val === true) return
    //     if (val === false) {
    //     }
    //   },
    //   deep: true
    // }
  },
  mounted() {
    this.getUserInfoFromServer(mode => {
      this.mode = mode
    })

    this.getBuildingNamesFromserver()
    this.getBuildingNoFromserver()
  },
  methods: {
    ...mapMutations(__C.STORE.NAMESPACE.ACCOUNT, ['setUserInfo']),
    ...mapActions(__C.STORE.NAMESPACE.ACCOUNT, [
      'addUserInfo2Server',
      'addBuildingNames2Server',
      'addBuildingNums2Server',
      'getBuildingNamesFromserver',
      'addBuildingNoFromserver',
      'getBuildingNoFromserver',
      'getUserInfoFromServer',
      'upUserInfo2Server'
    ]),
    home() {
      this.$router.push({ path: '/main' })
    },
    onAction(mod) {
      this.isChecking = true
      let _isDisabled = Object.keys(this.isValid).some(k => !this.isValid[k])
      if (_isDisabled) return
      switch (mod) {
        case __C.BUTTON.EDIT_MODE_ADD:
          this.addUserInfo2Server()
          this.mode = __C.FORM.EDIT_MODE_READ
          break
        case __C.BUTTON.EDIT_MODE_EDIT:
          this.upUserInfo2Server()
          this.mode = __C.FORM.EDIT_MODE_READ
          break
        case __C.BUTTON.EDIT_MODE_DEL:
          console.log('DELETE')
          break
      }
    },
    async onAction4AddProperty() {
      try {
        if (this.modalMode === 'type_name') {
          this.isValid2Add = this.buildingName2Add.length <= 0 ? false : true
          if (!this.isValid2Add) return
          let res = await this.addBuildingNames2Server({ buildingName: this.buildingName2Add })
          if (res) this.getBuildingNamesFromserver()
        } else if (this.modalMode === 'type_no') {
          this.isValid2Add = this.buildingNo2Add <= 0 || typeof Number(this.buildingNo2Add) !== 'number' ? false : true
          if (!this.isValid2Add) return
          let res = await this.addBuildingNums2Server({ buildingNo: this.buildingNo2Add })
          if (res) this.getBuildingNoFromserver()
        }
        this.modalMode = ''
        this.isValid2Add = true
      } catch (err) {
        console.log(err)
      }
    },
    onAddProperty(type) {
      this.modalMode = type
      this.addModalOpened = true
    },
    onModeEdit() {
      this.isChecking = false
      this.mode = __C.FORM.EDIT_MODE_MOD
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/ui/userInfo.scss';
</style>
