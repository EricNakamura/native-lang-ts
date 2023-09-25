import chalk from "chalk"
import { IInitProps, ILanguages, INativeLang } from "./types"
import Translator from "./translator"



//@ts-expect-error - inst type is correct
function bindMemberFunctions(inst) {
  const mems = Object.getOwnPropertyNames(Object.getPrototypeOf(inst))  
  mems.forEach((mem) => {
    if (typeof inst[mem] === "function") {
      inst[mem] = inst[mem].bind(inst)
    }
  })
}


export default class nativeLang implements INativeLang {
  options: IInitProps
  translator!: Translator

  constructor(props: IInitProps = {}) {
    this.options = props
    this.init(props)  

    bindMemberFunctions(this)

    return this
  }

  init(props: IInitProps = {}): typeof this {
    const keys = Object.keys(props)
    keys.forEach((i) => {
      try {
        //@ts-expect-error - typeof "i" is compatible with the keys of "this"(nativeLang)
        this.options[i as keyof this] = props[i as keyof typeof props]
      } catch (err) {
        console.log(chalk.bgRed.white(err))
      }
    })
    this.translator = new Translator(this.options)    
    return this
  }

  setLanguages(languages: ILanguages) {
    this.options.Languages = languages
    return this
  }


  getLanguages(): ILanguages {
    if (this.options.Languages !== undefined) {
      return this.options.Languages
    }
    return {} as ILanguages
    
  }

  setActualLanguage(actualLanguage: string) {
    this.options.actualLanguage = actualLanguage
    return this
  }

  getActualLanguage() {
    return this.options.actualLanguage
  }

  setFallbackLanguage(fallbackLanguage: string) {
    this.options.fallbackLanguage = fallbackLanguage
    return this
  }

  getFallbackLanguage() {
    return this.options.fallbackLanguage
  }

  l(key: string) {

    return this.translator && this.translator.translate(key)

  }
}
