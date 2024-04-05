import Cookies from "js-cookie"


export const getAccessToken = () =>{
    return Cookies.get("access_token") || null
}
export const saveAccessToken = ( access_token:string) =>{
    Cookies.set("access_token",access_token)
}


