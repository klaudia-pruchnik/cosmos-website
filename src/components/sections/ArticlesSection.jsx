import { useQuery } from "@tanstack/react-query";
import ArticleItem from "../features/articles/ArticleItem";
import FluidContainer from "../layout/FluidContainer";
import { fetchArticles } from "../../util/http";

import classes from "./ArticlesSection.module.css";

export default function ArticlesSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["articles", { limit: 3, offset: 0 }],
    queryFn: ({ signal, queryKey }) => {
      const [, { limit, offset }] = queryKey;
      return fetchArticles({ signal, limit, offset });
    },
    staleTime: 5000,
  });

  const articles = data?.articles || [];
  const hasMore = data?.hasMore;

  const handleMoreArticles = () => {
    console.log("handleMoreArticles");
    queryFn({ signal, queryKey: ["articles", { limit: 6, offset: 6 }] });
  };

  let content;

  if (isPending) {
    content = <p>Ładowanie...</p>;
  }

  if (isError) {
    content = <p>{error.info?.message || "Failed to fetch articles."}</p>;
  }

  if (articles) {
    content = (
      <div className="row">
        {articles.map((article) => (
          <ArticleItem key={article.id} title={article.title} />
        ))}
      </div>
    );
  }

  return (
    <FluidContainer sectionId="section-articles" addedClasses={classes.section}>
      {/* <div className="row">
        {DUMMY_ARTICLES.map((article) => (
          <ArticleItem key={article.id} title={article.title} />
        ))}
      </div> */}
      {console.log("data: ", data)}
      {content}
      {hasMore && (
        <a href="#" className={classes.moreBtn} onClick={handleMoreArticles}>
          Więcej
        </a>
      )}
    </FluidContainer>
  );
}
