export type IndexedObject<T = any> = Record<string, T>

export interface Employee {
  email: string
  firstName: string
  lastName: string
  reportsTo: string | null,
  subordinates?: {}
}
