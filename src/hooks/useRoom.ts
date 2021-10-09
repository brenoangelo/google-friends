import { useContext } from "react";
import { RoomContext } from "../contexts/RoomContext";

export function useRoom(){
    const value = useContext(RoomContext)

    return value;
}