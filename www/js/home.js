// variaveis globais
var pessoas_dados = [];
var pessoas;
var pessoas_criado = false;
//
function abrirTab(nameTab){
	openTab(nameTab);
	if(nameTab == 'tabAgenda'){
		$("#data_consulta").val(getData_atual('Y-m-d'));
		//listarEventos();
	}
	if(nameTab == 'tabAgendar'){
		$("#age_data_hora").val(getData_atual('Y-m-dTH:m'));
		iniciaAutoComplete('pessoa_autocomplete', 'autoCompleteMenu', 'pessoas');
	}
	if(nameTab == 'tabCadPessoas'){
		$('#pes_telefone').mask('(00)00000-0000');
	}
	if(nameTab == 'tabPessoas'){
		if(!pessoas_criado){
			pessoas = new Vue({
				beforeCreate: function(){
					this.mostraDados = false;
					this.mostraLoading = true;
				},
				created: function(){
					this.mostraDados = true;
					this.mostraLoading = false;
				},
				el: '#tabPessoas',
				data: {
					Pessoas: pessoas_dados,
					mostraDados: '',
					mostraLoading: ''
				},
				methods: {
					iniciaVarialvel: function(dados){
						this.Pessoas = dados;
					},
					buscaPessoa: function () {
						buscarPessoas($("#buscaPessoa_nome").val());
					},
					attBusca: function(dados){
						for (var i = 0; i < this.Pessoas.length; i++) {
							pessoas.$delete(this.Pessoas, i);
						}
						this.Pessoas = dados;
					},
					atualizaDados: function(idpessoas){
						$("#retornoFoto").html('');
						showModal('modal_EditaPessoas');
						$("#edit_idpessoas").val(idpessoas);
						db.transaction(function (txn) {	
							var sql = "SELECT * FROM pessoas WHERE idpessoas = " + idpessoas;
							txn.executeSql(sql, 
										   [], 
										   function (tx, res) {
											   	$("#edit_pes_nome").val(res.rows.item(0).pes_nome);
											   	$("#edit_pes_telefone").val(res.rows.item(0).pes_telefone);
											   	$("#edit_pes_endereco").val(res.rows.item(0).pes_endereco);
											   	diretorio_foto = res.rows.item(0).pes_img_perfil;
						 				   	},
											function(tx, error){
											 	console.log(tx, error);
											});
	});
					}
				}
			});
			getPessoas();
			pessoas_criado = true;
		}
	}
}

