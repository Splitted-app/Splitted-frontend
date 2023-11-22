import '../../css/InsightsPage/StatisticsPanel.css';





function StatisticsPanel() {
    return (
      <div className="statistics-panel">
        <div className='statistics-panel-title'>
            Statistics
        </div>
        <div className='statistics-panel-category'>
            Category:All
        </div>
        <div className='statistics-panel-main-content'>
            <div className='max-value statistics-element-name'>
                Max value:
                <div className='statistics-element-amount'>
                    3250 PLN
                </div>
            </div>
            <div className='q3 statistics-element-name'>
                Q3:
                <div className='statistics-element-amount'>
                    550 PLN
                </div>
            </div>
            <div className='mean-value statistics-element-name'>
                Mean:
                <div className='statistics-element-amount'>
                    140 PLN
                </div>
            </div>
            <div className='q1 statistics-element-name'>
                Q1:
                <div className='statistics-element-amount'>
                    30 PLN
                </div>
            </div>
            <div className='min-value statistics-element-name'>
                Min value:
                <div className='statistics-element-amount'>
                    0.99 PLN
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default StatisticsPanel;