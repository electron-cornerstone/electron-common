import { readFile as _readFile, writeFile as _writeFile } from 'fs'

export default function promisify (fn: Function) {
  return function () {
    return new Promise((resolve, reject) => {
      fn(...arguments, function () {
        if (arguments[0] instanceof Error) {
          reject(arguments[0])
        } else {
          resolve(...Array.prototype.slice.call(arguments, 1))
        }
      })
    })
  }
}

export const readFile = promisify(_readFile)

export const writeFile = promisify(_writeFile)
