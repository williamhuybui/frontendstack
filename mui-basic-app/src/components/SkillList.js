import React from 'react';
import Box from '@mui/material/Box';

export default function SkillList({skills}){
    return (
        <Box sx = {{display:'flex'}}>
            {skills.map((skill) => (
                <Box sx={{fontSize: "0.8rem", bgcolor: 'blue', mr:'5px', color: 'white', borderRadius: '5px', padding: '1px 5px'}}
                    key = {skill}
                >
                    {skill}
                </Box>
            ))}
        </Box>
    );
}