export default {
  watch: {
    DataItems: {
      handler(val) {
        if (!val || val.length === 0) return
        this.register(this.draw)
      },
      deep: true
    },
    BackgroundItem: {
      handler(val) {
        if (!val || val.length === 0) return
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
    UserInfo: {
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
    }
  }
}
