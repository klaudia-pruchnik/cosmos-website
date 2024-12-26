import classes from "./ArticleItem.module.css";

export default function ArticleItem({ title }) {
  return (
    <div className={`col-lg-4 col-md-6 ${classes.boxContainer}`}>
      <div className={classes.boxImage}></div>
      <h4>{title}</h4>
    </div>
  );
}
