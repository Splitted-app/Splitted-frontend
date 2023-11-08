import '../../css/HomePage/Overview.css'
import InsightsOverview from './InsightsOverview';
import PredictionsOverview from './PredictionsOverview';
import TransactionsOverview from './TransactionsOverview';

interface OverviewInterface
{
    typeId : number
}

function Overview({typeId} : OverviewInterface) {
    return (
      <div className="overview">
        {typeId == 0 && <TransactionsOverview></TransactionsOverview>}
        {typeId == 1 && <InsightsOverview></InsightsOverview>}
        {typeId == 2 && <PredictionsOverview></PredictionsOverview>}
      </div>
    );
  }
  
  export default Overview;