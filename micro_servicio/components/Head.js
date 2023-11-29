import React from 'react';
import Head from 'next/head';

const CustomHead = () => {
    return (
        <Head>
            <title>CTF</title>
            <meta name="description" content="Sitio educativo" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://aframe.io https://cdn.jsdelivr.net; style-src 'self'; font-src 'self' data:;" />
            <meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload" />
            <link rel="icon" href="/favicon.ico" />

        </Head>
    );
};

export default CustomHead;
