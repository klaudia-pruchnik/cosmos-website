import { useState, useEffect, useRef, useMemo } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Autosave,
  BlockQuote,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  Paragraph,
  SpecialCharacters,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  Underline,
} from "ckeditor5";
import translations from "ckeditor5/translations/pl.js";
import "ckeditor5/ckeditor5.css";
import classes from "./ClassicCKEditor.module.css";

const LICENSE_KEY =
  "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzU4NjIzOTksImp0aSI6ImIyMzU4ZWM3LTAyYjItNGUyNi05NDkxLTZkYjA0NmNhZDljZiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImIxNjc4NTk3In0.Z4Nfr_sPyy6nFvDVe8PVSc6EqdVFJ6wYEKSIGucg3rDcL8kcbhSmEOD4BCT0Ralhj3t7akmMnUl4vCqch49KRg";

export default function ClassicCKEditor({ onChange }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "specialCharacters",
            "link",
            "insertTable",
            "blockQuote",
            "|",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Autosave,
          BlockQuote,
          Bold,
          Essentials,
          Heading,
          Indent,
          IndentBlock,
          Italic,
          Link,
          Paragraph,
          SpecialCharacters,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          Underline,
        ],
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6",
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6",
            },
          ],
        },
        language: "pl",
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        placeholder: "Type or paste your content here!",
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],
        },
        translations: [translations],
      },
    };
  }, [isLayoutReady]);

  return (
    <div className={classes.editorContainer}>
      <div ref={editorContainerRef}>
        <div>
          <div ref={editorRef}>
            {editorConfig && (
              <CKEditor
                editor={ClassicEditor}
                config={editorConfig}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  onChange(data);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
