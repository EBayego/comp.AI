import psycopg2
import pandas as pd

conn = psycopg2.connect(
    dbname="compAI",
    user="postgres",
    password="webia_3345",
    host="localhost",
    port=5432
)

cursor = conn.cursor()

sql = '''SELECT TABLE_NAME 
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_TYPE = 'BASE TABLE' 
        AND TABLE_CATALOG='compAI'
        AND table_name not LIKE ('%pg_%')
        AND table_name not LIKE ('%sql_%')'''

cursor.execute(sql) 
res = cursor.fetchall() 
tablas = [t[0] for t in res]
tablenames = [t[:-5]for t in tablas]

datos = []

for tabla in tablas:
    query = f"SELECT * FROM {tabla};"
    df = pd.read_sql(query, conn)
    datos.append(df)

conn.close()

def to_text(i, row):
    #print("Fila: ", row)
    nar = ""
    sc = "{Type: " + tablenames[i] + ", "
    
    if tablenames[i] == "gpu" and row.get('Model'):
        nar = row.get('Model') + " is a GPU "
        if row.get('GPU_Chip'):
            nar += "that features the " + row.get('GPU_Chip', '') + " chip "
            sc += f'GPU_Chip: {row.get("GPU_Chip")}, '
        if row.get('Bus'):
            nar += "with a " + row.get('Bus') + " bus interface "
            sc += f'Bus: {row.get("Bus")}, '
        if row.get('Memory'):
            nar += "and comes with " + row.get('Memory') + " of memory "
            sc += f'Memory: {row.get("Memory")}, '
        if row.get('GPU_clock'):
            nar += "and has a GPU clock of " + row.get('GPU_clock') + " "
            sc += f'GPU_Clock: {row.get("GPU_clock")}, '
        if row.get('Memory_clock'):
            nar += "and a memory clock of " + row.get('Memory_clock') + "."
            sc += f'Memory_Clock: {row.get("Memory_clock")}, '

    elif tablenames[i] == "cpu" and row.get('Model'):
        nar = row.get('Model') + " is a CPU "
        if row.get('ClockSpeed', ''):
            nar += "that operates at " + row.get('ClockSpeed') + " GHz "
            sc += f'Clock_Speed: {row.get("ClockSpeed")}, '
        if row.get('BoostClockSpeed'):
            nar += "and can boost up to " + row.get('BoostClockSpeed') + " GHz "
            sc += f'Boost_Clock_Speed: {row.get("BoostClockSpeed")}, '
        if row.get('Cores'):
            nar += "with " + str(row.get('Cores')) + " cores "
            sc += f'Cores: {row.get("Cores")}, '
        if row.get('Threads'):
            nar += "and " + str(row.get('Threads')) + " threads "
            sc += f'Threads: {row.get("Threads")}, '
        if row.get('Socket'):
            nar += "using the " + row.get('Socket') + " socket "
            sc += f'Socket: {row.get("Socket")}, '
        if row.get('TDP'):
            nar += "with a TDP of " + row.get('TDP') + "W."
            sc += f'TDP: {row.get("TDP")}, '

    elif tablenames[i] == "motherboard" and row.get('Name'):
        nar = "The " + row.get('Name') + " is a Motherboard"
        if row.get('Price'):
            nar += " that costs " + str(row.get('Price'))
            sc += f'Price: {row.get("Price")}, '
        if row.get('Socket'):
            nar += " and supports the " + row.get('Socket') + " socket"
            sc += f'Socket: {row.get("Socket")}, '
        if row.get('Form_Factor'):
            nar += " with a " + row.get('Form_Factor') + " form factor"
            sc += f'Form_Factor: {row.get("Form_Factor")}, '
        if row.get('Max_Memory'):
            nar += " supporting up to " + str(row.get('Max_Memory')) + " of memory"
            sc += f'Max_Memory: {row.get("Max_Memory")}, '
        if row.get('Memory_Slots'):
            nar += " with " + str(row.get('Memory_Slots')) + " memory slots"
            sc += f'Memory_Slots: {row.get("Memory_Slots")}, '
        if row.get('Color'):
            nar += " and is available in " + row.get('Color') + " color."
            sc += f'Color: {row.get("Color")}, '

    elif tablenames[i] == "case" and row.get('Name'):
        nar = "The " + row.get('Name') + " is a Case "
        if row.get('Price'):
            nar += " that is priced at " + str(row.get('Price'))
            sc += f'Price: {row.get("Price")}, '
        if row.get('Type'):
            nar += " and is a " + row.get('Type') + " type case"
            sc += f'Type: {row.get("Type")}, '
        if row.get('Color'):
            nar += " available in " + row.get('Color') + " color"
            sc += f'Color: {row.get("Color")}, '
        if row.get('Psu'):
            nar += " and comes with a " + str(row.get('Psu')) + " PSU"
            sc += f'PSU: {row.get("Psu")}, '
        if row.get('Side_Panel'):
            nar += " featuring a " + row.get('Side_Panel') + " side panel"
            sc += f'Side_Panel: {row.get("Side_Panel")}, '
        if row.get('External_525_Bays'):
            nar += " with " + str(row.get('External_525_Bays')) + " external 5.25\" bays"
            sc += f'External_525_Bays: {row.get("External_525_Bays")}, '
        if row.get('Internal_35_Bays'):
            nar += " and " + str(row.get('Internal_35_Bays')) + " internal 3.5\" bays."
            sc += f'Internal_35_Bays: {row.get("Internal_35_Bays")}, '
    else:
        return

    if sc.endswith(', '):
        sc = sc[:-2]
    sc += "}"

    return nar.strip(), sc.strip()

data = []

for i, df in enumerate(datos):
    for _, row in df.iterrows():
        descripcion, esquema = to_text(i, row)
        if esquema:
            data.append(esquema)
        if descripcion:
            data.append(descripcion)

# Only GPU
# for _, row in datos[0].iterrows():
#     descripcion, esquema = to_text(0, row)
#     if esquema:
#         data.append(esquema)
#     if descripcion:
#         data.append(descripcion)

with open("data.txt", "w", encoding="utf-8") as archivo:
    for elemento in data:
        archivo.write(str(elemento) + "\n")