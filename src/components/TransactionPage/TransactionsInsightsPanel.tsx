import '../../css/TransactionPage/TransactionsInsightsPanel.css'

import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, LabelList } from 'recharts';

interface TransactionsInsightsPanelInterface
{
  expenses:number,
  income:number
}

function TransactionsInsightsPanel({expenses,income}:TransactionsInsightsPanelInterface) {
    const data=[
      {
        expenses:-expenses,
        income:income
      }
    ]
    return (
      <div className="transactions-insights-panel">
        <div className='transactions-insights-panel-title'>
            Analysis:
        </div>
        <div className='transactions-insights-panel-chart'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={data} layout="vertical" margin={{top: 20, right: 100,left: 0, bottom: 15}}  barGap={0}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" hide/>
            <Bar dataKey="expenses" barSize={30} fill="#A30D0D" >
            {data.map(() => (
            <Cell
              style={{
                filter: `drop-shadow(3px 7px 3px #404040)`
              }}
            />
            ))}
            <LabelList position="right" dataKey="expenses" style={{textShadow:'none', fill:'#545454', fontFamily:'Gotham Medium', fontSize:'15'}}/>
            </Bar>
            <Bar dataKey="income" barSize={30} fill="#20F7C5" >
            {data.map((x) => (
            <Cell
            style={{
              filter: `drop-shadow(3px 7px 3px #404040)`
            }}
          />
            ))}
            <LabelList position="right" dataKey="income" style={{textShadow:'none', fill:'#545454',fontFamily:'Gotham Medium', fontSize:'15'}}/>
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        </div>
      </div>
    );
  }
  
  export default TransactionsInsightsPanel;