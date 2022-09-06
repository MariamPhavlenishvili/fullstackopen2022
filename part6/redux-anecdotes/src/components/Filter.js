import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
    const dispatch = useDispatch();

    const filter = (keyword) => {
        dispatch(setFilter(keyword));
    }

    return (
        <div>
            filter <input type="text" name="filter" onChange={(e) => filter(e.target.value)}/>
        </div>
    )
}

export default Filter