export const formatDateTime = (dateTimeString: string): string => {
  const genitiveMonths = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ]

  const date = new Date(dateTimeString)

  const day = date.getDate() // Извлекаем день
  const month = genitiveMonths[date.getMonth()] // Извлекаем название месяца в родительном падеже
  const year = date.getFullYear() // Извлекаем год
  const hours = date.getHours()
    .toString()
    .padStart(2, "0") // Извлекаем часы и форматируем
  const minutes = date.getMinutes()
    .toString()
    .padStart(2, "0") // Извлекаем минуты и форматируем

  return `${day} ${month} ${year}г. ${hours}:${minutes}`
}
