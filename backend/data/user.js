import bcrypt from "bcryptjs";
const { hash } = bcrypt;

async function add(user, pool) {
  console.log("adding");
  try {
    const hashedPassword = await hash(user.password, 12);
    const result = await pool.query(
      "INSERT INTO users (username, password, is_admin) VALUES ($1, $2, $3) RETURNING *",
      [user.username, hashedPassword, false]
    );
    console.log("result");
    console.log(result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

// get usr from field
async function get(username, pool) {
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}

export { add, get };
