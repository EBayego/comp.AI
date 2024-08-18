from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from base64 import urlsafe_b64decode
import json
import os

def generate_key(password, salt):
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
        backend=default_backend()
    )
    return kdf.derive(password.encode())

def decrypt(encrypted_message, key):
    iv = encrypted_message[:16]
    encrypted_message = encrypted_message[16:]
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    decryptor = cipher.decryptor()

    decrypted_message = decryptor.update(encrypted_message) + decryptor.finalize()

    padding_length = decrypted_message[-1]
    return decrypted_message[:-padding_length].decode()

def ret_pass(passname):
    actualdir = os.path.dirname(os.getcwd()).replace("\\", "/")
    with open(actualdir + "/data/encrypted_passwords.json", "r") as file:
        data = json.load(file)
        salt = urlsafe_b64decode(data["salt"])
        encrypted_passwords = {k: urlsafe_b64decode(v) for k, v in data["passwords"].items()}

    master_password = ""
    with open(os.path.dirname(actualdir).replace("\\", "/") + "/mp.txt", "r") as f:
        master_password = f.read()

    key = generate_key(master_password, salt)
    passwords = {service: decrypt(encrypted_password, key) for service, encrypted_password in encrypted_passwords.items()}
    
    if passname:
        return passwords[passname]
    return passwords