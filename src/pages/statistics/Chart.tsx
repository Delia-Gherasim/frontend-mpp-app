import {useEffect, useState} from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import SideBar from '../../component/SideBar';
import TopBar from '../../component/TopBar';

interface ChartDataPoint {
    type: string;
    percentage: number;
}

const ChartPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [dataForCategories, setDataForCategories] = useState<
        ChartDataPoint[]
    >([]);
    const [dataForTypesElectronics, setDataForTypesElectronics] = useState<
        ChartDataPoint[]
    >([]);
    const [dataForTypesApliances, setDataForTypesApliances] = useState<
        ChartDataPoint[]
    >([]);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        fetch('http://localhost:5000/statistics/categPerc')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setDataForCategories(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/statistics/typePerc?category=electronics')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const transformedData: ChartDataPoint[] = Object.entries(
                    data,
                ).map(([type, percentage]) => ({
                    type,
                    percentage: percentage as number, // Ensure percentage is of type number
                }));
                setDataForTypesElectronics(transformedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/statistics/typePerc?category=appliances')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const transformedData: ChartDataPoint[] = Object.entries(
                    data,
                ).map(([type, percentage]) => ({
                    type,
                    percentage: percentage as number,
                }));
                setDataForTypesApliances(transformedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className={`container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <TopBar />
            <SideBar
                isOpen={isSidebarOpen}
                handleToggle={handleSidebarToggle}
            />
            <section className='section-content'>
                <h2 style={{textAlign: 'center'}}>Statistics</h2>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <h3 style={{fontSize: '14px', marginBottom: '16px'}}>
                            Percentages of Each Category
                        </h3>
                        <ResponsiveContainer width={300} height={300}>
                            <BarChart data={dataForCategories}>
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis dataKey='category' />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey='percentage' fill='#8884d8' />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <h3 style={{fontSize: '14px', marginBottom: '16px'}}>
                            Percentages of Each Type of Electronics
                        </h3>
                        <ResponsiveContainer width={300} height={300}>
                            <BarChart data={dataForTypesElectronics}>
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis dataKey='type' />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey='percentage' fill='#8884d8' />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <h3 style={{fontSize: '14px', marginBottom: '16px'}}>
                            Percentages of Each Type of Appliances
                        </h3>
                        <ResponsiveContainer width={300} height={300}>
                            <BarChart data={dataForTypesApliances}>
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis dataKey='category' />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey='percentage' fill='#8884d8' />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ChartPage;
