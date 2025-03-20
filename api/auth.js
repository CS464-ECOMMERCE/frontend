async function LoginWithEmailPassword(email, password) {
  const response = await fetch("http://localhost/api/v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = response.json();
  return data;
}

export { LoginWithEmailPassword };
