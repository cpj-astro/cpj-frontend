const getBallStyle = (val) => {
    if(val == 0){
        return '#000000';
    }else if(val == 1){
        return '#4682B4';
    }else if(val == 2){
        return '#800020';
    }else if(val == 3){
        return '#cc5500';
    }else if(val == 4 || val == "4"){
        return '#66023C';
    }else if(val == 6){
        return '#4169E1';
    }else if(val == "WD"){
        return '#228B22';
    }else if(val == "NB" || val == "nb"){
        return '#FF5F1F';
    }
    else if(val == "W" || val == "w"){
        return '#FF0000';
    }
    
    return '#228B22';
}

const Ball = (props) => {

    return (
        <div style={{ backgroundColor: getBallStyle(props.val), height: '30px', width: '30px', borderRadius: '50%', justifyContent: 'center', marginHorizontal: '4px', borderColor:'#FFFFFF', borderWidth: '0.5px', display: 'flex', alignItems: 'center', marginRight: '5px'}}>
            <span style={{ color: '#FFFFFF', textAlign: 'center', fontSize: '11px', fontWeight:'600' }}>{props.val}</span>
        </div>
    );
}
export default Ball;