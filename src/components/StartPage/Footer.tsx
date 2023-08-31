import '../../css/StartPage/Footer.css'


function Footer() {
    return (
      <div className="footer">
        <div className="footer-title">
          Splitted
        </div>
        <div className="footer-navigation">
          <div className="footer-column">
            <div className="footer-column-title">
              SPLITTED
            </div>
            <div className="footer-subpages">
              Log In <br></br>
              FAQs <br></br>
            </div>
          </div>
          <div className="footer-column">
            <div className="footer-column-title"> 
              LEARN MORE
            </div>
            <div className="footer-subpages"> 
              Family mode <br></br>
              Partner mode <br></br>
              Party mode <br></br>
              Split it <br></br>
              Categorisation <br></br>
            </div>
          </div>
          <div className="footer-column">
            <div className="footer-column-title"> 
              ABOUT
            </div>
            <div className="footer-subpages"> 
              Project <br></br>
              Creators <br></br>
              Contact us <br></br>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Footer;