import Axios from "axios"

export const getBrainTreeClientToken = async (userId, token) => {
    try {
        const res = await Axios.get(`/api/v1/braintree/get-token/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(res)
        return res;
    } catch (error) {
        console.log(error)
    }
}


