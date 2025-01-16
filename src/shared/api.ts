const apiUrl: string = 'https://bot5ka.ru/api/v1/' 

export async function fetchApi<T>(
    path: string,
    init?: RequestInit,
  ): Promise<T> {
    const response = await fetch(`${apiUrl}${path}`, init)
        return await response.json()
  }

  export async function fetchApiResponse(
    path: string,
    init?: RequestInit,
  ) {
    const response = await fetch(`${apiUrl}${path}`, init)
    return response
  }

export async function getCatalogs() {
    return await fetchApiResponse(`catalog/categories`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

export async function getActions(id?: string) {
    return await fetchApiResponse(`catalog/actions?category_id=${id || ''}`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

export async function getCatalogsCategory(id: string) {
    return await fetchApiResponse(`catalog/categories/${id}`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }


export async function getUserInfo(id: string) {
    return await fetchApiResponse(`users/${id}`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

export async function getUserInfoAboutOrders(id: string) {
    return await fetchApiResponse(`users/orders/${id}`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

export async function getProducts(id?: string) {
    return await fetchApiResponse(`catalog/products?category_id=${id || ''}`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

export async function getProductById(id: string) {
    return await fetchApiResponse(`catalog/products/${id}`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }


export async function appendCart(data: any, token: string | null | undefined) {
    return await fetchApiResponse(`cart/products/append`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
  }

export async function removeCart(data: any, token: string | null | undefined) {
    return await fetchApiResponse(`cart/products/remove`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
  }