
function About(props)
{
    return (
        <>
            {
                props.message && (
                    <div className="user-details">
                        <div className='user-details-item'>Nume: {props.message.user.fname}</div>
                        <div className='user-details-item'>Prenume: {props.message.user.lnmae}</div>
                        <div className='user-details-item'>Numar de telefon: {props.message.user.phoneNumber} </div>
                        {props.message.user.role === "Doctor" && (
                            <>
                                <div className='user-details-item'>Functia ocupata: {props.message.user.function}</div>
                                <div className='user-details-item'>Cabinet: {props.message.user.cabinet} </div>
                            </>
                        )}
                        <div className='user-details-item'>Rol: {props.message.user.role}</div>
                        <div className='user-details-item'>Despre: {props.message.user.details}</div>
                    </div>
                )
            }
        </>
    );
}
export default About;