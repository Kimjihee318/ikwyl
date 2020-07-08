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
                  <option v-for="(option, i) in buildingNameOptions" :value="option.value" :key="`building_${i}`">{{
                    option.title
                  }}</option>
                </select>
                <icon-add class="icon" @click="onAddProperty('type_name')" />
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
      <ui-modal v-if="modalOpened" v-model="modalOpened" :width="300" :height="100" :start="lnbWidth">
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
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import __C from '@/primitives/_constants_'
import IconAdd from '@/assets/icons/add_box-24px.svg'
import IconHelp from '@/assets/icons/help-24px.svg'
import UiModal from '@/components/ui/Modal.vue'
// D:\Workspace\project\vue\ikwyl\src\assets\icons\help_outline-24px.svg

export default {
  name: 'form-user-info',
  components: {
    IconAdd,
    IconHelp,
    UiModal
  },
  data: () => ({
    buildingName2Add: '',
    buildingNo2Add: '',
    isAddSuccess: '',
    mode: '',
    modalMode: '',
    modalOpened: false
  }),
  computed: {
    ...mapState(__C.STORE.NAMESPACE.ACCOUNT, ['userInfo', 'buidingNames', 'buidingNums']),
    ...mapState(__C.STORE.NAMESPACE.APPLICATION, ['window']),
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
    buildingNameOptions() {
      return this.buidingNames
    },
    buildingNoOptions() {
      return this.buidingNums
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
    isVisible() {
      return this.buidingNames.length !== 0 && this.buidingNums.length !== 0
    },
    lnbWidth() {
      return this.window.width > 1439.98 ? 144 : 48
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
  watch: {
    modalOpened: {
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
      this.modalOpened = true
    },
    onAction4AddProperty() {
      if (this.modalMode === 'type_name') {
        this.addBuildingNames2Server({ buildingName: this.buildingName2Add })
      } else if (this.modalMode === 'type_no') {
        this.addBuildingNums2Server({ buildingNo: this.buildingNo2Add })
      }
      this.modalMode = ''
      this.modalOpened = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/ui/userInfo.scss';
</style>
