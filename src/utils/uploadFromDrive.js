import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { addNewFile } from './path-to-your-action-file';

const GoogleDriveUpload = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      window.gapi.load('client:auth2', initClient);
      window.google = window.google || {};
    };
    document.body.appendChild(script);
  }, []);

  const initClient = () => {
    window.gapi.client.init({
      apiKey: 'AIzaSyD90fivQL49C39IfJTmkJYmnIzGfnq8Itk',
      clientId: '37483337021-0o30h5irptr0etvcifr4mdkmd5hkb87k.apps.googleusercontent.com',
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
      scope: 'https://www.googleapis.com/auth/drive.file'
    }).then(() => {
      // Handle the initial sign-in state.
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    });
  };

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      openPicker();
    } else {
      handleAuthClick();
    }
  };

  const handleAuthClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const openPicker = () => {
    const view = new window.google.picker.View(window.google.picker.ViewId.DOCS);
    const picker = new window.google.picker.PickerBuilder()
      .addView(view)
      .setOAuthToken(window.gapi.auth.getToken().access_token)
      .setDeveloperKey('AIzaSyD90fivQL49C39IfJTmkJYmnIzGfnq8Itk')
      .setCallback(pickerCallback)
      .build();
    picker.setVisible(true);
  };

  const pickerCallback = (data) => {
    if (data.action === window.google.picker.Action.PICKED) {
      const fileId = data.docs[0].id;
      downloadFile(fileId);
    }
  };

  const downloadFile = (fileId) => {
    window.gapi.client.drive.files.get({
      fileId: fileId,
      alt: 'media'
    }).then((response) => {
      const fileContent = response.body;
      // Dispatch the file content to your Redux action
    //   dispatch(addNewFile(fileContent));
    console.log(fileContent)
});
  };

  return (
    <div>
      <button onClick={openPicker}>Upload from Google Drive</button>
    </div>
  );
};

export default GoogleDriveUpload;
