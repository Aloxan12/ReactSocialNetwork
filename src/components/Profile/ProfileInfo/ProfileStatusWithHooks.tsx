import React, {ChangeEvent, useState} from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks = (props: ProfileStatusType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState(props.status)
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
                <div>
                    <span onDoubleClick={activeEditMode}>{props.status || '----'}</span>
                </div>}
            {editMode &&
            <div>
                <input value={status} onChange={onChangeStatus} onBlur={deactivateEditMode} autoFocus/>
            </div>}

        </div>
    )
}

export default ProfileStatusWithHooks;