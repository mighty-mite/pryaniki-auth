export default function useHttp() {
  const hostUrl = "https://test.v5.pryaniky.com";
  const authUrl = "/ru/data/v3/testmethods/docs/login";
  const getUrl = "/ru/data/v3/testmethods/docs/userdocs/get";

  const authorize = async (username: string, password: string) => {
    const response = await fetch(`${hostUrl}${authUrl}`, {
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
  };

  const getTable = async (token: string) => {
    const response = await fetch(`${hostUrl}${getUrl}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "x-auth": token,
      },
    });

    if (!response.ok) {
      throw new Error("Data loading failed");
    }

    const data = await response.json();
    return data.data;
  };

  return { authorize, getTable };
}
