<template>
  <EmployeesTree :employees-tree="nestedTree" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Employee } from './general-types'
import EmployeesTree from './components/EmployeesTree.vue'

const API_URL =
  'https://gist.githubusercontent.com/marianolg/438b24261065ab81bb2f68cb83fc6c57/raw/f5bf84d7f0a36d7b4fde8f3c7be89d58fa2bb6bf/employees.json';

const DESIGN_URL =
  'https://bolder-wakeboard-cf9.notion.site/Org-Chart-14f23a3e379d4b4d96d29cc5808dd623';

const employees = ref<Array<Employee>>([])
const nestedTree = ref<Record<string, Employee>>({})

async function fetchEmployees () {
  const response = await fetch(API_URL);
  employees.value = await response.json();
  nestedTree.value = buildTree(employees.value);
}

function buildTree(employees: Array<Employee>, managerEmail: string | null = null) {
  return employees.reduce((tree, employee) => {
    if (employee.reportsTo === managerEmail) {
      tree[employee.email] = {
        ...employee,
        subordinates: buildTree(employees, employee.email)
      }
    }

    return tree
  }, {} as Record<string, Employee>)
}

onMounted(fetchEmployees)
</script>

