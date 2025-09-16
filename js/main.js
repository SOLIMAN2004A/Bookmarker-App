var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("URL");
var addBtn = document.getElementById("addbtn");
var Sites = [];
var currentIndex = 0;

// to display a product that saved in local Storage
if (localStorage.getItem("My Sites") !== null) {
  Sites = JSON.parse(localStorage.getItem("My Sites"));
  displaySites();
}

// when we click on btn
addBtn.onclick = function () {
  if (document.getElementById("addbtn").innerHTML !== "Update") {
    addSite();
  } else {
    updateSite();
  }

  displaySites();
};

// Add site
function addSite() {
  var site = {
    nameSite: siteName.value,
    urlSite: siteUrl.value,
  };
  Sites.push(site);
  // save sites in local storage
  var local = JSON.stringify(Sites);
  localStorage.setItem("My Sites", local);
  // to reset input
  resetInput();
  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
  btnValidName = false;
  btnValidUrl = false;
  addBtn.disabled = true;
}

// to display Sites  in table
function displaySites() {
  var allSites = "";
  for (var i = 0; i < Sites.length; i++) {
    allSites += `<tr>  
    <th scope="row">${i + 1}</th> 
    <td>${Sites[i].nameSite} </td>
    <td>${Sites[i].urlSite} </td> 
    <td><a class="btn"  onclick="siteinfo(${i})"><i class="fa-solid fa-pen"></i></a></td> 
    <td><a class="btn"  onclick="deleteSite(${i})"><i class="fa-solid fa-trash"></i></a></td>
    </tr>`;
  }
  document.getElementById("bodyData").innerHTML = allSites;
}

// reset form input
var restcolllection = document.getElementsByClassName("form-control");
function resetInput() {
  //to rest the input whatever how many number of input
  for (var i = 0; i < restcolllection.length; i++) {
    restcolllection[i].value = "";
  }
}

// search site in bookmark
function searchProduct(searchSitename) {
  var searchSites = "";
  for (var i = 0; i < Sites.length; i++) {
    if (
      Sites[i].nameSite.toLowerCase().includes(searchSitename.toLowerCase())
    ) {
      searchSites += `<tr>  
    <th scope="row">${i + 1}</th> 
    <td>${Sites[i].nameSite} </td>
    <td>${Sites[i].urlSite} </td> 
    <td><a class="btn"  onclick="siteinfo(${i})"><i class="fa-solid fa-pen"></i></a></td> 
    <td><a class="btn"  onclick="deleteSite(${i})"><i class="fa-solid fa-trash"></i></a></td>
    </tr>`;
    }
  }
  document.getElementById("bodyData").innerHTML = searchSites;
}

// site info
function siteinfo(index) {
  currentIndex = index;
  siteName.value = Sites[index].nameSite;
  siteUrl.value = Sites[index].urlSite;
  siteName.classList.add("is-valid");
  siteUrl.classList.add("is-valid");
  btnValidName = true;
  btnValidUrl = true;
  addBtn.disabled = false;

  //  to change name of btn to update
  document.getElementById("addbtn").innerHTML = "Update";
}

// update site in list
function updateSite() {
  Sites[currentIndex].nameSite = siteName.value;
  Sites[currentIndex].urlSite = siteUrl.value;
  // to save sites after update  items
  var local = JSON.stringify(Sites);
  localStorage.setItem("My Sites", local);
  // to reset input
  resetInput();
  document.getElementById("addbtn").innerHTML = "Add Site";
  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
  btnValidName = false;
  btnValidUrl = false;
  addBtn.disabled = true;
}

// delet Site
function deleteSite(index) {
  Sites.splice(index, 1);
  displaySites();
  // to save sites after delete items
  var local = JSON.stringify(Sites);
  localStorage.setItem("My Sites", local);
}
var btnValidName = false;
var btnValidUrl = false;

// Vailidation the input
var alertSiteName = document.getElementById("alertSiteName");
siteName.onkeyup = function () {
  var regexNameSite = /^[A-Za-z0-9 _-]{3,15}$/;
  if (regexNameSite.test(siteName.value) && siteName.value.trim() !== "") {
    btnValidName = true;
    siteName.classList.remove("is-invalid");
    siteName.classList.add("is-valid");
    alertSiteName.classList.add("d-none");
  } else {
    btnValidName = false;
    siteName.classList.remove("is-valid");
    siteName.classList.add("is-invalid");
    alertSiteName.classList.remove("d-none");
  }
  validateButton();
};

// Vailidation the URL input
var alertSiteUrl = document.getElementById("alertSiteUrl");
siteUrl.onkeyup = function () {
  var regexNameSite = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
  if (regexNameSite.test(siteUrl.value) && siteUrl.value.trim() !== "") {
    btnValidUrl = true;
    siteUrl.classList.remove("is-invalid");
    siteUrl.classList.add("is-valid");
    alertSiteUrl.classList.add("d-none");
  } else {
    btnValidUrl = false;
    siteUrl.classList.remove("is-valid");
    siteUrl.classList.add("is-invalid");
    alertSiteUrl.classList.remove("d-none");
  }
  validateButton();
};

// buttom validation
function validateButton() {
  if (btnValidName && btnValidUrl) {
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.disabled = true;
  }
}
