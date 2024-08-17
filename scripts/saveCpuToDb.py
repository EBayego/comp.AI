import pandas as pd
from sqlalchemy import create_engine

df = pd.read_csv('./data/intelCpuClean.csv', delimiter=',')
dfamd = pd.read_csv('./data/amdCpuClean.csv', delimiter=',')

merged = df._append(dfamd, ignore_index=True)
merged.to_csv("./data/output.csv", index=False)
print(merged)

engine = create_engine('postgresql://postgres:webia_3345@localhost:5432/compAI')
merged.to_sql('cpu_data', engine, if_exists='replace', index=False, method='multi')