import React from 'react';
import P5Sketch from './Sketch';
import { SketchP } from '../../types';

function Agave({ hasLoadedRoom, ui }: SketchP) {
 
    return (
        <div className="Sketch">
            <P5Sketch />
        </div>
    )
}

export default Agave;