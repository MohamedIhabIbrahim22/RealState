
const params = new URLSearchParams(document.location.search);
const username=params.get("user");
if(username!=null)
  {
    document.getElementById("linko-1").style="display:none";
    document.getElementById("linko-2").style="display:none";
    document.getElementById("username-name").innerHTML=username;
    document.getElementById("username-name-1").style="display:inline";
    
}