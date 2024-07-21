var toastMixinSuccess = Swal.mixin({
  toast: true,
  icon: 'success',
  title: 'Title',
  animation: false,
  position: 'top-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

var toastMixinDanger = Swal.mixin({
  toast: true,
  icon: 'error',
  title: 'Title',
  animation: false,
  position: 'top-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function humanFileSize(size) {
  var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return +((size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

function getBackwardPath(path){
  var folders = path.split("/");
  var backwardPath = "";
  for (i=1; i<folders.length - 1 ; i++){
    backwardPath += "/" + folders[i]
  }
  return backwardPath;
}

function buildBackwardPathToolbar(path){
  $('#main-toolbar-tree-path').html('');
  $('#main-toolbar-tree-path').html('<li class="breadcrumb-item"></li>');
  var folders = path.split("/");
  var backwardPath = "";
  for (i=1; i<folders.length ; i++){
    $('#main-toolbar-tree-path').append(`
      <li class="breadcrumb-item">
          ${folders[i]}
      </li>
    `);
  }
  
  
}