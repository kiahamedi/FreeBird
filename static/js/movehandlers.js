function moveOrCopyObjectsToNewDir(mode){
    setCookie("is_cm_stage", '1');
    setCookie("is_cm_mode", mode);
    var av_items = $(".custom-control-input");
    var checkItems = []
    for (i=0; i<av_items.length;i++){
        if(av_items[i].checked){
            
            checkItems.push(av_items[i]['id'].split("-")[3]);
        }
    }
    setCookie("is_cm_selected", checkItems.join(","));
}


function pasteObjectsToNewDir(){
    var items = getCookie("is_cm_selected");
    var pwd = getCookie('pwd').replace(/"/g,'');
    var mode = getCookie('is_cm_mode');
    
    // alert(items +" "+ pwd +" "+ mode);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getCookie('ja'));

    const formdata = new FormData();
    formdata.append("objectIds", items);
    formdata.append("pwd", pwd);
    formdata.append("mode", mode);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };
    
    fetch("/account/api/moveorcopyobject/", requestOptions)
    .then((response)  =>  {
        if (response.status == 200){
            return response.json()
        } else {
            toastMixinDanger.fire({
                animation: true,
                title: "Exist Problem!"
              });
        }
    }).then(data => {
        refreshObjectsHere();
        var msg = data.msg;
        toastMixinSuccess.fire({
            animation: true,
            title: msg
          });
        
    })
    .catch((error) => {
        console.error(error)
    });

    
    setCookie("is_cm_mode", 'noraml');
    setCookie("is_cm_stage", '0');
    setCookie("is_cm_selected", "");
}

