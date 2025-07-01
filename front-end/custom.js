async function getemployees() {
  const response = await fetch('http://localhost:3001/getemployee');
  const data = await response.json();
  let str = '';

  data.forEach((dt) => {
    str += `
      <div class="card">
        <div class="profile-icon">${dt.name?.charAt(0)?.toUpperCase() || "E"}</div>

        <div class="info-row">
          <label>Name:</label>
          <input type="text" id="name-${dt._id}" value="${dt.name}" disabled />
        </div>
        <div class="info-row">
          <label>Designation:</label>
          <input type="text" id="Designation-${dt._id}" value="${dt.Designation}" disabled />
        </div>
        <div class="info-row">
          <label>Salary:</label>
          <input type="text" id="Salary-${dt._id}" value="${dt.Salary}" disabled />
        </div>
        <div class="info-row">
          <label>Experience:</label>
          <input type="text" id="Experience-${dt._id}" value="${dt.Experience}" disabled />
        </div>

        <div class="card-buttons">
          <button class="edit-btn" onclick="handleEdit('${dt._id}')">Edit</button>
          <button class="delete-btn" onclick="handleDelete('${dt._id}')">Delete</button>
          <button class="save-btn" onclick="handleSave('${dt._id}')">Save</button>
        </div>
      </div>`;
  });

  document.getElementById('main').innerHTML = str;
}
getemployees();
async function handleDelete(id){
    const res=await fetch("http://localhost:3001/delete",{
        method:"DELETE",
        headers:{"content-type":"text/plain"},
        "body":id
    
    })
    const data=await res.text();
    if(data == "success"){
        alert("Deleted Successfully");
    getemployees();
}
else{
    alert("Deleted Failed")
}
}


async function handleEdit(id) 
{ 
    document.getElementById(`name-${id}`).disabled=false; 
document.getElementById(`Designation-${id}`).disabled=false; 
document.getElementById(`Salary-${id}`).disabled=false;
 document.getElementById(`Experience-${id}`).disabled=false;
 }
 async function handleSave(id) { 
    let Name=document.getElementById(`name-${id}`).value; 
    
    let Designation=document.getElementById(`Designation-${id}`).value;
     let Salery=document.getElementById(`Salary-${id}`).value; 
     let Experience=document.getElementById(`Experience-${id}`).value; 
     let data={id,Name,Designation,Salery,Experience};
      const jsonData=JSON.stringify(data); 
      
      const res=await fetch("http://localhost:3001/update",{ 
        "method":"PUT", 
        "Content-Type":"text/json",
         "body":jsonData });
       const result =await res.text();
        if (result=="success") { 
            alert("updated successfully !!");
         getemployees(); 
        }
        
        else{ 
            alert("upadation failed")
         } }