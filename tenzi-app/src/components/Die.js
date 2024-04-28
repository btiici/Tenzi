export default function Die (props){
    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : 'white'
    }
    return(
        <div >
            <p className="dice-face " style={styles} onClick={props.hold}>{props.value}</p>
        </div>
    )
}