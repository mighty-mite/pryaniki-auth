export default async function login(
  username: string,
  password: string
): Promise<string> {
  const host = "https://test.v5.pryaniky.com";
  const auth = "/ru/data/v3/testmethods/docs/login";

  const response = await fetch(`${host}${auth}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  const token = data.data.token;
  sessionStorage.setItem("token", token);
  return token;
}
