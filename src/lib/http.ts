const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

function request(path: string, options?: RequestInit) {
  return fetch(`${baseUrl}${path}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    ...options,
  });
}

export function get(path: string, options?: RequestInit) {
  return request(path, { ...options, method: 'GET' });
}

export function post(path: string, data: unknown, options?: RequestInit) {
  return request(path, { ...options, method: 'POST', body: JSON.stringify(data) });
}

export function destroy(path: string, options?: RequestInit) {
  return request(path, { ...options, method: 'DELETE' });
}
