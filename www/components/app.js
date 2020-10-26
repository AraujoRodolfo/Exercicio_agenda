
var dados = (localStorage.tabela) ? localStorage.tabela : 0;
var contatos = [];
if(dados.length  != 0){
  contatos = JSON.parse(dados);
}

function ListarContatos(){    
  var texto = '';
    for(var linha=0; linha<(contatos.length); linha++){    
      var user = JSON.parse(contatos[linha]);
      texto += '<div class="row" linha="'+linha+'"><div class="col-8"><b>'+user.nome+'</b><br><i>'+user.email+'</i></div><div class="col-2"><button class="btn btn-block excluir"><i class="fas fa-trash"></i></button></div><div class="col-2"><button class="btn btn-block editar"><i class="fas fa-edit"></i></button></div></div><hr>';       
    }
  $('#contatos').html(texto);
}
function Add(){
  var user = JSON.stringify({
	  nome: $('#nome').val(),
	  email: $('#email').val()
  });
  console.log(contatos);
  contatos.push(user);
  Limpar();
  localStorage.setItem('tabela', JSON.stringify(contatos));
  ListarContatos();
}
function Limpar(){
  $('#nome').val('');
  $('#email').val('');
}
$(document).on('click','#salvar',function(){
  Add();
});

$(document).on('click','.excluir',function(){
  var linha = $(this).parent().parent().attr('linha');
  contatos.splice(linha, 1);
  localStorage.setItem('tabela', JSON.stringify(contatos));
  ListarContatos();
});
$(document).on('click','.editar',function(){
  var linha = $(this).parent().parent().attr('linha');
  var c = JSON.parse(contatos[linha]);
  $('#linha').val(linha);
  $('#nome').val(c.nome);
  $('#email').val(c.email);
  $('#salvar').hide();
  $('#gravar').show();
});

$(document).on('click','#gravar',function(){
  var linha = $('#linha').val();
  var user = JSON.stringify({
    nome: $('#nome').val(),
    email: $('#email').val()
  });
  contatos[linha] = user;
  Limpar();
  localStorage.setItem('tabela', JSON.stringify(contatos));
  ListarContatos();
  $('#salvar').show();
  $('#gravar').hide();
});



$(document).ready(function(){
  ListarContatos();
});