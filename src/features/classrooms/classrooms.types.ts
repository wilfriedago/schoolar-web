import type { Traceable } from '@/shared/types'

export interface Classroom extends Traceable {
  name: string
  description?: string
  capacity: number
}

export interface CreateClassroomDTO {
  name: string
  description?: string
}

export interface UpdateClassroomDTO extends CreateClassroomDTO {
  id: string
}
