//javascript
clubeLogin = "";

function login(){

	var clube = document.getElementById("IdLoginClube").value;
	var senha = document.getElementById("IdSenhaClube").value;

	var Ref = firebase.database().ref('clube-senha');
	Ref.on('child_added', function(data) {
		firebase.database().ref('clube-senha/' + data.key).on('value', function(login) {
			if(login.val().clube == clube ){
				if(login.val().senha == senha){
					clubeLogin = clube;
					alert("usuario logado com sucesso");
					document.getElementById("IdLoginClube").disabled = true;
					document.getElementById("IdSenhaClube").disabled = true;
					document.getElementById("IdButtonLogin").disabled = true;
					document.getElementById("IdClube").value = clubeLogin;
				} else {
					alert("senha incorreta");
				}
			}
		});
	});

}

function cadastro(){

	var nome = document.getElementById("IdNome").value;
	var apelido = document.getElementById("IdApelido").value;
	var rg = document.getElementById("IdRG").value;
	var cpf = document.getElementById("IdCpf").value;
	var clube = document.getElementById("IdClube").value;
	var categoria = document.getElementById("IdCategoria").value;
	var nomeMae = document.getElementById("IdNomeMae").value;
	var nascimento = document.getElementById("IdNascimento").value;
	var sexo = document.getElementById("IdSexo").value;
	
	if(navigator.onLine == false){
		alert("Sem conexao a internet");
		return;
	}

	if(clubeLogin == ""){
		alert("usuario nao logado");
		return;
	}

	//alert(checaDados(nome, apelido, rg, cpf, categoria, nomeMae, nascimento, sexo));
	if(checaDados(nome, apelido, rg, cpf, categoria, nomeMae, nascimento, sexo) == true){
		
		//firebase.database().ref('numeroAtletas').transaction(function(currentRank){
			//return (currentRank || 0) + 1;
		//});
			
		firebase.database().ref('/atletas/' + clube).push({
  			NOME: nome,
  			APELIDO: apelido,
			NASCIMENTO: nascimento,
  			RG: rg,
			CPF: cpf,
			CLUBE: clube,
			CATEGORIA: categoria,
			MAE: nomeMae, 
			SEXO: sexo
		}).then(function(){
			alert("atleta cadastrado com sucesso.");
			document.getElementById("IdNome").value = "";
			document.getElementById("IdApelido").value = "";
			document.getElementById("IdNascimento").value = "";
			document.getElementById("IdRG").value = "";
			document.getElementById("IdCpf").value = "";
			document.getElementById("IdNomeMae").value = "";
		}, function(){
			alert("ocorreu um erro, contacte o gerenciador do sistema.");
		});
		
	}

}

function checaDados(nome, apelido, rg, cpf, categoria, nomeMae,nascimento, sexo){

	if(nome != "" && apelido != "" && rg != "" && cpf.search("[0-9]{3}(\.)[0-9]{3}(\.)[0-9]{3}-[0-9]{2}") != -1 && categoria != "" && nomeMae != "" && nascimento.search("[0-9]{2}/[0-9]{2}/[0-9]{4}") != -1 && sexo != ""){
		return true;
	} else {
		return false;
	}
}

function formatar(mascara, documento){
	var i = documento.value.length;
	var saida = mascara.substring(0,1);
  	var texto = mascara.substring(i)

  	if (texto.substring(0,1) != saida){
  		documento.value += texto.substring(0,1);
  	}

}
