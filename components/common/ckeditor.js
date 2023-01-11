import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

function Ckeditor() {
  const API = "192.168.1.91:9000/kawaii-snapshot/v1/upload";

  function uploadAdapter(loader) {
    return {
      upload: () =>
        new Promise((resolve, reject) => {
          const body = new FormData();

          loader.file.then((file) => {
            body.append("file", file);

            fetch(`192.168.1.91:9000/kawaii-snapshot/v1/upload`, {
              method: "post",
              body: body,
            }).then(
              ((res) => res.json())
                .then((res) => resolve({ default: res }))
                .catch((err) => reject(err))
            );
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
        data="<p>Hello</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          window.localStorage.setItem("post-data", data);
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
}

export default Ckeditor;
