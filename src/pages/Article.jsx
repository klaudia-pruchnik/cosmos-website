import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

import ArticleTitleSection from "./../components/sections/ArticleTitleSection";
import ArticleContent from "../components/sections/ArticleContent";
import { fetchArticle } from "../util/http";
import { UserContext } from "../context/UserContext";

import classes from "./Article.module.css";

export default function Article() {
  const { isAdmin } = useContext(UserContext);

  const params = useParams();

  console.log("params", params);
  console.log("params.articleId", params.articleId);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchArticle({ signal, id: params.articleId }),
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
        dateStyle: "long",
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

        {isAdmin && (
          <div className={`d-flex justify-content-end ${classes.actions}`}>
            <button className="btn btn-outline-light my-3">Delete</button>
            <Link to="edit" className="btn btn-outline-light my-3 mx-2">
              Edit
            </Link>
          </div>
        )}

        <ArticleContent content={data.content} />
      </>
    );
  }

  return <>{content}</>;
}
