import type { Course } from '@/features/courses'
import type { Traceable } from '@/shared/interfaces'

export interface Subject extends Traceable {
  name: string
  description: string
  courses: Course[]
}

export interface CreateSubjectDTO {
  name: string
  description?: string
}

export interface UpdateSubjectDTO extends CreateSubjectDTO {
  id: string
}
