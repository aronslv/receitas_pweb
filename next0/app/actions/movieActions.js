'use server'

export async function searchMovies(formData) {
  const titleSearchKey = formData.get("titleSearchKey");
  const yearSearchKey = formData.get("yearSearchKey");

  if (!titleSearchKey || titleSearchKey === '') return { Search: [] };

  const query = `s=${titleSearchKey}${yearSearchKey ? `&y=${yearSearchKey}` : ''}`;

  try {
    const httpRes = await fetch(`http://www.omdbapi.com/?apikey=a75302ac&${query}`);
    const jsonRes = await httpRes.json();
    return jsonRes;
  } catch (err) {
    return { error: `Erro na requisição ${err}` };
  }
}