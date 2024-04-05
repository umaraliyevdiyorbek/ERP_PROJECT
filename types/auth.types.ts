export interface IGlobalAuthForm{
    data?:FormDataEntryValue | null,
    role:FormDataEntryValue | null,
    username:FormDataEntryValue | null,
    password:FormDataEntryValue | null,
    autocomplete?:string
}