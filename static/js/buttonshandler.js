$(document).ready(function() {
    $("#button-modal-create-folder").click(function(){
        createFolder();
    }); 

    $("#button-main-refresh-objects").click(function(){

        var folderId = getCookie('pwd_id').replace(/"/g,'');
        var folderName = getCookie('pwd').replace(/"/g,'');
        if (folderId == '/root' && folderName == '/root'){
            refreshObjects(null,null);
        } else {
            refreshObjects(folderId,folderName);
        }
        
    }); 

    refreshObjects(null,null);
});