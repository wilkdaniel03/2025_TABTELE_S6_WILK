import os
import sqlalchemy


def get_db_url() -> sqlalchemy.URL:
    host = os.environ.get("DB_HOST")
    user = os.environ.get("DB_USER")
    password = os.environ.get("DB_PASS")
    dbname = os.environ.get("DB_DBNAME")

    if not all([host,user,password,dbname]):
        raise ValueError("Failed to read envs")

    port = os.environ.get("DB_PORT")
    if port is None:
        port = 3306
    else:
        port = int(port)

    return sqlalchemy.URL.create("mysql+pymysql",user,password,host,port,dbname)


def get_auth_service_url():
    host = os.environ.get("AUTH_HOST")
    port = os.environ.get("AUTH_PORT")

    if not all([host,port]):
        raise ValueError("Failed to load auth's envs")

    return "http://{}:{}".format(host,port)


def get_gateway_url():
    host = os.environ.get("GATEWAY_HOST")
    port = os.environ.get("GATEWAY_PORT")

    if not all([host,port]):
        raise ValueError("Failed to load gateway's envs")

    return "ws://{}:{}".format(host,port)
