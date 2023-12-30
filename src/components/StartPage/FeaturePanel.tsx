import '../../css/StartPage/FeaturePanel.css'
import { useMediaQuery } from 'react-responsive'

interface FeaturePanelProps
{
  title: string;
  align: any;
  icon:string;
}


function FeaturePanel({title, align, icon} : FeaturePanelProps ) {

  const forceImageFirst = useMediaQuery({ query: '(max-width: 700px)' })
  const imageSecond = (align !== 'right' && !forceImageFirst) ? true : false;
  const imageFirst = (align === 'right' || forceImageFirst) ? true : false;
  let description:string;
  switch(title)
  {
    case 'Family mode':
      {
        description = "Family mode is directed towards couples with a common bank account. When two users with two seperate app accounts integrate their accounts in family mode their seperate budgets will transform into one, common budget. Now both users have access to the same budget and either of them can add transactions to it. With this mode, being a family has never been easier. ";
        break;
      }
    case 'Partner mode':
      {
        description = "Partner mode is directed towards couples with two separate bank accounts that have both common and seperate expenses. By integrating two budgets in partner mode, users keep their seperate accounts, but gain access to additional functionalities that help settling common expenses. With this mode, being in a couple has never been easier. ";
        break;
      }
    case 'Party mode':
      {
        description = "Party mode allows creating temporary budgets when meeting with a group of friends. Its main goal is to help settling common expenses in a larger group of people. With this mode, having fun with friends has never been easier. ";
        break;
      }
    case 'Split it':
      {
        description = "Split it is an additional functionality, available to users in partner and party mode. It appears as an icon next to users' transactions. By clicking it, the user chooses that transaction to be splitted between users of the selected mode. With this functionality, settling your bills has never been easier.";
        break;
      }
      default:
        {
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas varius nunc at pharetra. Aliquam eros augue, gravida a leo quis, sagittis rhoncus risus. Praesent eros orci, pretium convallis auctor nec, ultricies eget nulla. Nulla maximus accumsan urna nec tincidunt. Suspendisse potenti. Duis varius, enim sit amet finibus scelerisque, libero odio tempor lorem, sed egestas dolor nisi vel ligula.";
          break;
        }
  }

    return (
      <div className="feature-panel" style={{textAlign: align}}>
          {
            imageFirst &&         
            <div className="feature-image" style={{marginLeft: align==='right' ? 'auto' : '0'}}>
              <img src={icon}></img>
            </div>
          }
          <div className="feature-text">
            <div className="feature-title">
              {title}
              <div className="feature-description" style={{marginLeft: align==='right' ? 'auto' : '0'}}>
                <p>
                  {description}
                </p>
              </div>
            </div>
          </div>
          {
            imageSecond &&         
            <div className="feature-image" style={{marginLeft: align==='right' ? 'auto' : '0'}}>
              <img src={icon}></img>
            </div>
          }
      </div>
    );
  }
  
  export default FeaturePanel;