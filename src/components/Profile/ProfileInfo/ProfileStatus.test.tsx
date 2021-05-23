import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component",() => {
    test("Status from props should be in state", () => {
        const component = create(<ProfileStatus status='its me' updateStatus={()=>{}} />);
        const instance = component.getInstance();
    });
});