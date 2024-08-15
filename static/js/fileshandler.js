function backItem(){
    var item = `
    <div class="file-item">
        <a href="javascript:backFromFolder()">
            <div class="file-item-icon file-item-level-up fas fa-level-up-alt text-secondary"></div>
        </a>
        <a href="javascript:backFromFolder()" class="file-item-name">
            ..
        </a>
    </div>
    `;
    return item;
}

function folderItem(id, name){
    var item_folder = `
        <div class="file-item" id="file-${id}">
            <div class="file-item-select-bg bg-primary"></div>
            <label class="file-item-checkbox custom-control custom-checkbox" id="file-checkbox-${id}">
                <input type="checkbox" class="custom-control-input" id="file-input-checkbox-${id}" onclick=checkboxIsChecked(${id}) />
                <span class="custom-control-label"></span>
            </label>
            <a href="javascript:openToFolder(${id},'${name}')"><div class="file-item-icon fas fa-folder text-secondary folderitem"></div></a>
            <a href="javascript:openToFolder(${id},'${name}')" class="file-item-name" id="file-item-name-${id}">
                ${name}
            </a>
            <div class="file-item-changed">02/13/2018</div>
            <div class="file-item-actions btn-group">
                <button type="button" class="btn btn-dropdown btn-sm  icon-btn borderless md-btn-flat hide-arrow dropdown-toggle" data-toggle="dropdown"><i class="ion ion-ios-more"></i></button>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="javascript:javascript:openToFolder(${id},'${name}')">Open to Folder</a>
                    <a class="dropdown-item" href="javascript:void(0)">Download</a>
                    <a class="dropdown-item" href="javascript:renameObject(${id})">Rename</a>
                    <a class="dropdown-item" href="javascript:void(0)">Move</a>
                    <a class="dropdown-item" href="javascript:void(0)">Copy</a>
                    <a class="dropdown-item" href="javascript:moveItemToTrash(${id})">Move to Trash</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:void(0)">Share To</a>
                    <a class="dropdown-item" href="javascript:void(0)">Generate Link</a>
                    <a class="dropdown-item" href="javascript:void(0)">Add to Stared</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:void(0)">Compress to zip</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to rar</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to tar</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to tar.gz</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:showInformation(${id},'folderItem')">Information</a>
                </div>
            </div>
        </div>
    `;
    return  item_folder;
}


function imageItem(id, name, url){
    var image_item = `
    <div class="file-item" id="file-${id}">
        <div class="file-item-select-bg bg-primary"></div>
        <label class="file-item-checkbox custom-control custom-checkbox" id="file-checkbox-${id}">
            <input type="checkbox" class="custom-control-input" id="file-input-checkbox-${id}" onclick=checkboxIsChecked(${id}) />
            <span class="custom-control-label"></span>
        </label>
        
        <a href="${url}" target="_blank"><div class="file-item-img" style="background-image: url(${url});"></div></a>
        <a href="${url}" target="_blank" class="file-item-name" id="file-item-name-${id}">
            ${name}
        </a>
        <div class="file-item-changed">02/20/2018</div>
        <div class="file-item-actions btn-group">
            <button type="button" class="btn btn-dropdown btn-sm  icon-btn borderless md-btn-flat hide-arrow dropdown-toggle" data-toggle="dropdown"><i class="ion ion-ios-more"></i></button>
            <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="${url}" target="_blank">Open</a>
                    <a class="dropdown-item" href="javascript:void(0)">Download</a>
                    <a class="dropdown-item" href="javascript:renameObject(${id})">Rename</a>
                    <a class="dropdown-item" href="javascript:void(0)">Move</a>
                    <a class="dropdown-item" href="javascript:void(0)">Copy</a>
                    <a class="dropdown-item" href="javascript:moveItemToTrash(${id})">Move to Trash</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:void(0)">Share To</a>
                    <a class="dropdown-item" href="javascript:void(0)">Generate Link</a>
                    <a class="dropdown-item" href="javascript:void(0)">Add to Stared</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:void(0)">Compress to zip</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to rar</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to tar</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to tar.gz</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:showInformation(${id}, 'imageItem')">Information</a>
                </div>
        </div>
    </div>
    `;
    return image_item;
}


function pdfItem(id, name, url){
    var pdf_item = `
        <div class="file-item" id="file-${id}">
            <div class="file-item-select-bg bg-primary"></div>
            <label class="file-item-checkbox custom-control custom-checkbox" id="file-checkbox-${id}">
                <input type="checkbox" class="custom-control-input" id="file-input-checkbox-${id}" onclick=checkboxIsChecked(${id}) />
                <span class="custom-control-label"></span>
            </label>
            <a href="${url}"><div class="file-item-icon fas fa-file-pdf text-secondary"></div></a>
            <a href="${url}" class="file-item-name" id="file-item-name-${id}">
                ${name}
            </a>
            <div class="file-item-changed">02/25/2018</div>
            <div class="file-item-actions btn-group">
                <button type="button" class="btn btn-dropdown btn-sm  icon-btn borderless md-btn-flat hide-arrow dropdown-toggle" data-toggle="dropdown"><i class="ion ion-ios-more"></i></button>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="${url}" target="_blank">Open</a>
                    <a class="dropdown-item" href="javascript:void(0)">Download</a>
                    <a class="dropdown-item" href="javascript:renameObject(${id})">Rename</a>
                    <a class="dropdown-item" href="javascript:void(0)">Move</a>
                    <a class="dropdown-item" href="javascript:void(0)">Copy</a>
                    <a class="dropdown-item" href="javascript:moveItemToTrash(${id})">Move to Trash</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:void(0)">Share To</a>
                    <a class="dropdown-item" href="javascript:void(0)">Generate Link</a>
                    <a class="dropdown-item" href="javascript:void(0)">Add to Stared</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:void(0)">Compress to zip</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to rar</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to tar</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to tar.gz</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:showInformation(${id}, 'pdfItem')">Information</a>
                </div>
            </div>
        </div>
    `;
    return pdf_item;
}


function compressedItem(id, name, url){
    var compressed_item = `
        <div class="file-item" id="file-${id}">
            <div class="file-item-select-bg bg-primary"></div>
            <label class="file-item-checkbox custom-control custom-checkbox" id="file-checkbox-${id}">
                <input type="checkbox" class="custom-control-input" id="file-input-checkbox-${id}" onclick=checkboxIsChecked(${id}) />
                <span class="custom-control-label"></span>
            </label>
            <a href="${url}"><div class="file-item-icon fas fa-file-archive text-secondary"></div></a>
            <a href="${url}" class="file-item-name" id="file-item-name-${id}">
                 ${name}
            </a>
            <div class="file-item-changed">02/16/2018</div>
            <div class="file-item-actions btn-group">
                <button type="button" class="btn btn-dropdown btn-sm  icon-btn borderless md-btn-flat hide-arrow dropdown-toggle" data-toggle="dropdown"><i class="ion ion-ios-more"></i></button>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="${url}" target="_blank">Open</a>
                    <a class="dropdown-item" href="javascript:void(0)">Download</a>
                    <a class="dropdown-item" href="javascript:renameObject(${id})">Rename</a>
                    <a class="dropdown-item" href="javascript:void(0)">Move</a>
                    <a class="dropdown-item" href="javascript:void(0)">Copy</a>
                    <a class="dropdown-item" href="javascript:moveItemToTrash(${id})">Move to Trash</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:void(0)">Share To</a>
                    <a class="dropdown-item" href="javascript:void(0)">Generate Link</a>
                    <a class="dropdown-item" href="javascript:void(0)">Add to Stared</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:void(0)">Compress to zip</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to rar</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to tar</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to tar.gz</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:showInformation(${id}, 'compressedItem')">Information</a>
                </div>
            </div>
        </div>
    `;
    return compressed_item;
}

function videoItem(id, name, url){
    var video_item = `
        <div class="file-item" id="file-${id}">
            <div class="file-item-select-bg bg-primary"></div>
            <label class="file-item-checkbox custom-control custom-checkbox" id="file-checkbox-${id}">
                <input type="checkbox" class="custom-control-input" id="file-input-checkbox-${id}" onclick=checkboxIsChecked(${id}) />
                <span class="custom-control-label"></span>
            </label>
            <a href="${url}"><div class="file-item-icon fas fa-file-video text-secondary"></div></a>
            <a href="${url}" class="file-item-name" id="file-item-name-${id}">
                 ${name}
            </a>
            <div class="file-item-changed">02/16/2018</div>
            <div class="file-item-actions btn-group">
                <button type="button" class="btn btn-dropdown btn-sm  icon-btn borderless md-btn-flat hide-arrow dropdown-toggle" data-toggle="dropdown"><i class="ion ion-ios-more"></i></button>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="${url}" target="_blank">Open</a>
                    <a class="dropdown-item" href="javascript:void(0)">Download</a>
                    <a class="dropdown-item" href="javascript:renameObject(${id})">Rename</a>
                    <a class="dropdown-item" href="javascript:void(0)">Move</a>
                    <a class="dropdown-item" href="javascript:void(0)">Copy</a>
                    <a class="dropdown-item" href="javascript:moveItemToTrash(${id})">Move to Trash</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:void(0)">Share To</a>
                    <a class="dropdown-item" href="javascript:void(0)">Generate Link</a>
                    <a class="dropdown-item" href="javascript:void(0)">Add to Stared</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:void(0)">Compress to zip</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to rar</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to tar</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to tar.gz</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:showInformation(${id}, 'videoItem')">Information</a>
                </div>
            </div>
        </div>
    `;
    return video_item;
}

function docItem(id, name, url){
    var doc_item = `
        <div class="file-item" id="file-${id}">
            <div class="file-item-select-bg bg-primary"></div>
            <label class="file-item-checkbox custom-control custom-checkbox" id="file-checkbox-${id}">
                <input type="checkbox" class="custom-control-input" id="file-input-checkbox-${id}" onclick=checkboxIsChecked(${id}) />
                <span class="custom-control-label"></span>
            </label>
            <a href="${url}"><div class="file-item-icon fas fa-file-word text-secondary"></div></a>
            <a href="${url}" class="file-item-name" id="file-item-name-${id}">
                 ${name}
            </a>
            <div class="file-item-changed">02/16/2018</div>
            <div class="file-item-actions btn-group">
                <button type="button" class="btn btn-dropdown btn-sm  icon-btn borderless md-btn-flat hide-arrow dropdown-toggle" data-toggle="dropdown"><i class="ion ion-ios-more"></i></button>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="${url}" target="_blank">Open</a>
                    <a class="dropdown-item" href="javascript:void(0)">Download</a>
                    <a class="dropdown-item" href="javascript:renameObject(${id})">Rename</a>
                    <a class="dropdown-item" href="javascript:void(0)">Move</a>
                    <a class="dropdown-item" href="javascript:void(0)">Copy</a>
                    <a class="dropdown-item" href="javascript:moveItemToTrash(${id})">Move to Trash</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:void(0)">Share To</a>
                    <a class="dropdown-item" href="javascript:void(0)">Generate Link</a>
                    <a class="dropdown-item" href="javascript:void(0)">Add to Stared</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:void(0)">Compress to zip</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to rar</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to tar</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to tar.gz</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:showInformation(${id}, 'docItem')">Information</a>
                </div>
            </div>
        </div>
    `;
    return doc_item;
}

function textItem(id, name, url){
    var text_item = `
        <div class="file-item" id="file-${id}">
            <div class="file-item-select-bg bg-primary"></div>
            <label class="file-item-checkbox custom-control custom-checkbox" id="file-checkbox-${id}">
                <input type="checkbox" class="custom-control-input" id="file-input-checkbox-${id}" onclick=checkboxIsChecked(${id}) />
                <span class="custom-control-label"></span>
            </label>
            <a href="${url}"><div class="file-item-icon fas fa-file-alt text-secondary"></div></a>
            <a href="${url}" class="file-item-name" id="file-item-name-${id}">
                 ${name}
            </a>
            <div class="file-item-changed">02/16/2018</div>
            <div class="file-item-actions btn-group">
                <button type="button" class="btn btn-dropdown btn-sm  icon-btn borderless md-btn-flat hide-arrow dropdown-toggle" data-toggle="dropdown"><i class="ion ion-ios-more"></i></button>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="${url}" target="_blank">Open</a>
                    <a class="dropdown-item" href="javascript:void(0)">Download</a>
                    <a class="dropdown-item" href="javascript:renameObject(${id})">Rename</a>
                    <a class="dropdown-item" href="javascript:void(0)">Move</a>
                    <a class="dropdown-item" href="javascript:void(0)">Copy</a>
                    <a class="dropdown-item" href="javascript:moveItemToTrash(${id})">Move to Trash</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:void(0)">Share To</a>
                    <a class="dropdown-item" href="javascript:void(0)">Generate Link</a>
                    <a class="dropdown-item" href="javascript:void(0)">Add to Stared</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:void(0)">Compress to zip</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to rar</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to tar</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to tar.gz</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:showInformation(${id}, 'textItem')">Information</a>
                </div>
            </div>
        </div>
    `;
    return text_item;
}

function otherItem(id, name, url){
    var other_item = `
        <div class="file-item" id="file-${id}">
            <div class="file-item-select-bg bg-primary"></div>
            <label class="file-item-checkbox custom-control custom-checkbox" id="file-checkbox-${id}">
                <input type="checkbox" class="custom-control-input" id="file-input-checkbox-${id}" onclick=checkboxIsChecked(${id}) />
                <span class="custom-control-label"></span>
            </label>
            <a href="${url}"><div class="file-item-icon fas fa-file text-secondary"></div></a>
            <a href="${url}" class="file-item-name" id="file-item-name-${id}">
                 ${name}
            </a>
            <div class="file-item-changed">02/16/2018</div>
            <div class="file-item-actions btn-group">
                <button type="button" class="btn btn-dropdown btn-sm  icon-btn borderless md-btn-flat hide-arrow dropdown-toggle" data-toggle="dropdown"><i class="ion ion-ios-more"></i></button>
                <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="${url}" target="_blank">Open</a>
                    <a class="dropdown-item" href="javascript:void(0)">Download</a>
                    <a class="dropdown-item" href="javascript:renameObject(${id})">Rename</a>
                    <a class="dropdown-item" href="javascript:void(0)">Move</a>
                    <a class="dropdown-item" href="javascript:void(0)">Copy</a>
                    <a class="dropdown-item" href="javascript:moveItemToTrash(${id})">Move to Trash</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:void(0)">Share To</a>
                    <a class="dropdown-item" href="javascript:void(0)">Generate Link</a>
                    <a class="dropdown-item" href="javascript:void(0)">Add to Stared</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:void(0)">Compress to zip</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to rar</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to tar</a>
                    <a class="dropdown-item" href="javascript:void(0)">Compress to tar.gz</a>
                    <hr class="mt-1 mb-1" style="background-color: white;">
                    <a class="dropdown-item" href="javascript:showInformation(${id}, 'otherItem')">Information</a>
                </div>
            </div>
        </div>
    `;
    return other_item;
}