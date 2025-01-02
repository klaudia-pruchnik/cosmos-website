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

export { add, getArticles };
