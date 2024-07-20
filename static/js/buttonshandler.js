$(document).ready(function() {
    $("#button-modal-create-folder").click(function(){
        createFolder();
    }); 

    $("#button-main-refresh-objects").click(function(){
        refreshObjects();
    }); 

    refreshObjects();
});