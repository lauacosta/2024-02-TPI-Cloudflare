import dj_database_url
from decouple import config

SECRET_KEY = config("SECRET_KEY")

DEBUG = False

ALLOWED_HOSTS = [host.strip() for host in config("ALLOWED_HOSTS", default="localhost,https://tpi-desarrollo-e0f8gccuhvhpbkhj.eastus-01.azurewebsites.net/").split(",")]


DATABASES = {"default": config("DATABASE_URL", cast=dj_database_url.parse)}
