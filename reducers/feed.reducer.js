import { FEED_DATA_STORE, SET_DISPLAY_MODE } from "../actionType";

const initialState = {
    feed_Data: [],
    displayDarkMode: false

}

export const feedReducer = (prevState = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case FEED_DATA_STORE:
            return {
                ...prevState,
                feed_Data: prevState.feed_Data.concat(payload.feed_Data)


            }

        case SET_DISPLAY_MODE:
            return {
                ...prevState,
                displayDarkMode: payload.displayDarkMode


            }


        default:
            return prevState;
    }

}