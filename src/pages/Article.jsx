import { useParams } from "react-router-dom";

import ArticleTitleSection from "./../components/sections/ArticleTitleSection";
import ArticleContent from "../components/sections/ArticleContent";

export default function Article() {
  const params = useParams();
  const currentArticle = DUMMY_ARTICLES.find(
    (article) => article.id == params.articleId
  );

  return (
    <>
      <ArticleTitleSection
        title={currentArticle.title}
        subtitle={currentArticle.subtitle}
        image={currentArticle.image}
        altText={currentArticle.altText}
        author={currentArticle.author}
        date={currentArticle.date}
      />
      <ArticleContent content={currentArticle.content} />
    </>
  );
}
