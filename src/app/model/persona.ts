export interface Persona {
    id: number,
    name: string,
    lastname: string,
    status: boolean,
    registration: string 
}

export const PersonaUtils = {
    isEqual(a: Persona, b: Persona): boolean {
      let r = (
        a.id === b.id &&
        a.name === b.name &&
        a.lastname === b.lastname &&
        a.registration === b.registration &&
        a.status === b.status
      );
      console.log('comparison response: ', r)
      return r;
    },
};
