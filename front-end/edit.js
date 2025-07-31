const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadEmployee() {
  const res = await fetch(`http://localhost:3002/api/get`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  });

  const employees = await res.json();
  const emp = employees.find(e => e._id === id);
  if (!emp) {
    alert("Employee not found");
    return;
  }

  document.getElementById("name").value = emp.name;
  document.getElementById("position").value = emp.position;
  document.getElementById("experience").value = emp.experience;
  document.getElementById("salary").value = emp.salary;
}

document.getElementById("editForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    designation: document.getElementById("position").value,
    experience: document.getElementById("experience").value,
    salary: document.getElementById("salary").value,
  };

  const res = await fetch(`http://localhost:3002/api/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  if (res.ok) {
    alert("Employee updated successfully");
    window.location.href = "index.html";
  } else {
    alert("Failed to update");
    console.error(result);
  }
});

loadEmployee();
