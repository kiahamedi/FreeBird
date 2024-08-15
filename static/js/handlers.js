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
            $('#modal-create-folder').modal('toggle');
            refreshObjectsHere();
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

    var isTrash = getCookie('is_trash');

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
    formdata.append("isTrash", isTrash);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };
    
    await fetch("/account/api/ourobjects/", requestOptions)
    .then((response)  =>  {
        if (response.status == 200){
            // toastMixinSuccess.fire({
            //     animation: true,
            //     title: "Refreshed Data"
            //   });
            return response.json()
        } else {
            // toastMixinDanger.fire({
            //     animation: true,
            //     title: "Error when refresh data!"
            //   });
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
    if (getCookie('is_trash') == '1'){
        toastMixinDanger.fire({
            animation: true,
            title: "Your folder is in trash, for open it please restore from trash!"
          });
    } else {
        refreshObjects(id, name);
    }
    
}


function backFromFolder(){
    var pwd = getCookie('pwd');
    var backwardpath = getBackwardPath(pwd);
    if (backwardpath == '/root'){
        console.log("in backward");
        setCookie("pwd", backwardpath);
        setCookie("pwd_id", backwardpath);
        refreshObjects(null,null);
    } else {
        console.log("in backward");
        setCookie("pwd", backwardpath);
        setCookie("pwd_id", backwardpath);
        refreshObjects(null,null);

    }
}

function checkboxIsChecked(id)
{   
    if ($(`#file-input-checkbox-${id}`).is(':checked') != true){
        $(`#file-checkbox-${id}`).css({ 'opacity': '0' });
    } else {
        $(`#file-checkbox-${id}`).css({ 'opacity': '1' });
    }
}


function showInformation(id, type){
    getInformationObject(id, type);
    if (type == "folderItem"){
        console.log("folderItem");
        $("#main-modal-information-icon").html("");
        $("#main-modal-information-icon").html('<span class="fas fa-folder text-warning fa-10x"></span>');
    } else if (type == "imageItem"){
        console.log("imageItem");
        $("#main-modal-information-icon").html("");
        $("#main-modal-information-icon").html('<img src="https://adminlte.io/themes/v3/dist/img/user1-128x128.jpg" alt="user-avatar" class="img-circle img-fluid" id="modal-information-image" style="width:160px; height:160px">');
    } else if (type == "pdfItem"){
        console.log("pdfItem");
        $("#main-modal-information-icon").html("");
        $("#main-modal-information-icon").html('<span class="fas fa-file-pdf text-white fa-10x"></span>');
    } else if (type == "compressedItem"){
        console.log("compressedItem");
        $("#main-modal-information-icon").html("");
        $("#main-modal-information-icon").html('<span class="fas fa-file-archive text-white fa-10x"></span>');
    } else if (type == "videoItem"){
        console.log("videoItem");
        $("#main-modal-information-icon").html("");
        $("#main-modal-information-icon").html('<span class="fas fa-file-video text-white fa-10x"></span>');
    } else if (type == "docItem"){
        console.log("docItem");
        $("#main-modal-information-icon").html("");
        $("#main-modal-information-icon").html('<span class="fas fa-file-word text-white fa-10x"></span>');
    } else if (type == "textItem"){
        console.log("textItem");
        $("#main-modal-information-icon").html("");
        $("#main-modal-information-icon").html('<span class="fas fa-file-alt text-white fa-10x"></span>');
    } else {
        console.log("otherItem");
        $("#main-modal-information-icon").html("");
        $("#main-modal-information-icon").html('<span class="fas fa-file text-white fa-10x"></span>');
    }
    $('#modal-information').modal('toggle');
};



function getInformationObject(id, type){

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getCookie('ja'));

    const formdata = new FormData();
    formdata.append("objectId", id);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };
    
    fetch("/account/api/information/", requestOptions)
    .then((response)  =>  {
        if (response.status == 200){
            return response.json()
        } else {
            toastMixinDanger.fire({
                animation: true,
                title: "Error when get information data!"
              });
        }
    }).then(data => {

        data = data.data;
        var size = data.size;
        if (size == null || size == ""){
            var size = "...";
        }
        if (type == "imageItem"){
            console.log("data.imageUrl", data.imageUrl)
            $("#modal-information-image").attr("src",data.imageUrl);
        }
        console.log(data.shared)
        console.log(data.shared == true)
        if (data.shared == true){
            $("#modal-information-shared").html('<i class="fas fa-check text-success ml-2"></i>');
        } else {
            $("#modal-information-shared").html('<i class="fas fa-times text-danger ml-2"></i>');
        }
        
        $("#modal-information-name").html(data.name);
        $("#modal-information-type").html(data.type);
        $("#modal-information-owner").html(data.owner);
        $("#modal-information-path").html(data.path);
        $("#modal-information-size").html(size);
        $("#modal-information-created").html(data.created);
        $("#modal-information-updated").html(data.updated);
        
    })
    .catch((error) => {
        console.error(error)
    });
}

function renameObject(id){
    $('#input-text-modal-objectid').val(id);
    $('#input-text-modal-newname').val($("#file-item-name-" + id).text().trim());
    $('#modal-object-rename').modal('toggle');
}

function sendRenameObject(){
    var objID = $('#input-text-modal-objectid').val();
    var objName = $('#input-text-modal-newname').val();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getCookie('ja'));

    const formdata = new FormData();
    formdata.append("objectId", objID);
    formdata.append("objectNewName", objName);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };
    
    fetch("/account/api/rename/", requestOptions)
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

        data = data.data;
        var obid = data.id;
        var obname = data.name;
        $("#file-item-name-" + obid).text(obname);
        $('#input-text-modal-objectid').val("");
        $('#input-text-modal-newname').val("");
        $('#modal-object-rename').modal('toggle');
        
    })
    .catch((error) => {
        console.error(error)
    });


}


function moveItemToTrash(id){
    $('#input-modal-move-to-trash-id').val(id);
    $('#modal-object-move-to-trash').modal('toggle');
}

function submitItemToTrash(){
    var objID = $('#input-modal-move-to-trash-id').val();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getCookie('ja'));

    const formdata = new FormData();
    formdata.append("objectId", objID);
    formdata.append("objectRestoreStatus", 0);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };
    
    fetch("/account/api/movetotrash/", requestOptions)
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

        data = data.data;
        var obid = data.id;

        $("#file-" + obid).remove()
        $('#input-modal-move-to-trash-id').val("");
        $('#modal-object-move-to-trash').modal('toggle');

        toastMixinSuccess.fire({
            animation: true,
            title: "Your item now in Trash!"
          });
        
    })
    .catch((error) => {
        console.error(error)
    });
}


function restoreItemfromTrash(objID){

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getCookie('ja'));

    const formdata = new FormData();
    formdata.append("objectId", objID);
    formdata.append("objectRestoreStatus", 1);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };
    
    fetch("/account/api/movetotrash/", requestOptions)
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

        data = data.data;
        var obid = data.id;

        $("#file-" + obid).remove()

        toastMixinSuccess.fire({
            animation: true,
            title: "Your item now in My Drive!"
          });
        
    })
    .catch((error) => {
        console.error(error)
    });
}


function removeItemForEver(id){
    $('#input-modal-remove-for-ever-id').val(id);
    $('#modal-object-remove-for-ever').modal('toggle');
}

function submitRemoveItemForEver(){
    var objID = $('#input-modal-remove-for-ever-id').val();

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getCookie('ja'));

    const formdata = new FormData();
    formdata.append("objectId", objID);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };
    
    fetch("/account/api/removeforever/", requestOptions)
    .then((response)  =>  {
        if (response.status == 201){
            return response.json()
        } else {
            toastMixinDanger.fire({
                animation: true,
                title: "Exist Problem!"
              });
        }
    }).then(data => {

        data = data.data;
        var obid = data.id;

        $("#file-" + obid).remove()
        $('#modal-object-remove-for-ever').modal('toggle');

        toastMixinSuccess.fire({
            animation: true,
            title: "Your item DEAD!!! :("
          });
        
    })
    .catch((error) => {
        console.error(error)
    });
}
