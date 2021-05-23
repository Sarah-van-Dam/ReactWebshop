import React from 'react';

export const Footer = () => {
 return (
  <footer className="text-muted py-5">
    <div className="container">
            <section className="text-center">
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
 );
};