function getData_atual(formato){
	var data = new Date();
	var dia     = data.getDate();          // 1-31
	var mes     = data.getMonth();         // 0-11 (zero=janeiro)
	var ano    = data.getFullYear();       // 4 dígitos
	var hora    = data.getHours();          // 0-23
	var min     = data.getMinutes();        // 0-59
	//
	mes++;
	//
	if (dia <= 9) {
		dia = '0' + dia;
	}
	if(mes <= 9){
		mes = '0' + mes;
	}
	//
	var dataCompleta;
	if (formato == 'Y-m-d') {
		dataCompleta = ano + '-' + mes + '-' + dia;
	}
	if (formato == 'd-m-Y') {
		dataCompleta = dia + '/' + mes + '/' + ano;
	}
	if (formato == 'Y-m-d H:m') {
		dataCompleta = ano + '-' + mes + '-' + dia + ' ' + hora + ':' + min;
	}
	if (formato == 'd-m-Y H:m') {
		dataCompleta = dia + '/' + mes + '/' + ano + ' ' + hora + ':' + min;
	}
	if (formato == 'Y-m-dTH:m') {
		dataCompleta = ano + '-' + mes + '-' + dia + 'T' + hora + ':' + min;
	}
	return dataCompleta;
}

function converteDateTime(dateTime){
	var dataHora = dateTime.split(' ');
	var data = dataHora[0].split('-');
	return data[2] + '/' + data[1] + '/' + data[0] + ' ' + dataHora[1];
}

//COMO FUNCIONA E COMO USAR 
// Obtém a data/hora atual
//var data = new Date();
// Guarda cada pedaço em uma variável
//
//data
// var dia     = data.getDate();           // 1-31
// var mes     = data.getMonth();          // 0-11 (zero=janeiro)
// var ano    = data.getFullYear();       // 4 dígitos
//var dia_sem = data.getDay();            // 0-6 (zero=domingo)
//var ano    = data.getYear();           // 2 dígitos
//
//horario
// var hora    = data.getHours();          // 0-23
// var min     = data.getMinutes();        // 0-59
//var seg     = data.getSeconds();        // 0-59
//var mseg    = data.getMilliseconds();   // 0-999
//var tz      = data.getTimezoneOffset(); // em minutos
//
// Monta a data e a hora
// var data_atual = dia + '/' + (mes+1) + '/' + ano4;
// var hora = hora + ':' + min + ':' + seg;
