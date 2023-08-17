import type { Group } from '@/features/groups'
import type { Session } from '@/features/sessions'
import type { Subject } from '@/features/subjects'
import type { Traceable } from '@/shared/interfaces'

export interface Course extends Traceable {
  name: string
  description: string
  hours: number
  subject: Subject
  group: Group
  sessions: Array<Session>
}

export interface CreateCourseDTO {
  name: string
  description: string
  hours: number
  subjectId: string
  groupId: string
}

export interface UpdateCourseDTO extends Partial<CreateCourseDTO> {
  id: string
}
