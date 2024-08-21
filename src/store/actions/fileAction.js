import {baseUrl} from '../baseUrl.js'
export const ADD_NEW_FILE = 'ADD_NEW_FILE';
export const GET_ALL_FILES = 'GET_ALL_FILES';
export const REMOVE_FILE_BY_ID = 'REMOVE_FILE_BY_ID';
export const SUMMARIZE_TEXT = 'SUMMARIZE_TEXT';

export const addNewFile = (file,id) => {
    return async (dispatch) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('id',id)
  
      try {
        const response = await fetch(`${baseUrl}/texts/upload`, {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Something went wrong while uploading the file!');
        }
  
        const resData = await response.json();
  
        dispatch({
          type: ADD_NEW_FILE,
          payload: resData,
        });
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
  };

  export const addNewNotes = (fileName, text,id) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`${baseUrl}/texts/save`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Ensure the correct Content-Type header is set
          },
          body: JSON.stringify({ fileName, text ,id}), // Convert the data to a JSON string
        });
  
        if (!response.ok) {
          throw new Error('Something went wrong while uploading the file!');
        }
  
        const resData = await response.json();
  
        dispatch({
          type: ADD_NEW_FILE, // Replace this with the correct action type if needed
          payload: resData, // Ensure the response data is correctly assigned
        });
      } catch (err) {
        console.error(err);
        throw err; // Rethrow the error for further handling if necessary
      }
    };
  };
  


  export const getAllFiles = (id) => {
    return async (dispatch) => {
  
      try {
        const response = await fetch(`${baseUrl}/texts/${id}`, {
          method: 'get',
        });
  
        if (!response.ok) {
          throw new Error('Something went wrong while fetching files!');
        }
  
        const resData = await response.json();
    
        dispatch({
          type: GET_ALL_FILES,
          payload: resData,
        });
      } catch (err) {
        throw err;
      }
    };
  };

  export const removeFile = (id) => {
    return async (dispatch) => {
  
      try {
        const response = await fetch(`${baseUrl}/texts/${id}`, {
          method: 'delete',
        });
  
        if (!response.ok) {
          throw new Error('Something went wrong while removing file!');
        }
      
        dispatch({
          type: REMOVE_FILE_BY_ID,
          payload: id,
        });
      } catch (err) {
        throw err;
      }
    };
  };

  export const summarizeText = (id) => {
    return async (dispatch) => {
  
      try {
        const response = await fetch(`${baseUrl}/texts/summarize/${id}`, {
          method: 'get',
        });
  
        if (!response.ok) {
          throw new Error('Something went wrong while fetching files!');
        }
  
        const resData = await response.json();
    
        dispatch({
          type: SUMMARIZE_TEXT,
          payload: resData,
        });
      } catch (err) {
        throw err;
      }
    };
  };
