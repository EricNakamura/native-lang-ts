import nativeLang from "../class"
import { IInitProps } from "../types"

const configInit: IInitProps = {
  Languages: { en: { mainpage: "Main Page" }, pt: {} },
  actualLanguage: "en",
  fallbackLanguage: "en"
}

describe("nativeLang class functionalities", () => {
  const Lang = new nativeLang()
  Lang.init(configInit)
  const t = Lang.l

  beforeEach(() => {
    Lang.setActualLanguage("en")
    Lang.setFallbackLanguage("en")
  })

  test("Should initialize the class sucessfully", () => {
    expect(
      Lang.init(configInit)
    ).toBeDefined()
  })
  it("Return a value from the languages", () => {
    expect(Lang.l("mainpage")).toBe("Main Page")
  })

  it("Have the same behavior as Lang.t()", () => {
    expect(t("mainpage")).toBe("Main Page")
  })
  it("Should use the fallback language due to not found actualLanguage", () => {
    Lang.setActualLanguage("ru")
    expect(t("mainpage")).toBe("Main Page")
  })
  it("Should use the fallback language due to not found de given value in the actual language", () => {
    Lang.setActualLanguage("pt")
    expect(t("mainpage")).toBe("Main Page")
  })
  it("Should thrown because neither actualLanguage nor fallbackLanguage are defined", () => {
    Lang.setActualLanguage("")
    Lang.setFallbackLanguage("")
    expect(() => {t("mainpage")}).toThrow
  })

})
