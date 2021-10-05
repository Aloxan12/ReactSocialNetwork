import React from 'react'
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {RootReduxStateType} from "../../redux/redux-store";
import style from '../Common/FormsControls/FormsControls.module.css'

type FormDataType = {
    captcha: string
    email: string
    password: string
    rememberMe: boolean
}
type LoginFormValuesTypeKeys = GetStringKeys<FormDataType>
type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error,captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField<LoginFormValuesTypeKeys>("Email", 'email', [required], Input)}
                {createField<LoginFormValuesTypeKeys>("Password", 'password', [required], Input, {type:'password'})}
                {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, {type:'checkbox'})}

                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", 'captcha', [required], Input, {})}
            </div>
            {error &&<div className={style.someError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType, LoginFormOwnProps>({form: 'login'})(LoginForm)

export const Login = () => {
    const  isAuth = useSelector((state:RootReduxStateType)=> state.auth.isAuth)
    const  captchaUrl = useSelector((state:RootReduxStateType)=> state.auth.captchaUrl)
    const dispatch = useDispatch()

    let onSubmit =(formData: FormDataType)=>{
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    )
}
