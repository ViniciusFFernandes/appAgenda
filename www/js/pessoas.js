function registrarPessoa(){
	var nome = $("#pes_nome").val();
	var telefone = $("#pes_telefone").val();
	var endereco = $("#pes_endereco").val();
	if(diretorio_foto == ''){
		diretorio_foto = './img/padrao.jpg';
	}
	db.transaction(function (txn) {
		var sql = 'INSERT INTO pessoas ( ';
		sql += 'pes_nome, ';
		sql += 'pes_telefone, ';
		sql += 'pes_endereco, ';
		sql += 'pes_img_perfil ) VALUES(?,?,?,?)';
		txn.executeSql(sql,
					[nome, telefone, endereco, diretorio_foto], 
	  				 function (tx, res) {
	  				 	//Zera os campos e reseta o button
	  				 	$("#pes_nome").val('');
						$("#pes_telefone").val('');
						$("#pes_endereco").val('');
						$("#" + retornoSpan).html('');
						diretorio_foto = '';
						retornoSpan = '';
						closeLoading();
						if(pessoas_criado){
							buscarPessoas($("#buscaPessoa_nome").val());
						}
						alert('Pessoa cadastrado com sucesso!');
					 },
					 function(tx, error){
					 	closeLoading();
					 	alert('Ops!\nParece que tivemos algum problema, tente novamente mais tarde.');
					 	console.log(tx, error);
					 });
	  });

}

function getPessoas(){

	db.transaction(function (txn) {	
		var sql = "SELECT * FROM pessoas";
		txn.executeSql(sql, 
					   [], 
					   function (tx, res) {
					   	//alert(sql);
						   	for (var i = 0; i < res.rows.length; i++) {
						   		//console.log(i);
						   		pessoas_dados.push(res.rows.item(i));
						   	}
						   	pessoas.iniciaVarialvel(pessoas_dados);	
	 				   	},
						function(tx, error){
						 	console.log(tx, error);
						});
	});
}

function buscarPessoas(where_nomeCli){
	$("#buscandoNoBanco").html('<img src="img/carregando_bolinhas.gif" width="40px" height="30px;">');
	db.transaction(function (txn) {	
		var sql = "SELECT * FROM pessoas";
		if(where_nomeCli != ''){
			sql += " WHERE pes_nome like '%" + where_nomeCli + "%'"
		}
		txn.executeSql(sql, 
					   [], 
					   function (tx, res) {
					   	//alert(sql);
					   	pessoas_dados = [];
						   	for (var i = 0; i < res.rows.length; i++) {
						   		//console.log(i);
						   		pessoas_dados.push(res.rows.item(i));
						   	}
						   	pessoas.attBusca(pessoas_dados);
						   	$("#buscandoNoBanco").html('');	
	 				   	},
						function(tx, error){
							$("#buscandoNoBanco").html('');
						 	console.log(tx, error);
						});
	});

	
}

function exbirPessoas(){
	$("#divPessoas").toggle();
}

function atualizarPessoa(){
	var nome = $("#edit_pes_nome").val();
	var telefone = $("#edit_pes_telefone").val();
	var endereco = $("#edit_pes_endereco").val();
	db.transaction(function (txn) {
		var sql = 'UPDATE pessoas SET ';
		sql += 'pes_nome = ?, ';
		sql += 'pes_telefone = ?, ';
		sql += 'pes_endereco = ?, ';
		sql += 'pes_img_perfil = ?';
		txn.executeSql(sql,
					[nome, telefone, endereco, diretorio_foto], 
	  				 function (tx, res) {
	  				 	//Zera os campos e reseta o button
						closeLoading();
						closeModal('modal_EditaPessoas');
						buscarPessoas($("#buscaPessoa_nome").val());
						alert('Dados alterados com sucesso!');
					 },
					 function(tx, error){
					 	closeLoading();
					 	alert('Ops!\nParece que tivemos algum problema, tente novamente mais tarde.');
					 	console.log(tx, error);
					 });
	  });
}