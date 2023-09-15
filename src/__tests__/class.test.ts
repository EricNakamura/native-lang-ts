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

  test("Should initialize the class sucessfully", () => {
    expect(
      Lang.init(configInit)
    ).toBeDefined()
  })
  it("Return a value from the languages", () => {
    expect(Lang.l("mainpage")).toBe("Main Page")
  })

  it("Have the same behavior as Lang.t", () => {
    const t = Lang.l
    expect(t("mainpage")).toBe("Main Page")
  })

})
