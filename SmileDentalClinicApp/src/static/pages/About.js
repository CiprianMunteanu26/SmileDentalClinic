import '../css/pages/About.css'

function About()
{
    return (
        <div className="container-about">
    <div className="container-message">
        <p>Smile Dental Clinic ofera o gama completa de tratamente stomatologice moderne, de la implanturi pâna la albire ?i ortodon?ie. Cu o echipa de medici experimenta?i ?i tehnologie de ultima genera?ie, clinica se dedica asigurarii unor zâmbete sanatoase ?i frumoase pentru fiecare pacient!</p>
    </div>

    <div className="container-schedule">  
        <h2>Orar Clinica</h2>
        <table>
            <thead>
                <tr>
                    <th>Zi</th>
                    <th>Ore</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Luni - Vineri</td>
                    <td>09:00 - 17:00</td>
                </tr>
                <tr>
                    <td>Sâmbata</td>
                    <td>Închis</td>
                </tr>
                <tr>
                    <td>Duminica</td>
                    <td>Închis</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
    )
}
export default About;

