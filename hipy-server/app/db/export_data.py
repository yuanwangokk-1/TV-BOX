import pandas as pd
import os
from db.session import SessionLocal, engine, insp
from core.config import settings

db = SessionLocal()
database_name = settings.SQL_DATABASE
database_types = ['mysql', 'sqlite', 'postgresql']
check_ok = False
for database_type in database_types:
    if database_type in settings.SQLALCHEMY_ENGINE:
        check_ok = True
        break
if not check_ok:
    exit(f'导出数据功能不适用于非{",".join(database_types)}等数据库')

if 'mysql' in settings.SQLALCHEMY_ENGINE:
    sql = f"""
        SELECT TABLE_NAME FROM information_schema.`TABLES` WHERE TABLE_SCHEMA = '{database_name}' AND TABLE_NAME != 'alembic_version'
    """
    rows = db.execute(sql).fetchall()
    print(len(rows), rows)
    for table in rows:
        table_name = table[0]
        sql = f"""
        SELECT * FROM {database_name}.{table_name}
        """

        df = pd.read_sql(sql, con=engine)
        dir_path = os.path.join(os.path.dirname(__file__), "init_data")
        os.makedirs(dir_path, exist_ok=True)
        file_path = os.path.join(dir_path, f"{table_name.replace(settings.SQL_TABLE_PREFIX, '', 1)}.csv")
        print(file_path)
        df.to_csv(file_path, index=0)

elif 'sqlite' in settings.SQLALCHEMY_ENGINE:
    sql = f"""
            select name from sqlite_master where type='table' and name != 'alembic_version'
        """
    rows = db.execute(sql).fetchall()
    print(len(rows), rows)
    for table in rows:
        table_name = table[0]
        sql = f"""
                SELECT * FROM {table_name}
                """

        df = pd.read_sql(sql, con=engine)
        dir_path = os.path.join(os.path.dirname(__file__), "init_data")
        os.makedirs(dir_path, exist_ok=True)
        file_path = os.path.join(dir_path, f"{table_name.replace(settings.SQL_TABLE_PREFIX, '', 1)}.csv")
        print(file_path)
        df.to_csv(file_path, index=0)

elif 'postgresql' in settings.SQLALCHEMY_ENGINE:
    rows = [row for row in insp.get_table_names(schema='public') if row != 'alembic_version']
    print(len(rows), rows)
    # print(int('True'),int('False'))
    for table in rows:
        table_name = table
        sql = f"""
                SELECT * FROM {table_name}
                """

        df = pd.read_sql(sql, con=engine)
        dir_path = os.path.join(os.path.dirname(__file__), "init_data")
        os.makedirs(dir_path, exist_ok=True)
        file_path = os.path.join(dir_path, f"{table_name.replace(settings.SQL_TABLE_PREFIX, '', 1)}.csv")
        print(file_path)
        df.to_csv(file_path, index=0)
