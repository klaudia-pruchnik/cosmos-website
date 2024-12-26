import classes from "./ArticleAddForm.module.css";
import ClassicCKEditor from "../ClassicCKEditor.jsx";

export default function ArticleAddForm() {
  return (
    <form className={classes.addForm}>
      <label htmlFor="title">Tytuł:</label>
      <input type="text" name="title" id="title" required />

      <label htmlFor="subtitle">Podtytuł:</label>
      <input type="text" name="subtitle" id="subtitle" required />

      <label htmlFor="subtitle">Link Zdjęcia:</label>
      <input type="text" name="img-link" id="imgLink" required />

      <ClassicCKEditor />

      <input type="submit" value="Dodaj" className={classes.submitBtn} />
    </form>
  );
}
