async function executeQuery(pool, query, params) {
  try {
    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

async function add(article, pool) {
  console.log("Adding article");
  const query = `
    INSERT INTO articles (title, subtitle, content, banner_url, user_id) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *`;
  const params = [
    article.title,
    article.subtitle,
    article.content,
    article.bannerUrl,
    article.userId,
  ];
  const result = await executeQuery(pool, query, params);
  return result[0];
}

async function edit(articleId, article, pool) {
  console.log("Editing article");
  const query = `
    UPDATE articles 
    SET title = $1, subtitle = $2, content = $3, banner_url = $4 
    WHERE id = $5 
    RETURNING *`;
  const params = [
    article.title,
    article.subtitle,
    article.content,
    article.bannerUrl,
    articleId,
  ];
  const result = await executeQuery(pool, query, params);
  return result[0];
}

async function getArticles(limit, offset, pool) {
  console.log("Fetching articles");
  const query = `
    SELECT * 
    FROM articles 
    ORDER BY created_at DESC 
    LIMIT $1 OFFSET $2`;
  const params = [limit, offset];
  return await executeQuery(pool, query, params);
}

async function getArticle(id, pool) {
  console.log("Fetching article by ID");
  const query = `
    SELECT A.*, U.username AS author 
    FROM articles A 
    JOIN users U ON A.user_id = U.id 
    WHERE A.id = $1`;
  const params = [id];
  const result = await executeQuery(pool, query, params);
  return result[0];
}

async function getArticleByTitle(title, pool) {
  console.log("Fetching article by title");
  const query = `SELECT * FROM articles WHERE title = $1`;
  const params = [title];
  return await executeQuery(pool, query, params);
}

async function deleteArticle(id, pool) {
  console.log("Deleting article");
  const query = `DELETE FROM articles WHERE id = $1`;
  const params = [id];
  await executeQuery(pool, query, params);
  return { message: "Article deleted successfully" };
}

export { add, edit, getArticles, getArticle, getArticleByTitle, deleteArticle };
