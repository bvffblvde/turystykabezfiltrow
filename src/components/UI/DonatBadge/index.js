import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {themes} from "../../../theme/themeContext/themes";
import {useTheme} from "../../../theme/themeContext";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Logo from "../../../assets/Logo/LOGO.svg";
import StyledButton from "../StyledButton";
import {Link} from "react-router-dom";
import {useFontSize} from "../FontSizeChange/FontSizeContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    badge: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '36px 20px',
        backgroundColor: ({defaultButtonBackgroundColor}) => defaultButtonBackgroundColor,
        border: 'none',
        borderRadius: '12px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            padding: '10px',
            alignItems: 'flex-start',
            gap: '16px',
        }
    },
    badgeDescription: {
        color: ({defaultButtonTextColor}) => defaultButtonTextColor,
        fontSize: ({h4FontSize}) => h4FontSize,
        fontWeight: '500',
        fontFamily: 'Inter-Regular',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h4FontSizeMobile}) => h4FontSizeMobile,
        }
    },
    descriptionWrapper: {
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    buttonWrapper: {
        width: '25%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    }
}));

const DonatBadgeComponent = React.memo(() => {
    const {theme} = useTheme();
    const { fontSize } = useFontSize();
    const combinedTheme = {
        ...themes[theme],
        ...themes[fontSize]
    };

    const classes = useStyles(combinedTheme);
    const [tagName, setTagName] = useState('Loading...');

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get('https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/tags?per_page=100');
                const tags = response.data;

                // tags.forEach(tag => {
                //     console.log(`ID: ${tag.id}, Name: ${tag.name}`);
                // });

                const tagId = 730842129;
                const selectedTag = tags.find(tag => tag.id === tagId);

                if (selectedTag) {
                    setTagName(selectedTag.name);
                } else {
                    setTagName('Tag not found');
                }
            } catch (error) {
                console.error('Error fetching tags:', error);
                setTagName('Error loading tag');
            }
        };

        fetchTags();
    }, []);

    return (
        <>
            <Box className={classes.badge}>
                <Box>
                    <a href={'/'}>
                        <img src={Logo} alt="logo"/>
                    </a>
                </Box>
                <Box className={classes.descriptionWrapper}>
                    <Typography variant="h2" component="h2" className={classes.badgeDescription}>
                        {/*Wspieraj “TURYSTYKĘ BEZ FILTRÓW” NA PATRONITE!*/}
                        {tagName}
                    </Typography>
                </Box>
                <Box className={classes.buttonWrapper}>
                    <Link to="https://patronite.pl/turystykabezfiltrow"
                          style={{textDecoration: 'none', width: '100%', color: 'inherit'}} target='_blank'
                    rel='noopener noreferrer'>
                        <StyledButton text="Wesprzyj nas!" width="100%"
                                      variant="white"/>
                    </Link>
                </Box>
            </Box>
        </>
    );
});

export default DonatBadgeComponent;