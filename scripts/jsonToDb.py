import json
import pandas as pd   
from sqlalchemy import create_engine 
from decrypt import ret_pass

def jsonToDb(name, save=False):
    f = open(name)
    data = json.load(f)
    df = pd.json_normalize(data)

    df.columns = [col.title() for col in df.columns]
    print(df)
    print(df.isna().sum())

    if save:
        route = "postgresql://postgres:" + ret_pass("pass_postgre") + "@localhost:5432/compAI"
        engine = create_engine(route)
        df.to_sql('case_data', engine, if_exists='replace', index=False, method='multi')
        print("Data saved in DB")


jsonToDb('./data/case.json', True)
#'./data/motherboard.json' df = df.drop(df.columns[[6]], axis=1)