import pandas as pd
from sqlalchemy import create_engine
from decrypt import ret_pass

df = pd.read_csv('./data/intelCpuClean.csv', delimiter=',')
dfamd = pd.read_csv('./data/amdCpuClean.csv', delimiter=',')

merged = df._append(dfamd, ignore_index=True)
merged.to_csv("./data/output.csv", index=False)
print(merged)

route = "postgresql://postgres:" + ret_pass("pass_postgre") + "@localhost:5432/compAI"
engine = create_engine(route)
merged.to_sql('cpu_data', engine, if_exists='replace', index=False, method='multi')