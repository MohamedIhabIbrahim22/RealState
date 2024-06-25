const properties = [
  {img:"https://hurghadiansproperty.com/wp-content/uploads/2023/11/acasa_mia_04.png",name:"Attameya Heights",details:" The first of its kind in the region, it brings together the best of a luxury villa, duplex, and master community.",id:1},
  {img:"https://bluerock-eg.com/images/project/6/hyde-park-1667480155.webp",name:" Sheikh Zayed",details:" Specially designed 1, 1.5 and 2 bedroom apartments that offer you all-encompassing views of the city as you embark on an exquisite waterfront lifestyle.",id:2,bed:"5"},
  {img:"https://aaf1bc7189.clvaw-cdnwnd.com/3e7c67d4c9462567f23b0b727d853874/200010494-567eb567ed/IMG_7750-HDR%20%28Copy%29-6.jpg?ph=aaf1bc7189",name:"Fifth Settlement",details:"340 reasons to elevate your quality of life. A rich sense of community and superlative waterfront living in one of the city’s most sought-after locations.",id:3}
];


const propertiesPerPage = 3; // Number of properties per page
let currentPage = 1; // Current page, initially set to 1

  function backfromform(){
    document.getElementById("blured-space").style="opacity:1";
    document.getElementById("admin-prop-add").style="display:none";
    document.getElementById("adminvillasbackbtn").style="display:none;";
    document.getElementById("admin-prop-edit").style="display:none";
  }
  function add(){
      backfromform();
      var timg=document.forms["admin-prop-myform"]["admin-prop-img"].value;
      var tname=document.forms["admin-prop-myform"]["admin-prop-name"].value;
      var tdetails=document.forms["admin-prop-myform"]["admin-prop-details"].value;
      properties.push({img:timg,name:tname,details:tdetails,id:index});
      index++;
      print();
      document.getElementById("admin-prop-formimg").value="";
      document.getElementById("admin-prop-formname").value="";
      document.getElementById("admin-prop-formdetails").value="";
  }
  function del(value){
      for(let x in properties){
          if(properties[x].id==value){
              delete properties[x];
          }
      }
      print();
  }
  function edit(value) {
  const card = document.getElementById(`card-${value}`);
  const heading = card.querySelector("h2");
  const paragraph = card.querySelector("p");
  const editButton = card.querySelector(".edit-button");

  heading.contentEditable = true;
  paragraph.contentEditable = true;

  heading.classList.add("editable");
  paragraph.classList.add("editable");

  const saveButton = document.createElement("input");
  var e = document.getElementById("savebtn");
  if(e)
    console.log("already in edit");
  else
  {
  saveButton.id="savebtn";
  saveButton.type = "button";
  saveButton.value = "save";
  const div=document.getElementById(`del-${value}`);
  div.appendChild(saveButton);

  saveButton.addEventListener("click", function() {
    heading.contentEditable = false;
    paragraph.contentEditable = false;
    heading.classList.remove("editable");
    paragraph.classList.remove("editable");
    div.removeChild(saveButton);
  });
}
}


function dis(){
  document.getElementById("admin-prop-add").style="display:grid;";
  document.getElementById("blured-space").style="opacity:0.1";
  document.getElementById("adminvillasbackbtn").style="display:grid;";
}

/*
function dis2(i){
  document.getElementById(`admin-prop-edit${i}`).style="display:grid;";
  document.getElementById("blured-space").style="opacity:0.1";
  //document.getElementById("adminvillasbackbtn").style="display:grid;";
}

*/


function printProperties() {
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    const propertiesToShow = properties.slice(startIndex, endIndex);
  
    const adminPropCards = document.getElementById("admin-prop-cards");
    adminPropCards.innerHTML = ''; // Clear previous cards
  
    propertiesToShow.forEach(property => {
      const card = document.createElement('div');
      card.className = 'admin-prop-card';
      card.innerHTML = `
        <img src="${property.img}" alt="${property.name}">
        <h2>${property.name}</h2>
        <p>${property.details}</p>
        <button class="edit-button" onclick="edit(${property.id})">Edit</button>
        <button class="delete-button" onclick="del(${property.id})">Delete</button>
      `;
      adminPropCards.appendChild(card);
    });
  }

  
  function nextPage() {
    currentPage++;
    if (currentPage > Math.ceil(properties.length / propertiesPerPage)) {
      currentPage = Math.ceil(properties.length / propertiesPerPage);
    }
    printProperties();
  }
  
  function prevPage() {
    currentPage--;
    if (currentPage < 1) {
      currentPage = 1;
    }
    printProperties();
  }
  
  // Initial page load
  printProperties();

const properties2 = [
  {img:"https://exp-eg.com/wp-content/uploads/2021/03/Sky-ad-Residence-Eight-new-capital-view7.jpg",name:"Attameya Heights",details:" The first of its kind in the region, it brings together the best of a luxury villa, duplex, and master community.",id:1},
  {img:"https://exp-eg.com/wp-content/uploads/2021/03/Sky-ad-Residence-Eight-new-capital-view7.jpg",name:" Sheikh Zayed",details:" Specially designed 1, 1.5 and 2 bedroom apartments that offer you all-encompassing views of the city as you embark on an exquisite waterfront lifestyle.",id:2,bed:"5"},
  {img:"https://aaf1bc7189.clvaw-cdnwnd.com/3e7c67d4c9462567f23b0b727d853874/200010494-567eb567ed/IMG_7750-HDR%20%28Copy%29-6.jpg?ph=aaf1bc7189",name:"Fifth Settlement",details:"340 reasons to elevate your quality of life. A rich sense of community and superlative waterfront living in one of the city’s most sought-after locations.",id:3}
];


function validateForm() {
  var img = document.getElementById("admin-prop-formimg").value.trim();
  var name = document.getElementById("admin-prop-formname").value.trim();
  var details = document.getElementById("admin-prop-formdetails").value.trim();
  var beds = document.getElementById("admin-prop-formbeds").value.trim();
  var livingrooms = document.getElementById("admin-prop-formlivingrooms").value.trim();
  var toilets = document.getElementById("admin-prop-formtoilets").value.trim();
  var garden = document.getElementById("admin-prop-formgarden").value.trim();
  var swimmingpools = document.getElementById("admin-prop-formswimmingpools").value.trim();
  var price = document.getElementById("admin-prop-formprice").value.trim();

  document.getElementById("img-err").innerHTML = "";
  document.getElementById("name-err").innerHTML = "";
  document.getElementById("details-err").innerHTML = "";
  document.getElementById("beds-err").innerHTML = "";
  document.getElementById("livingrooms-err").innerHTML = "";
  document.getElementById("toilets-err").innerHTML = "";
  document.getElementById("garden-err").innerHTML = "";
  document.getElementById("swimmingpools-err").innerHTML = "";
  document.getElementById("price-err").innerHTML = "";

  var isValid = true;

  if (img === '') {
      document.getElementById("img-err").innerHTML = "Please select an image.";
      isValid = false;
  }
  if (name === '') {
      document.getElementById("name-err").innerHTML = "Please enter a name.";
      isValid = false;
  }
  if (details === '') {
      document.getElementById("details-err").innerHTML = "Please enter details.";
      isValid = false;
  }
  if (beds === '' || parseInt(beds) < 0) {
      document.getElementById("beds-err").innerHTML = "Please enter a valid number of beds.";
      isValid = false;
  }
  if (livingrooms === '' || parseInt(livingrooms) < 0) {
      document.getElementById("livingrooms-err").innerHTML = "Please enter a valid number of living rooms.";
      isValid = false;
  }
  if (toilets === '' || parseInt(toilets) < 0) {
      document.getElementById("toilets-err").innerHTML = "Please enter a valid number of toilets.";
      isValid = false;
  }
  if (garden === '' || parseInt(garden) < 0) {
      document.getElementById("garden-err").innerHTML = "Please enter a valid number of gardens.";
      isValid = false;
  }
  if (swimmingpools === '' || parseInt(swimmingpools) < 0) {
      document.getElementById("swimmingpools-err").innerHTML = "Please enter a valid number of swimming pools.";
      isValid = false;
  }
  if (price === '' || parseInt(price) < 0) {
      document.getElementById("price-err").innerHTML = "Please enter a valid price.";
      isValid = false;
  }

  if (isValid) {
      add();
  }
}


function show(i){
  let id = "form"+i;
  console.log(id);
  document.getElementById(id).style="display:grid;";
  document.getElementById("blured-space").style="opacity:0.1";
  document.getElementById("adminvillasbackbtn").style="display:grid;";
  document.getElementById("admin-prop-edit").style="display:block";
}





function validateForm2(i) {
  var img = document.getElementById("admin-prop-formimg"+i).value.trim();
  var name = document.getElementById("admin-prop-formname"+i).value.trim();
  var details = document.getElementById("admin-prop-formdetails"+i).value.trim();
  var beds = document.getElementById("admin-prop-formbeds"+i).value.trim();
  var livingrooms = document.getElementById("admin-prop-formlivingrooms"+i).value.trim();
  var toilets = document.getElementById("admin-prop-formtoilets"+i).value.trim();
  var garden = document.getElementById("admin-prop-formgarden"+i).value.trim();
  var swimmingpools = document.getElementById("admin-prop-formswimmingpools"+i).value.trim();
  var price = document.getElementById("admin-prop-formprice"+i).value.trim();

  document.getElementById("img-err"+i).innerHTML = "";
  document.getElementById("name-err"+i).innerHTML = "";
  document.getElementById("details-err"+i).innerHTML = "";
  document.getElementById("beds-err"+i).innerHTML = "";
  document.getElementById("livingrooms-err"+i).innerHTML = "";
  document.getElementById("toilets-err"+i).innerHTML = "";
  document.getElementById("garden-err"+i).innerHTML = "";
  document.getElementById("swimmingpools-err"+i).innerHTML = "";
  document.getElementById("price-err"+i).innerHTML = "";

  var isValid = true;

  if (img === '') {
      document.getElementById("img-err"+i).innerHTML = "Please select an image.";
      isValid = false;
  }
  if (name === '') {
      document.getElementById("name-err"+i).innerHTML = "Please enter a name.";
      isValid = false;
  }
  if (details === '') {
      document.getElementById("details-err"+i).innerHTML = "Please enter details.";
      isValid = false;
  }
  if (beds === '' || parseInt(beds) < 0) {
      document.getElementById("beds-err"+i).innerHTML = "Please enter a valid number of beds.";
      isValid = false;
  }
  if (livingrooms === '' || parseInt(livingrooms) < 0) {
      document.getElementById("livingrooms-err"+i).innerHTML = "Please enter a valid number of living rooms.";
      isValid = false;
  }
  if (toilets === '' || parseInt(toilets) < 0) {
      document.getElementById("toilets-err"+i).innerHTML = "Please enter a valid number of toilets.";
      isValid = false;
  }
  if (garden === '' || parseInt(garden) < 0) {
      document.getElementById("garden-err"+i).innerHTML = "Please enter a valid number of gardens.";
      isValid = false;
  }
  if (swimmingpools === '' || parseInt(swimmingpools) < 0) {
      document.getElementById("swimmingpools-err"+i).innerHTML = "Please enter a valid number of swimming pools.";
      isValid = false;
  }
  if (price === '' || parseInt(price) < 0) {
      document.getElementById("price-err"+i).innerHTML = "Please enter a valid price.";
      isValid = false;
  }

  if (isValid) {
      add();
  }
}
