import logging

from aiogram import executor, types

from handlers import client, callbacks
from config import dp
from updateworker import get_handled_updates_list

logger = logging.getLogger(__name__)


"""
--------------------------------------------
			 ____  ____  ____ 
			( ___)( ___)(  _ \
			 )__)  )__)  ) _ <
			(__)  (____)(____/
--------------------------------------------
"""


async def on_startup(_):
	logging.info(f"Bot started")

	logging.info("Database connected")


# Handlers
dp.register_callback_query_handler(callbacks.game_callback)
dp.register_message_handler(client.send_welcome, commands='start', chat_type=types.ChatType.PRIVATE)
# ---


if __name__ == '__main__':
	logging.disable(level=logging.DEBUG)

	# logging.basicConfig(
	# 	level=logging.INFO,
	# 	filename='log_file.log',
	# 	format="%(asctime)s - %(levelname)s - %(name)s - %(message)s",
	# )
	logger.info('Start logger')

	print("Starting bot")
	executor.start_polling(dp, skip_updates=True, on_startup=on_startup, allowed_updates=get_handled_updates_list(dp))
	logger.info('Stop logger\n')
