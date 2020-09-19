import Axios from "axios"

export const placeOrder = async (userId, token, cartData) => {
    try {
        const res = await Axios.post(`/api/v1/orders/place-order/${userId}`, JSON.stringify({order: cartData}), {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(res)
        return res;
    } catch (error) {
        console.log(error)
    }
}