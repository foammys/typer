/** ___      _   __  __
 *   |  \_/ |_| |__ |__|
 *   |   |  |   |__ |  \
 *
 * @copyright © 2022 foammy
 */

import YAML from 'yaml'
import { VK, Keyboard } from 'vk-io'

// Импорт системных модулей
import { readFileSync, readdirSync } from 'fs'

// Импорт компонентов ядра
import Logger from './logger.js'
import Utils from './utils.js'

// Импорт конфигураций проекта
const config = YAML.parse(readFileSync('config.yml', 'utf8'))
const project = JSON.parse(readFileSync('package.json', 'utf8'))

// Инициализация vk-io
const vk = new VK({ token: config.longpoll.token, v: config.longpoll.version })

// Сообщение о запуске
Logger.logInfo(`TyperBot v${project.version} is running`)

// Сообщение в лог о подключении к VK API
Logger.logInfo('Connecting to the VK')

// Старт получения событий ВК
vk.updates.startPolling().then(() => Logger.logInfo('VK: connected successfully'))

// Обработка сообщений ВК
vk.updates.on('message_new', ctx => {

// Имитация печатанья
if (config.messages.enabled) ctx.setActivity()
	
})

// Обработка ошибок бота -> логирование
process.on('uncaughtException', (error, origin) => Logger.logError(`${origin} -> ${error.stack}`))