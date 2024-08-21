import {baseUrl} from '../baseUrl.js'
export const ADD_NEW_NOTEBOOK = 'ADD_NEW_NOTEBOOK';
export const GET_ALL_NOTEBOOKS = 'GET_ALL_NOTEBOOKS';
export const REMOVE_FILE_BY_ID = 'REMOVE_FILE_BY_ID';
export const SUMMARIZE_TEXT = 'SUMMARIZE_TEXT';

export const addNewNotebook = () => {
    return async (dispatch) => {
 
      try {
        const response = await fetch(`${baseUrl}/notebook/add`, {
          method: 'POST',
        });
  
        if (!response.ok) {
          throw new Error('Something went wrong while adding notebook!');
        }
  
        const resData = await response.json();
  
        dispatch({
          type: ADD_NEW_NOTEBOOK,
          payload: resData,
        });
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
  };

  


  export const getAllNotebooks = () => {
    return async (dispatch) => {
  
      try {
        const response = await fetch(`${baseUrl}/notebook`, {
          method: 'GET',
        });
  
        if (!response.ok) {
          throw new Error('Something went wrong while fetching notebooks!');
        }
  
        const resData = await response.json();

    
        dispatch({
          type: GET_ALL_NOTEBOOKS,
          payload: resData?.notebooks,
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
