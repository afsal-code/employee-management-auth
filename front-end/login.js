document.getElementById("loginForm").addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const pass = document.getElementById('pass').value;

      const res = await fetch('http://localhost:3002/api/login', {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ email, pass })
      });

      const data = await res.json();
      if (res.status === 200) {
        alert("Login successful!");
        localStorage.setItem('token', data.token);
        window.location.href = "index.html";
      } else {
        alert(data.msg || "Login failed");
      }
    });