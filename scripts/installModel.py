from transformers import AutoModelForCausalLM, AutoTokenizer

print("Loading tokenizer...")
tokenizer = AutoTokenizer.from_pretrained("LLM360/K2")
print("Tokenizer loaded.")

print("Loading model...")
model = AutoModelForCausalLM.from_pretrained("LLM360/K2", load_in_8bit=True)
print("Model loaded.")

prompt = 'What is the highest mountain on Earth?'
print("Prompt: ", prompt)

input_ids = tokenizer(prompt, return_tensors="pt").input_ids
print("Input IDs: ", input_ids)

print("Generating output...")
gen_tokens = model.generate(input_ids, do_sample=True, max_new_tokens=128)
print("Output generated.")

print("-"*20 + " Output for model "  + 20 * '-')
print(tokenizer.batch_decode(gen_tokens)[0])