import { useCallback, useEffect, useState } from 'react'
const { Translate } = require('@google-cloud/translate').v2

let translate;

export const setConfig = async ({
    clientEmail,
    privateKey,
    projectId
  }) => {
    translate = new Translate({
      credentials: {
        private_key: privateKey,
        client_email: clientEmail
      },
      projectId: projectId
    })
  }
  

export const translateText = async (
    text,
    targetLanguage
  ) => {
    try {
        console.log("Text : ", text)
        console.log("target Language : ", targetLanguage)
      const [response] = await translate.translate(text, targetLanguage)
      console.log("Response : ", response);
      let result = response
      if (Array.isArray(response)) {
        result = response.map((val) =>
          val !== '' ? val : text
        )
      }
      return result
    } catch (error) {
      console.error('1 => Error at translatedText --> ', `${error}`)
      return ''
    }
  }

export const useLazyTranslate = (props) => {
  const { language, skip } = props
  const [loading, setLoading] = useState(true)
  const [called, setCalled] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    if (skip) {
      setCalled(true)
      setLoading(false)
    }
  }, [])

  return [
    useCallback(
      (text, target) => {
        if (skip) {
          return null
        }
        return translateText(text, target || language)
          .then((res) => {
            setData(res)
          })
          .finally(() => {
            setCalled(true)
            setLoading(false)
          })
      },
      [language]
    ),
    {
      called,
      loading,
      data
    }
  ]
}

export const useTranslate = (
  text,
  props
) => {
  const [translate, { loading, data }] = useLazyTranslate(props)
  useEffect(() => {
    let mounted = true
    if (mounted) {
      translate(text)
    }
    return () => {
      mounted = false
    }
  }, [])
  return {
    loading,
    data
  }
}