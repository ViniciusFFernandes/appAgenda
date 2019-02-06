var clientes_dados = [];
var clientes;
var clientes_criado = false;
//
function abrirTab(nameTab){
	openTab(nameTab);
	if(nameTab == 'tabCadClientes'){
		$('#cli_telefone').mask('(00)00000-0000');
	}
	if(nameTab == 'tabClientes'){
		if(!clientes_criado){
			clientes = new Vue({
				beforeCreate: function(){
					this.mostraDados = false;
					this.mostraLoading = true;
				},
				created: function(){
					this.mostraDados = true;
					this.mostraLoading = false;
				},
				el: '#tabClientes',
				data: {
					Clientes: clientes_dados,
					mostraDados: '',
					mostraLoading: ''
				},
				methods: {
					iniciaVarialvel: function(dados){
						this.Clientes = dados;
					},
					buscaCliente: function () {
						buscarClientes($("#buscaCliente_nome").val());
					},
					attBusca: function(dados){
						for (var i = 0; i < this.Clientes.length; i++) {
							clientes.$delete(this.Clientes, i);
						}
						this.Clientes = dados;
					}
				}
			});
			getClientes();
			clientes_criado = true;
		}
	}
}

function registrarCliente(){
	var nome = $("#cli_nome").val();
	var telefone = $("#cli_telefone").val();
	var endereco = $("#cli_endereco").val();
	if(diretorio_foto == ''){
		diretorio_foto = './img/padrao.jpg';
	}
	db.transaction(function (txn) {
		var sql = 'INSERT INTO clientes ( ';
		sql += 'cli_nome, ';
		sql += 'cli_telefone, ';
		sql += 'cli_endereco, ';
		sql += 'cli_img_perfil ) VALUES(?,?,?,?)';
		txn.executeSql(sql,
					[nome, telefone, endereco, diretorio_foto], 
	  				 function (tx, res) {
	  				 	//Zera os campos e reseta o button
	  				 	nome = $("#cli_nome").val('');
						telefone = $("#cli_telefone").val('');
						endereco = $("#cli_endereco").val('');
						$("#" + retornoSpan).html('');
						diretorio_foto = '';
						retornoSpan = '';
						closeLoading();
						if(clientes_criado){
							buscarClientes($("#buscaCliente_nome").val());
						}
						alert('Cliente cadastrado com sucesso!');
					 },
					 function(tx, error){
					 	closeLoading();
					 	alert('Ops!\nParece que tivemos algum problema, tente novamente mais tarde.');
					 	console.log(tx, error);
					 });
	  });

}
function getClientes(){

	db.transaction(function (txn) {	
		var sql = "SELECT * FROM clientes";
		txn.executeSql(sql, 
					   [], 
					   function (tx, res) {
					   	//alert(sql);
						   	for (var i = 0; i < res.rows.length; i++) {
						   		//console.log(i);
						   		clientes_dados.push(res.rows.item(i));
						   	}
						   	clientes.iniciaVarialvel(clientes_dados);	
	 				   	},
						function(tx, error){
						 	console.log(tx, error);
						});
	});
}

function buscarClientes(where_nomeCli){
	$("#buscandoNoBanco").html('<img src="img/carregando_bolinhas.gif" width="40px" height="30px;">');
	db.transaction(function (txn) {	
		var sql = "SELECT * FROM clientes";
		if(where_nomeCli != ''){
			sql += " WHERE cli_nome like '%" + where_nomeCli + "%'"
		}
		txn.executeSql(sql, 
					   [], 
					   function (tx, res) {
					   	//alert(sql);
					   	clientes_dados = [];
						   	for (var i = 0; i < res.rows.length; i++) {
						   		//console.log(i);
						   		clientes_dados.push(res.rows.item(i));
						   	}
						   	clientes.attBusca(clientes_dados);
						   	$("#buscandoNoBanco").html('');	
	 				   	},
						function(tx, error){
							$("#buscandoNoBanco").html('');
						 	console.log(tx, error);
						});
	});

	
}