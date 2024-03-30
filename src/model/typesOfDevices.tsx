import {useEffect, useState} from 'react';

type Props = {
    category?: string;
};

const Types = ({category}: Props): string[] => {
    const [typesList, setTypesList] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = 'http://localhost:5000/types';
                if (category) {
                    url = `http://localhost:5000/types/byCategory?category=${category}`;
                }
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTypesList(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [category]);

    return typesList;
};

export default Types;
