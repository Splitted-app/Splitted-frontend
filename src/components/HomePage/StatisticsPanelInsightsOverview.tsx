import '../../css/HomePage/StatisticsPanelInsightsOverview.css';

import useFetchCurrency from '../../hooks/useFetchCurrency';
import useFetchStatistics from '../../hooks/useFetchStatistics';

import { amountFormatter } from '../../utils';

interface StatisticsOverviewInterface
{
  dateRange:any
}

function StatisticsPanelInsightsOverview({dateRange}: StatisticsOverviewInterface) {

    const statistics = useFetchStatistics(dateRange, "")
    const currency = useFetchCurrency();

    return (
      <div className="statistics-panel-insights-overview">
        <div className='statistics-panel-header'>
            <div className='statistics-panel-title'>
                Statistics
            </div>
            <div className='statistics-panel-category'>
                Category: All
            </div>
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
                <div className='mean-value'>
                    Mean:
                </div>
                <div className='statistics-element-amount'>
                    {amountFormatter(statistics.data.mean)} {currency}
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
    );
  }
  
  export default StatisticsPanelInsightsOverview;