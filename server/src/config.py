import os

from dotenv import load_dotenv


class EnvConfig:
    def __init__(self):
        load_dotenv(".env")  # Note: doesn't overwrite existing env vars in your shell

    def __call__(self, env_var_name: str, default: any = None):
        return os.environ.get(env_var_name, default)


config: EnvConfig = EnvConfig()

TOGETHER_API_KEY = config("TOGETHER_API_KEY")