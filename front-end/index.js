 
// async function loadEmployees() {
//   const response = await fetch('http://localhost:3002/api/get', {
//     method: "GET",
//     headers: {
//       "Authorization": "Bearer " + localStorage.getItem("token")
//     }
//   });

//   const data = await response.json();
//   console.log("EMPLOYEES:", data);  
//   const main = document.getElementById("main");
//   main.innerHTML = "";

//   data.forEach(emp => {
//     const card = document.createElement("div");
//     card.className = "card";
//     card.innerHTML = `
//       <img src="${emp.pic}" alt="Employee Photo" class="profile-photo" />

//       <div class="info-row">
//         <label>Name:</label>
//         <input type="text" id="name-${emp._id}" value="${emp.name}" disabled>
//       </div>
//       <div class="info-row">
//         <label>Position:</label>
//         <input type="text" id="position-${emp._id}" value="${emp.position}" disabled>
//       </div>
//       <div class="info-row">
//         <label>Experience:</label>
//         <input type="number" id="experience-${emp._id}" value="${emp.experience}" disabled>
//       </div>
//       <div class="info-row">
//         <label>Salary:</label>
//         <input type="number" id="salary-${emp._id}" value="${emp.salary}" disabled>
//       </div>

//       <div class="card-buttons">
//         <button class="edit-btn" onclick="editEmployee('${emp._id}')">Edit</button>
//         <button class="save-btn" onclick="saveEmployee('${emp._id}')" disabled>Save</button>
//         <button class="delete-btn" onclick="deleteEmployee('${emp._id}')">Delete</button>
//       </div>
//     `;
//     main.appendChild(card);
//   });
// }

// // function editEmployee(id) {
// //   document.getElementById(`name-${id}`).disabled = false;
// //   document.getElementById(`position-${id}`).disabled = false;
// //   document.getElementById(`experience-${id}`).disabled = false;
// //   document.getElementById(`salary-${id}`).disabled = false;
// //   document.querySelector(`.save-btn[onclick="saveEmployee('${id}')"]`).disabled = false;
// // }

// function editEmployee(id) {
//   document.getElementById(`name-${id}`).disabled = false;
//   document.getElementById(`position-${id}`).disabled = false;
//   document.getElementById(`experience-${id}`).disabled = false;
//   document.getElementById(`salary-${id}`).disabled = false;
//   document.querySelector(`.save-btn[onclick="saveEmployee('${id}')"]`).disabled = false;
// }


// async function saveEmployee(id) {
//   const data = {
//     name: document.getElementById(`name-${id}`).value,
//     designation: document.getElementById(`position-${id}`).value,
//     experience: document.getElementById(`experience-${id}`).value,
//     salary: document.getElementById(`salary-${id}`).value,
//   };

//   const res = await fetch(`http://localhost:3002/api/update/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": "Bearer " + localStorage.getItem("token")
//     },
//     body: JSON.stringify(data)
//   });

//   const result = await res.json();
//   if (res.ok) {
//     alert("Updated successfully");
//     loadEmployees();
//   } else {
//     alert("Update failed");
//     console.error(result);
//   }
// }

// async function deleteEmployee(id) {
//   const confirmDel = confirm("Are you sure you want to delete this employee?");
//   if (!confirmDel) return;

//   const res = await fetch(`http://localhost:3002/api/delete/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Authorization": "Bearer " + localStorage.getItem("token")
//     }
//   });

//   const result = await res.json();
//   if (res.ok) {
//     alert("Deleted successfully");
//     loadEmployees();
//   } else {
//     alert("Delete failed");
//     console.error(result);
//   }
// }

// window.onload = () => {
//   loadEmployees();

//   const token = localStorage.getItem("token");
//   const loginLink = document.getElementById("login-link");
//   const signupLink = document.getElementById("signup-link");
//   const logoutLink = document.getElementById("logout-link");

//   if (token) {
//     loginLink.style.display = "none";
//     signupLink.style.display = "none";
//     logoutLink.style.display = "inline-block";

//     logoutLink.addEventListener("click", () => {
//       localStorage.removeItem("token");
//       alert("Logged out successfully.");
//       window.location.href = "login.html";
//     });
//   } else {
//     loginLink.style.display = "inline-block";
//     signupLink.style.display = "inline-block";
//     logoutLink.style.display = "none";
//   }
// };


async function loadEmployees() {
  const response = await fetch('http://localhost:3002/api/get', {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  });

  const data = await response.json();
  console.log("EMPLOYEES:", data);  
  const main = document.getElementById("main");
  main.innerHTML = "";

  data.forEach(emp => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${emp.pic}" alt="Employee Photo" class="profile-photo" />

      <div class="info-row">
        <label>Name:</label>
        <input type="text" value="${emp.name}" disabled>
      </div>
      <div class="info-row">
        <label>Position:</label>
        <input type="text" value="${emp.position}" disabled>
      </div>
      <div class="info-row">
        <label>Experience:</label>
        <input type="number" value="${emp.experience}" disabled>
      </div>
      <div class="info-row">
        <label>Salary:</label>
        <input type="number" value="${emp.salary}" disabled>
      </div>

      <div class="card-buttons">
        <button class="edit-btn" onclick="editEmployee('${emp._id}')">Edit</button>
        <button class="delete-btn" onclick="deleteEmployee('${emp._id}')">Delete</button>
      </div>
    `;
    main.appendChild(card);
  });
}

// ✅ Redirect to edit page with ID in URL
function editEmployee(id) {
  window.location.href = `edit.html?id=${id}`;
}

async function deleteEmployee(id) {
  const confirmDel = confirm("Are you sure you want to delete this employee?");
  if (!confirmDel) return;

  const res = await fetch(`http://localhost:3002/api/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  });

  const result = await res.json();
  if (res.ok) {
    alert("Deleted successfully");
    loadEmployees();
  } else {
    alert("Delete failed");
    console.error(result);
  }
}

window.onload = () => {
  loadEmployees();

  const token = localStorage.getItem("token");
  const loginLink = document.getElementById("login-link");
  const signupLink = document.getElementById("signup-link");
  const logoutLink = document.getElementById("logout-link");

  if (token) {
    loginLink.style.display = "none";
    signupLink.style.display = "none";
    logoutLink.style.display = "inline-block";

    logoutLink.addEventListener("click", () => {
      localStorage.removeItem("token");
      alert("Logged out successfully.");
      window.location.href = "login.html";
    });
  } else {
    loginLink.style.display = "inline-block";
    signupLink.style.display = "inline-block";
    logoutLink.style.display = "none";
  }
};
