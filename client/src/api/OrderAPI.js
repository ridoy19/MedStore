import Axios from "axios";

export const listOrders = async (token) => {
    try {
        const res = await Axios.get(`/api/v1/orders/orders-list`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
}


export const singleOrder = async (token, orderId) => {
    try {
        const res = await Axios.get(`/api/v1/orders/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
}


export const updateOrder = async (token, orderId, userId, data) => {
    try {
        const res = await Axios.put(`/api/v1/orders/update-order/${orderId}/${userId}`, JSON.stringify(data), {
            headers: {
                'Content-Type': `application/json`,
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const deleteOrder = async (token, orderId) => {
    try {
        const res = await Axios.delete(`/api/v1/orders/remove-order/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
}