import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useGetYFActVsPlnQuery } from '../../redux/service/orderManagement';
import { useGetBuyerNameQuery, useGetFinYearQuery, useGetMonthQuery } from '../../redux/service/commonMasters';
import DropdownCom from '../../Ui Component/modelParam';
import { HiOutlineRefresh } from "react-icons/hi";
const Dashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedBuyer, setSelectedBuyer] = useState('');
    const [selectedYear, setSelectedYear] = useState('')
    const [buyerNm, setBuyerNm] = useState([]);
    const [monthData, setMonthData] = useState([])
    const [yearData, setYearData] = useState([])
    const { data: fabPlVsActFull, isLoading: isyfActVsPlLoadingFull, refetch } = useGetYFActVsPlnQuery({ params: { filterMonth: selectedMonth || '', filterSupplier: selectedBuyer || '', filterYear: selectedYear || '' } });
    console.log(selectedYear, 'selectedTear');
    const { data: buyer, isLoading: isbuyerLoad } = useGetBuyerNameQuery({ params: {} });
    const { data: month } = useGetMonthQuery({ params: { filterYear: selectedYear || '', filterBuyer: selectedBuyer || '' } })
    const { data: year } = useGetFinYearQuery({})
    console.log(year, 'finyr');
    useEffect(() => {
        if (buyer?.data || month?.data) {
            const buyerName = (buyer?.data ? buyer?.data : []).map((item) => item.buyerName);
            const monData = (month?.data ? month?.data : []).map((mon) => mon.month);
            const finYearData = (year?.data ? year?.data : []).map((year) => year.finYear)
            setBuyerNm(buyerName);
            setMonthData(monData);
            setYearData(finYearData)
        }
    }, [buyer, month, year]);

    const fabPlVsActFullDt = fabPlVsActFull?.data ? fabPlVsActFull?.data : [];

    const orderCount = fabPlVsActFullDt.length;
    const totalPlanned = fabPlVsActFullDt.reduce((total, order) => total + (order.planed || 0), 0);
    const totalActual = fabPlVsActFullDt.reduce((total, order) => total + (order.actual || 0), 0);

    const totalQty = fabPlVsActFullDt.reduce((total, order) => total + (order.qty || 0), 0)
    console.log(totalActual, 'toasl');
    const options = {
        chart: {
            type: 'column',
            scrollablePlotArea: {
                minWidth: orderCount < 10 ? 300 : orderCount < 20 ? 500 : orderCount <= 40 ? 1500 : orderCount <= 65 ? 2000 : orderCount < 85 ? 2500 : orderCount < 120 ? 3000 : orderCount < 150 ? 3500 : 300,
                scrollPositionX: 0
            }
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: fabPlVsActFullDt.map((order) => order.ordeNo),
            title: {
                text: 'Order No'
            },
            labels: {
                rotation: -90,
                step: 1,
                style: {
                    fontSize: '12px'
                }
            },
            scrollbar: {
                enabled: true
            },
        },
        yAxis: {
            title: {
                text: 'Price',
                style: {
                    fontSize: '10px',
                    paddingLeft: '20px'
                },
            },
            labels: {
                style: {
                    fontSize: '10px'
                },
                formatter: function () {
                    return this.value.toLocaleString();
                }
            },
        },
        plotOptions: {
            column: {
                pointWidth: 20,
                stacking: 'percent',
                states: {
                    hover: {
                        pointWidth: 20
                    }
                },
                marker: {
                    enabled: false
                },
            }
        },
        legend: {
            itemStyle: {
                fontWeight: 'bold'
            },
            symbolHeight: 12,
            symbolWidth: 12,
            symbolRadius: 1,
        },
        series: [
            {
                name: 'Planned',
                data: fabPlVsActFullDt.map((order) => ({
                    y: order.planed,
                    color: order.planed ? '#358CFB' : '#FB4A35'
                })),
                color: '#358CFB',
            },
            {
                name: 'Actual',
                data: fabPlVsActFullDt.map((order) => ({
                    y: order.actual,
                    color: order.actual ? '#FB4A35' : '#358CFB'
                })),
                color: '#FB4A35',
            },
        ],
    };





    const orderDataGridRows = [
        ...fabPlVsActFullDt.map((order, index) => ({
            id: index,
            serial: index + 1,
            orderNo: order.ordeNo,
            qty: order.qty,
            plannedPrice: (order.planed || 0).toFixed(2).toLocaleString(),
            actualPrice: (order.actual || 0).toFixed(2).toLocaleString(),
        })),
        { id: 'total', serial: '', orderNo: 'Total', qty: totalQty, plannedPrice: totalPlanned.toFixed(2).toLocaleString(), actualPrice: totalActual.toFixed(2).toLocaleString(), },
    ];

    const valueFormatter = ({ value }) => {
        const formattedValue = parseFloat(value ? value : 0).toFixed(2);
        return isNaN(formattedValue) ? '' : formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    const orderDataGridColumns = [
        { field: 'serial', headerName: 'S/No', maxWidth: 40, maxHeight: 15 },
        { field: 'orderNo', headerName: 'Order No', maxWidth: 90 },
        { field: 'qty', headerName: 'Qty', maxWidth: 20, align: 'right' },
        { field: 'plannedPrice', headerName: 'Planned Price', valueFormatter, flex: 1, align: 'right', headerAlign: 'right', minWidth: 110 },
        { field: 'actualPrice', headerName: 'Actual Price', valueFormatter, align: 'right', headerAlign: 'right', maxWidth: 110 },
    ];

    const theme = createTheme({
        components: {
            MuiDataGrid: {
                styleOverrides: {
                    root: {
                        fontSize: '10px',
                    },
                    columnHeader: {
                        fontSize: '10px',
                        height: '36px',
                    },
                    cell: {
                        fontSize: '10px',
                        height: '2px',
                        textAlign: 'right',
                    },
                },
            },
        },
    });
    const getRowClassName = (params) => {
        const rowClass = params.indexRelativeToCurrentPage % 2 === 0 ? 'bg-gray-100' : 'bg-white';
        return params.id === 'total' ? 'fontWeightBold' : rowClass;

    };
    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="flex justify-end ">

                    <div className='flex items-center'>
                        <label className='text-sm text-center pt-[2px]'>Select :</label>
                    </div>
                    <DropdownCom
                        selectedBuyer={selectedBuyer}
                        setSelectedBuyer={setSelectedBuyer}
                        selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        options={buyerNm}
                        monthOptions={monthData}
                        yearOptions={yearData}
                        columnHeaderHeight={"30"}
                    />
                    <div className='flex  group relative'>
                        <button
                            className=' bg-sky-500 rounded-sm p-1 flex items-center justify-center h-[30px] text-center font-normal text-[16px] border-2 border-[#E0E0E0]'
                            onClick={() => refetch()}>
                            <HiOutlineRefresh />
                        </button>
                        <span className='group-hover:opacity-100 transition-opacity bg-gray-800 px-1 bottom-5 text-sm text-gray-100 rounded-md -translate-x-1/2 absolute opacity-0 z-40'>
                            Refresh
                        </span>
                    </div>
                </div>
                {console.log(selectedBuyer, selectedMonth, 'buyer')}
                {orderCount > 0 ? (<div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                    <div style={{ flex: '66%', minWidth: '66%' }} className='flex flex-col'>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                            containerProps={{ style: { minWidth: '70%' } }}
                        />
                        <h2>Total Orders :{orderCount}</h2>
                    </div>
                    <div style={{ flex: '30%', minWidth: '30%', height: 420 }}>
                        <DataGrid
                            rows={orderDataGridRows}
                            columns={orderDataGridColumns}
                            editMode="row"
                            rowHeight={24}
                            hideFooterSelectedRowCount
                            columnHeaderHeight={30}

                            getRowClassName={getRowClassName}
                            paginationMode="server"

                            sx={{
                                '& .MuiDataGrid-columnHeader': {
                                    background: 'linear-gradient(180deg, #afafae, #ffffff)',
                                    textAlign: 'center',
                                    fontSize: '10px',
                                    fontWeight: '400',
                                    borderColor: '#E5E7EB',
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    display: 'none'
                                }, '& .MuiDataGrid-cell': {
                                    color: 'black',
                                },
                            }}
                            hideFooterPagination
                            disableColumnFilter
                            disableColumnSelector
                            disableDensitySelector
                            disableColumnMenu
                            disableRowSelectionOnClick
                        />
                    </div>
                </div>) : (<div className='flex w-full h-[20rem] items-center justify-center'>
                    Select parameters
                </div>)}
            </div>
        </ThemeProvider>
    );
};

export default Dashboard;
