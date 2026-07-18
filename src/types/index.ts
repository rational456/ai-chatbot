export interface Message{
    id:string
    role:'user'| 'assistant'
    content:string
    timestamp:number
    isStreaming?:boolean
}
export interface Session{
    id:string
    title:string
    messages:Message[]
    createdAt:number
    updatedAt:number
}
export interface ChatSettings{
    apiKey:string
    model:string
    temperature:number
    maxTokens:number
}