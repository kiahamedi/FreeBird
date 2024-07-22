
var uploadedFileName;

function uploadProgressHandler(event) {
    var percent = (event.loaded / event.total) * 100;
    var progress = Math.round(percent);
    $("#modal-upload-progressbar-percentage").html(progress + "%" + " | " + humanFileSize(event.loaded) + " bytes of " + humanFileSize(event.total));
}

function loadHandler(event) {
    var percent = (event.loaded / event.total) * 100;
    var progress = Math.round(percent);
    $("#modal-upload-progressbar").attr('aria-valuenow', progress + '');
    $("#modal-upload-progressbar").attr('style','width: ' + progress + '%;');
    if (progress == 100) {
        $("#modal-upload-progressbar").attr('class','progress-bar bg-success');
        $("#modal-listof-uploaded").prepend("<a href='#' class='list-group-item list-group-item-success text-success'>"+uploadedFileName+"</a>");
        
        refreshObjectsHere();
    }
}


function errorHandler(event) {
    $("#modal-upload-progressbar").attr('class','progress-bar bg-danger');
    $("#modal-upload-progressbar").attr('aria-valuenow','100');
    $("#modal-upload-progressbar").attr('style','width: 100%;');
    $("#modal-upload-progressbar-percentage").html("Upload Failed");
    $("#modal-listof-uploaded").prepend("<a href='#' class='list-group-item list-group-item-success text-danger'>"+uploadedFileName+"</a>");
}

function abortHandler(event) {
    $("#modal-upload-progressbar").attr('class','progress-bar bg-warning');
    $("#modal-upload-progressbar").attr('aria-valuenow','100');
    $("#modal-upload-progressbar").attr('style','width: 100%;');
    $("#modal-upload-progressbar-percentage").html("Upload Aborted");
    $("#modal-listof-uploaded").prepend("<a href='#' class='list-group-item list-group-item-success text-warning'>"+uploadedFileName+"</a>");
}

+ function($) {
    'use strict';

    // UPLOAD CLASS DEFINITION
    // ======================

    var dropZone = document.getElementById('drop-zone');
    var uploadForm = document.getElementById('js-upload-form');

    var startUpload = function(files) {
        console.log(files);
        var i = 0;
        for (i=0; i < files.length; i++){
            
            var file = files[i];
            uploadedFileName = file.name;
            var pwd = getCookie('pwd').replace(/"/g,'');

            var form = new FormData();
            form.append("user-file", file);
            form.append("user-file-path", pwd);
            form.append("user-file-type", file.type);

            $.ajax({
                url: '/account/api/upload/',
                method: 'POST',
                type: 'POST',
                headers: {
                    "Authorization": "Bearer " + getCookie('ja')
                },
                data: form,
                contentType: false,
                processData: false,
                xhr: function () {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress",
                        uploadProgressHandler,
                        false
                    );
                    xhr.addEventListener("load", loadHandler, false);
                    xhr.addEventListener("error", errorHandler, false);
                    xhr.addEventListener("abort", abortHandler, false);

                    return xhr;
                }
            });
            
        }
    }

    uploadForm.addEventListener('submit', function(e) {
        var uploadFiles = document.getElementById('js-upload-files').files;
        e.preventDefault()

        startUpload(uploadFiles)
    })

    dropZone.ondrop = function(e) {
        e.preventDefault();
        this.className = 'upload-drop-zone';

        startUpload(e.dataTransfer.files)
    }

    dropZone.ondragover = function() {
        this.className = 'upload-drop-zone drop';
        return false;
    }

    dropZone.ondragleave = function() {
        this.className = 'upload-drop-zone';
        return false;
    }

}(jQuery);