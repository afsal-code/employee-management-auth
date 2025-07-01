document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    designation: document.getElementById("designation").value,
    experience: document.getElementById("experience").value,
    salary: document.getElementById("salary").value,
  };

  const token = localStorage.getItem("token");  
  const response = await fetch('/api/add', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token  
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  if (response.status === 201) {
    alert("Employee added successfully!");
    window.location.href = "index.html";
  } else {
    alert(result.msg || "Failed to add employee.");  
    console.error(result);
  }
});
