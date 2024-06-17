import { useEffect } from "react";
import { Link } from "react-router-dom";
import '../../static/css/pages/Services.css'

function Services () 
{
    return(
        
        <div class="container">
        <h1>Servicii Medicale</h1>
        
        <div class="service">
            <h2>Consultație Stomatologică</h2>
            <p>Consultația stomatologică inițială include evaluarea stării de sănătate a dinților și gingiilor, planul de tratament și recomandări pentru îngrijirea orală.</p>
            <p class="price">Preț: 150 RON</p>
        </div>
        
        <div class="service">
            <h2>Detartraj și Periaj Profesional</h2>
            <p>Detartrajul și periajul profesional ajută la îndepărtarea plăcii bacteriene și a tartrului de pe dinți, prevenind afecțiunile gingivale.</p>
            <p class="price">Preț: 200 RON</p>
        </div>
        
        <div class="service">
            <h2>Plombă Fotopolimerizabilă</h2>
            <p>Tratarea cariilor cu plombă fotopolimerizabilă, care se întărește rapid sub acțiunea luminii UV, oferind o durabilitate sporită.</p>
            <p class="price">Preț: 250 RON</p>
        </div>
        
        <div class="service">
            <h2>Albire Dentară</h2>
            <p>Albirea dentară profesională ajută la obținerea unui zâmbet mai alb și strălucitor printr-o procedură sigură și eficientă.</p>
            <p class="price">Preț: 500 RON</p>
        </div>
        
        <div class="service">
            <h2>Extracție Dentară</h2>
            <p>Procedura de extracție a dinților afectati sau greu de reparat, efectuată cu atenție pentru a minimiza disconfortul pacientului.</p>
            <p class="price">Preț: 300 RON</p>
        </div>
        
    </div>
    )
}

export default Services;