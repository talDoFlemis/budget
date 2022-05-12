import loading from '../../img/bars.svg'

function Loading() {
    return (
        <div className='container flex justify-center items-center mx-auto '>
            <img src={loading} alt="" className='h-52 w-52' />
        </div>
    )
}

export default Loading
