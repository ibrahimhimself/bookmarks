var siteName = document.getElementById("siteName"),

    siteUrl = document.getElementById("siteUrl"),

    addFavorite = document.getElementById("addFavorite"),

    tbody = document.getElementById("tbody"),

    searchInp = document.getElementById("search");

   // websitesLists = [];

    if(localStorage.getItem("websitesData") == null){

        var websitesLists = [];
    } 
    else 
    {
        var websitesLists = JSON.parse(localStorage.getItem("websitesData"));
    }
    
    displayWebsite();

function addWebsite(){

    var websites = {

        Name : siteName.value,

        Link : siteUrl.value,
    }

    websitesLists.push(websites);

    localStorage.setItem("websitesData",JSON.stringify(websitesLists));

    displayWebsite();

    Clear();

}

function displayWebsite(){

    var trs = "";

    for(i=0; i<websitesLists.length; i++){

        trs +=
        `
        <tr style="font-size :36px">
            <td>${websitesLists[i].Name}</td>
            <td><button class="btn btn-danger">
            <a style = "text-decoration:none; color:#fff" href='${websitesLists[i].Link}' target="_blank">Visits</a>
            </button></td>
            <td><button class="btn btn-dark" onclick="removeSite(${i})">Delete</button></td>
            <td><button class="btn" style="background-color:gray; color:white;" onclick="update(${i})">Update</button></td>
        </tr>
        `
    }
    document.getElementById("tbody").innerHTML = trs;
}

function removeSite(index){

    websitesLists.splice(index,1);

    localStorage.setItem("websitesData",JSON.stringify(websitesLists));

    displayWebsite();
}

function search(){

    var str = "";

    for(i=0; i<websitesLists.length; i++){

        if(websitesLists[i].Name.toLowerCase().includes(searchInp.value)){

            str +=
            `
            <tr style="font-size :36px">
                <td>${websitesLists[i].Name.toLowerCase().replace(searchInp.value , `<span style="background-color: yellow;">${searchInp.value}</span>`)}</td>
                <td><button class="btn btn-danger">
                <a style = "text-decoration:none; color:#fff" href='${websitesLists[i].Link}' target="_blank">Visits</a>
                </button></td>
                <td><button class="btn btn-dark" onclick="removeSite(${i})">Delete</button></td>
                <td><button class="btn" style="background-color:gray; color:white;" onclick="update(${i})">Update</button></td>
            </tr>
            `
        }
        else
        {

        }
       
    }
    document.getElementById("tbody").innerHTML = str;
}

add = document.getElementById("addFavorite");

function update(index){

    siteName.value = websitesLists[index].Name
    siteUrl.value = websitesLists[index].Link

    add.innerHTML = "Update"

    add.onclick = function(){

        websitesLists[index].Name = siteName.value 
        websitesLists[index].Link = siteUrl.value 

        localStorage.setItem("websitesData",JSON.stringify(websitesLists));

        displayWebsite();

        add.onclick = addWebsite;

        add.innerHTML = "Add To Favorite"

        Clear()
    }
}

function Clear(){

    siteName.value = "";
    siteUrl.value = "";

}