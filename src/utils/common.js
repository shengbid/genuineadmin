export const getToken = () => {
  const res = JSON.parse(localStorage.getItem('currentUser'))

  if (res) {
    return res.token
  }
}