var $ = jQuery;
    $(document).ready(function () {
        'use strict';
        var errorItems = { "errorItem": { name: "Items Load error" },};

        var itemscpm = {
            "sortby": {
                name: "Sort By",
                icon: "fas fa-sort-amount-down-alt",
                items: {
                    "old": { name: "Old", icon: "fas fa-sort-numeric-down"},
                    "new": { name: "New", icon: "fas fa-sort-numeric-up"},
                    "create": { name: "Create", icon: "fas fa-calendar-plus"},
                }
            },
            "newfolder": { name: "New Folder", icon: "fas fa-folder-plus" },
            "moveobject": { name: "Move", icon: "fas fa-exchange-alt" },
            "copyobject": { name: "Copy", icon: "fas fa-copy" },
            "pasteobject": { name: "Paste", icon: "fas fa-paste", visible: function(key, opt) {
                if (getCookie('is_cm_stage') == '1'){
                    return true;
                } else {
                    return false;
                }
                }},
            "uploadfile": { name: "Upload File", icon: "fas fa-file-upload" },
            "uploadfolder": { name: "Upload Folder", icon: "fas fa-folder-open" },
        }
    

        
        $.contextMenu({
            selector: '.context-menu-one',
            build: function ($trigger, e) {
                return {
                    callback: function (key, options) {
                        var m = "clicked: " + key;
                        console.log(m);
                        if (key == "uploadfile"){
                            $('#modal-upload-file').modal('toggle');
                        }else if (key == "newfolder"){
                            $('#modal-create-folder').modal('toggle');
                        }else if (key == "moveobject"){
                            moveObjectsToNewDir();
                        }else if (key == "copyobject"){
                            setCookie("is_cm_stage", '1');

                        }else if (key == "pasteobject"){
                            pasteObjectsToNewDir();

                        };
                    },
                    items: itemscpm
                };
            }
        });

        //normal promise usage example
        var completedPromise = function (status) {
            console.log("completed promise:", status);
        };

        var failPromise = function (status) {
            console.log("fail promise:", status);
        };

        var notifyPromise = function (status) {
            console.log("notify promise:", status);
        };

        $.loadItemsAsync = function() {
            console.log("loadItemsAsync");
            var promise = loadItems();
            $.when(promise).then(completedPromise, failPromise, notifyPromise);
        };

});

