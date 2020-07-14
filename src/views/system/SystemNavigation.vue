<template>
  <div>
    <ul class="system_nav_list">
      <li v-for="(nav, i) in systemNav" :key="`system_nav_${i}`" @click="onMove(nav)">
        <component class="icon" :is="nav.icon" />
        {{ nav.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import IconUser from '@/assets/icons/perm_contact_calendar-24px.svg'
import IconList from '@/assets/icons/assessment-24px.svg'
export default {
  name: 'system-navigation',
  components: {
    IconUser,
    IconList
  },
  data: () => ({
    systemNav: [
      { name: 'User Information Board', path: '/system/userinfo', icon: 'IconUser' },
      { name: 'Daily SHS Board', path: '/system/dailyshs', icon: 'IconList' },
      { name: 'Residence Data', path: '/system/residence', icon: 'IconList' }
    ]
  }),
  methods: {
    onMove(item) {
      if (this.$router.history.current.fullPath === item.path) return
      this.$router.push({ path: item.path })
    }
  }
}
</script>
<style lang="scss" scoped>
.system_nav_list {
  padding: 0;
  li {
    list-style-type: none;
    margin-bottom: 0.5rem;
    padding: 0.2rem;
  }
}
.icon {
  fill: $blue_alpha01;
}
</style>
