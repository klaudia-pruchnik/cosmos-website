import ArticleItem from "../features/articles/ArticleItem";
import FluidContainer from "../layout/FluidContainer";

import classes from "./ArticlesSection.module.css";

const DUMMY_ARTICLES = [
  { id: 0, title: "Splątanie Kwantowe" },
  { id: 1, title: "Kryptografia kwantowa" },
  { id: 2, title: "Czarne dziury" },
  { id: 3, title: "Splątanie Kwantowe" },
  { id: 4, title: "Splątanie Kwantowe" },
  { id: 5, title: "Splątanie Kwantowe" },
];

export default function ArticlesSection() {
  return (
    <FluidContainer sectionId="section-articles" addedClasses={classes.section}>
      <div className="row">
        {DUMMY_ARTICLES.map((article) => (
          <ArticleItem key={article.id} title={article.title} />
        ))}
      </div>
      <a href="#" className={classes.moreBtn}>
        Więcej
      </a>
    </FluidContainer>
  );
}
