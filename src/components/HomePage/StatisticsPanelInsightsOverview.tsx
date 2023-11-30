import '../../css/HomePage/StatisticsPanelInsightsOverview.css';





function StatisticsPanelInsightsOverview() {
    return (
      <div className="statistics-panel-insights-overview">
        <div className='statistics-panel-header'>
            <div className='statistics-panel-title'>
                Statistics
            </div>
            <div className='statistics-panel-category'>
                Category:All
            </div>
        </div>
        <div className='statistics-panel-main-content'>
            <div className='statistics-element'>
                <div className='max-value'>
                    Max value:
                </div>
                <div className='statistics-element-amount'>
                    3250 PLN
                </div>
            </div>
            <div className='statistics-element'>
                <div className='mean-value'>
                    Mean:
                </div>
                <div className='statistics-element-amount'>
                    140 PLN
                </div>
            </div>
            <div className='statistics-element'>
                <div className='min-value'>
                    Min value:
                </div>
                <div className='statistics-element-amount'>
                    0.99 PLN
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default StatisticsPanelInsightsOverview;