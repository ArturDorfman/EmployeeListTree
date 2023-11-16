<template>
  <ul>
    <li
      v-for="employee in employeesTree"
      :key="employee.email"
    >
      <span>{{ createEmployeeNickName(employee) }}</span>
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

function createEmployeeNickName ({ firstName, lastName, email }: Employee) {
  return `${firstName} ${lastName}<${email}>`
}
</script>
