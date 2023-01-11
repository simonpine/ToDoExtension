interface tags{
    value: string,
    color: number,
}


export interface taskInterface{
    task: string,
    compleat: boolean,
    description?: string,
    priority: number,
    tags?: tags[],
    dateCreation: string,
    id: number,
}