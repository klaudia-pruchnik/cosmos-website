async function add(article, pool) {
  console.log("adding artcile");
  try {
    const result = await pool.query(
      "INSERT INTO articles (title, subtitle, content, banner_url, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        article.title,
        article.subtitle,
        article.content,
        article.bannerUrl,
        article.userId,
      ]
    );
    console.log("result article");
    console.log(result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

async function edit(articleId, article, pool) {
  try {
    console.log("editing article");
    const result = await pool.query(
      "UPDATE articles SET title = $1, subtitle = $2, content = $3, banner_url = $4 WHERE id = $5 RETURNING *",
      [
        article.title,
        article.subtitle,
        article.content,
        article.bannerUrl,
        articleId,
      ]
    );
    console.log("result article", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

async function getArticles(limit, offset, pool) {
  try {
    const result = await pool.query(
      "SELECT * FROM articles ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}

async function getArticle(id, pool) {
  try {
    const result = await pool.query(
      "SELECT A.*, U.username AS author FROM articles A JOIN users U ON A.user_id = U.id WHERE A.id = $1",
      [id]
    );
    console.log("result article", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
}

async function getArticleByTitle(title, pool) {
  try {
    const result = await pool.query("SELECT * FROM articles WHERE title = $1", [
      title,
    ]);
    console.log("result article", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
}

async function deleteArticle(id, pool) {
  try {
    const result = await pool.query("DELETE FROM articles WHERE id = $1", [id]);
    console.log("deleting article in db result: ", result);
    return result;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
}

export { add, edit, getArticles, getArticle, getArticleByTitle, deleteArticle };
