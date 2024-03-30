import {useEffect, useState} from 'react';

type Props = {
    category?: string;
};

const Brands = ({category}: Props): string[] => {
    const [brandsList, setbrandsList] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = 'http://localhost:5000/brands';
                if (category) {
                    url = `http://localhost:5000/brands/byCategory?category=${category}`;
                }
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setbrandsList(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [category]);

    return brandsList;
};

export default Brands;
