import os
import asyncio

from aiogram import Bot, Dispatcher
from aiogram.contrib.fsm_storage.memory import MemoryStorage


async def set_username_bot():
	return await bot.get_me()

bot = Bot(token=os.getenv("BOT_TOKEN"))

# Определение юзернейма
loop = asyncio.get_event_loop()
bot_me = loop.run_until_complete(set_username_bot())
username_bot = bot_me.username
# ---

dp = Dispatcher(bot, storage=MemoryStorage())
