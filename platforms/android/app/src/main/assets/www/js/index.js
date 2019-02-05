//
document.addEventListener("deviceready", onDeviceReady());

function onDeviceReady(){
    // 
    //console.log(navigator.camera);
    // 
   $("#texto-inicializando").html("Criando Base de dados <br> <img src='img/carregando_bolinhas.gif' width='25%'>"); 
   window.disabledBackButton=true;
   criacaoDB();
}

function showModal(idModal) {
            //abre o modal para editar o produto selecionado
            //
            var modal = $("#" + idModal);
            //
            modal.css('display', 'block');
            modal.focus();
        }

function closeModal(idModal) {
            //fecha o modal do produto selecinado
            //
            var modal = $("#" + idModal);
            //
            modal.css('display', 'none');
        }