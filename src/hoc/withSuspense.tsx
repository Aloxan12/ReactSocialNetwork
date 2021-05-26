import React, {ComponentType} from "react";


export function withSuspense<WCP>(WrappedComponent: ComponentType<WCP>) {
    return (props: WCP) => {
        return <React.Suspense fallback={<div>loading...</div>}>
            <WrappedComponent {...props} />
        </React.Suspense>
    }
}
