import { Editor } from "@tinymce/tinymce-react";

import { Controller } from "react-hook-form";

export default function RTE({
  name,
  control,
  label,
  edHeight,
  defaultValue = "",
}) {
  const TinyMceApiKey = String(import.meta.env.VITE_APPWRITE_TINY_MCE);

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={TinyMceApiKey}
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: edHeight,

              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks  | bold italic forecolor |  alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              content_css: "tinymce-5-dark",
              skin: "oxide-dark",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
