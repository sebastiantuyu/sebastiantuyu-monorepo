import { parseString, parseStringPromise } from 'xml2js';

const returnBlogMapping = (id: string) => {
  switch(id) {
    case 'cruzar-la-calle':
      return 0;
    case 'experiments':
      return 1;
    case 'subscriptions':
      return 2;
    default:
      return -1;
  }
};

const returnInverseMapping = (id: number) => {
  switch(id) {
    case 0:
    return 'cruzar-la-calle';
    case 1:
      return 'experiments';
    case 2:
      return 'subscriptions';
    default:
      return -1;
  }
}

export const fetchMediumBlog = async (id?: string) => {
  const rawContent = await fetch('https://socket.sebastiantuyu.com/api/b/all', {
    method: 'GET'
  });
  const { content } = await rawContent.json();
//
  if(id !== undefined) {
    return content.items.find((n: any) => {
      const url = new URL(n.link);
      return url.pathname === `/${id}`;
    });
  }
  return content.items.map((n: any, idx: number) => {
    const url = new URL(n.link);
    return Object.assign({ url: `thoughts/p${url.pathname}` }, n);
  });
};


export const fetchBlog = async (id?: string) => {
  const rawContent = await fetch(`https://socket.sebastiantuyu.com/api/b/all`, {
    method: 'GET'
  });
  const { content } = await rawContent.json();
  if(id) return content.filter((a: any) => a.suid === id);
  return content;
}
