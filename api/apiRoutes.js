import clienteAxios from "config/configAxios";
import { getTokenSession } from "components/auth/authHelpers";

// NOTE: All Categories
export const getAllCategories = async () => {
  try {
    const response = await clienteAxios.get(`categories`);
    return response.data.data.categories;
  } catch (error) {
    "There are an error getting Categories", error;
  }
};

// NOTE: Category By Id
export const getCategoryById = async (categoryId) => {
  try {
    const response = await clienteAxios.get(`/categories/find/8`);
    return response.data;
  } catch (error) {
    "There are an error getting Categories", error;
  }
};

// NOTE: Products by Category
export const getProductsByCategory = async (categoryId) => {
  if (categoryId) {
    try {
      const response = await clienteAxios.get(`products/${categoryId}`);
      return response.data.data.products;
    } catch (error) {
      console.log("There are an error getting Products by Category", error);
    }
  }
};

// NOTE: All Products
export const getAllProducts = async () => {
  try {
    const response = await clienteAxios.get(`/products`);
    return response.data.data.products;
  } catch (error) {
    console.log("There are an error getting all Products", error);
  }
};

// NOTE: Product
export const getProduct = async (productId) => {
  try {
    const response = await clienteAxios.get(`/products/find/${productId}`);
    return response.data.data.product;
  } catch (error) {
    console.log("There are an error getting Product", error);
  }
};

// NOTE: Design group by Design Id
export const getDesignGroupsById = async (designId) => {
  try {
    const response = await clienteAxios.get(
      `/products/design-groups/find/${designId}`
    );
    response.data.data.design_group.designs.sort((a, b) => {
      return a.position - b.position;
    });
    return response.data.data.design_group.designs;
  } catch (error) {
    console.log("There are an error getting Design Group", error);
  }
};

// NOTE: Design group by Design
export const getDesignByTag = async (tagId) => {
  if (tagId) {
    try {
      const response = await clienteAxios.get(
        `/products/designs-by-tag/${tagId}`
      );
      response.data.data.designs.sort((a, b) => {
        return a.position - b.position;
      });

      return response.data.data.designs;
    } catch (error) {
      console.log("There are an error getting Design by Tag", error);
    }
  }
};

// NOTE: All Packs
export const getPacks = async () => {
  try {
    const response = await clienteAxios.get(`/packs`);
    response.data.data.packs.sort((a, b) => {
      return a.position - b.position;
    });

    return response.data.data.packs;
  } catch (error) {
    console.log("There are an error getting Packs", error);
  }
};

// NOTE: Packs by Category
export const getPackByCategory = async (categoryId) => {
  if (categoryId) {
    try {
      const response = await clienteAxios.get(`/packs/${categoryId}`);
      if (!response.data.data.packs) return;

      response.data.data.packs.sort((a, b) => {
        return a.position - b.position;
      });

      return response.data.data.packs;
    } catch (error) {
      console.log("There are an error getting Packs by Category", error);
    }
  }
};

// NOTE: Pack by Id
export const getPackById = async (packId) => {
  if (packId) {
    try {
      const response = await clienteAxios.get(`/packs/find/${packId}`);
      return response.data.data.pack;
    } catch (error) {
      console.log("There are an error getting Pack by Id", error);
    }
  }
};

// NOTE: Top Categories
export const getTopCategories = async () => {
  try {
    const response = await clienteAxios.get(`/cms/top-categories`);
    return response.data.data.top_categories;
  } catch (error) {
    console.log("There are an error getting top_categories", error);
  }
};

// NOTE: Top Designs
export const getTopDesigns = async () => {
  try {
    const response = await clienteAxios.get(`/cms/top-designs`);
    return response.data.data.top_designs;
  } catch (error) {
    console.log("There are an error getting top_categories", error);
  }
};

// NOTE: Login
export const authLogin = async (log) => {
  try {
    const response = await clienteAxios.post(`/customers/login`, log);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// NOTE: User Register
export const userRegister = async (user) => {
  try {
    const response = await clienteAxios.post(`/customers/register-user`, user);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// NOTE: Company Register
export const companyRegister = async (user) => {
  try {
    const response = await clienteAxios.post(`/customers/register`, user);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

// NOTE: Confirm User Email
export const confirmRegisterEmail = async (registerEmail) => {
  try {
    const response = await clienteAxios.get(
      `/aaa/${registerEmail}/atr9ysu5afs5uasfg6fi8asyo9nua9gs`
    );
    return response.data.message;
  } catch (error) {
    console.log(error);
  }
};

//NOTE: Confirm Company CIF
export const confirmCifCompany = async (cifCompany) => {
  try {
    const response = await clienteAxios.get(
      `/bbb/${cifCompany}/axg4ys15afs5u6atogg6fi8asyo9a9gf`
    );
    return response.data.message;
  } catch (error) {
    console.log(error);
  }
};

//NOTE: Get Cart if user or company is registered
export const confirmCart = async () => {
  try {
    const response = await clienteAxios.get(`/shop/sales/carts`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//NOTE: Generate tokenCart if not autenticated
export const getTokenCartNoAuth = async () => {
  try {
    const response = await clienteAxios.get(`/utils/generate-token/carts`);
    return response.data.data.token;
  } catch (error) {
    console.log(error);
  }
};

//NOTE: Get public Cart
export const getPublicCart = async (token) => {
  try {
    const response = await clienteAxios.get(`/shop/sales/carts/${token}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

//NOTE: Add lines to public Cart
export const addLinesToCart = async (linescart, token) => {
  try {
    const response = await clienteAxios.post(
      `/shop/sales/carts/lines/${token}`,
      linescart
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

//NOTE: Delete line to public Cart
export const deleteCartLine = async (lineId, cartToken) => {
  try {
    const response = await clienteAxios.delete(
      `/shop/sales/carts/lines/${lineId}/${cartToken}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

//NOTE: Get customer Cart
export const getCustomerCart = async () => {
  try {
    const response = await clienteAxios.get(`/shop/sales/carts`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

//NOTE: Add lines to customer Cart
export const addLinesToCustomerCart = async (linescart) => {
  try {
    const response = await clienteAxios.post(
      `/shop/sales/carts/lines`,
      linescart
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

//NOTE: Delete line to customer Cart
export const deleteCustomerCartLine = async (lineId) => {
  try {
    const response = await clienteAxios.delete(
      `/shop/sales/carts/lines/${lineId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

//NOTE: Search product by string (XIMO)
export const getSearchProductByString = async (str) => {
  try {
    const response = await clienteAxios.get(`/shop/search/${str}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
