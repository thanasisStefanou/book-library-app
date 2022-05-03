

/* klish synarthshs delete book*/
function deleteBook(workid) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/deletebook", true); 
     xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           
            alert('Successfully deleted.');
            window.location.reload();
        }
    };
    var data = {workid : workid};
    xhttp.send(JSON.stringify(data));
}
 
//EDIT
function edit(workid) {
    document.getElementById('workid').setAttribute('value', workid);
    document.getElementById('favor_edit_form').submit();
}

//ADD
 function FavorAdd(title, author, workid ) {

        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/add", true); 
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                
                var response = JSON.parse(this.responseText);
                console.log(response.msg)
                if(response.msg == 'Ok') {
                    alert('Successfully added!')
                }else if( response.msg == 'exist') {
                    alert('This has already added.')
                }
            }
        };
        var data = {
            title : title,
            author : author,
            workid : workid,
            review : '' ,       
           
        };
        xhttp.send(JSON.stringify(data));
   
}

