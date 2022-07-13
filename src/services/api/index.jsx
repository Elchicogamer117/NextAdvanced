const API = process.env.NEXT_PUBLIC_API_URL;
const version = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/api/${version}/auth/login`,
    profile: `${API}/api/${version}/auth/profile`,
  },
  users: {
    getUsers: `${API}/api/${version}/users`,
    postUsers: `${API}/api/${version}/users`,
  },
  products: {
    getProducts: `${API}/api/${version}/products/`,
    postProducts: `${API}/api/${version}/products/`,
    getProduct: (id) => `${API}/api/${version}/products/${id}`,
    getRangeProducts: (limit, offset) => `${API}/api/${version}/products?limit=${limit}&offset=${offset}`,
    putProduct: (id) => `${API}/api/${version}/products/${id}`,
    deleteProduct: (id) => `${API}/api/${version}/products/${id}`,
  },
  categories: {
    getCategories: `${API}/api/${version}/categories`,
    postCategories: `${API}/api/${version}/categories`,
    getCategoryProduct: (id) => `${API}/api/${version}/categories/${id}/products`,
    putCategory: (id) => `${API}/api/${version}/categories/${id}`,
  },
  files: {
    postFiles: `${API}/api/${version}/files/upload`,
    getFile: (fileName) => `${API}/api/${version}/${fileName}`,
  },
};

export default endPoints;
