<template>
  <EmployeesTree
    v-if="employees.length"
    :employees-tree="nestedTree"
  />

  <EmployeesTree
    v-if="employees.length"
    :employees-tree="tree"
  />

  <EmployeesTreeFromHash
    v-if="employees.length"
    :employees="employeeBoss"
    :employeeGroups="employeesGroups"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import type { Employee } from './general-types'
import EmployeesTree from './components/EmployeesTree.vue'
import EmployeesTreeFromHash from './components/EmployeesTreeFromHash.vue'

const API_URL =
  'https://gist.githubusercontent.com/marianolg/438b24261065ab81bb2f68cb83fc6c57/raw/f5bf84d7f0a36d7b4fde8f3c7be89d58fa2bb6bf/employees.json';

const DESIGN_URL =
  'https://bolder-wakeboard-cf9.notion.site/Org-Chart-14f23a3e379d4b4d96d29cc5808dd623';

const employees = ref<Array<Employee>>([])
const nestedTree = ref<Record<string, Employee>>({})
const tree = ref<Record<string, Employee>>({})

const employeeBoss = computed(() => employees.value.reduce((acc, employee) => {
  if (!employee.reportsTo) {
    acc.push(employee)
  }
  return acc
}, [] as Array<Employee>))


const employeesGroups = computed(() => {
  return employees.value.reduce((groups, employee) => {
    if (!employee.reportsTo) {
      groups[employee.email] = []
    } else {
      if (!groups[employee.reportsTo]) {
        groups[employee.reportsTo] = []
      }
      groups[employee.reportsTo].push(employee)
    }

    return groups
  }, {} as Record<string, Employee[]>)
})

async function fetchEmployees () {
  const response = await fetch(API_URL);
  employees.value = await response.json();

  nestedTree.value = buildTree(employees.value);
  tree.value = createTree(employees.value);
  // console.log({ tree: tree.value, nestedTree: nestedTree.value });
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

function createTree (employees: Array<any>) {
  let root = {} as Record<string, Employee>
  
  const map = new Map(employees.map((employee) => [employee.email, { ...employee, subordinates: {} }]))

  for(const employee of map.values()) {
    const manager = map.get(employee.reportsTo)

    if (manager) {
      manager.subordinates[employee.email] = employee
    } else {
      root[employee.email] = employee
    }
  }

  return root
}

onMounted(fetchEmployees)
</script>

