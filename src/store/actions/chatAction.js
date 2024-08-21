import {baseUrl} from '../baseUrl.js'
export const SEARCH_NEW_QUERY = 'SEARCH_NEW_QUERY';
export const GET_ALL_QUERIES = 'GET_ALL_QUERIES';
export const ADD_CHAT_QUERY = 'ADD_CHAT_QUERY';
export const ADD_CHAT_RESPONSE = 'ADD_CHAT_RESPONSE';


export const addChatQuery = (query) => ({
    type: ADD_CHAT_QUERY,
    payload: query,
});

export const addChatResponse = (response) => ({
    type: ADD_CHAT_RESPONSE,
    payload: response,
});


export const searchNewQuery = (query,id) => {
    return async (dispatch) => {

        dispatch(addChatQuery({ query, createdAt: new Date().toISOString() }));

        // Step 2: Wait for 2 seconds before making the API call
        await new Promise(resolve => setTimeout(resolve, 2000));

 
      try {
        const response = await fetch(`${baseUrl}/query/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Ensure the correct Content-Type header is set
          },
          body: JSON.stringify({ query ,id}), 
        });
  
        if (!response.ok) {
          throw new Error('Something went wrong while adding notebook!');
        }
  
        const resData = await response.json();

  
        dispatch(addChatResponse({ ...resData.newQuery, createdAt: new Date().toISOString() }));

      } catch (err) {
        console.error(err);
        throw err;
      }
    };
  };

  


  export const getAllQueries = (id) => {
    return async (dispatch) => {
  
      try {
        const response = await fetch(`${baseUrl}/query/${id}`, {
          method: 'GET',
        });
  
        if (!response.ok) {
          throw new Error('Something went wrong while fetching notebooks!');
        }
  
        const resData = await response.json();
    
        dispatch({
          type: GET_ALL_QUERIES,
          payload: resData.chats,
        });
      } catch (err) {
        throw err;
      }
    };
  };

//   export const removeFile = (id) => {
//     return async (dispatch) => {
  
//       try {
//         const response = await fetch(`${baseUrl}/texts/${id}`, {
//           method: 'delete',
//         });
  
//         if (!response.ok) {
//           throw new Error('Something went wrong while removing file!');
//         }
      
//         dispatch({
//           type: REMOVE_FILE_BY_ID,
//           payload: id,
//         });
//       } catch (err) {
//         throw err;
//       }
//     };
//   };

//   export const summarizeText = (id) => {
//     return async (dispatch) => {
  
//       try {
//         const response = await fetch(`${baseUrl}/texts/summarize/${id}`, {
//           method: 'get',
//         });
  
//         if (!response.ok) {
//           throw new Error('Something went wrong while fetching files!');
//         }
  
//         const resData = await response.json();
    
//         dispatch({
//           type: SUMMARIZE_TEXT,
//           payload: resData,
//         });
//       } catch (err) {
//         throw err;
//       }
//     };
//   };
