import yaml

def load_config():
    with open("config/settings.yaml","r") as file:
        config = yaml.safe_load(file)
        
    return config