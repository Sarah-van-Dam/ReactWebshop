import { FullRowStyle } from '../../styles/styles';

export const Footer = () => {
 return (
     <FullRowStyle>
        <footer className="bg-light text-center text-black" style={{position:"sticky", bottom:"0"}} >
            <div className="footer" style={{marginBlockStart:"50px", paddingTop:"30px"}}>
                    <section className="text-center" style={{paddingBottom:"10px"}}>
                        <p>
                            Pibu care sells Korean skincare to all men and women, who wants to take extra good care of their skin. 
                            The company name stems from the Korean word for skin, Pibu.
                        </p>
                    </section>
                    <div className="text-center p-3 backgroundcolor-grey" style={{backgroundColor: 'grey', color : 'black' }}>
                        © 2021 Copyright: Pibu Care
                    </div>
            </div>
        </footer>
  </FullRowStyle>
 );
};