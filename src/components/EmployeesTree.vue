<template>
  <ul>
    <li
      v-for="employee in employeesTree"
      :key="employee.email"
    >
      <p>{{ employee.firstName }} {{ employee.lastName }}&lt;{{ employee.email }}&gt;</p>
      <EmployeesTree
        v-if="employee.subordinates && Object.keys(employee.subordinates).length"
        :employees-tree="employee.subordinates || {}"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Employee } from '../general-types'

defineProps<{
  employeesTree: Record<string, Employee>
}>()
</script>
