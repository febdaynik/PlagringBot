from aiogram import types


async def game_callback(call: types.CallbackQuery):

	# if call.game_short_name is not None:
	await call.answer(url='https://febdaynik.github.io/PlagringBot/games/tic_tac_toe')

	# await call.answer()