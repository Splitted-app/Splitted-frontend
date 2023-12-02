import '../../css/InsightsPage/InsightsPage.css'

import { useEffect,  useCallback, useState } from 'react';

import Moment from 'moment';
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

import DownArrowIcon from '../../assets/images/filter_downarrow.svg';


function InsightsPage() {

    useEffect(()=>{
        setMenuIconVisibility(false);
    },[])
      
    const setMenuIconVisibility = useSetRecoilState(MenuIconVisibilityState);
    const [filterMenuVisibility, setFilterMenuVisibility] = useState(false);

    const gridStyle = {
        gridTemplateRows: filterMenuVisibility
        ? '33% 15% auto':
        '33% 15% auto'

    }
    const [filterData, setFilterData] = useState<any>({
        startDate: new Date(new Date().setMonth(new Date().getMonth()-6)),
        endDate: new Date(),
        category: "",
        deltaTime:"Day",
        binRange:50
    })
    const [dateRange, setDateRange] = useState<any>([{
        startDate: new Date(new Date().setMonth(new Date().getMonth()-6)),
        endDate: new Date(),
        key: 'selection'
      }]);
    const [category, setCategory] = useState<string>("");

    const [deltaTime,setDeltaTime] = useState<string>("Day");

    const [binRange,SetBinRange] = useState<number>(50);

    function handleFilterButton()
    {
        setDateRange([{
            startDate: filterData.startDate,
            endDate: filterData.endDate,
            key: 'selection'
          }]);
        setCategory(filterData.category);
        setDeltaTime(filterData.deltaTime);
        SetBinRange(filterData.binRange);
        setFilterMenuVisibility(false);
    }


    const incomeExpenses = useFetchIncomeExpenses(dateRange,category);

    const balanceHistory = useFetchBalanceHistory(dateRange,deltaTime);

    const expensesBreakdown = useFetchExpensesBreakdown(dateRange);

    const incomeExpensesOverTime = useFetchIncomeExpensesOverTime(dateRange,category,deltaTime);

    const expensesHistogram = useFetchExpensesHistogram(dateRange,category,binRange);

    const COLORS = ['#FF5EA4' , '#FF7300' , '#54498B' , '#ECB81B' , '#7E0101' , '#20F7C5' , '#FF006F' , '#C9C6F8' , '#8E775B' , '#A30D0D',
                    '#FF8623' , '#00B78D' , '#FF7FAA' , '#FCC625' , '#71339B' , '#679E8F' , '#6B1717' , '#FFE9A5' , '#9F5971' , '#0F684F'];



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
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="white" fontFamily='Gotham Medium' fontSize='15px'>{` ${category?category:'none'}`}</text>
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
        <div className='insights-page-content'  style={gridStyle}>
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
                        Insights
                </div>
            </div>
            <div className='insights-page-show-filter-menu'>
                Show filter menu
                <div className='insights-page-show-filter-menu-icon' onClick={()=>{setFilterMenuVisibility(!filterMenuVisibility)}}>
                    <img src={DownArrowIcon}></img>
                </div>
            </div>
            {filterMenuVisibility && 
            <div className='insights-page-filter-menu'>
                <div className='insights-page-date-filter-menu insights-page-filter-menu-element' style={{gridTemplateColumns:'20% 40% 40%'}}>
                    Dates:
                    <div className='insights-page-start-date-filter-menu'>
                        <label>From</label>
                        <input type="date"
                            value={Moment(filterData.startDate).format('yyyy-MM-DD')}
                            onChange={(e)=>setFilterData({...filterData, startDate: e.target.value})}
                        />
                    </div>
                    <div className='insights-page-end-date-filter-menu'>
                        <label>To</label>
                        <input type="date"
                            value={Moment(filterData.endDate).format('yyyy-MM-DD')}
                            onChange={(e)=>setFilterData({...filterData, endDate: e.target.value})}
                        />
                    </div>          
                </div>
                <div className='insights-page-category-filter-menu insights-page-filter-menu-element' style={{gridTemplateColumns:'20% auto'}}>
                    Categories:
                    <input type="text" style={{marginLeft:'0'}} value={filterData.category}
                            onChange={(e)=>setFilterData({...filterData, category: e.target.value})}></input>
                </div>
                <div className='insights-page-delta-time-filter-menu insights-page-filter-menu-element' style={{gridTemplateColumns:'20% auto'}}>
                    Delta Time:
                    <select style={{marginLeft:'0'}} value={filterData.deltaTime} onChange={(e)=>setFilterData({...filterData, deltaTime: e.target.value})}>
                        <option value="Day" style={{color:'black'}}>Day</option>
                        <option value="Month" style={{color:'black'}}>Month</option>
                    </select>
                </div> 
                <div className='insights-page-bin-range-filter-menu insights-page-filter-menu-element' style={{gridTemplateColumns:'20% auto'}}>
                    Bin Range:
                    <input type="number" style={{marginLeft:'0'}} value={filterData.binRange}
                            onChange={(e)=>setFilterData({...filterData, binRange: e.target.value})}></input>
                </div>                                      
                <div className='insights-page-filter-menu-button-container'>
                    <button className='insights-page-filter-menu-button' onClick={handleFilterButton}>
                        Filter
                    </button>
                </div>
            </div>}
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
                            {{} && <Legend 
                                layout="vertical" 
                                verticalAlign="top" 
                                align="left" 
                                overflow='visible' 
                                payload={
                                    expensesBreakdown.data.map((item: any, index: number) => 
                                        ({
                                            id: item.category, 
                                            type: "circle",
                                            value: `${item.category?item.category:'none'}`,
                                            color: COLORS[index % COLORS.length]}))} 
                                            wrapperStyle={{fontFamily: 'Gotham Medium' ,fontSize:'15px', lineHeight:'23px'}}/>}
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
                    <StatisticsPanel category={category}/>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default InsightsPage;