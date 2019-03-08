import { app } from 'electron'
import { join } from 'path'
import crypto from 'crypto'
import { pathExists } from 'fs-extra'
import { readFile } from '../../utils'

const userDataPath = app.getPath('userData')

export interface UserDataOptions {
  enableEncrypt: boolean;
  encryptSecret: string;
  encryptMethod: string;
}

export default class UserData {
  private static options: UserDataOptions = {
    enableEncrypt: true,
    encryptSecret: 'secret',
    encryptMethod: 'aes192'
  }

  /**
   * setOptions
   */
  public static setOptions(options: UserDataOptions) {
    this.options = Object.assign(this.options, options)
  }

  /**
   * readUserConfig
   */
  public static async readUserConfig(userId: string, configFileName: string) {
    if (!userId || !configFileName) {
      return null
    }
    const configFile = join(userDataPath, userId, configFileName)
    const configExisted = await pathExists(configFile)
    if (!configExisted) {
      return null
    }
    let content = await readFile(configFile, 'utf8')
    if (this.options.enableEncrypt) {
      // 解密内容
      const decipher = crypto.createDecipher(this.options.encryptMethod, this.options.encryptSecret)
      let decrypted = decipher.update(content, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      content = decrypted
    }
    try {
      return JSON.parse(content)
    } catch (error) {
      return null
    }
  }

  /**
   * saveUserConfig
   */
  public static async saveUserConfig(userId: string, configFileName: string, configContent: Object): Promise<boolean> {
    if (!userId || !configFileName) {
      return Promise.reject(false)
    }
    const configFile = join(userDataPath, userId, configFileName)
    const configExisted = await pathExists(configFile)
    if (!configExisted) {
      return Promise.reject(false)
    }
    let content = JSON.stringify(configContent)
    if (this.options.enableEncrypt) {
      // 加密内容
      const cipher = crypto.createCipher(this.options.encryptMethod, this.options.encryptSecret)
      let encrypted = cipher.update(content, 'utf8', 'hex')
      encrypted += cipher.final('hex')
      content = encrypted
    }
    return true
  }
}
