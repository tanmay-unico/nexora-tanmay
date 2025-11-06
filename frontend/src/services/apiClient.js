const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(payload?.message || 'Request failed');
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  return parseResponse(response);
};

export const productApi = {
  list: () => request('/api/products'),
};

export const cartApi = {
  get: () => request('/api/cart'),
  upsert: ({ productId, quantity }) =>
    request('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, qty: quantity }),
    }),
  remove: (id) =>
    request(`/api/cart/${id}`, {
      method: 'DELETE',
    }),
};

export const checkoutApi = {
  submit: ({ name, email }) =>
    request('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ name, email }),
    }),
};

export const apiBaseUrl = API_BASE_URL;

