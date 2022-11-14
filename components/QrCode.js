import React, { useState } from 'react'
import QRCode from 'react-qr-code';

const QrCode = ({ value ,title}) => {
    const [back, setBack] = useState('#FFFFFF');
    const [fore, setFore] = useState('#000000');
    const [size, setSize] = useState(256);

    return (
        <div className="App">
            <center>

                {value && (
                    <QRCode
                        title={title}
                        value={value}
                        bgColor={back}
                        fgColor={fore}
                        size={size === '' ? 0 : size}
                    />
                )}
            </center>
        </div>
    )
}

export default QrCode