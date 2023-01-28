# Desenvolvimento Web-Sistema de Cadatro e Login✨

## Projeto desenvolvido para praticar html, css, bootstrap, javascript, python e banco de dados. 

 #### ☑️ O Foco do projeto não é a interface em si ou a validação dos campos mas sim simular um front end rodando num servidor e o backend rodando em outro servidor e fazer a comunicação entre eles, tanto que o servidor que sustenta a pagina html roda no ip localhost mas na porta 5001 ja o backend roda tambem em localhost mas na port 5000, faço essa comunicação atraves de requisições do ajax do javascript para a api em python com o fastApi.
 
> Status: **completo** ⚠️
<hr>

## Back-end

 ### ➡️ Models.py:
- Onde tenho todos os modelos do  banco de dados, aqui é definido como sera armazenado os dados. 
- Conexão com banco de dados, tabelas e colunas.

## ➡️ Controller.py
- Toda a logica do programa, onde esta minha Api com o fastApi.
- minha api cadastra, loga, gera e valida tokens.
- 3 end-points/cadastro, /login, /validaToken.
- Recebe todas as requisições do front-end/usuarios, controlando qual model usar e qual view será mostrado.

## Front-end

## ➡️ View/Index.html
- Tenho minha interface marcada e estilizada com html, css e bootstrap.
- Manipulo os elementos html com o DOM, faço requisições com o ajax do JavaScript, manipulo eventos do click do mouse com funções do JS.
- Armazeno alguns dados retornados da Api no LocalStorage com o JS.
- A camada de interação com o usuário, faz a exibição dos dados.

## Requisitos/Funcionalidades do projeto
- Cadastro de usuarios no banco de dados ✅
- Geração de Tokens de acesso validos por 3 minutos ✅
- validação de tokens, campos e login ✅

## Tecnologias/Habilidades 
<table> 
  <tr>
  <td>
   <h3>Python</h3>  
  <td>
   <h3>JavaScript</h3>  
  </td>
  </td>
  <td>
  <h3>HTML</h3>
  </td>
   <td>
  <h3>CSS</h3>
  </td>
   <td>
  <h3>Bootstrap</h3>
  </td>
   <td>
  <h3>FastApi</h3>
  </td>
   <td>
  <h3>SQLite</h3>
  </td>
   <td>
   <h3>ORM SQLALCHEMY</h3>  
   </td>
    <td>
   <h3>MVC</h3>  
   </td>
      <td>
   <h3>Logica de programação</h3>  
   </td>
 </tr>
 

</table>

