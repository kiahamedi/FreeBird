$(document).ready(function() {
    $("#button-modal-create-folder").click(function(){
        createFolder();
    }); 

    $("#button-main-refresh-objects").click(function(){

        refreshObjectsHere();
        
    }); 

    $("#button-modal-object-rename").click(function(){

        sendRenameObject();
        
    }); 


    $("#button-modal-object-move-to-trash").click(function(){

        submitItemToTrash();
        
    }); 

    refreshObjects(null,null);

    
});