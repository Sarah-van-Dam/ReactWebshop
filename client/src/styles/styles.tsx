import styled from "styled-components";

export const CarouselStyle = styled.div `
.carousel-container {
   width: 100%;
   display: flex;
   flex-direction: column;
}

.carousel-wrapper {
   display: flex;
   width: 100%;
   position: relative;
}

.carousel-content-wrapper {
   overflow: hidden;
   width: 100%;
   height: 100%;
}

.carousel-content {
   display: flex;
   transition: all 250ms linear;
   -ms-overflow-style: none;  /* hide scrollbar in IE and Edge */
   scrollbar-width: none;  /* hide scrollbar in Firefox */
}

/* hide scrollbar in webkit browser */
.carousel-content::-webkit-scrollbar, .carousel-content::-webkit-scrollbar {
   display: none;
}

.carousel-content > * {
   width: 100%;
   flex-shrink: 0;
   flex-grow: 1;
}

.left-arrow, .right-arrow {
   position: absolute;
   z-index: 1;
   top: 50%;
   transform: translateY(-50%);
   width: 48px;
   height: 48px;
   border-radius: 24px;
   background-color: white;
   border: 1px solid #ddd;
}

.left-arrow {
   left: 24px;
}

.right-arrow {
   right: 24px;
}
`;


export const HeaderStyle = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: black;
    &:hover { color: grey; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;


export const FormStyle = styled.div`
@media all and (min-width: 480px) {
    .Login {
      padding: 60px 0;
    }
  
    .Login form {
      margin: 0 auto;
      max-width: 420px;
    }
  }
`;

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