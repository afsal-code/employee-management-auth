document.getElementById("form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    const cpass = document.getElementById("cpass").value;

    const res = await fetch("http://localhost:3002/api/adduser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, pass, cpass })
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 201) {
        alert("Registered successfully!");
        window.location.href = "login.html";
    } else {
        alert(data.msg || data.error || "Registration failed.");
    }
});
