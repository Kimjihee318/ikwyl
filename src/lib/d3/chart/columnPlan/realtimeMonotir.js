export default {
  watch: {
    DataItems: {
      handler() {
        this.register(this.draw)
      },
      deep: true
    },
    Canvas: {
      handler(val) {
        if (!val || Object.keys(val).length === 0) return
        this.register(this.draw)
      },
      deep: true
    },
    Rect: {
      handler(val) {
        if (!val || Object.keys(val).length === 0) return
        this.register(this.draw)
      },
      deep: true
    },
    Scale: {
      handler(val) {
        if (!val || Object.keys(val).length === 0) return
        this.register(this.draw)
      },
      deep: true
    },
    Unit: {
      handler(val) {
        if (!val || Object.keys(val).length === 0) return
        this.register(this.draw)
      },
      deep: true
    },
    UserInfo: {
      handler(val) {
        if (!val || Object.keys(val).length === 0) return
        this.register(this.draw)
      },
      deep: true
    }
  }
}
