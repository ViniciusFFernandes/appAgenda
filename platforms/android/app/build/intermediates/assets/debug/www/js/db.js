var db;

function criacaoDB(){
	var tamanhoDB = 80 * 1024 * 1024; //80 MB
	db = openDatabase("BaseAgenda", "1.0", "Agenda Pessoal db", tamanhoDB , function() {
		    console.log('Banco de dados criado com sucesso!');
		});
	criaCliente();
	criaAgenda();
}

function criaCliente(){
	db.transaction(function (txn) {
		var sql = 'CREATE TABLE IF NOT EXISTS clientes( ';
		sql += ' idclientes INTEGER PRIMARY KEY AUTOINCREMENT, ';
		sql += ' cli_nome TEXT, ';
		sql += ' cli_telefone TEXT , ';
		sql += ' cli_endereco TEXT NULL, ';
		sql += ' cli_img_perfil TEXT NULL ';
		sql += ')';
  		txn.executeSql(sql, [], 
	  				 function (tx, res) {
	  				 	console.log("Tabela de clientes criada com sucesso!");
					 },
					 function(tx, error){
					 	console.log(tx, error);
					 	alert("Ops ocorreu algum problema\nPorfavor reinicie a agenda!")
					 }); 
	  });
}

function criaAgenda(){
	db.transaction(function (txn) {
		//
		var sql = 'CREATE TABLE IF NOT EXISTS agenda( ';
		sql += ' idagenda INTEGER PRIMARY KEY AUTOINCREMENT, ';
		sql += ' age_data_hora INT, ';
		sql += ' age_titulo TEXT, ';
		sql += ' age_descricao TEXT, ';
		sql += ' age_idclientes INT NULL ';
		sql += ')';
  		txn.executeSql(sql, [], 
	  				 function (tx, res) {
	  				 	console.log("Tabela da agenda criada com sucesso!");
	  					openPage('home');
					 },
					 function(tx, error){
					 	console.log(tx, error);
					 	alert("Ops ocorreu algum problema\nPorfavor reinicie a agenda!")
					 }); 
	  });
}