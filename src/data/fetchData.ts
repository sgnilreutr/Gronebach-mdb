const fetchData = async () => {
  const json = localStorage.getItem('movies')
  try {
    if (json) {
      const allMovies = JSON.parse(json)
      if (allMovies) {
        return allMovies
      }
      return []
    }
    return []
  } catch (err) {
    console.error(err)
    return []
  }
}

export default fetchData
