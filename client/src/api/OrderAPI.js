import Axios from "axios";

export const listOrders = async (userId, token) => {
    try {
        const res = await Axios.get(`/api/v1/orders/orders-list/${userId}`, {
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