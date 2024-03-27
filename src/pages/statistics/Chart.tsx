import {useState} from 'react';
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
import {IDevice, dummyDeviceList} from '../../model/item.type';

const ChartPage = () => {
    const calculateChartData = (): {data: any[]} => {
        const typesCount: Record<string, number> = {};
        dummyDeviceList.forEach((device: IDevice) => {
            if (typesCount[device.type]) {
                typesCount[device.type]++;
            } else {
                typesCount[device.type] = 1;
            }
        });

        const data = Object.keys(typesCount).map((type) => ({
            type: type,
            count: typesCount[type],
        }));

        return {
            data,
        };
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {data} = calculateChartData();
    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

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
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <h3 style={{fontSize: '20px', marginBottom: '20px'}}>
                        Most Used Types
                    </h3>
                    <ResponsiveContainer width={500} height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='type' />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey='count' fill='#8884d8' />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>
        </div>
    );
};

export default ChartPage;
