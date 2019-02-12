var dados = [];
var pes_ids = [];
function iniciaAutoComplete(idInput, idMenu, opcao){
	  	if(opcao = 'pessoas'){
		  db.transaction(function (txn) {	
			var sql = "SELECT * FROM pessoas";
			txn.executeSql(sql, 
						   [], 
						   function (tx, res) {
						   	//alert(sql);
						   	var exbicao;
							   	for (var i = 0; i < res.rows.length; i++) {
							   		//console.log(i);
							   		exbicao = res.rows.item(i).pes_nome + ' ' + res.rows.item(i).pes_telefone;
							   		dados[i] = {label: exbicao, value: res.rows.item(i).pes_nome};
							   		pes_ids[res.rows.item(i).pes_nome] = res.rows.item(i).idpessoas;
							   	}	
		 				   	},
							function(tx, error){
							 	console.log(tx, error);
							});
		});
	}
	  $("#" + idInput).autocomplete({
		delay: 0,
	    source: dados,
	    appendTo: "#" + idMenu
	  });
}