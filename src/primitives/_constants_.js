let CONSTANTS = function() {
  return {
    ACTION: {
      ADD_MODE_ROW: 'ROW',
      ADD_MODE_LIST: 'LIST'
    },
    BUTTON: {
      EDIT_MODE_EDIT: 'EDIT',
      EDIT_MODE_ADD: 'ADD',
      EDIT_MODE_ADD_LIST: 'ADD_LIST',
      EDIT_MODE_DEL: 'DEL'
    },
    FULL_ACCESS_PERMISSION: {
      SYSTEM: 'SYS_ADMIN',
      SERVICE: 'SVC_ADMIN'
    },
    FORM: {
      EDIT_MODE_MOD: 'MOD',
      EDIT_MODE_NEW: 'NEW',
      EDIT_MODE_READ: 'READ'
    },
    LOCAL_STORAGE_NAME: {
      ACCOUNT: 'IKWYL_ACCOUNT'
    },
    STORE: {
      NAMESPACE: {
        ACCOUNT: 'account',
        APPLICATION: 'application',
        REPORT: 'report',
        SYSTEM: 'system'
      }
    },
    URL: {
      HOST_URL: `http://localhost:3000`
    }
  }
}

export default CONSTANTS()
