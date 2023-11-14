
type ListParams = {
    description: string;
  }
  
  function Listing(prop:ListParams){
    return(
        <p>{prop.description}</p>
      
    )
  }

  export default Listing;