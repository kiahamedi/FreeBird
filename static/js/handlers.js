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


async function refreshObjects(){
    $('#class-main-file-manager').html('');
    var pwd = getCookie('pwd');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + getCookie('ja'));

    const formdata = new FormData();
    formdata.append("pwd", pwd);

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
        data = data.data;

        // Check for is root path or exsit in folder
        var file_pwd =data[0]['pwd']
        if (file_pwd != "/root"){
            $('#class-main-file-manager').append(backItem());  
        }

        for (i=0; i<data.length; i++){
            console.log(data[i])
            
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