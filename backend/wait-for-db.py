import time
import psycopg2
from psycopg2 import OperationalError

def wait_for_postgres(host, port, user, password, dbname, max_retries=30, delay=2):
    for i in range(max_retries):
        try:
            conn = psycopg2.connect(
                host=host,
                port=port,
                user=user,
                password=password,
                dbname=dbname
            )
            conn.close()
            print(">===< Подключение к PostgreSQL установлено")
            return True
        except OperationalError as e:
            print(f"==> Ожидание PostgreSQL... Попытка {i+1}/{max_retries}")
            time.sleep(delay)
    print("!== Не удалось подключиться к PostgreSQL")
    return False

if __name__ == "__main__":
    wait_for_postgres(
        host="db",
        port=5432,
        user="user",
        password="password",
        dbname="notesdb"
    )