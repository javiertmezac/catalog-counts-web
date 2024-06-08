export interface Persona {
    id: number,
    name: string,
    lastname: string,
    status: boolean,
    registration: string 
}

export interface PersonaResponse extends Persona {
    completeName: string
}