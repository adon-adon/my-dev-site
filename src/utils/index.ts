export const getBaseApiUrl = () =>
  window.location.origin.startsWith('https://')
    ? window.location.origin
    : process.env.NEXT_PUBLIC_API_URL

export const getS3File = () => `${process.env.NEXT_PUBLIC_FILE_URL}/file`

export const getS3Url = () => `${getS3File()}/static/sports/images`

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`
