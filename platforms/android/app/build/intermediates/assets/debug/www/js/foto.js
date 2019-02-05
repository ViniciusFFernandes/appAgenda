var diretorio_foto = '';
var retornoSpan = '';

function addFoto(opacao, retorno){
  var cameraOptions = {
    quality: 70,
    destinationType: 0,
    sourceType: opacao,
    targetWidth: 700,
    targetHeight: 500,
    saveToPhotoAlbum: true
  };
  retornoSpan = retorno;
  navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
}

function cameraSuccess(imageData){
  diretorio_foto = "data:image/jpeg;base64," + imageData;
  $("#" + retornoSpan).html('<i class="icon text-green-600 ion-checkmark-round"></i>');
}

function cameraError(error){
  alert(error);
  $("#" + retornoSpan).html('<i class="icon text-red ion-close-round"></i>');
}

function openFoto(idModal){
    showModal(idModal);
    $("#abrir_img").attr('src', usuario.img_perfil);
}

function closeFoto(idModal){
    closeModal(idModal);
    $("#abrir_img").attr('src', ' ');
}