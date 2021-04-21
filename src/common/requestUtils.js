const BASE_URL = document.location.hostname === 'localhost3' ? 'http://localhost:5000' : 'https://api.mkondo.co';

// Ensure you are running a local instance
const URL = BASE_URL;

const buildUrl = (url, data) => {
  const newUrl = `${URL}/${url}`;
  const headers = {
    'Access-Control-Allow-Origin': '*',
  };

  const props = {
    url: newUrl,
    headers,
  };

  if (data) {
    props.body = JSON.stringify(data);
    headers['Content-Type'] = 'application/json';
  }

  return props;
};

export const buildFormData = (url, data = {}, baseUrl=BASE_URL) => {
  const newUrl = `${baseUrl}${url}`;

  const headers = {
    'Accept': '*/*',
  };

  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  return {
    body: formData,
    url: newUrl,
    headers,
  };
};

export const handleFetch = async (method, path, data, token = '', baseUrl) => {
  let url, headers;

  const props = {};

  if (data && data.file) {
    const res = buildFormData(`/${path}`, data, baseUrl);
    url = res.url;
    headers = res.headers;
    props.body = res.body;
  } else {
    const res = buildUrl(path, data);
    url = res.url;
    headers = res.headers;

    if (res.body) {
      props.body = res.body;
    }
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...props,
    headers,
    method,
  });
  const status = response.status;
  const result = await response.text();

  if (![200, 201].includes(status)) {
    throw result;
  }

  return JSON.parse(result);
}
