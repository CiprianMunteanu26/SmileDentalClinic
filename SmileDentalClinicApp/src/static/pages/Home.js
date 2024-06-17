import Hero from "../../components/big/Hero";
import React, { Component } from 'react';
import SearchViewDoctor from "../../components/big/SearchViewDoctor";
import InfoBox from "../../components/big/InfoBox";

export class Home extends Component
{
    render()
    {
        return (
            <>
                <Hero />
                <InfoBox />
                <h1 className="text-center">Caută doctorul de care ai nevoie</h1>
                <SearchViewDoctor />
            </>

        );
    }
}