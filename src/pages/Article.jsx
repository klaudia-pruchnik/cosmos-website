import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import ArticleTitleSection from "./../components/sections/ArticleTitleSection";
import ArticleContent from "../components/sections/ArticleContent";
import { fetchArticle, fetchUsernameById } from "../util/http";

export default function Article() {
  const params = useParams();

  console.log("params", params);
  console.log("params.articleId", params.articleId);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.id],
    queryFn: async ({ signal }) => {
      const article = await fetchArticle({ signal, id: params.articleId });
      console.log("article user_id", article.user_id);
      const username = await fetchUsernameById(article.user_id);
      console.log("username", username);
      return { ...article, author: username };
    },
  });

  let content;

  if (isPending) {
    content = <p>Fetching event data...</p>;
  }

  if (isError) {
    content = (
      <p>
        Error:{" "}
        {error.info?.message ||
          "Failed to fetch event data, please try again later."}
      </p>
    );
  }

  if (data) {
    console.log("data", data);
    const formattedDate = new Date(data.created_at).toLocaleDateString(
      "pl-PL",
      {
        dateStyle: "short",
      }
    );

    content = (
      <>
        <ArticleTitleSection
          title={data.title}
          subtitle={data.subtitle}
          image={data.banner_url}
          altText={data.title}
          author={data.author}
          date={formattedDate}
        />
        <ArticleContent content={data.content} />
      </>
    );
  }

  return <>{content}</>;
}
