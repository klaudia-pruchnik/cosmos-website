import { Link } from "react-router-dom";
import classes from "./ArticleItem.module.css";

export default function ArticleItem({ article }) {
  console.log("article", article);
  return (
    <Link
      to={`/articles/${article.id}`}
      className={`col-lg-4 col-md-6 ${classes.boxContainer}`}
    >
      {/* <div className={`col-lg-4 col-md-6 ${classes.boxContainer}`}> */}
      <div className={classes.boxImage}></div>
      <h4>{article.title}</h4>
      {/* </div> */}
    </Link>
  );
}
