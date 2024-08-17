import pandas as pd
import ftfy

file_path = './data/amd-cpus.csv'

dfcsv = pd.read_csv(file_path, delimiter=',')

columnas = {
    'CpuName': 'Model',
    'ClockSpeed': 'ClockSpeed',
    'ClockSpeedMax': 'BoostClockSpeed',
    'CoreCount': 'Cores',
    'ThreadCount': 'Threads',
    'SocketsSupported': 'Socket',
    'MaxTDP': 'TDP',
    'BornOnDate': 'ReleaseDate'
}

columnas_amd = {
    'Model': 'Model',
    'Base Clock': 'ClockSpeed',
    'Max. Boost Clock ¹ ²': 'BoostClockSpeed',
    '# of CPU Cores': 'Cores',
    '# of Threads': 'Threads',
    'CPU Socket': 'Socket',
    'Default TDP': 'TDP',
    'Launch Date': 'ReleaseDate'
}

dfcsv = dfcsv.rename(columns=columnas_amd)
df = dfcsv[list(columnas_amd.values())]

def clean_text(text):
    if pd.isna(text):
        return text
    text = ftfy.fix_text(text)  
    text = text.replace('®', '').replace('™', '')
    return text

df = df.applymap(lambda x: clean_text(x) if isinstance(x, str) else x)

print(df.iloc[1:10])
print(df.isna().sum())

df = df.dropna(subset=['Model'])

for col in df.columns:
    if df[col].dtype == 'object':
        df[col].fillna('', inplace=True) 
    else:
        df[col].fillna(0, inplace=True) 

print(df.iloc[1:10])
print(df.isna().sum())

df.to_csv('amdCpuClean.csv')