import { useLocation } from "react-router-dom";

function NoMatch() {
    let location = useLocation();
    return (<center>
        <h2 className="page-not-found" style={{marginTop: '5rem'}}>{`404 Page Not Found for ${location.pathname}`}</h2>
    </center>)
}
export default NoMatch;