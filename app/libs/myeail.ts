let myEmail:string | undefined;
export const setEmail = (email : string | undefined)=>{
myEmail = email;
}

export const getEmail = ()=> myEmail;
