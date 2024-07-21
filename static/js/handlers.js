// Function for Create Folder 
function createFolder(){
    var pwd = getCookie('pwd');
    var foldername = $("#input-text-modal-foldername").val()

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getCookie('ja'));

    const formdata = new FormData();
    formdata.append("pwd", pwd);
    formdata.append("folder-name", foldername);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };

    fetch("/account/api/createfolder/", requestOptions)
    .then((response) => {
        if (response.status == 201){
            toastMixinSuccess.fire({
                animation: true,
                title: "Your folder created successfully on FreeBird"
              });
            $("#input-text-modal-foldername").val("");
        } else {
            toastMixinDanger.fire({
                animation: true,
                title: "Your create folder was failed on FreeBird"
              });
            $("#input-text-modal-foldername").val("");
        }
    })
    .catch((error) => {
        console.error(error)
    });
}


async function refreshObjects(folderId, folderName, modalflag=0){
    $('#class-main-file-manager').html('');
    var pwd = getCookie('pwd').replace(/"/g,'');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getCookie('ja'));

    const formdata = new FormData();
    
    // check for call function from modal or not
    if (modalflag == 0){
        formdata.append("pwd", pwd);
    } else {
        formdata.append("pwd", getBackwardPath(pwd));
    }
    formdata.append("folderId", folderId);
    formdata.append("folderName", folderName);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };
    
    await fetch("/account/api/ourobjects/", requestOptions)
    .then((response)  =>  {
        if (response.status == 200){
            toastMixinSuccess.fire({
                animation: true,
                title: "Refreshed Data"
              });
            return response.json()
        } else {
            toastMixinDanger.fire({
                animation: true,
                title: "Error when refresh data!"
              });
        }
    }).then(data => {
        if (folderName != null && folderId != null){
            // check for call function from modal or not
            if (modalflag == 0){
                var tmp_pwd = getCookie('pwd').replace(/"/g,'') + '/' + folderName;
                setCookie('pwd', tmp_pwd);
                setCookie('pwd_id', folderId);
            } else {
                var tmp_pwd = getCookie('pwd').replace(/"/g,'');
                setCookie('pwd', tmp_pwd);
                setCookie('pwd_id', folderId);
            }
            
        }

        var pwd = getCookie('pwd').replace(/"/g,'');

        // Build ToolbarTree path
        buildBackwardPathToolbar(pwd);

        data = data.data;
        // TODO: If data is empty check for try catch
        // Check for is root path or exsit in folder
        console.log(data == []) 
        if (data.length == 0 || pwd != "/root") {
            $('#class-main-file-manager').append(backItem());  
        }

        for (i=0; i<data.length; i++){
            // console.log(data[i])
            
            var file_id = data[i]['id']
            var file_owner = data[i]['owner']
            var file_name =data[i]['name']
            var file_ifile =data[i]['ifile']
            var file_ifolder =data[i]['ifolder']
            var file_uploadfile =data[i]['uploadfile']
            var file_iformat =data[i]['iformat']
            var file_size =data[i]['size']
            var file_stared =data[i]['stared']
            var file_created =data[i]['created']
            var file_updated =data[i]['updated']
            
            // Append folders to file manager
            if (file_ifile == false && file_ifolder == true){
                $('#class-main-file-manager').append(folderItem(file_id, file_name));
            } else if (file_ifile == true && file_ifolder == false && file_iformat.includes('image/') == true){
                $('#class-main-file-manager').append(imageItem(file_id, file_name, file_uploadfile));
            } else if (file_ifile == true && file_ifolder == false && file_iformat.includes('pdf') == true){
                $('#class-main-file-manager').append(pdfItem(file_id, file_name, file_uploadfile));
            } else if (file_ifile == true && file_ifolder == false && file_iformat.includes('compressed') == true){
                $('#class-main-file-manager').append(compressedItem(file_id, file_name, file_uploadfile));
            } else if (file_ifile == true && file_ifolder == false && file_iformat.includes('video/') == true){
                $('#class-main-file-manager').append(videoItem(file_id, file_name, file_uploadfile));
            } else if (file_ifile == true && file_ifolder == false && file_iformat.includes('word') == true){
                $('#class-main-file-manager').append(docItem(file_id, file_name, file_uploadfile));
            }else if (file_ifile == true && file_ifolder == false && file_iformat.includes('text/plain') == true){
                $('#class-main-file-manager').append(textItem(file_id, file_name, file_uploadfile));
            } else if (file_ifile == true && file_ifolder == false){
                $('#class-main-file-manager').append(otherItem(file_id, file_name, file_uploadfile));
            }
            

        }
        
    })
    .catch((error) => {
        console.error(error)
    });


}




function openToFolder(id, name){
    refreshObjects(id, name);
}


function backFromFolder(){
    var pwd = getCookie('pwd');
    var backwardpath = getBackwardPath(pwd);
    if (backwardpath == '/root'){
        console.log("in backward")
        setCookie("pwd", backwardpath);
        setCookie("pwd_id", backwardpath);
        refreshObjects(null,null);
    }
}