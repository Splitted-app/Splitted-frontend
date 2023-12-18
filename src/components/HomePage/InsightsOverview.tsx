import '../../css/HomePage/InsightsOverview.css'

import {useCallback, useState } from 'react';

import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, LabelList, PieChart, Pie, Legend, Sector} from 'recharts';
import StatisticsPanelInsightsOverview from './StatisticsPanelInsightsOverview';
import useFetchIncomesExpenses from '../../hooks/useFetchIncomeExpenses';
import useFetchExpensesBreakdown from '../../hooks/useFetchExpensesBreakdown';

interface InsightsOverviewInterface
{
  dateRange:any
}

function InsightsOverview({dateRange}:InsightsOverviewInterface) {
  const incomeExpenses= useFetchIncomesExpenses(dateRange)
  const pieChartData= useFetchExpensesBreakdown(dateRange);

const COLORS = ['#FF5EA4 ', '#FF7300', '#FFBF00', '#54498B ','#A30D0D' ];

const renderActiveShape = (props:any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, category } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 20) * cos;
    const my = cy + (outerRadius + 15) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={6} textAnchor="middle" fill={fill}>
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
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#404040" fontFamily='Gotham Medium' fontSize='10px'>{` ${category}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#404040"  fontFamily='Gotham Medium' fontSize='10px'>
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
      <div className="insights-overview" data-testid="home-page-insights-overview">
        <div className='panel-title' data-testid="home-page-insights-overview-title">
            Insights
        </div>
        <div className='insights-overview-content'>
          <div className='insights-overview-statistics-panel'>
            <StatisticsPanelInsightsOverview dateRange={dateRange}/>
          </div>
          <div className='insights-overview-category-expenses-distribution'>
            <ResponsiveContainer  width="100%" height="65%" >
              <PieChart margin={{top:5}}>
                {/* <Legend layout="vertical" verticalAlign="top" align="left"  payload={pie_chart_data.map((item, index) => ({id: item.category,type: "circle",value: `${item.category}`,color: COLORS[index % COLORS.length]}))} wrapperStyle={{fontFamily: 'Gotham Medium' ,fontSize:'10px', lineHeight:'20px'}}/> */}
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={pieChartData.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={55}
                    fill="#8884d8"
                    dataKey="amount"
                    onMouseEnter={onPieEnter}
                    stroke="none"
                    >                  
                  {pieChartData.data.map((entry :any, index:number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className='insights-overview-income-expenses'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart  data={incomeExpenses.data} layout="vertical" margin={{right: 100,left: 0, bottom: 0}}  barGap={0}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" hide/>
                <Bar dataKey="expenses" barSize={30} fill="#A30D0D" >
                    {incomeExpenses.data.map((_:any, index:number) => (
                      <Cell key={index}
                        style={{
                        filter: `drop-shadow(5px 7px 3px #10032B)`
                        }}
                      />
                      ))}
                  <LabelList position="right" dataKey="expenses" style={{textShadow:'none', fill:'#404040', fontFamily:'Gotham Medium', fontSize:'15'}}/>
                </Bar>
                <Bar dataKey="income" barSize={30} fill="#20F7C5" >
                  {incomeExpenses.data.map((_:any, index:number) => (
                    <Cell key={index}
                      style={{
                      filter: `drop-shadow(5px 7px 3px #10032B)`
                      }}
                    />
                    ))}
                  <LabelList position="right" dataKey="income" style={{textShadow:'none', fill:'#404040',fontFamily:'Gotham Medium', fontSize:'15'}}/>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
  
  export default InsightsOverview;