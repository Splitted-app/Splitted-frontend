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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas varius nunc at pharetra. 
                  Aliquam eros augue, gravida a leo quis, sagittis rhoncus risus. Praesent eros orci, pretium convallis auctor nec, 
                  ultricies eget nulla. Nulla maximus accumsan urna nec tincidunt. Suspendisse potenti. Duis varius, enim sit amet finibus 
                  scelerisque, libero odio tempor lorem, sed egestas dolor nisi vel ligula.
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