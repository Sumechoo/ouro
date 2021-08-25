import axios from "axios";
import { GLOBALS } from "../../globals";

export const getPlacement = async (name: string) => {
    const res = await axios.get(`${GLOBALS.EDITOR_URL}/placements`, {params: {placementName: name}});

    return res.data;
}