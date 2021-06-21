import React from "react";
import { Paginator } from "../Common/Paginator/Paginator";
import {UsersPropsType} from "./UsersContainer";
import {User} from "./User";
import {Form, Formik, Field} from "formik";
import {FilterType, getUsers} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getPageSizeSelector, getUsersFilter} from "../../redux/users-selectors";



export const Users = (props: UsersPropsType) => {
    const dispatch = useDispatch()
    const pageSize = useSelector(getPageSizeSelector)
    let pageCount = Math.ceil(props.totalUsersCounts / props.pageSize)

    let pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }
    return (
        <div>
            {
                props.users.map(u => <User followingIsProgress={props.followingIsProgress}
                                           unfollow={props.unfollow}
                                           follow={props.follow}
                                           user={u}
                                           key={u.id}
                />)
            }
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <Paginator currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged}
                       pageSize={props.pageSize}
                       totalItemCounts={props.totalUsersCounts}  />
        </div>
    )
}

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type FriendFormType = 'true' | 'false' | 'null'

type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const filter = useSelector(getUsersFilter)
    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }

        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return <div>
        <Formik
            enableReinitialize
            initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>

                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})
