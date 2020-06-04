export const SafeIdMixin = {
  data: () => ({
    localId: null
  }),
  computed: {
    safeId() {
      // Computed property that returns a dynamic function for creating the ID.
      // Reacts to changes in both .id and .localId_ And regens a new function
      // const id = this.id || this.localId_ || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      const id =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)

      // We return a function that accepts an optional suffix string
      // So this computed prop looks and works like a method!
      // But benefits from Vue's Computed prop caching
      const fn = suffix => {
        // if (!id) {
        //   return null
        // }
        suffix = String(suffix || '').replace(/\s+/g, '_')
        return suffix ? id + '_' + suffix : id
      }
      return fn
    }
  }
}
