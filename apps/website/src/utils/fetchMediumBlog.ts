export const fetchBlog = async (id?: string) => {
  const API_URL = `http://socket.sebastiantuyu.com/api/articles${id ? `/${id}`:''}`;
  const rawContent = await fetch(API_URL);

  if(id) return await rawContent.json();
  const { data } = await rawContent.json();
  return data;
}
