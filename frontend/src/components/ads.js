import "./ad.css"
export const  Ads=({ads})=>{
    const {primaryText,headline,description,CTA,ImageUrl}=ads
    
    return(
        <div className="ad">
            <img className="image" src={ImageUrl} alt={primaryText}></img>
           <div className="details">
            <h2>{primaryText}</h2>
            <h3>{headline}</h3>
            <p>{description}</p>
            <button>{CTA}</button>
           </div>
        </div>
    )
}