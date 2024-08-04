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

    refreshObjects(null,null);

    
});