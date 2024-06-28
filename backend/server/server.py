from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = FastAPI()

model_name = "LLM360/K2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

class Message(BaseModel):
    message: str

@app.post("/api/chatbot")
async def get_response(msg: Message):
    try:
        inputs = tokenizer.encode(msg.message, return_tensors="pt")
        outputs = model.generate(inputs, max_length=100, do_sample=True, top_p=0.95, top_k=60)
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return {"reply": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Chatbot is running"}