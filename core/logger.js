/** ___      _   __  __
 *   |  \_/ |_| |__ |__|
 *   |   |  |   |__ |  \
 *
 * @copyright © 2022 foammy
 */

// Импорт зависимостей
import YAML from 'yaml'

// Импорт системных модулей
import { readFileSync, existsSync, mkdirSync, appendFileSync } from 'fs'

// Импорт компонентов ядра
import Utils from './utils.js'

// Импорт конфигураций проекта
const config = YAML.parse(readFileSync('config.yml', 'utf8'))

// Функция получения строки со временем
function getTime() {
  return `${Utils.getTime().hours}:${Utils.getTime().minutes}:${Utils.getTime().seconds}`
}

// Функция получения строки с датой
function getDate() {
  return  `${Utils.getDate().day}.${Utils.getDate().month}.${Utils.getDate().year}`
}

/**
 * Форматирует и выводит лог
 * @param {string} prefix Префикс
 * @param {string} text Текст
 * @param {string} color_code Цветовой код
 */
function logData (prefix, text, color_code = '') {

  // Форматирование строки
  const string = `${color_code}[${getTime()} ${prefix}]: ${text}\u001B[0m`

  // Отображение в консоль
  console.log(string)

}

// Экспорт логера
export default class Logger {

  /**
   * Выводит в лог информацию
   * @param {string} text Текст сообщения
   */
  static logInfo(text) {
    logData('INFO', text)
  }

  /**
   * Выводит в лог предупреждения
   * @param {string} text Текст предупреждения
   */
  static logWarn(text) {
    logData('WARN', text, '\u001B[33m')
  }

  /**
   * Выводит в лог ошибки
   * @param {string} text Текст ошибки
   */
  static logError(text) {
    logData('ERRO', text, '\u001B[31m')
  }
}