"use client"
// import { Loading } from "@nextui-org/react";
import {ClipLoader} from "react-spinners";
import {useState} from "react";
export default function Loading() {
    let [color, setColor] = useState("#ffffff");
    // You can add any UI inside Loading, including a Skeleton.
    return <ClipLoader
        color={color}
        // loading={loading}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
    />
}