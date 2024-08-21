import {ADD_NEW_NOTEBOOK,GET_ALL_NOTEBOOKS} from '../actions/notebookAction';

const initialState = {
    notebooks:[],
    textSummary:'',
    suggestedQuestions:[],
    
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_NOTEBOOKS:
            return {
                ...state,
            notebooks:action.payload,
            };
        // case REMOVE_FILE_BY_ID:
        //     return {
        //         ...state,
        //         files: state.files.filter(file=> file._id !== action.payload)
        //     }
        // case SUMMARIZE_TEXT:
        //     return {
        //         ...state,
        //     textSummary: action.payload.summary,
        //     suggestedQuestions: action.payload.questions
        //     }
        // case ADD_NEW_NOTEBOOK:

        //     return {
        //         ...state,
        //         notebooks:
        //     }
        
        default:
            return state;
    }
};