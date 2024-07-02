import Hero from "../../components/big/Hero";
import React, { Component } from 'react';
import InfoBox from "../../components/big/InfoBox";

export class Home extends Component
{
    render()
    {
        return (
            <>
                <Hero />
                <InfoBox />
            </>

        );
    }
}