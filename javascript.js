// JavaScript Document

$(function(){
	$('#conteudo').hide();
	var noticia;	
	var hash = window.location.hash;

	if (hash !='')
	{
		noticia = $(hash).html();
		$('.abas li a[href="' + hash + '"]').parent().addClass('ativo');

	} else {
		noticia = $('#conteudo div:first-child').html();			
		$('.abas li:first-child').addClass('ativo');		
	}
	$('#noticia').append('<div>' + noticia + '</div>').find('div').slideDown();
	$('.abas li a').click(function(){
		$('.abas li').removeClass('ativo');
		$(this).parent().addClass('ativo');
		var ancora = $(this).attr('href');
		var nome = ancora.substr(1, ancora.length);
		if(nome == 'noticia2'){
			exibirClubes();
		}
		noticia = $('#conteudo div[id="' + nome + '"]').html();
		$('#noticia').empty();
		$('#noticia').append('<div>' + noticia + '</div>').find('div').slideDown();
		return false();

	})
})


function cadastrarClube(){

	var password = document.getElementById("IdSenhaClube").value;
	var clube = document.getElementById("IdClube").value;

	var user = firebase.auth().currentUser;
	if(user == null){
		alert("usuario nao está logado");
		return;
	}

	firebase.database().ref('/clube-senha/').push({
		senha: password,
		clube: clube
	}).then(function(){
		alert("cadastro efetuado");
		document.getElementById("IdSenhaClube").value = "";
		document.getElementById("IdClube").value = "";
		exibirClubes();
	}, function(){
		alert("ocorreu um erro, ligue para o lucas");
	});

}


function logar(){

	var email = document.getElementById("IdEmail").value;
	var password = document.getElementById("IdSenha").value;
	var user = firebase.auth().currentUser;
	if(user){
		alert("usuario ja está logado");
		document.getElementById("IdEmail").disabled = true;
  		document.getElementById("IdSenha").disabled = true;
  		document.getElementById("IdEntrar").disabled = true;
		return;
	}

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		alert(errorMessage);
  		// ...
	}).then(function(){
		var user = firebase.auth().currentUser;

		if (user != null) {
  			document.getElementById("IdEmail").disabled = true;
  			document.getElementById("IdSenha").disabled = true;
  			document.getElementById("IdEntrar").disabled = true;
		}
	}, function(){
		alert("ocorreu um erro, ligue para o lucas");
	});
	

}


function deslogar(){
	var user = firebase.auth().currentUser;
	if(user){
		firebase.auth().signOut().then(function() {
 			alert("deslogado");
 			document.getElementById("IdEmail").disabled = false;
  			document.getElementById("IdSenha").disabled = false;
  			document.getElementById("IdEntrar").disabled = false;
		}, function(error) {
  			alert("ocorreu um erro ao deslogar");
		});
	}
	else{
		alert("usuario nao logado");
	}
}


function exibirClubes(){
	var doc = document.getElementById("IdListaClubes");
	var str = '';
	var lista = [];
	var i = 0;
	doc.innerHTML = str;
    var Ref = firebase.database().ref('clube-senha');
	Ref.on('child_added', function(data) {
		firebase.database().ref('clube-senha/' + data.key + '/clube').on('value', function(snapshot) {
  			lista[i] = snapshot.val();
  			i = i + 1;
  			str = geraString(str, lista[i-1]);
		});
  		doc.innerHTML = str;
	});
    
}

function geraString(str, add){
	str = str + '<option>' + add + '</option>';
	return str;
}

function excluirClube(){
	var indice = document.getElementById("IdListaClubes").selectedIndex;
	var opcoes = document.getElementById("IdListaClubes").options;
	var str = opcoes[indice].text;
	if(indice == -1){
		alert("selecione um clube para excluir");
		return;
	}
	var Ref = firebase.database().ref('clube-senha');

	Ref.on('child_added', function(data) {
		firebase.database().ref('clube-senha/' + data.key + '/clube').on('value', function(snapshot) {
			if(snapshot.val() == str){
				firebase.database().ref('clube-senha/' + data.key).remove();
				exibirClubes();
			}
		});
	});

	if(document.getElementById("IdExcluirClubeAtletas").checked == true){
		firebase.database().ref('atletas/' + str).remove();
	}
}