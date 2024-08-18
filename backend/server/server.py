from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gradio_client import Client
from .decrypt import ret_pass

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

class Message(BaseModel):
    message: str

@app.post("/api/chatbot")
async def get_response(msg: Message):
    result = client.predict(
        message=msg.message,
        system_message="You are a knowledgeable computer hardware advisor that provide expert advice based on the information available.",
        max_tokens=512,
        api_name="/chat"
    )
    print("Respuesta del modelo:", result)
    return {"reply": result}

@app.get("/")
async def root():
    return {"message": "Chatbot is running"}