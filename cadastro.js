function cadastro(){
	var myFirebaseRef = new Firebase("https://competicoes.firebaseio.com/");
	var nome = document.getElementById("idNome").value;
	var apelido = document.getElementById("idApelido").value;
	var rg = document.getElementById("idRG").value;
	var cpf = document.getElementById("idCPF").value;
	var clube = document.getElementById("idClube").value;
	var categoria = document.getElementById("idCategoria").value;
	var nomeMae = document.getElementById("idNomeMae").value;
	var nascimento = document.getElementById("idNascimento").value;
	if(nome != "" && apelido != "" && rg != "" && cpf != "" && clube != "" && categoria != "" && nomeMae != "" && nascimento != ""){
		myFirebaseRef.set({
  		NOME: nome,
  		APELIDO: apelido,
			NASCIMENTO: nascimento,
  		RG: rg,
			CPF: cpf,
			CLUBE: clube,
			CATEGORIA: categoria,
			MAE: nomeMae
		});
	}

}

function cpf_incorreto(e){
	myFirebaseRef.set({
  	name: "inc",
  	lastName: "inc",
  	email: "ola"
	});
}
