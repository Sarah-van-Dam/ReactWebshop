import React from 'react';
import styled from 'styled-components';

export const FullRowStyle = styled.div`
.row-full{
    width: 100vw;
    position: relative;
    margin-left: -50vw;
    height: 120px;
    margin-top: 100px;
    left: 50%;
   }
`;


export const Footer = () => {
 return (
     <FullRowStyle>
        <footer className="bg-light text-center text-black" >
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