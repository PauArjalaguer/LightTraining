const Ball = (props) => {


    const ballPress = () => {
        props.checkNumber(props.id);

    }
    return (<div onClick={ballPress} key={props.id} className='w-1/3 text-center flex items-center justify-center  '>
        <div id={"ball_" + props.id} className='cursor-pointer w-[40vh] h-[40vh] rounded-full bg-slate-100 flex items-center justify-center text-4xl font-bold border-2 shadow-xl border-slate-400'

        >{props.id}</div>
    </div>
    )
}
export default Ball;