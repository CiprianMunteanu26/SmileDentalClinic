
import { useState } from 'react';
import '../../static/css/components/Searchbar.css'
function SearchBar(props)
{
    const [data, setData] = useState("");

    const handleSend = () =>
    {
        props.updateData(data);
    }

    const handleClick = (e) =>
    {
        props.handleGetSearchedStud(e);
    }


    return (
        <>
            <div className="search-users input-group rounded">
                <input type="search" className="form-control rounded" placeholder="Cauta dupa nume sau Email" aria-label="Search" aria-describedby="search-addon"
                    value={data} onChange={(e) => { setData(e.target.value); handleClick(e.target.value); }}
                    required onInvalid={(e) => e.target.setCustomValidity('Introduceți o adresă de email validă')}
                    onInput={(e) => e.target.setCustomValidity('')} />
            </div>
        </>
    );
}

export default SearchBar;
