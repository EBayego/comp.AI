import pandas as pd
from sqlalchemy import create_engine
from decrypt import ret_pass

df = pd.read_csv('./data/tpu_gpus.csv', delimiter=',')

df = df.drop(df.columns[[0, 8]], axis=1)
df.rename(columns={'Released': 'ReleaseDate'}, inplace=True)
df.rename(columns={'Product_Name': 'Model'}, inplace=True)
print (df)
#print(df.isna().sum())

route = "postgresql://postgres:" + ret_pass("pass_postgre") + "@localhost:5432/compAI"
engine = create_engine(route)
df.to_sql('gpu_data', engine, if_exists='replace', index=False, method='multi')