import chalk from "chalk"
import { IInitProps } from "./types"

class Translator {
  options: IInitProps
  constructor(options = {}) {
    this.options = options
    return this
  }

  translate(key: string){

    const language = this.options.Languages
    const actualLng = this.options.actualLanguage
    const fallbackLang = this.options.fallbackLanguage

    if (language !== undefined && actualLng !== undefined && fallbackLang !== undefined) {
      try {
        if (language[fallbackLang][key]) {
          if (!language[actualLng]) {
            console.log(chalk.rgb(0,0,0).bgYellowBright.bold(`The actual language ${actualLng} does not exists, using the fallback language ${fallbackLang}`))
            return language[fallbackLang][key]
          }
          if (!language[actualLng][key]) {
            console.log(chalk.rgb(0,0,0).bgYellowBright.bold(`The given key, ${key}, does not exists in the laguague, ${actualLng}, dictionary. Using the fallback dictionary`))
            return language[fallbackLang][key]
          }
 
        } else if (!language[fallbackLang] && !language[actualLng]) {
          throw console.log(chalk.rgb(0,0,0).bgYellowBright.bold("Desired languages are not found, check if the languages are defined correctly"))
        }
      } catch(err) {
        throw console.log(err)
      }
      return language[actualLng][key]
    }
    throw console.log(chalk.rgb(0,0,0).bgRed.italic("Languages or actualLanguage or fallbackLanguage are not defined"))
  }
}

export default Translator