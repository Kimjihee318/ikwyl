export default {
  watch: {
    Canvas: {
      handler(val) {
        if (!val || Object.keys(val).length === 0) return
        this.register(this.draw)
      },
      deep: true
    }
  }
}
