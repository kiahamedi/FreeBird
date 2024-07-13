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