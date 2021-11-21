export const DBConfig = {
  name: "TranslateHistoryDB",
  version: 1,
  objectStoresMeta: [
    {
      store: "history",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        {
          name: "sourceLanguage",
          keypath: "sourceLanguage",
          options: { unique: false },
        },
        {
          name: "targetLanguage",
          keypath: "targetLanguage",
          options: { unique: false },
        },
        {
          name: "sourceText",
          keypath: "sourceText",
          options: { unique: false },
        },
        {
          name: "targetText",
          keypath: "targetText",
          options: { unique: false },
        },
      ],
    },
  ],
};
