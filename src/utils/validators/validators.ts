export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) =>{
    if(!!value)return undefined

    return 'Filed is required'
}
export const maxLengthCreator =(maxLength:number)=> {
    return (value: any) =>{
        if(value && value.length > 30)return `Max length is ${maxLength} symbols`

        return undefined;
    }
}