from aiogram import types


def start_markup(markup) -> types.InlineKeyboardMarkup:
	# Обдумать этот момент
	# markup = types.InlineKeyboardMarkup()

	# markup.row(types.InlineKeyboardButton('TES', url='https://febdaynik.github.io/PlagringBot'))
	# markup.add(types.InlineKeyboardButton('Играть', web_app=types.WebAppInfo(url='')))
	return markup
