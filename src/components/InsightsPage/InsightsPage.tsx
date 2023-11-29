import '../../css/InsightsPage/InsightsPage.css'

import { useEffect,  useCallback, useState } from 'react';

import { useSetRecoilState } from 'recoil';

import Navbar from "../Common/Navbar"
import StatisticsPanel from './StatisticsPanel';


import { BarChart,LineChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, LabelList ,Line ,PieChart, Pie, Sector, Legend, ReferenceLine} from 'recharts';

import { MenuIconVisibilityState } from '../../atoms/MenuIconVisibility';

import useFetchIncomeExpenses from '../../hooks/useFetchIncomeExpenses';
import useFetchBalanceHistory from '../../hooks/useFetchBalanceHistory';
import useFetchExpensesBreakdown from '../../hooks/useFetchExpensesBreakdown';
import useFetchIncomeExpensesOverTime from '../../hooks/useFetchIncomeExpensesOverTime';
import useFetchExpensesHistogram from '../../hooks/useFetchExpensesHistogram';


function InsightsPage() {

    useEffect(()=>{
        setMenuIconVisibility(false);
    },[])
      
    const setMenuIconVisibility = useSetRecoilState(MenuIconVisibilityState);
    const incomeExpenses = useFetchIncomeExpenses()
    const balanceHistory = useFetchBalanceHistory()

    // const balanceHistory=[
    //     {
    //         balance:500,
    //         date:'01-01-2023'
    //     },
    //     {
    //         balance:1000,
    //         date:'14-03-2023'
    //     },
    //     {
    //         balance:2000,
    //         date:'26-05-2023'
    //     },
    //     {
    //         balance:100,
    //         date:'02-07-2023'
    //     },
    //     {
    //         balance:1500,
    //         date:'09-09-2023'
    //     }
    // ]

    const expensesBreakdown = useFetchExpensesBreakdown();
    // const expensesBreakdown=[
    //     {
    //         category: 'Groceries',
    //         amount: 700
    //     },
    //     {
    //         category: 'Shopping',
    //         amount: 500
    //     },
    //     {
    //         category: 'Transport',
    //         amount: 50
    //     },
    //     {
    //         category: 'Food & Drink',
    //         amount: 250
    //     },
    //     {
    //         category: 'Health',
    //         amount: 100
    //     }
    // ]
    const incomeExpensesOverTime = useFetchIncomeExpensesOverTime();
    // const incomeExpensesOverTime = [
    //     {
    //         date: '01-01-2023',
    //         income: 2000 ,
    //         expenses: -1000
    //     },
    //     {
    //         date: '14-03-2023',
    //         income: 5000 ,
    //         expenses: -2000
    //     },
    //     {
    //         date: '26-05-2023',
    //         income: 1000 ,
    //         expenses: -500
    //     },
    //     {
    //         date: '02-07-2023',
    //         income: 4000 ,
    //         expenses: -1500
    //     },
    //     {
    //         date: '09-09-2023',
    //         income: 5000 ,
    //         expenses: -3000
    //     },
    //     {
    //         date: '18-10-2023',
    //         income: 3000 ,
    //         expenses: -1000
    //     },
    //     {
    //         date: '30-11-2023',
    //         income: 4500 ,
    //         expenses: -1000
    //     },
    //   ];
      

    const expensesHistogram = useFetchExpensesHistogram();
    //   const expensesHistogram=[
    //     {
    //         amount:1000,
    //         date:'01-01-2023'
    //     },
    //     {
    //         amount:2000,
    //         date:'14-03-2023'
    //     },
    //     {
    //         amount:500,
    //         date:'26-05-2023'
    //     },
    //     {
    //         amount:1500,
    //         date:'02-07-2023'
    //     },
    //     {
    //         amount:3000,
    //         date:'09-09-2023'
    //     },
    //     {
    //         amount:1000,
    //         date:'18-10-2023'
    //     },
    //     {
    //         amount:1000,
    //         date:'30-11-2023'
    //     }
    // ]

    const COLORS = ['#FF5EA4 ', '#FF7300', '#FFBF00', '#54498B ','#A30D0D '];

    const renderActiveShape = (props:any) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, category } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';
      
        return (
          <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
              {payload.name}
            </text>
            <Sector
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={startAngle}
              endAngle={endAngle}
              fill={fill}
            />
            <Sector
              cx={cx}
              cy={cy}
              startAngle={startAngle}
              endAngle={endAngle}
              innerRadius={outerRadius + 6}
              outerRadius={outerRadius + 10}
              fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="white" fontFamily='Gotham Medium' fontSize='15px'>{` ${category}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="white"  fontFamily='Gotham Medium' fontSize='15px'>
              {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
          </g>
        );
      };
      const [activeIndex, setActiveIndex] = useState(0);
      const onPieEnter = useCallback(
        (_:any, index:any) => {
          setActiveIndex(index);
        },
        [setActiveIndex]
      );

    return (


      <div className="insights-page">
        <Navbar></Navbar>
        <div className='insights-page-content'>
            <div className='header'>
                <div className='income-expenses-chart'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={500} height={300} data={incomeExpenses.data} layout="vertical" margin={{top: 20, right: 100,left: 0, bottom: 15}}  barGap={0}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" hide/>
                        <Bar dataKey="expenses" barSize={40} fill="#A30D0D" >
                            {incomeExpenses.data.map((_: any, index: number) => (
                                <Cell key={index}
                                style={{
                                filter: `drop-shadow(5px 7px 3px #10032B)`
                                }}
                                />
                            ))}
                            <LabelList position="right" dataKey="expenses" style={{textShadow:'none', fill:'white', fontFamily:'Gotham Medium', fontSize:'15'}}/>
                        </Bar>
                        <Bar dataKey="income" barSize={40} fill="#20F7C5" >
                            {incomeExpenses.data.map((_: any, index: number) => (
                            <Cell key={index}
                            style={{
                            filter: `drop-shadow(5px 7px 3px #10032B)`
                            }}
                            />
                            ))}
                            <LabelList position="right" dataKey="income" style={{textShadow:'none', fill:'white',fontFamily:'Gotham Medium', fontSize:'15'}}/>
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                </div>         
                <div className='title'>
                    <div className='main-title'>
                        Insights
                    </div>
                </div>
            </div>
            <div className='insights-page-main-charts'>
                <div className='insights-page-main-charts-linear-balance-chart'>
                    <div className='line-chart-title'>
                        Balance
                    </div>
                    <ResponsiveContainer  width="100%" height="100%">
                            <LineChart width={500} height={200}  data={balanceHistory.data}>
                            <XAxis dataKey="date" stroke="white" fontFamily='Gotham Medium' fontSize='15px'/>
                            <YAxis stroke="white" fontFamily='Gotham Medium' fontSize='15px' />
                            <Line type="monotone" dataKey="balance" stroke="#D80088" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className='insights-page-main-charts-pie-chart'>
                    <div className='pie-chart-title'>
                        Expenses in Categories Distribution
                    </div>
                    <ResponsiveContainer  width="100%" height="100%" >
                        <PieChart width={400} height={400} >
                            <Legend 
                                layout="vertical" 
                                verticalAlign="top" 
                                align="left" 
                                overflow='visible' 
                                payload={
                                    expensesBreakdown.data.map((item: any, index: number) => 
                                        ({
                                            id: item.categor, 
                                            type: "circle",
                                            value: `${item.category}`,
                                            color: COLORS[index % COLORS.length]}))} 
                                            wrapperStyle={{fontFamily: 'Gotham Medium' ,fontSize:'15px', lineHeight:'23px'}}/>
                            <Pie
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                data={expensesBreakdown.data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="amount"
                                onMouseEnter={onPieEnter}
                                stroke="none"
                            >
                            {expensesBreakdown.data.map((_: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className='insights-page-main-charts-income-expenses'>
                    <div className='bar-chart-title'>
                        Income & Expenses
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={500} height={300} data={incomeExpensesOverTime.data} stackOffset="sign">
                        <XAxis dataKey="date" stroke="white" fontFamily='Gotham Medium' fontSize='15px'/>
                        <YAxis stroke="white" fontFamily='Gotham Medium' fontSize='15px'/>
                        <ReferenceLine y={0} stroke="white" />
                        <Bar dataKey="income" fill="#20F7C5" stackId="stack" />
                        <Bar dataKey="expenses" fill="#A30D0D" stackId="stack" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className='insights-page-main-charts-expenses-distribution'>
                    <div className='expenses-chart-title'>
                        Expenses Distribution
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={150} height={40} data={expensesHistogram.data}>
                            <XAxis dataKey="range" stroke="white" fontFamily='Gotham Medium' fontSize='15px'/>
                            <YAxis stroke="white" fontFamily='Gotham Medium' fontSize='15px'/>
                            <Bar dataKey="count" fill="#FF7300" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className='insights-page-main-charts-statistics-panel'>
                    <StatisticsPanel/>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default InsightsPage;