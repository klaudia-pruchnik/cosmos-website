async function add(article, pool) {
  console.log("adding artcile");
  try {
    const result = await pool.query(
      "INSERT INTO articles (title, subtitle, content, banner_url, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        article.title,
        article.subtitle,
        article.content,
        article.banner_url,
        article.user_id,
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

export { add };
