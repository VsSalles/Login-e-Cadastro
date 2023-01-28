from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Pessoa, Tokens
from secrets import token_hex
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from hashlib import sha256
import re 
from secrets import token_hex
from datetime import datetime

def conectaBanco():
    engine = create_engine("sqlite:///sqlite.db")
    Session = sessionmaker(bind=engine)
    session = Session()
    return session

app = FastAPI()


origins = [
    "http://127.0.0.1:5001"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])

@app.post("/cadastro")
def cadastro(user: str, email: str, senha: str):

    if len(user) == 0:
        return {'erro': 4}
    elif len(email) == 0: 
        return {'erro' : 4}
    elif len(senha) == 0:
        return {'erro' : 4}
        
    regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
        
    if not (re.search(regex,email)):  
        return {'erro': 5}    
      


    if len(senha) < 6:
        return {'erro': 1}

    senha = sha256(senha.encode()).hexdigest()

    session = conectaBanco()
    usuario = session.query(Pessoa).filter_by(email=email, senha=senha).all()

    if len(usuario) > 0:
        return {'erro': 2}
    

    try:
        novo_usuario = Pessoa(
            usuario = user,
            email = email,
            senha = senha
        )

        session.add(novo_usuario)
        session.commit()
        return {'erro': 0}
    except Exception as e:
        return {'erro': 3, 'erro': e}
    
@app.post('/login')
def login(email: str, senha: str):
    if len(email) == 0:   
        return {'erro' : 4} 
    elif len(senha) == 0:
        return {'erro' : 4}

    session = conectaBanco()

    senha = sha256(senha.encode()).hexdigest()

    verifica_email = session.query(Pessoa).filter(Pessoa.email == email).all()
    verifica_senha = session.query(Pessoa).filter(Pessoa.senha == senha).all()

    if len(verifica_email) == 0:
        return {'erro': 1}
    elif len(verifica_senha) == 0:
        return {'erro': 2}

    tokenn = token_hex(50)

    verifica_tokens_ids = session.query(Tokens).filter(Tokens.id_pressoa == verifica_email[0].id).all()

    if len(verifica_tokens_ids) == 0:
        novo_token = Tokens(id_pressoa=verifica_email[0].id, token=tokenn, data=datetime.now())
        session.add(novo_token)
        session.commit()
        return {'erro:': 0, 'token': tokenn}
    elif len(verifica_tokens_ids) > 0:
        verifica_tokens_ids[0].token = tokenn
        verifica_tokens_ids[0].data = datetime.now()
        session.commit()
        return {'erro:': 0, 'token': tokenn}

@app.post('/validaToken')
def validaToken(token: str):
    if not token:
        return {'erro': 4}

    session = conectaBanco()
    token_gerado = session.query(Tokens).filter(Tokens.token == token)
    data_token = token_gerado[0].data
    data_validade = datetime.now().minute

    
   

    if data_validade - data_token.minute > 3:
        return {'erro': 1}   
    else:
        return {'erro': 0} 

        



if __name__ == "__main__":
    uvicorn.run('controler:app', port=5000, reload=True, access_log=True)