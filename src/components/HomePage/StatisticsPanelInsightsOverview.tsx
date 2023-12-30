import '../../css/HomePage/StatisticsPanelInsightsOverview.css';

import useFetchMyBudget from '../../hooks/useFetchMyBudget';
import useFetchStatistics from '../../hooks/useFetchStatistics';

import { amountFormatter } from '../../utils';

interface StatisticsOverviewInterface
{
  dateRange:any
}

function StatisticsPanelInsightsOverview({dateRange}: StatisticsOverviewInterface) {

    const statistics = useFetchStatistics(dateRange, "")
    const myBudget = useFetchMyBudget();

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
                    {amountFormatter(statistics.data.maxValue)} {myBudget.data.currency}
                </div>
            </div>
            <div className='statistics-element'>
                <div className='mean-value'>
                    Mean:
                </div>
                <div className='statistics-element-amount'>
                    {amountFormatter(statistics.data.mean)} {myBudget.data.currency}
                </div>
            </div>
            <div className='statistics-element'>
                <div className='min-value'>
                    Min value:
                </div>
                <div className='statistics-element-amount'>
                    {amountFormatter(statistics.data.minValue)} {myBudget.data.currency}
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default StatisticsPanelInsightsOverview;