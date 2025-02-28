export function makePublishedDate(date: string) {
  const arrayDate = date.split('-');
  const year = arrayDate[0];
  const month = arrayDate[1];
  const day = arrayDate[2];

  return `${year}년 ${month}월 ${day}일`
}