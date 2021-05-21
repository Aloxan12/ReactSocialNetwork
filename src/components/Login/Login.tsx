import React from 'react'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../Common/FormsControls/FormsControls";
import {required} from "../../redux/util/validators/validators";
import {connect, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {RootReduxStateType} from "../../redux/redux-store";
import style from '../Common/FormsControls/FormsControls.module.css'

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input}
                       name={'email'}
                       placeholder={'Login'}
                       validate={[required]}
                />
            </div>
            <div>
                <Field component={Input}
                       name={'password'}
                       placeholder={'Password'}
                       validate={[required]}
                />
            </div>
            <div>
                <Field component={Input}
                       name={'rememberMe'}
                       type={'checkbox'}
                /> remember me
            </div>
            {props.error &&<div className={style.someError}>{props.error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login = React.memo((props:any) => {
    const  isAuth = useSelector((state:RootReduxStateType)=> state.auth.isAuth)
    let onSubmit =(formData: FormDataType)=>{
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
})

export default connect(null, {login})(Login)