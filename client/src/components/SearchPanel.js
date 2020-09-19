import React from 'react';
import Button from './Button';
import DisplayProducts from './DisplayProducts';
import Input from './Input';


const SearchPanel = () => {
    const [products, setProducts] = useState([]);
    const [searchQ, setSearchQ] = useState('');

    const fetchProducts = async () => {
        setLoading(true);
        const res = await Axios.get(`/api/v1/products?page=${skip}&paginate=${limit}`);
        console.log(res)
        setProducts(res.data.data);
        setLoading(false);
    }

    function search(prod) {
        return prod.filter(prod => prod.genericName.toLowerCase().indexOf(searchQ) > -1);
    }

    useEffect(() => {
        fetchProducts();
    }, [])
    console.log(JSON.stringify(seach(products)))
    return (
        <React.Fragment>
            <form class="form-inline my-2 my-lg-0">
                <Input className="form-control mr-sm-2" onChange={e => setSearchQ(e.target.value)} value={searchQ} name="search" />
                <Button className="btn btn-success">Search</Button>
            </form>
            
        </React.Fragment>
    )
}

export default SearchPanel;