var db;
var eventos_criado = false;
var eventos;
var eventos_dados = [];
//
function criacaoDB(){
	var tamanhoDB = 80 * 1024 * 1024; //80 MB
	db = openDatabase("BaseAgenda", "1.0", "Agenda Pessoal db", tamanhoDB , function() {
		    console.log('Banco de dados criado com sucesso!');
		});
	criaPessoa();
	criaAgenda();
}

function criaPessoa(){
	db.transaction(function (txn) {
		var sql = 'CREATE TABLE IF NOT EXISTS pessoas( ';
		sql += ' idpessoas INTEGER PRIMARY KEY AUTOINCREMENT, ';
		sql += ' pes_nome TEXT, ';
		sql += ' pes_telefone TEXT , ';
		sql += ' pes_endereco TEXT NULL, ';
		sql += ' pes_img_perfil TEXT NULL ';
		sql += ')';
  		txn.executeSql(sql, [], 
	  				 function (tx, res) {
	  				 	console.log("Tabela de pessoas criada com sucesso!");
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
		sql += ' age_realizado TEXT, ';
		sql += ' age_idpessoas INT NULL ';
		sql += ')';
  		txn.executeSql(sql, [], 
	  				 function (tx, res) {
	  				 	console.log("Tabela da agenda criada com sucesso!");
	  					openPage('home', {}, function(){
	  								var data_atual = getData_atual('Y-m-d');
	  								//console.log(data_atual);
									eventos = new Vue({
										beforeCreate: function(){
											this.mostraDados = false;
											this.mostraLoading = true;
										},
										created: function(){
											this.mostraDados = true;
											this.mostraLoading = false;
											db.transaction(function (txn) {	
											var sql = "SELECT *, datetime(age_data_hora, 'unixepoch') as age_data FROM agenda LEFT JOIN pessoas ON (idpessoas = age_idpessoas) WHERE age_data_hora >= strftime(\'%s\', '" + data_atual + "') AND age_data_hora <= strftime(\'%s\', '" + data_atual + " 23:59:59' )";
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
															eventos.iniciaVarialvel(eventos_dados);	
										 				   	},
															function(tx, error){
															 	console.log(tx, error);
															});
											});
										},
										el: '#tabAgenda',
										data: {
											Eventos: eventos_dados,
											mostraDados: '',
											mostraLoading: ''
										},
										methods: {
											iniciaVarialvel: function(dados){
												this.Eventos = dados;
											},
											attBusca: function(dados){
												for (var i = 0; i < this.Eventos.length; i++) {
													eventos.$delete(this.Eventos, i);
												}
												this.Eventos = dados;
											},
											realizado: function(realizada, idagenda){
												db.transaction(function (txn) {	
													var sql = "UPDATE agenda SET age_realizado = ? WHERE idagenda = ?";
													//console.log(sql);
													txn.executeSql(sql, 
																   [realizada, idagenda], 
																   function (tx, res) {
																   		attListaEventos();
												 				   	},
																	function(tx, error){
																	 	console.log(tx, error);
																	});
												});
											}
										}
									});
							eventos_criado = true;
							$("#data_consulta").val(getData_atual('Y-m-d'));
	  						//listarEventos();
	  					});
					 },
					 function(tx, error){
					 	console.log(tx, error);
					 	alert("Ops ocorreu algum problema\nPorfavor reinicie a agenda!")
					 }); 
	  });
}