import axios from "axios";
import { GLOBALS } from "../../globals";

export const getPlacementsList = async () => {
    const res = await axios.get(`${GLOBALS.EDITOR_URL}/placements/list`);

    return res.data;
}