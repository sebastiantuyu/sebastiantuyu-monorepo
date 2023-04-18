export const fetchBlog = async (id?: string, category?: string) => {
  const query = `?populate=category&filters[category][id][$eq]=${category ?? 1}`;
  const API_URL = `https://socket.sebastiantuyu.com/api/articles${id ? `/${id}`: query}`;
  const rawContent = await fetch(API_URL);

  if(id) return await rawContent.json();
  const { data } = await rawContent.json();
  return data;
}
