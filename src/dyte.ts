const env = () => ({
  DYTE_API_KEY: process.env.DYTE_API_KEY,
  DYTE_API_URL: process.env.DYTE_API_URL,
  DYTE_ORG_ID: process.env.DYTE_ORG_ID,
});

const getHeaders = (options: RequestInit) => {
  const {DYTE_API_KEY, DYTE_ORG_ID} = env();
  const token = Buffer.from(`${DYTE_ORG_ID}:${DYTE_API_KEY}`).toString('base64');
  const headers = structuredClone(options.headers ?? {}) as Record<string, string>;
  headers['Authorization'] = `Basic ${token}`;
  headers['Content-Type'] = 'application/json';
  return headers
};


export default async function dyte(path: string, options: RequestInit) {
  const url = `${env().DYTE_API_URL}${path}`;
  options.headers = getHeaders(options);
  const response = await fetch(url, options);
  const data = await response.json();
  return {status: response.status, data};
}

export type Participant = {
  id: string;
  name: string;
};

export type Meeting = {
  id: string;
  title: string;
};
