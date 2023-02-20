function cadastrar(){

    var usuario = document.getElementById('user').value;
    var email = document.getElementById('ema').value;
    var senha = document.getElementById('pass').value;

    var retorno = document.getElementById("msg");


    $.ajax({
      url:'http://127.0.0.1:5000/cadastro?user=' + usuario + '&email=' + email + '&senha=' + senha,
      method: 'post',
      success: function(resposta){
      console.log(resposta);
      if (resposta['erro'] == 0){
          var msg_retorno = '<div class="alert alert-success" role="alert"> Cadastro realizado com sucesso! </div>';
          retorno.innerHTML = msg_retorno;

        }else if (resposta['erro'] == 1){
          var msg_retorno = '<div class="alert alert-danger" role="alert"> A senha deve ser maior que 5 caracteres! </div>';
          retorno.innerHTML = msg_retorno;

        } else if (resposta['erro'] == 2){
          var msg_retorno = '<div class="alert alert-primary" role="alert"> Usuario ja cadastrado! </div>';
          retorno.innerHTML = msg_retorno;

        }else if (resposta['erro'] == 4){
          var msg_retorno = '<div class="alert alert-dark" role="alert"> Todos os campos obrigatorios! </div>';
          retorno.innerHTML = msg_retorno;
        
        }else if (resposta['erro'] == 5){
          var msg_retorno = '<div class="alert alert-secondary" role="alert"> Email invalido! </div>';
          retorno.innerHTML = msg_retorno;
        
        }else{
          msg_retorno = '<div class="alert alert-warning" role="alert"> Erro interno do sistema! </div>';
          retorno.innerHTML = msg_retorno;
        }
        
      },
    })
    
    


  }

function gera_token(){

    var email_l = document.getElementById('ema-login').value;
    var senha_l = document.getElementById('pass-login').value;

    var retorno_login = document.getElementById('msg-login');


    $.ajax({
        url: 'http://127.0.0.1:5000/login?email=' + email_l + '&senha=' + senha_l,
        method: 'post',
        success: function(resposta){
        console.log(resposta)  
        if (resposta['erro'] == 1){
            var msg_retorno_login_e = '<div class="alert alert-danger" role="alert"> E-mail invalido! </div>';
            retorno_login.innerHTML = msg_retorno_login_e;

        }else if (resposta['erro'] == 2){
            var msg_retorno_login_ss = '<div class="alert alert-primary" role="alert"> Senha invalida! </div>';
            retorno_login.innerHTML = msg_retorno_login_ss;
            
        }else if (resposta['erro'] == 4){
            var msg_retorno = '<div class="alert alert-dark" role="alert"> Todos os campos obrigatorios! </div>';
            retorno_login.innerHTML = msg_retorno;
        
        }else{
            var msg_retorno_login_sss = '<div class="alert alert-warning" role="alert">Token gerado!!! Token valido por 3 minutos! </div>';
            retorno_login.innerHTML = msg_retorno_login_sss;
            localStorage.token = resposta['token']
            
            var token_gerado = document.getElementById('token-login')
            token_gerado.value = localStorage.token
        }

        }
    })
    }

function login(){

    var token = document.getElementById('token-login').value
    var msg_token = document.getElementById('msg-token')

    $.ajax({
      url: 'http://127.0.0.1:5000/validaToken?token=' + token,
      method: 'post',
      success: function(resposta){
        console.log(resposta)
        if (resposta['erro'] == 0){
          token_msg = '<div class="alert alert-success" role="alert">Login realizado com Sucesso! </div>'
          msg_token.innerHTML = token_msg
        
        }else if (resposta['erro'] == 1){
          token_msg = '<div class="alert alert-danger" role="alert"> Token expirado, gere outro token! </div>'
          msg_token.innerHTML = token_msg
        
        }else if(resposta['erro'] == 4){
          token_msg = '<div class="alert alert-dark" role="alert"> Todos os campos obrigatorios! </div>'
          msg_token.innerHTML = token_msg
        
        }else{
          token_msg = '<div class="alert alert-dark" role="warning"> ERRO interno do sistema! </div>'
          msg_token.innerHTML = token_msg
        }


      }

    })
  }