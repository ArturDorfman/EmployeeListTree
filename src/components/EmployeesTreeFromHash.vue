<template>
  <ul>
    <li
      v-for="employee in employees"
      :key="employee.email"
    >
      <p>{{ employee.firstName }} {{ employee.lastName }}&lt;{{ employee.email }}&gt;</p>
      <EmployeesTreeFromHash
        v-if="employeeGroups[employee.email]"
        :employees="employeeGroups[employee.email]"
        :employeeGroups="employeeGroups"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Employee } from '../general-types'

defineProps<{
  employees: Array<Employee>
  employeeGroups: Record<string, Employee[]>
}>()
</script>
