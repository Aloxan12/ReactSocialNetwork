import React, {ChangeEvent, useEffect, useState} from 'react';
import classes from "./ProfileInfo.module.css"

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks = React.memo( (props: ProfileStatusType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState(props.status)
    useEffect(()=>{
        setStatus(props.status)
    },[props.status])
    const activeEditMode = ()=>{
        setEditMode(true)
    }
    const deactivateEditMode = ()=>{
        setEditMode(false)
        props.updateStatus(status)
    }
    const onChangeStatus =(e: ChangeEvent<HTMLInputElement>)=>{
        setStatus(e.currentTarget.value)
    }
    return (
        <div>
            {!editMode &&
                <div className={classes.status}>
                    <b>Status: </b><span onDoubleClick={activeEditMode}>{props.status || '----'}</span>
                </div>}
            {editMode &&
            <div>
                <input value={status} onChange={onChangeStatus} onBlur={deactivateEditMode} autoFocus className={classes.statusInput}/>
            </div>}

        </div>
    )
})

export default ProfileStatusWithHooks;