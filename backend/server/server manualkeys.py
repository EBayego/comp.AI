from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gradio_client import Client
from .decrypt import ret_pass
from sqlalchemy import create_engine, MetaData, Table, text, or_
from sqlalchemy.sql import select

# Connect with Hugging Face Spaces
client = Client("EBayego/PCHelper", hf_token=ret_pass("pass_huggingface"))

app = FastAPI()

# If CORS is not allowed, it will appear 405 Method Not Allowed
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect with DB
route = "postgresql://postgres:" + ret_pass("pass_postgre") + "@localhost:5432/compAI"
engine = create_engine(route)
metadata = MetaData()

def get_table_names():
    with engine.connect() as connection:
        sql = text('''
        SELECT TABLE_NAME 
        FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_TYPE = 'BASE TABLE' 
            AND TABLE_CATALOG='compAI'
            AND table_name NOT LIKE ('%pg_%')
            AND table_name NOT LIKE ('%sql_%')
        ''')
        result = connection.execute(sql).fetchall()
        # Devuelve una lista de nombres de tablas sin el sufijo '_table' si es necesario
        return [row[0] for row in result]

def load_tables(metadata):
    table_names = get_table_names()
    tables = {}
    for table_name in table_names:
        tables[table_name] = Table(table_name, metadata, autoload_with=engine)
    return tables

tables = load_tables(metadata)

class Message(BaseModel):
    message: str

def get_component_info(message: str):
    connection = engine.connect()
    print("message: ", message)
    try:
        for table_name, table in tables.items():
            # Realizar una búsqueda básica por nombre de componente en las tablas
            query = select(table).where(
                or_(
                    table.c.get('Model').ilike(f"%{message}%") if 'Model' in table.c else False,
                    table.c.get('Name').ilike(f"%{message}%") if 'Name' in table.c else False
                )
            )
            result = connection.execute(query).fetchall()

            if result:
                # Combinar y formatear la información del componente
                component_info = "\n".join([f"{row['name']}: {row['specs']}" for row in result])
                print("component_info: ", component_info)
                return component_info

    finally:
        connection.close()
    return None

@app.post("/api/chatbot")
async def get_response(msg: Message):
    component_info = get_component_info(msg.message)
    if component_info:
        full_message = f"User Message: {msg.message}\n\nComponent Info: {component_info}"
    else:
        full_message = msg.message

    print("full_message: ", full_message)
    result = client.predict(
        message=full_message,
        system_message="Eres un amable y educado asesor experto en una tienda de hardware informático que brinda asesoramiento experto basado en la información más reciente y precisa",
        #use_max_tokens=False,
        #max_tokens=512,
        api_name="/chat"
    )
    print("Respuesta del modelo:", result)
    return {"reply": result}

@app.get("/")
async def root():
    return {"message": "Chatbot is running"}