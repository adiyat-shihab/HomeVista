import { useRouter } from 'next/navigation';
import { FaCartPlus } from 'react-icons/fa6';

const HandleAddToCart = ({ propertyData }) => {
    const router = useRouter();

    const handleAddToCart = () => {
        router.push('https://buy.stripe.com/test_00gcP0b5WeXd6jKcMM');
    };

    return (
        <button
            onClick={handleAddToCart}
            className="btn bg-secondary hover:bg-blue-800 text-white text-xl flex items-center justify-center gap-2 py-2"
        >
            <FaCartPlus /> {propertyData?.rentCheckbox ? 'Rent' : 'Buy'}
        </button>
    );
};

export default HandleAddToCart;
