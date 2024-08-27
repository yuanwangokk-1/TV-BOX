from core.config import settings
from utils.loggers import Logging


_path = str(settings.LOGGING_CONFIG_FILE)
Logging(_path)


logging = Logging
logger = logging.use("api")

