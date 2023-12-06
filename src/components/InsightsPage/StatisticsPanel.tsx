import '../../css/InsightsPage/StatisticsPanel.css';

import LoadingPanel from '../Common/LoadingPanel';

import useFetchStatistics from '../../hooks/useFetchStatistics';
import useFetchCurrency from '../../hooks/useFetchCurrency';

import { amountFormatter } from '../../utils';



interface StatisticsPanelInterface
{
    category:string;
    dateRange:any;
}

function StatisticsPanel({category, dateRange}:StatisticsPanelInterface) {

    const statistics = useFetchStatistics(dateRange, category)
    const currency = useFetchCurrency();

    return (
      <>
      {statistics.loading && <LoadingPanel error={statistics.error}/>}
      {!statistics.loading &&
      <div className="statistics-panel">
        <div className='statistics-panel-title'>
            Statistics
        </div>
        <div className='statistics-panel-category'>
            Category:{category?category:'All'}
        </div>
        <div className='statistics-panel-main-content'>
            <div className='statistics-element'>
                <div className='max-value'>
                    Max value:
                </div>
                <div className='statistics-element-amount'>
                    {amountFormatter(statistics.data.maxValue)} {currency}
                </div>
            </div>
            <div className='statistics-element'>
                <div className='q3'>
                    Q3:
                </div>
                <div className='statistics-element-amount'>
                    {amountFormatter(statistics.data.q3)} {currency}
                </div>
            </div>
            <div className='statistics-element'>
                <div className='mean-value'>
                    Mean:
                </div>
                <div className='statistics-element-amount'>
                    {amountFormatter(statistics.data.mean)} {currency}
                </div>
            </div>
            <div className='statistics-element'>
                <div className='q1'>
                    Q1:
                </div>
                <div className='statistics-element-amount'>
                    {amountFormatter(statistics.data.q1)} {currency}
                </div>
            </div>
            <div className='statistics-element'>
                <div className='min-value'>
                    Min value:
                </div>
                <div className='statistics-element-amount'>
                    {amountFormatter(statistics.data.minValue)} {currency}
                </div>
            </div>
        </div>
      </div>
      }
      </>
    );
  }
  
  export default StatisticsPanel;