import {GET_ALL_FILES, ADD_NEW_FILE,REMOVE_FILE_BY_ID,SUMMARIZE_TEXT} from '../actions/fileAction';

const initialState = {
    files:[],
    textSummary:'',
    suggestedQuestions:[],
    
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_FILES:
            return {
                ...state,
            files:action.payload,
            };
        case REMOVE_FILE_BY_ID:
            return {
                ...state,
                files: state.files.filter(file=> file._id !== action.payload)
            }
        case SUMMARIZE_TEXT:
            return {
                ...state,
            textSummary: action.payload.summary,
            suggestedQuestions: action.payload.questions
            }
        case ADD_NEW_FILE:
            const newFile = action.payload.data;

            const updatedFilesArray = [...state.files,newFile]


            return {
                ...state,
                files:updatedFilesArray
            }
        
        default:
            return state;
    }
};