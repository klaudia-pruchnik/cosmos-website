import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

// import { createNewArticle } from "../../util/http.js";
// import { queryClient } from "../../util/http.js";
import { createNewArticle, queryClient } from "../util/http";
import { UserContext } from "../context/UserContext";

import ArticleForm from "../components/features/articles/ArticleForm";

export default function AddNewArticle() {
  const navigate = useNavigate();
  const { isAdmin, user } = useContext(UserContext);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("/articles");
    },
  });

  function handleSubmit(formData) {
    mutate({ article: formData });
  }

  if (!user || !isAdmin) {
    return <p>Nie masz uprawnień do dodawania artykułów.</p>;
  }

  return (
    <div className="container">
      <h1>Nowy artykuł</h1>
      <ArticleForm onSubmit={handleSubmit} />
      {isPending && <p>Wysyłanie...</p>}
      {isError && <p>{error.message}</p>}
    </div>
  );
}
