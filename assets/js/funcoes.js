
function limpar() {
  document.getElementById("formulario").reset();
}

function redirecionar(pagina) {
  location.href = pagina
}

$(document).ready(function () {

  function limpa_formulário_cep() {
    $("#endereco").val("");
    $("#bairro").val("");
    $("#cidade").val("");
    $("#uf").val("");
  }

  $("#cep").blur(function () {
    var cep = $(this).val().replace(/\D/g, '');

    if (cep != "") {
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        $("#endereco").val("...");
        $("#bairro").val("...");
        $("#cidade").val("...");
        $("#uf").val("...");
        $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {
          if (!("erro" in dados)) {
            $("#endereco").val(dados.logradouro);
            $("#bairro").val(dados.bairro);
            $("#cidade").val(dados.localidade);
            $("#uf").val(dados.uf);
          }
          else {
            limpa_formulário_cep();
            alert("CEP não encontrado.");
          }
        });
      }
      else {
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
      }
    }
    else {
      limpa_formulário_cep();
    }
  });
});

function mascara(o, f) {
  v_obj = o
  v_fun = f
  setTimeout("execmascara()", 1)
}
function execmascara() {
  v_obj.value = v_fun(v_obj.value)
}
function mtel(v) {
  v = v.replace(/\D/g, "");
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
  v = v.replace(/(\d)(\d{4})$/, "$1-$2");
  return v;
}
function id(el) {
  return document.getElementById(el);
}
window.onload = function () {
  id('telefone').onkeyup = function () {
    mascara(this, mtel);
  }
}

