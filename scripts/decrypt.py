from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from base64 import urlsafe_b64decode
import json

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

with open("./data/encrypted_passwords.json", "rb") as file:
    salt = file.readline().strip()
    encrypted_passwords = json.load(file)

master_password = ""
with open("../mp.txt", "rb") as f:
    master_password = f.read()

key = generate_key(master_password, salt)

passwords = {service: decrypt(urlsafe_b64decode(encrypted_password), key) for service, encrypted_password in encrypted_passwords.items()}

print(passwords)