export interface TODOS {
  [key: string]: TODO
}

export interface TODO {
  id: string,
  name: string,
  deadline: string,
  status: string,
  implementors: Array<string>
}