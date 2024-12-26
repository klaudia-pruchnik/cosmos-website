import bcrypt from "bcryptjs";
const { hash } = bcrypt;

async function add(user, pool) {
  console.log("adding");
  const hashedPassword = await hash(user.password, 12);
  const result = await pool.query(
    "INSERT INTO users (username, password, is_admin) VALUES ($1, $2, $3) RETURNING *",
    [user.username, hashedPassword, false]
  );
  console.log("result");
  console.log(result.rows[0]);
  return result.rows[0];
}

// get usr from username
async function get(username, pool) {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows[0];
}

export { add, get };
