import React, { useState } from 'react';
import { IconButton, Tooltip, useMediaQuery, useTheme } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ShareIcon from '@material-ui/icons/Share';

const ShareButton = ({ url }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(url).then(() => setCopied(true));
    };

    const handleShare = async () => {
        try {
            await navigator.share({ title: 'Nagłówek', text: 'Opis', url });
            console.log('Shared successfully.');
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const handleButtonClick = () => {
        if (isMobile && navigator.share) {
            handleShare();
        } else {
            handleCopyLink();
        }
    };

    return (
        <Tooltip title={isMobile ? 'Udział' : copied ? 'Skopiowano!' : 'Skopiuj link'}>
            <IconButton color="inherit" onClick={handleButtonClick}>
                {isMobile ? <ShareIcon /> : <FileCopyIcon />}
            </IconButton>
        </Tooltip>
    );
};

export default ShareButton;

