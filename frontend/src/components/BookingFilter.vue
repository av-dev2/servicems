<template>
  <div class="flex justify-around w-full mt-4 h-15 border-2 rounded-2xl">
    <div class="flex items-center mx-20 gap-20">
      <div
        class="flex-initial w-48 border-2 border-cyan-500/50 shadow-cyan-900/50 rounded-2xl"
      >
        <DatePicker
          v-model="filters['from_date']"
          variant="outline"
          placeholder="Select From Date"
        />
      </div>
      <div
        class="flex-initial w-48 border-2 border-cyan-500/50 shadow-cyan-900/50 rounded-2xl"
      >
        <DatePicker
          v-model="filters['to_date']"
          variant="outline"
          placeholder="Select To Date"
        />
      </div>
      <div
        class="flex-initial w-48 border-2 border-cyan-500/50 shadow-cyan-900/50 rounded-2xl"
      >
        <Link
          class="form-control"
          :value="filters['workshop']"
          doctype="Service Workshop"
          placeholder="Service Workshop"
          @change="(v) => (filters['workshop'] = v)"
        />
      </div>
      <div
        class="flex-initial w-48 border-2 border-cyan-500/50 shadow-cyan-900/50 rounded-2xl"
      >
        <Link
          class="form-control"
          :value="filters['vehicle']"
          doctype="Service Vehicle"
          placeholder="Service Vehicle"
          @change="(v) => (filters['vehicle'] = v)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Link from '../components/controls/Link.vue'

defineProps({
  filters: Object,
})
</script>
