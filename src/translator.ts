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
    let res = ""

    if (language !== undefined && actualLng !== undefined) {
      res = language[actualLng][key]
    }
    
    return res
  }
}

export default Translator