import pandas as pd
from sqlalchemy import create_engine

df = pd.read_csv('./data/tpu_gpus.csv', delimiter=',')

df = df.drop(df.columns[[0, 8]], axis=1)
df.rename(columns={'Released': 'ReleaseDate'}, inplace=True)
df.rename(columns={'Product_Name': 'Model'}, inplace=True)
print (df)
#print(df.isna().sum())

engine = create_engine('postgresql://postgres:webia_3345@localhost:5432/compAI')
df.to_sql('gpu_data', engine, if_exists='replace', index=False, method='multi')