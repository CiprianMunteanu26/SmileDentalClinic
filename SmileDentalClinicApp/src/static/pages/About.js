import '../css/pages/About.css'

function About()
{
    return (
        <div className="container-about">
    <div className="container-message">
        <p>Smile Dental Clinic oferă o gamă completă de tratamente stomatologice moderne, de la implanturi până la albire și ortodonție. Cu o echipă de medici experimentați și tehnologie de ultimă generație, clinica se dedică asigurării unor zâmbete sănătoase și frumoase pentru fiecare pacient!</p>
    </div>

    <div className="container-schedule">  
        <h2>Orar Clinică</h2>
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
                    <td>Sâmbătă</td>
                    <td>Închis</td>
                </tr>
                <tr>
                    <td>Duminică</td>
                    <td>Închis</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
    )
}
export default About;

