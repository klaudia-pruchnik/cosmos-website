import { redirect } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function action() {
  console.log("logout action");
  console.log("Logging out...");

  localStorage.removeItem("token");
  localStorage.removeItem("expiration");

  console.log("Logged out.");
  console.log("Redirecting to /");
  return redirect("/");
}
