import { useState, useContext } from "react";

import classes from "./ArticleForm.module.css";
import ClassicCKEditor from "../ClassicCKEditor.jsx";
import { UserContext } from "../../../context/UserContext";

export default function ArticleForm({ inputData = null, onSubmit }) {
  const [content, setContent] = useState(""); // CKEditor content
  const { user } = useContext(UserContext);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.content = content;
    data.userId = user.id;

    onSubmit(data);
  }

  return (
    <form className={classes.addForm} onSubmit={handleSubmit}>
      <label htmlFor="title">Tytuł:</label>
      <input type="text" name="title" id="title" required />

      <label htmlFor="subtitle">Podtytuł:</label>
      <input type="text" name="subtitle" id="subtitle" required />

      <label htmlFor="subtitle">Link Zdjęcia:</label>
      <input type="text" name="bannerUrl" id="bannerUrl" required />

      <ClassicCKEditor onChange={setContent} />

      <input type="submit" value="Dodaj" className={classes.submitBtn} />
    </form>
  );
}
