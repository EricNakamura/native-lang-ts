export interface Lang {
  languages: ILanguages;
  actualLanguage: string;
  fallbackLanguage: string;
}

export type IFallbackLanguage<T> = keyof T extends string ? keyof T : "";

export type ILanguages = {
  [k: string]: {
    [values: string]: string;
  };
};

export interface Config {
  languages: ILanguages;
  fallbackLanguage: IFallbackLanguage<ILanguages>;
  actualLanguage: string;
}

export type INativeLang = {
  init(props: IInitProps): object
  setLanguages(languages: ILanguages): object
  getLanguages(): ILanguages
  setActualLanguage(actualLanguage: string): object
};

export interface IInitProps {
  Languages?: ILanguages;
  actualLanguage?: string;
  fallbackLanguage?: string
}
