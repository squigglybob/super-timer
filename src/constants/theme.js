import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    small: 460,
    medium: 720,
    large: 980,
    palette: {
        primary: { main: '#fff9c4' },
        secondary: { main: '#ffccbc' },
    }
})

export { theme }