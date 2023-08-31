import '../../css/StartPage/FeaturePanel.css'

interface FeaturePanelProps
{
  title: string;
  align: any;
}


function FeaturePanel({title, align} : FeaturePanelProps ) {

    return (
      <div className="feature-panel" style={{textAlign: align}}>
        <div className="feature-text">
          <div className="feature-title">
            {title}
          </div>
          <div className="feature-description" style={{marginLeft: align==='right' ? 'auto' : '0'}}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas varius nunc at pharetra. 
              Aliquam eros augue, gravida a leo quis, sagittis rhoncus risus. Praesent eros orci, pretium convallis auctor nec, 
              ultricies eget nulla. Nulla maximus accumsan urna nec tincidunt. Suspendisse potenti. Duis varius, enim sit amet finibus 
              scelerisque, libero odio tempor lorem, sed egestas dolor nisi vel ligula.
            </p>
          </div>
        </div>
        <div className="feature-image">

        </div>
      </div>
    );
  }
  
  export default FeaturePanel;