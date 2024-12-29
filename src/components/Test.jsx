import { useAuth } from "../context/AuthContext";

function TestAuth() {
  const { token, user, isAdmin, handleLogout, fetchUserData } = useAuth();

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h2>Test Auth Context</h2>
      <p>Token: {token || "Brak tokena"}</p>
      <p>Użytkownik: {user ? JSON.stringify(user) : "Brak użytkownika"}</p>
      <p>Administrator: {isAdmin ? "Tak" : "Nie"}</p>

      <button onClick={handleLogout}>Wyloguj</button>
      <button onClick={() => fetchUserData(token)}>
        Pobierz dane użytkownika
      </button>
    </div>
  );
}

export default TestAuth;
