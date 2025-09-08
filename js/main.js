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
}

// delet Site
function deleteSite(index) {
  Sites.splice(index, 1);
  displaySites();
  // to save sites after delete items
  var local = JSON.stringify(Sites);
  localStorage.setItem("My Sites", local);
}
