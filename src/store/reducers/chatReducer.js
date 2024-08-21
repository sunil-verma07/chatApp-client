import {
  SEARCH_NEW_QUERY,
  GET_ALL_QUERIES,
  ADD_CHAT_QUERY,
  ADD_CHAT_RESPONSE,
} from "../actions/chatAction";

const initialState = {
  chats: [],
  isTyping:false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_QUERIES:
      return {
        ...state,
        chats: action.payload,
      };
    case SEARCH_NEW_QUERY:
      return {
        ...state,
        chats: state.files.filter((file) => file._id !== action.payload),
      };
    case ADD_CHAT_QUERY:
      return {
        ...state,
        isTyping:true,
        chats: [...state.chats, { ...action.payload, response: null }],
      };
      case ADD_CHAT_RESPONSE:
        return {
            ...state,
            isTyping:false,
            chats: state.chats.map(chat =>
                chat.query === action.payload.query
                    ? { ...chat, response: action.payload.response }
                    : chat
            )
        };
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
