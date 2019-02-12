function registrarEvento(){
	var titulo = $("#age_titulo").val();
	var descricao = $("#age_descricao").val();
	var dataHora = $("#age_data_hora").val();
	var pessoa = $("#pessoa_autocomplete").val();
	if(pessoa != ''){
		idpessoa = pes_ids[pessoa];
	}else{
		idpessoa = 'NULL';
	}
	if(dataHora == ''){
		closeLoading();
		alert('Informe uma data e hora!');
		return;
	}
	if(titulo == ''){
		closeLoading();
		alert('Informe um titulo!');
		return;
	}
	db.transaction(function (txn) {
		var sql = 'INSERT INTO agenda ( ';
		sql += 'age_titulo, ';
		sql += 'age_descricao, ';
		sql += 'age_data_hora, ';
		sql += 'age_idpessoas ) VALUES(?,?,strftime(\'%s\',?),?)';
		console.log(sql);
		txn.executeSql(sql,
					[titulo, descricao, dataHora, idpessoa], 
	  				 function (tx, res) {
	  				 	//Zera os campos e reseta o button
	  				 	$("#age_titulo").val('');
						$("#age_descricao").val('');
						$("#age_data_hora").val('');
						$("#pessoa_autocomplete").val('');
						if($("#checkVinculaPessoa").is(':checked')){
							$("#checkVinculaPessoa").click();
						}
						closeLoading();
						alert('Evento registrado com sucesso!');
						attListaEventos();
					 },
					 function(tx, error){
					 	closeLoading();
					 	alert('Ops!\nParece que tivemos algum problema, tente novamente mais tarde.');
					 	console.log(tx, error);
					 });
	  });

}

function attListaEventos(){
	var data_atual = $("#data_consulta").val();
	db.transaction(function (txn) {	
		var sql = "SELECT *, datetime(age_data_hora, 'unixepoch') as age_data FROM agenda WHERE age_data_hora >= strftime(\'%s\', '" + data_atual + "') AND age_data_hora <= strftime(\'%s\', '" + data_atual + " 23:59:59' )";
		//console.log(sql);
		txn.executeSql(sql, 
					   [], 
					   function (tx, res) {
					   	//alert(sql);
					   	eventos_dados = [];
						for (var i = 0; i < res.rows.length; i++) {
					   		//console.log(i);
							eventos_dados.push(res.rows.item(i));
					   	}
						eventos.attBusca(eventos_dados);	
	 				   	},
						function(tx, error){
						 	console.log(tx, error);
						});
	});
}

