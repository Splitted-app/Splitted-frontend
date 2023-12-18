import '../../css/TransactionPage/TransactionsInsightsPanel.css'

import { useMediaQuery } from 'react-responsive'
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

    const useMediumFontSize = useMediaQuery({ query: '(max-width: 1150px)' })
    const useSmallFontSize = useMediaQuery({ query: '(max-width: 1050px)' })
    const fontSize = useSmallFontSize ? "10px" : useMediumFontSize ? "12px" : "15px"

    return (
      <div className="transactions-insights-panel">
        <div className='transactions-insights-panel-title' data-testid="transactions-insights-panel-title">
            Analysis:
        </div>
        <div className='transactions-insights-panel-chart' data-testid="transactions-insights-panel-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={data} layout="vertical" margin={{top: 20, right: 100,left: 0, bottom: 15}}  barGap={0}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" hide/>
            <Bar dataKey="expenses" barSize={30} fill="#A30D0D" >
            {data.map((_, index) => (
            <Cell key={index}
              style={{
                filter: `drop-shadow(3px 7px 3px #404040)`
              }}
            />
            ))}
            <LabelList position="right" dataKey="expenses" style={{textShadow:'none', fill:'#545454', fontFamily:'Gotham Medium', fontSize: fontSize}}/>
            </Bar>
            <Bar dataKey="income" barSize={30} fill="#20F7C5" >
            {data.map((_, index) => (
            <Cell key={index}
            style={{
              filter: `drop-shadow(3px 7px 3px #404040)`
            }}
          />
            ))}
            <LabelList position="right" dataKey="income" style={{textShadow:'none', fill:'#545454',fontFamily:'Gotham Medium', fontSize: fontSize}}/>
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        </div>
      </div>
    );
  }
  
  export default TransactionsInsightsPanel;