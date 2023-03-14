export interface ProjectProps {
  id?: number
  projectName?: string
  projectSubTitle?: string
  createdAt?: string
  totalTask?: number
  totaltaskConcluded?: number
  totalFiles?: number

  tasks?: []

  files?: []
}
