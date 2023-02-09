import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { ENDPOINT } from "consts";

const Ckeditor = ({ language, data, setData }) => {
  const token = window.localStorage.getItem("token");

  function uploadAdapter(loader) {
    return {
      upload: () =>
        new Promise((resolve, reject) => {
          const body = new FormData();

          loader.file.then((file) => {
            console.log("FILE", file);
            body.append("image", file);

            fetch(`${ENDPOINT}/images`, {
              method: "post",
              body: body,
              headers: {
                'Authorization': `Bearer ${token}`
            },
            })
              .then((response) => response.json())
              .then((result) => resolve({ default: result.imageUrl }))
              .catch((error) => reject(error));
          });
        }),
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <div>
      <CKEditor
        config={{
          extraPlugins: [uploadPlugin],
        }}
        editor={ClassicEditor}
        data={data}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setData(data)
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default Ckeditor;
