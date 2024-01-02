import '../../css/InsightsPage/StatisticsPanel.css';

import LoadingPanel from '../Common/LoadingPanel';

import useFetchStatistics from '../../hooks/useFetchStatistics';

import { amountFormatter } from '../../utils';
import useFetchMyBudget from '../../hooks/useFetchMyBudget';



interface StatisticsPanelInterface
{
    category:string;
    dateRange:any;
}

function StatisticsPanel({category, dateRange}:StatisticsPanelInterface) {

    const statistics = useFetchStatistics(dateRange, category)
    const myBudget = useFetchMyBudget();

    return (
      <>
      {statistics.loading && <LoadingPanel error={statistics.error} color={"white"}/>}
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
                <div className='max-value' data-testid="statistics-panel-max-value">
                    Max value:
                </div>
                <div className='statistics-element-amount' data-testid="statistics-panel-max-value-amount">
                    {amountFormatter(statistics.data.maxValue)} {myBudget.data.currency}
                </div>
            </div>
            <div className='statistics-element'>
                <div className='q3' data-testid="statistics-panel-q3">
                    Q3:
                </div>
                <div className='statistics-element-amount' data-testid="statistics-panel-q3-amount">
                    {amountFormatter(statistics.data.q3)} {myBudget.data.currency}
                </div>
            </div>
            <div className='statistics-element'>
                <div className='mean-value' data-testid="statistics-panel-mean-value">
                    Mean:
                </div>
                <div className='statistics-element-amount' data-testid="statistics-panel-mean-value-amount">
                    {amountFormatter(statistics.data.mean)} {myBudget.data.currency}
                </div>
            </div>
            <div className='statistics-element'>
                <div className='q1' data-testid="statistics-panel-q1">
                    Q1:
                </div>
                <div className='statistics-element-amount' data-testid="statistics-panel-q1-amount">
                    {amountFormatter(statistics.data.q1)} {myBudget.data.currency}
                </div>
            </div>
            <div className='statistics-element'>
                <div className='min-value' data-testid="statistics-panel-min-value">
                    Min value:
                </div>
                <div className='statistics-element-amount' data-testid="statistics-panel-min-value-amount">
                    {amountFormatter(statistics.data.minValue)} {myBudget.data.currency}
                </div>
            </div>
        </div>
      </div>
      }
      </>
    );
  }
  
  export default StatisticsPanel;