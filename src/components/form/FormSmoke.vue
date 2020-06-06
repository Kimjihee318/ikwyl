<template>
  <div class="form-sh">
    <div class="form-sh-title">
      <date-picker />
    </div>
    <div class="form-sh-contents">
      <!-- <sh-quantity /> -->
    </div>
    <button @click="onUpload">Upload</button>
  </div>
</template>

<script>
import DatePicker from '@/components/ui/DatePicker.vue'
export default {
  name: 'form-sh-smoke',
  components: {
    DatePicker
  },
  data: () => ({
    date: null,
    quantity: null
  }),
  methods: {
    onUpload() {},
    putUpload() {}
  }
}
</script>

<style></style>
