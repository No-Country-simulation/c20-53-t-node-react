import { $Enums } from '@prisma/client'

export interface User {
  id: string
  username: string
  email: string
  Role: $Enums.Role
}
