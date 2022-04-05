export async function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  };
  const res = await fetch(`${endpoint}`, config);
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  const data = await res.json();
  return data;
}
