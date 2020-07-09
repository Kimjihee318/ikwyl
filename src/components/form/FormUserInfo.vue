<template>
  <div class="user_info">
    <ui-modal v-if="addModalOpened" v-model="addModalOpened" :width="300" :height="100" :start="lnbWidth">
      <template #slot_title>
        <div v-if="modalMode === 'type_name'">빌딩 추가</div>
        <div v-else>동 추가</div>
      </template>
      <template #slot_contents>
        <div class="modal_wrap__content type_user_info">
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
      </template>
    </ui-modal>
    <div class="user_info_form_wrapper">
      <div class="title">Residence information</div>
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
          <button class="btn btn_user_info" @click="onAction('MOD')">Edit</button>
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
              <label data-label-has-icon="max_floor"><icon-help class="icon" />최고 층 </label>
              <input v-model="maxFloor" min="1" type="number" required />
              <div v-if="!isValid.maxFloor" class="msg__error">
                <icon-error class="icon" />0보다 큰 수를 입력해주세요.
              </div>
            </div>
            <div class="wrap__input">
              <label data-label-has-icon="max_unit_no"><icon-help class="icon" />층 별 총 호 수</label
              ><input v-model="maxUnitNo" min="1" type="number" />
              <div v-if="!isValid.maxUnitNo" class="msg__error">
                <icon-error class="icon" />0보다 큰 수를 입력해주세요.
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
              <div v-if="!isValid.unit" class="msg__error"><icon-error class="icon" />100 단위 수를 입력해주세요.</div>
            </div>
          </div>
        </div>
        <div class="wrap__btn">
          <!-- <input type="submit" /> -->
          <button v-if="mode === 'NEW'" class="btn btn_user_info" @click="onAction('ADD')">Update</button>
          <button v-else-if="mode === 'MOD'" class="btn_user_info" :disabled="disabled" @click="onAction('EDIT')">
            이거
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
import UiModal from '@/components/ui/Modal.vue'
// D:\Workspace\project\vue\ikwyl\src\assets\icons\help_outline-24px.svg

export default {
  name: 'form-user-info',
  components: {
    IconAdd,
    IconError,
    IconHelp,
    UiModal
  },
  data: () => ({
    addModalOpened: false,
    buildingName2Add: '',
    buildingNo2Add: '',
    disabled: false,
    isAddSuccess: '',
    mode: '',
    modalMode: '',
    isValid: {
      unit: true,
      floor: true,
      maxFloor: true,
      maxUnitNo: true
    }
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
        console.log(this.isValid.maxFloor)
        this.setUserInfo({ key: 'maxfloor', value: parseFloat(val) })
      }
    },
    maxUnitNo: {
      //* NUM _DONE
      get() {
        return this.userInfo.maxunitno
      },
      set(val) {
        this.isValid.maxUnitNo = val <= 0 || typeof Number(val) !== 'number' ? false : true
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
    addModalOpened: {
      handler(val) {
        if (val === true) return
        if (val === false) {
          this.getBuildingNamesFromserver()
          this.getBuildingNoFromserver()
        }
      },
      deep: true
    }
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
    onAction(mod) {
      console.log(`IN ACTION`)
      switch (mod) {
        case __C.BUTTON.EDIT_MODE_ADD:
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
    },
    onAddProperty(type) {
      this.modalMode = type
      this.addModalOpened = true
    },
    onAction4AddProperty() {
      if (this.modalMode === 'type_name') {
        this.addBuildingNames2Server({ buildingName: this.buildingName2Add })
      } else if (this.modalMode === 'type_no') {
        this.addBuildingNums2Server({ buildingNo: this.buildingNo2Add })
      }
      this.modalMode = ''
      this.addModalOpened = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/ui/userInfo.scss';
</style>
