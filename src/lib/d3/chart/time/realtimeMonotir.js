export default {
  watch: {
    DataItems: {
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
    Chart: {
      handler(val) {
        if (!val || Object.keys(val).length === 0) return
        this.register(this.draw)
      },
      deep: true
    },
    Circle: {
      handler(val) {
        if (!val || Object.keys(val).length === 0) return
        this.register(this.draw)
      },
      deep: true
    }
  }
}
