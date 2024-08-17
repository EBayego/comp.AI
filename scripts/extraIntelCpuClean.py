import pandas as pd

file_path = './data/intelCpuCleanF.csv'

df = pd.read_csv(file_path, delimiter=',')

invalid_rows = df[df['ID'].astype(str).str.contains(',')]
print(str(df.loc[1238, 'ID']).__contains__(','))

rows_to_remove = []
for index, row in df.iterrows():
    if ',' in str(row['ID']):
        print(index)
        rows_to_remove.append(index)

df_cleaned = df.drop(rows_to_remove)
df_cleaned.to_csv('./data/intelCpuClean.csv', index=False)