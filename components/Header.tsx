type HeaderParams = {
    text?: string;
    textSub?: string;
  }
  
  function Header({text,textSub}:HeaderParams){
    return(
        <>
      <h1>{text}</h1>
      <h5>{textSub}</h5>
      </>
    )
  }

  export default Header;