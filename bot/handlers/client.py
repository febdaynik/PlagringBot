from aiogram import types

from bot.keyboards.kb_start_menu import start_markup


async def send_welcome(message: types.Message):
	msg = await message.bot.send_game(chat_id=message.chat.id, game_short_name='test')
	# await msg.edit_reply_markup(start_markup(msg.reply_markup))
