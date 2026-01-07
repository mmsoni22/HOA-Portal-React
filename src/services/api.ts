import type { User } from "../types/User";

const BASE_URL = "http://localhost:3001";

export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

export async function updateUser(user: User) {
  const response = await fetch(`${BASE_URL}/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to update User");
  }

  return response.json();
}
