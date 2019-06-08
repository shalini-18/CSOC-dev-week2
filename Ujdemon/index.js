var myVar;

function myFunction() {
    document.getElementById("myDiv").style.display="none";
    myVar = setTimeout(showPage, 500);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}