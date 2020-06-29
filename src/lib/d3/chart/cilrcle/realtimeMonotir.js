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
    Chart: {
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
    SelectedDate: {
      handler(val) {
        if (!val) return
        this.register(this.draw)
      },
      deep: true
    }
  }
}
