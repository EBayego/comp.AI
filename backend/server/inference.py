from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gradio_client import Client
from .decrypt import ret_pass
from sqlalchemy import create_engine, MetaData, Table, text, or_
from sqlalchemy.sql import select

# Connect with Hugging Face Spaces
client = Client("EBayego/LlamaTest", hf_token="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")