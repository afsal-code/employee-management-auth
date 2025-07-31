// document.getElementById("addForm").addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const data = {
//     name: document.getElementById("name").value,
//     designation: document.getElementById("position").value,
//     experience: document.getElementById("experience").value,
//     salary: document.getElementById("salary").value,  
//     pic:pic,
    
   
//   };
//  const file = document.getElementById("pic").files[0];
//   if (!file) {
//     alert("Please select an image file.");
//     return;
//   }

//   const pic = await converBased64(file);
    
//   const token = localStorage.getItem("token");  
//   const response = await fetch('/api/add', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": "Bearer " + token  
//     },
//     body: JSON.stringify(data)
//   });

//   const result = await response.json();
//   if (response.status === 201) {
//     alert("Employee added successfully!");
//     window.location.href = "index.html";
//   } else {
//     alert(result.msg || "Failed to add employee.");  
//     console.error(result);
//   }
// });

// function converBased64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// }
 document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("pic");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select an image file.");
    return;
  }

  const base64Image = await convertToBase64(file);

  const data = {
    name: document.getElementById("name").value,
    position: document.getElementById("position").value,
    experience: document.getElementById("experience").value,
    salary: document.getElementById("salary").value,
    pic: base64Image // ✅ use base64 image here
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

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
