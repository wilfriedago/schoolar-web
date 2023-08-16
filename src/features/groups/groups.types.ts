import type { Course } from '@/features/courses'
import type { Student } from '@/features/students'
import type { Traceable } from '@/shared/types'

export interface Group extends Traceable {
  name: string
  description: string
  courses: Course[]
  students: Student[]
}

export interface CreateGroupDTO {
  name: string
  description?: string
}

export interface UpdateGroupDTO extends CreateGroupDTO {
  id: string
}
