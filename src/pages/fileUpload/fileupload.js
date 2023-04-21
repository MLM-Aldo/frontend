import React, { useEffect, useState } from "react";

function FileUpload(){
    

  return (
    <div className="fileUpload">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
      <aside>
        {thumbs}
      </aside>
    </div>
  );
}

export default FileUpload;